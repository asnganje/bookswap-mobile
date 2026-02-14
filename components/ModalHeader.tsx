import { StyleSheet, Text, View } from 'react-native'
import AppTitle from './AppTitle'
import AntDesign from "@expo/vector-icons/AntDesign";
import { Styles } from '../constants/colors';
import { vs } from 'react-native-size-matters';

interface ModalHeaderProps {
  toggleModal:()=>void
}

const ModalHeader = ({toggleModal}: ModalHeaderProps) => {
  return (
    <View style={styles.container}>
      <AppTitle style={styles.title}>Add a Book</AppTitle>
      <AntDesign
          name="close"
          size={24}
          color={Styles.primary200}
          onPress={toggleModal}
        />
    </View>
  )
}
export default ModalHeader
const styles = StyleSheet.create({
  container:{
    marginVertical:vs(30),
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center"
  },
  title:{
    marginBottom:0
  }
})