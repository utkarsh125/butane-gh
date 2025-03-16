'use client'

import { Button } from '@/components/ui/button'
import React from 'react'
import { api } from '@/trpc/react'
import { toast } from 'sonner'
import { useProjects } from '@/hooks/use-project'
import useRefetch from '@/hooks/use-refetch'

const ArchiveButton = () => {

    const archiveProject = api.project.archiveProject.useMutation()
    const { projectId } = useProjects()
    const refetch = useRefetch()
  return (

    <Button disabled={archiveProject.isPending} size="sm" variant={`destructive`} onClick={() => {
        const confirm = window.confirm("Are you sure you want to archive this project?")
        if(confirm) archiveProject.mutate({ projectId}, {
            onSuccess: () => {
                toast.success("Project archived")
                refetch()
            },
            onError: () => {
                toast.error("Failed to archive project")
            }
        })
    }}>
        Archive
    </Button>
  )
}

export default ArchiveButton