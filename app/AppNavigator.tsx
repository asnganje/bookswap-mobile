import { createNativeStackNavigator } from "@react-navigation/native-stack";
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


const Tabs = createBottomTabNavigator()
function MainAppBottomTabsNavigator() {
  const dispatch = useDispatch<AppDispatch>()
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
      headerRight: ({tintColor}) => (
        <IconButton 
          size={30}
          icon="log-out"
          color={Styles.primary800}
          onPress={logoutHandler}
        />
      )
    }}>
      <Tabs.Screen name="BookList" component={BooksListScreen} options={{
        tabBarIcon:({size, color}) => <FontAwesome name="list-alt" size={size} color={color} />
      }}/>
      <Tabs.Screen name="BookSwaps" component={SwapScreen} options={{
        tabBarIcon:({size, color})=> <MaterialCommunityIcons name="swap-horizontal-circle" size={30} color={color} />
      }}/>
    </Tabs.Navigator>
  )
}

export default MainAppBottomTabsNavigator;