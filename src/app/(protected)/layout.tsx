import { AppSidebar } from './app-sidebar'
import React from 'react'
import { SidebarProvider } from '@/components/ui/sidebar'
import UserButton from '@/components/custom/UserButton'
import { auth } from '@/server/auth'

type Props = {
    children: React.ReactNode
}

const layout = async ({ children } : Props) => {

    const session = await auth()

    if(!session){
        return<div>
            You are not logged in.
        </div>
    }
  return (
    <SidebarProvider>
        {/* AppSidebar */}
        <AppSidebar />
        <main className='w-full m-2'>
            <div className='flex items-center gap-2 border-sidebar-border bg-sidebar border shadow  rounded-md p-2 px-4'>
                {/* Searchbar */}
                <div className='ml-auto'></div>
                <UserButton />
            </div>
            <div className="h-4"></div>
            {/* main content */}
            <div className='border-sidebar-border bg-sidebar border shadow rounded-md overflow-y-scroll h-[calc(100vh-6rem)] p-4'>
                {children}
            </div>

        </main>
    </SidebarProvider>
  )
}

export default layout