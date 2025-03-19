import { Slot, useRouter } from "expo-router";
import { AuthContext, AuthProvider } from "../components/authContext";
import { useEffect, useContext } from "react";
import { Text,ActivityIndicator, View } from "react-native";
import { useFonts } from "expo-font";
import { registerForPushNotificationsAsync } from "../components/notif";

export default function Layout() {
  const [fontsLoaded] = useFonts({
      "FiraSans-Black": require("../assets/fonts/FiraSans-Black.ttf"),
    });
  
  
    if (!fontsLoaded) {
      return <Text>Loading Fonts...</Text>; // Show loading state
    }

    
  return (
    <AuthProvider>
      <AuthFlow />
    </AuthProvider>
  );
}

function AuthFlow() {
  const { session, isLoading } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (session) {
        router.replace('/(app)');
      } else {
        router.replace(('/login'));
      }
    }
  }, [session, isLoading]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return <Slot />;
}
