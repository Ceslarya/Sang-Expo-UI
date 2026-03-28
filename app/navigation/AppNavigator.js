import { useState } from 'react';
import ChangePassword from '../screens/ChangePassword';
import LoginScreen from '../screens/LoginScreen';
import ProfileScreen from '../screens/ProfileScreen';
import RegisterScreen from '../screens/RegisterScreen';

export default function AppNavigator() {
  const [currentScreen, setCurrentScreen] = useState('login');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  // DỮ LIỆU MẶC ĐỊNH ĐÃ ĐƯỢC THAY ĐỔI HOÀN TOÀN
  const profileData = {
    address: 'Khu công nghệ cao, Quận 9, TP.HCM',
    phone: '0901 234 567',
    description: 'Xin chào! Mình là một lập trình viên yêu thích thiết kế UI/UX và phát triển ứng dụng di động.'
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
        <ChangePassword
          onBack={() => setCurrentScreen('login')}
        />
      )}
    </>
  );
}