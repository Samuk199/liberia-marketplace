import { View, Text ,StyleSheet } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native'

const Apploader = () => {
  return (
    <View style={[StyleSheet. absoluteFill, styles.container]} >
      <LottieView  source={require("../../assets/Animation.json")}  autoPlay loop />
    </View>
  )
}

export default Apploader
 const styles= StyleSheet.create({
        container:{
            justifyContent: 'center',
            alignItems:'center',
            backgroundColor:'rgba(0,0,0,3)',
            zIndex: 1,
        }




 })