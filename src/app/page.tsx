"use client";

import React, { useState, useEffect, type SVGProps } from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Landmark,
  Users,
  ClipboardCheck,
  GitMerge,
  DollarSign,
  TrendingUp,
  Briefcase,
  Building2,
  KeyRound,
  Repeat,
  UserPlus,
  Search,
  HandCoins,
  LineChart,
  BookOpen,
  Star,
  Loader2,
  Twitter,
  Linkedin,
} from "lucide-react";
import { getIntelligentCTA } from "@/ai/flows/intelligent-cta";
import { Skeleton } from "@/components/ui/skeleton";
import Link from 'next/link';

const valueProps = [
  {
    icon: Users,
    title: "Accessible Investment",
    description:
      "Start your investment journey with a minimum amount, making real estate accessible to everyone.",
  },
  {
    icon: GitMerge,
    title: "Co-Investment Strategy",
    description:
      "Invest alongside us. Our success is tied to yours, ensuring aligned interests and shared goals.",
  },
  {
    icon: ClipboardCheck,
    title: "Transparent Management",
    description:
      "Gain full visibility into your investments with our detailed project tracking and regular reports.",
  },
];

const impactMetrics = [
  {
    icon: DollarSign,
    value: "$15M+",
    label: "Capital Raised",
  },
  {
    icon: TrendingUp,
    value: "$2M+",
    label: "Interest Paid to Investors",
  },
  {
    icon: Briefcase,
    value: "50+",
    label: "Managed Projects",
  },
];

const projectTypes = [
  {
    image: "https://placehold.co/600x400.png",
    hint: "modern building",
    icon: Building2,
    title: "Real Estate Developments",
    description: "Finance new constructions from the ground up and reap the rewards of development.",
  },
  {
    image: "https://placehold.co/600x400.png",
    hint: "house keys",
    icon: KeyRound,
    title: "Leaseback Opportunities",
    description: "Purchase properties and lease them back to the original owners for steady, long-term income.",
  },
  {
    image: "https://placehold.co/600x400.png",
    hint: "apartment building",
    icon: Repeat,
    title: "Rental Projects",
    description: "Invest in a portfolio of rental properties and earn consistent passive income.",
  },
];

const investmentSteps = [
  {
    icon: UserPlus,
    title: "Register & Verify",
    description: "Create your account and complete a simple verification process.",
  },
  {
    icon: Search,
    title: "Select a Project",
    description: "Browse our curated list of investment opportunities and choose one that fits your goals.",
  },
  {
    icon: HandCoins,
    title: "Invest Securely",
    description: "Make your investment through our secure platform and receive your digital certificate.",
  },
  {
    icon: LineChart,
    title: "Earn Returns",
    description: "Track your investment's performance and receive your returns as the project prospers.",
  },
];

const educationArticles = [
  {
    title: "Real Estate Crowdfunding 101",
    description: "Understand the basics of how real estate crowdfunding works.",
  },
  {
    title: "Benefits and Risks of Real Estate Investment",
    description: "A balanced view on what to expect when you invest in property.",
  },
  {
    title: "Diversifying Your Portfolio with Real Estate",
    description: "Learn why real estate is a key component of a healthy investment portfolio.",
  },
];

const testimonials = [
  {
    quote:
      "The consistent monthly returns have been a fantastic addition to my portfolio. AltoPatrimonio's platform is transparent and easy to use.",
    name: "Carlos Velazquez",
    title: "Investor",
  },
  {
    quote:
      "I was new to real estate investing, but their team guided me through every step. The security and professionalism are top-notch.",
    name: "Sofia Rossi",
    title: "Investor",
  },
  {
    quote:
      "Seeing my investment grow through their detailed project updates is incredibly reassuring. A truly passive and profitable experience.",
    name: "Mateo Fernandez",
    title: "Investor",
  },
];

