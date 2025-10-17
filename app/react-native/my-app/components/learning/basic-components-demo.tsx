import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import React, { useState } from 'react';
import {
    Alert,
    Button,
    Image,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TouchableHighlight,
    TouchableOpacity,
    View,
} from 'react-native';

export default function BasicComponentsDemo() {
  const [switchValue, setSwitchValue] = useState(false);
  const [pressCount, setPressCount] = useState(0);

  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.section}>
        <ThemedText type="title">基础组件示例</ThemedText>
        <ThemedText style={styles.sectionDescription}>
          学习 React Native 中最常用的基础组件
        </ThemedText>
      </ThemedView>

      {/* Text 组件 */}
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle">1. Text 组件</ThemedText>
        <ThemedText>这是普通文本</ThemedText>
        <ThemedText style={styles.boldText}>这是加粗文本</ThemedText>
        <ThemedText style={styles.colorText}>这是彩色文本</ThemedText>
        <ThemedText numberOfLines={2}>
          这是一个很长的文本，用来演示 numberOfLines 属性的效果。
          这个文本会被截断，只显示两行内容，超出的部分用省略号表示。
        </ThemedText>
      </ThemedView>

      {/* View 组件 */}
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle">2. View 组件</ThemedText>
        <View style={styles.viewDemo}>
          <View style={[styles.box, styles.redBox]}>
            <Text style={styles.boxText}>红色盒子</Text>
          </View>
          <View style={[styles.box, styles.blueBox]}>
            <Text style={styles.boxText}>蓝色盒子</Text>
          </View>
          <View style={[styles.box, styles.greenBox]}>
            <Text style={styles.boxText}>绿色盒子</Text>
          </View>
        </View>
      </ThemedView>

      {/* Button 组件 */}
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle">3. Button 组件</ThemedText>
        <View style={styles.buttonContainer}>
          <Button 
            title="普通按钮" 
            onPress={() => Alert.alert('提示', '你点击了普通按钮')} 
          />
          <Button 
            title="禁用按钮" 
            onPress={() => {}} 
            disabled={true}
          />
          <Button 
            title="彩色按钮" 
            color="#FF6B35"
            onPress={() => Alert.alert('提示', '你点击了彩色按钮')} 
          />
        </View>
      </ThemedView>

      {/* TouchableOpacity */}
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle">4. TouchableOpacity</ThemedText>
        <TouchableOpacity 
          style={styles.touchableButton}
          onPress={() => setPressCount(prev => prev + 1)}
          activeOpacity={0.7}
        >
          <Text style={styles.touchableButtonText}>
            点击我 (已点击 {pressCount} 次)
          </Text>
        </TouchableOpacity>
      </ThemedView>

      {/* TouchableHighlight */}
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle">5. TouchableHighlight</ThemedText>
        <TouchableHighlight
          style={styles.touchableButton}
          onPress={() => Alert.alert('TouchableHighlight', '高亮效果按钮')}
          underlayColor="#DDDDDD"
        >
          <Text style={styles.touchableButtonText}>高亮效果按钮</Text>
        </TouchableHighlight>
      </ThemedView>

      {/* Pressable */}
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle">6. Pressable (推荐)</ThemedText>
        <Pressable
          style={({ pressed }) => [
            styles.pressableButton,
            pressed && styles.pressableButtonPressed
          ]}
          onPress={() => Alert.alert('Pressable', '现代化的按钮组件')}
        >
          {({ pressed }) => (
            <Text style={styles.touchableButtonText}>
              {pressed ? '按下中...' : 'Pressable 按钮'}
            </Text>
          )}
        </Pressable>
      </ThemedView>

      {/* Image 组件 */}
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle">7. Image 组件</ThemedText>
        <View style={styles.imageContainer}>
          <Image
            source={require('@/assets/images/react-logo.png')}
            style={styles.localImage}
            resizeMode="contain"
          />
          <Image
            source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
            style={styles.networkImage}
            defaultSource={require('@/assets/images/favicon.png')}
          />
        </View>
        <ThemedText style={styles.imageDescription}>
          左：本地图片，右：网络图片
        </ThemedText>
      </ThemedView>

      {/* Switch 组件 */}
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle">8. Switch 开关</ThemedText>
        <View style={styles.switchContainer}>
          <ThemedText>开关状态: {switchValue ? '开启' : '关闭'}</ThemedText>
          <Switch
            value={switchValue}
            onValueChange={setSwitchValue}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={switchValue ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
          />
        </View>
      </ThemedView>

      {/* 平台特定组件 */}
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle">9. 平台检测</ThemedText>
        <ThemedText>当前平台: {Platform.OS}</ThemedText>
        <ThemedText>
          {Platform.select({
            ios: '这是 iOS 平台',
            android: '这是 Android 平台',
            web: '这是 Web 平台',
            default: '未知平台'
          })}
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.footer}>
        <ThemedText style={styles.footerText}>
          🎉 恭喜！你已经学习了 React Native 的基础组件
        </ThemedText>
        <ThemedText style={styles.footerText}>
          💡 下一步：尝试组合这些组件创建自己的界面
        </ThemedText>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
    padding: 16,
    borderRadius: 12,
  },
  sectionDescription: {
    marginTop: 8,
    opacity: 0.7,
  },
  
  // Text styles
  boldText: {
    fontWeight: 'bold',
    marginTop: 8,
  },
  colorText: {
    color: '#FF6B35',
    fontSize: 16,
    marginTop: 8,
  },
  
  // View styles
  viewDemo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  box: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  redBox: {
    backgroundColor: '#FF6B6B',
  },
  blueBox: {
    backgroundColor: '#4ECDC4',
  },
  greenBox: {
    backgroundColor: '#45B7D1',
  },
  boxText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 12,
  },
  
  // Button styles
  buttonContainer: {
    gap: 12,
    marginTop: 12,
  },
  
  // Touchable styles
  touchableButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    marginTop: 12,
    alignItems: 'center',
  },
  touchableButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  
  // Pressable styles
  pressableButton: {
    backgroundColor: '#34D399',
    padding: 16,
    borderRadius: 8,
    marginTop: 12,
    alignItems: 'center',
  },
  pressableButtonPressed: {
    backgroundColor: '#059669',
    transform: [{ scale: 0.95 }],
  },
  
  // Image styles
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 12,
  },
  localImage: {
    width: 80,
    height: 80,
  },
  networkImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  imageDescription: {
    textAlign: 'center',
    marginTop: 8,
    fontSize: 12,
    opacity: 0.7,
  },
  
  // Switch styles
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  
  // Footer styles
  footer: {
    marginTop: 32,
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    textAlign: 'center',
    marginBottom: 8,
  },
});
