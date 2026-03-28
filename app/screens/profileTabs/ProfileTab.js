import { useEffect, useState } from 'react';
import {
  Alert, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View
} from 'react-native';

import { getProfile, saveProfile } from '../../utils/stogare';

export default function ProfileTab({ name, email, profileData }) {
  const [profile, setProfile] = useState({
    name: name || '',
    email: email || '',
    address: profileData?.address || '',
    phone: profileData?.phone || '',
    description: profileData?.description || '',
    avatarUrl: '', // Khởi tạo trường ảnh đại diện
    occupation: '' // Khởi tạo trường nghề nghiệp
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const data = await getProfile();
      if (data) setProfile({ ...profile, ...data });
    } catch (error) {
      console.error("Lỗi khi tải profile:", error);
    }
  };

  const handleSave = async () => {
    try {
      await saveProfile(profile);
      Alert.alert('Thành công', 'Đã cập nhật hồ sơ thành công!');
    } catch (error) {
      console.error("Lỗi khi lưu profile:", error);
      Alert.alert('Lỗi', 'Không thể lưu dữ liệu hồ sơ.');
    }
  };

  // URL ảnh mặc định nếu người dùng chưa nhập
  const defaultAvatar = 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png';

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Vùng Header Hồ Sơ */}
      <View style={styles.headerCard}>
        <Image
          source={{ uri: profile.avatarUrl ? profile.avatarUrl : defaultAvatar }}
          style={styles.avatar}
        />
        <Text style={styles.profileName}>{profile.name || 'Người dùng'}</Text>
        <Text style={styles.profileRole}>{profile.occupation || 'Chưa cập nhật nghề nghiệp'}</Text>
      </View>

      {/* Vùng Form Thông Tin */}
      <View style={styles.infoCard}>
        <Text style={styles.sectionTitle}>Thông tin cá nhân</Text>
        
        <Text style={styles.label}>Ảnh đại diện (Đường dẫn URL)</Text>
        <TextInput style={styles.input} value={profile.avatarUrl} placeholder="Nhập link ảnh của bạn..."
          onChangeText={t => setProfile({ ...profile, avatarUrl: t })} />

        <Text style={styles.label}>Nghề nghiệp</Text>
        <TextInput style={styles.input} value={profile.occupation} placeholder="VD: Sinh viên, Kỹ sư..."
          onChangeText={t => setProfile({ ...profile, occupation: t })} />
        
        <Text style={styles.label}>Họ và tên</Text>
        <TextInput style={styles.input} value={profile.name}
          onChangeText={t => setProfile({ ...profile, name: t })} />

        <Text style={styles.label}>Email</Text>
        <TextInput style={styles.input} value={profile.email} keyboardType="email-address"
          onChangeText={t => setProfile({ ...profile, email: t })} />

        <Text style={styles.label}>Địa chỉ</Text>
        <TextInput style={styles.input} value={profile.address}
          onChangeText={t => setProfile({ ...profile, address: t })} />

        <Text style={styles.label}>Số điện thoại</Text>
        <TextInput style={styles.input} value={profile.phone} keyboardType="phone-pad"
          onChangeText={t => setProfile({ ...profile, phone: t })} />

        <Text style={styles.label}>Giới thiệu bản thân</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={profile.description}
          multiline
          numberOfLines={4}
          onChangeText={t => setProfile({ ...profile, description: t })}
        />

        <TouchableOpacity style={styles.btnPrimary} onPress={handleSave}>
          <Text style={styles.btnPrimaryText}>LƯU THAY ĐỔI</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3F4F6' },
  headerCard: {
    backgroundColor: '#FFFFFF', alignItems: 'center', paddingVertical: 30,
    borderBottomLeftRadius: 30, borderBottomRightRadius: 30,
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05, shadowRadius: 10, elevation: 4,
    marginBottom: 20
  },
  avatar: { width: 100, height: 100, borderRadius: 50, marginBottom: 15, borderWidth: 3, borderColor: '#EEF2FF' },
  profileName: { fontSize: 24, fontWeight: 'bold', color: '#1F2937' },
  profileRole: { fontSize: 14, color: '#6366F1', fontWeight: '600', marginTop: 5 },
  infoCard: {
    backgroundColor: '#FFFFFF', padding: 20, marginHorizontal: 15, borderRadius: 16, marginBottom: 30,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05, shadowRadius: 5, elevation: 3,
  },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#374151', marginBottom: 20 },
  label: { fontSize: 13, fontWeight: '600', color: '#6B7280', marginBottom: 6, marginLeft: 2 },
  input: {
    backgroundColor: '#F9FAFB', borderWidth: 1, borderColor: '#E5E7EB',
    padding: 12, borderRadius: 10, marginBottom: 16, fontSize: 15, color: '#1F2937'
  },
  textArea: { height: 100, textAlignVertical: 'top' },
  btnPrimary: {
    backgroundColor: '#6366F1', padding: 16, borderRadius: 12, marginTop: 10,
    shadowColor: '#6366F1', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3, shadowRadius: 8, elevation: 4,
  },
  btnPrimaryText: { color: '#FFFFFF', textAlign: 'center', fontSize: 16, fontWeight: 'bold' }
});