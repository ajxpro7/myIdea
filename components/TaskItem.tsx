import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { removeTask as removeTaskFromSupabase } from "@/backend/services/todoService"; // correcte import

const TaskItem = ({ item, onRemove }) => {

  const handleRemove = async () => {
    const res = await removeTaskFromSupabase(item.id);
    if (res.succes) {
      onRemove(item.id); // informeer oudercomponent
    } else {
      console.log("Verwijderen mislukt");
    }
  };

  return (
    <View className="flex-row items-center justify-between py-4 border-b border-gray-200">
      <Text className="text-lg text-gray-800">{item.text}</Text>
      <TouchableOpacity onPress={handleRemove} className="p-2">
        <Ionicons name="close" size={22} color="#9ca3af" />
      </TouchableOpacity>
    </View>
  );
};

export default TaskItem;
