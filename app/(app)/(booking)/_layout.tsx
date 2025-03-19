import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { colorTemplate } from '@/components/colors';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: colorTemplate[0] }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Riwayat',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="list" color={color} />,
        }}
      />
      <Tabs.Screen
        name="upcoming"
        options={{
          title: 'Upcoming',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="flag" color={color} />,
        }}
      />
    </Tabs>
  );
}
