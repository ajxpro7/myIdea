// import React, { useEffect, useRef, useState } from "react";
// import { View, TextInput, Text, Image, TouchableOpacity, SafeAreaView, ScrollView, Alert, StyleSheet } from "react-native";
// import * as ImagePicker from "expo-image-picker";
// import { Ionicons, MaterialIcons } from "@expo/vector-icons";
// import TransitionScreen from '../../components/TransitionScreen';
// import { useNavigation } from '@react-navigation/native';
// import { getSupabaseFileUrl } from "@/backend/services/imageService";
// import { Video } from "expo-av";
// import { useAuth } from "@/backend/AuthContext";
// import Loading from '@/components/Loading';
// import { createOrUpdatePost } from "@/backend/services/postService";
// import { router, useLocalSearchParams, useRouter } from "expo-router";

// export default function posten() {
// const {user} = useAuth();
// const [loading, setLoading] = useState(false);
// const router = useRouter();

// const post = useLocalSearchParams();
// console.log('post: ', post);


//   // const titleRef = useRef("");
//   // const bodyRef = useRef("");
//   const [title, setTitle] = useState();
//   const [description, setDescription] = useState();
//   const [file, setfile] = useState(null);

//  useEffect(() => {
//   if (post && post.id) {
//     // Edit-modus
//     setTitle(post.title || '');
//     setDescription(post.body || '');
//     setfile(post.file || null);
//   } 
// }, [post]);


//   const pickMedia = async () => {
//     const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
//     if (!permission.granted) {
//       alert("Toegang tot file is nodig.");
//       return;
//     }

//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.All, // Foto + Video
//       quality: 1,
//       allowsEditing: true,
//     });

//     // console.log('soort file: ', result.assets[0]);

//     if (!result.canceled) {
//       setfile(result.assets[0]);
//     }
//   };

//   const isLocalFile = file => {
//     if(!file) return null;
//     if(typeof file === 'object')
//       return true;
//     }

//   const getFileType = file => {
//     if(!file) return null;
//     if(isLocalFile(file)) {
//       return file.type;
//     }
//     //check image or video for remote file
//     if(file.includes('postImage')) {
//       return 'image'
//     }

//     return 'video'

//   }

//   const getFileUri = file => {
//     if(!file) return null;
//     if(isLocalFile(file)) {
//       return file.uri
//     }

//     return getSupabaseFileUrl(file)?.uri

//   }

//   const submitPost = async () => {
//     if(!title && !file) {
//       Alert.alert('Zet aub een Title of Foto/Video voor je Post')
//     }

//     // if(!title) {
//     //   Alert.alert('Zet aub een Title voor je Post')
//     //   return;
//     // }

//     let data = {
//       file,
//       title: title,
//       body: description,
//       userid: user?.id,
//     }

//     //create post
//     setLoading(true)
//     let res = await createOrUpdatePost(data)
//     setLoading(false)
//     if (res.succes) {
//       setfile(null);
//       setTitle("");
//       setDescription("");
//       router.replace("home");
//     }
//   }

//   const handleCancel = () => {
//     router.setParams({}); 
//     setfile(null);
//     setTitle("");
//     setDescription("");
//     router.back();
//   }

//   return (
//     <TransitionScreen>
//       <SafeAreaView className="p-5">

//       <ScrollView showsVerticalScrollIndicator={false}>

//           {/* Als loading actief is, toon overlay */}
//           {loading && (
//           <View style={styles.loadingOverlay}>
//             <Loading />
//           </View>
//         )}


//       <View className="flex-row justify-between items-center px-5 py-4 mb-5">
//         <TouchableOpacity className="bg-gray-200 rounded-lg w-28 h-12 justify-center items-center" 
//         onPress={handleCancel}>
//           <Text>Annuleren</Text>
//         </TouchableOpacity>

//         <TouchableOpacity className="bg-blue-500 rounded-lg w-28 h-12 justify-center items-center" onPress={submitPost}>
//           <Text className="bold">Post</Text>
//         </TouchableOpacity>
//       </View>

