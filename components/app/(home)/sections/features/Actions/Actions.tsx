import { CurvyRect } from "@/components/shared/ui";
import TabIcon from "./_svg/TabIcon";
import FeaturesActionsItem from "./Item/Item";
import { Connector } from "@/components/shared/layout/curvy-rect";

export default function FeaturesActions() {
  return (
    <div className="w-full">
      <div className="flex relative h-42">
        <CurvyRect className="overlay" bottom />
        <div className="h-1 bottom-0 left-0 w-full absolute bg-border-faint" />

        <div className="px-15 flex gap-10 border-r border-border-faint items-center h-full">
          {Array.from({ length: 3 }, (_, i) => (
            <div
              className="size-12 rounded-full before:inside-border before:border-border-muted relative"
              key={i}
            />
          ))}
        </div>

        <div className="px-12 flex items-center h-full gap-10">
          <TabIcon />

          <div className="text-body-small text-black-alpha-48">
            https://example.com
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 relative">
        <div className="absolute h-full w-1 bg-border-faint left-2/4" />
        <div className="absolute w-full h-1 top-1/2 bg-border-faint left-0" />

        <div className="absolute lg:h-full h-1 w-full top-1/4 lg:top-0 lg:w-1 bg-border-faint lg:left-1/4" />
        <div className="absolute lg:h-full h-1 w-full top-3/4 lg:top-0 lg:w-1 bg-border-faint left-0 lg:left-3/4" />
        {/* <div className="absolute lg:hidden h-1 w-full top-3/4 bg-border-faint left-3/4" /> */}

        <CurvyRect
          className="-top-1 absolute left-0 w-full h-[calc(100%+3px)]"
          allSides
        />
        <Connector className="absolute left-[calc(50%-10.5px)] top-[calc(25%-10px)] lg:top-[calc(50%-10px)] lg:left-[calc(25%-10.5px)]" />
        <Connector className="absolute top-[calc(50%-10px)] left-[calc(50%-10.5px)]" />
        <Connector className="absolute left-[calc(50%-10.5px)] top-[calc(75%-10px)] lg:top-[calc(25%-10px)] lg:left-[calc(75%-10.5px)]" />

        {data.map((item) => (
          <FeaturesActionsItem
            description={item.description}
            icon={item.icon}
            key={item.title}
            title={item.title}
          />
        ))}
      </div>
    </div>
  );
}