export default function HomePage() {
  const [navigationPattern, setNavigationPattern] = useState("Initial visit: User has just landed on the page.");
  const [ctaText, setCtaText] = useState("");
  const [isLoadingCta, setIsLoadingCta] = useState(true);

  const handleProjectInteraction = () => {
    setNavigationPattern("User is browsing projects, showing interest in investment opportunities.");
  };

  useEffect(() => {
    const fetchCta = async () => {
      setIsLoadingCta(true);
      try {
        const result = await getIntelligentCTA({ navigationPattern });
        setCtaText(result.cta);
      } catch (error) {
        console.error("Error fetching intelligent CTA:", error);
        setCtaText("Explore Projects"); // Fallback CTA
      } finally {
        setIsLoadingCta(false);
      }
    };
    fetchCta();
  }, [navigationPattern]);

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <ImpactSection />
        <ValuePropSection />
        <ProjectsSection onProjectInteract={handleProjectInteraction} />
        <HowItWorksSection />
        <EducationSection />
        <TestimonialsSection />
        <CtaSection ctaText={ctaText} isLoading={isLoadingCta} />
      </main>
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-7xl items-center justify-between">
        <Link href="#" className="flex items-center gap-2">
          <Landmark className="h-7 w-7 text-primary" />
          <span className="font-headline text-2xl font-bold text-primary">
            AltoPatrimonio
          </span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm md:flex">
          <Link href="#projects" className="font-medium text-muted-foreground transition-colors hover:text-primary">Projects</Link>
          <Link href="#how-it-works" className="font-medium text-muted-foreground transition-colors hover:text-primary">How It Works</Link>
          <Link href="#education" className="font-medium text-muted-foreground transition-colors hover:text-primary">Learn</Link>
        </nav>
        <Button className="bg-accent text-accent-foreground hover:bg-accent/90">Contact Us</Button>
      </div>
    </header>
  );
}

