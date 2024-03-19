
import { AuthProvider } from './context/AuthContext';
import { TUserProps } from './Types/types';
import { useState } from 'react';
import axios from 'axios';
import { ToastAndroid } from 'react-native';
import NavStack from './navigation/NavStack';


export default function App() {

  const [userCredentials, setUserCredentials] = useState<TUserProps | null>(null);
  const [isLoadingCredentials, setIsLoadingCredentials] = useState<boolean>(false);

  const register = async (userName: string, email: string, password: string) => {
    setIsLoadingCredentials(true);
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
      ToastAndroid.showWithGravity('Request sent successfully!', 50, 10);
      

    } catch (error: any) {
          if (error.response && error.response.data) {
            console.error('#4335:', error.response.data);
            ToastAndroid.show('#4232456' + error.response.data, ToastAndroid.LONG);
            
        } else {
            console.error('#1512199001', error.message);
            ToastAndroid.show('#1512199001' + error.message, ToastAndroid.LONG);
        }
    }
    setIsLoadingCredentials(false);
  }

  const login = async (email: string, password: string) => {
    setIsLoadingCredentials(true);

    try {
      if(email=='' || password === undefined) throw Error('Fill in missing values');
      const response = await axios.post('https://ciaochow.plusnarrative.biz/api/auth/local', {
        identifier : email,
        password : password
    });
    
      const { jwt, user } = response.data;
      
      setUserCredentials({
        id: user.id,
        username: user.username,
        email: user.email,
        userToken: jwt
      });
      ToastAndroid.showWithGravity('Login Successful', 50, 10);
      

    } catch (error: any) {
          if (error.response && error.response.data) {
            //console.error('#4335:', error.response.data);
            ToastAndroid.show('#433 :' + error.response.data.error.message, ToastAndroid.LONG);
            
        } else {
            console.error('#15121 ', error.message);
            ToastAndroid.show('#15121 : ' + error.message, ToastAndroid.LONG);
        }
    }
      ///---
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
      <NavStack/>
    </AuthProvider>
  );
}