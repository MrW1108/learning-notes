import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Image,
    Pressable,
    RefreshControl,
    ScrollView,
    StyleSheet,
    View,
} from 'react-native';

// 定义数据类型
interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  company: {
    name: string;
  };
}

interface Photo {
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export default function ApiIntegrationDemo() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [photos, setPhotos] = useState<Photo[]>([]);
  
  const [postsLoading, setPostsLoading] = useState<LoadingState>('idle');
  const [usersLoading, setUsersLoading] = useState<LoadingState>('idle');
  const [photosLoading, setPhotosLoading] = useState<LoadingState>('idle');
  
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 基础 API 配置
  const API_BASE = 'https://jsonplaceholder.typicode.com';

  // 通用错误处理
  const handleApiError = (error: any, context: string) => {
    console.error(`${context} error:`, error);
    const message = error.message || '网络请求失败';
    setError(`${context}: ${message}`);
    Alert.alert('错误', `${context}失败: ${message}`);
  };

  // 获取文章列表
  const fetchPosts = async () => {
    setPostsLoading('loading');
    setError(null);
    
    try {
      const response = await fetch(`${API_BASE}/posts?_limit=5`);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data: Post[] = await response.json();
      setPosts(data);
      setPostsLoading('success');
    } catch (error) {
      setPostsLoading('error');
      handleApiError(error, '获取文章');
    }
  };

