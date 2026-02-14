import { FlatList, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getBooks } from "../../store/thunks/booksThunk";
import LoadingUI from "../../components/UI/LoadingUI";
import { Styles } from "../../constants/colors";
import { s, vs } from "react-native-size-matters";
import BookCard from "../../components/BookCard";
import AppModal from "../../components/AppModal";
import AntDesign from "@expo/vector-icons/AntDesign";
import InputContainer from "../../components/InputContainer";
import AppTitle from "../../components/AppTitle";
import GenrePicker, { Genre } from "../../components/GenrePicker";

interface BookListProps {
  modalVisible: boolean;
  toggleModal: () => void;
}

function BooksListScreen({ modalVisible, toggleModal }: BookListProps) {
  const { books, loading } = useSelector((state: RootState) => state.books);
  const [genre, setGenre] = useState<Genre | "" >("")
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
          alignItems: "center",
          justifyContent: "center",
          rowGap: s(25),
          paddingVertical: vs(20),
        }}
        data={books}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <BookCard item={item} />}
      />
      <AppModal modalVisible={modalVisible}>
        <AppTitle>Add a Book</AppTitle>
        <InputContainer 
          placeholder="Title"
          placeholderTextColor={Styles.primary300}
        />
        <InputContainer 
          placeholder="Author"
          placeholderTextColor={Styles.primary300}
        />
        <GenrePicker value={genre} onChange={setGenre}/>
        <AntDesign
          name="close"
          size={24}
          color={Styles.primary200}
          onPress={toggleModal}
        />
      </AppModal>
    </View>
  );
}

export default BooksListScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: s(15),
  },
});
