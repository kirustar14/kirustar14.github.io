import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  RefreshControl
} from 'react-native';
import { databaseService } from '../services/databaseService';
import { authService } from '../services/authService';

export default function ScenesScreen({ navigation }) {
  const [scenes, setScenes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadScenes();
  }, []);

  const loadScenes = async () => {
    const user = authService.getCurrentUser();
    if (!user) return;

    const result = await databaseService.getUserScenes(user.uid);
    if (result.success) {
      setScenes(result.scenes);
    } else {
      Alert.alert('Error', 'Failed to load scenes');
    }
    setLoading(false);
    setRefreshing(false);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    loadScenes();
  };

  const handleCreateScene = () => {
    Alert.prompt(
      'New Scene',
      'Enter a name for this scene/wall:',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Create',
          onPress: async (name) => {
            if (!name) return;
            
            const user = authService.getCurrentUser();
            const result = await databaseService.createScene(user.uid, {
              name,
              description: ''
            });

            if (result.success) {
              loadScenes();
            } else {
              Alert.alert('Error', 'Failed to create scene');
            }
          }
        }
      ],
      'plain-text'
    );
  };

  const handleDeleteScene = (sceneId, sceneName) => {
    Alert.alert(
      'Delete Scene',
      `Are you sure you want to delete "${sceneName}"? This will delete all associated captures.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            const result = await databaseService.deleteScene(sceneId);
            if (result.success) {
              loadScenes();
            } else {
              Alert.alert('Error', 'Failed to delete scene');
            }
          }
        }
      ]
    );
  };

  const handleSignOut = async () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Sign Out',
          onPress: async () => {
            await authService.signOut();
          }
        }
      ]
    );
  };

  const renderScene = ({ item }) => (
    <TouchableOpacity
      style={styles.sceneCard}
      onPress={() => navigation.navigate('SceneDetail', { sceneId: item.id })}
      onLongPress={() => handleDeleteScene(item.id, item.name)}
    >
      <View style={styles.sceneHeader}>
        <Text style={styles.sceneName}>{item.name}</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{item.captureCount || 0}</Text>
        </View>
      </View>
      {item.description ? (
        <Text style={styles.sceneDescription}>{item.description}</Text>
      ) : null}
      <Text style={styles.sceneDate}>
        Updated {new Date(item.updatedAt?.seconds * 1000).toLocaleDateString()}
      </Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Scenes</Text>
        <TouchableOpacity onPress={handleSignOut}>
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
      </View>

      {/* Scenes List */}
      {scenes.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No scenes yet</Text>
          <Text style={styles.emptySubtext}>
            Create a scene to start documenting construction progress
          </Text>
        </View>
      ) : (
        <FlatList
          data={scenes}
          renderItem={renderScene}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
        />
      )}

      {/* Create Scene Button */}
      <TouchableOpacity style={styles.fab} onPress={handleCreateScene}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  signOutText: {
    color: '#2563eb',
    fontSize: 16,
  },
  list: {
    padding: 15,
  },
  sceneCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sceneHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sceneName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  badge: {
    backgroundColor: '#2563eb',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  badgeText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  sceneDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  sceneDate: {
    fontSize: 12,
    color: '#999',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#999',
    marginBottom: 10,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#2563eb',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  fabText: {
    fontSize: 32,
    color: '#fff',
    fontWeight: '300',
  },
});
