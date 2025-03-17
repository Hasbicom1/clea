import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Dimensions, Animated } from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft, Shield, Navigation, Clock, AlertCircle, Calendar, Filter, Activity, Zap, Droplet, Wind } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function CarPerformanceDetailScreen() {
  const [activeMetricTab, setActiveMetricTab] = useState('compliance');
  const [selectedTimeframe, setSelectedTimeframe] = useState('weekly');
  const [animatedValues] = useState({
    score: new Animated.Value(0),
    metrics: new Animated.Value(0),
    wave: new Animated.Value(0)
  });
  
  // Compliance data
  const complianceData = {
    overall: 80,
    speed: { value: 69.4, unit: 'Km/h', compliance: 'Good', limit: '70 Km/h', percentage: 70 },
    acceleration: { value: '4.2', unit: 'm/s²', compliance: 'Warning', percentage: 60 },
    braking: { value: '3.8', unit: 'm/s²', compliance: 'Good', percentage: 85 },
    distance: { value: 524.5, unit: 'Km', compliance: 'N/A', percentage: 80 },
    weight: { value: 1.25, unit: 'Ton', compliance: 'N/A', percentage: 80 },
    consumption: { value: 19.3, unit: 'L/100km', compliance: 'N/A', percentage: 80 },
    coasting: { percentage: 80 },
    accelerationPedal: { percentage: 100 },
    braking: { percentage: 90 },
    cruiseControl: { percentage: 87 },
    overspeed: { percentage: 73 },
  };
  
  // Violation history data structured by timeframe
  const violationHistoryData = {
    daily: [
      { date: '2025-02-24', time: '14:32', type: 'Speed', description: 'Speed exceeded by 12 Km/h', severity: 'Medium' },
    ],
    weekly: [
      { date: '2025-02-24', time: '14:32', type: 'Speed', description: 'Speed exceeded by 12 Km/h', severity: 'Medium' },
      { date: '2025-02-21', time: '08:45', type: 'Braking', description: 'Hard braking detected', severity: 'Low' },
    ],
    monthly: [
      { date: '2025-02-24', time: '14:32', type: 'Speed', description: 'Speed exceeded by 12 Km/h', severity: 'Medium' },
      { date: '2025-02-21', time: '08:45', type: 'Braking', description: 'Hard braking detected', severity: 'Low' },
      { date: '2025-02-15', time: '20:10', type: 'Acceleration', description: 'Rapid acceleration', severity: 'Low' },
    ],
    yearly: [
      { date: '2025-02-24', time: '14:32', type: 'Speed', description: 'Speed exceeded by 12 Km/h', severity: 'Medium' },
      { date: '2025-02-21', time: '08:45', type: 'Braking', description: 'Hard braking detected', severity: 'Low' },
      { date: '2025-02-15', time: '20:10', type: 'Acceleration', description: 'Rapid acceleration', severity: 'Low' },
      { date: '2025-01-10', time: '17:25', type: 'Speed', description: 'Speed exceeded by 8 Km/h', severity: 'Low' },
      { date: '2024-12-05', time: '09:12', type: 'Acceleration', description: 'Excessive acceleration', severity: 'Medium' },
    ],
  };
  
  // Get the current violations based on selected timeframe
  const violationHistory = violationHistoryData[selectedTimeframe] || [];
  
  // Animation on component mount
  useEffect(() => {
    Animated.parallel([
      Animated.timing(animatedValues.score, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: false
      }),
      Animated.timing(animatedValues.metrics, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: false
      }),
      Animated.timing(animatedValues.wave, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: false
      })
    ]).start();
  }, []);
  
  // Start wave animation
  const waveAnimation = animatedValues.wave.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['0deg', '180deg', '360deg']
  });

  // Get compliance color
  const getComplianceColor = (status) => {
    switch(status) {
      case 'Excellent': return '#4CAF50';
      case 'Good': return '#2196F3';
      case 'Warning': return '#FFC107';
      case 'Violation': return '#F44336';
      default: return '#2196F3';
    }
  };
  
  // Get severity color
  const getSeverityColor = (severity) => {
    switch(severity) {
      case 'High': return '#F44336';
      case 'Medium': return '#FFC107';
      case 'Low': return '#2196F3';
      default: return '#2196F3';
    }
  };
  
  // Get a human-readable timeframe label
  const getTimeframeLabel = () => {
    switch(selectedTimeframe) {
      case 'daily': return 'Today';
      case 'weekly': return 'This Week';
      case 'monthly': return 'This Month';
      case 'yearly': return 'This Year';
      default: return 'This Week';
    }
  };

  // Enhanced AnimatedWaveGraph
  const AnimatedWaveGraph = ({ percentage = 70 }) => {
    const waveHeight = percentage / 2;
    return (
      <View style={styles.waveGraphContainer}>
        <Animated.View 
          style={[
            styles.waveGraph,
            {
              transform: [{ rotate: waveAnimation }],
              height: waveHeight
            }
          ]}
        >
          <LinearGradient
            colors={['#0277BD', '#039BE5', '#03A9F4']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.waveGradient}
          />
        </Animated.View>
      </View>
    );
  };

  // Enhanced Circle progress component
  const CircleProgress = ({ percentage, size = 60, animate = true }) => {
    const animatedPercentage = animate ? 
      animatedValues.score.interpolate({
        inputRange: [0, 1],
        outputRange: [0, percentage]
      }) : percentage;
    
    const rotation = animate ?
      animatedValues.score.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', `${percentage * 3.6}deg`]
      }) : `${percentage * 3.6}deg`;
    
    const color = percentage > 80 ? '#4CAF50' : percentage > 72 ? '#2196F3' : percentage > 40 ? '#FFC107' : '#F44336';
    
    return (
      <View style={[styles.circleProgressContainer, { width: size, height: size }]}>
        <View style={[styles.circleProgressBackground, { width: size, height: size }]} />
        <Animated.View 
          style={[
            styles.circleProgress, 
            { 
              width: size, 
              height: size,
              borderTopColor: color,
              borderRightColor: percentage > 75 ? color : 'transparent',
              borderBottomColor: percentage > 50 ? color : 'transparent',
              borderLeftColor: percentage > 25 ? color : 'transparent',
              transform: [{ rotate: animate ? rotation : `${percentage * 3.6}deg` }]
            }
          ]} 
        />
        <View style={[styles.circleProgressInner, { width: size - 16, height: size - 16 }]}>
          <Animated.Text style={styles.circleProgressText}>
            {animate ? 
              animatedPercentage.interpolate({
                inputRange: [0, 100],
                outputRange: ['0%', '100%'],
                extrapolate: 'clamp'
              }) : 
              `${percentage}%`
            }
          </Animated.Text>
        </View>
      </View>
    );
  };

  // Get icon for metric
  const getMetricIcon = (metricName) => {
    switch(metricName.toLowerCase()) {
      case 'consumption': return <Droplet size={24} color="#0277BD" />;
      case 'speed': return <Zap size={24} color="#0277BD" />;
      case 'weight': return <Activity size={24} color="#0277BD" />;
      case 'distance': return <Navigation size={24} color="#0277BD" />;
      case 'coasting': return <Wind size={24} color="#0277BD" />;
      case 'acceleration pedal': return <Zap size={24} color="#0277BD" />;
      case 'braking': return <Clock size={24} color="#0277BD" />;
      case 'cruise control': return <Navigation size={24} color="#0277BD" />;
      case 'overspeed': return <AlertCircle size={24} color="#0277BD" />;
      default: return <Activity size={24} color="#0277BD" />;
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#0277BD', '#039BE5']}
        style={styles.header}
      >
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft color="white" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Driving Performance</Text>
      </LinearGradient>
      
      <ScrollView style={styles.content}>
        {/* Car Image with Gradient Overlay */}
        <View style={styles.carImageContainer}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1533468102890-ed56bb86a0d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1400&q=80' }} 
            style={styles.carImage} 
            resizeMode="cover"
          />
          <LinearGradient
            colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.6)']}
            style={styles.imageOverlay}
          >
            <View style={styles.carInfoOverlay}>
              <Text style={styles.carModel}>Honda Civic 2020</Text>
              <View style={styles.licensePlate}>
                <Text style={styles.licensePlateText}>ABC 123</Text>
              </View>
            </View>
          </LinearGradient>
        </View>
        
        {/* Performance Score Card */}
        <View style={styles.scoreCardContainer}>
          <LinearGradient
            colors={['#FFFFFF', '#F5F7FA']}
            style={styles.scoreCard}
          >
            <View style={styles.scoreHeader}>
              <Text style={styles.scoreTitle}>Performance Score</Text>
              <TouchableOpacity style={styles.timeframeSelector}>
                <Calendar size={16} color="#666" />
                <Text style={styles.timeframeText}>{getTimeframeLabel()}</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.scoreDisplay}>
              <CircleProgress percentage={72} size={100} />
              <View style={styles.scoreBreakdown}>
                <Text style={styles.scoreLabel}>Good</Text>
                <Text style={styles.scoreSubtext}>Last Month: 68%</Text>
                <View style={styles.trendIndicator}>
                  <ArrowLeft color="#4CAF50" size={16} style={{ transform: [{ rotate: '45deg' }] }} />
                  <Text style={styles.trendText}>+4%</Text>
                </View>
              </View>
            </View>
          </LinearGradient>
        </View>
        
        {/* Key Metrics */}
        <Text style={styles.sectionTitle}>Key Metrics</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.metricsScroll}>
          <Animated.View 
            style={[
              styles.metricsGrid,
              {
                opacity: animatedValues.metrics,
                transform: [{ 
                  translateY: animatedValues.metrics.interpolate({
                    inputRange: [0, 1],
                    outputRange: [50, 0]
                  })
                }]
              }
            ]}
          >
            <View style={styles.metricItem}>
              <View style={styles.metricHeader}>
                <Droplet size={20} color="#0277BD" />
                <Text style={styles.metricName}>Consumption</Text>
              </View>
              <Text style={styles.metricValue}>19.3 <Text style={styles.metricUnit}>L/100km</Text></Text>
              <View style={styles.metricBar}>
                <View style={[styles.metricBarFill, { width: '70%', backgroundColor: '#0277BD' }]} />
              </View>
            </View>
            
            <View style={styles.metricItem}>
              <View style={styles.metricHeader}>
                <Zap size={20} color="#0277BD" />
                <Text style={styles.metricName}>Speed</Text>
              </View>
              <Text style={styles.metricValue}>69.4 <Text style={styles.metricUnit}>Km/h</Text></Text>
              <View style={styles.metricBar}>
                <View style={[styles.metricBarFill, { width: '80%', backgroundColor: '#0277BD' }]} />
              </View>
            </View>
            

            
            <View style={styles.metricItem}>
              <View style={styles.metricHeader}>
                <Navigation size={20} color="#0277BD" />
                <Text style={styles.metricName}>Distance</Text>
              </View>
              <Text style={styles.metricValue}>524.5 <Text style={styles.metricUnit}>Km</Text></Text>
              <View style={styles.metricBar}>
                <View style={[styles.metricBarFill, { width: '90%', backgroundColor: '#0277BD' }]} />
              </View>
            </View>
          </Animated.View>
        </ScrollView>
        
        {/* Detailed Performance Metrics */}
        <Text style={styles.sectionTitle}>Driving Behavior</Text>
        <View style={styles.detailedMetrics}>
          {/* Coasting */}
          <View style={styles.detailedMetricItem}>
            <View style={styles.detailedMetricHeader}>
              <CircleProgress percentage={complianceData.coasting.percentage} animate={false} />
              <View style={styles.detailedMetricInfo}>
                <Text style={styles.detailedMetricTitle}>Coasting</Text>
                <Text style={styles.detailedMetricSubtitle}>Efficient fuel usage</Text>
              </View>
              <Wind size={20} color="#0277BD" style={styles.detailedMetricIcon} />
            </View>
            <AnimatedWaveGraph percentage={complianceData.coasting.percentage} />
          </View>
          
          {/* Acceleration Pedal */}
          <View style={styles.detailedMetricItem}>
            <View style={styles.detailedMetricHeader}>
              <CircleProgress percentage={complianceData.accelerationPedal.percentage} animate={false} />
              <View style={styles.detailedMetricInfo}>
                <Text style={styles.detailedMetricTitle}>Acceleration Pedal</Text>
                <Text style={styles.detailedMetricSubtitle}>Smooth acceleration rate</Text>
              </View>
              <Zap size={20} color="#0277BD" style={styles.detailedMetricIcon} />
            </View>
            <AnimatedWaveGraph percentage={complianceData.accelerationPedal.percentage} />
          </View>
          
          {/* Braking */}
          <View style={styles.detailedMetricItem}>
            <View style={styles.detailedMetricHeader}>
              <CircleProgress percentage={complianceData.braking.percentage} animate={false} />
              <View style={styles.detailedMetricInfo}>
                <Text style={styles.detailedMetricTitle}>Braking</Text>
                <Text style={styles.detailedMetricSubtitle}>Gentle braking patterns</Text>
              </View>
              <Clock size={20} color="#0277BD" style={styles.detailedMetricIcon} />
            </View>
            <AnimatedWaveGraph percentage={complianceData.braking.percentage} />
          </View>
          
          {/* Cruise Control */}
          <View style={styles.detailedMetricItem}>
            <View style={styles.detailedMetricHeader}>
              <CircleProgress percentage={complianceData.cruiseControl.percentage} animate={false} />
              <View style={styles.detailedMetricInfo}>
                <Text style={styles.detailedMetricTitle}>Cruise Control</Text>
                <Text style={styles.detailedMetricSubtitle}>Usage on highways</Text>
              </View>
              <Navigation size={20} color="#0277BD" style={styles.detailedMetricIcon} />
            </View>
            <AnimatedWaveGraph percentage={complianceData.cruiseControl.percentage} />
          </View>
          
          {/* Overspeed */}
          <View style={styles.detailedMetricItem}>
            <View style={styles.detailedMetricHeader}>
              <CircleProgress percentage={complianceData.overspeed.percentage} animate={false} />
              <View style={styles.detailedMetricInfo}>
                <Text style={styles.detailedMetricTitle}>Overspeed</Text>
                <Text style={styles.detailedMetricSubtitle}>Speed limit compliance</Text>
              </View>
              <AlertCircle size={20} color="#0277BD" style={styles.detailedMetricIcon} />
            </View>
            <AnimatedWaveGraph percentage={complianceData.overspeed.percentage} />
          </View>
        </View>
        
        {/* Tips for Improvement */}
        <View style={styles.tipsContainer}>
          <Text style={styles.tipsTitle}>Tips for Improvement</Text>
          <View style={styles.tipCard}>
            <Shield size={24} color="#0277BD" />
            <View style={styles.tipContent}>
              <Text style={styles.tipText}>Reduce sudden acceleration to improve fuel efficiency</Text>
            </View>
          </View>
          <View style={styles.tipCard}>
            <Clock size={24} color="#0277BD" />
            <View style={styles.tipContent}>
              <Text style={styles.tipText}>Use cruise control more frequently on highways</Text>
            </View>
          </View>
        </View>
        
        {/* Keeping the original tabs and content for functionality */}
        <View style={[styles.tabsContainer, { display: 'none' }]}>
          <TouchableOpacity 
            style={[styles.tab, activeMetricTab === 'compliance' && styles.activeTab]}
            onPress={() => setActiveMetricTab('compliance')}
          >
            <Text style={[styles.tabText, activeMetricTab === 'compliance' && styles.activeTabText]}>
              Driving Compliance
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.tab, activeMetricTab === 'violations' && styles.activeTab]}
            onPress={() => setActiveMetricTab('violations')}
          >
            <Text style={[styles.tabText, activeMetricTab === 'violations' && styles.activeTabText]}>
              Violation History
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  content: {
    flex: 1,
  },
  carImageContainer: {
    width: '100%',
    height: 200,
    position: 'relative',
  },
  carImage: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '100%',
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  carInfoOverlay: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  carModel: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10
  },
  licensePlate: {
    backgroundColor: 'white',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  licensePlateText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  scoreCardContainer: {
    marginTop: -20,
    marginHorizontal: 16,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  scoreCard: {
    borderRadius: 16,
    padding: 16,
  },
  scoreHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  scoreTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  timeframeSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  timeframeText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 6,
  },
  scoreDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  scoreBreakdown: {
    marginLeft: 20,
  },
  scoreLabel: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  scoreSubtext: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  trendIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  trendText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 24,
    marginBottom: 16,
    marginLeft: 16,
  },
  metricsScroll: {
    paddingLeft: 16,
  },
  metricsGrid: {
    flexDirection: 'row',
    paddingRight: 16,
  },
  metricItem: {
    backgroundColor: 'white',
    width: width * 0.4,
    padding: 16,
    borderRadius: 12,
    marginRight: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  metricHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  metricName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
    marginLeft: 8,
  },
  metricValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  metricUnit: {
    fontSize: 12,
    fontWeight: 'normal',
    color: '#666',
  },
  metricBar: {
    height: 4,
    backgroundColor: '#f0f0f0',
    borderRadius: 2,
  },
  metricBarFill: {
    height: '100%',
    borderRadius: 2,
  },
  detailedMetrics: {
    marginHorizontal: 16,
    marginBottom: 24,
  },
 detailedMetricItem: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 8,
    marginBottom: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  detailedMetricHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  detailedMetricInfo: {
    flex: 1,
    marginLeft: 10,
  },
  detailedMetricTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  detailedMetricSubtitle: {
    fontSize: 11,
    color: '#666',
    marginTop: 2,
  },
  waveGraphContainer: {
    height: 35,
    overflow: 'hidden',
    backgroundColor: '#f9f9f9',
    borderRadius: 6,
  },
  waveGraph: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
  waveGradient: {
    height: 50,
    width: '200%',
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
  },
  circleProgressContainer: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleProgressBackground: {
    position: 'absolute',
    borderRadius: 100,
    borderWidth: 6,
    borderColor: '#f0f0f0',
  },
  circleProgress: {
    position: 'absolute',
    borderRadius: 100,
    borderWidth: 6,
    borderColor: 'transparent',
  },
  circleProgressInner: {
    backgroundColor: 'white',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleProgressText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  tipsContainer: {
    marginHorizontal: 16,
    marginBottom: 24,
  },
  tipsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  tipCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  tipContent: {
    marginLeft: 16,
    flex: 1,
  },
  tipText: {
    fontSize: 14,
    color: '#333',
  },
  
  // Preserved original styles for functionality
  tabsContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    marginHorizontal: 16,
  },
  tab: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    marginHorizontal: 4,
  },
  activeTab: {
    backgroundColor: '#0277BD',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  activeTabText: {
    color: 'white',
  },
});