import { View, Text, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import Avatar from './Avatar'

const timeAgo = (date) => {
  const diff = Math.floor((new Date() - new Date(date)) / 1000);
  if (diff < 60) return `${diff}s geleden`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m geleden`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}u geleden`;
  return `${Math.floor(diff / 86400)}d geleden`;
};

const CommentItem = ({
  item,
  canDelete = false,
  highlight = false,
  onDelete = () => {}
}) => {

  const handleDelete = () => {
    Alert.alert('Bevestigen', 'Ben je zeker dat je deze reactie wilt verwijderen?', [
      {
        text: 'Annuleren',
        onPress: () => console.log('modal gesloten'),
        style: 'cancel'
      },
      {
        text: 'Verwijderen',
        onPress: () => onDelete(item),
        style: 'destructive'
      }
    ]);
  };

  return (
    <View className="flex-row px-5 mb-4 items-center" style={{ gap: 12 }}>
      {/* Avatar links buiten de box */}
      <View className="justify-center">
        <Avatar uri={item.user?.image} size={40} />
      </View>

      {/* Box met comment-inhoud */}
      <View
        className="flex-1 py-2 rounded-xl"
        style={{
          minHeight: 40, // Gelijke hoogte als avatar (size 40)
          backgroundColor: highlight ? '#FFF9E6' : '#DCDCDC',
          borderColor: highlight ? '#FFD700' : '#E0E3E7',
          borderWidth: highlight ? 1 : 0,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 6,
        }}
      >
        {/* Naam + tijd regel naast elkaar */}
        <View className="flex-row justify-between items-start mb-1">
          <View className='ml-6'>
            <View className="flex-row items-center">
              <Text className="font-semibold text-gray-900" style={{ fontSize: 14 }}>
                {item?.user?.name}
              </Text>
              <Text className="text-gray-400 mx-2"> • </Text>
              <Text className="text-xs text-gray-500" style={{ fontSize: 12 }}>
                {timeAgo(item?.created_at)}
              </Text>
            </View>

            {/* Comment tekst */}
            <Text className="text-gray-800 leading-relaxed mt-1 ml-4" style={{ fontSize: 14 }}>
              {item?.text}
            </Text>
          </View>

          {/* Delete knop rechtsboven */}
          {canDelete && (
            <TouchableOpacity
              onPress={handleDelete}
              className="p-4 bg-red-50 rounded-full"
              style={{
                alignSelf: 'flex-start',
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.1,
                shadowRadius: 2,
                elevation: 1,
              }}
            >
              <Ionicons name="trash-outline" size={18} color="#EF4444" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

export default CommentItem;