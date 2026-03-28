import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { getPosts, savePosts } from '../../utils/stogare';

export default function HomeTab() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [commentInputs, setCommentInputs] = useState({});

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    const data = await getPosts();
    const formattedData = data.map(p => ({
      ...p, likes: p.likes || 0, isLiked: p.isLiked || false, comments: p.comments || []
    }));
    setPosts(formattedData);
  };

  const handlePost = async () => {
    if (!title || !content) return;
    const newPost = { id: Date.now(), title, content, date: new Date().toLocaleDateString(), likes: 0, isLiked: false, comments: [] };
    const updated = [newPost, ...posts];
    setPosts(updated);
    await savePosts(updated);
    setTitle('');
    setContent('');
  };

  const handleToggleLike = async (postId) => {
    const updated = posts.map(p => {
      if (p.id === postId) {
        const newIsLiked = !p.isLiked;
        return { ...p, isLiked: newIsLiked, likes: newIsLiked ? p.likes + 1 : Math.max(0, p.likes - 1) };
      }
      return p;
    });
    setPosts(updated);
    await savePosts(updated);
  };

  const handleSendComment = async (postId) => {
    const text = commentInputs[postId];
    if (!text || text.trim() === '') return;
    const updated = posts.map(p => {
      if (p.id === postId) return { ...p, comments: [...p.comments, text.trim()] };
      return p;
    });
    setPosts(updated);
    await savePosts(updated);
    setCommentInputs({ ...commentInputs, [postId]: '' });
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.composerCard}>
        <Text style={styles.cardHeader}>Thêm bài viết mới</Text>
        <TextInput style={styles.inputTitle} placeholder="Nhập chủ đề..." placeholderTextColor="#A1A1AA" value={title} onChangeText={setTitle} />
        <TextInput style={styles.inputArea} placeholder="Chia sẻ suy nghĩ của bạn..." placeholderTextColor="#A1A1AA" value={content} onChangeText={setContent} multiline numberOfLines={3} />
        <TouchableOpacity style={styles.btnAction} onPress={handlePost}>
          <Text style={styles.btnText}>ĐĂNG LÊN BẢNG TIN</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.feedWrapper}>
        <Text style={styles.feedTitle}>Khám phá</Text>
        {posts.map((p) => (
          <View key={p.id} style={styles.feedCard}>
            <View style={styles.feedHeader}>
              <Text style={styles.feedTitleText}>{p.title}</Text>
              {p.date && <Text style={styles.feedDate}>{p.date}</Text>}
            </View>
            <Text style={styles.feedBody}>{p.content}</Text>

            <View style={styles.interactionRow}>
              <TouchableOpacity style={styles.btnInteract} onPress={() => handleToggleLike(p.id)}>
                <Text style={[styles.interactText, p.isLiked && styles.liked]}>{p.isLiked ? '💖' : '🤍'} {p.likes}</Text>
              </TouchableOpacity>
              <View style={styles.btnInteract}>
                <Text style={styles.interactText}>💬 {p.comments.length}</Text>
              </View>
            </View>

            <View style={styles.commentBlock}>
              {p.comments.map((cmt, idx) => (
                <View key={idx} style={styles.commentBubble}><Text style={styles.commentText}>{cmt}</Text></View>
              ))}
              <View style={styles.commentInputWrapper}>
                <TextInput style={styles.commentInput} placeholder="Viết phản hồi..." placeholderTextColor="#A1A1AA" value={commentInputs[p.id] || ''} onChangeText={(t) => setCommentInputs({ ...commentInputs, [p.id]: t })} />
                <TouchableOpacity style={styles.sendBtn} onPress={() => handleSendComment(p.id)}>
                  <Text style={styles.sendBtnText}>Gửi</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
        {posts.length === 0 && <Text style={styles.emptyFeed}>Chưa có thông tin nào. Hãy tạo bài viết đầu tiên!</Text>}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  composerCard: { backgroundColor: '#FFFFFF', padding: 20, margin: 15, borderRadius: 20, borderWidth: 1, borderColor: '#E2E8F0' },
  cardHeader: { fontSize: 16, fontWeight: '800', color: '#047857', marginBottom: 15 },
  inputTitle: { backgroundColor: '#F1F5F9', padding: 12, borderRadius: 12, marginBottom: 12, fontSize: 15, fontWeight: 'bold' },
  inputArea: { backgroundColor: '#F1F5F9', padding: 12, borderRadius: 12, marginBottom: 15, fontSize: 14, textAlignVertical: 'top' },
  btnAction: { backgroundColor: '#10B981', padding: 14, borderRadius: 12, alignItems: 'center' },
  btnText: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 14, letterSpacing: 0.5 },
  feedWrapper: { paddingHorizontal: 15, paddingBottom: 20 },
  feedTitle: { fontSize: 20, fontWeight: '900', color: '#0F172A', marginBottom: 15, marginLeft: 5 },
  feedCard: { backgroundColor: '#FFFFFF', padding: 18, borderRadius: 20, marginBottom: 15, borderWidth: 1, borderColor: '#F1F5F9' },
  feedHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  feedTitleText: { fontSize: 16, fontWeight: '800', color: '#1E293B', flex: 1 },
  feedDate: { fontSize: 12, color: '#94A3B8', marginLeft: 10 },
  feedBody: { fontSize: 15, color: '#334155', lineHeight: 24, marginBottom: 15 },
  interactionRow: { flexDirection: 'row', borderTopWidth: 1, borderBottomWidth: 1, borderColor: '#F8FAFC', paddingVertical: 10, marginBottom: 10 },
  btnInteract: { marginRight: 25, flexDirection: 'row', alignItems: 'center' },
  interactText: { fontSize: 14, color: '#64748B', fontWeight: '600' },
  liked: { color: '#E11D48', fontWeight: '800' },
  commentBlock: { marginTop: 5 },
  commentBubble: { backgroundColor: '#F1F5F9', padding: 12, borderRadius: 12, marginBottom: 8 },
  commentText: { fontSize: 13, color: '#1E293B' },
  commentInputWrapper: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  commentInput: { flex: 1, backgroundColor: '#F8FAFC', borderWidth: 1, borderColor: '#E2E8F0', padding: 10, borderRadius: 20, fontSize: 13, color: '#0F172A', paddingHorizontal: 15 },
  sendBtn: { marginLeft: 10, paddingHorizontal: 10, paddingVertical: 5 },
  sendBtnText: { color: '#059669', fontWeight: '900', fontSize: 14 },
  emptyFeed: { textAlign: 'center', color: '#94A3B8', marginTop: 30 }
});