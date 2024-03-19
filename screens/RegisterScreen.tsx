import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { colors, styles, images } from '../themes';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';
import { TAuthProviderProps } from '../Types/types';
import { debounce } from '../utils/debounce';
import { windowWidth } from '../utils/Dimensions';


export default function RegisterScreen() {

    const navigation = useNavigation<any>();
    const { register } = useAuth<TAuthProviderProps>();

    const [userName, setUserName] = useState<string>();
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string | undefined>();
    const [isPasswordShown, setIsPasswordShown] = useState<boolean>(true);

    const handleRegister = () => {
        register(userName ? userName : '', email ? email : '', password ? password : '');
    };

    const handleUserNameChange = (text: string) => {
        setUserName(text);
    };

    const handleEmailChange = (text: string) => {
        setEmail(text);
    };

    const handlePasswordChange = (text: string) => {
        setPassword(text);
    };


    const debouncedHandleRegister = debounce(handleRegister, 400);
    const debouncedHandleUserNameChange = debounce(handleUserNameChange, 400);
    const debouncedHandleEmailChange = debounce(handleEmailChange, 400);
    const debouncedHandlePasswordChange = debounce(handlePasswordChange, 500);


    return (
        <SafeAreaView style={[styles.container, registerStyles.container]}>
            <StatusBar backgroundColor={colors.primary} />
            <View style={{ position: 'absolute', top: 70, left: 30, zIndex: 2 }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={images.backIcon} width={150} height={150} />
                </TouchableOpacity>
            </View>


            <View style={[styles.innerContainer, styles.curveContainer]}>
                <Text style={[registerStyles.title]}>Register</Text>
                <View style={registerStyles.personImages}>
                    <Image source={images.person1} width={200} height={100} />
                </View>
            </View>
            <View style={registerStyles.bottomContainer}>
                <View style={styles.formColumn}>
                    <Text style={[styles.text, registerStyles.text]}>Username</Text>
                    <View style={styles.inputFormContainer}>
                        <TextInput onChangeText={(value) => debouncedHandleUserNameChange(value)} placeholder="muncher" placeholderTextColor={colors.primaryText} keyboardType="default" style={styles.textInput} />
                    </View>
                </View>

                <View style={styles.formColumn}>
                    <Text style={[styles.text, registerStyles.text]}>Email</Text>
                    <View style={styles.inputFormContainer}>
                        <TextInput onChangeText={(value) => debouncedHandleEmailChange(value)} placeholder="yourname@gmail.com" placeholderTextColor={colors.primaryText} keyboardType="email-address" style={styles.textInput} />
                    </View>
                </View>

                <View style={styles.formColumn}>
                    <Text style={[styles.text, registerStyles.text]}>Password</Text>
                    <View style={styles.inputFormContainer}>
                        <TextInput onChangeText={(value) => debouncedHandlePasswordChange(value)} secureTextEntry={isPasswordShown} placeholder="your password" placeholderTextColor={colors.primaryText} keyboardType="default" style={styles.textInput} />
                        <TouchableOpacity onPress={() => setIsPasswordShown(!isPasswordShown)} style={styles.passwordVisibility}>
                            {isPasswordShown ? < Image source={images.eyeClosed} /> : < Image source={images.eyeOpened} />}
                        </TouchableOpacity>
                    </View>
                </View>

                <Button buttonStyle={registerStyles.button} textStyle={registerStyles.buttonText} onPress={debouncedHandleRegister}>
                    Register
                </Button>
                <View style={styles.footerContainer}>
                    <Text style={styles.footerText}>
                        Have an account?{' '}

                    </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')} >
                        <Text style={styles.footerLink}>Login</Text>
                    </TouchableOpacity>

                </View>
            </View>

        </SafeAreaView>
    );
}


const registerStyles = StyleSheet.create({
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
        color: colors.primaryText,
        fontSize: 44,
        fontWeight: "700"
    },
    text: {
        fontSize: 18,
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