//       <View className="mx-4 mt-6 p-4 bg-white rounded-2xl border border-gray-300">
//   {/* file toevoegen */}
//   <View className="flex-row items-center space-x-3 mb-4">
//     <TouchableOpacity
//       onPress={pickMedia}
//       className="flex-row items-center px-3 py-2 bg-gray-100 rounded-xl"
//     >
//       <Ionicons name="image-outline" size={22} color="#4B5563" />
//       <Text className="ml-2 text-gray-700 font-medium">Foto/Video toevoegen</Text>
//     </TouchableOpacity>
//   </View>

//   {/* Titel */}
//   <TextInput
//     className="text-xl font-semibold mb-3 border border-gray-300 rounded-xl px-4 py-3 text-gray-800"
//     placeholder="Titel"
//     placeholderTextColor="#9CA3AF"
//     value={title}
//     onChangeText={setTitle}
//     maxLength={80}
//   />

//   {/* Beschrijving */}
//   <TextInput
//     className="text-base border border-gray-300 rounded-xl px-4 py-3 text-gray-700 h-32"
//     placeholder="Beschrijving (optioneel)"
//     placeholderTextColor="#9CA3AF"
//     value={description}
//     onChangeText={setDescription}
//     multiline
//     numberOfLines={4}
//     textAlignVertical="top"
//   />
// </View>

        
// {file && (
//   <View className="mt-5 mb-4 items-center">
//     {
//       getFileType(file) == 'video'
//     }
//     <View className="relative">
//       {/* Verwijderknop in hoek */}
//       <TouchableOpacity
//         onPress={() => setfile(null)}
//         className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-sm z-10"
//         style={{
//           elevation: 3, // Android schaduw
//         }}
//       >
//         <Ionicons name="close" size={20} color="#EF4444" />
//       </TouchableOpacity>

//       {/* file preview */}
//       {file.type === "video" ? (
//         <View className="w-80 h-80 bg-gray-100 rounded-2xl items-center justify-center shadow-sm">
//           <Video
//           source={{ uri: getFileUri(file) }}
//           useNativeControls
//           resizeMode="cover"
//           isLooping
//           style={{ width: 320, height: 300, borderRadius: 16, marginTop: 15 }}
//          />

//         </View>
//       ) : (
//         <Image
//           source={{ uri: file.uri }}
//           className="w-80 h-80 rounded-2xl shadow-md"
//           resizeMode="cover"
//         />
//       )}
//     </View>
//   </View>
// )}



//       </ScrollView>

//       </SafeAreaView>
//     </TransitionScreen>
//   );
// }


// const styles = StyleSheet.create({
//   loadingOverlay: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: 'rgba(255, 255, 255, 0.7)',
//     justifyContent: 'center',
//     alignItems: 'center',
//     zIndex: 20,
//   },
// });


