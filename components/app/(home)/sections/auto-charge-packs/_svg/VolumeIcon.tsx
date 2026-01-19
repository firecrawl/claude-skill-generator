export default function VolumeIcon() {
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
          x="2"
          y="4"
          width="16"
          height="10"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-heat-100"
        />
        <rect
          x="2"
          y="8"
          width="16"
          height="2"
          fill="currentColor"
          className="text-heat-100"
        />
        <circle
          cx="15"
          cy="9"
          r="1"
          fill="currentColor"
          className="text-heat-100"
        />
      </svg>
    </div>
  );
}
