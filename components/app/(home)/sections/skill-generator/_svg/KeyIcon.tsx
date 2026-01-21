import { SVGProps } from "react";

export default function KeyIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12.5 7.5C12.5 9.15685 11.1569 10.5 9.5 10.5C7.84315 10.5 6.5 9.15685 6.5 7.5C6.5 5.84315 7.84315 4.5 9.5 4.5C11.1569 4.5 12.5 5.84315 12.5 7.5Z"
        stroke="#FA5D19"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.5 10.5V15.5M9.5 15.5H7M9.5 15.5H12M9.5 13H11.5"
        stroke="#FA5D19"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
