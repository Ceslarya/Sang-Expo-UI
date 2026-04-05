import { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
// Thêm chữ /app/ vào trước các đường dẫn
import AppNavigator from './app/navigation/AppNavigator';
import { initDB } from './app/utils/stogare';

export default function App() {
  useEffect(() => {
    initDB();
  }, []);

  return (
    <SafeAreaProvider>
      <AppNavigator />
    </SafeAreaProvider>
  );
}