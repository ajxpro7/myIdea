// components/CustomDrawerContent.tsx
import { View, Text, TouchableOpacity, Modal, Alert } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { useRouter } from 'expo-router';
import { supabase } from '@/lib/supabase';
import { Ionicons } from '@expo/vector-icons';

export function CustomDrawerContent(props: any) {
  const router = useRouter();

  const onLogout = async () => {
    const { error } = await supabase.auth.signOut();  
    if(error) {
      Alert.alert('Er is een probleem bij het uitloggen')
    }
  };
  

  const handleLogout = async () => {
    Alert.alert('Confirm', 'Ben je zeker dat je wilt uitloggen?', [
      {
        text: 'Cancel',
        onPress: () => console.log('modal closed'),
        style: 'cancel'
      },
      {
        text: 'Uitloggen',
        onPress: () => onLogout(),
        style: 'destructive'
      }
    ])
  }

  return (
    <DrawerContentScrollView {...props} className="flex-1 bg-white">
    <View className="pt-4">
      <TouchableOpacity 
      className="flex-row items-center gap-4 px-6 py-4 border-b border-gray-200"
      onPress={() => router.push('settings')}
      >
        <Ionicons name="settings-outline" size={22} color="#4B5563" />
        <Text className="text-base text-gray-700">  Instellingen</Text>
      </TouchableOpacity>

      <TouchableOpacity 
      className="flex-row items-center gap-4 px-6 py-4 border-b border-gray-200"
      onPress={() => router.push('favorieten')}
      >
        <Ionicons name="heart-outline" size={22} color="#4B5563" />
        <Text className="text-base text-gray-700">  Favorieten</Text>
      </TouchableOpacity>

      <TouchableOpacity 
      className="flex-row items-center gap-4 px-6 py-4 border-b border-gray-200"
      onPress={() => router.push('Notificatie')}
      >
        <Ionicons name="chatbubble-ellipses-outline" size={22} color="#4B5563" />
        <Text className="text-base text-gray-700">  Notificatie</Text>
      </TouchableOpacity>

      <TouchableOpacity className="flex-row items-center gap-4 px-6 py-4 border-b border-gray-200"
      onPress={() => router.push('feedback')}
      >
        <Ionicons name="chatbubble-ellipses-outline" size={22} color="#4B5563" />
        <Text className="text-base text-gray-700">  Feedback</Text>
      </TouchableOpacity>
    </View>

    <View className="mt-auto border-t border-gray-200">
      <TouchableOpacity 
      className="flex-row items-center gap-4 px-6 py-4"
      onPress={handleLogout}
      >
        <Ionicons name="log-out-outline" size={22} color="#EF4444" />
        <Text className="text-base font-medium text-red-500">  Uitloggen</Text>
      </TouchableOpacity>
    </View>
  </DrawerContentScrollView>
  );
}