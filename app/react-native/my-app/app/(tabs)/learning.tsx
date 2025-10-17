import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link, useRouter } from 'expo-router';
import { Alert, Pressable, ScrollView, StyleSheet } from 'react-native';


interface LearningItem {
  id: string;
  title: string;
  description: string;
  route: string;
  level: '基础' | '中级' | '高级';
  status: '待学习' | '学习中' | '已完成';
}

const learningItems: LearningItem[] = [
  {
    id: '1',
    title: '基础组件练习',
    description: '学习 Text, View, Button, Image 等基础组件',
    route: '/learning/basic-components',
    level: '基础',
    status: '待学习'
  },
  {
    id: '2', 
    title: '布局和样式',
    description: '掌握 Flexbox、StyleSheet 和响应式设计',
    route: '/learning/layout-styles',
    level: '基础',
    status: '待学习'
  },
  {
    id: '3',
    title: '列表和滚动',
    description: '学习 FlatList, SectionList, ScrollView 的使用',
    route: '/learning/lists-scroll',
    level: '基础',
    status: '待学习'
  },
  {
    id: '4',
    title: '表单和输入',
    description: '掌握 TextInput, 表单验证和用户输入处理',
    route: '/learning/forms-input',
    level: '中级',
    status: '待学习'
  },
  {
    id: '5',
    title: '导航系统',
    description: '学习不同的导航模式和页面跳转',
    route: '/learning/navigation',
    level: '中级',
    status: '待学习'
  },
  {
    id: '6',
    title: '状态管理',
    description: '学习 Context, useState, useReducer 等状态管理',
    route: '/learning/state-management',
    level: '中级',
    status: '待学习'
  },
  {
    id: '7',
    title: 'API 集成',
    description: '学习网络请求、数据获取和错误处理',
    route: '/learning/api-integration',
    level: '中级',
    status: '待学习'
  },
  {
    id: '8',
    title: '动画和手势',
    description: '学习动画 API 和手势识别',
    route: '/learning/animations',
    level: '高级',
    status: '待学习'
  },
  {
    id: '9',
    title: '设备功能',
    description: '学习相机、位置、通知等原生功能',
    route: '/learning/device-features',
    level: '高级',
    status: '待学习'
  },
  {
    id: '10',
    title: '性能优化',
    description: '学习性能监控、优化技巧和最佳实践',
    route: '/learning/performance',
    level: '高级',
    status: '待学习'
  }
];

export default function LearningScreen() {
  const router = useRouter();

  const getLevelColor = (level: string) => {
    switch (level) {
      case '基础': return '#10B981';
      case '中级': return '#F59E0B'; 
      case '高级': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case '已完成': return '#10B981';
      case '学习中': return '#3B82F6';
      case '待学习': return '#6B7280';
      default: return '#6B7280';
    }
  };

  const handleItemPress = (item: LearningItem) => {
    // 暂时显示提示，后续会添加实际页面
    Alert.alert(
      item.title,
      `${item.description}\n\n该功能正在开发中...`,
      [{ text: '确定' }]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title">React Native 学习中心</ThemedText>
        <ThemedText style={styles.subtitle}>
          从基础到进阶，系统学习 React Native 开发
        </ThemedText>
      </ThemedView>

      <Link href="/modal">
        <ThemedText type="link" style={{marginLeft: 400}}>打开Modal</ThemedText>
      </Link>
      <ThemedView style={styles.content}>
        {learningItems.map((item) => (
          <Pressable
            key={item.id}
            style={styles.learningItem}
            onPress={() => handleItemPress(item)}
            android_ripple={{ color: '#e0e0e0' }}
          >
            <ThemedView style={styles.itemHeader}>
              <ThemedView style={styles.titleRow}>
                <ThemedText type="subtitle" style={styles.itemTitle}>
                  {item.title}
                </ThemedText>
                <ThemedView style={styles.badges}>
                  <ThemedView 
                    style={[styles.levelBadge, { backgroundColor: getLevelColor(item.level) }]}
                  >
                    <ThemedText style={styles.badgeText}>{item.level}</ThemedText>
                  </ThemedView>
                  <ThemedView 
                    style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}
                  >
                    <ThemedText style={styles.badgeText}>{item.status}</ThemedText>
                  </ThemedView>
                </ThemedView>
              </ThemedView>
              <ThemedText style={styles.itemDescription}>
                {item.description}
              </ThemedText>
            </ThemedView>
          </Pressable>
        ))}
      </ThemedView>

      <ThemedView style={styles.footer}>
        <ThemedText style={styles.footerText}>
          💡 提示：点击任一学习项目开始你的 React Native 学习之旅
        </ThemedText>
        <ThemedText style={styles.footerText}>
          📚 建议按照从基础到高级的顺序进行学习
        </ThemedText>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  content: {
    padding: 16,
  },
  learningItem: {
    marginBottom: 12,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  itemHeader: {
    padding: 16,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  itemTitle: {
    flex: 1,
    marginRight: 12,
  },
  itemDescription: {
    opacity: 0.7,
    lineHeight: 20,
  },
  badges: {
    flexDirection: 'row',
    gap: 6,
  },
  levelBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  footer: {
    padding: 20,
    marginTop: 20,
  },
  footerText: {
    textAlign: 'center',
    marginBottom: 8,
    opacity: 0.7,
  },
});
