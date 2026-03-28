import {
    Alert, KeyboardAvoidingView, Platform,
    StyleSheet, Text, TextInput, TouchableOpacity, View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getAccount } from '../utils/stogare';

export default function LoginScreen({
  email, password, setEmail, setPassword,
  onLogin, goRegister, goForgot
}) {
  
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ email và mật khẩu.');
      return;
    }

    // Lấy tài khoản từ Storage
    const account = await getAccount();

    if (!account) {
      Alert.alert('Lỗi', 'Tài khoản không tồn tại. Vui lòng đăng ký trước!');
      return;
    }

    // So khớp thông tin đăng nhập
    if (email.toLowerCase() === account.email.toLowerCase() && password === account.password) {
      onLogin(); 
    } else {
      Alert.alert('Lỗi', 'Sai email hoặc mật khẩu!');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={styles.card}>
          <Text style={styles.title}>Chào mừng trở lại 👋</Text>
          <Text style={styles.subtitle}>Đăng nhập để tiếp tục</Text>

          <TextInput
            style={styles.input}
            placeholder="Email của bạn"
            placeholderTextColor="#9CA3AF"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TextInput
            style={styles.input}
            placeholder="Mật khẩu"
            placeholderTextColor="#9CA3AF"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TouchableOpacity onPress={goForgot} style={styles.forgotWrapper}>
            <Text style={styles.forgotText}>Quên mật khẩu?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnPrimary} onPress={handleLogin}>
            <Text style={styles.btnPrimaryText}>ĐĂNG NHẬP</Text>
          </TouchableOpacity>

          <View style={styles.registerWrapper}>
            <Text style={styles.textNormal}>Chưa có tài khoản? </Text>
            <TouchableOpacity onPress={goRegister}>
              <Text style={styles.linkText}>Đăng ký ngay</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F3F4F6' },
  container: { flex: 1, justifyContent: 'center', paddingHorizontal: 20 },
  card: {
    backgroundColor: '#FFFFFF', padding: 25, borderRadius: 20,
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1, shadowRadius: 10, elevation: 5,
  },
  title: { fontSize: 26, fontWeight: 'bold', color: '#1F2937', marginBottom: 8, textAlign: 'center' },
  subtitle: { fontSize: 15, color: '#6B7280', marginBottom: 30, textAlign: 'center' },
  input: {
    backgroundColor: '#F9FAFB', borderWidth: 1, borderColor: '#E5E7EB',
    padding: 15, borderRadius: 12, marginBottom: 15, fontSize: 16, color: '#1F2937'
  },
  forgotWrapper: { alignSelf: 'flex-end', marginBottom: 25 },
  forgotText: { color: '#6366F1', fontWeight: '600' },
  btnPrimary: {
    backgroundColor: '#6366F1', padding: 16, borderRadius: 12,
    shadowColor: '#6366F1', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3, shadowRadius: 8, elevation: 4,
  },
  btnPrimaryText: { color: '#FFFFFF', textAlign: 'center', fontSize: 16, fontWeight: 'bold' },
  registerWrapper: { flexDirection: 'row', justifyContent: 'center', marginTop: 25 },
  textNormal: { color: '#6B7280', fontSize: 15 },
  linkText: { color: '#6366F1', fontSize: 15, fontWeight: 'bold' }
});