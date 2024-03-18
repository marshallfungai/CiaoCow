// styles.ts
import { StyleSheet } from 'react-native';
import colors from './colors';
import { windowWidth } from '../utils/Dimensions';

const styles = StyleSheet.create({
    // Define other common styles
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    innerContainer: {
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',

    },
    title: {
        color: 'white',
        fontSize: 32,
        fontWeight: "bold",
        letterSpacing: 1.5
    },
    text: {
        fontSize: 18
    },

    footerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 10

    },
    footerText: {
        fontSize: 12,
        textAlign: 'center',
        alignItems: 'center'
    },
    footerLink: {
        color: colors.primary,
        fontWeight: "bold",
        textAlign: 'center',
        alignItems: 'center'
    },
    button: {
        backgroundColor: '#007bff',
        borderRadius: 5,
        padding: 10,
    },
    formColumn: {
        justifyContent: "flex-start",
        padding: 7
    },
    inputFormContainer: {
        flexDirection: "row",
        backgroundColor: "#ededed",
        opacity: 0.5,
        width: "90%",
        borderColor: "#ededed",
        borderWidth: 1,
        borderRadius: 8,
        height: 48,
        justifyContent: "space-between",
        alignItems: "center",
    },

    textInput: {
        flex: 1,
        color: 'grey',
        height: 48,
        paddingLeft: 10,
        paddingTop: 10,
        paddingBottom: 10,
    },
    passwordVisibility: {
        position: "absolute", right: 12, zIndex: 10
    },
    orderImage: {
        width: windowWidth * 0.9,
        height: 200,
        marginHorizontal: 10,
        borderRadius: 10,
    },
});

export default styles;
