import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import React, { useState } from 'react';
import {
    Alert,
    FlatList,
    Pressable,
    StyleSheet,
    TextInput,
    View
} from 'react-native';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

export default function TodoScreen() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoText, setNewTodoText] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  // 添加新待办事项
  const addTodo = () => {
    if (newTodoText.trim() === '') {
      Alert.alert('提示', '请输入待办事项内容');
      return;
    }

    const newTodo: Todo = {
      id: Date.now().toString(),
      text: newTodoText.trim(),
      completed: false,
      createdAt: new Date(),
    };

    setTodos(prev => [newTodo, ...prev]);
    setNewTodoText('');
  };

  // 切换完成状态
  const toggleTodo = (id: string) => {
    setTodos(prev => 
      prev.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // 删除待办事项
  const deleteTodo = (id: string) => {
    Alert.alert(
      '确认删除',
      '确定要删除这个待办事项吗？',
      [
        { text: '取消', style: 'cancel' },
        { 
          text: '删除', 
          style: 'destructive',
          onPress: () => {
            setTodos(prev => prev.filter(todo => todo.id !== id));
          }
        }
      ]
    );
  };

  // 清空已完成
  const clearCompleted = () => {
    const completedCount = todos.filter(todo => todo.completed).length;
    if (completedCount === 0) {
      Alert.alert('提示', '没有已完成的待办事项');
      return;
    }

    Alert.alert(
      '确认清空',
      `确定要清空 ${completedCount} 个已完成的待办事项吗？`,
      [
        { text: '取消', style: 'cancel' },
        { 
          text: '清空', 
          style: 'destructive',
          onPress: () => {
            setTodos(prev => prev.filter(todo => !todo.completed));
          }
        }
      ]
    );
  };

  // 筛选待办事项
  const filteredTodos = todos.filter(todo => {
    switch (filter) {
      case 'active':
        return !todo.completed;
      case 'completed':
        return todo.completed;
      default:
        return true;
    }
  });

  // 统计信息
  const totalCount = todos.length;
  const activeCount = todos.filter(todo => !todo.completed).length;
  const completedCount = todos.filter(todo => todo.completed).length;

  // 渲染待办事项
  const renderTodoItem = ({ item }: { item: Todo }) => (
    <Pressable
      style={[styles.todoItem, item.completed && styles.completedTodo]}
      onPress={() => toggleTodo(item.id)}
    >
      <View style={styles.todoContent}>
        <View style={styles.checkbox}>
          {item.completed && (
            <IconSymbol name="checkmark" size={16} color="#FFFFFF" />
          )}
        </View>
        <View style={styles.todoTextContainer}>
          <ThemedText 
            style={[
              styles.todoText, 
              item.completed && styles.completedTodoText
            ]}
          >
            {item.text}
          </ThemedText>
          <ThemedText style={styles.todoDate}>
            {item.createdAt.toLocaleString('zh-CN', {
              month: 'numeric',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </ThemedText>
        </View>
      </View>
      <Pressable
        style={styles.deleteButton}
        onPress={() => deleteTodo(item.id)}
      >
        <IconSymbol name="trash" size={18} color="#FF3B30" />
      </Pressable>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      {/* 头部 */}
      <ThemedView style={styles.header}>
        <ThemedText type="title">待办事项</ThemedText>
        <ThemedText style={styles.subtitle}>
          让生活更有条理 📝
        </ThemedText>
      </ThemedView>

      {/* 统计信息 */}
      <ThemedView style={styles.stats}>
        <View style={styles.statItem}>
          <ThemedText style={styles.statNumber}>{totalCount}</ThemedText>
          <ThemedText style={styles.statLabel}>总计</ThemedText>
        </View>
        <View style={styles.statItem}>
          <ThemedText style={styles.statNumber}>{activeCount}</ThemedText>
          <ThemedText style={styles.statLabel}>待完成</ThemedText>
        </View>
        <View style={styles.statItem}>
          <ThemedText style={styles.statNumber}>{completedCount}</ThemedText>
          <ThemedText style={styles.statLabel}>已完成</ThemedText>
        </View>
      </ThemedView>

      {/* 添加新待办事项 */}
      <ThemedView style={styles.addSection}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="添加新的待办事项..."
            value={newTodoText}
            onChangeText={setNewTodoText}
            onSubmitEditing={addTodo}
            returnKeyType="done"
          />
          <Pressable
            style={[styles.addButton, newTodoText.trim() === '' && styles.addButtonDisabled]}
            onPress={addTodo}
            disabled={newTodoText.trim() === ''}
          >
            <IconSymbol 
              name="plus" 
              size={20} 
              color={newTodoText.trim() === '' ? '#999' : '#FFFFFF'} 
            />
          </Pressable>
        </View>
      </ThemedView>

      {/* 筛选按钮 */}
      <View style={styles.filterContainer}>
        {[
          { key: 'all', label: '全部' },
          { key: 'active', label: '待完成' },
          { key: 'completed', label: '已完成' }
        ].map((filterOption) => (
          <Pressable
            key={filterOption.key}
            style={[
              styles.filterButton,
              filter === filterOption.key && styles.activeFilterButton
            ]}
            onPress={() => setFilter(filterOption.key as typeof filter)}
          >
            <ThemedText style={[
              styles.filterButtonText,
              filter === filterOption.key && styles.activeFilterButtonText
            ]}>
              {filterOption.label}
            </ThemedText>
          </Pressable>
        ))}
      </View>

      {/* 待办事项列表 */}
      <View style={styles.listContainer}>
        {filteredTodos.length === 0 ? (
          <ThemedView style={styles.emptyContainer}>
            <IconSymbol name="checkmark.circle" size={64} color="#E5E5E5" />
            <ThemedText style={styles.emptyText}>
              {filter === 'all' && '还没有待办事项'}
              {filter === 'active' && '没有待完成的事项'}
              {filter === 'completed' && '没有已完成的事项'}
            </ThemedText>
            <ThemedText style={styles.emptySubtext}>
              {filter === 'all' && '添加一个新的待办事项开始吧！'}
              {filter === 'active' && '太棒了！所有事项都已完成'}
              {filter === 'completed' && '完成一些待办事项来查看'}
            </ThemedText>
          </ThemedView>
        ) : (
          <FlatList
            data={filteredTodos}
            keyExtractor={(item) => item.id}
            renderItem={renderTodoItem}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>

      {/* 底部操作 */}
      {completedCount > 0 && (
        <ThemedView style={styles.bottomActions}>
          <Pressable style={styles.clearButton} onPress={clearCompleted}>
            <IconSymbol name="trash" size={16} color="#FF3B30" />
            <ThemedText style={styles.clearButtonText}>
              清空已完成 ({completedCount})
            </ThemedText>
          </Pressable>
        </ThemedView>
      )}
    </View>
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
    opacity: 0.7,
  },
  
  // Stats styles
  stats: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  statLabel: {
    fontSize: 12,
    marginTop: 4,
    opacity: 0.7,
  },
  
  // Add section styles
  addSection: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  input: {
    flex: 1,
    height: 48,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  addButton: {
    width: 48,
    height: 48,
    backgroundColor: '#007AFF',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonDisabled: {
    backgroundColor: '#E5E5E5',
  },
  
  // Filter styles
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  filterButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    marginHorizontal: 4,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
  },
  activeFilterButton: {
    backgroundColor: '#007AFF',
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  activeFilterButtonText: {
    color: '#FFFFFF',
  },
  
  // List styles
  listContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  completedTodo: {
    opacity: 0.6,
  },
  todoContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#007AFF',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007AFF',
  },
  todoTextContainer: {
    flex: 1,
  },
  todoText: {
    fontSize: 16,
    lineHeight: 20,
  },
  completedTodoText: {
    textDecorationLine: 'line-through',
  },
  todoDate: {
    fontSize: 12,
    opacity: 0.5,
    marginTop: 2,
  },
  deleteButton: {
    padding: 8,
    marginLeft: 8,
  },
  
  // Empty state styles
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 14,
    opacity: 0.7,
    marginTop: 8,
    textAlign: 'center',
  },
  
  // Bottom actions styles
  bottomActions: {
    padding: 20,
  },
  clearButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#FF3B30',
    borderRadius: 12,
    gap: 8,
  },
  clearButtonText: {
    color: '#FF3B30',
    fontWeight: '500',
  },
});
