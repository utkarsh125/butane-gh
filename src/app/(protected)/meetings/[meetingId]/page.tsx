// 'use client'

import IssuesList from './issues-list'
import React from 'react'

type Props = {
    params: Promise<{meetingId: string}>
}

const MeetingDetailsPage = async ({ params }: Props) => {

    const {meetingId} = await params
  return (
    <div>
        {/* {meetingId} */}
        <IssuesList meetingId={meetingId}/>
    </div>
  )
}

export default MeetingDetailsPage