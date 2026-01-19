export default function SchemaBuilderAdd({ onClick }: { onClick: () => void }) {
  return (
    <button
      className="border border-dashed rounded-10 hover:bg-black-alpha-2 active:bg-black-alpha-4 active:scale-[0.999] transition-all active:duration-[100ms] flex justify-center p-12"
      onClick={onClick}
    >
      <svg
        fill="none"
        height="20"
        viewBox="0 0 20 20"
        width="20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10 6V14M14 10H6"
          stroke="#262626"
          strokeLinecap="round"
          strokeOpacity="0.48"
          strokeWidth="1.25"
        />
      </svg>
    </button>
  );
}
