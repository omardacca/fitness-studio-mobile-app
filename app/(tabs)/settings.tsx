import { useAuthContext } from '@/context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function Tab() {
  const { state, dispatch } = useAuthContext();

  const onLogoutPress = async () => {
    await AsyncStorage.removeItem("authToken");
    dispatch({ type: "LOGOUT" });
  }
  
  return (
    <View style={styles.container}>
      <Text>Tab Settings</Text>
      <Text>Hello, {state.user?.fullName || 'no name'}</Text>
      <TouchableOpacity onPress={onLogoutPress}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
