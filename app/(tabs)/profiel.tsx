import { View, Text, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import TransitionScreen from '../../components/TransitionScreen';
import { useNavigation, DrawerActions} from '@react-navigation/native';
import { useAuth } from "@/backend/AuthContext";
import { supabase } from "@/lib/supabase";
import { router, useRouter } from "expo-router";
import { getUserImageSrc } from "@/backend/services/imageService";
import Avatar from "@/components/Avatar";
import LogoHeader from "@/components/LogoHeader";

export default function Profile() {
  const router = useRouter();
  const { user, setAuth } = useAuth();

  // console.log('Profile user image:', user?.image);
  // console.log('Profile image URL:', user?.image ? getUserImageSrc(user.image) : 'No image');

  // let imageSource = user?.image && typeof user.image === 'object' ? user.image.uri : getUserImageSrc(user.image)

  return (
    <TransitionScreen>
    <SafeAreaView className="flex-1 bg-gray-100"  style={{ flex: 1 }} edges={['bottom', 'left', 'right']}>

    <LogoHeader/>

      {/* 🧾 Page content */}
      <View className="flex-1 p-6">
        {/* Profielafbeelding en info */}
        <View className="flex-row items-center mb-8 mt-12">
          <View className="relative">
            <Avatar uri={user?.image} size={150} rounded={300}/>
            <TouchableOpacity 
              className="absolute bottom-0 right-0 bg-black p-4 rounded-full shadow-lg"
              onPress={() => router.push('/(screens)/editProfile')}
            >
              <Ionicons name="create" size={20} color="white" />
            </TouchableOpacity>
          </View>
          
          <View className="ml-6 flex-1">
            <Text className="text-2xl font-bold text-gray-800">{user && user.name}</Text>
            <Text className="text-gray-400 text-sm">{user?.bio || "Dit is mijn bio"}</Text>
          </View>
        </View>

        {/* Gemaakt en Bewaard sectie */}
        <View className="mt-5">
          <View className="flex-row justify-between">
            {/* Gemaakt */}
            <TouchableOpacity 
            className="flex-1 h-60 bg-gray-200 rounded-lg justify-center items-center mx-1"
            onPress={() => router.push('gemaaktePost')}
            >
              <Text className="text-lg font-bold">Gemaakt</Text>
            </TouchableOpacity>

            {/* Bewaard */}
            <TouchableOpacity 
            className="flex-1 h-50 bg-gray-200 rounded-lg justify-center items-center mx-1"
            onPress={() => router.push('favoPost')}
            >
              <Text className="text-lg font-bold">Favorieten</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Postknop */}
        <TouchableOpacity 
          onPress={() => router.push("/posten")}
          className="bg-gray-200 rounded-lg py-4 justify-center items-center mt-10"
        >
          <Text className="text-lg font-bold">Posten</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
    </TransitionScreen>
  );
}
