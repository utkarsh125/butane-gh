import { ArrowRight, BarChart3, Code, GitBranch, Github, MessageSquare, Mic, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Header */}
      <header className="border-b sticky top-0 z-50 bg-background/95 backdrop-blur-md">
        <nav className="container mx-auto flex justify-between items-center py-4">
          <div className="flex items-center gap-2">
            <GitBranch className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">GitIntel</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
              Features
            </Link>
            <Link href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">
              How It Works
            </Link>
            <Link href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">
              Pricing
            </Link>
          </div>
          <div>
            <Button variant="outline" className="mr-2 hidden sm:inline-flex">
              Log In
            </Button>
            <Button>Get Started</Button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Unlock insights from your <span className="text-primary">Git repositories</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-md">
              GitIntel provides comprehensive analytics and insights for your repositories and organizations, helping
              you make data-driven decisions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="px-8">
                Start for free
              </Button>
              <Button size="lg" variant="outline" className="gap-2">
                <Github className="h-5 w-5" />
                Connect GitHub
              </Button>
            </div>
            <div className="pt-4 flex items-center gap-2 text-sm text-muted-foreground">
              {/* 
              <span className="bg-muted rounded-full w-6 h-6 flex items-center justify-center text-muted-foreground">✓</span>
              No credit card required • 
              <span className="bg-muted rounded-full w-6 h-6 flex items-center justify-center text-muted-foreground">✓</span>
              Free 14-day trial 
              */}
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

      {/* Logos Section */}
      <section className="border-y bg-muted/30 py-10">
        <div className="container mx-auto px-4">
          <p className="text-center text-muted-foreground mb-8">Trusted by developers from leading companies</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {["Microsoft", "Google", "Amazon", "Meta", "Netflix"].map((company) => (
              <div key={company} className="text-muted-foreground/70 font-semibold text-lg">
                {company}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything you need to understand your codebase</h2>
            <p className="text-muted-foreground">
              GitIntel provides comprehensive analytics and insights for your repositories and organizations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <BarChart3 className="h-10 w-10 text-primary" />,
                title: "Repository Analytics",
                description:
                  "Get detailed analytics about your repositories including commit frequency, code churn, and contributor statistics.",
              },
              {
                icon: <Users className="h-10 w-10 text-primary" />,
                title: "Organization Insights",
                description:
                  "Understand how your organization collaborates, identify key contributors, and track team performance.",
              },
              {
                icon: <Code className="h-10 w-10 text-primary" />,
                title: "Code Quality Metrics",
                description:
                  "Track code quality over time with metrics on test coverage, complexity, and technical debt.",
              },
              {
                icon: <GitBranch className="h-10 w-10 text-primary" />,
                title: "Branch Management",
                description: "Visualize branch history, identify stale branches, and optimize your branching strategy.",
              },
              {
                icon: <Github className="h-10 w-10 text-primary" />,
                title: "Multi-Platform Support",
                description: "Support for GitHub, GitLab, Bitbucket, and more - all your repositories in one place.",
              },
              {
                icon: <ArrowRight className="h-10 w-10 text-primary" />,
                title: "Actionable Recommendations",
                description: "Get personalized recommendations to improve your development workflow and code quality.",
              },
              {
                icon: <Mic className="h-10 w-10 text-primary" />,
                title: "Meeting Summaries",
                description:
                  "Upload your meetings and receive comprehensive summaries powered by AssemblyAI.",
              },
              {
                icon: <MessageSquare className="h-10 w-10 text-primary" />,
                title: "Gemini RAG Chat",
                description:
                  "Leverage Gemini's capabilities for RAG Chat to interact with repository and organizational insights.",
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
            <p className="text-muted-foreground">Get started in minutes and gain insights immediately</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Connect your repositories",
                description: "Securely connect your GitHub, GitLab, or Bitbucket accounts with just a few clicks.",
              },
              {
                step: "02",
                title: "Analyze your data",
                description: "GitIntel processes your repository data and generates comprehensive analytics.",
              },
              {
                step: "03",
                title: "Get actionable insights",
                description: "View dashboards, reports, and recommendations to improve your development process.",
              },
            ].map((step, index) => (
              <div key={index} className="relative">
                <div className="text-6xl font-bold text-primary/10 absolute -top-6 left-0">{step.step}</div>
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

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, transparent pricing</h2>
            <p className="text-muted-foreground">Start for free, upgrade when you need more</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Free",
                price: "$0",
                description: "Perfect for individuals and small projects",
                features: ["Up to 5 repositories", "Basic analytics", "7-day data history", "Community support"],
              },
              {
                name: "Pro",
                price: "$19",
                period: "/month",
                description: "Great for professionals and growing teams",
                features: [
                  "Up to 20 repositories",
                  "Advanced analytics",
                  "30-day data history",
                  "Priority email support",
                  "Custom reports",
                ],
                highlighted: true,
              },
              {
                name: "Enterprise",
                price: "Custom",
                description: "For organizations with advanced needs",
                features: [
                  "Unlimited repositories",
                  "Full analytics suite",
                  "Unlimited data history",
                  "Dedicated support",
                  "Custom integrations",
                  "SSO & advanced security",
                ],
              },
            ].map((plan, index) => (
              <div
                key={index}
                className={`rounded-xl p-6 shadow-sm border ${
                  plan.highlighted ? "border-primary bg-primary/5 relative" : "bg-card"
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                )}
                <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  {plan.period && <span className="text-muted-foreground">{plan.period}</span>}
                </div>
                <p className="text-muted-foreground mb-6">{plan.description}</p>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="bg-primary/10 text-primary rounded-full w-5 h-5 flex items-center justify-center text-xs">
                        ✓
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  className={`w-full ${
                    !plan.highlighted ? "bg-card hover:bg-card/80 text-foreground border border-input" : ""
                  }`}
                  variant={plan.highlighted ? "default" : "outline"}
                >
                  {plan.name === "Free" ? "Get Started" : "Subscribe"}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-primary text-primary-foreground rounded-2xl p-8 md:p-12 text-center max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to unlock insights from your repositories?</h2>
            <p className="mb-8 text-primary-foreground/90 max-w-2xl mx-auto">
              Join thousands of developers who are using GitIntel to understand their codebase better and make
              data-driven decisions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="px-8">
                Start for free
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-primary-foreground/20 hover:bg-primary-foreground/10 text-primary-foreground"
              >
                Schedule a demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/30 border-t py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <GitBranch className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">GitIntel</span>
              </div>
              <p className="text-muted-foreground mb-4">
                Unlock insights from your Git repositories and make data-driven decisions.
              </p>
              <div className="flex gap-4">
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  <Github className="h-5 w-5" />
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
                  </svg>
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
                  </svg>
                </Link>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Integrations
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Changelog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Roadmap
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} GitIntel. All rights reserved.
            </p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Privacy Policy
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Terms of Service
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
