import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Dimensions, Animated } from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft, Fingerprint, CircleUser as UserCircle } from 'lucide-react-native';
import React, { useEffect, useRef } from 'react';

const { width } = Dimensions.get('window');

export default function LicenseLoginScreen() {
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
      
      {/* Back button */}
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <ArrowLeft color="white" size={24} />
      </TouchableOpacity>
      
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
            styles.formContainer,
            {
              transform: [{ translateY: translateY }],
              opacity: opacity
            }
          ]}
        >
          <View style={styles.iconContainer}>
            <View style={styles.activeIcon}>
              <Image 
                source={{ uri: 'https://cdn-icons-png.flaticon.com/512/9316/9316949.png' }} 
                style={styles.methodIcon} 
                resizeMode="contain"
              />
            </View>
          </View>
          
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Förare ID"
              placeholderTextColor="#999"
            />
          </View>
          
          <TouchableOpacity 
            style={styles.controlButton}
            onPress={() => router.push('/overview')}
          >
            <Text style={styles.controlButtonText}>LOGGA IN</Text>
            <View style={styles.buttonArrow}>
              <Text style={styles.buttonArrowText}>→</Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={() => router.replace('/')}>
            <Text style={styles.alternateText}>Välj annan metod</Text>
          </TouchableOpacity>
          
          <View style={styles.alternateMethodsContainer}>
            <TouchableOpacity 
              style={styles.methodButton}
              onPress={() => router.push('/driver-login')}
            >
              <UserCircle size={30} color="#0277BD" />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.methodButton}
              onPress={() => router.push('/fingerprint')}
            >
              <Fingerprint size={30} color="#0277BD" />
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
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 60,
  },
  logoContainer: {
    height: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 180,
    height: 90,
  },
  formContainer: {
    width: '100%',
    flex: 1,
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: 30,
  },
  activeIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  methodIcon: {
    width: 30,
    height: 30,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 15,
    borderRadius: 25,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: 'white',
    borderRadius: 25,
    paddingHorizontal: 20,
  },
  controlButton: {
    flexDirection: 'row',
    backgroundColor: '#0277BD',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    shadowColor: '#0277BD',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  controlButtonText: {
    color: 'white',
    fontSize: 16,
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
  alternateText: {
    color: 'rgba(255, 255, 255, 0.7)',
    marginTop: 30,
    marginBottom: 15,
  },
  alternateMethodsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  methodButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
});