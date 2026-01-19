# Effects Directory

This directory contains visual effects components ported from firecrawl-marketing, including the signature flame ASCII animations.

## 🔥 Flame ASCII System

The flame effects are data-driven ASCII animations that create subtle, fire-inspired backgrounds throughout the app.

### How It Works

1. **data.json Files**: Each flame component has an accompanying `data.json` file containing an array of ASCII art frames
2. **Frame Animation**: Components cycle through these frames at specified intervals (40-85ms)
3. **Visibility-Based**: Uses `setIntervalOnVisible` to only animate when in viewport (performance)
4. **innerHTML Rendering**: ASCII frames are inserted as HTML to preserve formatting

### Available Flames

#### CoreFlame
- **File**: `flame/core-flame.tsx`
- **Data**: `flame/data.json`
- **Usage**: Background texture for sections
- **Frame Speed**: 80ms
- **Size**: 1110px × 470px
- **Color**: `text-black-alpha-20`

```tsx
import { CoreFlame } from '@/components/shared/effects/flame';

<div className="relative">
  <CoreFlame />
  <YourContent />
</div>
```

#### AsciiExplosion
- **File**: `flame/ascii-explosion.tsx`
- **Data**: `flame/explosion-data.json`
- **Usage**: Dramatic accent for CTAs or empty states
- **Frame Speed**: 40ms (faster)
- **Initial Delay**: 30 frames (1.2s)
- **Color**: `text-[#FA5D19]` (heat orange)

```tsx
import { AsciiExplosion } from '@/components/shared/effects/flame';

<div className="relative h-400">
  <AsciiExplosion />
</div>
```

#### HeroFlame
- **File**: `flame/hero-flame.tsx`
- **Data**: `flame/hero-flame-data.json`
- **Usage**: Hero sections with dual flames
- **Frame Speed**: 85ms
- **Features**: Mirrored flames on both sides

```tsx
import { HeroFlame } from '@/components/shared/effects/flame';

<section className="relative">
  <HeroFlame />
  <HeroContent />
</section>
```

#### FlameBackground (Wrapper)
- **File**: `flame/flame-background.tsx`
- **Usage**: Data-driven flame intensity
- **Features**: 
  - Intensity based on metrics (0-100)
  - Dynamic color (black → orange)
  - Speed increases with intensity
  - Optional pulse animation

```tsx
import { FlameBackground } from '@/components/shared/effects/flame';

<FlameBackground intensity={cpuUsage} animate={cpuUsage > 80}>
  <DashboardCard />
</FlameBackground>
```

### Creating New Flames

1. **Generate ASCII Art Frames**:
   - Create multiple frames of ASCII art
   - Save as JSON array in `data.json`
   - Each frame is a string with line breaks

2. **Component Template**:
```tsx
'use client';

import { useEffect, useRef } from 'react';
import { setIntervalOnVisible } from '@/utils/set-timeout-on-visible';
import data from './data.json';

export function NewFlame() {
  const ref = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let index = 0;

    const interval = setIntervalOnVisible({
      element: wrapperRef.current,
      callback: () => {
        index++;
        if (index >= data.length) index = 0;
        ref.current!.innerHTML = data[index];
      },
      interval: 60 // Adjust speed
    });

    return () => interval?.();
  }, []);

  return (
    <div ref={wrapperRef} className="...">
      <div ref={ref} className="font-ascii" />
    </div>
  );
}
```

### Performance Considerations

- **Viewport Detection**: Only animates when visible
- **GPU Acceleration**: Use `transform` for positioning
- **Frame Caching**: Frames are pre-loaded from JSON
- **Cleanup**: Intervals cleared on unmount

### Design Guidelines

- **Subtlety**: Keep opacity low (10-30%) for backgrounds
- **Context**: Use sparingly, match intensity to data
- **Accessibility**: Ensure contrast ratios maintained
- **Mobile**: Consider reducing/disabling on mobile for performance

### Custom Utility Classes

These components use marketing-specific utilities:
- `cw-*`: Custom width (e.g., `cw-720` = 720px)
- `ch-*`: Custom height (e.g., `ch-470` = 470px)
- `font-ascii`: Monospace font for ASCII art
- Colors from heat scale: `text-heat-*`, `text-black-alpha-*`