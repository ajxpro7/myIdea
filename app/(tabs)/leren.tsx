import { View, Text, TouchableOpacity, TextInput, ScrollView } from "react-native";
import TransitionScreen from '../../components/TransitionScreen';
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

export default function leren() {
  const topics = [
    "Love", "Hope", "Purpose", "Anxiety",
    "Fear", "Peace", "Stress", "Pride", 
    "Joy", "Meaning", "Mind", "Patience"
  ];

  const row1 = topics.filter((_, i) => i % 2 === 0);
  const row2 = topics.filter((_, i) => i % 2 !== 0);

  // Dummy blokken voor Trending/Inspiratie
  const dummyCards = Array(6).fill(null); // of vul met data

  return (
    <TransitionScreen>
      <SafeAreaView className="flex-1 bg-white">

       <ScrollView showsVerticalScrollIndicator={false}>

        {/* Zoekveld */}
        <View className="flex-row items-center bg-white border border-gray-200 rounded-full px-4 py-2 mx-5 my-3">
          <TextInput
            className="flex-1 text-gray-800 ml-2 py-2"
            placeholder="Zoeken..."
            placeholderTextColor="#9CA3AF"
            returnKeyType="search"
            clearButtonMode="while-editing"
          />
          <TouchableOpacity className="p-2">
            <Ionicons name="search" size={20} color="#6B7280" />
          </TouchableOpacity>
        </View>

        {/* Topics */}
        <Text className="text-2xl font-bold px-5 pt-2">Zoeken naar topics</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="px-5 py-3"
          contentContainerStyle={{ paddingRight: 20 }}
        >
          <View className="flex-row space-x-3">
            {row1.map((topic, index) => (
              <View key={index} className="space-y-3">
                <TouchableOpacity className="bg-gray-200 rounded-lg w-28 h-12 justify-center items-center mb-3 mr-3">
                  <Text className="text-lg font-semibold text-black">{topic}</Text>
                </TouchableOpacity>
                {row2[index] && (
                  <TouchableOpacity className="bg-gray-200 rounded-lg w-28 h-12 justify-center items-center">
                    <Text className="text-lg font-semibold text-black">{row2[index]}</Text>
                  </TouchableOpacity>
                )}
              </View>
            ))}
          </View>
        </ScrollView>

        {/* Trending */}
        <Text className="text-2xl font-bold px-5 pt-2">Trending</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="px-5 py-3"
          contentContainerStyle={{ paddingRight: 20 }}
        >
          {dummyCards.map((_, index) => (
            <TouchableOpacity
              key={index}
              className="bg-gray-300 rounded-xl mr-3"
              style={{ width: 160, height: 220 }}
            />
          ))}
        </ScrollView>

        {/* Inspiratie */}
        <Text className="text-2xl font-bold px-5 pt-2">Inspiratie</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="px-5 py-3"
          contentContainerStyle={{ paddingRight: 20 }}
        >
          {dummyCards.map((_, index) => (
            <TouchableOpacity
              key={index}
              className="bg-gray-300 rounded-xl mr-3"
              style={{ width: 160, height: 220 }}
            />
          ))}
        </ScrollView>

        {/* Inspiratie */}
        <Text className="text-2xl font-bold px-5 pt-2">Meest gekeken</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="px-5 py-3"
          contentContainerStyle={{ paddingRight: 20 }}
        >
          {dummyCards.map((_, index) => (
            <TouchableOpacity
              key={index}
              className="bg-gray-300 rounded-xl mr-3"
              style={{ width: 160, height: 220 }}
            />
          ))}
        </ScrollView>

       </ScrollView>

      </SafeAreaView>
    </TransitionScreen>
  );
}
