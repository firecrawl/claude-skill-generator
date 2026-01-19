import { Ticker } from "@/components/shared/pixi/Pixi";
import setTimeoutOnVisible from "@/utils/set-timeout-on-visible";
import cell from "@/components/app/(home)/sections/hero/Pixi/tickers/features/cell";

const features: Ticker = (params) => {
  if (typeof window === "undefined" || window.innerWidth < 996) return;

  const cells: ReturnType<typeof cell>[] = [];

  for (let i = 0; i < 6; i++) {
    cells.push(
      cell({
        ...params,
        x: (i % 3) * 101,
        y: Math.floor(i / 3) * 101,
      }),
      cell({
        ...params,
        x: params.canvas.clientWidth - 101 - (i % 3) * 101,
        y: Math.floor(i / 3) * 101,
      }),
    );
  }

  const cycle = () =>
    setTimeoutOnVisible({
      element: params.canvas,
      callback: () => {
        const cell = cells[Math.floor(Math.random() * cells.length)];

        if (cell) {
          cell.trigger().then(() => cycle());
        }
      },
      timeout: 3000 * Math.random(),
    });

  for (let i = 0; i < 2; i++) {
    cycle();
  }
};

export default features;
