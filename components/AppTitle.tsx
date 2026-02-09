import { FC, ReactNode } from 'react'
import { StyleProp, StyleSheet, Text, TextStyle, View } from 'react-native'
import { Styles } from '../constants/colors'

interface TitleProps {
  children: ReactNode,
  style?: StyleProp<TextStyle> 
}
const AppTitle :FC<TitleProps> = ({children, style}) => {
  return (
      <Text style={[styles.title, style]}>{children}</Text>
  )
}
export default AppTitle
const styles = StyleSheet.create({
  title:{
      fontSize:26,
      fontWeight:"bold",
      marginBottom:24,
      color:Styles.primary300,
      textAlign:"center"
  }
})