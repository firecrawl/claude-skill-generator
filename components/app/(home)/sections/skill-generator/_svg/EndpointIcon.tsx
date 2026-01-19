import { SVGProps } from "react";

export default function EndpointIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="mt-1 shrink-0"
      {...props}
    >
      <path
        d="M5 8H11M11 8L8.5 5.5M11 8L8.5 10.5"
        stroke="#FA5D19"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="8"
        cy="8"
        r="6"
        stroke="#FA5D19"
        strokeWidth="1.5"
        strokeOpacity="0.3"
      />
    </svg>
  );
}
