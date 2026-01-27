import { ActivityIndicator, View } from "react-native";

function LoadingUI() {
  return <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
      <ActivityIndicator size="large" color="#FFF"/>
    </View>
}

export default LoadingUI;