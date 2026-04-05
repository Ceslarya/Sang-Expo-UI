import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// ĐÃ SỬA ĐƯỜNG DẪN IMPORT CHÍNH XÁC
import { resetAll } from '../../utils/stogare';

export default function SettingTab({ onLogout }) {

  const handleReset = async () => {
    Alert.alert(
      'Cảnh báo',
      'Bạn có chắc chắn muốn xóa toàn bộ dữ liệu không? Hành động này không thể hoàn tác.',
      [
        { text: 'Hủy', style: 'cancel' },
        { 
          text: 'Xóa ngay', 
          style: 'destructive',
          onPress: async () => {
            await resetAll();
            Alert.alert('Hoàn tất', 'Đã xóa toàn bộ dữ liệu cục bộ!');
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Quản lý tài khoản</Text>
        
        <TouchableOpacity style={styles.btnLogout} onPress={onLogout}>
          <Text style={styles.btnLogoutText}>Đăng xuất</Text>
        </TouchableOpacity>

        <View style={styles.divider} />
        
        <Text style={styles.sectionTitleDanger}>Vùng nguy hiểm</Text>
        <Text style={styles.descText}>Xóa toàn bộ dữ liệu hồ sơ và bài viết đã lưu trên máy.</Text>

        <TouchableOpacity style={styles.btnReset} onPress={handleReset}>
          <Text style={styles.btnResetText}>Xóa toàn bộ dữ liệu</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3F4F6', padding: 15 },
  card: {
    backgroundColor: '#FFFFFF', padding: 20, borderRadius: 16, marginTop: 10,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05, shadowRadius: 5, elevation: 3,
  },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#374151', marginBottom: 15 },
  sectionTitleDanger: { fontSize: 16, fontWeight: 'bold', color: '#DC2626', marginBottom: 10, marginTop: 10 },
  descText: { fontSize: 13, color: '#6B7280', marginBottom: 15 },
  divider: { height: 1, backgroundColor: '#E5E7EB', marginVertical: 20 },
  
  btnLogout: {
    backgroundColor: '#EEF2FF', padding: 15, borderRadius: 12, alignItems: 'center',
    borderWidth: 1, borderColor: '#C7D2FE'
  },
  btnLogoutText: { color: '#4F46E5', fontWeight: 'bold', fontSize: 15 },
  
  btnReset: {
    backgroundColor: '#FEF2F2', padding: 15, borderRadius: 12, alignItems: 'center',
    borderWidth: 1, borderColor: '#FECACA'
  },
  btnResetText: { color: '#DC2626', fontWeight: 'bold', fontSize: 15 }
});