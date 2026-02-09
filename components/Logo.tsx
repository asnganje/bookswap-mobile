import { Image, StyleSheet, Text, View } from 'react-native'
import { s, vs } from 'react-native-size-matters'
const Logo = () => {
  return (
    <View style={styles.outerContainer}>
    <View style={styles.container}>
      <Image
        source={require("../assets/logo.jpg")}
        style={styles.img}
      />
    </View>
    </View>
  )
}
export default Logo
const styles = StyleSheet.create({
  container:{
    alignItems:"center",
    justifyContent:"center",
    height:s(150),
    width:s(150),
  },
  img:{
    height:"100%",
    width:"100%",
    borderRadius:s(75)
  },
  outerContainer:{
    width:s(300),
    marginVertical:vs(20), 
    flexDirection:"row", 
    alignItems:"center", 
    justifyContent:"center"
  }
})