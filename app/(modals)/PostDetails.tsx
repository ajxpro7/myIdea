import { useAuth } from '@/backend/AuthContext';
import { createComment, fetchPostDetails, removeComment, removePost } from '@/backend/services/postService';
import { createPostNotification } from '@/backend/services/notificationService';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '@/lib/supabase';
import { getUserData } from '@/backend/services/userService';
import Postcard from '@/components/Postcard';
import Loading from '@/components/Loading';
import CommentItem from '@/components/CommentItem';

export default function PostDetails() {
  const {postid, commentId } = useLocalSearchParams(); // gebruik als URL param
  const { user } = useAuth();
  const router = useRouter();

  const [post, setPost] = useState(null);
  const [startLoading, setStartLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const commentRef = useRef('');

  const getPostDetails = async () => {
    const res = await fetchPostDetails(postid);
    if (res.succes) setPost(res.data);
    setStartLoading(false);
  };

  const onNewComment = async () => {
    if (!commentRef.current) return;
    const data = {
      userid: user?.id,
      postid: post?.id,
      text: commentRef.current,
    };
    setLoading(true);
    const res = await createComment(data);
    setLoading(false);
    if (res.succes) {
      if (user.id !== post.userid) {
        const notify = {
          senderid: user.id,
          receiverid: post.userid,
          title: 'heeft een reactie geplaatst op je bericht',
          data: JSON.stringify({ postid: post.id, commentId: res.data.id }),
        };
        createPostNotification(notify);
      }

      inputRef?.current?.clear();
      commentRef.current = '';
    } else {
      Alert.alert('Comment', res.msg);
    }
  };

  const onDeleteComment = async (comment) => {
    const res = await removeComment(comment?.id);
    if (res.succes) {
      setPost((prev) => ({
        ...prev,
        comments: prev.comments.filter((c) => c.id !== comment.id),
      }));
    } else {
      Alert.alert('Comment', res.msg);
    }
  };

  const handleNewComment = async (payload) => {
    console.log('nieuwe comment: ', payload.new);
    if (payload.new) {
      let newComment = { ...payload.new };
      const res = await getUserData(newComment.userid);
      newComment.user = res.succes ? res.data : {};
      setPost((prev) => ({
        ...prev,
        comments: [newComment, ...prev.comments],
      }));
    }
  };

  useEffect(() => {
    const Commentchannel = supabase
      .channel('comments')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'comments',
          filter: `postid=eq.${postid}`,
        },
        handleNewComment
      )
      .subscribe();

    getPostDetails();

    return () => {
      supabase.removeChannel(Commentchannel);
    };
  }, [postid]);

  const onDeletePost = async () => {
    const res = await removePost(post.id);
    if (res.succes) {
      router.replace('/home');
    } else {
      Alert.alert('Post', res.msg);
    }
  };

  const onEditPost = async () => {
    router.replace({ pathname: '/posten', params: { ...post } });
  };

  return (
    <View className="flex-1 bg-white">
      <ScrollView className="flex-1 px-4 py-4">
        {startLoading ? (
          <Loading />
        ) : (
          <Postcard
            item={{ ...post, comments: [{ count: post?.comments?.length }] }}
            currentUser={user}
            router={router}
            hasShadow
            showMoreIcon={false}
            showDelete={true}
            onDelete={onDeletePost}
            onEdit={onEditPost}
          />
        )}

        {/* Comment input */}
        <View className="flex-row items-center px-2 py-4 bg-white border-t border-gray-200">
          <TextInput
            className="flex-1 bg-gray-100 rounded-xl h-12 px-5 py-3 mr-3 text-gray-800"
            placeholder="Voeg een reactie toe..."
            placeholderTextColor="#6b7280"
            onChangeText={(val) => (commentRef.current = val)}
            ref={inputRef}
            multiline
          />
          {loading ? (
            <View style={{ transform: [{ scale: 0.5 }], margin: -130 }}>
              <Loading size="small" />
            </View>
          ) : (
            <TouchableOpacity onPress={onNewComment} className="bg-black p-3 rounded-full">
              <Ionicons name="send" size={20} color="white" />
            </TouchableOpacity>
          )}
        </View>

        {/* Comments */}
        {post?.comments?.length === 0 ? (
          <View className="mt-20 items-center justify-center">
            <Text className="text-gray-500 text-base">
              Wees de eerste die een reactie achterlaat
            </Text>
          </View>
        ) : (
          post?.comments?.map((comment) => (
            <CommentItem
              key={comment.id.toString()}
              item={comment}
              highlight={comment.id == commentId}
              canDelete={user.id === comment.userid || user.id === post.userid}
              onDelete={onDeleteComment}
            />
          ))
        )}
      </ScrollView>
    </View>
  );
}
