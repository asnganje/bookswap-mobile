import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import AppNavigator from './app/AppNavigator';

export default function App() {
  return (
    <View>
      <StatusBar style="auto" />
      <AppNavigator />
    </View>
  );
}

