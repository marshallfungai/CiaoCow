
import { StyleSheet, Text, View, Image, TouchableOpacity, GestureResponderEvent, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation  } from '@react-navigation/native';
import { styles, colors, images } from '../themes/';
import Button from '../components/Button';
import { StatusBar } from 'expo-status-bar';

const { width, height } = Dimensions.get('window');


export default function SplashScreen() {

    const navigation =  useNavigation <any>();
    function onPressHandler(): void {
        navigation.navigate('Register');
    }                                                                                       

    return (
        <SafeAreaView style={[styles.container, splashStyles.container]}>
            <StatusBar backgroundColor={colors.secondary} />
            <View style={[styles.innerContainer, splashStyles.topContainer]}>
                <Image source={images.logo} width={200} height={100} />
                <View style={splashStyles.personImages}>
                    <Image source={images.person1} width={200} height={100} />
                    <Image source={images.person2} width={200} height={100} />
                </View>
            </View>
            <View style={splashStyles.bottomContainer}>
                <View style={styles.innerContainer}>
                    <Text style={[styles.text, splashStyles.text]}>Hungry? <Text style={{ fontWeight: 'bold' }}>CiaoChow</Text> helps  {'\n'} you find something to eat.</Text>
                </View>
                <Button onPress={onPressHandler}>
                    Get Started
                </Button>
            </View>

        </SafeAreaView>
    );
}


const splashStyles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        backgroundColor: colors.primary
    },
    topContainer: {
        flex: 0.4,
        justifyContent: "flex-start",
        width: width,
        backgroundColor: colors.secondary,
        padding: 50,
        borderBottomLeftRadius: width /3,
        borderBottomRightRadius: width /2
    },
    bottomContainer: {
        flex: 0.6,
        justifyContent: "center",
        borderBottomLeftRadius: width /3,
        borderBottomRightRadius: width /2
    },
    personImages: {
        flexDirection: "row",
        position:"absolute",
        bottom: -50
    },
    text: {
        color: colors.primaryText,
        fontSize: 22,
        fontWeight: "300"
    },
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
        fontWeight: "400"
    }
});

