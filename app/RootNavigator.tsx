import { View } from "react-native"
import { useSelector } from 'react-redux';
import { RootState } from "../store";
import AppNavigator from "./AppNavigator";
import AuthNavigator from "./AuthNavigator";


function RootNavigator() {
  const { token } = useSelector((state: RootState)=>state.auth)
  return (
    <View>
      { token ? <AppNavigator /> : <AuthNavigator/> }
    </View>
  )  
}

export default RootNavigator;

