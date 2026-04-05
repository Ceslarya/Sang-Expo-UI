import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { addComment, createPost, getPosts, toggleLikePost } from '../../utils/stogare';

export default function ForumTab() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [commentInputs, setCommentInputs] = useState({});

  useEffect(() => { loadPosts(); }, []);

  const loadPosts = async () => {
    const data = await getPosts();
    setPosts(data);
  };

  const handlePost = async () => {
    if (!title || !content) return;
    await createPost(title, content, new Date().toLocaleDateString());
    setTitle(''); setContent('');
    loadPosts();
  };

  const handleToggleLike = async (postId) => {
    const post = posts.find(p => p.id === postId);
    if (post) {
      await toggleLikePost(postId, post.isLiked, post.likes);
      loadPosts();
    }
  };

  const handleSendComment = async (postId) => {
    const text = commentInputs[postId];
    if (!text || text.trim() === '') return;
    await addComment(postId, text.trim());
    setCommentInputs({ ...commentInputs, [postId]: '' });
    loadPosts();
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      
      <View style={styles.createPostCard}>
        <Text style={styles.headerTitle}>Tạo bài viết mới ✍️</Text>
        <TextInput placeholder="Tiêu đề bài viết" placeholderTextColor="#6EE7B7" style={styles.inputTitle} value={title} onChangeText={setTitle} />
        <TextInput placeholder="Bạn đang nghĩ gì?" placeholderTextColor="#6EE7B7" style={styles.inputContent} value={content} onChangeText={setContent} multiline numberOfLines={3} />
        <TouchableOpacity style={styles.btnPrimary} onPress={handlePost}>
          <Text style={styles.btnPrimaryText}>ĐĂNG BÀI LÊN DIỄN ĐÀN</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.feedContainer}>
        <Text style={styles.feedHeader}>Bảng tin sôi nổi 🔥</Text>
        {posts.map((p) => (
          <View key={p.id} style={styles.postCard}>
            <View style={styles.postHeader}>
              <Text style={styles.postTitle}>{p.title}</Text>
              {p.date && <Text style={styles.postDate}>{p.date}</Text>}
            </View>
            <Text style={styles.postContent}>{p.content}</Text>

            <View style={styles.actionRow}>
              <TouchableOpacity style={styles.actionBtn} onPress={() => handleToggleLike(p.id)}>
                <Text style={[styles.actionText, p.isLiked && styles.likedText]}>{p.isLiked ? '❤️' : '🤍'} {p.likes} Thích</Text>
              </TouchableOpacity>
              <View style={styles.actionBtn}>
                <Text style={styles.actionText}>💬 {p.comments.length} Bình luận</Text>
              </View>
            </View>

            <View style={styles.commentSection}>
              {p.comments.map((cmt, idx) => (
                <View key={idx} style={styles.commentItem}><Text style={styles.commentText}>{cmt}</Text></View>
              ))}
              <View style={styles.commentInputRow}>
                <TextInput style={styles.commentInput} placeholder="Viết bình luận..." placeholderTextColor="#A7F3D0" value={commentInputs[p.id] || ''} onChangeText={(t) => setCommentInputs({ ...commentInputs, [p.id]: t })} />
                <TouchableOpacity style={styles.sendBtn} onPress={() => handleSendComment(p.id)}>
                  <Text style={styles.sendBtnText}>Gửi</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
        {posts.length === 0 && <Text style={styles.emptyText}>Chưa có bài viết nào. Hãy là người đầu tiên chia sẻ!</Text>}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F0FDF4' }, // Nền xanh mint nhạt
  createPostCard: { backgroundColor: '#D1FAE5', padding: 20, margin: 15, borderRadius: 20, borderWidth: 2, borderColor: '#A7F3D0', elevation: 2 }, // Khung xanh đậm hơn
  headerTitle: { fontSize: 18, fontWeight: '900', color: '#047857', marginBottom: 15 },
  inputTitle: { backgroundColor: '#ECFDF5', borderWidth: 1, borderColor: '#34D399', padding: 14, borderRadius: 12, marginBottom: 12, fontSize: 16, fontWeight: 'bold', color: '#064E3B' },
  inputContent: { backgroundColor: '#ECFDF5', borderWidth: 1, borderColor: '#34D399', padding: 14, borderRadius: 12, marginBottom: 15, fontSize: 15, textAlignVertical: 'top', color: '#064E3B' },
  btnPrimary: { backgroundColor: '#10B981', padding: 16, borderRadius: 12, alignItems: 'center', shadowColor: '#10B981', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 5 },
  btnPrimaryText: { color: '#FFFFFF', fontWeight: '900', fontSize: 15, letterSpacing: 0.5 },
  
  feedContainer: { paddingHorizontal: 15, paddingBottom: 30 },
  feedHeader: { fontSize: 20, fontWeight: '900', color: '#064E3B', marginBottom: 15, marginLeft: 5 },
  postCard: { backgroundColor: '#FFFFFF', padding: 20, borderRadius: 20, marginBottom: 18, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 8, elevation: 4 },
  postHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  postTitle: { fontSize: 18, fontWeight: 'bold', color: '#064E3B', flex: 1 },
  postDate: { fontSize: 12, color: '#10B981', marginLeft: 10, fontWeight: 'bold', backgroundColor: '#ECFDF5', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 10 },
  postContent: { fontSize: 15, color: '#374151', lineHeight: 24, marginBottom: 15 },
  
  actionRow: { flexDirection: 'row', borderTopWidth: 1, borderBottomWidth: 1, borderColor: '#F0FDF4', paddingVertical: 12, marginBottom: 10 },
  actionBtn: { marginRight: 25, flexDirection: 'row', alignItems: 'center' },
  actionText: { fontSize: 14, color: '#059669', fontWeight: 'bold' },
  likedText: { color: '#E11D48', fontWeight: '900' },
  
  commentSection: { marginTop: 5 },
  commentItem: { backgroundColor: '#F0FDF4', padding: 12, borderRadius: 12, marginBottom: 8, borderLeftWidth: 3, borderLeftColor: '#34D399' },
  commentText: { fontSize: 14, color: '#064E3B' },
  commentInputRow: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
  commentInput: { flex: 1, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#A7F3D0', padding: 12, borderRadius: 20, fontSize: 14, color: '#064E3B', paddingHorizontal: 18 },
  sendBtn: { marginLeft: 10, backgroundColor: '#10B981', paddingHorizontal: 16, paddingVertical: 12, borderRadius: 20 },
  sendBtnText: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 14 },
  emptyText: { textAlign: 'center', color: '#059669', marginTop: 30, fontStyle: 'italic', fontWeight: 'bold' }
});