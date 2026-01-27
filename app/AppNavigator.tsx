import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BookDetailsScreen from "../screens/books/BookDetailsScreen";
import BooksListScreen from "../screens/books/BooksListScreen";
import AddBooksScreen from "../screens/books/AddBookScreen";
import IconButton from "../components/UI/IconButton";
import { Styles } from "../constants/colors";
import * as SecureStorage from "expo-secure-store"
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { logout } from "../store/slices/authSlice";
import Toast from "react-native-toast-message";


const Stack = createNativeStackNavigator()
function AppNavigator() {
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
    <Stack.Navigator screenOptions={{
      headerRight: ({tintColor}) => (
        <IconButton 
          size={30}
          icon="log-out"
          color={Styles.primary800}
          onPress={logoutHandler}
        />
      )
    }}>
      <Stack.Screen name="BookList" component={BooksListScreen}/>
      <Stack.Screen name="BookDetails" component={BookDetailsScreen}/>
      <Stack.Screen name="AddBook" component={AddBooksScreen}/>
    </Stack.Navigator>
  )
}

export default AppNavigator;