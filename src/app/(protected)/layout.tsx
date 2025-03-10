import React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import UserButton from "@/components/custom/UserButton";

type Props = {
  children: React.ReactNode;
};

const SidebarLayout = ({ children }: Props) => {
  return (
    <SidebarProvider>
      <main className="w-full bg-black">
        {/* Header / top bar */}
        <div className="relative flex items-center justify-between gap-2 bg-black text-white shadow p-4 md:p-6">
          {/* You can add a logo or title here if desired */}
          <div className="ml-auto">
            <UserButton />
          </div>
        </div>

        {/* <div className="h-4" /> */}

        {/* Main content */}
        <div className="relative border border-gray-800 bg-black text-white h-[calc(100vh-6rem)] p-4 overflow-auto">
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
};

export default SidebarLayout;
