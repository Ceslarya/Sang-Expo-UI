import { useState } from 'react';
import {
    Alert, KeyboardAvoidingView, Platform, ScrollView,
    StyleSheet, Text, TextInput, TouchableOpacity, View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { saveAccount } from '../utils/stogare';

export default function RegisterScreen({
  name, email, password,
  setName, setEmail, setPassword,
  onBack
}) {
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Lỗi', 'Vui lòng điền đầy đủ thông tin');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Lỗi', 'Mật khẩu không khớp');
      return;
    }

    // Lưu thông tin tài khoản vào Storage
    await saveAccount({ name, email, password });

    Alert.alert('Thành công', 'Đăng ký tài khoản thành công! Bạn có thể đăng nhập ngay.', [
      { text: 'OK', onPress: onBack }
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
          <View style={styles.card}>
            <Text style={styles.title}>Tạo tài khoản mới</Text>
            <Text style={styles.subtitle}>Điền thông tin để bắt đầu</Text>

            <TextInput style={styles.input} placeholder="Họ và tên" placeholderTextColor="#9CA3AF" value={name} onChangeText={setName} />
            <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#9CA3AF" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
            <TextInput style={styles.input} placeholder="Mật khẩu" placeholderTextColor="#9CA3AF" value={password} onChangeText={setPassword} secureTextEntry />
            <TextInput style={styles.input} placeholder="Xác nhận mật khẩu" placeholderTextColor="#9CA3AF" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry />

            <TouchableOpacity style={styles.btnPrimary} onPress={handleRegister}>
              <Text style={styles.btnPrimaryText}>ĐĂNG KÝ</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={onBack} style={styles.backBtn}>
              <Text style={styles.linkText}>Quay lại Đăng nhập</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F3F4F6' },
  container: { flexGrow: 1, justifyContent: 'center', padding: 20 },
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
  btnPrimary: {
    backgroundColor: '#6366F1', padding: 16, borderRadius: 12, marginTop: 10,
    shadowColor: '#6366F1', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3, shadowRadius: 8, elevation: 4,
  },
  btnPrimaryText: { color: '#FFFFFF', textAlign: 'center', fontSize: 16, fontWeight: 'bold' },
  backBtn: { marginTop: 25, alignItems: 'center' },
  linkText: { color: '#6366F1', fontSize: 15, fontWeight: 'bold' }
});