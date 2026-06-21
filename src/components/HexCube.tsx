import React, { useEffect } from "react";
import { View } from "react-native";
import Svg, {
  Defs,
  LinearGradient,
  Stop,
  G,
  Path,
  RadialGradient,
  Circle,
} from "react-native-svg";
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
  withDelay,
   type SharedValue,
  Easing,
} from "react-native-reanimated";

const AnimatedPath = Animated.createAnimatedComponent(Path);

/**
 * Isometric "cube" built from a hexagon outline + 3 inner edges
 * meeting at the center (top, bottom-left, bottom-right vertices of inner Y).
 *
 * size = distance from center to a hex vertex (the cube's "radius").
 * cx, cy = center of the canvas.
 */
function isoCubePaths(cx: number, cy: number, size: number) {
  // Flat-top hexagon vertices (clockwise starting at top)
  // angles: -90, -30, 30, 90, 150, 210
  const pts = Array.from({ length: 6 }).map((_, i) => {
    const a = ((-90 + i * 60) * Math.PI) / 180;
    return { x: cx + size * Math.cos(a), y: cy + size * Math.sin(a) };
  });
  // pts[0]=top, 1=top-right, 2=bot-right, 3=bottom, 4=bot-left, 5=top-left

  const hex =
    `M ${pts[0].x} ${pts[0].y} ` +
    pts
      .slice(1)
      .map((p) => `L ${p.x} ${p.y}`)
      .join(" ") +
    " Z";

  // Inner "Y" – three edges from center to top, bot-left, bot-right vertices
  const yTop = `M ${cx} ${cy} L ${pts[0].x} ${pts[0].y}`;
  const yBL = `M ${cx} ${cy} L ${pts[4].x} ${pts[4].y}`;
  const yBR = `M ${cx} ${cy} L ${pts[2].x} ${pts[2].y}`;

  return { hex, yTop, yBL, yBR };
}

type LayerProps = {
  cx: number;
  cy: number;
  size: number;
  progress: SharedValue<number>; // 0 -> 1
  stroke?: string;
  strokeWidth?: number;
};

function CubeLayer({
  cx,
  cy,
  size,
  progress,
  stroke = "#114A52",
  strokeWidth = 1.25,
}: LayerProps) {
  const { hex, yTop, yBL, yBR } = isoCubePaths(cx, cy, size);

  // Approximate path length for stroke-dash reveal.
  // Hex perimeter = 6 * size, each Y edge = size.
  const hexLen = 6 * size;
  const edgeLen = size;

  const hexProps = useAnimatedProps(() => ({
    strokeDasharray: [hexLen, hexLen] as any,
    strokeDashoffset: hexLen * (1 - progress.value),
    opacity: progress.value,
  }));
  const edgeProps = useAnimatedProps(() => ({
    strokeDasharray: [edgeLen, edgeLen] as any,
    strokeDashoffset: edgeLen * (1 - progress.value),
    opacity: progress.value,
  }));

  return (
    <G>
      <AnimatedPath
        d={hex}
        stroke={stroke}
        strokeWidth={strokeWidth}
        fill="none"
        animatedProps={hexProps}
      />
      <AnimatedPath
        d={yTop}
        stroke={stroke}
        strokeWidth={strokeWidth}
        fill="none"
        animatedProps={edgeProps}
      />
      <AnimatedPath
        d={yBL}
        stroke={stroke}
        strokeWidth={strokeWidth}
        fill="none"
        animatedProps={edgeProps}
      />
      <AnimatedPath
        d={yBR}
        stroke={stroke}
        strokeWidth={strokeWidth}
        fill="none"
        animatedProps={edgeProps}
      />
    </G>
  );
}

export default function HexCube({ size = 320 }: { size?: number }) {
  const cx = size / 2;
  const cy = size / 2;

  // 4 concentric cubes, smallest -> largest
  const sizes = [size * 0.12, size * 0.24, size * 0.36, size * 0.48];

  const p0 = useSharedValue(0);
  const p1 = useSharedValue(0);
  const p2 = useSharedValue(0);
  const p3 = useSharedValue(0);

  useEffect(() => {
    // GSAP-style timeline: each cube draws after the previous one.
    const dur = 700;
    const stagger = 450;
    const ease = Easing.bezier(0.22, 1, 0.36, 1); // "power3.out"

    p0.value = withTiming(1, { duration: dur, easing: ease });
    p1.value = withDelay(stagger, withTiming(1, { duration: dur, easing: ease }));
    p2.value = withDelay(stagger * 2, withTiming(1, { duration: dur, easing: ease }));
    p3.value = withDelay(stagger * 3, withTiming(1, { duration: dur, easing: ease }));
  }, []);

  return (
    <View style={{ width: size, height: size }}>
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <CubeLayer cx={cx} cy={cy} size={sizes[0]} progress={p0} strokeWidth={1.1} />
        <CubeLayer cx={cx} cy={cy} size={sizes[1]} progress={p1} strokeWidth={1.1} />
        <CubeLayer cx={cx} cy={cy} size={sizes[2]} progress={p2} strokeWidth={1.2} />
        <CubeLayer cx={cx} cy={cy} size={sizes[3]} progress={p3} strokeWidth={1.4} />
      </Svg>
    </View>
  );
}
