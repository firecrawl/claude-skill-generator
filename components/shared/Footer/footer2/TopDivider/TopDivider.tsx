import { CurvyRect } from "@/components/shared/ui";

export default function FooterTopDivider() {
  return (
    <>
      <div className="container -mt-1 pointer-events-none select-none">
        <div className="h-92 lg:h-140 relative">
          <div className="h-1 bottom-0 absolute left-0 w-full bg-border-faint" />
          <div className="h-1 top-0 absolute w-screen left-[calc(50%-50vw)] bg-border-faint" />
          <CurvyRect className="overlay" allSides />
          <CurvyRect className="size-100 -left-99 absolute top-0" topRight />
          <CurvyRect
            className="size-100 -left-99 absolute -top-99"
            bottomRight
          />
          <CurvyRect className="size-100 -right-99 absolute top-0" topLeft />
          <CurvyRect
            className="size-100 -right-99 absolute -top-99"
            bottomLeft
          />
        </div>

        <div className="relative grid grid-cols-2 -mt-1">
          <div className="h-1 bottom-0 absolute w-screen left-[calc(50%-50vw)] bg-border-faint" />

          <CurvyRect className="overlay" allSides />
          <CurvyRect
            className="size-100 -left-99 absolute bottom-0"
            bottomRight
          />
          <CurvyRect
            className="size-100 -left-99 absolute -bottom-99"
            topRight
          />
          <CurvyRect
            className="size-100 -right-99 absolute bottom-0"
            bottomLeft
          />
          <CurvyRect
            className="size-100 -right-99 absolute -bottom-99"
            topLeft
          />

          <div className="flex gap-40 py-24 lg:py-45 relative">
            <div className="lg-max:hidden h-full w-1 -right-[0.5px] top-0 bg-border-faint absolute" />

            <div className="pl-20 lg:pl-42 !text-mono-x-small text-black-alpha-16 font-mono">
              FOOTER
            </div>
          </div>
        </div>
      </div>

      <div className="container lg-max:hidden -mt-1">
        <div className="relative -mt-1 flex gap-12 p-15 before:inside-border before:border-border-faint before:!border-x-0">
          <CurvyRect className="overlay" allSides />

          <div className="flex-1 h-12 rounded-full relative before:inside-border before:border-border-faint" />
          <div className="size-12 rounded-full relative before:inside-border before:border-border-faint" />
          <div className="flex-1 h-12 rounded-full relative before:inside-border before:border-border-faint" />
        </div>
      </div>
    </>
  );
}
