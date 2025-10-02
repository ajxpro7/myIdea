import { View, Text, TextInput, TouchableOpacity, Image, Alert, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from "@/backend/AuthContext";
import TransitionScreen from '../../components/TransitionScreen';
import Loading from '../../components/Loading';
import { updateUserData } from '@/backend/services/userService';
import * as ImagePicker from "expo-image-picker";
import { uploadFile, getUserImageSrc } from "@/backend/services/imageService";
import {  } from "@/backend/services/userService";

const EditProfile = () => {
  const router = useRouter();
  const { user: currentUser, setUserData } = useAuth();
  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState({
    name: '',
    phoneNumber: '',
    image: null,
    bio: '',
  });

  useEffect(() => {
    if (currentUser)

    setUser({
      name: currentUser.name || '',
      phoneNumber: currentUser.phoneNumber || '',
      image: currentUser.image || null,
      bio: currentUser.bio || '',
    });
  }, [currentUser]);

  const onPickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      alert("Toegang tot media is nodig.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
      allowsEditing: true,
      aspect: [4,3]
    });

    if(!result.canceled) {
      setUser({...user, image: result.assets[0]})
    }

  };

  const onSubmit = async () => {
    let userData = {...user}
    const {name, phoneNumber, bio, image} = userData;
    if (!name || !phoneNumber) {
      Alert.alert('Profile', "Geef een Naam en Telefoon nummer op!");
      return;
    }
    setLoading(true);

    if(typeof image === 'object') {
      // upload image
      let imageRes = await uploadFile('profiles', image?.uri, true);
      if(imageRes.succes) userData.image = imageRes.data;
      else userData.image = null;
    }

    //update user
    const res = await updateUserData(currentUser?.id, userData);
    setLoading(false);

    if(res.succes) {
      setUserData({...currentUser, ...userData});
      router.replace("/profiel");
    }

    // console.log("Upload result:", imageRes);   
   console.log("User image path:", userData.image);
   console.log("Generated URL:", getUserImageSrc(userData.image));
  };

  let imageSource = user?.image && typeof user.image === 'object' ? user.image.uri : getUserImageSrc(user.image)
  // let imageSource = 
  // user?.image
  // ? { uri: typeof user.image === 'string' ? user.image : user.image.uri }
  // : getUserImageSrc(user?.image)


  return (
    <TransitionScreen>
      <View className="flex-1 bg-white px-6 pt-12">

         {/* Als loading actief is, toon overlay */}
         {loading && (
          <View style={styles.loadingOverlay}>
            <Loading />
          </View>
        )}

        {/* 🔙 Header */}
        <View className="flex-row items-center mb-6 mt-5">
          <TouchableOpacity onPress={() => router.push('/(tabs)/profiel')}>
            <Ionicons name="arrow-back" size={28} color="black" />
          </TouchableOpacity>
          <Text className="text-xl font-bold ml-24">Bewerk profiel</Text>
        </View>

        {/* 🖼️ Profielfoto */}
        <View className="items-center mb-10">
          <View className="relative">
            <Image
             source={imageSource}            
              className="rounded-full w-40 h-40 border-4 border-white shadow-md transition-all duration-300 ease-in"
            />
            <TouchableOpacity
              className="absolute bottom-0 right-0 bg-black p-4 rounded-full shadow-lg"
              onPress={onPickImage}
            >
              <Ionicons name="camera" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        {/* 📝 Input Fields */}
        <View className="mb-5">
          <Text className="font-semibold text-gray-700 mb-1 ml-1">Naam</Text>
          <TextInput
            value={user?.name}
            placeholder="Naam"
            placeholderTextColor="#9ca3af"
            onChangeText={value => setUser({ ...user, name: value })}
            className="bg-gray-100 rounded-xl px-4 py-3 border border-gray-200"
          />
        </View>

        <View className="mb-5">
          <Text className="font-semibold text-gray-700 mb-1 ml-1">Telefoon nummer</Text>
          <TextInput
            value={user?.phoneNumber}
            placeholder="Telefoonnummer"
            placeholderTextColor="#9ca3af"
            onChangeText={value => setUser({ ...user, phoneNumber: value })}
            className="bg-gray-100 rounded-xl px-4 py-3 border border-gray-200"
          />
        </View>

        <View className="mb-10">
          <Text className="font-semibold text-gray-700 mb-1 ml-1">Bio</Text>
          <TextInput
            value={user?.bio}
            placeholder="Vertel iets over jezelf"
            placeholderTextColor="#9ca3af"
            maxLength={80}
            multiline
            onChangeText={value => setUser({ ...user, bio: value })}
            className="bg-gray-100 rounded-xl px-4 py-3 border border-gray-200 h-24 text-base"
          />
        </View>

        {/* ✅ Update knop */}
        <TouchableOpacity
          onPress={onSubmit}
          className="bg-black py-4 rounded-2xl"
        >
          <Text className="text-white text-center font-bold text-lg">Update</Text>
        </TouchableOpacity>
      </View>
    </TransitionScreen>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 20,
  },
});