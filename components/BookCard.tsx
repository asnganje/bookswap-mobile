import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Book } from "../types/book";
import { s, vs } from "react-native-size-matters";
import { Styles } from "../constants/colors";
import TouchableButton from "./UI/TouchableButton";
import { useNavigation } from "@react-navigation/native";
import {BottomTabNavigationProp} from "@react-navigation/bottom-tabs"
import { TabStackParamList } from "../app/AppNavigator";

interface BookCardProps {
  item: Book;
}

type TabNavigationProp = BottomTabNavigationProp<TabStackParamList>

const BookCard = ({ item }: BookCardProps) => {
  const { image_url, title, author } = item;

  const navigation = useNavigation<TabNavigationProp>()
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: image_url }} style={styles.image} />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subTitle}> By {author}</Text>
      <TouchableButton onPress={()=>navigation.navigate("BookSwaps")} style={styles.btn}><Text style={styles.text}>Request swap</Text></TouchableButton>
    </TouchableOpacity>
  );
};
export default BookCard;
const styles = StyleSheet.create({
  container: {
    width: s(250),
    height: vs(230),
    overflow: "hidden",
    backgroundColor: Styles.primary100,
    alignItems: "center",
    justifyContent: "center",
    borderRadius:s(10),
    elevation: 4,
    shadowColor: Styles.primary100,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  imageContainer: {
    paddingBottom:vs(6),
    width: s(130),
    height: vs(150),
  },
  image: {
    width: "100%",
    height: "100%",
  },
  title: {
    fontSize: s(12),
    fontWeight: "400",
    paddingVertical:vs(1)
  },
  subTitle: {
    fontSize: s(10),
    fontWeight: "200",
  },
  btn:{
    width:"50%",
    marginTop:vs(5),
    height:vs(28)
  },
  text:{
    color: Styles.primary50
  }
});
