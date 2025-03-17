'use client'

import {
  ArrowRight,
  BarChart3,
  Code,
  GitBranch,
  Github,
  Lock,
  Menu,
  MessageSquare,
  Mic,
  Users,
  X,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Header */}
      <header className="border-b sticky top-0 z-50 bg-background/95 backdrop-blur-md">
        <nav className="container mx-auto px-5 flex justify-between items-center py-4">
          <div className="flex items-center gap-2">
            <GitBranch className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">GitIntel</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="#features"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              How It Works
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden z-50">
            <Button variant="ghost" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>

          {/* Desktop Sign In */}
          <div className="hidden md:block">
            <Link href="/sign-in">
              <Button>Sign In</Button>
            </Link>
          </div>
        </nav>
        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-background border-t">
            <nav className="flex flex-col items-center py-4">
              <Link
                href="#features"
                className="mb-2 text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </Link>
              <Link
                href="#how-it-works"
                className="mb-2 text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                How It Works
              </Link>
              <Link href="/sign-in" onClick={() => setMobileMenuOpen(false)}>
                <Button>Sign In</Button>
              </Link>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Unlock insights from your{" "}
              <span className="text-primary">Git repositories</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-md">
              GitIntel provides comprehensive analytics and insights for your repositories and organizations, helping you make data-driven decisions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/sign-in">
                <Button size="lg" variant="outline" className="gap-2">
                  <Github className="h-5 w-5" />
                  Connect GitHub
                </Button>
              </Link>
            </div>
            <div className="mt-8 shadow-2xl">
              <div className="relative pt-[56.25%] w-full rounded-lg overflow-hidden shadow-lg">
                <iframe 
                  src="https://www.youtube.com/embed/eZHtBzoMgaE" 
                  title="GitIntel Demo"
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                />
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -z-10 inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-3xl blur-3xl"></div>
            <Image
              src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop"
              alt="Code visualization"
              width={600}
              height={400}
              className="rounded-xl shadow-xl object-cover"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything you need to understand your codebase
            </h2>
            <p className="text-muted-foreground">
              GitIntel provides comprehensive analytics and insights for your repositories and organizations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <MessageSquare className="h-10 w-10 text-primary" />,
                title: "Ask Questions about Repos",
                description:
                  "Interact with your repository data using Gemini-2.0-Flash RAG Chat.",
              },
              {
                icon: <Mic className="h-10 w-10 text-primary" />,
                title: "Meet Summary with AssemblyAI",
                description:
                  "Upload your meetings to receive comprehensive summaries powered by AssemblyAI.",
              },
              {
                icon: <Lock className="h-10 w-10 text-primary" />,
                title: "Private Repository Support",
                description:
                  "Securely connect your private repositories using Personal Access Tokens (PAT).",
              },
              {
                icon: <Github className="h-10 w-10 text-primary" />,
                title: "Multiplatform Support",
                description:
                  "Integrate with GitHub, GitLab, Bitbucket, and more to manage all your repositories in one place.",
              },
            ].map((feature, index) => (
              <div key={index} className="bg-card rounded-xl p-6 shadow-sm border">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How GitIntel Works</h2>
            <p className="text-muted-foreground">
              Get started in minutes and gain insights immediately
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Connect your repositories",
                description:
                  "Securely connect your GitHub, GitLab, or Bitbucket accounts with just a few clicks.",
              },
              {
                step: "02",
                title: "Analyze your data",
                description:
                  "GitIntel processes your repository data and generates comprehensive analytics.",
              },
              {
                step: "03",
                title: "Get actionable insights",
                description:
                  "View dashboards, reports, and recommendations to improve your development process.",
              },
            ].map((step, index) => (
              <div key={index} className="relative">
                <div className="text-6xl font-bold text-primary/10 absolute -top-6 left-0">
                  {step.step}
                </div>
                <div className="pt-8">
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 relative">
            <div className="absolute -z-10 inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-3xl blur-3xl"></div>
            <Image
              src="https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2070&auto=format&fit=crop"
              alt="Dashboard preview"
              width={1200}
              height={600}
              className="rounded-xl shadow-xl mx-auto"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-primary text-primary-foreground rounded-2xl p-8 md:p-12 text-center max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to unlock insights from your repositories?
            </h2>
            <p className="mb-8 text-primary-foreground/90 max-w-2xl mx-auto">
              Become one of the very first people to try it out
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/sign-in">
                <Button size="lg" variant="secondary" className="px-8">
                  Start for free
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/30 border-t py-12">
        <div className="container mx-auto px-4 text-center">
          <Link
            href="https://github.com/utkarsh125/git-intel"
            className="flex gap-2 items-center justify-center text-muted-foreground hover:text-foreground"
          >
            <Github /> Star this on Github
          </Link>
        </div>
      </footer>
    </div>
  )
}