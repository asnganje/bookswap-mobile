import { Text, View } from "react-native";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getBooks } from "../../store/thunks/booksThunk";
import LoadingUI from "../../components/UI/LoadingUI";
import { Styles } from "../../constants/colors";

function BooksListScreen() {

  const {books, loading} = useSelector((state: RootState)=>state.books)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(()=> {
    dispatch(getBooks())
  },[dispatch])

  if (loading) {
    return <LoadingUI color={Styles.primary600}/>
  }
  
  return(
    <View>
      <Text>BooksListScreen</Text>
    </View>
  )
}

export default BooksListScreen;