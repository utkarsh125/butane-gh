'use client'

import { ExternalLink, Github } from 'lucide-react';

import ArchiveButton from './archive-button';
import AskQuestionCard from './ask-question-card';
import CommitLog from './commit-log';
import Link from 'next/link';
import MeetingCard from './meeting-card';
import React from 'react'
import { useProjects } from '@/hooks/use-project';
import { useSession } from 'next-auth/react';

const DashboardPage = () => {
  const { data: session } = useSession();
  const { project } = useProjects();
  return (
    <div>
      {/* {project?.id} */}
      <div className='flex items-center justify-between flex-wrap gap-y-4'>
        {/* github link */}
        <div className='flex items-center w-fit rounded-md bg-primary px-4 py-3'>
          <Github className='size-5 text-white'/>
          <div className='ml-2'>
            <p className='text-sm font-medium text-white'>
              This project is linked to {' '}
              <Link href={project?.githubUrl ?? ''} className='inline-flex items-center text-white/80 hover:underline'>
                {project?.githubUrl}
                <ExternalLink className='ml-1 size-4'/>
              </Link>
            </p>
          </div>
        </div>

        <div className='h-4'></div>

        <div className="flex items-center gap-4">

          {/* TODO: ADD TEAM FEATURE */}
          <ArchiveButton />
        </div>
      </div>

      <div className="mt-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-5">
          <AskQuestionCard />
          <MeetingCard />
        </div>
      </div>

      <div className="mt-8"></div>
      <CommitLog />
    </div>
  )
}

export default DashboardPage