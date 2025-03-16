"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Loader } from "lucide-react";
import MeetingCard from "../dashboard/meeting-card";
import React from "react";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import { useProjects } from "@/hooks/use-project";
import useRefetch from "@/hooks/use-refetch";

const MeetingsPage = () => {
  const { projectId } = useProjects();
  const { data: meetings, isLoading } = api.project.getMeetings.useQuery(
    {
      projectId,
    },
    {
      refetchInterval: 4000, //refetch every 4s to check if meetings have reached the endpoint
    },
  );

  const refetch = useRefetch();

  const deleteMeeting = api.project.deleteMeeting.useMutation()
  return (
    <>
      <MeetingCard />
      <div className="h-4"></div>
      <h1 className="text-xl font-semibold">Meetings</h1>
      {meetings && meetings.length === 0 && <div>No meetings found</div>}
      {isLoading && (
        // <div className="animate-spin">
        //   <Loader className="" />
        // </div>
        <div>
          Loading...
        </div>
      )}

      <ul className="divide-y divide-gray-500">

        {meetings?.map(meeting => (
          <li key={meeting.id} className="flex items-center justify-between py-5 gap-x-6">
            <div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <Link href={`/meetings/${meeting.id}`} className="text-sm font-semibold">
                    {meeting.name}
                  </Link>
                  {meeting.status === 'PROCESSING' && (
                    <Badge className="bg-yellow-500 text-white animate-pulse">
                      Processing
                    </Badge>
                  )}
                </div>
              </div>

              <div className="flex items-center text-xs text-gray-500 gap-x-2">
                <p className="whitespace-nowrap">
                  {meeting.createdAt.toLocaleDateString()}
                </p>
                <p className="truncate">
                  {meeting.issues.length} issues
                </p>
              </div>
            </div>

            <div className="flex items-center flex-none gap-x-4">
              <Link href={`/meetings/${meeting.id}`}>
                  <Button size={`sm`} variant={`outline`}>
                    View Meeting
                  </Button>
              </Link>
              <Button disabled={deleteMeeting.isPending} size="sm" variant={`destructive`}
              onClick={() => deleteMeeting.mutate({ meetingId: meeting.id }, {
                onSuccess: () => {
                  toast.success("Meeting deleted")
                  refetch()
                },
                onError: () => {
                  toast.error("Error while deleting the meeting")
                }
              })}
              >
                Delete Meeting
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default MeetingsPage;
