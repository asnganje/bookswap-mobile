import { Image, StyleSheet, Text, View } from 'react-native'
import { Styles } from '../constants/colors'
import ModalHeader from './ModalHeader'
import InputContainer from './InputContainer'
import GenrePicker, { Genre } from './GenrePicker'
import AppButton from './AppButton'
import { s, vs } from 'react-native-size-matters'
import { useState } from 'react'

interface AddBookFormProps {
  toggleModal:()=> void,
  imagePicker:()=>void,
  coverImg:string | ""
}

const AddBookForm = ({toggleModal, coverImg, imagePicker}: AddBookFormProps) => {
  const [genre, setGenre] = useState<Genre | "" >("")
  
  return (
    <View>
      <ModalHeader toggleModal={toggleModal}/>
        <InputContainer 
          placeholder="Title"
          placeholderTextColor={Styles.primary300}
        />
        <InputContainer 
          placeholder="Author"
          placeholderTextColor={Styles.primary300}
        />
        <GenrePicker value={genre} onChange={setGenre}/>
        <AppButton
          onPress={imagePicker}
          style={styles.btn}
        >
          <Text style={{color: Styles.primary50}}>{coverImg ? "Change cover image" : "Upload cover image"}</Text>
        </AppButton> 
        {
          coverImg &&
          <Image
            source={{uri: coverImg}}
            style={styles.upldImg}
          />
        }
        <AppButton >
          <Text style={{fontSize:s(15)}}>Create a book</Text>
        </AppButton>
    </View>
  )
}
export default AddBookForm
const styles = StyleSheet.create({
    upldImg:{
    width:s(120),
    height:vs(150),
    marginVertical:vs(10),
    borderRadius:s(10),
    alignSelf:"center"
  },
    btn:{
    backgroundColor: Styles.primary600
  }
})