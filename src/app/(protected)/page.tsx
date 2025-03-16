// src/app/(protected)/page.tsx
import { auth } from "@/server/auth"; // ensure this path is correct
import { redirect } from "next/navigation";

export default async function ProtectedPage() {
  const session = await auth();

  if (!session) {
    redirect("/sign-in");
  }

  // If the session exists, render your protected content.
  return (
    <div>
      <h1>Protected Content</h1>
      <p>Welcome, {session.user?.name}!</p>
    </div>
  );
}
