import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleProp, ViewStyle } from "react-native";

type IconButtonProps = {
  size: number,
  icon: keyof typeof Ionicons.glyphMap
  color?:string,
  style?:StyleProp<ViewStyle>,
  onPress?:()=> void
}

function IconButton({size, icon, color, style, onPress}: IconButtonProps) {
  return <Pressable
            onPress={onPress}
            style= {({pressed}) => [style, (pressed && {opacity:0.1})]}
          >
            <Ionicons size={size} name={icon} color={color}/>
        </Pressable>  
}

export default IconButton;