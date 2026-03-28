import { useState } from 'react';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import LoginScreen from '../screens/LoginScreen';
import ProfileScreen from '../screens/ProfileScreen';
import RegisterScreen from '../screens/RegisterScreen';

export default function AppNavigator() {
  const [currentScreen, setCurrentScreen] = useState('login');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const profileData = {
    address: '123 Developer Avenue, Tech District',
    phone: '+1 234 567 8900',
    description: 'Passionate developer building mobile apps.'
  };

  return (
    <>
      {currentScreen === 'login' && (
        <LoginScreen
          email={email}
          password={password}
          setEmail={setEmail}
          setPassword={setPassword}
          onLogin={() => setCurrentScreen('profile')}
          goRegister={() => setCurrentScreen('register')}
          goForgot={() => setCurrentScreen('forgot')}
        />
      )}

      {currentScreen === 'register' && (
        <RegisterScreen
          name={name}
          email={email}
          password={password}
          setName={setName}
          setEmail={setEmail}
          setPassword={setPassword}
          onBack={() => setCurrentScreen('login')}
        />
      )}

      {currentScreen === 'profile' && (
        <ProfileScreen
          name={name}
          email={email}
          profileData={profileData}
          onLogout={() => setCurrentScreen('login')}
        />
      )}

      {currentScreen === 'forgot' && (
        <ForgotPasswordScreen
          onBack={() => setCurrentScreen('login')}
        />
      )}
    </>
  );
}