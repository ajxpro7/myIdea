import { supabase } from "@/lib/supabase";

export const createPostNotification = async (notification) => {
    try{
        const {data, error} = await supabase
        .from('notifications')
        .insert(notification)
        .select()
        .single();

        if(error) {
            console.log('notification error: ', error);
            return {succes: false, msg: 'er ging iets is'}
        }

        return {succes: true, data: data}

    }
    catch(error) {
        console.log('notification error: ', error);
        return {succes: false, msg: 'er ging iets is'}
    }
}

export const fetchNotifications = async (receiverid) => {
    try{
        const {data, error} = await supabase
        .from('notifications')
        .select(`
            *,
            sender: senderid(id, name, image)
        `)
        .eq('receiverid', receiverid)
        .order("created_at", {ascending: false})

        if(error) {
            console.log('fetch notifications error: ', error);
            return {succes: false, msg: 'could notifications details'}
        }

        return {succes: true, data: data}

    }
    catch(error) {
        console.log('notifications error: ', error);
        return {succes: false, msg: 'could not fetch notifications'}
    }
}