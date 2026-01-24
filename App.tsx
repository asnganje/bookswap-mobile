import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import AppNavigator from './app/AppNavigator';
import { Provider } from 'react-redux';
import store from './store';
import { useEffect, useState } from 'react';
import { loadStoredUser } from './store/thunks/authThunk';
import LoadingUI from './components/UI/Loading';

export default function App() {
  const [ready, setReady] =useState(false)

  useEffect(()=> {
    const loader = async() => {
      await store.dispatch(loadStoredUser())
    }
    loader()
    setReady(true)
  }, [])

  if (!ready) {
    return <LoadingUI />
  }

  return (
    <Provider store={store}>
      <View>
        <StatusBar style="auto" />
        <AppNavigator />
      </View>
    </Provider>
  );
}