  // 获取用户列表
  const fetchUsers = async () => {
    setUsersLoading('loading');
    setError(null);
    
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5秒超时
      
      const response = await fetch(`${API_BASE}/users?_limit=3`, {
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data: User[] = await response.json();
      setUsers(data);
      setUsersLoading('success');
    } catch (error) {
      setUsersLoading('error');
      if (error instanceof Error && error.name === 'AbortError') {
        handleApiError(new Error('请求超时'), '获取用户');
      } else {
        handleApiError(error, '获取用户');
      }
    }
  };

  // 获取照片列表
  const fetchPhotos = async () => {
    setPhotosLoading('loading');
    setError(null);
    
    try {
      const response = await fetch(`${API_BASE}/photos?_limit=6`);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data: Photo[] = await response.json();
      setPhotos(data);
      setPhotosLoading('success');
    } catch (error) {
      setPhotosLoading('error');
      handleApiError(error, '获取照片');
    }
  };

  // 模拟创建文章
  const createPost = async () => {
    try {
      const newPost = {
        title: '新文章标题',
        body: '这是一篇通过 POST 请求创建的文章内容。',
        userId: 1,
      };
      
      const response = await fetch(`${API_BASE}/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPost),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const createdPost: Post = await response.json();
      Alert.alert('成功', `文章创建成功！ID: ${createdPost.id}`);
      
      // 更新本地状态
      setPosts(prev => [createdPost, ...prev]);
    } catch (error) {
      handleApiError(error, '创建文章');
    }
  };

  // 刷新所有数据
  const refreshAllData = async () => {
    setRefreshing(true);
    await Promise.all([
      fetchPosts(),
      fetchUsers(),
      fetchPhotos(),
    ]);
    setRefreshing(false);
  };

  // 组件挂载时获取数据
  useEffect(() => {
    refreshAllData();
  }, []);

  // 渲染加载状态
  const renderLoadingState = (loading: LoadingState, content: React.ReactNode) => {
    if (loading === 'loading') {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <ThemedText style={styles.loadingText}>加载中...</ThemedText>
        </View>
      );
    }
    
    if (loading === 'error') {
      return (
        <View style={styles.errorContainer}>
          <ThemedText style={styles.errorText}>加载失败</ThemedText>
          <Pressable style={styles.retryButton} onPress={refreshAllData}>
            <ThemedText style={styles.retryButtonText}>重试</ThemedText>
          </Pressable>
        </View>
      );
    }
    
    return content;
  };

  return (
    <ScrollView 
      style={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={refreshAllData}
          colors={['#007AFF']}
          tintColor="#007AFF"
        />
      }
    >
      <ThemedView style={styles.header}>
        <ThemedText type="title">API 集成示例</ThemedText>
        <ThemedText style={styles.subtitle}>
          学习网络请求、数据处理和错误处理
        </ThemedText>
      </ThemedView>

      {/* 操作按钮 */}
      <ThemedView style={styles.actionSection}>
        <View style={styles.buttonRow}>
          <Pressable 
            style={styles.actionButton}
            onPress={fetchPosts}
            disabled={postsLoading === 'loading'}
          >
            <ThemedText style={styles.actionButtonText}>
              {postsLoading === 'loading' ? '加载中...' : '获取文章'}
            </ThemedText>
          </Pressable>
          
          <Pressable 
            style={styles.actionButton}
            onPress={fetchUsers}
            disabled={usersLoading === 'loading'}
          >
            <ThemedText style={styles.actionButtonText}>
              {usersLoading === 'loading' ? '加载中...' : '获取用户'}
            </ThemedText>
          </Pressable>
        </View>
        
        <View style={styles.buttonRow}>
          <Pressable 
            style={styles.actionButton}
            onPress={fetchPhotos}
            disabled={photosLoading === 'loading'}
          >
            <ThemedText style={styles.actionButtonText}>
              {photosLoading === 'loading' ? '加载中...' : '获取照片'}
            </ThemedText>
          </Pressable>
          
          <Pressable 
            style={[styles.actionButton, styles.createButton]}
            onPress={createPost}
          >
            <ThemedText style={[styles.actionButtonText, styles.createButtonText]}>
              创建文章
            </ThemedText>
          </Pressable>
        </View>
      </ThemedView>

      {/* 错误信息显示 */}
      {error && (
        <ThemedView style={styles.errorBanner}>
          <ThemedText style={styles.errorBannerText}>{error}</ThemedText>
          <Pressable 
            style={styles.dismissButton}
            onPress={() => setError(null)}
          >
            <ThemedText style={styles.dismissButtonText}>×</ThemedText>
          </Pressable>
        </ThemedView>
      )}

      {/* 文章列表 */}
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle">文章列表 (GET 请求)</ThemedText>
        {renderLoadingState(postsLoading, 
          <View style={styles.listContainer}>
            {posts.map((post) => (
              <View key={post.id} style={styles.listItem}>
                <ThemedText style={styles.itemTitle} numberOfLines={2}>
                  {post.title}
                </ThemedText>
                <ThemedText style={styles.itemBody} numberOfLines={3}>
                  {post.body}
                </ThemedText>
                <ThemedText style={styles.itemMeta}>
                  ID: {post.id} | 用户: {post.userId}
                </ThemedText>
              </View>
            ))}
          </View>
        )}
      </ThemedView>

      {/* 用户列表 */}
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle">用户信息 (带超时处理)</ThemedText>
        {renderLoadingState(usersLoading,
          <View style={styles.listContainer}>
            {users.map((user) => (
              <View key={user.id} style={styles.userItem}>
                <View style={styles.userInfo}>
                  <ThemedText style={styles.userName}>{user.name}</ThemedText>
                  <ThemedText style={styles.userDetail}>@{user.username}</ThemedText>
                  <ThemedText style={styles.userDetail}>{user.email}</ThemedText>
                  <ThemedText style={styles.userDetail}>公司: {user.company.name}</ThemedText>
                </View>
              </View>
            ))}
          </View>
        )}
      </ThemedView>

      {/* 照片网格 */}
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle">图片加载示例</ThemedText>
        {renderLoadingState(photosLoading,
          <View style={styles.photoGrid}>
            {photos.map((photo) => (
              <View key={photo.id} style={styles.photoItem}>
                <Image 
                  source={{ uri: photo.thumbnailUrl }}
                  style={styles.photoImage}
                  defaultSource={require('@/assets/images/favicon.png')}
                />
                <ThemedText style={styles.photoTitle} numberOfLines={2}>
                  {photo.title}
                </ThemedText>
              </View>
            ))}
          </View>
        )}
      </ThemedView>

      {/* API 使用说明 */}
      <ThemedView style={styles.infoSection}>
        <ThemedText type="subtitle">学习要点</ThemedText>
        <View style={styles.infoList}>
          <ThemedText style={styles.infoItem}>
            • 使用 fetch API 进行网络请求
          </ThemedText>
          <ThemedText style={styles.infoItem}>
            • 实现加载状态和错误处理
          </ThemedText>
          <ThemedText style={styles.infoItem}>
            • 支持下拉刷新功能
          </ThemedText>
          <ThemedText style={styles.infoItem}>
            • 处理请求超时和取消
          </ThemedText>
          <ThemedText style={styles.infoItem}>
            • POST 请求创建数据示例
          </ThemedText>
          <ThemedText style={styles.infoItem}>
            • TypeScript 类型安全
          </ThemedText>
        </View>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    padding: 20,
    alignItems: 'center',
  },
  subtitle: {
    marginTop: 8,
    textAlign: 'center',
    opacity: 0.7,
  },
  
  // Action section
  actionSection: {
    padding: 16,
    marginBottom: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  actionButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  createButton: {
    backgroundColor: '#34D399',
  },
  createButtonText: {
    color: 'white',
  },
  
  // Error banner
  errorBanner: {
    flexDirection: 'row',
    backgroundColor: '#FEE2E2',
    padding: 12,
    marginBottom: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  errorBannerText: {
    flex: 1,
    color: '#DC2626',
    fontSize: 14,
  },
  dismissButton: {
    padding: 4,
  },
  dismissButtonText: {
    color: '#DC2626',
    fontSize: 18,
    fontWeight: 'bold',
  },
  
  // Section styles
  section: {
    padding: 16,
    marginBottom: 16,
  },
  
  // Loading and error states
  loadingContainer: {
    padding: 40,
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    opacity: 0.7,
  },
  errorContainer: {
    padding: 20,
    alignItems: 'center',
  },
  errorText: {
    color: '#DC2626',
    marginBottom: 12,
  },
  retryButton: {
    backgroundColor: '#DC2626',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  retryButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  
  // List styles
  listContainer: {
    marginTop: 12,
  },
  listItem: {
    padding: 16,
    backgroundColor: '#F9F9F9',
    borderRadius: 8,
    marginBottom: 8,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  itemBody: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
    opacity: 0.8,
  },
  itemMeta: {
    fontSize: 12,
    opacity: 0.6,
  },
  
  // User item styles
  userItem: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#F9F9F9',
    borderRadius: 8,
    marginBottom: 8,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  userDetail: {
    fontSize: 14,
    opacity: 0.7,
    marginBottom: 2,
  },
  
  // Photo grid styles
  photoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 12,
    gap: 8,
  },
  photoItem: {
    width: '48%',
    backgroundColor: '#F9F9F9',
    borderRadius: 8,
    padding: 8,
  },
  photoImage: {
    width: '100%',
    height: 100,
    borderRadius: 6,
    marginBottom: 8,
  },
  photoTitle: {
    fontSize: 12,
    lineHeight: 16,
  },
  
  // Info section
  infoSection: {
    padding: 16,
    marginBottom: 20,
  },
  infoList: {
    marginTop: 12,
  },
  infoItem: {
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 4,
  },
});
