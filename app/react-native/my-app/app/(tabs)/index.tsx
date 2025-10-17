import { Image } from 'expo-image';
import { Platform, Pressable, StyleSheet, View } from 'react-native';

import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  const features = [
    {
      icon: 'book.fill',
      title: '系统学习',
      description: '从基础到进阶，系统化的学习路线',
      color: '#007AFF'
    },
    {
      icon: 'checkmark.circle.fill', 
      title: '实践项目',
      description: '完整的待办事项应用示例',
      color: '#34D399'
    },
    {
      icon: 'globe',
      title: 'API 集成',
      description: '网络请求和数据处理示例',
      color: '#F59E0B'
    },
    {
      icon: 'paintbrush.fill',
      title: '现代 UI',
      description: '美观的界面和流畅的交互',
      color: '#EF4444'
    }
  ];

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">React Native 学习中心</ThemedText>
        <HelloWave />
      </ThemedView>

      <ThemedView style={styles.introContainer}>
        <ThemedText style={styles.introText}>
          欢迎来到 React Native 学习项目！这里为前端开发者提供了系统的移动端开发学习路线和实践案例。
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.featuresContainer}>
        <ThemedText type="subtitle" style={styles.featuresTitle}>
          🚀 项目特色
        </ThemedText>
        
        <View style={styles.featuresGrid}>
          {features.map((feature, index) => (
            <ThemedView key={index} style={styles.featureCard}>
              <View style={[styles.featureIcon, { backgroundColor: feature.color }]}>
                <IconSymbol name={feature.icon as any} size={24} color="#FFFFFF" />
              </View>
              <ThemedText style={styles.featureTitle}>{feature.title}</ThemedText>
              <ThemedText style={styles.featureDescription}>
                {feature.description}
              </ThemedText>
            </ThemedView>
          ))}
        </View>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">📚 开始学习</ThemedText>
        <ThemedText style={styles.stepText}>
          点击下方的 <ThemedText type="defaultSemiBold">Learning</ThemedText> 标签开始你的学习之旅，
          或者直接体验 <ThemedText type="defaultSemiBold">Todo</ThemedText> 应用来了解完整的项目结构。
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">🛠️ 技术栈</ThemedText>
        <View style={styles.techStack}>
          <View style={styles.techItem}>
            <ThemedText style={styles.techName}>React Native</ThemedText>
            <ThemedText style={styles.techVersion}>0.81</ThemedText>
          </View>
          <View style={styles.techItem}>
            <ThemedText style={styles.techName}>Expo SDK</ThemedText>
            <ThemedText style={styles.techVersion}>54</ThemedText>
          </View>
          <View style={styles.techItem}>
            <ThemedText style={styles.techName}>TypeScript</ThemedText>
            <ThemedText style={styles.techVersion}>5.9</ThemedText>
          </View>
          <View style={styles.techItem}>
            <ThemedText style={styles.techName}>Expo Router</ThemedText>
            <ThemedText style={styles.techVersion}>6</ThemedText>
          </View>
        </View>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">🎯 学习目标</ThemedText>
        <View style={styles.goalsList}>
          <View style={styles.goalItem}>
            <IconSymbol name="checkmark.circle" size={16} color="#34D399" />
            <ThemedText style={styles.goalText}>掌握 React Native 基础组件</ThemedText>
          </View>
          <View style={styles.goalItem}>
            <IconSymbol name="checkmark.circle" size={16} color="#34D399" />
            <ThemedText style={styles.goalText}>理解移动端布局和样式系统</ThemedText>
          </View>
          <View style={styles.goalItem}>
            <IconSymbol name="checkmark.circle" size={16} color="#34D399" />
            <ThemedText style={styles.goalText}>学会状态管理和数据流</ThemedText>
          </View>
          <View style={styles.goalItem}>
            <IconSymbol name="checkmark.circle" size={16} color="#34D399" />
            <ThemedText style={styles.goalText}>掌握网络请求和 API 集成</ThemedText>
          </View>
        </View>
      </ThemedView>

      <ThemedView style={styles.ctaContainer}>
        <Pressable 
          style={styles.ctaButton}
          onPress={() => router.push('/(tabs)/learning')}
        >
          <IconSymbol name="play.fill" size={20} color="#FFFFFF" />
          <ThemedText style={styles.ctaButtonText}>开始学习</ThemedText>
        </Pressable>
        
        <ThemedText style={styles.debugInfo}>
          调试工具快捷键:{' '}
          <ThemedText type="defaultSemiBold">
            {Platform.select({
              ios: 'cmd + d',
              android: 'cmd + m', 
              web: 'F12',
            })}
          </ThemedText>
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 16,
    padding: 16,
  },
  stepText: {
    lineHeight: 20,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  
  // Intro section
  introContainer: {
    padding: 20,
    marginBottom: 8,
  },
  introText: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    opacity: 0.8,
  },
  
  // Features section
  featuresContainer: {
    padding: 16,
    marginBottom: 8,
  },
  featuresTitle: {
    marginBottom: 16,
    textAlign: 'center',
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  featureCard: {
    flex: 1,
    minWidth: '45%',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    textAlign: 'center',
  },
  featureDescription: {
    fontSize: 12,
    textAlign: 'center',
    opacity: 0.7,
    lineHeight: 16,
  },
  
  // Tech stack
  techStack: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 12,
  },
  techItem: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#F5F5F5',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  techName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  techVersion: {
    fontSize: 12,
    opacity: 0.7,
  },
  
  // Goals list
  goalsList: {
    marginTop: 12,
    gap: 8,
  },
  goalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  goalText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
  },
  
  // CTA section
  ctaContainer: {
    padding: 20,
    alignItems: 'center',
    gap: 16,
  },
  ctaButton: {
    flexDirection: 'row',
    backgroundColor: '#007AFF',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    gap: 8,
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  ctaButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  debugInfo: {
    fontSize: 12,
    opacity: 0.6,
    textAlign: 'center',
  },
});
