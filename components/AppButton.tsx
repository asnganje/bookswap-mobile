import { ReactNode } from 'react'
import { StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native'
import { Styles } from '../constants/colors'
import { s, vs } from 'react-native-size-matters'

interface AppButtonProps {
  children: ReactNode,
  onPress?:()=>void,
  style?: StyleProp<ViewStyle>
}

const AppButton = ({children, onPress, style}: AppButtonProps) => {
  return (
    <TouchableOpacity
      style={[styles.btnContainer, style]}
      onPress={onPress}
    >
      {children}
    </TouchableOpacity>
  )
}
export default AppButton
const styles = StyleSheet.create({
  btnContainer:{
    justifyContent:"center",
    alignItems:"center",
    marginVertical:vs(10),
    padding:s(10),
    borderRadius:s(10),
    backgroundColor:Styles.primary400
  }
})