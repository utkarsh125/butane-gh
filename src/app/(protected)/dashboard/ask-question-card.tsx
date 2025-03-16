"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import CodeReferences from "./code-references";
import Image from "next/image";
import MDEditor from "@uiw/react-md-editor";
import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/trpc/react";
import { askQuestion } from "./action";
import { readStreamableValue } from "ai/rsc";
import { toast } from "sonner";
import { useProjects } from "@/hooks/use-project";
import useRefetch from "@/hooks/use-refetch";

type FileReference = {
  fileName: string;
  sourceCode: string;
  summary: string;
  similarity: number;
};

const AskQuestionCard = () => {
  const { project } = useProjects();
  const [open, setOpen] = React.useState(false);
  const [question, setQuestion] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [filesReferences, setFileReferences] = React.useState<FileReference[]>(
    [],
  );
  const [answer, setAnswer] = React.useState("");

  // Directly assign the mutation result without destructuring.
  const saveAnswer = api.project.saveAnswer.useMutation();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAnswer("");
    setFileReferences([]);
    if (!project?.id) return;
    setLoading(true);
    setOpen(true);

    const { output, filesReferences } = await askQuestion(question, project.id);
    setFileReferences(filesReferences);

    for await (const delta of readStreamableValue(output)) {
      if (delta) {
        setAnswer((ans) => ans + delta);
      }
    }
    setLoading(false);
  };

  const refetch = useRefetch()

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-full p-4 sm:max-w-[80vw]">
          <DialogHeader>
            <div className="flex items-center gap-2">
              <DialogTitle>
                <Image
                  src={`/logo.svg`}
                  alt="gitintel-logo"
                  width={40}
                  height={40}
                />
              </DialogTitle>
              <Button
                variant={"outline"}
                onClick={() => {
                  saveAnswer.mutate(
                    {
                      projectId: project!.id,
                      question,
                      answer,
                      filesReferences,
                    },
                    {
                      onSuccess: () => {
                        toast.success("Answer saved!");
                        //refetch after save
                        refetch()
                      },
                      onError: () => {
                        toast.error("Failed to save answer");
                      },
                    },
                  );
                }}
              >
                Save Answer
              </Button>
            </div>
          </DialogHeader>

          <MDEditor.Markdown

            source={answer}
            className="!h-full rounded-sm max-h-[40vh] w-full overflow-auto sm:max-w-[70vw]"
          />
          <div className="h-4"></div>
          <CodeReferences filesReferences={filesReferences} />
          <Button type="button" onClick={() => setOpen(false)}>
            Close
          </Button>
        </DialogContent>
      </Dialog>

      <Card className="relative w-full sm:col-span-3">
        <CardHeader>
          <CardTitle>Ask a question</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit}>
            <Textarea
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Which file should I edit to change the homepage?"
            />
            <div className="h-4"></div>
            <Button type="submit" disabled={loading}>
              Ask GitIntel
            </Button>
          </form>
        </CardContent>
      </Card>
    </>
  );
};

export default AskQuestionCard;
