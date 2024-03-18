import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, styles, images } from '../themes';
import Button from '../components/Button';
import { windowWidth } from '../utils/Dimensions';


export default function SplashScreen() {

    const [isPasswordShown, setIsPasswordShown] = useState<boolean>(false);
    const navigation = useNavigation<any>();
    function onPressHandler(): void {
        navigation.navigate('Register');
    }

    return (
        <SafeAreaView style={[styles.container, loginStyles.container]}>
            <StatusBar backgroundColor={colors.secondary} />
            <View style={[styles.innerContainer, loginStyles.topContainer]}>
                <Text style={[loginStyles.title]}>Login</Text>
                <View style={loginStyles.personImages}>
                    <Image source={images.person2} width={200} height={100} />
                </View>
            </View>
            <View style={loginStyles.bottomContainer}>

                <View style={styles.formColumn}>
                    <Text style={[styles.text, loginStyles.text]}>Email</Text>
                    <View style={styles.inputFormContainer}>
                        <TextInput placeholder="yourname@gmail.com" placeholderTextColor={colors.primaryText} keyboardType="email-address" style={styles.textInput} />
                    </View>
                </View>

                <View style={styles.formColumn}>
                    <Text style={[styles.text, loginStyles.text]}>Password</Text>
                    <View style={styles.inputFormContainer}>
                        <TextInput secureTextEntry={isPasswordShown} placeholder="Your password" placeholderTextColor={colors.primaryText} keyboardType="default" style={styles.textInput} />
                        <TouchableOpacity onPress={() => setIsPasswordShown(!isPasswordShown)} style={styles.passwordVisibility}>
                            {isPasswordShown ? < Image source={images.eyeClosed} /> : < Image source={images.eyeClosed} />}
                        </TouchableOpacity>
                    </View>
                </View>

                <Button buttonStyle={loginStyles.button} textStyle={loginStyles.buttonText} onPress={onPressHandler}>
                    Login
                </Button>
                <View style={styles.footerContainer}>
                    <Text style={styles.footerText}>
                        Don't have an account? {' '}
                        
                    </Text>
                    <TouchableOpacity style={styles.footerLink} onPress={() => navigation.navigate('Register')}>
                            <Text style={styles.footerLink}>Register </Text>
                        </TouchableOpacity>
                </View>
            </View>

        </SafeAreaView>
    );
}

const loginStyles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        backgroundColor: "white"
    },
    topContainer: {
        flex: 0.4,
        justifyContent: "flex-start",
        flexDirection: 'row',
        width: windowWidth,
        backgroundColor: colors.secondary,
        borderBottomLeftRadius: windowWidth / 3,
        borderBottomRightRadius: windowWidth/ 2
    },
    bottomContainer: {
        flex: 0.6,
        justifyContent: 'center',
        alignItems: 'center'
    },
    personImages: {
        flexDirection: "row",
        position: "absolute",
        bottom: -50,
        right: 20
    },
    title: {
        color: colors.primaryText,
        fontSize: 44,
        fontWeight: "700"
    },
    text: {
        fontSize: 15,
    },
    button: {

        width: windowWidth - 50,
        backgroundColor: colors.primary,
        padding: 20,
        marginTop: 10,
        borderRadius: 10
    },
    buttonText: {
        color: "white",
        textAlign: 'center',
        fontSize: 18,
        fontWeight: "400"
    },

});