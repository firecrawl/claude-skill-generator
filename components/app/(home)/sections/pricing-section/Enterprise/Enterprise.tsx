import Button from "@/components/ui/shadcn/button";
import { CurvyRect } from "@/components/shared/ui";
import HomePricingEnterpriseFlame from "@/components/app/(home)/sections/pricing-section/Enterprise/EnterpriseFlame/EnterpriseFlame";

import BulkIcon from "./_svg/Bulk";
import ConcurrencyIcon from "./_svg/Concurrency";
import SecurityIcon from "./_svg/Security";
import SlaIcon from "./_svg/Sla";
import StealthIcon from "./_svg/Stealth";
import SupportIcon from "./_svg/Support";
import Link from "next/link";

export default function HomePricingEnterprise() {
  return (
    <div className="grid lg:grid-cols-2 relative -mt-1">
      <div className="h-1 bg-border-faint left-0 absolute w-full top-0" />
      <CurvyRect className="overlay" allSides />

      <div className="p-24 lg:px-64 lg:py-56 flex flex-col relative overflow-hidden">
        <div className="text-title-h5 mb-16">Enterprise</div>
        <div className="text-body-large">Power at your pace</div>
        <div className="text-label-large">Unlimited credits. Custom RPMs.</div>

        <div className="flex-1 min-h-80" />

        <div className="flex flex-col lg:flex-row gap-16 justify-center items-center">
          <Link
            href="https://fk4bvu0n5qp.typeform.com/to/Ej6oydlg"
            className="relative block w-max z-[2]"
          >
            <Button className="w-150 z-[2]" size="large" variant="primary">
              Contact sales
            </Button>
            <span className="z-[-1] !absolute -inset-10 bg-background-base" />
          </Link>
          <Link href="/enterprise" className="relative block w-max z-[2]">
            <Button
              className="min-w-150 z-[2]"
              size="large"
              variant="secondary"
            >
              More details
            </Button>
            <span className="z-[-1] !absolute -inset-10 bg-background-base" />
          </Link>
        </div>

        <HomePricingEnterpriseFlame />
      </div>

      <div className="grid grid-cols-2 relative lg-max:border-t border-border-faint">
        {features.map((feature, i) => (
          <div
            className="p-24 lg:p-28 border-b border-border-faint border-l"
            key={i}
          >
            <feature.icon />

            <div className="text-body-medium mt-20">{feature.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

const features = [
  {
    icon: BulkIcon,
    title: "Bulk discounts",
  },
  {
    icon: SupportIcon,
    title: "Top priority support",
  },
  {
    icon: ConcurrencyIcon,
    title: "Custom concurrency limits",
  },
  {
    icon: StealthIcon,
    title: "Improved stealth proxies",
  },
  {
    icon: SlaIcon,
    title: "SLAs",
  },
  {
    icon: SecurityIcon,
    title: "Advanced security & controls",
  },
];
