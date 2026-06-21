import { View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import HexCube from "../components/HexCube";
import LiquidButton from "@/components/LiquidButton";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();

  return (
    <View className="bg-bg" style={{ flex: 1 }}>
      <LinearGradient
        colors={["rgba(159,121,231,0.35)", "transparent"]}
        style={{ position: "absolute", top: 0, left: 0, right: 0, height: 380 }}
      />
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: 120,
        }}
      >
        <View style={{ marginTop: 10, marginBottom: 30 }}>
          <HexCube />
        </View>
        <View style={{ marginTop: 16, paddingHorizontal: 24 }}>
          <Text style={{ fontSize: 30, color: "#114A52", fontWeight: "100" }}>
            Less{" "}
            <Text
              style={{
                fontFamily: "ImperialScript",
                fontSize: 48,
                color: "#9F79E7",
              }}
            >
              chaos,
            </Text>{" "}
            more done.
          </Text>
        </View>

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
