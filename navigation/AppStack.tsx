
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OrderScreen from '../screens/OrderScreen';

const Stack = createNativeStackNavigator();

export default function AppStack() {
    return (
        <Stack.Navigator >
            <Stack.Screen options={{ headerShown: false }} name='Order' component={OrderScreen}></Stack.Screen>
        </Stack.Navigator>
    );
}