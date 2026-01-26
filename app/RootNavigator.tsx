import { View } from "react-native"
import { useSelector } from 'react-redux';
import { RootState } from "../store";
import AppNavigator from "./AppNavigator";
import AuthNavigator from "./AuthNavigator";
import { NavigationContainer } from "@react-navigation/native";


function RootNavigator() {
  const { token } = useSelector((state: RootState)=>state.auth)
  return (
    <NavigationContainer>
      { token ? <AppNavigator /> : <AuthNavigator/> }
    </NavigationContainer>
  )  
}

export default RootNavigator;