const data = [
  {
    icon: (
      <svg
        fill="none"
        height="24"
        viewBox="0 0 24 24"
        width="24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.25 3.75H6.95C5.8299 3.75 5.26984 3.75 4.84202 3.96799C4.46569 4.15973 4.15973 4.46569 3.96799 4.84202C3.75 5.26984 3.75 5.8299 3.75 6.95V17.05C3.75 18.1701 3.75 18.7302 3.96799 19.158C4.15973 19.5343 4.46569 19.8403 4.84202 20.032C5.26984 20.25 5.8299 20.25 6.95 20.25H17.05C18.1701 20.25 18.7302 20.25 19.158 20.032C19.5343 19.8403 19.8403 19.5343 20.032 19.158C20.25 18.7302 20.25 18.1701 20.25 17.05V14.75M13.75 3.75H20.25M20.25 3.75V10.25M20.25 3.75L11 13"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.25"
        />
      </svg>
    ),
    title: "Navigate",
    description: "Navigate to a new URL before scraping.",
  },
  {
    icon: (
      <svg
        fill="none"
        height="24"
        viewBox="0 0 24 24"
        width="24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11 2.75V4.5M16.9069 5.09326L15.5962 6.40392M6.40381 15.5962L5.09315 16.9069M4.5 11H2.75M6.40381 6.40381L5.09315 5.09315M14.1323 20.999L10.5777 11.3226C10.3542 10.7143 10.9552 10.1281 11.5577 10.3666L21.0397 14.1199C21.4283 14.2737 21.4679 14.8081 21.1062 15.0175L17.4231 17.1498C17.3097 17.2155 17.2155 17.3097 17.1498 17.4231L15.0343 21.0771C14.822 21.4438 14.2784 21.3967 14.1323 20.999Z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.25"
        />
      </svg>
    ),
    title: "Click",
    description: "Click on an element to interact with it.",
  },
  {
    icon: (
      <svg
        fill="none"
        height="24"
        viewBox="0 0 24 24"
        width="24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6.25 12.75C6.25 13.0261 6.02614 13.25 5.75 13.25C5.47386 13.25 5.25 13.0261 5.25 12.75C5.25 12.4739 5.47386 12.25 5.75 12.25C6.02614 12.25 6.25 12.4739 6.25 12.75Z"
          fill="currentColor"
        />
        <path
          d="M6.25 17.25C6.25 17.5261 6.02614 17.75 5.75 17.75C5.47386 17.75 5.25 17.5261 5.25 17.25C5.25 16.9739 5.47386 16.75 5.75 16.75C6.02614 16.75 6.25 16.9739 6.25 17.25Z"
          fill="currentColor"
        />
        <path
          d="M18.7502 12.75C18.7502 13.0261 18.5264 13.25 18.2502 13.25C17.9741 13.25 17.7502 13.0261 17.7502 12.75C17.7502 12.4739 17.9741 12.25 18.2502 12.25C18.5264 12.25 18.7502 12.4739 18.7502 12.75Z"
          fill="currentColor"
        />
        <path
          d="M18.7502 17.25C18.7502 17.5261 18.5264 17.75 18.2502 17.75C17.9741 17.75 17.7502 17.5261 17.7502 17.25C17.7502 16.9739 17.9741 16.75 18.2502 16.75C18.5264 16.75 18.7502 16.9739 18.7502 17.25Z"
          fill="currentColor"
        />
        <path
          d="M10.25 12.75C10.25 13.0261 10.0261 13.25 9.75 13.25C9.47386 13.25 9.25 13.0261 9.25 12.75C9.25 12.4739 9.47386 12.25 9.75 12.25C10.0261 12.25 10.25 12.4739 10.25 12.75Z"
          fill="currentColor"
        />
        <path
          d="M14.75 12.75C14.75 13.0261 14.5261 13.25 14.25 13.25C13.9739 13.25 13.75 13.0261 13.75 12.75C13.75 12.4739 13.9739 12.25 14.25 12.25C14.5261 12.25 14.75 12.4739 14.75 12.75Z"
          fill="currentColor"
        />
        <path
          d="M5.75 16.5C6.16421 16.5 6.5 16.8358 6.5 17.25C6.5 17.6642 6.16421 18 5.75 18C5.33579 18 5 17.6642 5 17.25C5 16.8358 5.33579 16.5 5.75 16.5ZM18.25 16.5C18.6642 16.5 19 16.8358 19 17.25C19 17.6642 18.6642 18 18.25 18C17.8359 17.9999 17.5 17.6641 17.5 17.25C17.5 16.8359 17.8359 16.5001 18.25 16.5ZM5.75 12C6.16421 12 6.5 12.3358 6.5 12.75C6.5 13.1642 6.16421 13.5 5.75 13.5C5.33579 13.5 5 13.1642 5 12.75C5 12.3358 5.33579 12 5.75 12ZM9.75 12C10.1642 12 10.5 12.3358 10.5 12.75C10.5 13.1642 10.1642 13.5 9.75 13.5C9.33579 13.5 9 13.1642 9 12.75C9 12.3358 9.33579 12 9.75 12ZM14.25 12C14.6642 12 15 12.3358 15 12.75C15 13.1642 14.6642 13.5 14.25 13.5C13.8358 13.5 13.5 13.1642 13.5 12.75C13.5 12.3358 13.8358 12 14.25 12ZM18.25 12C18.6642 12 19 12.3358 19 12.75C19 13.1642 18.6642 13.5 18.25 13.5C17.8359 13.4999 17.5 13.1641 17.5 12.75C17.5 12.3359 17.8359 12.0001 18.25 12Z"
          stroke="currentColor"
          strokeWidth="0.5"
        />
        <path
          d="M9.75 17.25H14.25M5.75 8.75V6.75C5.75 5.64543 6.64543 4.75 7.75 4.75H16.75C17.5784 4.75 18.25 4.07843 18.25 3.25V2.75M3.75 8.75H20.25C21.3546 8.75 22.25 9.64543 22.25 10.75V19.25C22.25 20.3546 21.3546 21.25 20.25 21.25H3.75C2.64543 21.25 1.75 20.3546 1.75 19.25V10.75C1.75 9.64543 2.64543 8.75 3.75 8.75Z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.25"
        />
      </svg>
    ),
    title: "Type",
    description: "Type text into an input field.",
  },
  {
    icon: (
      <svg
        fill="none"
        height="24"
        viewBox="0 0 24 24"
        width="24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 7.75V12L14.75 14.75M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.25"
        />
      </svg>
    ),
    title: "Wait",
    description: "Wait for a specific amount of time before continuing.",
  },
  {
    icon: (
      <svg
        fill="none"
        height="24"
        viewBox="0 0 24 24"
        width="24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15 20.25L13.1094 21.5104C12.4376 21.9583 11.5624 21.9583 10.8906 21.5104L9 20.25M12 5.75V8.25M12 17.25C9.10051 17.25 6.75 14.8995 6.75 12V7C6.75 4.1005 9.10051 1.75 12 1.75C14.8995 1.75 17.25 4.10051 17.25 7V12C17.25 14.8995 14.8995 17.25 12 17.25Z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.25"
        />
      </svg>
    ),
    title: "Scroll",
    description: "Scroll certain amount of pixels.",
  },
  {
    icon: (
      <svg
        fill="none"
        height="24"
        viewBox="0 0 24 24"
        width="24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13.0278 12H12.4028C12.4028 12.3452 12.6826 12.625 13.0278 12.625V12ZM9.91667 13.5417L9.63916 14.1017C9.83289 14.1977 10.0625 14.1867 10.2462 14.0727C10.4299 13.9587 10.5417 13.7579 10.5417 13.5417H9.91667ZM9.85872 13.513L9.58122 14.073L9.85872 13.513ZM7.00544 14.5881L6.42586 14.3542H6.42586L7.00544 14.5881ZM6.80556 15.0833L6.22598 14.8494C6.14835 15.0418 6.1712 15.2601 6.28697 15.4322L6.80556 15.0833ZM9.72226 19.4193L10.2408 19.0705L9.72226 19.4193ZM16.9922 7.9932C17.0498 8.33354 17.3724 8.56273 17.7127 8.50512C18.0531 8.44751 18.2823 8.12491 18.2246 7.78457L16.9922 7.9932ZM4.7198 10.0488C4.77741 10.3891 5.10001 10.6183 5.44035 10.5607C5.78068 10.5031 6.00988 10.1805 5.95226 9.84013L4.7198 10.0488ZM13.0278 12H13.6528V8.91667H13.0278H12.4028V12H13.0278ZM9.91667 8.91667H9.29167V13.5417H9.91667H10.5417V8.91667H9.91667ZM9.91667 13.5417L10.1942 12.9817L10.1362 12.9529L9.85872 13.513L9.58122 14.073L9.63916 14.1017L9.91667 13.5417ZM7.00544 14.5881L6.42586 14.3542L6.22598 14.8494L6.80556 15.0833L7.38513 15.3173L7.58501 14.822L7.00544 14.5881ZM6.80556 15.0833L6.28697 15.4322L9.20367 19.7682L9.72226 19.4193L10.2408 19.0705L7.32415 14.7345L6.80556 15.0833ZM13.1737 21.25V21.875H14.0648V21.25V20.625H13.1737V21.25ZM19.25 16.1111H19.875V15.0833H19.25H18.625V16.1111H19.25ZM16.1389 12V11.375H13.0278V12V12.625H16.1389V12ZM19.25 15.0833H19.875C19.875 13.03 18.197 11.375 16.1389 11.375V12V12.625C17.5172 12.625 18.625 13.7309 18.625 15.0833H19.25ZM9.85872 13.513L10.1362 12.9529C8.7283 12.2553 7.01422 12.8964 6.42586 14.3542L7.00544 14.5881L7.58501 14.822C7.89797 14.0466 8.81852 13.695 9.58122 14.073L9.85872 13.513ZM14.0648 21.25V21.875C17.2684 21.875 19.875 19.2997 19.875 16.1111H19.25H18.625C18.625 18.5988 16.5886 20.625 14.0648 20.625V21.25ZM11.4722 7.375V6.75C10.2732 6.75 9.29167 7.71478 9.29167 8.91667H9.91667H10.5417C10.5417 8.41568 10.953 8 11.4722 8V7.375ZM9.72226 19.4193L9.20367 19.7682C10.09 21.0858 11.5803 21.875 13.1737 21.875V21.25V20.625C11.9933 20.625 10.8932 20.0403 10.2408 19.0705L9.72226 19.4193ZM13.0278 8.91667H13.6528C13.6528 7.71478 12.6712 6.75 11.4722 6.75V7.375V8C11.9915 8 12.4028 8.41568 12.4028 8.91667H13.0278ZM5.25 8.91667H5.875C5.875 5.86136 8.37567 3.375 11.4722 3.375V2.75V2.125C7.6959 2.125 4.625 5.16046 4.625 8.91667H5.25ZM11.4722 2.75V3.375C14.2494 3.375 16.5492 5.37631 16.9922 7.9932L17.6084 7.88889L18.2246 7.78457C17.6802 4.56839 14.8613 2.125 11.4722 2.125V2.75ZM5.33603 9.94444L5.95226 9.84013C5.90149 9.5402 5.875 9.23174 5.875 8.91667H5.25H4.625C4.625 9.30195 4.65741 9.6802 4.7198 10.0488L5.33603 9.94444Z"
          fill="currentColor"
        />
      </svg>
    ),
    title: "Press",
    description: "Press a key on the keyboard.",
  },
  {
    icon: (
      <svg
        fill="none"
        height="24"
        viewBox="0 0 24 24"
        width="24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.25 3.75H5.75C4.64543 3.75 3.75 4.64543 3.75 5.75V8.25M15.75 3.75H18.25C19.3546 3.75 20.25 4.64543 20.25 5.75V8.25M20.25 15.75V18.25C20.25 19.3546 19.3546 20.25 18.25 20.25H15.75M8.25 20.25H5.75C4.64543 20.25 3.75 19.3546 3.75 18.25V15.75"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.25"
        />
      </svg>
    ),
    title: "Screenshot",
    description: "Take a screenshot of the current page.",
  },
  {
    icon: (
      <svg
        fill="none"
        height="24"
        viewBox="0 0 24 24"
        width="24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6.25 4.75H4.75C3.64543 4.75 2.75 5.64543 2.75 6.75V8.25M17.75 4.75H19.25C20.3546 4.75 21.25 5.64543 21.25 6.75V8.25M21.25 15.75V17.25C21.25 18.3546 20.3546 19.25 19.25 19.25H17.75M6.25 19.25H4.75C3.64543 19.25 2.75 18.3546 2.75 17.25V15.75"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.25"
        />
        <path
          d="M7.75 9.75H16.25"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.25"
        />
        <path
          d="M7.75 14.25H14.25"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.25"
        />
      </svg>
    ),
    title: "Scrape",
    description: "Finalize with scraping.",
  },
];
