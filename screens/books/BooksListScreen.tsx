import { FlatList, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getBooks } from "../../store/thunks/booksThunk";
import LoadingUI from "../../components/UI/LoadingUI";
import { Styles } from "../../constants/colors";
import { s, vs } from "react-native-size-matters";
import BookCard from "../../components/BookCard";

function BooksListScreen() {
  const { books, loading } = useSelector((state: RootState) => state.books);
  
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getBooks());
  }, [dispatch]);

  if (loading) {
    return <LoadingUI color={Styles.primary600} />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={{
          alignItems:"center",
          justifyContent:"center",
          rowGap:s(25),
          paddingVertical:vs(20)
        }
        }
        data={books}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <BookCard item={item} />}
      />
    </View>
  );
}

export default BooksListScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: s(15),
  },
});
