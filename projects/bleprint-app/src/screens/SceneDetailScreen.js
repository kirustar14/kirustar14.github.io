import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Image,
  RefreshControl
} from 'react-native';
import { databaseService } from '../services/databaseService';

export default function SceneDetailScreen({ route, navigation }) {
  const { sceneId } = route.params;
  const [scene, setScene] = useState(null);
  const [captures, setCaptures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadSceneData();
  }, []);

  const loadSceneData = async () => {
    // Load scene info
    const sceneResult = await databaseService.getScene(sceneId);
    if (sceneResult.success) {
      setScene(sceneResult.scene);
      navigation.setOptions({ title: sceneResult.scene.name });
    }

    // Load captures
    const capturesResult = await databaseService.getSceneCaptures(sceneId);
    if (capturesResult.success) {
      setCaptures(capturesResult.captures);
    }

    setLoading(false);
    setRefreshing(false);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    loadSceneData();
  };

  const handleNewCapture = () => {
    navigation.navigate('Camera', { sceneId });
  };

  const handleViewAR = () => {
    if (captures.length === 0) {
      Alert.alert('No Captures', 'Take at least one photo before viewing AR overlay');
      return;
    }
    navigation.navigate('ARView', { sceneId });
  };

  const handleDeleteCapture = (captureId) => {
    Alert.alert(
      'Delete Capture',
      'Are you sure you want to delete this capture?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            const result = await databaseService.deleteCapture(captureId);
            if (result.success) {
              loadSceneData();
            } else {
              Alert.alert('Error', 'Failed to delete capture');
            }
          }
        }
      ]
    );
  };

  const renderCapture = ({ item, index }) => (
    <TouchableOpacity
      style={styles.captureCard}
      onPress={() => navigation.navigate('CaptureDetail', { 
        captureId: item.id,
        sceneId 
      })}
      onLongPress={() => handleDeleteCapture(item.id)}
    >
      <Image source={{ uri: item.imageUrl }} style={styles.captureImage} />
      <View style={styles.captureInfo}>
        <Text style={styles.captureOrder}>Capture #{index + 1}</Text>
        <Text style={styles.captureDate}>
          {new Date(item.timestamp?.seconds * 1000).toLocaleString()}
        </Text>
        {item.notes ? (
          <Text style={styles.captureNotes} numberOfLines={2}>{item.notes}</Text>
        ) : null}
        <View style={styles.anchorBadge}>
          <Text style={styles.anchorText}>
            Anchor: ({item.anchorPoint.x.toFixed(2)}, {item.anchorPoint.y.toFixed(2)})
          </Text>
        </View>
      </View>
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
      {/* Scene Info Header */}
      <View style={styles.infoHeader}>
        <Text style={styles.sceneTitle}>{scene?.name}</Text>
        <Text style={styles.captureCount}>{captures.length} captures</Text>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionBar}>
        <TouchableOpacity 
          style={[styles.actionButton, styles.captureButton]}
          onPress={handleNewCapture}
        >
          <Text style={styles.actionButtonText}>📷 New Capture</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.actionButton, styles.arButton]}
          onPress={handleViewAR}
        >
          <Text style={styles.actionButtonText}>🔍 View AR</Text>
        </TouchableOpacity>
      </View>

      {/* Captures List */}
      {captures.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No captures yet</Text>
          <Text style={styles.emptySubtext}>
            Tap "New Capture" to document construction progress
          </Text>
        </View>
      ) : (
        <FlatList
          data={captures}
          renderItem={renderCapture}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
        />
      )}
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
  infoHeader: {
    backgroundColor: '#fff',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  sceneTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  captureCount: {
    fontSize: 14,
    color: '#666',
  },
  actionBar: {
    flexDirection: 'row',
    padding: 15,
    gap: 10,
  },
  actionButton: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  captureButton: {
    backgroundColor: '#2563eb',
  },
  arButton: {
    backgroundColor: '#10b981',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  list: {
    padding: 15,
  },
  captureCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  captureImage: {
    width: '100%',
    height: 200,
    backgroundColor: '#eee',
  },
  captureInfo: {
    padding: 15,
  },
  captureOrder: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  captureDate: {
    fontSize: 12,
    color: '#999',
    marginBottom: 8,
  },
  captureNotes: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  anchorBadge: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  anchorText: {
    fontSize: 12,
    color: '#666',
    fontFamily: 'monospace',
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
});
