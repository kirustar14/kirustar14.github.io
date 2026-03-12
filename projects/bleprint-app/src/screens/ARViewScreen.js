import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Dimensions,
  Image,
  ScrollView
} from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { databaseService } from '../services/databaseService';
import { arService } from '../services/arService';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function ARViewScreen({ route, navigation }) {
  const { sceneId } = route.params;
  const [permission, requestPermission] = useCameraPermissions();
  const [captures, setCaptures] = useState([]);
  const [selectedCapture, setSelectedCapture] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);
  const [currentAnchor, setCurrentAnchor] = useState(null);
  const [anchorPoints, setAnchorPoints] = useState([]);
  const [showOverlay, setShowOverlay] = useState(false);
  const cameraRef = useRef(null);

  useEffect(() => {
    loadCaptures();
  }, []);

  const loadCaptures = async () => {
    const result = await databaseService.getSceneCaptures(sceneId);
    if (result.success && result.captures.length > 0) {
      setCaptures(result.captures);
      setSelectedCapture(result.captures[0]);
    } else {
      Alert.alert('No Captures', 'No previous captures to overlay');
      navigation.goBack();
    }
  };

  const handleTakeSnapshot = async () => {
    if (!cameraRef.current) return;

    try {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.8,
      });
      setCurrentImage(photo.uri);
      
      // Generate anchor points for current view
      const points = arService.generateEdgeAnchorPoints();
      setAnchorPoints(points);
    } catch (error) {
      Alert.alert('Error', 'Failed to take snapshot');
      console.error(error);
    }
  };

  const handleAnchorSelection = (anchor) => {
    setCurrentAnchor(anchor);
    setShowOverlay(true);
  };

  const handleRetake = () => {
    setCurrentImage(null);
    setCurrentAnchor(null);
    setShowOverlay(false);
  };

  if (!permission?.granted) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.permissionText}>Camera permission required</Text>
        <TouchableOpacity style={styles.button} onPress={requestPermission}>
          <Text style={styles.buttonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // AR Overlay Mode - showing current image with overlay
  if (currentImage && showOverlay && selectedCapture) {
    const transform = arService.calculateOverlayTransform(
      currentAnchor,
      selectedCapture.anchorPoint,
      { width: SCREEN_WIDTH, height: SCREEN_WIDTH * 1.33 },
      { width: SCREEN_WIDTH, height: SCREEN_WIDTH * 1.33 }
    );

    return (
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleRetake}>
            <Text style={styles.backButton}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>AR Overlay</Text>
          <View style={{ width: 60 }} />
        </View>

        {/* AR View */}
        <View style={styles.arContainer}>
          {/* Current Image */}
          <Image source={{ uri: currentImage }} style={styles.baseImage} />
          
          {/* Overlaid Previous Capture */}
          <View style={styles.overlayContainer}>
            <Image 
              source={{ uri: selectedCapture.imageUrl }} 
              style={[
                styles.overlayImage,
                {
                  opacity: transform.opacity,
                  transform: [
                    { translateX: transform.translateX },
                    { translateY: transform.translateY },
                  ]
                }
              ]} 
            />
          </View>

          {/* Alignment Indicator */}
          <View style={styles.alignmentIndicator}>
            <Text style={styles.alignmentText}>
              {arService.calculateAlignmentScore(currentAnchor, selectedCapture.anchorPoint)}% aligned
            </Text>
          </View>
        </View>

        {/* Info Panel */}
        <View style={styles.infoPanel}>
          <Text style={styles.infoPanelTitle}>Viewing Hidden Infrastructure</Text>
          <Text style={styles.infoPanelText}>
            Red overlay shows what's behind this wall based on capture from{' '}
            {new Date(selectedCapture.timestamp?.seconds * 1000).toLocaleDateString()}
          </Text>
          {selectedCapture.notes && (
            <Text style={styles.notesText}>Note: {selectedCapture.notes}</Text>
          )}
        </View>

        {/* Controls */}
        <View style={styles.controls}>
          <TouchableOpacity 
            style={styles.controlButton}
            onPress={handleRetake}
          >
            <Text style={styles.controlButtonText}>New Snapshot</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // Anchor Selection Mode
  if (currentImage) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleRetake}>
            <Text style={styles.backButton}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Select Current Anchor</Text>
          <View style={{ width: 60 }} />
        </View>

        <View style={styles.previewContainer}>
          <Image source={{ uri: currentImage }} style={styles.previewImage} />
          
          <View style={styles.anchorOverlay}>
            {anchorPoints.map((point) => (
              <TouchableOpacity
                key={point.id}
                style={[
                  styles.anchorPoint,
                  {
                    left: `${point.x * 100}%`,
                    top: `${point.y * 100}%`,
                  }
                ]}
                onPress={() => handleAnchorSelection(point)}
              >
                <View style={styles.anchorDot} />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.instructionsContainer}>
          <Text style={styles.instructionsTitle}>Align with Reference</Text>
          <Text style={styles.instructionsText}>
            Select the anchor point that matches the reference capture below
          </Text>
          
          {/* Reference Capture */}
          <View style={styles.referenceContainer}>
            <Text style={styles.referenceLabel}>Reference Capture:</Text>
            <Image 
              source={{ uri: selectedCapture.imageUrl }} 
              style={styles.referenceThumbnail} 
            />
            <View style={styles.referenceAnchor}>
              <View 
                style={[
                  styles.referenceDot,
                  {
                    left: `${selectedCapture.anchorPoint.x * 100}%`,
                    top: `${selectedCapture.anchorPoint.y * 100}%`,
                  }
                ]} 
              />
            </View>
          </View>
        </View>
      </View>
    );
  }

  // Camera Mode - live view
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>AR View</Text>
        <View style={{ width: 60 }} />
      </View>

      <CameraView 
        style={styles.camera}
        ref={cameraRef}
        facing="back"
      >
        <View style={styles.cameraOverlay}>
          <View style={styles.instructionsBanner}>
            <Text style={styles.instructionsBannerText}>
              Point camera at wall and take snapshot
            </Text>
          </View>

          <View style={styles.bottomControls}>
            <TouchableOpacity 
              style={styles.snapshotButton}
              onPress={handleTakeSnapshot}
            >
              <Text style={styles.snapshotButtonText}>Take Snapshot</Text>
            </TouchableOpacity>
          </View>
        </View>
      </CameraView>

      {/* Capture Selection */}
      <View style={styles.captureSelector}>
        <Text style={styles.selectorTitle}>Select Reference Capture:</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {captures.map((capture, index) => (
            <TouchableOpacity
              key={capture.id}
              style={[
                styles.captureThumbnail,
                selectedCapture?.id === capture.id && styles.captureThumbnailSelected
              ]}
              onPress={() => setSelectedCapture(capture)}
            >
              <Image 
                source={{ uri: capture.imageUrl }} 
                style={styles.thumbnailImage} 
              />
              <Text style={styles.thumbnailLabel}>#{index + 1}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
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
    backgroundColor: '#fff',
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  backButton: {
    color: '#fff',
    fontSize: 16,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  camera: {
    flex: 1,
  },
  cameraOverlay: {
    flex: 1,
  },
  instructionsBanner: {
    backgroundColor: 'rgba(37, 99, 235, 0.9)',
    padding: 15,
    marginTop: 20,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  instructionsBannerText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600',
  },
  bottomControls: {
    position: 'absolute',
    bottom: 140,
    width: '100%',
    alignItems: 'center',
  },
  snapshotButton: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 25,
  },
  snapshotButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  captureSelector: {
    backgroundColor: '#1f1f1f',
    padding: 15,
  },
  selectorTitle: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 10,
  },
  captureThumbnail: {
    marginRight: 10,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  captureThumbnailSelected: {
    borderColor: '#2563eb',
  },
  thumbnailImage: {
    width: 80,
    height: 80,
  },
  thumbnailLabel: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    color: '#fff',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    fontSize: 12,
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
    marginBottom: 15,
  },
  referenceContainer: {
    marginTop: 10,
  },
  referenceLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  referenceThumbnail: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    backgroundColor: '#eee',
  },
  referenceAnchor: {
    position: 'absolute',
    top: 28,
    left: 0,
    right: 0,
    bottom: 0,
  },
  referenceDot: {
    position: 'absolute',
    width: 16,
    height: 16,
    marginLeft: -8,
    marginTop: -8,
    borderRadius: 8,
    backgroundColor: '#10b981',
    borderWidth: 2,
    borderColor: '#fff',
  },
  arContainer: {
    flex: 1,
    position: 'relative',
  },
  baseImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  overlayContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  overlayImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    tintColor: 'rgba(255, 0, 0, 0.5)',
  },
  alignmentIndicator: {
    position: 'absolute',
    top: 20,
    alignSelf: 'center',
    backgroundColor: 'rgba(16, 185, 129, 0.9)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  alignmentText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  infoPanel: {
    backgroundColor: '#1f1f1f',
    padding: 20,
  },
  infoPanelTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  infoPanelText: {
    color: '#ccc',
    fontSize: 14,
    lineHeight: 20,
  },
  notesText: {
    color: '#10b981',
    fontSize: 14,
    marginTop: 10,
    fontStyle: 'italic',
  },
  controls: {
    backgroundColor: '#1f1f1f',
    padding: 15,
  },
  controlButton: {
    backgroundColor: '#2563eb',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  controlButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
