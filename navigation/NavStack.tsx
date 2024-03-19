
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthStack from './AuthStack';
import AppStack from './AppStack';
import { useAuth } from '../context/AuthContext';
import { TAuthProviderProps } from '../Types/types';


export default function NavStack() {

    const {userCredentials} = useAuth<TAuthProviderProps>(); 
    

    return (
        <NavigationContainer>
            {userCredentials?.userToken != null ? <AppStack />: <AuthStack />}
        </NavigationContainer>
    );
}