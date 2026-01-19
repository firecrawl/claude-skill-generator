export default function SecurityIcon() {
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
          d="M10 1.5L16.5 4V9.5C16.5 13.5 13.5 17.5 10 18.5C6.5 17.5 3.5 13.5 3.5 9.5V4L10 1.5Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-heat-100"
        />
        <path
          d="M7.5 10L9 11.5L12.5 8"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-heat-100"
        />
      </svg>
    </div>
  );
}
