import { ReactNode } from "react";
import { GestureResponderEvent, StyleSheet, Text, TouchableOpacity, TouchableOpacityProps } from "react-native";
import { Styles } from "../../constants/colors";


interface TouchableButtonProps extends TouchableOpacityProps {
  children: ReactNode;
}

function TouchableButton({children, style, ...props}: TouchableButtonProps) {
  return <TouchableOpacity style={[styles.button, style]} {...props}>
    {children}
  </TouchableOpacity>
}

export default TouchableButton;

const styles = StyleSheet.create({
  button:{
    height:48,
    borderRadius:10,
    backgroundColor: Styles.primary600,
    alignItems:"center",
    justifyContent:"center",
    marginTop:20,
  }
})