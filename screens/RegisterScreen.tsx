import { StatusBar, setStatusBarBackgroundColor } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { colors, styles, images } from '../themes';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';
import { AuthProviderProps } from '../Types/types';


const { width, height } = Dimensions.get('window');


export default function RegisterScreen() {

    const navigation = useNavigation<any>();
    const {login, userCredentials, register} = useAuth<AuthProviderProps>();

    const [userName, setUserName] = useState<string>();
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string | undefined>();
    const [isPasswordShown, setIsPasswordShown] = useState<boolean>(false);

    function onLoginHandler(): void {
        navigation.navigate('Login');
    }

    const handleRegister = (usernameValue: string, emailValue: string, passwordValue: string) => {
        console.log('wewevwvwve');
        console.log(usernameValue);
        console.log(emailValue);
        console.log(passwordValue);
        debugger;
        register(usernameValue, emailValue, passwordValue);
      };

      const handleUserNameChange = (text:string) => {
        console.log(text);
        setUserName(text);
      };

      const handleEmailChange = (text:string) => {
        console.log('Test Email');
        setEmail(text);
      };

      const handlePasswordChange = (text:string) => {
        console.log('password ' + text);
        setPassword(text);
        
      };


    return (
        <SafeAreaView style={[styles.container, registerStyles.container]}>
            <StatusBar backgroundColor={colors.secondary} />
            <View style={[styles.innerContainer, registerStyles.topContainer]}>
                <Text style={[registerStyles.title]}>Register</Text>
                <View style={registerStyles.personImages}>
                    <Image source={images.person1} width={200} height={100} />
                </View>
            </View>
            <View style={registerStyles.bottomContainer}>
                <View style={styles.formColumn}>
                    <Text style={[styles.text, registerStyles.text]}>Username</Text>
                    <View style={styles.inputFormContainer}>
                        <TextInput onChangeText={handleUserNameChange}  placeholder="muncher" placeholderTextColor={colors.primaryText} keyboardType="default" style={styles.textInput} />
                    </View>
                </View>

                <View style={styles.formColumn}>
                    <Text style={[styles.text, registerStyles.text]}>Email</Text>
                    <View style={styles.inputFormContainer}>
                        <TextInput onChangeText={handleEmailChange}  placeholder="yourname@gmail.com" placeholderTextColor={colors.primaryText} keyboardType="email-address" style={styles.textInput} />
                    </View>
                </View>

                <View style={styles.formColumn}>
                    <Text style={[styles.text, registerStyles.text]}>Password</Text>
                    <View style={styles.inputFormContainer}>
                        <TextInput onChangeText={handlePasswordChange} secureTextEntry={isPasswordShown} placeholder="your password" placeholderTextColor={colors.primaryText} keyboardType="default" style={styles.textInput} />
                        <TouchableOpacity onPress={() => setIsPasswordShown(!isPasswordShown)} style={styles.passwordVisibility}>
                            {isPasswordShown ? < Image source={images.eyeClosed} /> : < Image source={images.eyeClosed} />}
                        </TouchableOpacity>
                    </View>
                </View>

                <Button buttonStyle={registerStyles.button} textStyle={registerStyles.buttonText} onPress={() => handleRegister(userName? userName:'', email? email:'', password ? password.substring(0, 5) : '')}>
                    Register
                </Button>
                <View style={styles.footerContainer}>
                    <Text style={styles.footerText}>
                        Have an account?{' '}

                    </Text>
                    <TouchableOpacity onPress={onLoginHandler} >
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
    topContainer: {
        flex: 0.4,
        justifyContent: "flex-start",
        flexDirection: 'row',
        width: width,
        backgroundColor: colors.secondary,
        borderBottomLeftRadius: width / 3,
        borderBottomRightRadius: width / 2
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

        width: width - 50,
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