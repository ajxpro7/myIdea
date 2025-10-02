// app/screens/_layout.tsx
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

export default function ScreensLayout() {
  const router = useRouter();

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: '#C74C3D',
        },
        headerLeft: () => (
          <TouchableOpacity onPress={() => router.replace('/home')} style={{ marginLeft: 10 }}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
        ),
      }}
    >
      <Stack.Screen name="settings" options={{ title: "Instellingen" }} />
      <Stack.Screen name="favorieten" options={{ title: "Favorieten"}} />
      <Stack.Screen name="notificatie" options={{ title: "Notificatie" }} />
      <Stack.Screen name="feedback" options={{ title: "Feedback"}} />
      <Stack.Screen name="PostDetails" options={{ title: "PostDetails", presentation: 'modal' }} />
      <Stack.Screen name="gemaaktePost" options={{ title: "gemaaktePost" }} />
    </Stack>
  );
}
