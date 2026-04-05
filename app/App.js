import { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './navigation/AppNavigator';

// Đường dẫn đúng dựa theo cấu trúc thư mục của bạn
import { initDB } from './utils/stogare';

export default function App() {
  useEffect(() => {
    // Khởi tạo SQLite Database ngay khi mở App
    initDB();
  }, []);

  return (
    <SafeAreaProvider>
      <AppNavigator />
    </SafeAreaProvider>
  );
}