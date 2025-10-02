import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import Avatar from './Avatar';

const  NotificationItem = ({
  item,
  router
}) => {

const timeAgo = (date) => {
  const diff = Math.floor((new Date() - new Date(date)) / 1000);
  if (diff < 60) return `${diff}s geleden`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m geleden`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}u geleden`;
  return `${Math.floor(diff / 86400)}d geleden`;
};

// console.log('item: ', item);

const handleClick = () => {
  //naar post navigeren
  let {postid, commentId} = JSON.parse(item?.data);
  router.push({pathname: '/PostDetails', params: {postid, commentId}});
}


  return (
 <View className="bg-white rounded-2xl p-4 mb-3 shadow-sm shadow-gray-300">
      <TouchableOpacity
        onPress={handleClick}
        className="flex-row items-start"
      >
        {/* Avatar */}
        <Avatar uri={item.sender?.image} size={40} />

        {/* Text content */}
        <View className="flex-1 ml-2">
          <View className="flex-row justify-between items-center">
            <Text className="font-semibold text-gray-900">{item.sender?.name}</Text>
            <Text className="text-xs text-gray-500">{timeAgo(item.created_at)}</Text>
          </View>

          <Text className="text-gray-700 text-sm mt-1">{item.title}</Text>
        </View>

        {/* Optional icon */}
        <Ionicons name="chevron-forward" size={18} color="gray" className="ml-2" />
      </TouchableOpacity>
    </View>
  )
}

export default NotificationItem