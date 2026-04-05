import { useState } from 'react';
import {
  Alert, KeyboardAvoidingView, Platform,
  StyleSheet, Text, TextInput, TouchableOpacity, View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { loginUser } from '../utils/stogare';

export default function LoginScreen({ onLogin, goRegister, goForgot }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ email và mật khẩu.');
      return;
    }
    const account = await loginUser(email, password);
    if (account) {
      onLogin(); 
    } else {
      Alert.alert('Lỗi', 'Sai email hoặc mật khẩu, hoặc tài khoản chưa đăng ký!');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
        
        <View style={styles.branding}>
          <Text style={styles.logoText}>SOCIAL APP</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.title}>Chào mừng trở lại 👋</Text>
          <Text style={styles.subtitle}>Đăng nhập để tiếp tục khám phá</Text>

          <TextInput
            style={styles.input}
            placeholder="Email của bạn"
            placeholderTextColor="#A78BFA"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TextInput
            style={styles.input}
            placeholder="Mật khẩu"
            placeholderTextColor="#A78BFA"
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
  safeArea: { flex: 1, backgroundColor: '#8B5CF6' }, // Nền tím Violet đậm
  container: { flex: 1, justifyContent: 'center', paddingHorizontal: 20 },
  branding: { alignItems: 'center', marginBottom: 30 },
  logoText: { fontSize: 36, fontWeight: '900', color: '#FFFFFF', letterSpacing: 2, textShadowColor: 'rgba(0,0,0,0.2)', textShadowOffset: { width: 1, height: 2 }, textShadowRadius: 3 },
  card: { backgroundColor: '#FFFFFF', padding: 25, borderRadius: 24, shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.15, shadowRadius: 20, elevation: 10 },
  title: { fontSize: 26, fontWeight: 'bold', color: '#4C1D95', marginBottom: 8, textAlign: 'center' },
  subtitle: { fontSize: 15, color: '#7C3AED', marginBottom: 30, textAlign: 'center', fontWeight: '500' },
  input: { backgroundColor: '#F5F3FF', borderWidth: 1, borderColor: '#DDD6FE', padding: 16, borderRadius: 14, marginBottom: 16, fontSize: 16, color: '#4C1D95' },
  forgotWrapper: { alignSelf: 'flex-end', marginBottom: 25 },
  forgotText: { color: '#6D28D9', fontWeight: 'bold', fontSize: 14 },
  btnPrimary: { backgroundColor: '#7C3AED', padding: 18, borderRadius: 14, shadowColor: '#7C3AED', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.4, shadowRadius: 8, elevation: 5 },
  btnPrimaryText: { color: '#FFFFFF', textAlign: 'center', fontSize: 16, fontWeight: 'bold', letterSpacing: 1 },
  registerWrapper: { flexDirection: 'row', justifyContent: 'center', marginTop: 25 },
  textNormal: { color: '#6B7280', fontSize: 15 },
  linkText: { color: '#7C3AED', fontSize: 15, fontWeight: '900' }
});