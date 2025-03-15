'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogHeader } from '@/components/ui/dialog';
import { DialogContent, DialogTitle } from '@/components/ui/dialog';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React from 'react'
import { Textarea } from '@/components/ui/textarea';
import { askQuestion } from './action';
import { readStreamableValue } from 'ai/rsc';
import { useProjects } from '@/hooks/use-project'

const AskQuestionCard = () => {

    const {project} = useProjects();
    const [open, setOpen] = React.useState(false)
    const [question, setQuestion] = React.useState('')
    const [loading, setLoading] = React.useState(false)
    const [filesReferences, setFileReferences] = React.useState<{fileName: string; sourceCode: string; summary: string}[]>([])
    const [answer, setAnswer] = React.useState('')



    const onSubmit = async(e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        if(!project?.id) return
        setLoading(true)
        setOpen(true)

        const {output, filesReferences} = await askQuestion(question, project.id)

        setFileReferences(filesReferences)

        for await (const delta of readStreamableValue(output)){

            if(delta){
                setAnswer(ans => ans + delta)
            }
        }
        setLoading(false);
    }

  return (
    <>
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <DialogHeader>
                    <DialogTitle>
                        <Image src={`/logo.svg`} alt='gitintel-logo' width={40} height={40}/>
                    </DialogTitle>
                </DialogHeader>
                {answer}
                <h1>File References</h1>
                {filesReferences.map(file => {
                    return <span>
                        {file.fileName}
                    </span>
                })}
            </DialogContent>
        </Dialog>

        <Card className='relative col-span-3'>
            <CardHeader>
                <CardTitle>
                    Ask a question
                </CardTitle>
            </CardHeader>

            <CardContent>
                <form onSubmit={onSubmit}>
                    <Textarea onChange={(e) => setQuestion(e.target.value)} placeholder="Which file should I edit to change the homepage?"/>
                    <div className='h-4'></div>
                    <Button type="submit">
                        Ask GitIntel
                    </Button>
                </form>
            </CardContent>
        </Card>
    </>
  )
}

export default AskQuestionCard
