import { View, ActivityIndicator } from "react-native";
import { styles } from "@/styles/auth.styles";
import { COLORS } from "@/constants/colors";

const PageLoader = () => {
  return (
    <View style = {styles.container}>
      <ActivityIndicator size={"large"} color={COLORS.primary}/>
    </View>
  )
}
export default PageLoader;