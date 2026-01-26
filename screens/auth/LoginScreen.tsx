import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StyleSheet, Text, View } from "react-native";
import { AuthStackParamList } from "../../app/AuthNavigator";
import { Styles } from "../../constants/colors";
import Title from "../../components/Title";
import InputContainer from "../../components/InputContainer";
import TouchableButton from "../../components/UI/TouchableButton";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

type Props = NativeStackScreenProps<AuthStackParamList, "Login">

function LoginScreen({navigation}: Props) {

  const [passwordVisible, setPasswordVisible] = useState(false)

  const passwordVisibilityToggler = () => setPasswordVisible((prev)=> !prev)

  function switchToRegister() {
    navigation.replace("Register")
  }
  return(
    <View style={styles.container}>
      <Title>Sign in</Title>
      <InputContainer
        placeholder="Email"
        placeholderTextColor={Styles.primary300}
      />
      <View style={styles.inputWrapper}>
        <InputContainer 
          placeholder="Password"
          secureTextEntry={!passwordVisible}
          placeholderTextColor={Styles.primary300}
        />
        <TouchableButton onPress={passwordVisibilityToggler} style={styles.eyeContainer}>
          <Ionicons 
            name={ passwordVisible ? "eye-off" : "eye"}
            size={25}
          />
        </TouchableButton>
      </View>
      <TouchableButton>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableButton>
      <TouchableButton onPress={switchToRegister}>
        <Text style={styles.buttonText}>Not registered yet? Register</Text>
      </TouchableButton>
    </View>
  )
}

export default LoginScreen;

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:"center",
    padding:24,
    backgroundColor: Styles.primary100
  },
  text:{
    color:"black"
  },
  buttonText:{
    color:Styles.primary50,
    fontSize:16,
    fontWeight:"500"
  },
  inputWrapper:{
    position:"relative",
    width:"100%",
    justifyContent:"center"
  },
  eyeContainer:{
    position:"absolute",
    right:15,
    bottom:15,
    backgroundColor:"transparent",
    borderRadius:0
  }
})