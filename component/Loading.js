import { View,Dimensions } from 'react-native'
import React from 'react'
import * as Progress from 'react-native-progress';
const {width, height} =  Dimensions.get('window');

export default function Loading() {
  return (
    <View style={{height, width}} className="absolute flex-row justify-center items-center">
        <Progress.Bar width={200} indeterminate={true} color='orange' />
    </View>
  )
}