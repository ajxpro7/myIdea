// app/_layout.tsx
import { Drawer } from "expo-router/drawer";
import { CustomDrawerContent } from "../components/CustomDrawerContent";
import "../global.css";
import { AuthProvider, useAuth } from "@/backend/AuthContext";
import { useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Stack, useRouter } from "expo-router";
import 'react-native-url-polyfill/auto';
import {getUserData} from "@/backend/services/userService";

const AuthInitializer = () => {
  const { setAuth, setUserData } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const updateUserData = async (user) => {
      let res = await getUserData(user?.id);
      if (res.succes) setUserData(res.data);
    };

    supabase.auth.onAuthStateChange((_event, session) => {
      // console.log('session user layout', session?.user?.id);

      if (session) {
        setAuth(session?.user);
        updateUserData(session?.user);
        router.replace("/home");
      } else {
        setAuth(null);
        router.replace("/");
      }
    });
  }, []);
  
  return null; // <- je moet iets retourneren (bijv. null) want dit is een component
};

const RootLayout = () => {
  return (
    <>
    <Drawer
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: "#E5E7EB",
        drawerActiveTintColor: "#111827",
        drawerInactiveTintColor: "#6B7280",
        drawerLabelStyle: {
          fontSize: 16,
          marginLeft: -5,
        },
        drawerItemStyle: {
          borderBottomWidth: 1,
          borderBottomColor: "#E5E7EB",
        },
        drawerStyle: {
          backgroundColor: "#FFFFFF",
        },
      }}
    >
      <Drawer.Screen name="(auth)" options={{ title: "Auth" }} />
      <Drawer.Screen name="(tabs)" options={{ title: "Home" }} />
      <Drawer.Screen name="(modals)" options={{ title: "Modals" }} />
    
    </Drawer>
      {/* <Stack.Screen name="/postDetails" options={{presentation: 'formSheet'}}/> */}
    </>


  );
};

export default function AppLayout() {
  return (
    <AuthProvider>
      <AuthInitializer />
      <RootLayout />
    </AuthProvider>
  );
}