import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, Animated } from 'react-native';
import { router } from 'expo-router';
import { Fingerprint, CreditCard, CircleUser as UserCircle } from 'lucide-react-native';
import React, { useEffect, useRef } from 'react';

const { width } = Dimensions.get('window');

export default function LoginMethodScreen() {
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
      
      {/* Background image */}
      <View style={styles.backgroundImageContainer}>
        <Image 
          source={{ uri: 'https://i.imgur.com/HW8rdFA.png' }} 
          style={styles.backgroundImage} 
          resizeMode="contain"
        />
      </View>
      
      {/* Content */}
      <View style={styles.mainContainer}>
        <View style={styles.logoContainer}>
          <Image 
            source={{ uri: 'https://i.imgur.com/HW8rdFA.png' }} 
            style={styles.logo} 
            resizeMode="contain"
          />
        </View>
        
        <Animated.View 
          style={[
            styles.contentContainer,
            {
              transform: [{ translateY: translateY }],
              opacity: opacity
            }
          ]}
        >
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Logga in</Text>
          </View>
          
          <View style={styles.methodsContainer}>
            <TouchableOpacity 
              style={styles.methodButton}
              onPress={() => router.push('/driver-login')}
            >
              <UserCircle size={40} color="#0277BD" />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.methodButton}>
              <Fingerprint size={40} color="#0277BD" />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.methodButton}
              onPress={() => router.push('/license-login')}
            >
              <CreditCard size={40} color="#0277BD" />
            </TouchableOpacity>
          </View>
        </Animated.View>
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
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 100,
  },
  contentContainer: {
    flex: 2,
    width: '100%',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 20,
  },
  methodsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
  methodButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#0277BD',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
});