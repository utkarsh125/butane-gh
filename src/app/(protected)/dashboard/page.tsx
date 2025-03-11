'use client'

import React from 'react'
import { useSession } from 'next-auth/react';

const DashboardPage = () => {
  const { data: session } = useSession();
  return (
    <div>
        <div>
            {session?.user?.name}
        </div>
    </div>
  )
}

export default DashboardPage