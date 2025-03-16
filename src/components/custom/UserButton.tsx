"use client";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { signOut, useSession } from "next-auth/react";

import { Button } from "../ui/button";
import React from "react";

const UserButton = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    return null;
  }

  return (
    <div className="flex items-center gap-2">
      <h1>
        Signed in as {session.user?.name ?? "User"}
      </h1>
      <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="p-0 hover:bg-transparent focus:ring-0 active:bg-transparent"
          >
            <Avatar className="h-5 w-5 sm:h-8 sm:w-8">
              {session.user?.image ? (
                <AvatarImage
                  src={session.user.image}
                  alt={session.user.name ?? "User"}
                />
              ) : (
                <AvatarFallback>
                  {session.user?.name?.charAt(0) ?? "U"}
                </AvatarFallback>
              )}
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          side="bottom"
          sideOffset={8}
          className="z-50"
          align="end"
        >
          <DropdownMenuItem
            className="cursor-pointer"
            onSelect={() => signOut({ redirectTo: "/"})}
          >
            <p className="text-red-500">Logout</p>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      </div>
    </div>
  );
};

export default UserButton;
