import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StyleSheet, Text, View } from "react-native";
import { AuthStackParamList } from "../../app/AuthNavigator";
import { Styles } from "../../constants/colors";
import Title from "../../components/Title";
import InputContainer from "../../components/InputContainer";
import TouchableButton from "../../components/UI/TouchableButton";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons"
import { TypedUseSelectorHook, useDispatch } from "react-redux";
import { registerUser } from "../../store/thunks/authThunk";
import { AppDispatch, RootState } from "../../store";
import Toast from "react-native-toast-message";
import { useSelector } from "react-redux";
import LoadingUI from "../../components/UI/Loading";

type Props = NativeStackScreenProps<AuthStackParamList, "Register">

function RegisterScreen({navigation}: Props) {
  const dispatch = useDispatch<AppDispatch>()
  const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
  const { loading } = useTypedSelector((state)=>state.auth)
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false)
  const [userData, setUserData] = useState({
    fullname: {value: "", isValid:true},
    email:{value:"", isValid:true},
    password:{value:"", isValid:true},
    confirmPassword:{value:"", isValid: true}
  })

  function inputChangeHandler(identifier: string, enteredValue: string) {
    setUserData((currInputs)=> ({...currInputs, [identifier]: {value: enteredValue, isValid:true}}))
  }

  const registrationSubmitHandler = async () => {
    const emailIsValid = userData.email.value.includes("@") && userData.email.value.includes(".")
    const nameIsValid = userData.fullname.value.trim().length > 0
    const passwordIsValid = userData.password.value.length >= 6
    const passwordsMatch = userData.password.value === userData.confirmPassword.value
    
    if (!emailIsValid || !nameIsValid || !passwordIsValid || !passwordsMatch) {
      setUserData((currInputs)=> ({
        fullname:{ value: currInputs.fullname.value, isValid: nameIsValid},
        email: {value: currInputs.email.value, isValid: emailIsValid},
        password: {value: currInputs.password.value, isValid: passwordIsValid},
        confirmPassword: {value:currInputs.confirmPassword.value, isValid: passwordsMatch}
      }))
      return;
    }
    const authData = {
      user: {
        fullname: userData.fullname.value,
        email: userData.email.value,
        password: userData.password.value
      }
    }

    try {
      const response = await dispatch(registerUser(authData)).unwrap();
      Toast.show({
        type: "success",
        text1:response.msg
      })

      setTimeout(()=> {
        navigation.replace("Login")
      }, 2000)
    } catch (error) {
      const errorMsg = typeof error === "string" ? error :"Registration failed"
      Toast.show({
        type:"error",
        text1:errorMsg
      })
    }
  }

  const formIsInvalid = !userData.fullname.isValid || !userData.email.isValid || !userData.password.isValid || !userData.confirmPassword.isValid

  const passwordIsVisibleToggler = () => setPasswordVisible((prev)=> !prev)

  const confirmPasswordIsVisibleToggler = () => setConfirmPasswordVisible((prev)=> !prev)

  function switchLogin(){
    navigation.replace("Login")
  }
  return(
    <View style={styles.container}>
      <Title>Create Account</Title>
      {formIsInvalid && <Text style={styles.errorText}>Invalid input data</Text>}
      <InputContainer
        placeholder="Full name"
        placeholderTextColor= {Styles.primary300} 
        value={userData.fullname.value}
        invalid={!userData.fullname.isValid}
        onChangeText={(enteredText)=>inputChangeHandler("fullname", enteredText)}
      />
      <InputContainer
        placeholder="Email"
        placeholderTextColor= {Styles.primary300}
        keyboardType="email-address"
        value={userData.email.value}
        invalid={!userData.email.isValid}
        onChangeText={(enteredText)=>inputChangeHandler("email", enteredText)}
      />
      <View style={styles.inputWrapper}>
        <InputContainer
          placeholder="Password"
          secureTextEntry = {!passwordVisible}
          placeholderTextColor= {Styles.primary300}
          value={userData.password.value}
          invalid={!userData.password.isValid}
          onChangeText={(enteredText)=>inputChangeHandler("password", enteredText)} 
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
          value={userData.confirmPassword.value}
          invalid={!userData.confirmPassword.isValid}
          onChangeText={(enteredtext)=>inputChangeHandler("confirmPassword", enteredtext)}
        />
        <TouchableButton onPress={confirmPasswordIsVisibleToggler} style={styles.eyeContainer}>
          <Ionicons 
            name={ confirmPasswordVisible ? "eye-off" : "eye"}
            size={25}
          />
        </TouchableButton>
      </View>
      <TouchableButton onPress={registrationSubmitHandler}>
        {loading? <LoadingUI color="#FFF"/> : <Text style={styles.buttonText}>Register</Text>}
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
  },
  errorText:{
    marginVertical:5,
    color:Styles.primary700,
    fontWeight:"bold"
  }
})