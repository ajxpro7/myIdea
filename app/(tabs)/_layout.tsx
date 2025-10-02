import { Tabs } from "expo-router";
import { Ionicons, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { View, Platform, Animated } from "react-native";
import { useEffect, useRef } from "react";
import { TouchableOpacity } from "react-native";
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { useRouter } from "expo-router";


export default function TabsLayout() {
  const animationValues = useRef({
    home: new Animated.Value(1),
    todo: new Animated.Value(1),
    posten: new Animated.Value(1),
    leren: new Animated.Value(1),
    profiel: new Animated.Value(1),
  }).current;

    const navigation = useNavigation();
    const router = useRouter();

  const animateTab = (tabName) => {
    // Reset all animations
    Object.keys(animationValues).forEach(key => {
      Animated.spring(animationValues[key], {
        toValue: key === tabName ? 1.2 : 1,
        useNativeDriver: true,
      }).start();
    });
  };

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 25,
          left: 20,
          right: 20,
          elevation: 0,
          backgroundColor: "#D9D9D9",
          borderRadius: 25,
          height: 65,
          width: 360,
          marginLeft: 15,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 5,
          },
          shadowOpacity: 0.1,
          shadowRadius: 5,
          paddingBottom: Platform.OS === "android" ? 10 : 20,
        },
      }}
      screenListeners={{
        tabPress: (e) => {
          animateTab(e.target.split('-')[0]);
        },
      }}
    >
<Tabs.Screen
  name="home"
  options={{ 
    headerShown: false,
    headerTransparent: true,
    headerStyle: {backgroundColor: '#AEB6BF'},
    headerTitle: "my Idea",
    headerLeft: () => (
      <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
        <Ionicons name="menu" size={24} color="black" style={{ marginLeft: 12 }} />
      </TouchableOpacity>
    ),
    headerRight: () => (
      <TouchableOpacity onPress={() => router.push("leren")}>
        <Ionicons name="heart-outline" size={24} color="black" style={{ marginRight: 12 }} />
      </TouchableOpacity>
    ),
          tabBarIcon: ({ focused }) => (
            <Animated.View style={{ 
              transform: [{ scale: animationValues.home }],
              marginBottom: -20 
            }}>
              <Ionicons
                name={focused ? "home" : "home-outline"}
                size={24}
                color={focused ? "#000" : "#888"}
              />
            </Animated.View>
          ),
  }}
/>


      <Tabs.Screen
        name="Todo"
        options={{
          headerTransparent: true,
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Animated.View style={{ 
              transform: [{ scale: animationValues.todo }],
              marginBottom: -20 
            }}>
              <MaterialIcons
                name={focused ? "check-circle" : "check-circle-outline"}
                size={24}
                color={focused ? "#000" : "#888"}
              />
            </Animated.View>
          ),
        }}
      />

      <Tabs.Screen
        name="posten"
        options={{
          headerShown: false,
          tabBarStyle: { display: "none" }, // 👈 Verberg de tab bar
          tabBarIcon: ({ focused }) => (
            <Animated.View style={{ 
              transform: [{ scale: animationValues.posten }],
              marginBottom: -15 
            }}>
              <View
                style={{
                  width: 40,
                  height: 40,
                  backgroundColor: "#000",
                  borderRadius: 30,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Ionicons name="add" size={32} color="#fff" />
              </View>
            </Animated.View>
          ),
        }}
      />

      <Tabs.Screen
        name="leren"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Animated.View style={{ 
              transform: [{ scale: animationValues.leren }],
              marginBottom: -20 
            }}>
              <FontAwesome5
                name="search"
                size={22}
                color={focused ? "#000" : "#888"}
              />
            </Animated.View>
          ),
        }}
      />

      <Tabs.Screen
        name="profiel"
        options={{
              headerTransparent: true,
              headerShown: false,
              headerStyle: {backgroundColor: '#AEB6BF'},
              headerTitle: "my Idea",
              headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
                  <Ionicons name="menu" size={24} color="black" style={{ marginLeft: 12 }} />
                </TouchableOpacity>
              ),
              headerRight: () => (
                <TouchableOpacity onPress={() => router.push("leren")}>
                  <Ionicons name="heart-outline" size={24} color="black" style={{ marginRight: 12 }} />
                </TouchableOpacity>
              ),
          tabBarIcon: ({ focused }) => (
            <Animated.View style={{ 
              transform: [{ scale: animationValues.profiel }],
              marginBottom: -20 
            }}>
              <Ionicons
                name={focused ? "person" : "person-outline"}
                size={24}
                color={focused ? "#000" : "#888"}
              />
            </Animated.View>
          ),
        }}
      />
    </Tabs>
  );
}