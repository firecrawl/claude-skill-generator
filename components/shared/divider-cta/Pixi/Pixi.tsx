"use client";

import Pixi from "@/components/shared/pixi/Pixi";

import features from "./features";

export default function DividerCtaPixi() {
  return (
    <Pixi
      canvasAttrs={{
        className:
          "w-full lg-max:hidden h-204 absolute top-0 left-0 pointer-events-none",
      }}
      fps={Infinity}
      initOptions={{ backgroundAlpha: 0 }}
      smartStop={false}
      tickers={[features]}
    />
  );
}
