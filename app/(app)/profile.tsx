import { View, Text, Button,StyleSheet, } from 'react-native';
import { router } from "expo-router";
import { AuthContext, AuthProvider } from "../../components/authContext";
import { useEffect, useContext } from "react";

export default function ProfileScreen() {
  const { signOut } = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <Text>Profile Screen</Text>
      <Button
          title="Sign Out"
          color="#f194ff"
          onPress={() => {
            signOut();
              // router.replace("../..");
            }
          }
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginVertical:20
  }})