import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ActivityIndicator, View } from 'react-native';
import { authService } from './src/services/authService';

// Auth Screens
import LoginScreen from './src/screens/LoginScreen';
import SignUpScreen from './src/screens/SignUpScreen';

// App Screens
import ScenesScreen from './src/screens/ScenesScreen';
import SceneDetailScreen from './src/screens/SceneDetailScreen';
import CameraScreen from './src/screens/CameraScreen';
import ARViewScreen from './src/screens/ARViewScreen';

const Stack = createStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = authService.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {user ? (
        // Authenticated Stack
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: '#fff',
            },
            headerTintColor: '#333',
            headerTitleStyle: {
              fontWeight: '600',
            },
          }}
        >
          <Stack.Screen 
            name="Scenes" 
            component={ScenesScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="SceneDetail" 
            component={SceneDetailScreen}
            options={{ title: 'Scene Details' }}
          />
          <Stack.Screen 
            name="Camera" 
            component={CameraScreen}
            options={{ 
              title: 'Capture',
              headerShown: false 
            }}
          />
          <Stack.Screen 
            name="ARView" 
            component={ARViewScreen}
            options={{ 
              title: 'AR Overlay',
              headerShown: false 
            }}
          />
        </Stack.Navigator>
      ) : (
        // Auth Stack
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
