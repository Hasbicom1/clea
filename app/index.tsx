import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, Animated } from 'react-native';
import { router } from 'expo-router';
import React, { useEffect, useRef } from 'react';

const { width } = Dimensions.get('window');

export default function WelcomeScreen() {
  const translateY = useRef(new Animated.Value(50)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      {/* Background gradient overlay */}
      <View style={styles.gradientOverlay} />
      
      {/* Car safety illustration in the background */}
      <View style={styles.backgroundImageContainer}>
        <Image 
          source={{ uri: 'https://i.imgur.com/HW8rdFA.png' }} 
          style={styles.backgroundImage} 
          resizeMode="contain"
        />
      </View>
      
      {/* Content */}
      <View style={styles.contentContainer}>
        <View style={styles.logoContainer}>
          <Image 
            source={{ uri: 'https://i.imgur.com/HW8rdFA.png' }} 
            style={styles.logo} 
            resizeMode="contain"
          />
        </View>
        
        <Animated.View 
          style={[
            styles.heroContainer,
            {
              transform: [{ translateY: translateY }],
              opacity: opacity
            }
          ]}
        >
          <View style={styles.safetyCard}>
            <View style={styles.safetyIconContainer}>
              <View style={styles.safetyIcon}>
                <Text style={styles.safetyIconText}>✓</Text>
              </View>
            </View>
            <Text style={styles.safetyTitle}>SÄKRA KÖRNING OCH TRYGGHET</Text>
            <Text style={styles.safetySubtitle}>För en säkrare resa varje dag</Text>
          </View>
        </Animated.View>
        
        <TouchableOpacity 
          style={styles.button}
          onPress={() => router.push('/login')}
        >
          <Text style={styles.buttonText}>FÖRARE</Text>
          <View style={styles.buttonArrow}>
            <Text style={styles.buttonArrowText}>→</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A1128',
  },
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(10, 17, 40, 0.9)',
  },
  backgroundImageContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    width: width * 1.5,
    height: width * 1.5,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 180,
    height: 90,
  },
  heroContainer: {
    width: '100%',
    alignItems: 'center',
  },
  safetyCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 24,
    width: '100%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    backdropFilter: 'blur(10px)',
  },
  safetyIconContainer: {
    marginBottom: 16,
  },
  safetyIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#0277BD',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#0277BD',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 6,
  },
  safetyIconText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  safetyTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 8,
  },
  safetySubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#0277BD',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#0277BD',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 12,
  },
  buttonArrow: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonArrowText: {
    color: 'white',
    fontSize: 16,
  },
});