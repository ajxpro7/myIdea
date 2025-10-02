import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import TransitionScreen from '../../components/TransitionScreen';
import Loading from '../../components/Loading';
import { useRef, useState } from 'react';
import Customkeyboardview from "@/components/Customkeyboardview";
import { supabase } from "@/lib/supabase";

export default function SignupScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const nameRef = useRef('');
  const emailRef = useRef('');
  const passwordRef = useRef('');

  const handleSignup = async () => {
    if (!nameRef.current || !emailRef.current || !passwordRef.current) {
      Alert.alert('Fout', 'Vul alle velden in!');
      return;
    }
  
    if (passwordRef.current.length < 8) {
      Alert.alert('Fout', 'Wachtwoord moet minimaal 8 karakters lang zijn');
      return;
    }
  
    let name = nameRef.current.trim();
    let email = emailRef.current.trim();
    let password = passwordRef.current.trim();
  
    setLoading(true);

    const { data: {session}, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name
        }
      }
    });

    setLoading(false);


    // console.log('session: ', session);
    // console.log('error: ', error);
    if(error) {
      Alert.alert('Sign up', error.message)
    }

  };
  
  

  return (
    <TransitionScreen>
      <Customkeyboardview>

      <View className="flex-1 bg-gray-50 px-6 justify-center relative">
        
        {/* Als loading actief is, toon overlay */}
        {loading && (
          <View style={styles.loadingOverlay}>
            <Loading />
          </View>
        )}

        {/* Formulier en inhoud */}
        <TouchableOpacity
          onPress={() => router.replace("/")}
          className="absolute top-20 left-6 p-2 bg-white rounded-full shadow-sm"
          style={{ elevation: 2 }}
        >
          <Ionicons name="arrow-back" size={24} color="#4b5563" />
        </TouchableOpacity>

        <Text className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Maak een account
        </Text>

        <View className="flex-row mb-5 space-x-3">
          <View className="flex-1">
            <Text className="font-semibold text-gray-700 mb-2 ml-1">Naam</Text>
            <TextInput
              placeholder="Volledige Naam"
              placeholderTextColor="#9ca3af"
              onChangeText={(text) => nameRef.current = text}
            className="bg-white rounded-xl px-4 py-3 border border-gray-200 focus:border-amber-500"
              style={{ elevation: 1 }}
            />
          </View>
        </View>

        {/* Overige velden */}

        <View className="mb-5">
          <Text className="font-semibold text-gray-700 mb-2 ml-1">E-mailadres</Text>
          <TextInput
            placeholder="voorbeeld@email.com"
            placeholderTextColor="#9ca3af"
            keyboardType="email-address"
            onChangeText={(text) => emailRef.current = text}
            className="bg-white rounded-xl px-4 py-3 border border-gray-200 focus:border-amber-500"
            style={{ elevation: 1 }}
          />
        </View>

        <View className="mb-8">
          <Text className="font-semibold text-gray-700 mb-2 ml-1">Wachtwoord</Text>
          <TextInput
            placeholder="Minimaal 8 karakters"
            placeholderTextColor="#9ca3af"
            secureTextEntry
            onChangeText={(text) => passwordRef.current = text}
            className="bg-white rounded-xl px-4 py-3 border border-gray-200 focus:border-amber-500 mb-1"
            style={{ elevation: 1 }}
          />
          <Text className="text-xs text-gray-500 ml-1">Minimaal 8 karakters</Text>
        </View>

        <TouchableOpacity 
          className="py-4 rounded-2xl mb-6 bg-neutral-900"
          onPress={ () => handleSignup()}
          style={{
            shadowColor: "#f59e0b",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
            elevation: 5
          }}
        >
          <Text className="text-center text-lg font-bold text-white">
            Aanmelden
          </Text>
        </TouchableOpacity>

        <View className="flex-row justify-center">
          <Text className="text-gray-600">
            Heb je al een account?{" "}
          </Text>
          <TouchableOpacity onPress={() => router.push("/login")}>
            <Text className="text-amber-600 font-bold">
              Inloggen
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
