import { View, Text, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

export default function Explore() {
  const router = useRouter();
  return (
    <SafeAreaView className="flex-1 bg-bg items-center justify-center px-6">
      <Text className="text-white text-3xl font-semibold">Explore</Text>
      <Text className="text-neutral-400 mt-3 text-center">
        You made it past onboarding 🎉
      </Text>
      <Pressable
        onPress={() => router.back()}
        className="mt-10 px-6 py-3 rounded-full border border-white/20"
      >
        <Text className="text-white">Back</Text>
      </Pressable>
    </SafeAreaView>
  );
}
