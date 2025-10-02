import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const CostumHeader = ({ title, showBack = true, backRoute = null }) => {
  const router = useRouter();

  const handleBack = () => {
    if (backRoute) {
      router.replace(backRoute); // of router.push(backRoute), afhankelijk van wat je wilt
    } else {
      router.back();
    }
  };

  return (
    <View className='flex-row items-center justify-between px-4 h-14 mt-20 mb-4'>
      {/* Left - Back button */}
      <View className='w-12'>
        {showBack && (
          <TouchableOpacity
            onPress={handleBack}
            className='bg-gray-200 p-1 rounded-xl'
            activeOpacity={0.7}
          >
            <Ionicons name="chevron-back" size={28} color="black" />
          </TouchableOpacity>
        )}
      </View>

      {/* Center - Title */}
      <View className='flex-1 items-center'>
        <Text className='text-2xl font-bold'>{title}</Text>
      </View>

      {/* Right - Spacer */}
      <View className='w-12' />
    </View>
  );
};

export default CostumHeader;
