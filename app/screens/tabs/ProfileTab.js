import { useEffect, useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { getProfile, saveProfile } from '../../utils/stogare';

export default function ProfileTab({ name, email, profileData }) {
  const [profile, setProfile] = useState({
    id: null,
    name: name || '', 
    email: email || '', 
    address: profileData?.address || '', 
    phone: profileData?.phone || '', 
    description: profileData?.description || '', 
    avatarUrl: '', 
    occupation: ''
  });

  useEffect(() => { loadProfile(); }, []);

  const loadProfile = async () => {
    try {
      const data = await getProfile();
      if (data) setProfile(data);
    } catch (e) { console.error(e); }
  };

  const handleSave = async () => {
    try {
      await saveProfile(profile);
      Alert.alert('Hoàn tất', 'Hồ sơ của bạn đã được cập nhật thành công.');
    } catch (e) { Alert.alert('Lỗi', 'Không thể lưu dữ liệu lúc này.'); }
  };

  const defaultAvatar = 'https://cdn-icons-png.flaticon.com/512/4140/4140048.png';
  const coverPhoto = 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=1000&auto=format&fit=crop';

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      
      <View style={styles.coverContainer}>
        <Image source={{ uri: coverPhoto }} style={styles.coverImage} />
        <View style={styles.avatarRow}>
          <Image source={{ uri: profile.avatarUrl ? profile.avatarUrl : defaultAvatar }} style={styles.avatarImage} />
          <View style={styles.titleInfo}>
            <Text style={styles.displayName}>{profile.name || 'Thành viên mới'}</Text>
            <Text style={styles.displayJob}>{profile.occupation || 'Chưa cập nhật công việc'}</Text>
          </View>
        </View>
      </View>

      <View style={styles.formWrapper}>
        
        <View style={styles.sectionCard}>
          <Text style={styles.sectionHeader}>Tài khoản & Hình ảnh</Text>
          
          <Text style={styles.inputLabel}>Đường dẫn Ảnh đại diện</Text>
          <TextInput style={styles.inputUnderline} value={profile.avatarUrl} placeholder="https://..." placeholderTextColor="#CBD5E1" onChangeText={t => setProfile({ ...profile, avatarUrl: t })} />
          
          <Text style={styles.inputLabel}>Họ và tên hiển thị</Text>
          <TextInput style={styles.inputUnderline} value={profile.name} placeholder="Nhập tên của bạn" placeholderTextColor="#CBD5E1" onChangeText={t => setProfile({ ...profile, name: t })} />
          
          <Text style={styles.inputLabel}>Chức danh / Nghề nghiệp</Text>
          <TextInput style={styles.inputUnderline} value={profile.occupation} placeholder="VD: Sinh viên, IT..." placeholderTextColor="#CBD5E1" onChangeText={t => setProfile({ ...profile, occupation: t })} />
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionHeader}>Thông tin liên hệ</Text>
          
          <Text style={styles.inputLabel}>Địa chỉ Email</Text>
          <TextInput style={styles.inputUnderline} value={profile.email} keyboardType="email-address" placeholder="example@mail.com" placeholderTextColor="#CBD5E1" onChangeText={t => setProfile({ ...profile, email: t })} />
          
          <Text style={styles.inputLabel}>Số điện thoại</Text>
          <TextInput style={styles.inputUnderline} value={profile.phone} keyboardType="phone-pad" placeholder="09xx..." placeholderTextColor="#CBD5E1" onChangeText={t => setProfile({ ...profile, phone: t })} />
          
          <Text style={styles.inputLabel}>Khu vực / Địa chỉ</Text>
          <TextInput style={styles.inputUnderline} value={profile.address} placeholder="Nhập địa chỉ..." placeholderTextColor="#CBD5E1" onChangeText={t => setProfile({ ...profile, address: t })} />
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionHeader}>Giới thiệu bản thân</Text>
          <TextInput style={[styles.inputUnderline, styles.inputArea]} value={profile.description} multiline numberOfLines={3} placeholder="Vài dòng về bản thân bạn..." placeholderTextColor="#CBD5E1" onChangeText={t => setProfile({ ...profile, description: t })} />
        </View>

        <TouchableOpacity style={styles.btnSave} onPress={handleSave}>
          <Text style={styles.btnSaveText}>LƯU THÔNG TIN</Text>
        </TouchableOpacity>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F1F5F9' },
  coverContainer: { marginBottom: 40 },
  coverImage: { width: '100%', height: 140, backgroundColor: '#94A3B8' },
  avatarRow: { flexDirection: 'row', alignItems: 'flex-end', paddingHorizontal: 20, marginTop: -40 },
  avatarImage: { width: 90, height: 90, borderRadius: 15, borderWidth: 4, borderColor: '#F1F5F9', backgroundColor: '#FFFFFF' },
  titleInfo: { marginLeft: 15, paddingBottom: 5, flex: 1 },
  displayName: { fontSize: 22, fontWeight: 'bold', color: '#0F172A' },
  displayJob: { fontSize: 14, color: '#64748B', marginTop: 2 },
  
  formWrapper: { paddingHorizontal: 15, paddingBottom: 40 },
  sectionCard: { backgroundColor: '#FFFFFF', padding: 20, borderRadius: 16, marginBottom: 15, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 3, elevation: 2 },
  sectionHeader: { fontSize: 16, fontWeight: '800', color: '#047857', marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#F1F5F9', paddingBottom: 10 },
  
  inputLabel: { fontSize: 12, fontWeight: 'bold', color: '#94A3B8', marginTop: 10 },
  inputUnderline: { borderBottomWidth: 1, borderBottomColor: '#E2E8F0', paddingVertical: 8, fontSize: 15, color: '#1E293B', marginBottom: 10 },
  inputArea: { height: 80, textAlignVertical: 'top', borderBottomWidth: 0, backgroundColor: '#F8FAFC', padding: 10, borderRadius: 8, marginTop: 10 },
  
  btnSave: { backgroundColor: '#0F172A', paddingVertical: 18, borderRadius: 12, alignItems: 'center', marginTop: 10 },
  btnSaveText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold', letterSpacing: 1 }
});