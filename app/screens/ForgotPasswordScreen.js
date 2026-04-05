import { useState } from 'react';
import {
  Alert, StyleSheet, Text, TextInput, TouchableOpacity, View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ForgotPasswordScreen({ onBack }) {
  const [email, setEmail] = useState('');

  const handleReset = () => {
    if (!email) {
      Alert.alert('Lỗi', 'Vui lòng nhập email của bạn');
      return;
    }

    Alert.alert(
      'Thành công',
      'Đường dẫn đặt lại mật khẩu đã được gửi!',
      [{ text: 'OK', onPress: onBack }]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>Quên mật khẩu?</Text>
          <Text style={styles.subtitle}>
            Nhập email của bạn để nhận liên kết khôi phục mật khẩu.
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Email đã đăng ký"
            placeholderTextColor="#9CA3AF"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TouchableOpacity style={styles.btnPrimary} onPress={handleReset}>
            <Text style={styles.btnPrimaryText}>GỬI YÊU CẦU</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onBack} style={styles.backBtn}>
            <Text style={styles.linkText}>Quay lại Đăng nhập</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F3F4F6' },
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  card: {
    backgroundColor: '#FFFFFF', padding: 25, borderRadius: 20,
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1, shadowRadius: 10, elevation: 5,
  },
  title: { fontSize: 24, fontWeight: 'bold', color: '#1F2937', marginBottom: 10, textAlign: 'center' },
  subtitle: { fontSize: 15, color: '#6B7280', marginBottom: 30, textAlign: 'center', lineHeight: 22 },
  input: {
    backgroundColor: '#F9FAFB', borderWidth: 1, borderColor: '#E5E7EB',
    padding: 15, borderRadius: 12, marginBottom: 25, fontSize: 16, color: '#1F2937'
  },
  btnPrimary: {
    backgroundColor: '#6366F1', padding: 16, borderRadius: 12,
    shadowColor: '#6366F1', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3, shadowRadius: 8, elevation: 4,
  },
  btnPrimaryText: { color: '#FFFFFF', textAlign: 'center', fontSize: 16, fontWeight: 'bold' },
  backBtn: { marginTop: 25, alignItems: 'center' },
  linkText: { color: '#6366F1', fontSize: 15, fontWeight: 'bold' }
});