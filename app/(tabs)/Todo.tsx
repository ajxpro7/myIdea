import { View, Text, TouchableOpacity, TextInput, FlatList, StyleSheet } from "react-native";
import TransitionScreen from '../../components/TransitionScreen';
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import QuoteBox from '../../api/QuoteBox'
import Loading from "@/components/Loading";
import { useAuth } from "@/backend/AuthContext";
import { createTask, fetchTasks, removeTask } from "@/backend/services/todoService";
import { useEffect, useState } from "react";
import TaskItem from "@/components/TaskItem";

export default function Todo() {

  const [taskList, setTaskList] = useState([]);
  const [task, setTask] = useState("");
  const [loading, setLoading] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const {user} = useAuth();

  useEffect(() => {
    const loadTasks = async () => {
      const res = await fetchTasks(user?.id);
      if (res.succes) {
        setTaskList(res.data); // ✅ correcte data
      } else {
        console.log(res.msg);
      }
    };
  
    if (user?.id) {
      loadTasks();
    }
  }, [user?.id]);
  


  const addTask = async () => {
    if (!task) return;
    const data = {
      userid: user?.id,
      text: task,
    };
    setLoading(true);
    const res = await createTask(data);
    setLoading(false);

    if(res.succes) {
      setTaskList(prev => [res.data, ...prev]); // ⬅️ nieuwe taak toevoegen bovenaan
      setTask("");
    }
  };

  const handleRemove = (taskId) => {
    setTaskList(prev => prev.filter(task => task.id !== taskId));
  };
  
return (
  <TransitionScreen>
    <SafeAreaView className="flex-1 bg-gray-100" edges={['bottom', 'left', 'right']}>

      {/* ✅ Loader totdat background klaar is */}
      {!isImageLoaded && (
        <View style={styles.loadingOverlay}>
          <Loading size={300} />
        </View>
      )}

      {/* ✅ QuoteBox laadt de image en triggert setIsImageLoaded */}
      <QuoteBox onImageLoaded={() => setIsImageLoaded(true)} />

      {/* ✅ Alles hieronder pas tonen als de image klaar is */}
      {isImageLoaded && (
        <>
          {/* Todo Input */}
          <View className="flex-row items-center px-5 py-4 bg-white border-b border-gray-200">
            <TextInput
              className="flex-1 bg-gray-100 rounded-full px-5 py-3 mr-3 text-gray-800"
              placeholder="Voeg een taak toe..."
              placeholderTextColor="#6b7280"
              value={task}
              onChangeText={setTask}
            />
            {
              loading ? (
                <View style={{ transform: [{ scale: 0.5 }], margin: -130 }}>
                  <Loading size="small" />
                </View>
              ) : (
                <TouchableOpacity onPress={addTask} className="bg-black p-3 rounded-full">
                  <Ionicons name="add" size={24} color="white" />
                </TouchableOpacity>
              )
            }
          </View>

          {/* Todo Lijst */}
          <View className="flex-1 px-5 bg-gray-50">
            <Text className="text-xl font-bold mt-6 mb-4 text-gray-900">Taken voor vandaag</Text>

            {taskList.length === 0 ? (
              <View className="flex-1 justify-center items-center">
                <Ionicons name="checkmark-done-outline" size={48} color="#d1d5db" />
                <Text className="text-gray-400 mt-4 text-lg">Geen taken toegevoegd</Text>
              </View>
            ) : (
              <FlatList
                showsVerticalScrollIndicator={false}
                data={taskList}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={{ paddingBottom: 20 }}
                renderItem={({ item }) => (
                  <TaskItem item={item} onRemove={handleRemove} />
                )}
              />
            )}
          </View>
        </>
      )}
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