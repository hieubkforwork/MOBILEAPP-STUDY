import { HeaderShownContext } from '@react-navigation/elements'
import { Stack } from 'expo-router/stack'

export default function Layout() {
  return <Stack screenOptions={{headerShown:false}}/>
}