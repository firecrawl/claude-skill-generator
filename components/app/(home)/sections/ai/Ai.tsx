import Link from "next/link";
import { Fragment } from "react";

import Button from "@/components/ui/shadcn//button";
import CurvyRect from "@/components/shared/layout/curvy-rect";
import SectionHead from "@/components/shared/section-head/SectionHead";

import BadgeIcon from "./_svg/BadgeIcon";
import Chats from "./_svg/Chats";
import ChevronRight from "./_svg/ChevronRight";
import Leads from "./_svg/Leads";
import Mcps from "./_svg/Mcps";
import Platforms from "./_svg/Platforms";
import Research from "./_svg/Research";
import AiCard from "./Card/Card";
import AiChats from "./Chats/Chats";
import AiFlame from "./Flame/Flame";
import AiLeads from "./Leads/Leads";
import AiMcps from "./Mcps/Mcps";
import AiPlatforms from "./Platforms/Platforms";
import AiResearch from "./Research/Research";

export default function Ai() {
  return (
    <section className="container -mt-1">
      <SectionHead
        action={
          <Link className="contents" href="#/use-cases/overview">
            <Button className="mx-auto" size="large" variant="primary">
              View all use cases
            </Button>
          </Link>
        }
        badgeContent={
          <>
            <BadgeIcon />
            <span>Use cases</span>
          </>
        }
        className="lg-max:!py-64"
        description="Discover how Firecrawl customers are getting the most out of our API."
        descriptionClassName="lg-max:px-24"
        title={
          <>
            Transform <br className="lg:hidden" /> web data into{" "}
            <br className="lg:hidden" />{" "}
            <span className="text-heat-100">AI-powered</span> solutions
          </>
        }
        titleClassName="max-w-650"
      >
        <AiFlame />
      </SectionHead>

      {cards.map((card, index) => (
        <Fragment key={index}>
          {index !== 0 && (
            <div className="h-60 relative -mt-1 z-[2]">
              <CurvyRect className="overlay" allSides />
              <div className="h-1 bg-border-faint top-0 left-0 w-full absolute" />
              <div className="h-1 bg-border-faint bottom-0 left-0 w-full absolute" />
            </div>
          )}

          <AiCard {...card}>{card.children}</AiCard>
        </Fragment>
      ))}
    </section>
  );
}

const cards = [
  {
    title: "Smarter AI chats",
    subtitle: "Chat with context",
    description:
      "Power your AI assistants with real-time, accurate web content.",
    icon: <Chats />,
    action: (
      <Link className="contents" href="#/introduction">
        <Button className="w-max" size="large" variant="secondary">
          View docs
          <ChevronRight />
        </Button>
      </Link>
    ),
    children: <AiChats />,
    id: "ai-chats",
  },
  {
    title: "Lead enrichment",
    subtitle: "Know your leads",
    description: (
      <>
        Enhance your sales data with <br /> web information.
      </>
    ),
    icon: <Leads />,
    action: (
      <Link className="contents" href="/extract">
        <Button className="w-max" size="large" variant="secondary">
          Check out Extract
          <ChevronRight />
        </Button>
      </Link>
    ),
    id: "ai-leads",
    children: <AiLeads />,
  },
  {
    title: "MCPs",
    subtitle: "Know your leads",
    description: (
      <>
        Add powerful scraping to your <br />
        code editors.
      </>
    ),
    icon: <Mcps />,
    action: (
      <Link className="contents" href="#/mcp-server">
        <Button className="w-max" size="large" variant="secondary">
          Get started
          <ChevronRight />
        </Button>
      </Link>
    ),
    id: "ai-mcps",
    children: <AiMcps />,
  },
  {
    title: "AI platforms",
    subtitle: "Build with context",
    description: (
      <>
        Let your customers build AI apps <br />
        with web data.
      </>
    ),
    icon: <Platforms />,
    action: (
      <Link className="contents" href="#/features/map">
        <Button className="w-max" size="large" variant="secondary">
          Check out Map
          <ChevronRight />
        </Button>
      </Link>
    ),
    children: <AiPlatforms />,
    id: "ai-platforms",
  },
  {
    title: "Deep research",
    subtitle: "No insight missed",
    description: (
      <>
        Extract comprehensive information for <br className="lg-max:hidden" />
        in-depth research.
      </>
    ),
    icon: <Research />,
    action: (
      <Link className="contents" href="#/features/search">
        <Button className="w-max" size="large" variant="secondary">
          Build your own with Search
          <ChevronRight />
        </Button>
      </Link>
    ),
    children: <AiResearch />,
    id: "ai-research",
  },
];
