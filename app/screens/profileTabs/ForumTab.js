import { useEffect, useState } from 'react';
import {
  ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View
} from 'react-native';

// Đổi import sang các hàm SQLite
import { addComment, createPost, getPosts, toggleLikePost } from '../../utils/stogare';

export default function ForumTab() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [commentInputs, setCommentInputs] = useState({});

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    const data = await getPosts();
    setPosts(data);
  };

  const handlePost = async () => {
    if (!title || !content) return;

    // Lưu bài viết mới vào SQLite
    await createPost(title, content, new Date().toLocaleDateString());
    
    // Reset form và tải lại danh sách
    setTitle('');
    setContent('');
    loadPosts();
  };

  const handleToggleLike = async (postId) => {
    const post = posts.find(p => p.id === postId);
    if (post) {
      // Cập nhật trạng thái like trong SQLite
      await toggleLikePost(postId, post.isLiked, post.likes);
      loadPosts();
    }
  };

  const handleSendComment = async (postId) => {
    const text = commentInputs[postId];
    if (!text || text.trim() === '') return;

    // Lưu bình luận vào SQLite
    await addComment(postId, text.trim());
    
    // Xóa text ở ô input sau khi gửi và tải lại data
    setCommentInputs({ ...commentInputs, [postId]: '' });
    loadPosts();
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Khu vực tạo bài viết mới */}
      <View style={styles.createPostCard}>
        <Text style={styles.headerTitle}>Tạo bài viết mới</Text>
        <TextInput
          placeholder="Tiêu đề bài viết"
          placeholderTextColor="#9CA3AF"
          style={styles.inputTitle}
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          placeholder="Bạn đang nghĩ gì?"
          placeholderTextColor="#9CA3AF"
          style={styles.inputContent}
          value={content}
          onChangeText={setContent}
          multiline
          numberOfLines={3}
        />
        <TouchableOpacity style={styles.btnPrimary} onPress={handlePost}>
          <Text style={styles.btnPrimaryText}>ĐĂNG BÀI</Text>
        </TouchableOpacity>
      </View>

      {/* Danh sách bài viết */}
      <View style={styles.feedContainer}>
        <Text style={styles.feedHeader}>Bảng tin</Text>
        {posts.map((p) => (
          <View key={p.id} style={styles.postCard}>
            <View style={styles.postHeader}>
              <Text style={styles.postTitle}>{p.title}</Text>
              {p.date && <Text style={styles.postDate}>{p.date}</Text>}
            </View>
            <Text style={styles.postContent}>{p.content}</Text>

            {/* Thanh công cụ: Tim & Bình luận */}
            <View style={styles.actionRow}>
              <TouchableOpacity style={styles.actionBtn} onPress={() => handleToggleLike(p.id)}>
                <Text style={[styles.actionText, p.isLiked && styles.likedText]}>
                  {p.isLiked ? '❤️' : '🤍'} {p.likes} Thích
                </Text>
              </TouchableOpacity>
              <View style={styles.actionBtn}>
                <Text style={styles.actionText}>💬 {p.comments.length} Bình luận</Text>
              </View>
            </View>

            {/* Khu vực bình luận */}
            <View style={styles.commentSection}>
              {p.comments.map((cmt, idx) => (
                <View key={idx} style={styles.commentItem}>
                  <Text style={styles.commentText}>{cmt}</Text>
                </View>
              ))}

              <View style={styles.commentInputRow}>
                <TextInput
                  style={styles.commentInput}
                  placeholder="Viết bình luận..."
                  placeholderTextColor="#9CA3AF"
                  value={commentInputs[p.id] || ''}
                  onChangeText={(t) => setCommentInputs({ ...commentInputs, [p.id]: t })}
                />
                <TouchableOpacity style={styles.sendBtn} onPress={() => handleSendComment(p.id)}>
                  <Text style={styles.sendBtnText}>Gửi</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
        {posts.length === 0 && (
          <Text style={styles.emptyText}>Chưa có bài viết nào. Hãy là người đầu tiên chia sẻ!</Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3F4F6' },
  createPostCard: {
    backgroundColor: '#FFFFFF', padding: 20, margin: 15, borderRadius: 16,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05, shadowRadius: 5, elevation: 3,
  },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#1F2937', marginBottom: 15 },
  inputTitle: {
    backgroundColor: '#F9FAFB', borderWidth: 1, borderColor: '#E5E7EB',
    padding: 12, borderRadius: 10, marginBottom: 12, fontSize: 16, fontWeight: '600'
  },
  inputContent: {
    backgroundColor: '#F9FAFB', borderWidth: 1, borderColor: '#E5E7EB',
    padding: 12, borderRadius: 10, marginBottom: 15, fontSize: 15, textAlignVertical: 'top'
  },
  btnPrimary: { backgroundColor: '#6366F1', padding: 14, borderRadius: 10, alignItems: 'center' },
  btnPrimaryText: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 15 },
  feedContainer: { paddingHorizontal: 15, paddingBottom: 20 },
  feedHeader: { fontSize: 18, fontWeight: 'bold', color: '#374151', marginBottom: 10, marginLeft: 5 },
  
  postCard: {
    backgroundColor: '#FFFFFF', padding: 18, borderRadius: 12, marginBottom: 15,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05, shadowRadius: 3, elevation: 2,
  },
  postHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  postTitle: { fontSize: 17, fontWeight: 'bold', color: '#111827', flex: 1 },
  postDate: { fontSize: 12, color: '#9CA3AF', marginLeft: 10 },
  postContent: { fontSize: 15, color: '#4B5563', lineHeight: 22, marginBottom: 15 },
  
  actionRow: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#F3F4F6',
    paddingVertical: 10,
    marginBottom: 10
  },
  actionBtn: { marginRight: 20, flexDirection: 'row', alignItems: 'center' },
  actionText: { fontSize: 14, color: '#6B7280', fontWeight: '500' },
  likedText: { color: '#EF4444', fontWeight: 'bold' },
  
  commentSection: { marginTop: 5 },
  commentItem: {
    backgroundColor: '#F9FAFB', padding: 10, borderRadius: 8, marginBottom: 8
  },
  commentText: { fontSize: 14, color: '#374151' },
  commentInputRow: {
    flexDirection: 'row', alignItems: 'center', marginTop: 5
  },
  commentInput: {
    flex: 1, backgroundColor: '#F3F4F6', padding: 10, borderRadius: 20,
    fontSize: 14, color: '#1F2937', paddingHorizontal: 15
  },
  sendBtn: { marginLeft: 10, padding: 8 },
  sendBtnText: { color: '#6366F1', fontWeight: 'bold', fontSize: 15 },

  emptyText: { textAlign: 'center', color: '#9CA3AF', marginTop: 20, fontStyle: 'italic' }
});