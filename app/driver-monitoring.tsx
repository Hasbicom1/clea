import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Dimensions } from 'react-native';
import { router } from 'expo-router';
import { 
  ArrowLeft, 
  AlertTriangle, 
  Shield, 
  Navigation, 
  Clock, 
  AlertCircle, 
  Calendar, 
  Filter,
  Clock3,
  BarChart2,
  User,
  FileText
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function DriverMonitoringScreen() {
  const [activeTab, setActiveTab] = useState('drivingTime');
  const [activeMetricTab, setActiveMetricTab] = useState('compliance');
  const [selectedTimeframe, setSelectedTimeframe] = useState('weekly');
  
  // Colors for different tabs
  const tabColors = {
    drivingTimeTab: '#FFEB3B', // Updated yellow for Vilotidsrapport
    performanceTab: '#0277BD', // Blue for Driver Performance (Swedish flag)
    complianceTab: '#FF9800', // Orange for compliance tab
    violationsTab: '#F44336' // Red for violations tab
  };
  
  // Driving time data
  const drivingTimeData = {
    currentSession: { value: '3:45', unit: 'h', remaining: '0:45', percentage: 70 },
    totalToday: { value: '8:15', unit: 'h', remaining: '1:45', percentage: 85 },
    restToday: { value: '0:30', unit: 'h', remaining: '1:45', percentage: 30 },
    nextSession: { value: '10:40', unit: 'h', percentage: 60 },
    weeklySession: { value: '64:15', unit: 'h', remaining: '25:45', percentage: 65 },
    dailyRest: { value: '9:00', unit: 'h', remaining: '2:00' },
    weeklyDriving: { value: '8:40', unit: 'h', remaining: '2:45' },
    weekPerformance: 72
  };
  
  // Compliance data
  const complianceData = {
    overall: 80,
    speed: { value: 69.4, unit: 'Km/h', compliance: 'Good', limit: '70 Km/h', percentage: 70 },
    acceleration: { value: '4.2', unit: 'm/s²', compliance: 'Warning', percentage: 60 },
    braking: { value: '3.8', unit: 'm/s²', compliance: 'Good', percentage: 85 },
    distance: { value: 524.5, unit: 'Km', compliance: 'N/A', percentage: 80 },
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

  // Main tab navigation - toggles between Driving Time and Performance
  const renderMainTabs = () => (
    <View style={styles.mainTabsContainer}>
      <TouchableOpacity 
        style={[styles.mainTab, activeTab === 'drivingTime' && styles.drivingTimeTab]}
        onPress={() => setActiveTab('drivingTime')}
      >
        <Clock3 size={20} color={activeTab === 'drivingTime' ? '#333' : '#666'} />
        <Text style={[styles.mainTabText, activeTab === 'drivingTime' && styles.drivingTimeTabText]}>
          Vilotidsrapport
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[styles.mainTab, activeTab === 'performance' && styles.performanceTab]}
        onPress={() => setActiveTab('performance')}
      >
        <BarChart2 size={20} color={activeTab === 'performance' ? 'white' : '#666'} />
        <Text style={[styles.mainTabText, activeTab === 'performance' && styles.performanceTabText]}>
          Körningsrapport
        </Text>
      </TouchableOpacity>
    </View>
  );

  // Render driver info section at the top
  const renderDriverInfo = () => (
    <View style={styles.infoCard}>
      <View style={styles.driverInfo}>
        <Image 
          source={{ uri: 'https://media.licdn.com/dms/image/v2/D4D03AQEibgItFB3cmA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1725048816239?e=1746057600&v=beta&t=n8lmhxwmLFCaTAWkUjHjNTsXTYdQhUzjcnyB9RctlRE' }} 
          style={styles.driverImage} 
        />
        <View style={styles.driverDetails}>
          <Text style={styles.driverName}>Zaki Hasbi</Text>
          <Text style={styles.licenseNumber}>License: AB123456</Text>
        </View>
      </View>
      
      <View style={styles.vehicleInfo}>
        <View style={styles.vehicleDetails}>
          <Text style={styles.vehicleModel}>Honda Civic 2020</Text>
          <Text style={styles.plateNumber}>Plate: ABC 123</Text>
        </View>
        <View style={[styles.scoreIndicator, { 
          backgroundColor: activeTab === 'drivingTime' 
            ? tabColors.drivingTimeTab 
            : getComplianceColor(complianceData.overall >= 85 ? 'Excellent' : complianceData.overall >= 70 ? 'Good' : 'Warning') 
        }]}>
          <Text style={[styles.scoreText, {
            color: activeTab === 'drivingTime' ? '#333' : 'white'
          }]}>
            {activeTab === 'drivingTime' ? `${drivingTimeData.weekPerformance}%` : `${complianceData.overall}%`}
          </Text>
        </View>
      </View>
    </View>
  );

  // Render driving time records section
  const renderDrivingTime = () => (
    <View style={styles.drivingTimeContent}>
      <View style={styles.metricCard}>
        <Text style={styles.metricLabel}>Fortsätt körpass</Text>
        <View style={styles.metricValueContainer}>
          <Text style={styles.metricValue}>{drivingTimeData.currentSession.value}</Text>
          <Text style={styles.metricUnit}>{drivingTimeData.currentSession.unit}</Text>
        </View>
        <Text style={styles.metricSubtext}>Kvar {drivingTimeData.currentSession.remaining} h</Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${drivingTimeData.currentSession.percentage}%` }]} />
        </View>
      </View>
      
      <View style={styles.metricCard}>
        <Text style={styles.metricLabel}>Total körning idag</Text>
        <View style={styles.metricValueContainer}>
          <Text style={styles.metricValue}>{drivingTimeData.totalToday.value}</Text>
          <Text style={styles.metricUnit}>{drivingTimeData.totalToday.unit}</Text>
        </View>
        <Text style={styles.metricSubtext}>Kvar {drivingTimeData.totalToday.remaining} h</Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${drivingTimeData.totalToday.percentage}%` }]} />
        </View>
      </View>
      
      <View style={styles.metricCard}>
        <Text style={styles.metricLabel}>Vilotid idag</Text>
        <View style={styles.metricValueContainer}>
          <Text style={styles.metricValue}>{drivingTimeData.restToday.value}</Text>
          <Text style={styles.metricUnit}>{drivingTimeData.restToday.unit}</Text>
        </View>
        <Text style={styles.metricSubtext}>Kvar {drivingTimeData.restToday.remaining} h</Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${drivingTimeData.restToday.percentage}%` }]} />
        </View>
      </View>
      
      <View style={styles.metricCard}>
        <Text style={styles.metricLabel}>Kommande nästa körpass</Text>
        <View style={styles.metricValueContainer}>
          <Text style={styles.metricValue}>{drivingTimeData.nextSession.value}</Text>
          <Text style={styles.metricUnit}>{drivingTimeData.nextSession.unit}</Text>
        </View>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${drivingTimeData.nextSession.percentage}%` }]} />
        </View>
      </View>
      
      <View style={styles.metricCard}>
        <Text style={styles.metricLabel}>Veckans körpass</Text>
        <View style={styles.metricValueContainer}>
          <Text style={styles.metricValue}>{drivingTimeData.weeklySession.value}</Text>
          <Text style={styles.metricUnit}>{drivingTimeData.weeklySession.unit}</Text>
        </View>
        <Text style={styles.metricSubtext}>Kvar {drivingTimeData.weeklySession.remaining} h</Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${drivingTimeData.weeklySession.percentage}%` }]} />
        </View>
      </View>
      
      <View style={styles.rowContainer}>
        <View style={styles.halfMetricCard}>
          <Text style={styles.metricLabel}>Minimalt dagligt vila</Text>
          <View style={styles.metricValueContainer}>
            <Text style={styles.metricValue}>{drivingTimeData.dailyRest.value}</Text>
            <Text style={styles.metricUnit}>{drivingTimeData.dailyRest.unit}</Text>
          </View>
          <Text style={styles.metricSubtext}>Kvar {drivingTimeData.dailyRest.remaining} h</Text>
        </View>
        
        <View style={styles.halfMetricCard}>
          <Text style={styles.metricLabel}>Veckovis körtid</Text>
          <View style={styles.metricValueContainer}>
            <Text style={styles.metricValue}>{drivingTimeData.weeklyDriving.value}</Text>
            <Text style={styles.metricUnit}>{drivingTimeData.weeklyDriving.unit}</Text>
          </View>
          <Text style={styles.metricSubtext}>Kvar {drivingTimeData.weeklyDriving.remaining} h</Text>
        </View>
      </View>
      
      <View style={styles.weekdayContainer}>
        <View style={styles.weekdayItem}>
          <Text style={styles.weekdayText}>S</Text>
          <Text style={styles.weekdayValue}>25</Text>
        </View>
        
        <View style={styles.weekdayItem}>
          <Text style={styles.weekdayText}>M</Text>
          <Text style={styles.weekdayValue}>26</Text>
        </View>
        
        <View style={styles.weekdayItem}>
          <Text style={styles.weekdayText}>T</Text>
          <Text style={styles.weekdayValue}>27</Text>
        </View>
        
        <View style={[styles.weekdayItem, styles.activeWeekday]}>
          <Text style={[styles.weekdayText, styles.activeWeekdayText]}>W</Text>
          <Text style={[styles.weekdayValue, styles.activeWeekdayText]}>28/3</Text>
        </View>
        
        <View style={styles.performanceIndicator}>
          <Text style={styles.performanceValue}>{drivingTimeData.weekPerformance}%</Text>
          <Text style={styles.performanceLabel}>Totalt</Text>
        </View>
      </View>
      
      {/* Integration Link to Performance Monitoring */}
      {renderIntegrationLink(
        'performance', 
        <BarChart2 size={18} color="white" />, 
        'Check Driving Performance'
      )}
    </View>
  );

  // Render performance monitoring section
  const renderPerformance = () => (
    <View style={styles.performanceContent}>
      {/* Performance Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeMetricTab === 'compliance' && styles.complianceTab]}
          onPress={() => setActiveMetricTab('compliance')}
        >
          <Text style={[styles.tabText, activeMetricTab === 'compliance' && styles.complianceTabText]}>
            Driving Compliance
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tab, activeMetricTab === 'violations' && styles.violationsTab]}
          onPress={() => setActiveMetricTab('violations')}
        >
          <Text style={[styles.tabText, activeMetricTab === 'violations' && styles.violationsTabText]}>
            Violation History
          </Text>
        </TouchableOpacity>
      </View>
      
      {/* Driving Compliance Metrics */}
      {activeMetricTab === 'compliance' && (
        <View style={styles.metricsContainer}>
          <View style={styles.metricCard}>
            <View style={styles.metricHeader}>
              <Text style={styles.metricTitle}>Speed Compliance</Text>
              <View style={[styles.complianceBadge, { backgroundColor: getComplianceColor(complianceData.speed.compliance) }]}>
                <Text style={styles.badgeText}>{complianceData.speed.compliance}</Text>
              </View>
            </View>
            
            <View style={styles.metricContent}>
              <View style={styles.metricValues}>
                <Text style={styles.metricValue}>{complianceData.speed.value}</Text>
                <Text style={styles.metricUnit}>{complianceData.speed.unit}</Text>
              </View>
              
              <Text style={styles.metricLimit}>Limit: {complianceData.speed.limit}</Text>
              
              <View style={styles.progressBar}>
                <View 
                  style={[
                    styles.progressFill, 
                    { 
                      width: `${complianceData.speed.percentage}%`,
                      backgroundColor: getComplianceColor(complianceData.speed.compliance)
                    }
                  ]} 
                />
              </View>
            </View>
          </View>
          
          <View style={styles.metricCard}>
            <View style={styles.metricHeader}>
              <Text style={styles.metricTitle}>Acceleration Pattern</Text>
              <View style={[styles.complianceBadge, { backgroundColor: getComplianceColor(complianceData.acceleration.compliance) }]}>
                <Text style={styles.badgeText}>{complianceData.acceleration.compliance}</Text>
              </View>
            </View>
            
            <View style={styles.metricContent}>
              <View style={styles.metricValues}>
                <Text style={styles.metricValue}>{complianceData.acceleration.value}</Text>
                <Text style={styles.metricUnit}>{complianceData.acceleration.unit}</Text>
              </View>
              
              {complianceData.acceleration.compliance === 'Warning' && (
                <View style={styles.warningContainer}>
                  <AlertTriangle size={16} color="#FFC107" />
                  <Text style={styles.warningText}>Rapid acceleration detected</Text>
                </View>
              )}
              
              <View style={styles.progressBar}>
                <View 
                  style={[
                    styles.progressFill, 
                    { 
                      width: `${complianceData.acceleration.percentage}%`,
                      backgroundColor: getComplianceColor(complianceData.acceleration.compliance)
                    }
                  ]} 
                />
              </View>
            </View>
          </View>
          
          <View style={styles.metricCard}>
            <View style={styles.metricHeader}>
              <Text style={styles.metricTitle}>Braking Safety</Text>
              <View style={[styles.complianceBadge, { backgroundColor: getComplianceColor(complianceData.braking.compliance) }]}>
                <Text style={styles.badgeText}>{complianceData.braking.compliance}</Text>
              </View>
            </View>
            
            <View style={styles.metricContent}>
              <View style={styles.metricValues}>
                <Text style={styles.metricValue}>{complianceData.braking.value}</Text>
                <Text style={styles.metricUnit}>{complianceData.braking.unit}</Text>
              </View>
              
              <View style={styles.progressBar}>
                <View 
                  style={[
                    styles.progressFill, 
                    { 
                      width: `${complianceData.braking.percentage}%`,
                      backgroundColor: getComplianceColor(complianceData.braking.compliance)
                    }
                  ]} 
                />
              </View>
            </View>
          </View>
          
          {/* Integration Link to Driving Time Monitoring */}
          {renderIntegrationLink(
            'drivingTime', 
            <Clock3 size={18} color="#333" />, 
            'Check Driving Time Records'
          )}
          
          <View style={styles.noticeContainer}>
            <View style={styles.noticeIcon}>
              <AlertCircle size={20} color="#0277BD" />
            </View>
            <View style={styles.noticeContent}>
              <Text style={styles.noticeTitle}>Authority Notice</Text>
              <Text style={styles.noticeText}>
                This driver compliance data is monitored and available to traffic authorities. Maintain safe driving practices to avoid penalties.
              </Text>
            </View>
          </View>
        </View>
      )}
      
      {/* Violation History with Timeframe Selector */}
      {activeMetricTab === 'violations' && (
        <View style={styles.violationsContainer}>
          {/* Timeframe Selector */}
          <View style={styles.timeframeSelector}>
            <View style={styles.timeframeLabelContainer}>
              <Calendar size={18} color="#0277BD" />
              <Text style={styles.timeframeLabel}>Time Period:</Text>
            </View>
            <View style={styles.timeframeButtons}>
              <TouchableOpacity 
                style={[styles.timeframeButton, selectedTimeframe === 'daily' && styles.selectedTimeframe]}
                onPress={() => setSelectedTimeframe('daily')}
              >
                <Text style={[styles.timeframeButtonText, selectedTimeframe === 'daily' && styles.selectedTimeframeText]}>Daily</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.timeframeButton, selectedTimeframe === 'weekly' && styles.selectedTimeframe]}
                onPress={() => setSelectedTimeframe('weekly')}
              >
                <Text style={[styles.timeframeButtonText, selectedTimeframe === 'weekly' && styles.selectedTimeframeText]}>Weekly</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.timeframeButton, selectedTimeframe === 'monthly' && styles.selectedTimeframe]}
                onPress={() => setSelectedTimeframe('monthly')}
              >
                <Text style={[styles.timeframeButtonText, selectedTimeframe === 'monthly' && styles.selectedTimeframeText]}>Monthly</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.timeframeButton, selectedTimeframe === 'yearly' && styles.selectedTimeframe]}
                onPress={() => setSelectedTimeframe('yearly')}
              >
                <Text style={[styles.timeframeButtonText, selectedTimeframe === 'yearly' && styles.selectedTimeframeText]}>Yearly</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          {/* Violations Summary */}
          <View style={styles.violationsSummary}>
            <Text style={styles.violationsSummaryText}>
              <Text style={styles.violationCount}>{violationHistory.length}</Text> violations found for {getTimeframeLabel().toLowerCase()}
            </Text>
          </View>
          
          {/* Violation List */}
          {violationHistory.length > 0 ? (
            violationHistory.map((violation, index) => (
              <View key={index} style={styles.violationItem}>
                <View style={styles.violationHeader}>
                  <View style={styles.violationInfo}>
                    <Text style={styles.violationType}>{violation.type} Violation</Text>
                    <Text style={styles.violationDateTime}>{violation.date}, {violation.time}</Text>
                  </View>
                  <View style={[styles.severityBadge, { backgroundColor: getSeverityColor(violation.severity) }]}>
                    <Text style={styles.severityText}>{violation.severity}</Text>
                  </View>
                </View>
                
                <Text style={styles.violationDescription}>{violation.description}</Text>
                
                <View style={styles.violationFooter}>
                  <Text style={styles.violationStatus}>
                    Status: <Text style={{ fontWeight: 'bold' }}>Recorded</Text>
                  </Text>
                  
                  <TouchableOpacity style={styles.detailsButton}>
                    <Text style={styles.detailsButtonText}>Details</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          ) : (
            <View style={styles.noViolationsContainer}>
              <Shield size={48} color="#4CAF50" />
              <Text style={styles.noViolationsText}>No violations recorded</Text>
              <Text style={styles.noViolationsSubtext}>Keep up the good driving practices!</Text>
            </View>
          )}
          
          {/* Driver History Analysis Button */}
          {selectedTimeframe === 'yearly' && (
            <TouchableOpacity style={styles.historyAnalysisButton}>
              <Text style={styles.historyAnalysisButtonText}>View Complete Driving History</Text>
            </TouchableOpacity>
          )}
          
          {/* Integration Link to Driving Time */}
          <TouchableOpacity 
            style={styles.linkButton}
            onPress={() => setActiveTab('drivingTime')}
          >
            <Clock3 size={18} color="white" />
            <Text style={styles.linkButtonText}>Check Driving Time Records</Text>
          </TouchableOpacity>
          
          <View style={styles.legalDisclaimer}>
            <Text style={styles.disclaimerText}>
              Violations may be subject to penalties according to local traffic laws. This data is monitored by traffic authorities.
            </Text>
          </View>
        </View>
      )}
    </View>
  );

  // Integration Link to Driving Time
  const renderIntegrationLink = (targetTab, icon, text) => {
    const color = targetTab === 'drivingTime' ? tabColors.drivingTimeTab : tabColors.performanceTab;
    return (
      <TouchableOpacity 
        style={[styles.linkButton, { backgroundColor: color }]}
        onPress={() => setActiveTab(targetTab)}
      >
        {icon}
        <Text style={[styles.linkButtonText, { color: targetTab === 'drivingTime' ? '#333' : 'white' }]}>{text}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft color="black" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {activeTab === 'drivingTime' ? 'Vilotidsrapport' : 'Driver Compliance Monitor'}
        </Text>
      </View>
      
      <ScrollView style={styles.content}>
        {renderDriverInfo()}
        {renderMainTabs()}
        
        {activeTab === 'drivingTime' ? renderDrivingTime() : renderPerformance()}
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
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  infoCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  driverInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  driverImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  driverDetails: {
    marginLeft: 12,
  },
  driverName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  licenseNumber: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  vehicleInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  vehicleDetails: {
    flex: 1,
  },
  vehicleModel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  plateNumber: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  scoreIndicator: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  mainTabsContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  mainTab: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 14,
    backgroundColor: 'white',
  },
  activeMainTab: {
    backgroundColor: '#0277BD',
  },
  drivingTimeTab: {
    backgroundColor: '#FFCC00', // Yellow for Swedish flag
  },
  performanceTab: {
    backgroundColor: '#0277BD', // Blue for Swedish flag
  },
  mainTabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
    marginLeft: 8,
  },
  activeMainTabText: {
    color: 'white',
  },
  drivingTimeTabText: {
    color: '#333', // Dark text for visibility on yellow
  },
  performanceTabText: {
    color: 'white',
  },
  drivingTimeContent: {
    marginTop: 8,
  },
  performanceContent: {
    marginTop: 8,
  },
  metricCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  metricLabel: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  metricValueContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  metricValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  metricUnit: {
    fontSize: 16,
    color: '#666',
    marginLeft: 5,
  },
  metricSubtext: {
    fontSize: 14,
    color: '#999',
    marginTop: 5,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#eee',
    borderRadius: 4,
    marginTop: 10,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#0277BD', // This will be overridden for the driving time tab
    borderRadius: 4,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  halfMetricCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    width: '48%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  weekdayContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  weekdayItem: {
    alignItems: 'center',
    padding: 10,
  },
  activeWeekday: {
    backgroundColor: '#0277BD',
    borderRadius: 10,
  },
  weekdayText: {
    fontSize: 14,
    color: '#666',
  },
  weekdayValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 5,
  },
  activeWeekdayText: {
    color: 'white',
  },
  performanceIndicator: {
    backgroundColor: '#0277BD',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  performanceValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  performanceLabel: {
    fontSize: 12,
    color: 'white',
    opacity: 0.8,
  },
  // Performance monitoring styles
  tabsContainer: {
    flexDirection: 'row',
    marginBottom: 16,
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
  complianceTab: {
    backgroundColor: '#FF9800', // Orange for compliance tab
  },
  violationsTab: {
    backgroundColor: '#F44336', // Red for violations tab (changed from green)
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  activeTabText: {
    color: 'white',
  },
  complianceTabText: {
    color: 'white',
  },
  violationsTabText: {
    color: 'white',
  },
  metricsContainer: {
    marginBottom: 20,
  },
  metricHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  metricTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  complianceBadge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  metricContent: {
    marginTop: 8,
  },
  metricValues: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 8,
  },
  metricLimit: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  warningContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 193, 7, 0.1)',
    padding: 8,
    borderRadius: 4,
    marginBottom: 8,
  },
  warningText: {
    fontSize: 14,
    color: '#333',
    marginLeft: 8,
  },
  noticeContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(33, 150, 243, 0.1)',
    padding: 16,
    borderRadius: 10,
    marginTop: 8,
  },
  noticeIcon: {
    marginRight: 12,
  },
  noticeContent: {
    flex: 1,
  },
  noticeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0277BD',
    marginBottom: 4,
  },
  noticeText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  timeframeSelector: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  timeframeLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  timeframeLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginLeft: 8,
  },
  timeframeButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeframeButton: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f9f9f9',
  },
  selectedTimeframe: {
    backgroundColor: '#0277BD',
    borderColor: '#0277BD',
  },
  timeframeButtonText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  selectedTimeframeText: {
    color: 'white',
  },
  violationsSummary: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(2, 119, 189, 0.1)',
    borderRadius: 8,
    marginBottom: 16,
  },
  violationsSummaryText: {
    fontSize: 14,
    color: '#0277BD',
    fontWeight: '500',
  },
  violationCount: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  violationsContainer: {
    marginBottom: 20,
  },
  violationItem: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  violationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  violationInfo: {
    flex: 1,
  },
  violationType: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  violationDateTime: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  severityBadge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  severityText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  violationDescription: {
    fontSize: 14,
    color: '#333',
    marginBottom: 12,
    lineHeight: 20,
  },
  violationFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 12,
  },
  violationStatus: {
    fontSize: 14,
    color: '#666',
  },
  detailsButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#0277BD',
    borderRadius: 4,
  },
  detailsButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  historyAnalysisButton: {
    backgroundColor: '#0277BD',
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
    marginVertical: 16,
  },
  historyAnalysisButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  noViolationsContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  noViolationsText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 16,
  },
  noViolationsSubtext: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
  },
  legalDisclaimer: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    padding: 16,
    borderRadius: 8,
    marginTop: 8,
  },
  disclaimerText: {
    fontSize: 12,
    color: '#666',
    lineHeight: 18,
    fontStyle: 'italic',
  },
  linkButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    padding: 14,
    marginVertical: 16,
  },
  linkButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 8,
  }
  });