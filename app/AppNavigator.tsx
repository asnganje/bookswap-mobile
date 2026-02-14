import BooksListScreen from "../screens/books/BooksListScreen";
import IconButton from "../components/UI/IconButton";
import { Styles } from "../constants/colors";
import * as SecureStorage from "expo-secure-store"
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { logout } from "../store/slices/authSlice";
import Toast from "react-native-toast-message";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SwapScreen from "../screens/books/SwapScreen";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { s } from "react-native-size-matters";
import { useState } from "react";

export type TabStackParamList = {
  BookList: undefined,
  BookSwaps: undefined
}

const Tabs = createBottomTabNavigator<TabStackParamList>()
function MainAppBottomTabsNavigator() {
  const dispatch = useDispatch<AppDispatch>()
  const [modalVisible, setModalVisible] = useState(false)

  const toggleModal = () => setModalVisible((prev)=> !prev)

  const logoutHandler = async () => {
    try {
      await SecureStorage.deleteItemAsync("userToken")
      await SecureStorage.deleteItemAsync("userData")
      dispatch(logout())
      Toast.show({
        type: "success",
        text1:"Logout success"
      })
    } catch (error) {
      const errorMsg = typeof error === "string" ? error : "logout failed!"
      Toast.show({
        type:"error",
        text1: errorMsg
      })
    }
  }

  return(
    <Tabs.Navigator screenOptions={{
      headerLeft:({tintColor})=> (
        <IconButton 
        size={35}
        icon="add"
        color={Styles.primary200}
        style={{marginLeft:s(15)}}
        onPress={toggleModal}
        />
      ),
      headerRight: ({tintColor}) => (
        <IconButton 
          size={30}
          icon="log-out"
          style={{marginRight:s(15)}}
          color={Styles.primary800}
          onPress={logoutHandler}
        />
      )
    }}>
      <Tabs.Screen name="BookList" options={{
        headerTitle:"",
        tabBarIcon:({size, color}) => <FontAwesome name="list-alt" size={size} color={color} />
      }}>
        {
          ()=> (
            <BooksListScreen 
              modalVisible={modalVisible}
              toggleModal = {toggleModal}
            /> 
          )
        }
      </Tabs.Screen>
      <Tabs.Screen name="BookSwaps" component={SwapScreen} options={{
        headerTitle:"",
        tabBarIcon:({size, color})=> <MaterialCommunityIcons name="swap-horizontal-circle" size={30} color={color} />
      }}/>
    </Tabs.Navigator>
  )
}

export default MainAppBottomTabsNavigator;