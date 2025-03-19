import { Stack } from "expo-router";

export default function PetsLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Pet index", header: () => null}} />
      <Stack.Screen name="view" options={{ title: "Pet Details" , header: () => null}} />
    </Stack>
  );
}