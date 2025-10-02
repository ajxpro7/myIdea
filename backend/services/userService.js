// // backend/services/userService.ts
import { supabase } from "@/lib/supabase";

export const getUserData = async (userid) => {
  try{
    const { data, error } = await supabase
    .from('users')
    .select()
    .eq('id', userid)
    .single();

    if(error) {
      return {succes: false, msg: error?.message}
    }
    return {succes: true, data}
  }
  catch(error) {
    console.log('userService got error: ', error);
    return {succes: false, msg: error.message}
  }
}

export const updateUserData = async (userId, data) => {
  try{
    const { error } = await supabase
    .from('users')
    .update(data)
    .eq('id', userId)

    if(error) {
      return {succes: false, msg: error?.message}
    }
    return {succes: true, data}
  }
  catch(error) {
    console.log('userService got error: ', error);
    return {succes: false, msg: error.message}
  }
}