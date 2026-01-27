import { ActivityIndicator, View } from "react-native";

function LoadingUI({color}: {color: string}) {
  return <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
      <ActivityIndicator size="large" color={color}/>
    </View>
}

export default LoadingUI;