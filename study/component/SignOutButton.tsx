import { styles } from '@/styles/home.styles'
import { useClerk } from '@clerk/clerk-expo'
import { useRouter } from 'expo-router'
import { Alert, Text, TouchableOpacity } from 'react-native'
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from '@/constants/colors';

export const SignOutButton = () => {
  // Use `useClerk()` to access the `signOut()` function
  const { signOut } = useClerk()
  const router = useRouter()

  const handleSignOut = () => {
   
    try {
       Alert.alert("Log Out", "Are you want to log out ?",
      [
        {text:"Cancel", style:'cancel'},
        {text:"LogOut",style:'destructive', onPress:async ()=>
          { 
          await signOut()
          console.log("Sign OUT")
          router.replace('/sign-in')}}
      ]
    )      
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
    }
  }

  return (
    <TouchableOpacity style = {styles.logoutButton}onPress={handleSignOut}>
        <Ionicons name="log-out-outline" size={25} color={COLORS.text}/>
    </TouchableOpacity>
  )
}