import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import TransitionScreen from '../../components/TransitionScreen';
import Loading from '../../components/Loading';
import { useRef, useState } from 'react';
import Customkeyboardview from "@/components/Customkeyboardview";
import { supabase } from "@/lib/supabase";

export default function LoginScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const emailRef = useRef('');
  const passwordRef = useRef('');

  const handleLogin = async () => {
    if (!emailRef.current || !passwordRef.current) {
      Alert.alert('Fout', 'Vul alle velden in!');
      return;
    }
    
    if (passwordRef.current.length < 8) {
      Alert.alert('Fout', 'Wachtwoord moet minimaal 8 karakters lang zijn');
      return;
    }

    let email = emailRef.current.trim();
    let password = passwordRef.current.trim();

    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    console.log('error loginPage', error);
    if(error) {
      Alert.alert('Login', error.message)
    }

  };

  return (
    <TransitionScreen>
      <Customkeyboardview>
      <View className="flex-1 bg-gray-50 px-6 pt-20 relative">
        
        {/* Loading Overlay */}
        {loading && (
          <View style={styles.loadingOverlay}>
            <Loading size={300} />
          </View>
        )}

        {/* Terug knop */}
        <TouchableOpacity
          onPress={() => router.replace("/")}
          className="absolute top-20 left-6 p-2 bg-white rounded-full shadow-sm"
          style={{ elevation: 2 }}
        >
          <Ionicons name="arrow-back" size={24} color="#4b5563" />
        </TouchableOpacity>

        {/* Welkomsttekst */}
        <View className="items-center mt-40 mx-6 mb-16">
          <Text className="text-3xl font-bold text-gray-800 text-center leading-tight">
            Hallo en welkom terug{" "}
            <Text className="text-amber-500">👋</Text>
          </Text>
          <Text className="text-gray-500 mt-2">
            Log in om verder te gaan
          </Text>
        </View>

        {/* Invoervelden */}
        <View className="gap-5">
          <View>
            <Text className="font-semibold text-gray-700 mb-2 ml-1">Email</Text>
            <TextInput
              placeholder="Voer je email in"
              placeholderTextColor="#9ca3af"
              onChangeText={(text) => emailRef.current = text}
              className="bg-white rounded-xl px-4 py-3 border border-gray-200 focus:border-amber-500"
              style={{ elevation: 1 }}
            />
          </View>

          <View>
            <Text className="font-semibold text-gray-700 mb-2 ml-1">Wachtwoord</Text>
            <TextInput
              placeholder="Voer je wachtwoord in"
              placeholderTextColor="#9ca3af"
              secureTextEntry
              onChangeText={(text) => passwordRef.current = text}
              className="bg-white rounded-xl px-4 py-3 border border-gray-200 focus:border-amber-500"
              style={{ elevation: 1 }}
            />
          </View>

          {/* Wachtwoord vergeten link */}
          <TouchableOpacity className="items-end">
            <Text className="text-amber-600 text-sm font-medium">
              Wachtwoord vergeten?
            </Text>
          </TouchableOpacity>

          {/* Login knop */}
          <TouchableOpacity 
            className="py-4 rounded-2xl mt-3 bg-neutral-900"
            onPress={handleLogin}
            style={{
              shadowColor: "#f59e0b",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.3,
              shadowRadius: 4,
              elevation: 5
            }}
          >
            <Text className="text-center text-lg font-bold text-white">
              Inloggen
            </Text>
          </TouchableOpacity>
        </View>

        {/* Onderaan */}
        <View className="mt-16 items-center">
          <Text className="text-gray-600">
            Nog geen account?{" "}
          </Text>
          <TouchableOpacity onPress={() => router.push("/signup")}>
            <Text className="text-amber-600 font-bold mt-1">
              Registreer hier
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      </Customkeyboardview>
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
