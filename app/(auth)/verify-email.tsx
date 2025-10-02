import { View, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import TransitionScreen from '../../components/TransitionScreen';
import Loading from '../../components/Loading';
import { useEffect, useCallback } from 'react';
import { supabase } from "@/lib/supabase";

export default function VerifyEmailScreen() {
  const router = useRouter();

  const handleAuthChange = useCallback((event: string, session: any) => {
    if (event === 'SIGNED_IN' && session?.user?.email_confirmed_at) {
      router.replace("/(tabs)/home");
    }
  }, [router]);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(handleAuthChange);

    return () => {
      subscription?.unsubscribe();
    };
  }, [handleAuthChange]);

  return (
    <TransitionScreen>
      <View style={styles.container}>
        <Loading />
        <Text style={styles.title}>Email Verificatie Vereist</Text>
        <Text style={styles.description}>
          We hebben je een verificatie email gestuurd.
          Controleer je inbox en klik op de verificatie link.
        </Text>
        <Text style={styles.subtitle}>
          Deze pagina zal automatisch updaten zodra je je email hebt geverifieerd.
        </Text>
      </View>
    </TransitionScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#4B5563',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
});
