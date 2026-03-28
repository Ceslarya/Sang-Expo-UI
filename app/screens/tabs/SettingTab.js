import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { resetAll } from '../../utils/stogare';

export default function SettingTab({ onLogout }) {
  const handleReset = async () => {
    Alert.alert(
      'Xác nhận xoá dữ liệu',
      'Bạn có chắc muốn xoá toàn bộ dữ liệu ứng dụng? Bao gồm bài đăng, bình luận và hồ sơ cá nhân.',
      [
        { text: 'Hủy bỏ', style: 'cancel' },
        { 
          text: 'Đồng ý xoá', 
          style: 'destructive',
          onPress: async () => {
            await resetAll();
            Alert.alert('Hoàn tất', 'Dữ liệu thiết bị đã được làm sạch!');
          }
        }
      ]
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      
      <View style={styles.headerArea}>
        <Text style={styles.headerTitle}>Cài đặt</Text>
      </View>

      {/* NHÓM TÀI KHOẢN */}
      <Text style={styles.groupLabel}>TÀI KHOẢN</Text>
      <View style={styles.listGroup}>
        <TouchableOpacity style={styles.listItem} onPress={onLogout}>
          <View style={styles.itemLeft}>
            <Text style={styles.itemIcon}>🚪</Text>
            <Text style={styles.itemText}>Đăng xuất khỏi hệ thống</Text>
          </View>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>
      </View>

      {/* NHÓM HỆ THỐNG & DỮ LIỆU */}
      <Text style={styles.groupLabel}>HỆ THỐNG & DỮ LIỆU</Text>
      <View style={styles.listGroup}>
        <View style={styles.listItem}>
          <View style={styles.itemLeft}>
            <Text style={styles.itemIcon}>🔔</Text>
            <Text style={styles.itemText}>Thông báo (Đang phát triển)</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <TouchableOpacity style={styles.listItem} onPress={handleReset}>
          <View style={styles.itemLeft}>
            <Text style={styles.itemIcon}>⚠️</Text>
            <Text style={styles.itemTextDanger}>Xoá tất cả dữ liệu cục bộ</Text>
          </View>
          <Text style={styles.arrowDanger}>›</Text>
        </TouchableOpacity>
      </View>

      {/* NHÓM THÔNG TIN */}
      <Text style={styles.groupLabel}>THÔNG TIN ỨNG DỤNG</Text>
      <View style={styles.listGroup}>
        <View style={styles.listItem}>
          <Text style={styles.itemText}>Phiên bản</Text>
          <Text style={styles.itemValue}>v1.0.0 (Build 24)</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.listItem}>
          <Text style={styles.itemText}>Điều khoản dịch vụ</Text>
          <Text style={styles.arrow}>›</Text>
        </View>
      </View>

      <Text style={styles.footerText}>© 2026 Mobile Project</Text>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F1F5F9' },
  headerArea: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 10 },
  headerTitle: { fontSize: 32, fontWeight: 'bold', color: '#0F172A' },
  
  groupLabel: { fontSize: 13, fontWeight: 'bold', color: '#64748B', marginLeft: 20, marginTop: 25, marginBottom: 8 },
  
  listGroup: { backgroundColor: '#FFFFFF', marginHorizontal: 15, borderRadius: 12, overflow: 'hidden' },
  listItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 16, paddingHorizontal: 15 },
  itemLeft: { flexDirection: 'row', alignItems: 'center' },
  itemIcon: { fontSize: 18, marginRight: 12 },
  
  itemText: { fontSize: 16, color: '#1E293B', fontWeight: '500' },
  itemTextDanger: { fontSize: 16, color: '#E11D48', fontWeight: '600' },
  itemValue: { fontSize: 16, color: '#94A3B8' },
  
  arrow: { fontSize: 20, color: '#CBD5E1', marginBottom: 2 },
  arrowDanger: { fontSize: 20, color: '#FDA4AF', marginBottom: 2 },
  
  divider: { height: 1, backgroundColor: '#F1F5F9', marginLeft: 45 },
  
  footerText: { textAlign: 'center', color: '#94A3B8', fontSize: 12, marginTop: 40, marginBottom: 30 }
});