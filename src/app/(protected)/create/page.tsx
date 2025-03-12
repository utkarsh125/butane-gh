"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import React from "react";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import useRefetch from "@/hooks/use-refetch";
type FormInput = {
  repoUrl: string;
  projectName: string;
  githubToken?: string;
};

const CreatePage = () => {
  const { register, handleSubmit, reset } = useForm<FormInput>();
  //always use trpc/react for api on frontend.
  const createProject = api.project.createProject.useMutation()

  const refetch = useRefetch();

  function onSubmit(data: FormInput) {
    
    // window.alert(JSON.stringify(data, null, 2));
    createProject.mutate({
        githubUrl: data.repoUrl,
        name: data.projectName,
        githubToken: data.githubToken
    }, {
        onSuccess: () => {
            toast.success('Project created sucessfully')
            refetch()
            reset()
        },
        onError: () => {
            toast.error('Failed to create project')
        }
    })
    return true;
  }
  return (
    <div className="flex h-full items-center justify-center gap-12">
      <Image alt="createImage" src={"/create.svg"} height={224} width={224} />
      <div>
        <div>
          <h1 className="text-2xl font-semibold">
            Link your Github Repository
          </h1>

          <p className="text-sm text-muted-foreground">
            Enter the URL of your repository to link it with GitIntel
          </p>
        </div>
        <div className="h-4"></div>
        <div className="">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              {...register("projectName", { required: true })}
              placeholder="Project Name"
              required

            />
            <div className="h-2"></div>
            <Input
              {...register("repoUrl", { required: true })}
              placeholder="Github URL"
              type="url"
              required
            />
            <div className="h-2"></div>
            <Input
              {...register("githubToken")}
              placeholder="Personal Access Code (Optional)"
            />
            <div className="h-4"></div>
            <Button type="submit" disabled={createProject.isPending}>
                Create Project
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
