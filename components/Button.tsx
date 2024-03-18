import { StyleSheet, Text, View, TouchableOpacity, GestureResponderEvent, StyleProp, ViewStyle, Dimensions, TextStyle } from 'react-native';
import { colors } from '../themes';
import { Children } from 'react';

const {width, height} = Dimensions.get('window');
type ButtonProps = {
    children: React.ReactNode,
    onPress: (navigationRef: any) => void,
    buttonStyle?: StyleProp<ViewStyle>,
    textStyle?: StyleProp<TextStyle>,
}

export default function Button(props: ButtonProps) {
    const { children, onPress, buttonStyle, textStyle } = props;

    return (
        <TouchableOpacity style={[buttonStyles.button, buttonStyle]} onPress={onPress}>
            <Text style={[buttonStyles.buttonText, textStyle]}>{children}</Text>
        </TouchableOpacity>
    );
}

const buttonStyles = StyleSheet.create({

    button: {
        color: colors.primaryText, 
        width: width - 100,
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10
    },
    buttonText: {
        color: colors.primary, 
        textAlign: 'center',
        fontSize: 18,
        fontWeight:"400"
    }
});