import { Ionicons } from "@expo/vector-icons";
import { Pressable } from "react-native";

type IconButtonProps = {
  size: number,
  icon: keyof typeof Ionicons.glyphMap
  color?:string,
  onPress?:()=>{}
}

function IconButton({size, icon, color, onPress}: IconButtonProps) {
  return <Pressable
            onPress={onPress}
            style= {({pressed}) => (pressed && {opacity:0.1} )}
          >
            <Ionicons size={size} name={icon} color={color}/>
        </Pressable>  
}

export default IconButton;