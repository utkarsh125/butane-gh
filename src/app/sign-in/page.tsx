"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { type FormEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { signIn } from "next-auth/react";

export default function SignInPage() {
  const [loading, setLoading] = useState(false);

  const handleGithubSignIn = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    //Call github signin flow
    await signIn("github");
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg--50">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="flex flex-col justify-center text-center text-2xl font-semibold">
            Sign In
            <CardDescription>Sign in with your Github Account.</CardDescription>
          </CardTitle>
        </CardHeader>

        <CardContent className="flex justify-center">
          <form onSubmit={handleGithubSignIn} className="space-y-4">
            <Button>
              {loading ? (
                <Loader className="animate-spin" />
              ) : (
                "Sign in with Github"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
