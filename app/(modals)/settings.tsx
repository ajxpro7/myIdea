// app/modals/settings.tsx
import { View, Text, Button } from 'react-native';
import { useRouter } from 'expo-router';

export default function SettingsModal() {
  const router = useRouter();

  return (
    <View className="flex-1 justify-center items-center bg-white">
      <Text>Instellingen</Text>
      <Button title="Terug" onPress={() => router.push("/home")} />
    </View>
  );
}
