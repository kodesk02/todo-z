
import React, { useEffect } from "react";
import { Pressable, Text } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  Easing,
} from "react-native-reanimated";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function LiquidButton({
  label = "Start Now",
  onPress,
}: {
  label?: string;
  onPress?: () => void;
}) {
  const x = useSharedValue(0);

  useEffect(() => {
    x.value = withRepeat(
      withSequence(
        withTiming(6, { duration: 500, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: 500, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      false
    );
  }, []);

  const chevronStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: x.value }],
  }));

  return (
    <Pressable
      onPress={onPress}
      className="w-[280px] h-16 rounded-full bg-[#ff7a18] active:bg-[#e8650a] active:opacity-90 flex-row items-center justify-center gap-3"
    >
      <Text className="text-white text-base font-bold">{label}</Text>
      <Animated.Text className="text-white text-lg font-bold" style={chevronStyle}>
        <MaterialIcons name="keyboard-double-arrow-right" size={24} color="white" />
      </Animated.Text>
    </Pressable>
  );
}