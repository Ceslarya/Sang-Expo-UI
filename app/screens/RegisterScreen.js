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
      Alert.alert('Cảnh báo', 'Vui lòng nhập đầy đủ các trường.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Lỗi', 'Hai mật khẩu không khớp nhau.');
      return;
    }
    await saveAccount({ name, email, password });
    Alert.alert('Hoàn tất', 'Tạo tài khoản thành công!', [{ text: 'Đăng nhập ngay', onPress: onBack }]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
          <View style={styles.formBox}>
            <Text style={styles.headerText}>Đăng Ký Thành Viên</Text>
            
            <TextInput style={styles.inputStyle} placeholder="Họ và tên của bạn" placeholderTextColor="#A1A1AA" value={name} onChangeText={setName} />
            <TextInput style={styles.inputStyle} placeholder="Địa chỉ Email" placeholderTextColor="#A1A1AA" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
            <TextInput style={styles.inputStyle} placeholder="Mật khẩu" placeholderTextColor="#A1A1AA" value={password} onChangeText={setPassword} secureTextEntry />
            <TextInput style={styles.inputStyle} placeholder="Nhập lại Mật khẩu" placeholderTextColor="#A1A1AA" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry />

            <TouchableOpacity style={styles.btnAction} onPress={handleRegister}>
              <Text style={styles.btnText}>HOÀN TẤT ĐĂNG KÝ</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={onBack} style={styles.centerAlign}>
              <Text style={styles.textLinkBold}>Trở về trang Đăng Nhập</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F0FDF4' },
  container: { flexGrow: 1, justifyContent: 'center', padding: 25 },
  formBox: { backgroundColor: '#FFFFFF', padding: 25, borderRadius: 24, elevation: 2, shadowColor: '#047857', shadowOpacity: 0.1, shadowRadius: 15 },
  headerText: { fontSize: 24, fontWeight: '800', color: '#047857', textAlign: 'center', marginBottom: 30 },
  inputStyle: { backgroundColor: '#F8FAFC', borderWidth: 1, borderColor: '#E2E8F0', padding: 16, borderRadius: 30, marginBottom: 16, fontSize: 15, color: '#0F172A' },
  btnAction: { backgroundColor: '#10B981', padding: 18, borderRadius: 30, alignItems: 'center', marginTop: 10 },
  btnText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
  centerAlign: { marginTop: 25, alignItems: 'center' },
  textLinkBold: { color: '#059669', fontSize: 15, fontWeight: 'bold' }
});