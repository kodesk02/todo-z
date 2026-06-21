import { View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import HexCube from "./HexCube";
import LiquidButton from "./LiquidButton";

export default function OnboardingScreen() {
  return (
    <View className="flex-1 bg-bg">
      <LinearGradient
        colors={["#2a1405", "#0a0a0f", "#0a0a0f"]}
        locations={[0, 0.5, 1]}
        style={{ position: "absolute", inset: 0 }}
      />
      <View className="flex-1 items-center justify-center px-8">
        <HexCube />
        <Text className="text-ink text-3xl font-bold text-center mt-10">
          Welcome to the Future
        </Text>
        <Text className="text-muted text-base text-center mt-3 leading-6">
          A minimal, futuristic experience crafted for clarity and focus.
          Begin your journey with a single tap.
        </Text>
        <View className="mt-12 w-full items-center">
          <LiquidButton label="Get Started" onPress={() => {}} />
        </View>
      </View>
    </View>
  );
}
