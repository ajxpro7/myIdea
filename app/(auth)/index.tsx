import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { router } from "expo-router";
import TransitionScreen from '../../components/TransitionScreen';
import meApp1 from "@/assets/images/meapp1.png";
import Loading from "@/components/Loading";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function WelcomeScreen() {

  //  const [loading, setLoading] = useState(false);

  //  supabase.auth.onAuthStateChange((session) => {
  //   if(session) {
  //     setLoading(true);
  //   }
  //  })

  return (

    <TransitionScreen>
          <View className="flex-1 bg-white items-center justify-center px-6 space-y-8">

                    {/* Als loading actief is, toon overlay */}
        {/* {loading && (
          <View style={styles.loadingOverlay}>
            <Loading />
          </View>
        )} */}
      
      {/* Grote afbeelding */}
      <View className="w-full h-[50%] bg-gray-300 rounded-3xl mb-10">
        <Image
          source={meApp1} // Vervang met je echte afbeelding
          className="w-full h-full rounded-3xl"
          resizeMode="cover"
        />
      </View>

      {/* App naam */}
      {/* <Text className="text-3xl font-extrabold mb-5">meApp</Text> */}

      {/* Welkom tekst */}
      <Text className="text-center text-lg text-black/80">
      Jouw gedachten, jouw community, jouw planning — in één app.
      </Text>

      {/* Get started knop */}
      <TouchableOpacity
        onPress={() => router.replace("/signup")}
        className="w-full bg-neutral-900 py-4 px-6 rounded-2xl mt-4"
      >
        <Text className="text-center text-xl font-bold text-white">get started</Text>
      </TouchableOpacity>

       {/* Link naar login */}
       <Text className="text-center font-bold mt-5">
        al een account?{" "}
        <Text
          className="text-yellow-700"
          onPress={() => router.push("/(auth)/login")}
        >
          klik hier!
        </Text>
      </Text>

    </View>
    </TransitionScreen>

  );
}

const styles = StyleSheet.create({
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 20,
  },
});
