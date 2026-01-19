import CurvyRect from "@/components/shared/layout/curvy-rect";

interface AiCardProps {
  title: string;
  subtitle: string;
  description: React.ReactNode;
  icon: React.ReactNode;
  children?: React.ReactNode;
  action?: React.ReactNode;
  id?: string;
}

export default function AiCard(props: AiCardProps) {
  return (
    <div className="relative lg:flex lg:h-400" id={props.id}>
      <div className="p-32 lg:px-64 lg:py-60 z-[2] lg:w-454 relative flex flex-col h-full">
        <CurvyRect
          className="absolute -top-1 h-[calc(100%+1px)] left-0 w-full"
          allSides
        />

        <div className="flex gap-8 items-center text-label-small text-black-alpha-64 mb-16">
          {props.icon}
          {props.subtitle}
        </div>

        <div className="text-title-h4 max-w-350 mb-12">{props.title}</div>

        <div className="text-body-large">{props.description}</div>

        <div className="flex-1 mb-24" />

        {props.action}
      </div>

      <div className="flex-1 -mt-1 lg:-ml-1 relative">
        <div className="absolute lg-max:w-full lg-max:h-1 left-0 h-full w-1 bg-border-faint top-0" />
        <CurvyRect className="absolute top-0 h-full left-0 w-full" allSides />

        {props.children}
      </div>
    </div>
  );
}
