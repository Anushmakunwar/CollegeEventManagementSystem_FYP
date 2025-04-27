import { FontAwesome } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { CircleUserRound, Waypoints } from "lucide-react-native";
export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "white" }}>
      {/* Home Tab (event/index) */}
      <Tabs.Screen
        name="event/index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <Waypoints size={28} color={color} />,
        }}
      />
      {/* Profile Tab (index) */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <CircleUserRound color={color} className="size-[28px]" />
          ),
        }}
      />
      {/* Explicitly hide event/[id] and event/list as tabs */}
      <Tabs.Screen
        name="event/[id]"
        options={{
          href: null, // Hide this route from the tab bar
        }}
      />
      <Tabs.Screen
        name="event/list"
        options={{
          href: null, // Hide this route from the tab bar
        }}
      />
    </Tabs>
  );
}
