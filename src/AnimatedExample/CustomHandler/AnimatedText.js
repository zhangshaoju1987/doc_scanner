import React from 'react';
import { StyleSheet, TextInput, } from 'react-native';
import Animated, { useAnimatedProps } from 'react-native-reanimated';
Animated.addWhitelistedNativeProps({ text: true });
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);
export function AnimatedText({ style, text, }) {
    const animatedProps = useAnimatedProps(() => {
        return { text: text.value };
    });
    return (<AnimatedTextInput underlineColorAndroid="transparent" editable={false} value={text.value} style={[styles.text, style]} animatedProps={animatedProps}/>);
}
const styles = StyleSheet.create({
    text: {
        color: 'black',
    },
});
