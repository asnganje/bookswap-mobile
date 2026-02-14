import { Picker } from '@react-native-picker/picker'
import { StyleSheet, Text, View } from 'react-native'
import { s, vs } from 'react-native-size-matters'
import { Styles } from '../constants/colors'

export type Genre = 
  |"technology"
  |"science"
  |"business"
  |"fiction"
  |"romantic"
  |"action"
  |"academic"
  |"others"

interface GenreProps {
  value: Genre | "",
  onChange:(value: Genre) => void
}
const GenrePicker = ({value, onChange}: GenreProps) => {
  return (
    <View style={styles.container}>
      <Picker
        selectedValue={value}
        onValueChange={(itemValue)=> {
          if (itemValue !== "") {
            onChange(itemValue as Genre)            
          }
        }}
        dropdownIconColor={Styles.primary200}
        style={styles.picker}
      >
        <Picker.Item label="Select genre" value="" />
        <Picker.Item label="Technology" value="technology" />
        <Picker.Item label="Science" value="science" />
        <Picker.Item label="Business" value="business" />
        <Picker.Item label="Fiction" value="fiction" />
        <Picker.Item label="Romantic" value="romantic" />
        <Picker.Item label="Action" value="action" />
        <Picker.Item label="Academic" value="academic" />
        <Picker.Item label="Others" value="others" />
      </Picker>
    </View>
  )
}
export default GenrePicker
const styles = StyleSheet.create({
  container:{
    borderWidth:s(1),
    borderColor:Styles.primary200,
    borderRadius:s(10),
    marginVertical:vs(12),
    overflow:"hidden",
    backgroundColor:Styles.primary50
  },
  picker:{
    height:vs(45)
  }
})