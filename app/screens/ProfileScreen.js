import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ForumTab from './profileTabs/ForumTab';
import ProfileTab from './profileTabs/ProfileTab';
import SettingTab from './profileTabs/SettingTab';

export default function ProfileScreen({ name, email, profileData, onLogout }) {
  const [tab, setTab] = useState('profile');

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      
      {/* Vùng nội dung chính */}
      <View style={styles.contentArea}>
        {tab === 'forum' && <ForumTab />}
        {tab === 'profile' && (
          <ProfileTab
            name={name}
            email={email}
            profileData={profileData}
          />
        )}
        {tab === 'setting' && <SettingTab onLogout={onLogout} />}
      </View>

      {/* Thanh điều hướng Bottom Bar - Đã được làm cao lên */}
      <View style={styles.tabBar}>
        <TouchableOpacity 
          style={[styles.tabItem, tab === 'forum' && styles.tabItemActive]} 
          onPress={() => setTab('forum')}
        >
          <Text style={[styles.tabText, tab === 'forum' && styles.tabTextActive]}>Diễn đàn</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.tabItem, tab === 'profile' && styles.tabItemActive]} 
          onPress={() => setTab('profile')}
        >
          <Text style={[styles.tabText, tab === 'profile' && styles.tabTextActive]}>Hồ sơ</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.tabItem, tab === 'setting' && styles.tabItemActive]} 
          onPress={() => setTab('setting')}
        >
          <Text style={[styles.tabText, tab === 'setting' && styles.tabTextActive]}>Cài đặt</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  contentArea: { flex: 1 },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 15, // Tăng khoảng cách trên dưới
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderColor: '#F3F4F6',
    paddingBottom: 35, // Đẩy các nút lên cao, tránh thanh điều hướng của hệ thống
    height: 90, // Set chiều cao cố định lớn hơn
  },
  tabItem: {
    paddingVertical: 12, // Tăng vùng bấm
    paddingHorizontal: 25,
    borderRadius: 20,
  },
  tabItemActive: {
    backgroundColor: '#EEF2FF',
  },
  tabText: {
    color: '#9CA3AF',
    fontSize: 15,
    fontWeight: '600'
  },
  tabTextActive: {
    color: '#6366F1',
    fontWeight: 'bold'
  }
});