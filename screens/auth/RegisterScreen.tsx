import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StyleSheet, Text, View } from "react-native";
import { AuthStackParamList } from "../../app/AuthNavigator";
import { Styles } from "../../constants/colors";
import Title from "../../components/Title";
import InputContainer from "../../components/InputContainer";
import TouchableButton from "../../components/UI/TouchableButton";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons"

type Props = NativeStackScreenProps<AuthStackParamList, "Register">

function RegisterScreen({navigation}: Props) {
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false)

  const passwordIsVisibleToggler = () => setPasswordVisible((prev)=> !prev)

  const confirmPasswordIsVisibleToggler = () => setConfirmPasswordVisible((prev)=> !prev)

  function switchLogin(){
    navigation.navigate("Login")
  }
  return(
    <View style={styles.container}>
      <Title>Create Account</Title>
      <InputContainer
        placeholder="Full name"
        placeholderTextColor= {Styles.primary300} 
      />
      <InputContainer
        placeholder="Email"
        placeholderTextColor= {Styles.primary300}
        keyboardType="email-address"
      />
      <View style={styles.inputWrapper}>
        <InputContainer
          placeholder="Password"
          secureTextEntry = {!passwordVisible}
          placeholderTextColor= {Styles.primary300} 
        />
        <TouchableButton onPress={passwordIsVisibleToggler} style={styles.eyeContainer}>
          <Ionicons 
            name={ passwordVisible ? "eye-off" : "eye"}
            size={25}
          />
        </TouchableButton>
      </View>
      <View>
        <InputContainer
          placeholder="Confirm Password"
          secureTextEntry = {!confirmPasswordVisible}
          placeholderTextColor= {Styles.primary300} 
        />
        <TouchableButton onPress={confirmPasswordIsVisibleToggler} style={styles.eyeContainer}>
          <Ionicons 
            name={ confirmPasswordVisible ? "eye-off" : "eye"}
            size={25}
          />
        </TouchableButton>
      </View>
      <TouchableButton>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableButton>
      <TouchableButton onPress={switchLogin}>
        <Text style={styles.buttonText}>Already have an account? Login</Text>
      </TouchableButton>
    </View>
  )
}

export default RegisterScreen;

const styles = StyleSheet.create({
  container:{
    flex:1,
    padding:24,
    justifyContent:"center",
    backgroundColor: Styles.primary100
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