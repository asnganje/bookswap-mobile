import { FlatList, StyleSheet, View } from "react-native";
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
import * as ImagePicker from "expo-image-picker"
import AddBookForm from "../../components/AddBookForm";

interface BookListProps {
  modalVisible: boolean;
  toggleModal: () => void;
}

function BooksListScreen({ modalVisible, toggleModal }: BookListProps) {
  const { books, loading } = useSelector((state: RootState) => state.books);
  const [coverImg, setCoverImg] = useState<string | "" >("")

const imagePicker = async () => {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: "images",
    allowsEditing:true,
    aspect:[3,4],
    quality:0.8
  })

  if(!result.canceled) {
    setCoverImg(result.assets[0].uri)
  }
}

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
        <AddBookForm coverImg={coverImg} toggleModal={toggleModal} imagePicker={imagePicker}/>
      </AppModal>
    </View>
  );
}

export default BooksListScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: s(15),
  }
});
