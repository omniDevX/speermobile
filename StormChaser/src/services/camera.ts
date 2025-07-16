import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import { Platform } from 'react-native';

class CameraService {
  async requestCameraPermission(): Promise<boolean> {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      return status === 'granted';
    } catch (error) {
      console.error('Error requesting camera permission:', error);
      return false;
    }
  }

  async requestMediaLibraryPermission(): Promise<boolean> {
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      return status === 'granted';
    } catch (error) {
      console.error('Error requesting media library permission:', error);
      return false;
    }
  }

  async takePhoto(): Promise<string | null> {
    try {
      const hasPermission = await this.requestCameraPermission();
      
      if (!hasPermission) {
        throw new Error('Camera permission not granted');
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
        base64: false,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        
        // Save to media library if permission is granted
        try {
          const hasMediaPermission = await this.requestMediaLibraryPermission();
          if (hasMediaPermission && asset.uri) {
            await MediaLibrary.saveToLibraryAsync(asset.uri);
          }
        } catch (error) {
          console.warn('Could not save to media library:', error);
        }

        return asset.uri;
      }

      return null;
    } catch (error) {
      console.error('Error taking photo:', error);
      throw error;
    }
  }

  async pickPhotoFromLibrary(): Promise<string | null> {
    try {
      const hasPermission = await this.requestMediaLibraryPermission();
      
      if (!hasPermission) {
        throw new Error('Media library permission not granted');
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
        base64: false,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        return result.assets[0].uri;
      }

      return null;
    } catch (error) {
      console.error('Error picking photo from library:', error);
      throw error;
    }
  }

  async getPhotoInfo(uri: string): Promise<{
    width: number;
    height: number;
    fileSize?: number;
    fileName?: string;
  }> {
    try {
      const asset = await MediaLibrary.createAssetAsync(uri);
      return {
        width: asset.width,
        height: asset.height,
        fileSize: undefined,
        fileName: asset.filename,
      };
    } catch (error) {
      console.error('Error getting photo info:', error);
      return {
        width: 0,
        height: 0,
      };
    }
  }
}

export const cameraService = new CameraService(); 