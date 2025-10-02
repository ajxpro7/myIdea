import { View, Text, Image, TouchableOpacity, Alert, Share, Modal, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Ionicons, Feather, Entypo } from '@expo/vector-icons';
import { downloadFile, getSupabaseFileUrl, getUserImageSrc } from "@/backend/services/imageService";
import { Video } from "expo-av";
import { supabase } from '@/lib/supabase';
import { createPostLike, removePostLike } from '@/backend/services/postService';
import Loading from './Loading';
import PostDetails from '@/app/(modals)/PostDetails';
import Avatar from './Avatar';

const Postcard = ({
  item,
  router,
  currentUser,
  hasShadow = true ,
  showMoreIcon = true,
  showDelete = false,
  onDelete = () => {},              
  onEdit = () => {}
    }) => {

  const { user, created_at, title, body, file } = item;

  const [laoding, setLoading] = useState(false);

  const timeAgo = (date) => {
    const diff = Math.floor((new Date() - new Date(date)) / 1000);
    if (diff < 60) return `${diff}s geleden`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}u`;
    return `${Math.floor(diff / 86400)}d`;

  };

   const openPostDetail = () => {
    if(!showMoreIcon) return null; 
    router.push({pathname: 'PostDetails', params: {postid: item?.id}})
   }

  const [likes, setLikes] = useState([])

  useEffect(() => {
    setLikes(item?.postLikes)
  }, [])


const onLike = async () => {

  if (liked) {
    // remove like
    let updatedLikes = likes.filter(like => like.userid!= currentUser.id);

    setLikes([...updatedLikes])
    let res = await removePostLike(item?.id, currentUser.id);
    console.log('removed like: ', res);
    if (!res.succes) {
      Alert.alert('Post', 'Er ging iets mis!')
    }
  } else {
    // add like
    let data = {
      userid: currentUser?.id, 
      postid: item?.id
    }
    setLikes([...likes, data])
    let res = await createPostLike(data);
    console.log('added like: ', res);
    if (!res.succes) {
      Alert.alert('Post', 'Er ging iets mis!')
    }
  }
}

const liked = Array.isArray(likes) && likes.some(like => like.userid === currentUser?.id);


  const onShare = async () => {
    let content = {message: title}
    if(item.file) {
      //download the file and share local uri
      setLoading(true);
      let url = await downloadFile(getSupabaseFileUrl(file)?.uri);
      setLoading(false);
      content.url = url;
    }
    Share.share(content)
  }

  const handlePostDelete = () => {
                Alert.alert('Confirm', 'Ben je zeker dat je deze Post wilt verwijderen?', [
                  {
                    text: 'Cancel',
                    onPress: () => console.log('modal closed'),
                    style: 'cancel'
                  },
                  {
                    text: 'Verwijderen',
                    onPress: () => onDelete(item),
                    style: 'destructive'
                  }
                ])
  }

  return (
    <View
      className={`bg-white rounded-xl px-4 py-3 mb-4 ${
        hasShadow ? 'shadow-sm' : ''
      }`}
    >
      {/* Header */}
      <View className="flex-row justify-between items-center mb-2">
        <View className="flex-row items-center space-x-2">
          {/* <View className='rounded-full bg-black h-40 w-40'></View> */}
          <Avatar uri={user?.image} size={30}/>
          <View className='ml-2'>
            <Text className="font-semibold text-gray-800">
              {item?.user?.name}
            </Text>
            <Text className="text-xs text-gray-500">{timeAgo(created_at)}</Text>
          </View>
        </View>

        {
          showMoreIcon && (
                    <TouchableOpacity onPress={openPostDetail}>
                      <Entypo name="dots-three-horizontal" size={18} color="gray" />
                    </TouchableOpacity>
          )
        }

      {
        showDelete && currentUser.id == item?.user?.id && (
          <View className='flex-row'>
             <TouchableOpacity className='mr-3' onPress={() => onEdit(item)}>
                <Ionicons name="create-outline" size={22} color="gray" />
            </TouchableOpacity>
              <TouchableOpacity onPress={handlePostDelete}>
                  <Ionicons name="trash-outline" size={22} color="red" />
              </TouchableOpacity>
          </View>
        )
      }

      </View>

      {/* Content */}
      <View className="mb-2">
        {title ? (
          <Text className="text-xl font-semibold text-black mb-1">{title}</Text>
        ) : null}
        {body ? (
          <Text className="text-m text-gray-700">{body}</Text>
        ) : null}

          {/* post foto */}
        {file && file.includes('postImages') && (
        <Image
          source={getSupabaseFileUrl(file)}
           style={{ width: '100%', height: 330, borderRadius: 12, marginTop: 12, backgroundColor: '#f3f4f6' }}
           resizeMode='cover'
          />
        )
      }

      {/* post foto */}
        {file && file.includes('postVideo') && (
        <Video
          source={getSupabaseFileUrl(file)}
           style={{ width: '100%', height: 330, borderRadius: 12, marginTop: 12, backgroundColor: '#f3f4f6' }}
           useNativeControls
           resizeMode='cover'
           isLooping
          />
        )
      }
      </View>

      {/* Actions */}
      <View className="flex-row justify-between pt-2 border-t border-gray-200">
        <TouchableOpacity 
        className="flex-row items-center space-x-1"
        onPress={onLike}>
          <Ionicons name={liked ? "heart" : "heart-outline"} size={22} color={liked ? "red" : "gray"} />
          <Text className="text-xs text-gray-600 ml-1">{likes.length}</Text>
        </TouchableOpacity>
        <TouchableOpacity 
        className="flex-row items-center space-x-1"
        onPress={openPostDetail}
        >
          <Ionicons name="chatbubble-outline" size={22} color="gray" />
          <Text className="text-xs text-gray-600 ml-1">{item?.comments[0].count}</Text>
        </TouchableOpacity>

      {
          laoding ? (
               <View style={{ transform: [{ scale: 0.5 }], margin: -130 }}>
                  <Loading size="small" />
                </View>
          ) : (
                  <TouchableOpacity 
        className="flex-row items-center space-x-1"
        onPress={onShare}
        >
          <Feather name="share" size={21} color="gray" />
          <Text className="text-xs text-gray-600 ml-1">Share</Text>
        </TouchableOpacity>
        )
      }

      </View>
    </View>
  );
};

export default Postcard;
