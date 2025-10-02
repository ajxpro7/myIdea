import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import TransitionScreen from '@/components/TransitionScreen';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "@/backend/AuthContext";
import Loading from "@/components/Loading";
import { useRouter } from "expo-router";
import { fetchPost } from "@/backend/services/postService";
import { FlatList } from "react-native-gesture-handler";
import  Postcard from "@/components/Postcard"
import { supabase } from "@/lib/supabase";
import { getUserData } from "@/backend/services/userService";
import { useLocalSearchParams } from 'expo-router';
import PostDetails from '@/app/(modals)/PostDetails'; // vergeet dit niet!
import LogoHeader from "@/components/LogoHeader";



let limit = 0;

export default function home() {
  const { user, setAuth } = useAuth();
  const navigation = useNavigation();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  //post ophalen vanuit de notificatie scherm

const postid = useLocalSearchParams()?.postid;


  const [post, setPost] = useState([]);
  const [hasmore, setHasmore] = useState(true)

  const handlePostEvent = async (payload) => {
    if(payload.eventType === 'INSERT' && payload?.new?.id) {
      let newPost = {...payload.new};
      let res = await getUserData(newPost.userid);
      newPost.postLikes = [];
      newPost.comments = [{count: 0}];
      newPost.user = res.succes ? res.data : {}
      setPost(prevPost => [newPost, ...prevPost])
    }
    if(payload.eventType == 'DELETE' && payload.old.id) {
      setPost(prevPost => {
        let upDatedPost = prevPost.filter(post => post.id != payload.old.id);
        return upDatedPost;
      })
    }

      if(payload.eventType == 'UPDATE' && payload?.new?.id) {
        setPost(prevPost => {
          let updatedPost = prevPost.map(post => {
            if(post.id == payload.new.id) {
              post.title = payload.new.title;
              post.body = payload.new.body;
              post.file = payload.new.file;
            }

            return post;
        
          });
          return updatedPost;
        })
    }
}


  useEffect(() => {
    let postChannel = supabase
    .channel('posts')
    .on('postgres_changes', {event: '*', schema: 'public', table: 'posts'}, handlePostEvent)
    .subscribe()

    // getPost();

    return () => {
      supabase.removeChannel(postChannel);
    }
  },[])

  const getPost = async () => {
    //call the api here
    if(!hasmore) return null
    limit = limit + 10;
    
    // console.log('post result: ', limit);
    let res = await fetchPost(limit);
    if(res.succes) {
      if(post.length == res.data?.length) setHasmore(false)
      setPost(res.data) 
    }
  }


  return (
    <TransitionScreen>
      <SafeAreaView className="flex-1 bg-gray-100" style={{ flex: 1 }} edges={['bottom', 'left', 'right']}>

               {/* Als loading actief is, toon overlay */}
               {loading && (
          <View style={styles.loadingOverlay}>
            <Loading />
          </View>
        )}

        <LogoHeader/>


          {/* 🧾 Page content */}
          <FlatList 
          data={post}
          showsVerticalScrollIndicator={false}
          className="pt-2 px-4 transition-all duration-300 ease-in"
          keyExtractor={item => item.id.toString()} 
          renderItem={({item}) => <Postcard
          item={item}
          currentUser={user}
          router={router}
          />
        }
        onEndReachedThreshold={0}
        onEndReached={() => {
          console.log('dit is de einde');
          getPost();
        }}
        ListFooterComponent={ hasmore ? (
          <View style={{marginBottom: -35, marginTop: -130, alignItems: 'center', justifyContent: 'center',}}>
            <Loading/>
          </View>
        ) : (
          <View style={{marginVertical: 30, alignItems: "center", marginBottom: 80}}>
            <Text className=" text-xl">Er zijn geen posts meer</Text>
          </View>
        )}
          />

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