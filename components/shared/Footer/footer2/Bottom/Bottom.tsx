import { CurvyRect } from "@/components/shared/ui";
import FooterNavItem from "@/components/shared/Footer/footer2/Nav/Item/Item";

export default function FooterBottom() {
  return (
    <div className="flex text-body-medium pl-1 flex-wrap whitespace-nowrap relative">
      <CurvyRect
        className="-top-1 absolute left-0 w-full h-[calc(100%+1px)]"
        allSides
      />
      <div className="px-16 lg:px-28 py-16 text-black-alpha-20 -mt-1 -ml-1 w-[calc(50%+1px)] lg:flex-1 relative before:inside-border before:border-border-faint">
        © 2025 Firecrawl
      </div>

      <FooterNavItem
        className="-ml-1 -mt-1 w-[calc(50%+1px)] lg:flex-1"
        href="/terms-of-service"
        label="Terms of Service"
      />
      <FooterNavItem
        className="-ml-1 -mt-1 w-[calc(50%+1px)] lg:flex-1"
        href="/privacy-policy"
        label="Privacy Policy"
      />
      <FooterNavItem
        className="-ml-1 -mt-1 w-[calc(50%+1px)] lg:flex-1"
        href="mailto:help@firecrawl.com?subject=Issue:"
        label="Report Abuse"
      />
    </div>
  );
}
