import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/backend/AuthContext';

const LogoHeader = () => {

    const router = useRouter();
    const navigation = useNavigation();
    const {user} = useAuth();

    const [notificationCount, setNotificationCount] = useState(0);

    const handleNewNotification = async (payload) => {
      console.log('got new notification: ', payload);
      if(payload.eventType == "INSERT" && payload.new.id) {
        setNotificationCount(prev => prev + 1)
      }
    }

    useEffect(() => {
      // getPost();
  
      let notificationChannel = supabase
      .channel('notifications')
      .on('postgres_changes', {event: 'INSERT', schema: 'public', table: 'notifications', filter: `receiverid=eq.${user.id}`}, handleNewNotification)
      .subscribe()
  
      return () => {
        supabase.removeChannel(notificationChannel);
      }
    },[])

  return (
    <View style={styles.header}>
      {/* Linker kant: menu + logo */}
      <View style={styles.leftContainer}>
        <TouchableOpacity 
         onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        style={styles.iconButton}
        >
          <Ionicons name="menu" size={28} color="#333" />
          {/* <View style={styles.badge}>
            <Text style={styles.badgeText}>0</Text>
          </View> */}
        </TouchableOpacity>

        <Image
          source={require('@/assets/images/logo.png')} // Pas dit pad aan naar jouw logo
          style={styles.logo}
          contentFit="contain"
        />
      </View>

      {/* Rechter kant: hart en chat */}
      <View style={styles.rightContainer}>
        {/* Hart icoon */}
        <TouchableOpacity 
        onPress={() => {
          setNotificationCount(0); 
          router.push('/Notificatie'); 
        }}
        style={styles.iconButton}
        >
          <Ionicons name="heart-outline" size={26} color="#333" />

          {
            notificationCount > 0 && (
              <View style={styles.badge}>
              <Text style={styles.badgeText}>{notificationCount}</Text>
            </View>
            )
          }

        </TouchableOpacity>

        {/* Chat icoon */}
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="chatbubble-outline" size={26} color="#333" />
          <View style={styles.badge}>
            <Text style={styles.badgeText}>3</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LogoHeader;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    elevation: 4,
    borderBottomColor: '#E5E7EB',
    borderBottomWidth: 1,
    paddingTop: 40
    // borderBottomLeftRadius: 12,
    // borderBottomRightRadius: 12,
    // backgroundColor: '#496F8B',
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  iconButton: {
    position: 'relative',
    marginRight: 12,
  },
  badge: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: '#EF4444',
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#fff',
    borderWidth: 1,
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  logo: {
    width: 140,
    height: 80,
    marginLeft: 8,
  },
});