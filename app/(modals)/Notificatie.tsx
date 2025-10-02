// app/modals/settings.tsx
import { View, Text, Button, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { useAuth } from '@/backend/AuthContext';
import { fetchNotifications } from '@/backend/services/notificationService';
import { ScrollView } from 'react-native-gesture-handler';
import NotificationItem from '@/components/NotificationItem';
import { Ionicons } from '@expo/vector-icons';
import CostumHeader from '@/components/CostumHeader';

export default function Notificatie() {
  const router = useRouter();

  const [notification, setNotification] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    getNotifications();
  },[])

  const getNotifications = async () => {
    let res = await fetchNotifications(user.id);
    if(res.succes) setNotification(res.data);
  }

  return (
   <View className="flex-1 bg-white">

      {/* Notificatie lijst */}
      <ScrollView className="flex-1 px-4 mt-10" showsVerticalScrollIndicator={false}>
        {notification.length > 0 ? (
          notification.map((item) => (
            <NotificationItem key={item?.id} item={item} router={router} />
          ))
        ) : (
          <View className="mt-20 px-6">
            <Text className="text-xl text-gray-500 text-center">
              U heeft geen notificaties
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
