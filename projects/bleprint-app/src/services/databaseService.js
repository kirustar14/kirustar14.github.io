import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc,
  query,
  where,
  orderBy,
  Timestamp 
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from '../config/firebase';
import uuid from 'react-native-uuid';

export const databaseService = {
  // ==================== SCENES ====================
  
  // Create a new scene/wall
  async createScene(userId, sceneData) {
    try {
      const sceneId = uuid.v4();
      const sceneRef = doc(db, 'scenes', sceneId);
      
      const scene = {
        id: sceneId,
        userId,
        name: sceneData.name,
        description: sceneData.description || '',
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
        captureCount: 0
      };
      
      await setDoc(sceneRef, scene);
      return { success: true, sceneId, scene };
    } catch (error) {
      console.error('Error creating scene:', error);
      return { success: false, error: error.message };
    }
  },

  // Get all scenes for a user
  async getUserScenes(userId) {
    try {
      const scenesRef = collection(db, 'scenes');
      const q = query(
        scenesRef, 
        where('userId', '==', userId),
        orderBy('updatedAt', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      const scenes = [];
      querySnapshot.forEach((doc) => {
        scenes.push(doc.data());
      });
      
      return { success: true, scenes };
    } catch (error) {
      console.error('Error getting scenes:', error);
      return { success: false, error: error.message };
    }
  },

  // Get a single scene
  async getScene(sceneId) {
    try {
      const sceneRef = doc(db, 'scenes', sceneId);
      const sceneSnap = await getDoc(sceneRef);
      
      if (sceneSnap.exists()) {
        return { success: true, scene: sceneSnap.data() };
      } else {
        return { success: false, error: 'Scene not found' };
      }
    } catch (error) {
      console.error('Error getting scene:', error);
      return { success: false, error: error.message };
    }
  },

  // Update scene
  async updateScene(sceneId, updates) {
    try {
      const sceneRef = doc(db, 'scenes', sceneId);
      await updateDoc(sceneRef, {
        ...updates,
        updatedAt: Timestamp.now()
      });
      return { success: true };
    } catch (error) {
      console.error('Error updating scene:', error);
      return { success: false, error: error.message };
    }
  },

  // Delete scene
  async deleteScene(sceneId) {
    try {
      // Delete all captures associated with this scene
      const capturesResult = await this.getSceneCaptures(sceneId);
      if (capturesResult.success) {
        for (const capture of capturesResult.captures) {
          await this.deleteCapture(capture.id);
        }
      }
      
      // Delete the scene
      const sceneRef = doc(db, 'scenes', sceneId);
      await deleteDoc(sceneRef);
      return { success: true };
    } catch (error) {
      console.error('Error deleting scene:', error);
      return { success: false, error: error.message };
    }
  },

  // ==================== CAPTURES ====================
  
  // Create a new capture (photo with anchor point)
  async createCapture(sceneId, captureData, imageUri) {
    try {
      const captureId = uuid.v4();
      
      // Upload image to Firebase Storage
      const imageUrl = await this.uploadImage(imageUri, sceneId, captureId);
      
      const captureRef = doc(db, 'captures', captureId);
      const capture = {
        id: captureId,
        sceneId,
        imageUrl,
        anchorPoint: captureData.anchorPoint, // { x, y } normalized coordinates
        timestamp: Timestamp.now(),
        notes: captureData.notes || '',
        captureOrder: captureData.captureOrder || 0
      };
      
      await setDoc(captureRef, capture);
      
      // Update scene's capture count
      const sceneRef = doc(db, 'scenes', sceneId);
      const sceneSnap = await getDoc(sceneRef);
      if (sceneSnap.exists()) {
        const currentCount = sceneSnap.data().captureCount || 0;
        await updateDoc(sceneRef, {
          captureCount: currentCount + 1,
          updatedAt: Timestamp.now()
        });
      }
      
      return { success: true, captureId, capture };
    } catch (error) {
      console.error('Error creating capture:', error);
      return { success: false, error: error.message };
    }
  },

  // Get all captures for a scene
  async getSceneCaptures(sceneId) {
    try {
      const capturesRef = collection(db, 'captures');
      const q = query(
        capturesRef,
        where('sceneId', '==', sceneId),
        orderBy('captureOrder', 'asc')
      );
      
      const querySnapshot = await getDocs(q);
      const captures = [];
      querySnapshot.forEach((doc) => {
        captures.push(doc.data());
      });
      
      return { success: true, captures };
    } catch (error) {
      console.error('Error getting captures:', error);
      return { success: false, error: error.message };
    }
  },

  // Update capture
  async updateCapture(captureId, updates) {
    try {
      const captureRef = doc(db, 'captures', captureId);
      await updateDoc(captureRef, updates);
      return { success: true };
    } catch (error) {
      console.error('Error updating capture:', error);
      return { success: false, error: error.message };
    }
  },

  // Delete capture
  async deleteCapture(captureId) {
    try {
      // Get capture data to delete image from storage
      const captureRef = doc(db, 'captures', captureId);
      const captureSnap = await getDoc(captureRef);
      
      if (captureSnap.exists()) {
        const captureData = captureSnap.data();
        
        // Delete image from storage
        if (captureData.imageUrl) {
          await this.deleteImage(captureData.imageUrl);
        }
        
        // Update scene's capture count
        const sceneRef = doc(db, 'scenes', captureData.sceneId);
        const sceneSnap = await getDoc(sceneRef);
        if (sceneSnap.exists()) {
          const currentCount = sceneSnap.data().captureCount || 0;
          await updateDoc(sceneRef, {
            captureCount: Math.max(0, currentCount - 1),
            updatedAt: Timestamp.now()
          });
        }
      }
      
      // Delete the capture document
      await deleteDoc(captureRef);
      return { success: true };
    } catch (error) {
      console.error('Error deleting capture:', error);
      return { success: false, error: error.message };
    }
  },

  // ==================== STORAGE ====================
  
  // Upload image to Firebase Storage
  async uploadImage(imageUri, sceneId, captureId) {
    try {
      const response = await fetch(imageUri);
      const blob = await response.blob();
      
      const storageRef = ref(storage, `scenes/${sceneId}/captures/${captureId}.jpg`);
      await uploadBytes(storageRef, blob);
      
      const downloadURL = await getDownloadURL(storageRef);
      return downloadURL;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  },

  // Delete image from Firebase Storage
  async deleteImage(imageUrl) {
    try {
      const imageRef = ref(storage, imageUrl);
      await deleteObject(imageRef);
    } catch (error) {
      console.error('Error deleting image:', error);
      // Don't throw - image might already be deleted
    }
  }
};
