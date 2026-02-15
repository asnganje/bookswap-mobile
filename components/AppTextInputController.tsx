import { Control, Controller, FieldValues, Path } from 'react-hook-form'
import { StyleSheet, Text, View } from 'react-native'
import { Styles } from '../constants/colors'
import { s, vs } from 'react-native-size-matters'
import AppTextInput from './AppTextInput'

interface AppTextInputControllerProps<T extends FieldValues> {
  control:Control<T>,
  name: Path<T>,
  rules: object,
  keyboardType:"default"|"numeric"|"email-address",
  placeholder:string,
  placeholderTextColor:string
}

const AppTextInputController = <T extends FieldValues> ({control, name, rules, keyboardType, placeholder, placeholderTextColor}: AppTextInputControllerProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({field: {onChange, value}, fieldState: {error}})=>
        <>
          <AppTextInput
            value={value}
            onChangeText={onChange}
            placeholder={placeholder}
            keyboardType={keyboardType}
            placeholderTextColor={placeholderTextColor}
            style={[error && styles.inputError]}
          />
          {error && <Text style={styles.textError}>{error.message}</Text>}
        </>      
      }
    />
  )
}
export default AppTextInputController
const styles = StyleSheet.create({
  inputError:{
    borderColor: Styles.primary800
  },
  textError:{
    fontSize:s(12),
    color:Styles.primary800,
    textAlign:"center",
    marginVertical:vs(5)
  }
})