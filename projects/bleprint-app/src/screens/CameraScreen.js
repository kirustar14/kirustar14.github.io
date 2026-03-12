import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Dimensions,
  Image
} from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { databaseService } from '../services/databaseService';
import { arService } from '../services/arService';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function CameraScreen({ route, navigation }) {
  const { sceneId } = route.params;
  const [permission, requestPermission] = useCameraPermissions();
  const [capturedImage, setCapturedImage] = useState(null);
  const [selectedAnchor, setSelectedAnchor] = useState(null);
  const [anchorPoints, setAnchorPoints] = useState([]);
  const [saving, setSaving] = useState(false);
  const cameraRef = useRef(null);

  useEffect(() => {
    if (capturedImage) {
      // Generate anchor point suggestions
      const points = arService.generateEdgeAnchorPoints();
      setAnchorPoints(points);
    }
  }, [capturedImage]);

  if (!permission) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.permissionText}>Camera permission required</Text>
        <TouchableOpacity style={styles.button} onPress={requestPermission}>
          <Text style={styles.buttonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleTakePhoto = async () => {
    if (!cameraRef.current) return;

    try {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.8,
      });
      setCapturedImage(photo.uri);
    } catch (error) {
      Alert.alert('Error', 'Failed to take photo');
      console.error(error);
    }
  };

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 0.8,
    });

    if (!result.canceled) {
      setCapturedImage(result.assets[0].uri);
    }
  };

  const handleAnchorSelection = (anchor) => {
    setSelectedAnchor(anchor);
  };

  const handleSave = async () => {
    if (!selectedAnchor) {
      Alert.alert('Select Anchor Point', 'Please select an anchor point before saving');
      return;
    }

    Alert.prompt(
      'Add Notes (Optional)',
      'Add any notes about this capture:',
      [
        { text: 'Skip', onPress: () => saveCapture('') },
        {
          text: 'Save',
          onPress: (notes) => saveCapture(notes || '')
        }
      ],
      'plain-text'
    );
  };

  const saveCapture = async (notes) => {
    setSaving(true);

    // Get capture order
    const capturesResult = await databaseService.getSceneCaptures(sceneId);
    const captureOrder = capturesResult.success ? capturesResult.captures.length : 0;

    const result = await databaseService.createCapture(
      sceneId,
      {
        anchorPoint: { x: selectedAnchor.x, y: selectedAnchor.y },
        notes,
        captureOrder
      },
      capturedImage
    );

    setSaving(false);

    if (result.success) {
      Alert.alert('Success', 'Capture saved successfully', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } else {
      Alert.alert('Error', 'Failed to save capture');
    }
  };

  const handleRetake = () => {
    setCapturedImage(null);
    setSelectedAnchor(null);
    setAnchorPoints([]);
  };

  // Preview mode - show captured image with anchor point selection
  if (capturedImage) {
    return (
      <View style={styles.container}>
        {/* Image Preview */}
        <View style={styles.previewContainer}>
          <Image source={{ uri: capturedImage }} style={styles.previewImage} />
          
          {/* Anchor Points Overlay */}
          <View style={styles.anchorOverlay}>
            {anchorPoints.map((point) => {
              const isSelected = selectedAnchor?.id === point.id;
              return (
                <TouchableOpacity
                  key={point.id}
                  style={[
                    styles.anchorPoint,
                    {
                      left: `${point.x * 100}%`,
                      top: `${point.y * 100}%`,
                    },
                    isSelected && styles.anchorPointSelected
                  ]}
                  onPress={() => handleAnchorSelection(point)}
                >
                  <View style={[styles.anchorDot, isSelected && styles.anchorDotSelected]} />
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Instructions */}
        <View style={styles.instructionsContainer}>
          <Text style={styles.instructionsTitle}>Select Anchor Point</Text>
          <Text style={styles.instructionsText}>
            Choose a point that will remain stable and visible in future photos
            (e.g., corner of wall, edge of fixture, structural element)
          </Text>
          {selectedAnchor && (
            <Text style={styles.selectedText}>
              ✓ Selected: {selectedAnchor.label}
            </Text>
          )}
        </View>

        {/* Action Buttons */}
        <View style={styles.previewActions}>
          <TouchableOpacity 
            style={[styles.actionButton, styles.retakeButton]}
            onPress={handleRetake}
          >
            <Text style={styles.actionButtonText}>Retake</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.actionButton, styles.saveButton]}
            onPress={handleSave}
            disabled={saving || !selectedAnchor}
          >
            {saving ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.actionButtonText}>Save</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // Camera mode
  return (
    <View style={styles.container}>
      <CameraView 
        style={styles.camera}
        ref={cameraRef}
        facing="back"
      >
        <View style={styles.cameraOverlay}>
          {/* Header */}
          <View style={styles.cameraHeader}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.backButton}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* Bottom Controls */}
          <View style={styles.cameraControls}>
            <TouchableOpacity onPress={handlePickImage}>
              <Text style={styles.controlButton}>📁</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.captureButton} onPress={handleTakePhoto}>
              <View style={styles.captureButtonInner} />
            </TouchableOpacity>

            <View style={{ width: 60 }} />
          </View>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  permissionText: {
    fontSize: 18,
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  camera: {
    flex: 1,
  },
  cameraOverlay: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  cameraHeader: {
    padding: 20,
    paddingTop: 60,
  },
  backButton: {
    fontSize: 32,
    color: '#fff',
    fontWeight: '300',
  },
  cameraControls: {
    position: 'absolute',
    bottom: 40,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
  },
  controlButton: {
    fontSize: 32,
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButtonInner: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#fff',
  },
  previewContainer: {
    flex: 1,
    position: 'relative',
  },
  previewImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  anchorOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  anchorPoint: {
    position: 'absolute',
    width: 44,
    height: 44,
    marginLeft: -22,
    marginTop: -22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  anchorDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderWidth: 2,
    borderColor: '#2563eb',
  },
  anchorPointSelected: {
    transform: [{ scale: 1.3 }],
  },
  anchorDotSelected: {
    backgroundColor: '#2563eb',
  },
  instructionsContainer: {
    backgroundColor: '#fff',
    padding: 20,
  },
  instructionsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  instructionsText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  selectedText: {
    fontSize: 16,
    color: '#10b981',
    fontWeight: '600',
    marginTop: 12,
  },
  previewActions: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: '#fff',
    gap: 10,
  },
  actionButton: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  retakeButton: {
    backgroundColor: '#6b7280',
  },
  saveButton: {
    backgroundColor: '#2563eb',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
