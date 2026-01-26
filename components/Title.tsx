import { StyleSheet, Text } from "react-native";
import { Styles } from "../constants/colors";

function Title({children}: {children: string}) {
  return(
    <Text style={styles.title}>{children}</Text>
  )  
}

export default Title;

const styles = StyleSheet.create({
  title:{
    fontSize:26,
    fontWeight:"bold",
    marginBottom:24,
    color:Styles.primary200,
    textAlign:"center"
  }
})