import React, { useEffect, useState } from "react";
import { View, TextInput, Text, Image, TouchableOpacity, SafeAreaView, ScrollView, Alert, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import TransitionScreen from '../../components/TransitionScreen';
import { getSupabaseFileUrl } from "@/backend/services/imageService";
import { Video } from "expo-av";
import { useAuth } from "@/backend/AuthContext";
import Loading from '@/components/Loading';
import { createOrUpdatePost } from "@/backend/services/postService";
import { router, useLocalSearchParams, useRouter } from "expo-router";

export default function posten() {
  const {user} = useAuth();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const postParams = useLocalSearchParams();
  console.log('post: ', postParams);

  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);

  useEffect(() => {
    // Alleen in edit-modus gaan als er een post ID is
    if (postParams?.id) {
      setIsEditing(true);

      setTimeout(() => {
      setTitle(postParams.title || '');
      setDescription(postParams.body || '');
      }, 300);

      setFile(postParams.file || null);
    } else {
      resetForm();
    }
  }, [postParams?.id]); // Alleen reageren op ID wijzigingen

  const resetForm = () => {
    setIsEditing(false);
    setTitle('');
    setDescription('');
    setFile(null);
  };

  const pickMedia = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      alert("Toegang tot file is nodig.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 1,
      allowsEditing: true,
    });

    if (!result.canceled) {
      setFile(result.assets[0]);
    }
  };

  const isLocalFile = (file) => {
    if (!file) return false;
    return typeof file === 'object';
  };

  const getFileType = (file) => {
    if (!file) return null;
    if (isLocalFile(file)) {
      return file.type;
    }
    if (file.includes('postImage')) {
      return 'image';
    }
    return 'video';
  };

  const getFileUri = (file) => {
    if (!file) return null;
    if (isLocalFile(file)) {
      return file.uri;
    }
    return getSupabaseFileUrl(file)?.uri;
  };

  const submitPost = async () => {
    if (!title && !file) {
      Alert.alert('Zet aub een Title of Foto/Video voor je Post');
      return;
    }

    const data = {
      file,
      title: title,
      body: description,
      userid: user?.id,
      ...(isEditing && { id: postParams.id }), // Alleen ID meenemen in edit-modus
    };

    setLoading(true);
    const res = await createOrUpdatePost(data);
    setLoading(false);
    
    if (res.succes) {
      resetForm();
      router.replace("home");
    }
  };

  const warningCancel = () => {
                Alert.alert('Confirm', 'Ben je zeker dat je de Post wil annuleren?', [
                  {
                    text: 'Cancel',
                    onPress: () => console.log('modal closed'),
                    style: 'cancel'
                  },
                  {
                    text: 'Terug',
                    onPress: () => handleCancel(),
                    style: 'destructive'
                  }
                ])
  }

  const handleCancel = () => {
    resetForm();
    // Navigeer terug en forceer een reset van de parameters
    router.navigate({
      pathname: "home",
      params: { resetPostParams: true },
    });
  };

  return (
    <TransitionScreen>
      <SafeAreaView className="p-5">
        <ScrollView showsVerticalScrollIndicator={false}>
          {loading && (
            <View style={styles.loadingOverlay}>
              <Loading />
            </View>
          )}

          <View className="flex-row justify-between items-center px-5 py-4 mb-5">
            <TouchableOpacity 
              className="bg-gray-200 rounded-lg w-28 h-12 justify-center items-center" 
              onPress={warningCancel}
            >
              <Text>Annuleren</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              className="bg-blue-500 rounded-lg w-28 h-12 justify-center items-center" 
              onPress={submitPost}
            >
              <Text className="bold">{isEditing ? 'Update' : 'Post'}</Text>
            </TouchableOpacity>
          </View>

          <View className="mx-4 mt-6 p-4 bg-white rounded-2xl border border-gray-300">
            <View className="flex-row items-center space-x-3 mb-4">
              <TouchableOpacity
                onPress={pickMedia}
                className="flex-row items-center px-3 py-2 bg-gray-100 rounded-xl"
              >
                <Ionicons name="image-outline" size={22} color="#4B5563" />
                <Text className="ml-2 text-gray-700 font-medium">Foto/Video toevoegen</Text>
              </TouchableOpacity>
            </View>

            <TextInput
              className="text-xl font-semibold mb-3 border border-gray-300 rounded-xl px-4 py-3 text-gray-800"
              placeholder="Titel"
              placeholderTextColor="#9CA3AF"
              value={title}
              onChangeText={setTitle}
              maxLength={80}
            />

            <TextInput
              className="text-base border border-gray-300 rounded-xl px-4 py-3 text-gray-700 h-32"
              placeholder="Beschrijving (optioneel)"
              placeholderTextColor="#9CA3AF"
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>
          
          {file && (
            <View className="mt-5 mb-4 items-center">
              <View className="relative">
                <TouchableOpacity
                  onPress={() => setFile(null)}
                  className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-sm z-10"
                  style={{ elevation: 3 }}
                >
                  <Ionicons name="close" size={20} color="#EF4444" />
                </TouchableOpacity>

                {getFileType(file) === "video" ? (
                  <View className="w-80 h-80 bg-gray-100 rounded-2xl items-center justify-center shadow-sm">
                    <Video
                      source={{ uri: getFileUri(file) }}
                      useNativeControls
                      resizeMode="cover"
                      isLooping
                      style={{ width: 320, height: 300, borderRadius: 16, marginTop: 15 }}
                    />
                  </View>
                ) : (
                  <Image
                    source={{ uri: getFileUri(file) }}
                    className="w-80 h-80 rounded-2xl shadow-md"
                    resizeMode="cover"
                  />
                )}
              </View>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </TransitionScreen>
  );
}

const styles = StyleSheet.create({
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 20,
  },
});