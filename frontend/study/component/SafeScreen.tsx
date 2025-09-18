import { View, Text } from 'react-native'
import React, {ReactNode} from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import {COLORS} from '@/constants/colors'

interface SafeScreenProps {
  children?: ReactNode; 
}
const SafeScreen = ({children}:SafeScreenProps) => {
  const safearea = useSafeAreaInsets()
  return (
    
    <View style={{paddingTop:safearea.top, paddingBottom:safearea.bottom,flex:1, backgroundColor:COLORS.background }}>
      {children}
    </View>
  )
}

export default SafeScreen