import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  View,
} from "react-native";
import { Styles } from "../constants/colors";

interface AppTextInputProps {
  value: string;
  onChangeText: (text: string) => void;
  style?: StyleProp<TextStyle>;
  placeholder: string;
  placeholderTextColor: string;
  keyboardType: "default" | "numeric" | "email-address";
}

const AppTextInput = ({
  value,
  onChangeText,
  style,
  placeholder,
  placeholderTextColor,
  keyboardType,
}: AppTextInputProps) => {
  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={placeholderTextColor}
      keyboardType={keyboardType}
      style={[styles.input, style]}
    />
  );
};
export default AppTextInput;
const styles = StyleSheet.create({
  input:{
        height:48,
        borderWidth:1,
        borderColor:Styles.primary400,
        borderRadius:10,
        paddingHorizontal:14,
        fontSize:16,
        backgroundColor:Styles.primary500,
        marginBottom:16
  }
});
