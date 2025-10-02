import { View, StyleSheet } from "react-native";
import { Link, Stack } from "expo-router";

export default function notFoundScreen(){
    return (
        <>
        <Stack.Screen options={{title: "Sorry pagina niet gevonden"}} />
        <View className="flex-1 justify-center items-center bg-white">
            <Link href={"/"} >
            Terug naar home pagina!
            </Link>
        </View>
        </>
    );
}