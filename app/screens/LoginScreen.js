import {
  Alert, KeyboardAvoidingView, Platform,
  StyleSheet, Text, TextInput, TouchableOpacity, View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { loginUser } from '../utils/stogare';

export default function LoginScreen({
  email, password, setEmail, setPassword,
  onLogin, goRegister, goForgot
}) {
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Thông báo', 'Vui lòng điền đủ thông tin đăng nhập.');
      return;
    }
    
    // Gọi thẳng vào DB để tìm user
    const account = await loginUser(email, password);
    
    if (account) {
      onLogin(); 
    } else {
      Alert.alert('Lỗi', 'Email hoặc mật khẩu không chính xác, hoặc chưa đăng ký!');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
        <View style={styles.headerBox}>
          <Text style={styles.appTitle}>SocialApp</Text>
          <Text style={styles.subTitle}>Đăng nhập để kết nối</Text>
        </View>

        <View style={styles.formBox}>
          <TextInput
            style={styles.inputStyle}
            placeholder="Nhập địa chỉ Email"
            placeholderTextColor="#A1A1AA"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.inputStyle}
            placeholder="Nhập Mật khẩu"
            placeholderTextColor="#A1A1AA"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TouchableOpacity onPress={goForgot} style={styles.rightAlign}>
            <Text style={styles.textLink}>Quên mật khẩu?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnAction} onPress={handleLogin}>
            <Text style={styles.btnText}>ĐĂNG NHẬP</Text>
          </TouchableOpacity>

          <View style={styles.footerRow}>
            <Text style={styles.textGray}>Bạn chưa là thành viên? </Text>
            <TouchableOpacity onPress={goRegister}>
              <Text style={styles.textLinkBold}>Đăng ký ngay</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F0FDF4' },
  container: { flex: 1, justifyContent: 'center', padding: 25 },
  headerBox: { alignItems: 'center', marginBottom: 40 },
  appTitle: { fontSize: 32, fontWeight: '900', color: '#047857', letterSpacing: 1 },
  subTitle: { fontSize: 16, color: '#10B981', marginTop: 5 },
  formBox: { backgroundColor: '#FFFFFF', padding: 25, borderRadius: 24, elevation: 2, shadowColor: '#047857', shadowOpacity: 0.1, shadowRadius: 15 },
  inputStyle: { backgroundColor: '#F8FAFC', borderWidth: 1, borderColor: '#E2E8F0', padding: 16, borderRadius: 30, marginBottom: 16, fontSize: 15, color: '#0F172A' },
  rightAlign: { alignSelf: 'flex-end', marginBottom: 20 },
  textLink: { color: '#059669', fontSize: 14 },
  btnAction: { backgroundColor: '#10B981', padding: 18, borderRadius: 30, alignItems: 'center' },
  btnText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold', letterSpacing: 0.5 },
  footerRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 25 },
  textGray: { color: '#64748B', fontSize: 14 },
  textLinkBold: { color: '#059669', fontSize: 14, fontWeight: 'bold' }
});