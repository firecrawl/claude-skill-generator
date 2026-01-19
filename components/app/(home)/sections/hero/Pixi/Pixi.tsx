"use client";

import Pixi from "@/components/shared/pixi/Pixi";

import features from "./tickers/features";

export default function HomeHeroPixi() {
  return (
    <Pixi
      canvasAttrs={{
        className: "cw-[1314px] h-506 absolute top-100 lg-max:hidden",
      }}
      fps={30}
      initOptions={{ backgroundAlpha: 0 }}
      smartStop={true}
      tickers={[features]}
    />
  );
}
