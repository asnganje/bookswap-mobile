import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StyleSheet, Text, View } from "react-native";
import { AuthStackParamList } from "../../app/AuthNavigator";
import { Styles } from "../../constants/colors";
import InputContainer from "../../components/InputContainer";
import TouchableButton from "../../components/UI/TouchableButton";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { TypedUseSelectorHook, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { loginUser } from "../../store/thunks/authThunk";
import Toast from "react-native-toast-message";
import * as SecureStore from "expo-secure-store";
import { useSelector } from "react-redux";
import LoadingUI from "../../components/UI/LoadingUI";
import Logo from "../../components/Logo";
import AppTitle from "../../components/AppTitle";

type Props = NativeStackScreenProps<AuthStackParamList, "Login">;

function LoginScreen({ navigation }: Props) {
  const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
  const { loading } = useTypedSelector((state) => state.auth);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const [inputs, setInputs] = useState({
    email: { value: "", isValid: true },
    password: { value: "", isValid: true },
  });

  const loginValuesChangeHandler = (
    identifier: string,
    enteredText: string,
  ) => {
    setInputs((prev) => ({
      ...prev,
      [identifier]: { value: enteredText, isValid: true },
    }));
  };

  const loginHandler = async () => {
    const emailIsValid =
      inputs.email.value.includes("@") && inputs.email.value.includes(".");
    const passwordIsValid = inputs.password.value.length >= 6;

    if (!emailIsValid || !passwordIsValid) {
      setInputs((currInputs) => ({
        email: { value: currInputs.email.value, isValid: false },
        password: { value: currInputs.password.value, isValid: false },
      }));
      return;
    }
    const authData = {
      user: {
        email: inputs.email.value,
        password: inputs.password.value,
      },
    };

    try {
      const response = await dispatch(loginUser(authData)).unwrap();
      await SecureStore.setItemAsync("userToken", response.token);
      await SecureStore.setItemAsync("userData", JSON.stringify(response.user));
      Toast.show({
        type: "success",
        text1: response.msg,
      });
    } catch (error) {
      const errorMsg = typeof error === "string" ? error : "Login failed";
      Toast.show({
        type: "error",
        text1: errorMsg,
      });
    }
  };

  const passwordVisibilityToggler = () => setPasswordVisible((prev) => !prev);

  function switchToRegister() {
    navigation.replace("Register");
  }

  const formIsInvalid = !inputs.email.isValid || !inputs.password.isValid;
  return (
    <View style={styles.container}>
      <Logo />
      <AppTitle>Book Swap</AppTitle>
      {formIsInvalid && (
        <Text style={styles.errorText}>Invalid input data</Text>
      )}
      <InputContainer
        placeholder="Email"
        value={inputs.email.value}
        invalid={!inputs.email.isValid}
        onChangeText={(enteredText) =>
          loginValuesChangeHandler("email", enteredText)
        }
        placeholderTextColor={Styles.primary300}
      />
      <View style={styles.inputWrapper}>
        <InputContainer
          placeholder="Password"
          secureTextEntry={!passwordVisible}
          value={inputs.password.value}
          invalid={!inputs.password.isValid}
          onChangeText={(enteredText) =>
            loginValuesChangeHandler("password", enteredText)
          }
          placeholderTextColor={Styles.primary300}
        />
        <TouchableButton
          onPress={passwordVisibilityToggler}
          style={styles.eyeContainer}
        >
          <Ionicons name={passwordVisible ? "eye-off" : "eye"} size={25} />
        </TouchableButton>
      </View>
      <TouchableButton onPress={loginHandler}>
        {loading ? (
          <LoadingUI color="#FFF" />
        ) : (
          <Text style={styles.buttonText}>Login</Text>
        )}
      </TouchableButton>
      <TouchableButton onPress={switchToRegister}>
        <Text style={styles.buttonText}>Not registered yet? Register</Text>
      </TouchableButton>
    </View>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: Styles.primary100,
  },
  text: {
    color: "black",
  },
  buttonText: {
    color: Styles.primary50,
    fontSize: 16,
    fontWeight: "500",
  },
  inputWrapper: {
    position: "relative",
    width: "100%",
    justifyContent: "center",
  },
  errorText: {
    marginVertical: 5,
    color: Styles.primary700,
    fontWeight: "bold",
  },
  eyeContainer: {
    position: "absolute",
    right: 15,
    bottom: 15,
    backgroundColor: "transparent",
    borderRadius: 0,
  },
});
