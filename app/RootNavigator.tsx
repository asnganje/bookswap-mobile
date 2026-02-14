import { useSelector } from 'react-redux';
import { AppDispatch, RootState } from "../store";
import AuthNavigator from "./AuthNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { loadStoredUser } from '../store/thunks/authThunk';
import LoadingUI from '../components/UI/Loading';
import { Styles } from '../constants/colors';
import { View } from 'react-native';
import MainAppBottomTabsNavigator from './AppNavigator';


function RootNavigator() {
  const { token } = useSelector((state: RootState)=>state.auth)
  const dispatch = useDispatch<AppDispatch>()
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(()=> {
    dispatch(loadStoredUser())
      .unwrap()
      .finally(()=> {
        setIsAuthenticated(true)
      })
  }, [dispatch])

  if (!isAuthenticated) {
    return (
      <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
        <LoadingUI color={Styles.primary600}/>
      </View>
    )
  }

  return (
    <NavigationContainer>
      { token ? <MainAppBottomTabsNavigator /> : <AuthNavigator/> }
    </NavigationContainer>
  )  
}

export default RootNavigator;

