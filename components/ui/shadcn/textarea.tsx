import { cn } from "@/lib/utils";

type TextareaProps = React.ComponentPropsWithoutRef<"textarea"> & {
  containerClassName?: string;
};

export default function Textarea({
  containerClassName,
  ...textareaProps
}: TextareaProps) {
  return (
    <label
      className={cn(
        "py-8 px-12 rounded-8 transition-all w-full block gap-4 cursor-text",
        "relative bg-accent-white",
        "before:inside-border before:border-black-alpha-8 hover:before:border-black-alpha-12 hover:bg-black-alpha-2 focus-within:!bg-accent-white focus-within:before:!border-heat-100 focus-within:before:!border-[1.25px]",
        "text-body-medium",
        containerClassName,
      )}
    >
      <textarea
        className="outline-none w-full resize-none bg-transparent"
        {...textareaProps}
      />
    </label>
  );
}
