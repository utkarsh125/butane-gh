import { NextRequest, NextResponse } from "next/server";

import { auth } from "@/server/auth";
import { authConfig } from "@/server/auth/config";
import { db } from "@/server/db";
import { processMeeting } from "@/lib/assembly";
import { useSession } from "next-auth/react";
import { z } from "zod";

const bodyParser = z.object({
    meetingUrl: z.string(),
    projectId: z.string(),
    meetingId: z.string()
})

export const maxDuration = 300 //5 mins
// export const maxDuration = 60 //1 mins

export async function POST(req: NextRequest){

    const session  = await auth()
    if(!session?.user.id){
        return NextResponse.json({ error: 'UNAUTHORIZED'}, {status: 401})
    }

    try {

        const data = await req.json();

        const { meetingUrl, projectId, meetingId } = bodyParser.parse(data)

        const { summaries } = await processMeeting(meetingUrl)

        await db.issue.createMany({
            data: summaries.map(summary => ({
                start: summary.start,
                end: summary.end,
                gist: summary.gist,
                headline: summary.headline,
                summary: summary.summary,
                meetingId
            }))
        })
        await db.meeting.update({
            where: {
                id: meetingId
            }, 
            data: {
                status: "COMPLETED",
                name: summaries[0]!.headline
            }
        })
        return NextResponse.json({ success: true}, {status: 200})
    } catch (error) {

        
        console.log(error)
        return NextResponse.json({ error: 'INTERNAL SERVER ERROR'}, {status: 500})
    }
}