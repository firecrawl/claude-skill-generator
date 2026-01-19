import { CurvyRect } from "@/components/shared/ui";
import Button from "@/components/ui/shadcn/button";
import Link from "next/link";

export default function EnterpriseCta() {
  return (
    <section className="container -mt-1">
      <div className="relative">
        <CurvyRect className="overlay" allSides />

        <div className="p-32 lg:p-64 text-center">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-title-h2 mb-16">
              We'd <span className="text-heat-100">love</span> to chat!
            </h3>
            <p className="text-body-large text-black-alpha-72 mb-32">
              Join leading companies who trust Firecrawl for their
              mission-critical data extraction needs. Get enterprise-grade
              reliability, security, and support.
            </p>

            <div className="flex flex-col lg:flex-row gap-16 justify-center items-center">
              <Link
                href="https://calendly.com/your-link"
                className="relative block w-max z-[2]"
              >
                <Button className="w-150 z-[2]" size="large" variant="primary">
                  Contact sales
                </Button>
                <span className="z-[-1] !absolute -inset-10 bg-background-base" />
              </Link>
              <Link href="/docs" className="relative block w-max z-[2]">
                <Button
                  className="min-w-150 z-[2]"
                  size="large"
                  variant="secondary"
                >
                  Explore docs
                </Button>
                <span className="z-[-1] !absolute -inset-10 bg-background-base" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
