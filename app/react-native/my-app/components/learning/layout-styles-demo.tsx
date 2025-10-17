import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import React, { useState } from 'react';
import {
    Dimensions,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    View,
} from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function LayoutStylesDemo() {
  const [selectedDemo, setSelectedDemo] = useState('flexbox');

  const demos = [
    { id: 'flexbox', title: 'Flexbox 布局' },
    { id: 'positioning', title: '定位布局' },
    { id: 'responsive', title: '响应式设计' },
    { id: 'styling', title: '样式技巧' },
  ];

  const renderFlexboxDemo = () => (
    <View>
      <ThemedText type="subtitle">Flexbox 基础</ThemedText>
      
      {/* 水平布局 */}
      <View style={styles.demoSection}>
        <ThemedText style={styles.demoTitle}>flexDirection: 'row'</ThemedText>
        <View style={[styles.flexContainer, { flexDirection: 'row' }]}>
          <View style={[styles.flexItem, styles.item1]} />
          <View style={[styles.flexItem, styles.item2]} />
          <View style={[styles.flexItem, styles.item3]} />
        </View>
      </View>

      {/* 垂直布局 */}
      <View style={styles.demoSection}>
        <ThemedText style={styles.demoTitle}>flexDirection: 'column'</ThemedText>
        <View style={[styles.flexContainer, { flexDirection: 'column', height: 120 }]}>
          <View style={[styles.flexItem, styles.item1]} />
          <View style={[styles.flexItem, styles.item2]} />
          <View style={[styles.flexItem, styles.item3]} />
        </View>
      </View>

      {/* justifyContent */}
      <View style={styles.demoSection}>
        <ThemedText style={styles.demoTitle}>justifyContent: 'space-between'</ThemedText>
        <View style={[styles.flexContainer, { flexDirection: 'row', justifyContent: 'space-between' }]}>
          <View style={[styles.flexItem, styles.item1]} />
          <View style={[styles.flexItem, styles.item2]} />
          <View style={[styles.flexItem, styles.item3]} />
        </View>
      </View>

      {/* alignItems */}
      <View style={styles.demoSection}>
        <ThemedText style={styles.demoTitle}>alignItems: 'center'</ThemedText>
        <View style={[styles.flexContainer, { flexDirection: 'row', alignItems: 'center', height: 80 }]}>
          <View style={[styles.flexItem, styles.item1, { height: 30 }]} />
          <View style={[styles.flexItem, styles.item2, { height: 50 }]} />
          <View style={[styles.flexItem, styles.item3, { height: 40 }]} />
        </View>
      </View>

      {/* flex 属性 */}
      <View style={styles.demoSection}>
        <ThemedText style={styles.demoTitle}>flex 属性 (1:2:1)</ThemedText>
        <View style={[styles.flexContainer, { flexDirection: 'row' }]}>
          <View style={[styles.flexItem, styles.item1, { flex: 1 }]} />
          <View style={[styles.flexItem, styles.item2, { flex: 2 }]} />
          <View style={[styles.flexItem, styles.item3, { flex: 1 }]} />
        </View>
      </View>
    </View>
  );

  const renderPositioningDemo = () => (
    <View>
      <ThemedText type="subtitle">定位系统</ThemedText>
      
      {/* 相对定位 */}
      <View style={styles.demoSection}>
        <ThemedText style={styles.demoTitle}>相对定位 (position: 'relative')</ThemedText>
        <View style={styles.positionContainer}>
          <View style={[styles.positionItem, styles.relativeItem]}>
            <ThemedText style={styles.positionText}>相对定位</ThemedText>
          </View>
        </View>
      </View>

      {/* 绝对定位 */}
      <View style={styles.demoSection}>
        <ThemedText style={styles.demoTitle}>绝对定位 (position: 'absolute')</ThemedText>
        <View style={styles.positionContainer}>
          <View style={[styles.positionItem, styles.absoluteItem1]}>
            <ThemedText style={styles.positionText}>左上</ThemedText>
          </View>
          <View style={[styles.positionItem, styles.absoluteItem2]}>
            <ThemedText style={styles.positionText}>右下</ThemedText>
          </View>
        </View>
      </View>

      {/* 层级 */}
      <View style={styles.demoSection}>
        <ThemedText style={styles.demoTitle}>层级 (zIndex)</ThemedText>
        <View style={styles.positionContainer}>
          <View style={[styles.overlayItem, styles.overlay1]}>
            <ThemedText style={styles.positionText}>层级 1</ThemedText>
          </View>
          <View style={[styles.overlayItem, styles.overlay2]}>
            <ThemedText style={styles.positionText}>层级 2</ThemedText>
          </View>
        </View>
      </View>
    </View>
  );

  const renderResponsiveDemo = () => (
    <View>
      <ThemedText type="subtitle">响应式设计</ThemedText>
      
      <View style={styles.demoSection}>
        <ThemedText style={styles.demoTitle}>屏幕信息</ThemedText>
        <ThemedText>屏幕宽度: {screenWidth}px</ThemedText>
        <ThemedText>屏幕高度: {screenHeight}px</ThemedText>
        <ThemedText>平台: {Platform.OS}</ThemedText>
      </View>

      {/* 百分比布局 */}
      <View style={styles.demoSection}>
        <ThemedText style={styles.demoTitle}>百分比宽度</ThemedText>
        <View style={styles.responsiveContainer}>
          <View style={[styles.responsiveItem, { width: '100%', backgroundColor: '#FF6B6B' }]}>
            <ThemedText style={styles.responsiveText}>100%</ThemedText>
          </View>
          <View style={[styles.responsiveItem, { width: '75%', backgroundColor: '#4ECDC4' }]}>
            <ThemedText style={styles.responsiveText}>75%</ThemedText>
          </View>
          <View style={[styles.responsiveItem, { width: '50%', backgroundColor: '#45B7D1' }]}>
            <ThemedText style={styles.responsiveText}>50%</ThemedText>
          </View>
          <View style={[styles.responsiveItem, { width: '25%', backgroundColor: '#96CEB4' }]}>
            <ThemedText style={styles.responsiveText}>25%</ThemedText>
          </View>
        </View>
      </View>

      {/* 断点设计 */}
      <View style={styles.demoSection}>
        <ThemedText style={styles.demoTitle}>断点设计</ThemedText>
        <View style={styles.breakpointContainer}>
          {screenWidth > 768 ? (
            <ThemedText>大屏幕布局 (平板/桌面)</ThemedText>
          ) : (
            <ThemedText>小屏幕布局 (手机)</ThemedText>
          )}
        </View>
      </View>
    </View>
  );

  const renderStylingDemo = () => (
    <View>
      <ThemedText type="subtitle">样式技巧</ThemedText>
      
      {/* 圆角和阴影 */}
      <View style={styles.demoSection}>
        <ThemedText style={styles.demoTitle}>圆角和阴影</ThemedText>
        <View style={styles.cardContainer}>
          <View style={styles.card}>
            <ThemedText style={styles.cardText}>圆角卡片</ThemedText>
          </View>
          <View style={styles.shadowCard}>
            <ThemedText style={styles.cardText}>阴影卡片</ThemedText>
          </View>
        </View>
      </View>

      {/* 边框样式 */}
      <View style={styles.demoSection}>
        <ThemedText style={styles.demoTitle}>边框样式</ThemedText>
        <View style={styles.borderContainer}>
          <View style={styles.solidBorder}>
            <ThemedText style={styles.borderText}>实线边框</ThemedText>
          </View>
          <View style={styles.dashedBorder}>
            <ThemedText style={styles.borderText}>虚线边框</ThemedText>
          </View>
        </View>
      </View>

      {/* 渐变效果 */}
      <View style={styles.demoSection}>
        <ThemedText style={styles.demoTitle}>背景效果</ThemedText>
        <View style={styles.gradientContainer}>
          <View style={styles.gradientBox1}>
            <ThemedText style={styles.gradientText}>渐变背景 1</ThemedText>
          </View>
          <View style={styles.gradientBox2}>
            <ThemedText style={styles.gradientText}>渐变背景 2</ThemedText>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title">布局和样式系统</ThemedText>
        <ThemedText style={styles.subtitle}>
          掌握 React Native 中的布局和样式技巧
        </ThemedText>
      </ThemedView>

      {/* 选项卡 */}
      <View style={styles.tabContainer}>
        {demos.map((demo) => (
          <Pressable
            key={demo.id}
            style={[
              styles.tab,
              selectedDemo === demo.id && styles.activeTab
            ]}
            onPress={() => setSelectedDemo(demo.id)}
          >
            <ThemedText style={[
              styles.tabText,
              selectedDemo === demo.id && styles.activeTabText
            ]}>
              {demo.title}
            </ThemedText>
          </Pressable>
        ))}
      </View>

      {/* 内容区域 */}
      <ThemedView style={styles.content}>
        {selectedDemo === 'flexbox' && renderFlexboxDemo()}
        {selectedDemo === 'positioning' && renderPositioningDemo()}
        {selectedDemo === 'responsive' && renderResponsiveDemo()}
        {selectedDemo === 'styling' && renderStylingDemo()}
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
  
  // Tab styles
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#007AFF',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
  },
  activeTabText: {
    color: '#007AFF',
    fontWeight: '600',
  },
  
  // Content styles
  content: {
    padding: 16,
  },
  demoSection: {
    marginBottom: 24,
  },
  demoTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  
  // Flexbox demo styles
  flexContainer: {
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 8,
    padding: 8,
    minHeight: 60,
  },
  flexItem: {
    minWidth: 60,
    minHeight: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    margin: 2,
  },
  item1: {
    backgroundColor: '#FF6B6B',
  },
  item2: {
    backgroundColor: '#4ECDC4',
  },
  item3: {
    backgroundColor: '#45B7D1',
  },
  
  // Position demo styles
  positionContainer: {
    height: 120,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    position: 'relative',
  },
  positionItem: {
    width: 80,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  positionText: {
    fontSize: 12,
    fontWeight: '600',
    color: 'white',
  },
  relativeItem: {
    backgroundColor: '#FF6B6B',
    position: 'relative',
    top: 20,
    left: 20,
  },
  absoluteItem1: {
    backgroundColor: '#4ECDC4',
    position: 'absolute',
    top: 10,
    left: 10,
  },
  absoluteItem2: {
    backgroundColor: '#45B7D1',
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  
  // Overlay styles
  overlayItem: {
    width: 100,
    height: 60,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  overlay1: {
    backgroundColor: '#FF6B6B',
    top: 20,
    left: 20,
    zIndex: 1,
  },
  overlay2: {
    backgroundColor: '#4ECDC4',
    top: 40,
    left: 40,
    zIndex: 2,
  },
  
  // Responsive demo styles
  responsiveContainer: {
    gap: 8,
  },
  responsiveItem: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  responsiveText: {
    color: 'white',
    fontWeight: '600',
  },
  breakpointContainer: {
    padding: 16,
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    alignItems: 'center',
  },
  
  // Card styles
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  card: {
    width: 120,
    height: 80,
    backgroundColor: '#4ECDC4',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shadowCard: {
    width: 120,
    height: 80,
    backgroundColor: '#FF6B6B',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  cardText: {
    color: 'white',
    fontWeight: '600',
  },
  
  // Border styles
  borderContainer: {
    gap: 16,
  },
  solidBorder: {
    padding: 16,
    borderWidth: 2,
    borderColor: '#007AFF',
    borderRadius: 8,
    alignItems: 'center',
  },
  dashedBorder: {
    padding: 16,
    borderWidth: 2,
    borderColor: '#FF6B35',
    borderStyle: 'dashed',
    borderRadius: 8,
    alignItems: 'center',
  },
  borderText: {
    fontWeight: '600',
  },
  
  // Gradient styles
  gradientContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  gradientBox1: {
    width: 120,
    height: 80,
    backgroundColor: '#667eea',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  gradientBox2: {
    width: 120,
    height: 80,
    backgroundColor: '#f093fb',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  gradientText: {
    color: 'white',
    fontWeight: '600',
  },
});
