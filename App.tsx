import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthStack from './navigation/AuthStack';
import AppStack from './navigation/AppStack';
import { AuthProvider } from './context/AuthContext';
import { UserProps } from './Types/types';
import { useState } from 'react';
import axios from 'axios';

const Stack = createNativeStackNavigator();

export default function App() {

  const [userCredentials, setUserCredentials] = useState<UserProps | null>(null);
  const [isLoadingCredentials, setIsLoadingCredentials] = useState<boolean>(false);

  const register = async (userName: string, email: string, password: string) => {
    setIsLoadingCredentials(true);
    const formData = new FormData();
      // formData.append('username', username);
      // formData.append('email', email);
      // formData.append('password', password);

      formData.append('username', 'TestUser2');
      formData.append('email', 'test2@user.com');
      formData.append('password', 'demopassword');

    try {
      if(userName=='' || userName === undefined) throw Error('undefined username');

      const response = await axios.post('https://ciaochow.plusnarrative.biz/api/auth/local/register', {
        username:  userName,
        email : email,
        password : password
    });
    
      const { jwt, user } = response.data;

      setUserCredentials({
        id: user.id,
        username: user.username,
        email: user.email,
        userToken: jwt
      });

    } catch (error: any) {
          if (error.response && error.response.data) {
            console.error('Registration failed #4335:', error.response.data);
        } else {
            console.error('Registration failed #423t24:', error.message);
        }
    }
    setIsLoadingCredentials(false);
  }

  const login = (email: string, password: string) => {
    setIsLoadingCredentials(true);
    const credentials: UserProps = {
      id: 2323,
      username: 'TestUser2',
      email: 'test2@gmail.com',
      userToken: null
    }
    setUserCredentials(credentials);
    setIsLoadingCredentials(false);
  }

  const logout = () => {
    setIsLoadingCredentials(true);
    setUserCredentials(null);
    setIsLoadingCredentials(false);
  }

  return (
    <AuthProvider
      userCredentials={userCredentials}
      login={login}
      register={register}
      logout={logout}
    >
      <NavigationContainer>
        {/* <AppStack/> */}
        <AuthStack />
      </NavigationContainer>
    </AuthProvider>
  );
}