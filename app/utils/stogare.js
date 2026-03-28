import AsyncStorage from '@react-native-async-storage/async-storage';

// ===== ACCOUNT (TÀI KHOẢN) =====
export const saveAccount = async (account) => {
  try {
    await AsyncStorage.setItem('ACCOUNT', JSON.stringify(account));
  } catch (error) {
    console.error("Lỗi khi lưu Account:", error);
  }
};

export const getAccount = async () => {
  try {
    const data = await AsyncStorage.getItem('ACCOUNT');
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Lỗi khi lấy Account:", error);
    return null;
  }
};

// ===== POST =====
export const savePosts = async (posts) => {
  try {
    await AsyncStorage.setItem('POSTS', JSON.stringify(posts));
  } catch (error) {
    console.error("Lỗi khi lưu Posts:", error);
  }
};

export const getPosts = async () => {
  try {
    const data = await AsyncStorage.getItem('POSTS');
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Lỗi khi lấy Posts:", error);
    return [];
  }
};

// ===== PROFILE =====
export const saveProfile = async (profile) => {
  try {
    await AsyncStorage.setItem('PROFILE', JSON.stringify(profile));
  } catch (error) {
    console.error("Lỗi khi lưu Profile:", error);
  }
};

export const getProfile = async () => {
  try {
    const data = await AsyncStorage.getItem('PROFILE');
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Lỗi khi lấy Profile:", error);
    return null;
  }
};

// ===== RESET =====
export const resetAll = async () => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.error("Lỗi khi xóa dữ liệu:", error);
  }
};