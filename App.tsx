import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import store from './store';
import RootNavigator from './app/RootNavigator';
import Toast from 'react-native-toast-message';

export default function App() {
  return (
    <Provider store={store}>
      <StatusBar style="dark" />
      <RootNavigator />
      <Toast />
    </Provider>
  );
}

