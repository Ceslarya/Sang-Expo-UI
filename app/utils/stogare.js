import * as SQLite from 'expo-sqlite';

const DB_NAME = 'SocialApp.db';

// Khởi tạo Database và các Bảng
export const initDB = async () => {
  try {
    const db = await SQLite.openDatabaseAsync(DB_NAME);
    await db.execAsync(`
      PRAGMA foreign_keys = ON;
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT, email TEXT UNIQUE, password TEXT,
        address TEXT, phone TEXT, description TEXT, 
        avatarUrl TEXT, occupation TEXT
      );
      CREATE TABLE IF NOT EXISTS posts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT, content TEXT, date TEXT,
        likes INTEGER DEFAULT 0, isLiked INTEGER DEFAULT 0
      );
      CREATE TABLE IF NOT EXISTS comments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        postId INTEGER, text TEXT,
        FOREIGN KEY (postId) REFERENCES posts(id) ON DELETE CASCADE
      );
    `);
    console.log("SQLite Initialized");
  } catch (error) {
    console.error("initDB Error:", error);
  }
};

// Tài khoản & Đăng nhập
export const saveAccount = async ({ name, email, password }) => {
  const db = await SQLite.openDatabaseAsync(DB_NAME);
  await db.runAsync(
    'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
    [name, email.toLowerCase(), password]
  );
};

export const loginUser = async (email, password) => {
  const db = await SQLite.openDatabaseAsync(DB_NAME);
  return await db.getFirstAsync(
    'SELECT * FROM users WHERE LOWER(email) = ? AND password = ?',
    [email.toLowerCase(), password]
  );
};

// Hồ sơ cá nhân
export const getProfile = async () => {
  const db = await SQLite.openDatabaseAsync(DB_NAME);
  return await db.getFirstAsync('SELECT * FROM users ORDER BY id DESC LIMIT 1');
};

export const saveProfile = async (profile) => {
  const db = await SQLite.openDatabaseAsync(DB_NAME);
  await db.runAsync(
    `UPDATE users SET name=?, address=?, phone=?, description=?, avatarUrl=?, occupation=? WHERE id=?`,
    [profile.name, profile.address, profile.phone, profile.description, profile.avatarUrl, profile.occupation, profile.id]
  );
};

// Bài viết & Bình luận
export const getPosts = async () => {
  const db = await SQLite.openDatabaseAsync(DB_NAME);
  const posts = await db.getAllAsync('SELECT * FROM posts ORDER BY id DESC');
  for (let i = 0; i < posts.length; i++) {
    const res = await db.getAllAsync('SELECT text FROM comments WHERE postId = ?', [posts[i].id]);
    posts[i].comments = res.map(c => c.text);
    posts[i].isLiked = posts[i].isLiked === 1;
  }
  return posts;
};

export const createPost = async (title, content, date) => {
  const db = await SQLite.openDatabaseAsync(DB_NAME);
  await db.runAsync('INSERT INTO posts (title, content, date) VALUES (?, ?, ?)', [title, content, date]);
};

export const toggleLikePost = async (postId, isLiked, likes) => {
  const db = await SQLite.openDatabaseAsync(DB_NAME);
  const newLiked = isLiked ? 0 : 1;
  const newCount = isLiked ? Math.max(0, likes - 1) : likes + 1;
  await db.runAsync('UPDATE posts SET isLiked = ?, likes = ? WHERE id = ?', [newLiked, newCount, postId]);
};

export const addComment = async (postId, text) => {
  const db = await SQLite.openDatabaseAsync(DB_NAME);
  await db.runAsync('INSERT INTO comments (postId, text) VALUES (?, ?)', [postId, text]);
};

export const resetAll = async () => {
  const db = await SQLite.openDatabaseAsync(DB_NAME);
  await db.execAsync('DELETE FROM users; DELETE FROM posts; DELETE FROM comments;');
};