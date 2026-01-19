import { CurvyRect } from "@/components/shared/ui";
import Image from "@/components/shared/image/Image";
import Link from "next/link";

const testimonials = [
  {
    name: "Andrew Gardner",
    title: "Sr. Engineer",
    company: "Zapier",
    quote:
      "Firecrawl allows our customers to pull the web information they need directly in our product.",
    avatar: "andrew-gardner",
    href: "https://www.firecrawl.dev/blog/how-zapier-uses-firecrawl-to-power-chatbots",
  },
  {
    name: "Michael Masson",
    title: "Director of Engineering",
    company: "Botpress",
    quote:
      "Firecrawl is the easiest way to extract relevant content from a website.",
    avatar: "michael-masson",
    href: "https://www.firecrawl.dev/blog/how-botpress-enhances-knowledge-base-creation-with-firecrawl",
  },
  {
    name: "Zhen Li",
    title: "Staff AI Engineer",
    company: "Replit",
    quote:
      "If your agent or LLM needs web content, Firecrawl delivers the best-formatted results.",
    avatar: "zhen-li",
    href: "https://www.firecrawl.dev/blog/how-replit-uses-firecrawl-to-power-ai-agents",
  },
];

export default function CustomerSuccess() {
  return (
    <section className="container -mt-1">
      <div className="relative">
        <CurvyRect className="overlay" allSides />

        <div className="p-32 lg:p-64">
          <div className="text-center mb-48">
            <h3 className="text-title-h3 mb-16">
              What Our Enterprise Customers Say
            </h3>
            <p className="text-body-large text-black-alpha-72 max-w-2xl mx-auto">
              See how leading companies use Firecrawl to power their
              mission-critical applications.
            </p>
          </div>
          <div>
            <div className="flex flex-col lg:flex-row lg:w-max lg:mx-auto">
              {testimonials.map((testimonial, index) => (
                <Link
                  key={index}
                  href={testimonial.href}
                  target="_blank"
                  className="w-full lg:w-320 relative group block hover:bg-black-alpha-2 transition-all duration-[200ms]"
                >
                  <div className="left-0 w-[calc(100%+1px)] border-x border-border-faint absolute top-0 h-full" />

                  <div className="h-24 w-2 transition-all duration-[200ms] scale-x-0 origin-left group-hover:scale-x-100 absolute left-0 top-32 bg-heat-100" />

                  <div className="px-28 py-20 lg:p-24 flex-1 lg:pl-32 border-b border-border-faint flex gap-16 items-center">
                    <div className="size-40 rounded-full bg-background-base relative before:inside-border before:border-black-alpha-5 overflow-hidden">
                      <Image
                        alt={testimonial.name}
                        className="size-40"
                        src={`testimonials/${testimonial.avatar}`}
                        raw={true}
                      />
                    </div>

                    <div className="flex-1">
                      <div className="text-label-medium">
                        {testimonial.name}
                      </div>
                      <div className="text-body-small text-black-alpha-56">
                        {testimonial.title}, {testimonial.company}
                      </div>
                    </div>
                  </div>

                  <div className="h-auto lg:h-144 p-28 lg:px-32 lg:py-24 text-body-large">
                    <blockquote className="italic">
                      "{testimonial.quote}"
                    </blockquote>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
