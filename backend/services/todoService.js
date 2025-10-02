import { supabase } from "@/lib/supabase";

export const createTask = async (task) => {
    try{
        const {data, error} = await supabase
        .from('tasks')
        .insert(task)
        .select()
        .single();

        if(error) {
            console.log('task error: ', error);
            return {succes: false, msg: 'could not create a task'}
        }

        return {succes: true, data: data}

    }
    catch(error) {
        console.log('task error: ', error);
        return {succes: false, msg: 'could not create a task'}
    }
}

export const removeTask = async (taskId) => {
    try{
        const { error} = await supabase
        .from('tasks')
        .delete()
        .eq('id', taskId)
        
        if(error) {
            console.log('Remove task error: ', error);
            return {succes: false, msg: 'could not remove task'}
        }

        return {succes: true, data: {taskId}}
 
    } 
    catch(error) {
        console.log('Remove task error: ', error);
        return {succes: false, msg: 'could not remove task'}
    }
}

export const fetchTasks = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('userid', userId)
        .order('created_at', { ascending: false });
  
      if (error) {
        console.log('fetch task error: ', error);
        return { succes: false, msg: 'could not fetch tasks' };
      }
  
      return { succes: true, data: data };
    } catch (error) {
      console.log('fetch task error: ', error);
      return { succes: false, msg: 'could not fetch tasks' };
    }
  };
  