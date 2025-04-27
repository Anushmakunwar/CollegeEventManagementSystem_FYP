import { Stack } from "expo-router";

export default function EventLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "Events",
        }}
      />
      <Stack.Screen
        name="[id]"
        options={({ route }) => ({
          headerTitle: `Event Details`,
        })}
      />
      <Stack.Screen
        name="list"
        options={{
          headerTitle: () => "Event List", // Use a function to ensure the title is applied
        //   animation:"ios_from_right",
        }}
      />
    </Stack>
  );
}