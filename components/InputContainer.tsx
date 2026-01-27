import { StyleSheet, TextInput } from "react-native";
import { InputProps } from "../types/input";
import { Styles } from "../constants/colors";
import React from "react";

const InputContainer: React.FC<InputProps> = ({ style, invalid, error, ...props}) => {
  return(<TextInput
    {...props}
    style={[styles.input, style, error && styles.error, invalid && styles.invalid]}
  />)
}

export default InputContainer;

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
  },
  error:{
    backgroundColor:Styles.primary700
  },
  invalid:{
    borderWidth:2,
    borderColor: Styles.primary700
  }
})