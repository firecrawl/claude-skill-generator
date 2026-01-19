export default function PrivacyIcon() {
  return (
    <div className="w-40 h-40 bg-heat-12 rounded-12 flex items-center justify-center flex-shrink-0">
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5 8V6C5 3.79086 6.79086 2 9 2H11C13.2091 2 15 3.79086 15 6V8"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-heat-100"
        />
        <rect
          x="3"
          y="8"
          width="14"
          height="9"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-heat-100"
        />
        <circle
          cx="10"
          cy="12.5"
          r="1.5"
          fill="currentColor"
          className="text-heat-100"
        />
      </svg>
    </div>
  );
}
