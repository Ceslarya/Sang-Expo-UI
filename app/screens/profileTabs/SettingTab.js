import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { resetAll } from '../../utils/stogare';

export default function SettingTab({ onLogout }) {
  const handleReset = async () => {
    Alert.alert(
      'Cảnh báo NGHIÊM TRỌNG',
      'Bạn có chắc chắn muốn xóa toàn bộ dữ liệu không? Hành động này không thể hoàn tác.',
      [
        { text: 'Hủy', style: 'cancel' },
        { 
          text: 'Xóa ngay', style: 'destructive',
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
        
        <View style={styles.headerBadge}>
          <Text style={styles.sectionTitle}>Cấu hình Hệ thống ⚙️</Text>
        </View>

        <View style={styles.settingGroup}>
          <Text style={styles.groupLabel}>Tài khoản hiện tại</Text>
          <TouchableOpacity style={styles.btnLogout} onPress={onLogout}>
            <Text style={styles.btnLogoutText}>ĐĂNG XUẤT</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.divider} />
        
        <View style={styles.settingGroup}>
          <Text style={styles.sectionTitleDanger}>Khu vực nguy hiểm ⚠️</Text>
          <Text style={styles.descText}>Nhấn nút bên dưới sẽ xóa toàn bộ hồ sơ, bài viết và bình luận đã được lưu trữ trong máy của bạn.</Text>
          <TouchableOpacity style={styles.btnReset} onPress={handleReset}>
            <Text style={styles.btnResetText}>XÓA SẠCH DỮ LIỆU</Text>
          </TouchableOpacity>
        </View>
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#EFF6FF', padding: 15 }, // Nền xanh dương nhạt
  card: { backgroundColor: '#FFFFFF', padding: 20, borderRadius: 24, marginTop: 20, shadowColor: '#1D4ED8', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 10, elevation: 5 },
  headerBadge: { backgroundColor: '#DBEAFE', padding: 15, borderRadius: 16, marginBottom: 25, alignItems: 'center' },
  sectionTitle: { fontSize: 18, fontWeight: '900', color: '#1E3A8A' },
  
  settingGroup: { marginBottom: 10 },
  groupLabel: { fontSize: 14, fontWeight: 'bold', color: '#64748B', marginBottom: 15, textTransform: 'uppercase' },
  
  sectionTitleDanger: { fontSize: 18, fontWeight: '900', color: '#991B1B', marginBottom: 10 },
  descText: { fontSize: 14, color: '#7F1D1D', marginBottom: 20, lineHeight: 22, backgroundColor: '#FEF2F2', padding: 15, borderRadius: 12, borderWidth: 1, borderColor: '#FECACA' },
  divider: { height: 2, backgroundColor: '#E0E7FF', marginVertical: 25, borderRadius: 2 },
  
  btnLogout: { backgroundColor: '#3B82F6', padding: 18, borderRadius: 16, alignItems: 'center', shadowColor: '#3B82F6', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 5 },
  btnLogoutText: { color: '#FFFFFF', fontWeight: '900', fontSize: 15, letterSpacing: 1 },
  
  btnReset: { backgroundColor: '#EF4444', padding: 18, borderRadius: 16, alignItems: 'center', shadowColor: '#EF4444', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 5 },
  btnResetText: { color: '#FFFFFF', fontWeight: '900', fontSize: 15, letterSpacing: 1 }
});