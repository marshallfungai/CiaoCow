
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './../screens/SplashScreen';
import RegisterScreen from './../screens/RegisterScreen';
import LoginScreen from './../screens/LoginScreen';

const Stack = createNativeStackNavigator();

export default function AuthStack() {
    return (
        <Stack.Navigator initialRouteName='Splash' >
            <Stack.Screen options={{ headerShown: false }} name='Splash' component={SplashScreen}></Stack.Screen>
            <Stack.Screen options={{ headerShown: false }} name='Register' component={RegisterScreen}></Stack.Screen>
            <Stack.Screen options={{ headerShown: false }} name='Login' component={LoginScreen}></Stack.Screen>
        </Stack.Navigator>
    );
}