function HeroSection() {
  return (
    <section className="py-20 text-center sm:py-32">
      <div className="container max-w-4xl">
        <h1 className="font-headline text-5xl font-bold tracking-tight text-primary md:text-7xl">
          Build Your Future with Tangible Assets
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          AltoPatrimonio offers you a secure and transparent way to invest in
          curated real estate projects. Grow your wealth with us.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button size="lg" asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Link href="#projects">Explore Projects</Link>
          </Button>
          <Button size="lg" variant="outline" asChild className="border-primary text-primary hover:bg-primary/5">
             <Link href="#how-it-works">Learn More</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

function ImpactSection() {
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="container">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {impactMetrics.map((metric) => (
            <div key={metric.label} className="text-center">
              <metric.icon className="mx-auto h-10 w-10 text-accent" />
              <p className="mt-4 font-headline text-5xl font-bold text-primary">{metric.value}</p>
              <p className="mt-1 text-sm font-medium text-muted-foreground">{metric.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ValuePropSection() {
  return (
    <section className="py-20 sm:py-32">
      <div className="container max-w-6xl">
        <div className="text-center">
          <h2 className="font-headline text-4xl font-bold text-primary md:text-5xl">
            The AltoPatrimonio Advantage
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            We are committed to providing a superior investment experience through our core principles.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {valueProps.map((prop) => {
            const Icon = prop.icon;
            return(
              <div key={prop.title} className="flex flex-col items-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mt-6 font-headline text-2xl font-semibold text-primary">{prop.title}</h3>
                <p className="mt-2 text-base text-muted-foreground">{prop.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ProjectsSection({ onProjectInteract }: { onProjectInteract: () => void }) {
  return (
    <section id="projects" className="bg-white py-20 sm:py-32">
      <div className="container max-w-6xl">
        <div className="text-center">
          <h2 className="font-headline text-4xl font-bold text-primary md:text-5xl">
            Featured Investment Opportunities
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Explore our carefully selected projects, each offering a unique potential for growth and returns.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projectTypes.map((project) => (
            <Card key={project.title} className="overflow-hidden shadow-lg transition-transform duration-300 hover:-translate-y-2">
              <CardHeader className="p-0">
                <Image
                  src={project.image}
                  alt={project.title}
                  width={600}
                  height={400}
                  className="h-56 w-full object-cover"
                  data-ai-hint={project.hint}
                />
              </CardHeader>
              <CardContent className="p-6">
                <project.icon className="mb-4 h-8 w-8 text-accent" />
                <CardTitle className="font-headline text-2xl text-primary">{project.title}</CardTitle>
                <CardDescription className="mt-2 text-base">{project.description}</CardDescription>
                <Button onClick={onProjectInteract} className="mt-6 w-full bg-accent text-accent-foreground hover:bg-accent/90">Learn More</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
    return (
      <section id="how-it-works" className="py-20 sm:py-32">
        <div className="container max-w-6xl">
          <div className="text-center">
            <h2 className="font-headline text-4xl font-bold text-primary md:text-5xl">
              Your Journey to Real Estate Investment
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Investing with us is a straightforward, four-step process.
            </p>
          </div>
          <div className="relative mt-16">
             <div className="absolute left-1/2 top-0 hidden h-full w-0.5 -translate-x-1/2 bg-border md:block" aria-hidden="true"></div>
            <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
              {investmentSteps.map((step, index) => {
                const Icon = step.icon
                return(
                  <div key={step.title} className="relative flex items-start gap-6">
                      <div className="absolute -left-[calc(50%-1.25rem)] top-1 z-10 hidden h-10 w-10 items-center justify-center rounded-full bg-background ring-4 ring-background md:flex lg:left-1/2 lg:-translate-x-1/2">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-primary bg-background">
                            <span className="font-headline text-lg text-primary">{index + 1}</span>
                          </div>
                      </div>
                     <div className="flex flex-1 flex-col items-center text-center lg:items-start lg:text-left">
                        <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-primary/10">
                            <Icon className="h-7 w-7 text-primary" />
                        </div>
                      <h3 className="mt-4 font-headline text-2xl font-semibold text-primary">{step.title}</h3>
                      <p className="mt-1 text-base text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>
    );
  }

function EducationSection() {
  return (
    <section id="education" className="bg-white py-20 sm:py-32">
      <div className="container max-w-6xl">
        <div className="text-center">
          <h2 className="font-headline text-4xl font-bold text-primary md:text-5xl">
            Financial Education Portal
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Empower yourself with knowledge. Informed investors make better decisions.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {educationArticles.map((article) => (
            <Card key={article.title} className="flex flex-col justify-between p-6 shadow-lg">
                <div>
                    <BookOpen className="mb-4 h-8 w-8 text-accent" />
                    <h3 className="font-headline text-2xl font-semibold text-primary">{article.title}</h3>
                    <p className="mt-2 text-base text-muted-foreground">{article.description}</p>
                </div>
                <Button variant="link" className="mt-4 p-0 text-accent hover:text-accent/80 justify-start">Read Article &rarr;</Button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section className="py-20 sm:py-32">
      <div className="container max-w-4xl">
        <div className="text-center">
          <h2 className="font-headline text-4xl font-bold text-primary md:text-5xl">
            From Our Investors
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Hear what our community is saying about their experience with AltoPatrimonio.
          </p>
        </div>
        <Carousel
          opts={{ align: "start", loop: true }}
          className="mx-auto mt-16 w-full max-w-2xl"
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index}>
                <Card className="border-2 border-accent/50 bg-white p-8 shadow-xl">
                  <CardContent className="p-0 text-center">
                    <div className="flex justify-center text-accent">
                      {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-current" />)}
                    </div>
                    <p className="mt-6 text-lg italic text-primary">"{testimonial.quote}"</p>
                    <div className="mt-8 flex items-center justify-center gap-4">
                        <Avatar>
                            <AvatarImage src={`https://placehold.co/40x40.png?text=${testimonial.name.charAt(0)}`} alt={testimonial.name} data-ai-hint="person portrait" />
                            <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-bold text-primary">{testimonial.name}</p>
                            <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                        </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
}

function CtaSection({ ctaText, isLoading }: { ctaText: string, isLoading: boolean }) {
  return (
    <section className="bg-primary py-20 text-center sm:py-24">
      <div className="container max-w-4xl">
        <h2 className="font-headline text-4xl font-bold text-white md:text-5xl">
          Ready to Start Building Your Wealth?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/80">
          Join a community of savvy investors who are securing their financial future with real assets. Your next great investment is just a click away.
        </p>
        <div className="mt-8">
            {isLoading ? (
                <Skeleton className="mx-auto h-12 w-48" />
            ) : (
                <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                    {ctaText}
                </Button>
            )}
        </div>
      </div>
    </section>
  );
}

function Footer() {
    return (
        <footer className="border-t">
            <div className="container mx-auto max-w-7xl px-4 py-8">
                <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
                    <div className="flex items-center gap-2">
                        <Landmark className="h-6 w-6 text-primary" />
                        <span className="font-headline text-xl font-bold text-primary">AltoPatrimonio</span>
                    </div>
                    <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} AltoPatrimonio Invest. All Rights Reserved.</p>
                    <div className="flex items-center gap-4">
                        <Link href="#" aria-label="Twitter">
                            <Twitter className="h-5 w-5 text-muted-foreground transition-colors hover:text-primary" />
                        </Link>
                        <Link href="#" aria-label="LinkedIn">
                            <Linkedin className="h-5 w-5 text-muted-foreground transition-colors hover:text-primary" />
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
