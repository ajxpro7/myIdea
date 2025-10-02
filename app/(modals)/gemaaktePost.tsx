import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useAuth } from '@/backend/AuthContext';
import { fetchPost } from '@/backend/services/postService';
import { FlatList } from 'react-native-gesture-handler';
import Postcard from '@/components/Postcard';
import { useRouter } from 'expo-router';
import Loading from '@/components/Loading';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import TransitionScreen from '@/components/TransitionScreen';

var limit = 0;
const gemaaktePost = () => {

    const {user} = useAuth();
    const router = useRouter();
    const [post, setPost] = useState([]);
    const [hasmore, setHasmore] = useState(true)

     const getPost = async () => {
        //call the api here
        if(!hasmore) return null
        limit = limit + 10;
        
        console.log('post result: ', limit);
        let res = await fetchPost (limit, user.id);
        if(res.succes) {
          if(post.length == res.data?.length) setHasmore(false)
          setPost(res.data) 
        }
      }
    

  return (
    <TransitionScreen>
    <SafeAreaView className="flex-1 bg-gray-200">

      {/* Post List */}
      <FlatList
        data={post}
        showsVerticalScrollIndicator={false}
        style={{marginTop: -50}}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Postcard item={item} currentUser={user} router={router} />
        )}
        onEndReachedThreshold={0.2}
        onEndReached={getPost}
        ListFooterComponent={
          hasmore ? (
            <View className="my-6 items-center justify-center">
              <Loading />
            </View>
          ) : (
            <View className="my-6 items-center justify-center">
              <Text className="text-black text-base">Er zijn geen posts meer</Text>
            </View>
          )
        }
      />
    </SafeAreaView>
    </TransitionScreen>
  )
}

export default gemaaktePost