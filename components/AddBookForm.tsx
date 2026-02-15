import { Alert, Image, StyleSheet, Text, View } from "react-native";
import { Styles } from "../constants/colors";
import ModalHeader from "./ModalHeader";
import GenrePicker, { Genre } from "./GenrePicker";
import AppButton from "./AppButton";
import { s, vs } from "react-native-size-matters";
import { useState } from "react";
import AppTextInputController from "./AppTextInputController";
import * as yup from "yup";
import { set, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { createBook } from "../store/thunks/booksThunk";
import { AppDispatch } from "../store";
import Toast from "react-native-toast-message";

const schema = yup.object({
  title: yup.string().required("Title is required"),
  author: yup.string().required("Author name is required"),
});

type FormData = yup.InferType<typeof schema>;

interface AddBookFormProps {
  toggleModal: () => void;
  imagePicker: () => void;
  coverImg: string | "";
  setCoverImg: (text: string) => void;
}

const AddBookForm = ({
  toggleModal,
  coverImg,
  imagePicker,
  setCoverImg
}: AddBookFormProps) => {
  const [genre, setGenre] = useState<Genre | "">("");
  const dispatch = useDispatch<AppDispatch>();  

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  const bookCreationHandler = async (formdata: FormData) => {
    if (!genre) {
      Alert.alert("Genre is required!");
      return;
    }

    if (coverImg.length === 0) {
      Alert.alert("Book cover image is required!");
      return;
    }
    const payload = new FormData();

    payload.append("book[title]", formdata.title);
    payload.append("book[author]", formdata.author);
    payload.append("book[genre]", genre);
    const filename = coverImg.split('/').pop();
  const match = /\.(\w+)$/.exec(filename || "");
  const type = match ? `image/${match[1]}` : `image`;
  payload.append("book[image]", {
    uri: coverImg,
    name: filename,
    type: type,
  } as any);
    
    try {
      const response = await dispatch(createBook(payload)).unwrap();
      Toast.show({
        type: "success",
        text1: "Book added successfully!",
      });
    } catch (error) {
      const errorMsg = typeof error === "string" ? error : "Failed to add book";
      Toast.show({
        type: "error",
        text1: errorMsg,
      });
    } finally {
      setCoverImg("")
      toggleModal();
    }
  };

  return (
    <View>
      <ModalHeader toggleModal={toggleModal} />
      <AppTextInputController
        name="title"
        placeholder="Title"
        control={control}
        placeholderTextColor={Styles.primary300}
        keyboardType="default"
      />
      <AppTextInputController
        name="author"
        placeholder="Author"
        control={control}
        keyboardType="default"
        placeholderTextColor={Styles.primary300}
      />
      <GenrePicker value={genre} onChange={setGenre} />
      <AppButton onPress={imagePicker} style={styles.btn}>
        <Text style={{ color: Styles.primary50 }}>
          {coverImg ? "Change cover image" : "Upload cover image"}
        </Text>
      </AppButton>
      {coverImg && <Image source={{ uri: coverImg }} style={styles.upldImg} />}
      <AppButton onPress={handleSubmit(bookCreationHandler)}>
        <Text style={{ fontSize: s(15) }}>Create a book</Text>
      </AppButton>
    </View>
  );
};
export default AddBookForm;
const styles = StyleSheet.create({
  upldImg: {
    width: s(120),
    height: vs(150),
    marginVertical: vs(10),
    borderRadius: s(10),
    alignSelf: "center",
  },
  btn: {
    backgroundColor: Styles.primary600,
  },
});
