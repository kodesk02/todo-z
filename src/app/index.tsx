import { View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import HexCube from "../components/HexCube";
import LiquidButton from "@/components/LiquidButton";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, backgroundColor: "#0a0a0f" }}>
      <LinearGradient
        colors={["rgba(255,122,24,0.35)", "transparent"]}
        style={{ position: "absolute", top: 0, left: 0, right: 0, height: 380 }}
      />
     <View style={{ flex: 1, alignItems: "center", justifyContent: "center", paddingBottom: 120 }}>
  <View style={{ marginTop: 10 , marginBottom: 30 }}>
    <HexCube />
  </View>
  <Text className="text-white text-3xl font-thin">
    Less{" "}
    <Text
      style={{
        fontFamily: "ImperialScript",
        fontSize: 28,
        color: "#ff7a18",
      }}
    >
      chaos,
    </Text>{" "}
    more done.
  </Text>

  <View
    style={{ position: "absolute", bottom: 80, alignItems: "center" }}
  >
    <LiquidButton
      label="Get Started"
      onPress={() => router.push("/explore")}
    />
  </View>
</View>
    </View>
  );
}
