import { ActivityIndicator, View } from "react-native";

function LoadingUI() {
  return <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
      <ActivityIndicator size="large" color="#0000ff"/>
    </View>
}

export default LoadingUI;