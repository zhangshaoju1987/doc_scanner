import { TouchableNativeFeedback, TouchableOpacity } from "react-native";
import { Platform } from "react-native";
import React from "react";// 即便没有显示用到，也要引用

export const Touchable = (props) => {
    return Platform.OS === 'android'
      ? <TouchableNativeFeedback onPress={props.onPress}>{props.children}</TouchableNativeFeedback>
      : <TouchableOpacity onPress={props.onPress}>{props.children}</TouchableOpacity>
  }