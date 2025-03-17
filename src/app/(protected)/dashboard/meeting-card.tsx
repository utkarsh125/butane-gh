'use client'

import {CircularProgressbar, buildStyles} from 'react-circular-progressbar';
import { Presentation, Upload } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card'
import React from 'react'
import { api } from '@/trpc/react';
import axios from 'axios';
import { projectEntrypointsSubscribe } from 'next/dist/build/swc/generated-native';
import { toast } from 'sonner';
import { uploadFile } from '@/lib/firebase';
import { useDropzone } from 'react-dropzone';
import { useMutation } from '@tanstack/react-query';
import { useProjects } from '@/hooks/use-project';
import { useRouter } from 'next/navigation';

const MeetingCard = () => {
    const [isUploading, setIsUploading] = React.useState(false)
    const processMeeting = useMutation({
        mutationFn: async(data: { meetingUrl: string, meetingId: string, projectId: string }) => {
            const {meetingUrl, meetingId, projectId} = data;
            const response = await axios.post('/api/process-meeting', { meetingUrl, meetingId, projectId})
            return response.data;
        }
    })
    const [progress, setProgress] = React.useState(0)
    const router = useRouter()
    const {project} = useProjects()
    const uploadMeeting = api.project.uploadMeeting.useMutation()

    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            'audio/*': ['.mp3', '.wav', '.m4a']
        },
        multiple: false,
        maxSize: 50_000_000,
        onDrop: async acceptedFiles => {
            setIsUploading(true)
            // console.log(acceptedFiles)
            const file = acceptedFiles[0]
            if(!file) return
            const downloadURL = await uploadFile(file as File, setProgress) as string
            uploadMeeting.mutate({
                projectId: project!.id,
                meetingUrl: downloadURL,
                name: file.name
            }, {
                onSuccess: (meeting) => {
                    toast.success("Meeting uploaded successfully")
                    router.push('/meetings')
                    processMeeting.mutateAsync({ meetingUrl: downloadURL, meetingId: meeting.id , projectId: project!.id})
                },
                onError: () => {
                    toast.success("Meet upload failed")
                }
            })
            // window.alert(downloadURL)
            setIsUploading(false)
        }
    })
  return (
    <Card className='col-span-2 flex flex-col items-center justify-center p-10' {...getRootProps()}>
        {!isUploading && (
            <>
            
                <Presentation className='h-10 w-10 animate-pulse'/> 
                <h3 className='mt-2 text-sm font-semibold text-gray-900'>
                    Create a new meeting
                </h3>
                <p className='mt-1 text-center text-sm text-gray-500'>
                    Analyze your meeting with Meet-Intel
                    <br />
                    Powered by AI
                </p>

                <div className='mt-6'>
                    <Button disabled={isUploading}>
                        <Upload className='-ml-0.5 mr-1.5 h-5 w-5' aria-hidden="true"/>
                        Upload Meeting
                        <input className='hidden' {...getInputProps()}/>
                    </Button>
                </div>
            </>
        )}
        {isUploading && (
            <div className=''>
                <CircularProgressbar value={progress} text={`${progress}%`} className='size-20' styles={
                    buildStyles({
                        pathColor: '#2563eb',
                        textColor: '#2563eb'
                    })
                }/>
                <p className='text-sm text-gray-500 text-center'>
                    Uploading your meeting...
                </p>
            </div>
        )}
    </Card>
  )
}

export default MeetingCard