import {uploadFile} from "./imageService";
import { supabase } from "@/lib/supabase";

export const createOrUpdatePost = async (post) => {
    try{
        //upload image
        if(post.file && typeof post.file === 'object') {
            let isImage = post?.file?.type === 'image';
            let folderName = isImage ? 'postImages' : 'postVideos' 
            let fileResult = await uploadFile(folderName, post?.file?.uri, isImage)
            if(fileResult.succes) post.file = fileResult.data
            else { return fileResult; }
        }

        const {data, error} = await supabase
        .from('posts')
        .upsert(post)
        .select()
        .single()

        if(error) {
            console.log('create Post error: ', error);
            return {succes: false, msg: 'could not create post'}
        }

        return {succes: true, data: data}

    }
    catch(error) {
        console.log('create Post error: ', error);
        return {succes: false, msg: 'could not create post'}
    }
}

export const fetchPost = async (limit = 10, userid) => {
    try{
        if(userid) {
        const {data, error} = await supabase
        .from('posts')
        .select(`
            *, user: users (id, name, image),
            postLikes (*),
            comments (count)
        `)
        .order('created_at', {ascending: false})
        .eq('userid', userid)
        .limit(limit)

        if(error) {
            console.log('fetch Post error: ', error);
            return {succes: false, msg: 'could not fetch post'}
        }

        return {succes: true, data: data}

        } else {
        const {data, error} = await supabase
        .from('posts')
        .select(`
            *, user: users (id, name, image),
            postLikes (*),
            comments (count)
        `)
        .order('created_at', {ascending: false})
        .limit(limit)

        if(error) {
            console.log('fetch Post error: ', error);
            return {succes: false, msg: 'could not fetch post'}
        }

        return {succes: true, data: data}
        }

    }

    catch(error) {
        console.log('fetch Post error: ', error);
        return {succes: false, msg: 'could not fetch post'}
    }
}

export const fetchPostDetails = async (postid) => {
    try{
        const {data, error} = await supabase
        .from('posts')
        .select(`
            *, user: users (id, name, image),
            postLikes (*),
            comments (*, user: users(id, name, image))
        `)
        .eq('id', postid)
        .order("created_at", {ascending: false, foreignTable: 'comments'})
        .single()

        if(error) {
            console.log('fetch Post Details error: ', error);
            return {succes: false, msg: 'could not fetch post details'}
        }

        return {succes: true, data: data}

    }
    catch(error) {
        console.log('fetch Post error: ', error);
        return {succes: false, msg: 'could not fetch post details'}
    }
}

export const createPostLike = async (postLikes) => {
    try{
        const {data, error} = await supabase
        .from('postLikes')
        .insert(postLikes)
        .select()
        .single();

        if(error) {
            console.log('Like Post error: ', error);
            return {succes: false, msg: 'could not like  post'}
        }

        return {succes: true, data: data}

    }
    catch(error) {
        console.log('Like Post error: ', error);
        return {succes: false, msg: 'could not like post'}
    }
}

export const removePostLike = async (postid, userid) => {
    try{
        const { error} = await supabase
        .from('postLikes')
        .delete()
        .eq('userid', userid)
        .eq('postid', postid)
        
        if(error) {
            console.log('Like Post error: ', error);
            return {succes: false, msg: 'could not remove like  post'}
        }

        return {succes: true}

    } 
    catch(error) {
        console.log('Like Post error: ', error);
        return {succes: false, msg: 'could not remove like post'}
    }
}

export const createComment = async (comment) => {
    try{
        const {data, error} = await supabase
        .from('comments')
        .insert(comment)
        .select()
        .single();

        if(error) {
            console.log('Comment Post error: ', error);
            return {succes: false, msg: 'could not create a comment'}
        }

        return {succes: true, data: data}

    }
    catch(error) {
        console.log('Comment Post error: ', error);
        return {succes: false, msg: 'could not create a comment'}
    }
}

export const removeComment = async (commentId) => {
    try{
        const { error} = await supabase
        .from('comments')
        .delete()
        .eq('id', commentId)
        
        if(error) {
            console.log('Remove comment error: ', error);
            return {succes: false, msg: 'could not remove comment'}
        }

        return {succes: true, data: {commentId}}
 
    } 
    catch(error) {
        console.log('Remove comment error: ', error);
        return {succes: false, msg: 'could not remove comment'}
    }
}

export const removePost = async (postid) => {
    try{
        const { error} = await supabase
        .from('posts')
        .delete()
        .eq('id', postid)
        
        if(error) {
            console.log('Remove Post error: ', error);
            return {succes: false, msg: 'could not remove Post'}
        }

        return {succes: true, data: {postid}}
 
    } 
    catch(error) {
        console.log('Remove Post error: ', error);
        return {succes: false, msg: 'could not remove Post'}
    }
}