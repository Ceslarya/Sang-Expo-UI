import { useEffect, useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { getProfile, saveProfile } from '../../utils/stogare';

export default function ProfileTab({ name, email, profileData }) {
  const [profile, setProfile] = useState({
    id: null, name: name || '', email: email || '', address: profileData?.address || '', phone: profileData?.phone || '', description: profileData?.description || '', avatarUrl: '', occupation: ''
  });

  useEffect(() => { loadProfile(); }, []);

  const loadProfile = async () => {
    try {
      const data = await getProfile();
      if (data) setProfile({ ...profile, ...data });
    } catch (error) { console.error(error); }
  };

  const handleSave = async () => {
    try {
      await saveProfile(profile);
      Alert.alert('Thành công', 'Đã cập nhật hồ sơ thành công!');
    } catch (error) { Alert.alert('Lỗi', 'Không thể lưu dữ liệu hồ sơ.'); }
  };

  const defaultAvatar = 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png';

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false} bounces={false}>
      
      {/* Vùng Header Màu Cam Tràn Viền */}
      <View style={styles.headerCard}>
        <Image source={{ uri: profile.avatarUrl ? profile.avatarUrl : defaultAvatar }} style={styles.avatar} />
        <Text style={styles.profileName}>{profile.name || 'Thành viên mới'}</Text>
        <View style={styles.roleBadge}>
          <Text style={styles.profileRole}>{profile.occupation || 'Chưa cập nhật nghề nghiệp'}</Text>
        </View>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.sectionTitle}>Thông tin cá nhân 📝</Text>
        
        <Text style={styles.label}>Ảnh đại diện (Đường dẫn URL)</Text>
        <TextInput style={styles.input} value={profile.avatarUrl} placeholder="Nhập link ảnh của bạn..." placeholderTextColor="#FDBA74" onChangeText={t => setProfile({ ...profile, avatarUrl: t })} />

        <Text style={styles.label}>Nghề nghiệp</Text>
        <TextInput style={styles.input} value={profile.occupation} placeholder="VD: Sinh viên, Kỹ sư..." placeholderTextColor="#FDBA74" onChangeText={t => setProfile({ ...profile, occupation: t })} />
        
        <Text style={styles.label}>Họ và tên</Text>
        <TextInput style={styles.input} value={profile.name} placeholderTextColor="#FDBA74" onChangeText={t => setProfile({ ...profile, name: t })} />

        <Text style={styles.label}>Email</Text>
        <TextInput style={styles.input} value={profile.email} keyboardType="email-address" placeholderTextColor="#FDBA74" onChangeText={t => setProfile({ ...profile, email: t })} />

        <Text style={styles.label}>Địa chỉ</Text>
        <TextInput style={styles.input} value={profile.address} placeholderTextColor="#FDBA74" onChangeText={t => setProfile({ ...profile, address: t })} />

        <Text style={styles.label}>Số điện thoại</Text>
        <TextInput style={styles.input} value={profile.phone} keyboardType="phone-pad" placeholderTextColor="#FDBA74" onChangeText={t => setProfile({ ...profile, phone: t })} />

        <Text style={styles.label}>Giới thiệu bản thân</Text>
        <TextInput style={[styles.input, styles.textArea]} value={profile.description} multiline numberOfLines={4} placeholderTextColor="#FDBA74" onChangeText={t => setProfile({ ...profile, description: t })} />

        <TouchableOpacity style={styles.btnPrimary} onPress={handleSave}>
          <Text style={styles.btnPrimaryText}>LƯU THAY ĐỔI</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF7ED' }, // Nền cam nhạt
  headerCard: { backgroundColor: '#F97316', alignItems: 'center', paddingTop: 60, paddingBottom: 40, borderBottomLeftRadius: 40, borderBottomRightRadius: 40, shadowColor: '#EA580C', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.3, shadowRadius: 15, elevation: 10, marginBottom: 25 },
  avatar: { width: 110, height: 110, borderRadius: 55, marginBottom: 15, borderWidth: 4, borderColor: '#FFFFFF', backgroundColor: '#FFF' },
  profileName: { fontSize: 26, fontWeight: '900', color: '#FFFFFF', textShadowColor: 'rgba(0,0,0,0.1)', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 2 },
  roleBadge: { backgroundColor: '#FFFFFF', paddingHorizontal: 15, paddingVertical: 6, borderRadius: 20, marginTop: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 3 },
  profileRole: { fontSize: 14, color: '#EA580C', fontWeight: 'bold' },
  
  infoCard: { backgroundColor: '#FFFFFF', padding: 25, marginHorizontal: 15, borderRadius: 24, marginBottom: 40, shadowColor: '#000', shadowOffset: { width: 0, height: 5 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 5 },
  sectionTitle: { fontSize: 20, fontWeight: '900', color: '#9A3412', marginBottom: 25, borderBottomWidth: 2, borderBottomColor: '#FFEDD5', paddingBottom: 10 },
  label: { fontSize: 13, fontWeight: 'bold', color: '#EA580C', marginBottom: 8, marginLeft: 2, textTransform: 'uppercase' },
  input: { backgroundColor: '#FFEDD5', borderWidth: 1, borderColor: '#FDBA74', padding: 15, borderRadius: 14, marginBottom: 20, fontSize: 16, color: '#9A3412', fontWeight: '500' },
  textArea: { height: 100, textAlignVertical: 'top' },
  btnPrimary: { backgroundColor: '#EA580C', padding: 18, borderRadius: 16, marginTop: 15, shadowColor: '#EA580C', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 5 },
  btnPrimaryText: { color: '#FFFFFF', textAlign: 'center', fontSize: 16, fontWeight: '900', letterSpacing: 1 }
});