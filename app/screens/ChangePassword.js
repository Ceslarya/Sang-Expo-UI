import { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ChangePassword({ onBack }) {
  const [email, setEmail] = useState('');

  const handleReset = () => {
    if (!email) {
      Alert.alert('Thiếu thông tin', 'Vui lòng cung cấp email!');
      return;
    }
    Alert.alert('Gửi thành công', 'Kiểm tra hộp thư của bạn để lấy link đổi mật khẩu.', [{ text: 'Đồng ý', onPress: onBack }]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.formBox}>
          <Text style={styles.headerText}>Khôi phục tài khoản</Text>
          <Text style={styles.descText}>Nhập email bạn đã đăng ký, hệ thống sẽ gửi mã xác nhận cho bạn.</Text>

          <TextInput style={styles.inputStyle} placeholder="Email của bạn" placeholderTextColor="#A1A1AA" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />

          <TouchableOpacity style={styles.btnAction} onPress={handleReset}>
            <Text style={styles.btnText}>XÁC NHẬN TÌM KIẾM</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onBack} style={styles.centerAlign}>
            <Text style={styles.textLinkBold}>Hủy & Quay lại</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F0FDF4' },
  container: { flex: 1, justifyContent: 'center', padding: 25 },
  formBox: { backgroundColor: '#FFFFFF', padding: 25, borderRadius: 24, elevation: 2, shadowColor: '#047857', shadowOpacity: 0.1, shadowRadius: 15 },
  headerText: { fontSize: 24, fontWeight: '800', color: '#047857', textAlign: 'center', marginBottom: 10 },
  descText: { fontSize: 14, color: '#64748B', textAlign: 'center', marginBottom: 25, lineHeight: 20 },
  inputStyle: { backgroundColor: '#F8FAFC', borderWidth: 1, borderColor: '#E2E8F0', padding: 16, borderRadius: 30, marginBottom: 25, fontSize: 15, color: '#0F172A' },
  btnAction: { backgroundColor: '#10B981', padding: 18, borderRadius: 30, alignItems: 'center' },
  btnText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
  centerAlign: { marginTop: 25, alignItems: 'center' },
  textLinkBold: { color: '#059669', fontSize: 15, fontWeight: 'bold' }
});