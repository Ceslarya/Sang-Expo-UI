import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Import từ thư mục tabs mới
import HomeTab from './tabs/HomeTab';
import ProfileTab from './tabs/ProfileTab';
import SettingTab from './tabs/SettingTab';

export default function ProfileScreen({ name, email, profileData, onLogout }) {
  const [tab, setTab] = useState('home');

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      
      <View style={styles.contentArea}>
        {tab === 'home' && <HomeTab />}
        {tab === 'profile' && (
          <ProfileTab
            name={name}
            email={email}
            profileData={profileData}
          />
        )}
        {tab === 'setting' && <SettingTab onLogout={onLogout} />}
      </View>

      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem} onPress={() => setTab('home')}>
          <View style={[styles.indicator, tab === 'home' && styles.indicatorActive]} />
          <Text style={[styles.tabText, tab === 'home' && styles.tabTextActive]}>Trang chủ</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem} onPress={() => setTab('profile')}>
          <View style={[styles.indicator, tab === 'profile' && styles.indicatorActive]} />
          <Text style={[styles.tabText, tab === 'profile' && styles.tabTextActive]}>Cá nhân</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem} onPress={() => setTab('setting')}>
          <View style={[styles.indicator, tab === 'setting' && styles.indicatorActive]} />
          <Text style={[styles.tabText, tab === 'setting' && styles.tabTextActive]}>Cấu hình</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  contentArea: { flex: 1 },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderColor: '#F1F5F9',
    height: 85,
    paddingBottom: 25,
    paddingHorizontal: 15,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
  },
  indicator: {
    height: 4,
    width: 25,
    borderRadius: 2,
    backgroundColor: 'transparent',
    marginBottom: 5,
  },
  indicatorActive: {
    backgroundColor: '#10B981',
  },
  tabText: {
    color: '#94A3B8',
    fontSize: 14,
    fontWeight: '600'
  },
  tabTextActive: {
    color: '#059669',
    fontWeight: '800'
  }
});