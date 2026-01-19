export default function ValidityIcon() {
  return (
    <div className="w-40 h-40 bg-heat-12 rounded-12 flex items-center justify-center flex-shrink-0">
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="3"
          y="4"
          width="14"
          height="14"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-heat-100"
        />
        <path
          d="M7 2V6M13 2V6M3 10H17"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-heat-100"
        />
        <circle
          cx="10"
          cy="14"
          r="1"
          fill="currentColor"
          className="text-heat-100"
        />
      </svg>
    </div>
  );
}
