import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, styles, images } from '../themes';
import Button from '../components/Button';
import { windowWidth } from '../utils/Dimensions';
import { TAuthProviderProps } from '../Types/types';
import { useAuth } from '../context/AuthContext';
import { debounce } from '../utils/debounce';


export default function LoginScreen() {

    const navigation = useNavigation<any>();
    const { login, } = useAuth<TAuthProviderProps>();


    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string | undefined>();
    const [isPasswordShown, setIsPasswordShown] = useState<boolean>(true);

    const handleLogin = () => {
        login(email ? email : '', password ? password : '');
    };

    const handleEmailChange = (text: string) => {
        setEmail(text);
    };

    const handlePasswordChange = (text: string) => {
        setPassword(text);
    };


    const clearForms = () => {
        setEmail('');
        setPassword(undefined);
    };

    const debouncedHandleLogin = debounce(handleLogin, 400);
    const debouncedHandleEmailChange = debounce(handleEmailChange, 400);
    const debouncedHandlePasswordChange = debounce(handlePasswordChange, 500);


    return (
        <SafeAreaView style={[styles.container, loginStyles.container]}>
            <StatusBar backgroundColor={colors.primary} />
            <View style={{ position: 'absolute', top: 70, left: 30, zIndex: 2 }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={images.backIcon} width={150} height={150} />
                </TouchableOpacity>
            </View>

            <View style={[styles.innerContainer, styles.curveContainer]}>
                <Text style={[loginStyles.title]}>Login</Text>
                <View style={loginStyles.personImages}>
                    <Image source={images.person2} width={200} height={100} />
                </View>
            </View>
            <View style={loginStyles.bottomContainer}>

                <View style={styles.formColumn}>
                    <Text style={[styles.text, loginStyles.text]}>Email</Text>
                    <View style={styles.inputFormContainer}>
                        <TextInput onChangeText={(value) => debouncedHandleEmailChange(value)} placeholder="yourname@gmail.com" placeholderTextColor={colors.grey} keyboardType="email-address" style={styles.textInput} />
                    </View>
                </View>

                <View style={styles.formColumn}>
                    <Text style={[styles.text, loginStyles.text]}>Password</Text>
                    <View style={styles.inputFormContainer}>
                        <TextInput onChangeText={(value) => debouncedHandlePasswordChange(value)} secureTextEntry={isPasswordShown} placeholder="Your password" placeholderTextColor={colors.grey} keyboardType="default" style={styles.textInput} />
                        <TouchableOpacity onPress={() => setIsPasswordShown(!isPasswordShown)} style={styles.passwordVisibility}>
                            {isPasswordShown ? < Image source={images.eyeClosed} /> : < Image source={images.eyeOpened} />}
                        </TouchableOpacity>
                    </View>
                </View>

                <Button buttonStyle={loginStyles.button} textStyle={loginStyles.buttonText} onPress={debouncedHandleLogin}>
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
        color: 'white',
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