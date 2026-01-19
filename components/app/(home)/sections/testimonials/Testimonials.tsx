import { CurvyRect } from "@/components/shared/ui";
import Image from "@/components/shared/image/Image";
import SectionHead from "@/components/shared/section-head/SectionHead";

import ArrowTop from "./_svg/ArrowTop";
import BadgeIcon from "./_svg/BadgeIcon";
import TestimonialsRowAnimation from "./Animation/Animation";
import TestimonialsFlame from "./Flame/Flame";
import Link from "next/link";

export default function Testimonials() {
  return (
    <section className="container -mt-1">
      <SectionHead
        badgeClassName="h-max lg:!mx-[0px]"
        badgeContent={
          <>
            <BadgeIcon />
            <span>Community</span>
          </>
        }
        className="!mx-[0px]"
        containerClassName="lg:max-w-[736px] lg:mx-auto lg:flex justify-between"
        description="Discover why developers choose Firecrawl every day."
        descriptionClassName="lg:!mx-[0px] lg:!text-start lg:!max-w-[unset]"
        title={
          <>
            People love <br /> building with{" "}
            <span className="text-heat-100">Firecrawl</span>
          </>
        }
        titleClassName="lg:max-w-600 lg:!text-title-h3 lg:!mx-[0px] lg:!text-start lg:!pt-0"
      >
        <TestimonialsFlame />
      </SectionHead>

      <div className="relative -mt-1">
        <CurvyRect className="overlay" allSides />

        <div className="h-[calc(50%+1px)] absolute top-0 left-0 w-full">
          <div className="h-1 bg-border-faint absolute bottom-0 left-0 w-full" />
          <CurvyRect allSides />
        </div>

        <div className="h-[calc(50%-0.5px)] absolute bottom-0 left-0 w-full">
          <div className="h-1 bg-border-faint absolute bottom-0 left-0 w-full" />
          <CurvyRect allSides />
        </div>

        <div className="w-full overflow-hidden">
          <TestimonialsRowAnimation>
            <Row testimonials={TESTIMONIALS_FIRST_ROW} />
          </TestimonialsRowAnimation>

          <TestimonialsRowAnimation reverse>
            <Row testimonials={TESTIMONIALS_SECOND_ROW} />
          </TestimonialsRowAnimation>
        </div>
      </div>
    </section>
  );
}

const Row = ({ testimonials }: { testimonials: typeof TESTIMONIALS }) => {
  return (
    <div className="flex w-max">
      {testimonials.map((testimonial) => (
        <Link
          className="w-328 lg:w-360 relative group block hover:bg-black-alpha-2 [&_span]:block transition-all duration-[200ms]"
          href={testimonial.href}
          key={testimonial.name}
          target="_blank"
        >
          <div className="left-0 w-[calc(100%+1px)] border-x border-border-faint absolute top-0 h-full" />

          <div className="h-24 w-2 transition-all duration-[200ms] scale-x-0 origin-left group-hover:scale-x-100 absolute left-0 top-32 bg-heat-100" />

          <span className="px-28 py-20 lg:p-24 flex-1 lg:pl-32 border-b border-border-faint !flex gap-16 items-center">
            <span className="size-40 rounded-full bg-background-base relative before:inside-border before:border-black-alpha-5 overflow-hidden">
              <Image
                alt={testimonial.name}
                className="size-40"
                src={`testimonials/${testimonial.avatar}`}
              />
            </span>

            <span className="flex-1">
              <span className="text-label-medium">{testimonial.name}</span>
              <span className="text-body-small text-black-alpha-56">
                {testimonial.tag}
              </span>
            </span>

            <span className="-translate-x-2 translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-[200ms]">
              <ArrowTop />
            </span>
          </span>

          <span
            className="h-212 lg:h-144 p-28 lg:px-32 lg:py-24 text-body-large [&_span]:!inline"
            dangerouslySetInnerHTML={{
              __html:
                '"' +
                testimonial.content
                  .replaceAll("\n", "<br />")
                  .replaceAll(
                    "@firecrawl_dev",
                    '<span class="text-heat-100">@firecrawl_dev</span>',
                  )
                  .replaceAll(
                    "Firecrawl",
                    '<span class="text-heat-100">Firecrawl</span>',
                  ) +
                '"',
            }}
          />
        </Link>
      ))}
    </div>
  );
};

const TESTIMONIALS = [
  {
    name: "Morgan Linton",
    tag: "@morganlinton",
    content:
      "If you're coding with AI, and haven't discovered @firecrawl_dev yet, prepare to have your mind blown 🤯",
    avatar: "morgan-linton",
    href: "https://x.com/morganlinton/status/1839454165703204955",
  },
  {
    name: "Chris DeWeese",
    tag: "@chrisdeweese_",
    content:
      "Started using @firecrawl_dev for a project, I wish I used this sooner.",
    avatar: "chris-deweese",
    href: "https://x.com/chrisdeweese_/status/1853587120406876601",
  },
  {
    name: "Alex Reibman",
    tag: "@AlexReibman",
    content:
      "Moved our internal agent's web scraping tool from Apify to Firecrawl because it benchmarked 50x faster with AgentOps.",
    avatar: "alex-reibman",
    href: "https://x.com/AlexReibman/status/1780299595484131836",
  },
  {
    name: "Tom - Morpho",
    tag: "@TomReppelin",
    content: "I found gold today. Thank you @firecrawl_dev",
    avatar: "tom-morpho",
    href: "https://x.com/TomReppelin/status/1844382491014201613",
  },
  {
    name: "Bardia",
    tag: "@thepericulum",
    content:
      "The Firecrawl team ships. I wanted types for their node SDK, and less than an hour later, I got them.",
    avatar: "bardia",
    href: "https://x.com/thepericulum/status/1781397799487078874",
  },
  {
    name: "Matt Busigin",
    tag: "@mbusigin",
    content: "Firecrawl is dope. Congrats guys 👏",
    avatar: "matt-busigin",
    href: "https://x.com/mbusigin/status/1836065372010656069",
  },
  {
    name: "Sumanth",
    tag: "@Sumanth_077",
    content:
      "Web scraping will never be the same!\n\nFirecrawl is an open-source framework that takes a URL, crawls it, and conver...",
    avatar: "sumanth",
    href: "https://x.com/Sumanth_077/status/1940049003074478511",
  },
  {
    name: "Steven Tey",
    tag: "@steventey",
    content:
      "Open-source Clay alternative just dropped\n\nUpload a CSV of emails and...",
    avatar: "steven-tey",
    href: "https://x.com/steventey/status/1932945651761098889",
  },
];

const TESTIMONIALS_FIRST_ROW = TESTIMONIALS.slice(
  0,
  Math.floor(TESTIMONIALS.length / 2),
);
const TESTIMONIALS_SECOND_ROW = TESTIMONIALS.slice(
  Math.floor(TESTIMONIALS.length / 2),
);
