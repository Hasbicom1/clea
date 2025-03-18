import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Switch, Modal, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { Grid2x2 as Grid, Clock, DollarSign, Settings, LogOut } from 'lucide-react-native';

type BreakType = 'lunch' | 'pause' | null;
type Screen = 'dashboard' | 'analysis' | 'finance' | 'settings';

export default function DriverPerformanceScreen() {
  const currentScreen: Screen = 'dashboard'; // Set current screen for tab highlighting
  
  const [showDriverModeOptions, setShowDriverModeOptions] = useState<boolean>(false);
  const [drivingMode, setDrivingMode] = useState<boolean>(true);
  const [selectedBreakType, setSelectedBreakType] = useState<BreakType>(null);
  const [breakDuration, setBreakDuration] = useState<number>(30); // Default 30 minutes
  const [lunchBreakTotal, setLunchBreakTotal] = useState<number>(0); // Total lunch break minutes
  const [pauseBreakTotal, setPauseBreakTotal] = useState<number>(0); // Total pause break minutes
  const [showBreakSummary, setShowBreakSummary] = useState<boolean>(false);
  const [activeBreak, setActiveBreak] = useState<BreakType>(null); // 'lunch' or 'pause' when a break is active
  const [breakTimeRemaining, setBreakTimeRemaining] = useState<number>(0);
  const [breakTimer, setBreakTimer] = useState<NodeJS.Timer | null>(null);
  
  useEffect(() => {
    // Cleanup timer on unmount
    return () => {
      if (breakTimer) {
        clearInterval(breakTimer);
      }
    };
  }, [breakTimer]);
  
  const handleDriverModeToggle = () => {
    if (drivingMode) {
      // If turning off driving mode, show options
      setShowDriverModeOptions(true);
    } else {
      // If turning on driving mode, just toggle
      setDrivingMode(true);
    }
  };
  
  const handleLogout = () => {
    // In a real app, you would call your auth service logout method
    setShowDriverModeOptions(false);
    setDrivingMode(false);
    // Navigate to login screen or similar
    router.push('/'); // Assuming '/' is your login or splash screen
  };
  
  const handleBreakSelection = (breakType: BreakType, defaultDuration: number) => {
    setSelectedBreakType(breakType);
    setBreakDuration(defaultDuration);
  };
  
  const adjustBreakTime = (increment: number) => {
    // Ensure break time is between 5 minutes and 8 hours (480 minutes)
    const newDuration = Math.max(5, Math.min(480, breakDuration + increment));
    setBreakDuration(newDuration);
  };
  
  const startBreak = () => {
    // Set active break type
    setActiveBreak(selectedBreakType);
    // Set initial time remaining
    setBreakTimeRemaining(breakDuration);
    
    // Start timer to count down break time
    const timer = setInterval(() => {
      setBreakTimeRemaining((prev: number) => {
        if (prev <= 1) {
          // Break is over
          if (breakTimer) {
            clearInterval(breakTimer);
          }
          endBreak();
          return 0;
        }
        return prev - 1;
      });
    }, 60000); // Update every minute
    
    setBreakTimer(timer);
    
    // Update appropriate break total
    if (selectedBreakType === 'lunch') {
      setLunchBreakTotal((prev: number) => prev + breakDuration);
    } else if (selectedBreakType === 'pause') {
      setPauseBreakTotal((prev: number) => prev + breakDuration);
    }
    
    // Close modals and set driving mode to off
    setShowDriverModeOptions(false);
    setSelectedBreakType(null);
    setDrivingMode(false);
  };
  
  const endBreak = () => {
    // Clear the timer
    if (breakTimer) {
      clearInterval(breakTimer);
      setBreakTimer(null);
    }
    
    // Reset active break
    setActiveBreak(null);
    setBreakTimeRemaining(0);
    
    // Resume driving mode
    setDrivingMode(true);
  };
  
  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.profileContainer}>
          <Image 
            source={{ uri: 'https://media.licdn.com/dms/image/v2/D4D03AQEibgItFB3cmA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1725048816239?e=1746057600&v=beta&t=n8lmhxwmLFCaTAWkUjHjNTsXTYdQhUzjcnyB9RctlRE' }} 
            style={styles.profileImage} 
          />
        </View>
        
        <View style={styles.drivingModeContainer}>
          <Text style={styles.drivingModeText}>
            {activeBreak ? `On ${activeBreak === 'lunch' ? 'Lunch' : 'Pause'} Break` : 'Driver Mode'}
          </Text>
          <Switch 
            value={drivingMode} 
            trackColor={{ false: '#767577', true: '#0277BD' }}
            thumbColor={'#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={handleDriverModeToggle}
            disabled={activeBreak !== null} // Disable toggle during active break
          />
        </View>
      </View>
      
      {/* Active Break Banner (when a break is active) */}
      {activeBreak && (
        <View style={styles.activeBannerContainer}>
          <Text style={styles.activeBannerText}>
            {activeBreak === 'lunch' ? 'Lunch Break' : 'Pause Break'}: {formatTime(breakTimeRemaining)} remaining
          </Text>
          <TouchableOpacity 
            style={styles.endBreakButton}
            onPress={endBreak}
          >
            <Text style={styles.endBreakButtonText}>End Break</Text>
          </TouchableOpacity>
        </View>
      )}
      
      {/* Driver Performance Section */}
      <TouchableOpacity onPress={() => router.push('/driver-monitoring')}>
        <Text style={styles.sectionTitle}>Körpass</Text>
        
        <View style={styles.timelineContainer}>
          <View style={styles.timelineItem}>
            <View style={[styles.timelineDot, styles.blueDot]} />
            <View style={styles.timelineContent}>
              <Text style={styles.timelineTime}>03:45h</Text>
              <Text style={styles.timelineDescription}>Tid kvar att köra</Text>
            </View>
            <View style={[styles.timelineBar, styles.blueBar]} />
          </View>
          
          <View style={styles.timelineItem}>
            <View style={[styles.timelineDot, styles.yellowDot]} />
            <View style={styles.timelineContent}>
              <Text style={styles.timelineTime}>10:45h</Text>
              <Text style={styles.timelineDescription}>Körd tid</Text>
            </View>
            <View style={[styles.timelineBar, styles.yellowBar]} />
          </View>
          
          <View style={styles.timelineItem}>
            <View style={[styles.timelineDot, styles.blackDot]} />
            <View style={styles.timelineContent}>
              <Text style={styles.timelineTime}>08:15h</Text>
              <Text style={styles.timelineDescription}>Tid kvar till nästa körpass</Text>
            </View>
            <View style={[styles.timelineBar, styles.blackBar]} />
          </View>
        </View>
      </TouchableOpacity>
      
      {/* Taxi Apps Card (Replacing Bil körsträcka card) */}
      <TouchableOpacity 
        style={styles.performanceCard}
        onPress={() => router.push('/offers')}
      >
        <Text style={styles.cardTitle}>Taxi Appar</Text>
        
        <View style={styles.taxiAppsContainer}>
          {/* First Row */}
          <View style={styles.taxiAppsRow}>
            <View style={styles.taxiAppItem}>
              <Image 
                source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png' }} 
                style={styles.taxiAppLogo} 
              />
              <Text style={styles.taxiAppName}>Uber</Text>
              <Text style={[styles.taxiAppStatus, styles.loggedInStatus]}>Inloggad</Text>
            </View>
            
            <View style={styles.taxiAppItem}>
              <Image 
                source={{ uri: 'https://bolt.eu/img/logo.svg' }} 
                style={styles.taxiAppLogo} 
              />
              <Text style={styles.taxiAppName}>Bolt</Text>
              <Text style={[styles.taxiAppStatus, styles.loggedInStatus]}>Inloggad</Text>
            </View>
            
            <View style={styles.taxiAppItem}>
              <Image 
                source={{ uri: 'https://www.cabonline.com/wp-content/themes/cabonline/assets/images/logo.svg' }} 
                style={styles.taxiAppLogo} 
              />
              <Text style={styles.taxiAppName}>TaxiKurir</Text>
              <Text style={[styles.taxiAppStatus, styles.notLoggedInStatus]}>Inte inloggad</Text>
            </View>
          </View>
          
          {/* Second Row */}
          <View style={styles.taxiAppsRow}>
            <View style={styles.taxiAppItem}>
              <Image 
                source={{ uri: 'https://www.taxistockholm.se/wp-content/themes/taxi-stockholm/assets/images/logo.svg' }} 
                style={styles.taxiAppLogo} 
              />
              <Text style={styles.taxiAppName}>Taxi Stockholm</Text>
              <Text style={[styles.taxiAppStatus, styles.loggedInStatus]}>Inloggad</Text>
            </View>
            
            <View style={styles.taxiAppItem}>
              <Image 
                source={{ uri: 'https://svrvs.taxi020.se/images/taxi020_logo.png' }} 
                style={styles.taxiAppLogo} 
              />
              <Text style={styles.taxiAppName}>Taxi 020</Text>
              <Text style={[styles.taxiAppStatus, styles.notLoggedInStatus]}>Inte inloggad</Text>
            </View>
            
            <View style={styles.taxiAppItem}>
              <Image 
                source={{ uri: 'https://www.topcab.se/wp-content/themes/topcab/assets/images/logo.svg' }} 
                style={styles.taxiAppLogo} 
              />
              <Text style={styles.taxiAppName}>TopCab</Text>
              <Text style={[styles.taxiAppStatus, styles.loggedInStatus]}>Inloggad</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
      
      {/* Money Manager Card */}
      <TouchableOpacity 
        style={styles.moneyManagerCard}
        onPress={() => router.push('/money-manager')}
      >
        <Text style={[styles.cardTitle, { color: '#0277BD' }]}>Konto</Text>
        
        <View style={styles.moneyStats}>
          <View style={styles.moneyStat}>
            <Text style={styles.moneyValue}>Sek 300.49</Text>
            <Text style={styles.moneyLabel}>Dagens inkomst</Text>
          </View>
          
          <View style={styles.moneyStat}>
            <Text style={styles.moneyValue}>Sek 150.25</Text>
            <Text style={styles.moneyLabel}>Dagens utgifter</Text>
          </View>
        </View>
      </TouchableOpacity>
      
      {/* Driver Mode Options Modal */}
      <Modal
        visible={showDriverModeOptions}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowDriverModeOptions(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Förare VILOTID</Text>
            
            <TouchableOpacity 
              style={styles.driverModeOption}
              onPress={handleLogout}
            >
              <View style={styles.optionContent}>
                <LogOut size={24} color="#E53935" style={styles.optionIcon} />
                <View>
                  <Text style={styles.optionText}>Logga ut</Text>
                  <Text style={styles.optionDescription}>Sluta Körpass</Text>
                </View>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.driverModeOption}
              onPress={() => handleBreakSelection('lunch', 30)} // 30 minutes default
            >
              <View style={styles.optionContent}>
                <Clock size={24} color="#0277BD" style={styles.optionIcon} />
                <View>
                  <Text style={styles.optionText}>Lunch</Text>
                  <Text style={styles.optionDescription}>Ta en paus för din måltid</Text>
                </View>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.driverModeOption}
              onPress={() => handleBreakSelection('pause', 15)} // 15 minutes default
            >
              <View style={styles.optionContent}>
                <Clock size={24} color="#43A047" style={styles.optionIcon} />
                <View>
                  <Text style={styles.optionText}>Paus</Text>
                  <Text style={styles.optionDescription}>Ta en kort vila</Text>
                </View>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.driverModeOption}
              onPress={() => setShowBreakSummary(true)}
            >
              <View style={styles.optionContent}>
                <Clock size={24} color="#FFA000" style={styles.optionIcon} />
                <View>
                  <Text style={styles.optionText}>Vilotid</Text>
                  <Text style={styles.optionDescription}>Visa dina paustider</Text>
                </View>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.cancelButton}
              onPress={() => setShowDriverModeOptions(false)}
            >
              <Text style={styles.cancelButtonText}>Avbryt</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      
      {/* Break Duration Modal */}
      <Modal
        visible={selectedBreakType !== null}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setSelectedBreakType(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Ställ in pausens längd</Text>
            <Text style={styles.breakTypeSubtitle}>
              {selectedBreakType === 'lunch' ? 'Lunch Vilotid' : 'Pause Vilotid'}
            </Text>
            
            <View style={styles.durationSelector}>
              <TouchableOpacity 
                style={styles.durationButton}
                onPress={() => adjustBreakTime(-5)}
              >
                <Text style={styles.durationButtonText}>-</Text>
              </TouchableOpacity>
              
              <View style={styles.durationDisplay}>
                <Text style={styles.durationText}>{formatTime(breakDuration)}</Text>
              </View>
              
              <TouchableOpacity 
                style={styles.durationButton}
                onPress={() => adjustBreakTime(5)}
              >
                <Text style={styles.durationButtonText}>+</Text>
              </TouchableOpacity>
            </View>
            
            <TouchableOpacity 
              style={styles.confirmButton}
              onPress={startBreak}
            >
              <Text style={styles.confirmButtonText}>Vila</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.cancelButton}
              onPress={() => setSelectedBreakType(null)}
            >
              <Text style={styles.cancelButtonText}>Avbryt</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      
      {/* Break Summary Modal */}
      <Modal
        visible={showBreakSummary}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowBreakSummary(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>dina paustider</Text>
            
            <View style={styles.summaryContainer}>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>Lunch paus Totalt:</Text>
                <Text style={styles.summaryValue}>{formatTime(lunchBreakTotal)}</Text>
              </View>
              
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>vila Totalt:</Text>
                <Text style={styles.summaryValue}>{formatTime(pauseBreakTotal)}</Text>
              </View>
              
              <View style={[styles.summaryItem, styles.summaryTotal]}>
                <Text style={styles.summaryTotalLabel}>Vilotid totalt:</Text>
                <Text style={styles.summaryTotalValue}>{formatTime(lunchBreakTotal + pauseBreakTotal)}</Text>
              </View>
            </View>
            
            <TouchableOpacity 
              style={styles.confirmButton}
              onPress={() => setShowBreakSummary(false)}
            >
              <Text style={styles.confirmButtonText}>Stäng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      
      {/* Tab Bar with Navigation */}
      <View style={styles.tabBar}>
        <TouchableOpacity 
          style={styles.tabItem}
          onPress={() => router.push('/dashboard')}
        >
          <Grid color={currentScreen === 'dashboard' ? "#0277BD" : "#777"} size={24} />
          <Text style={[styles.tabLabel, currentScreen !== 'dashboard' && styles.inactiveTab]}>Dashboard</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.tabItem}
          onPress={() => router.push('/analysis')}
        >
          <Clock color={currentScreen === 'analysis' ? "#0277BD" : "#777"} size={24} />
          <Text style={[styles.tabLabel, currentScreen !== 'analysis' && styles.inactiveTab]}>Analysis</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.tabItem}
          onPress={() => router.push('/money-manager')}
        >
          <DollarSign color={currentScreen === 'finance' ? "#0277BD" : "#777"} size={24} />
          <Text style={[styles.tabLabel, currentScreen !== 'finance' && styles.inactiveTab]}>Finance</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.tabItem}
          onPress={() => router.push('/settings')}
        >
          <Settings color={currentScreen === 'settings' ? "#0277BD" : "#777"} size={24} />
          <Text style={[styles.tabLabel, currentScreen !== 'settings' && styles.inactiveTab]}>Settings</Text>
        </TouchableOpacity>
      </View>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  profileContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  drivingModeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  drivingModeText: {
    marginRight: 10,
    fontSize: 16,
    color: '#333',
  },
  activeBannerContainer: {
    backgroundColor: '#0277BD',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  activeBannerText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  endBreakButton: {
    backgroundColor: 'white',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  endBreakButtonText: {
    color: '#0277BD',
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  timelineContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  timelineItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  timelineDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 10,
  },
  blueDot: {
    backgroundColor: '#0277BD',
  },
  yellowDot: {
    backgroundColor: '#FFD700',
  },
  blackDot: {
    backgroundColor: '#333',
  },
  timelineContent: {
    flex: 1,
  },
  timelineTime: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  timelineDescription: {
    fontSize: 12,
    color: '#777',
  },
  timelineBar: {
    height: 8,
    width: 100,
    borderRadius: 4,
  },
  blueBar: {
    backgroundColor: '#0277BD',
    width: 60,
  },
  yellowBar: {
    backgroundColor: '#FFD700',
    width: 120,
  },
  blackBar: {
    backgroundColor: '#333',
    width: 80,
  },
  performanceCard: {
    backgroundColor: '#222',
    borderRadius: 15,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 15,
  },
  taxiAppsContainer: {
    width: '100%',
    paddingHorizontal: 5,
  },
  taxiAppsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  taxiAppItem: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 10,
    width: '31%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  taxiAppLogo: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    marginBottom: 8,
  },
  taxiAppName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 4,
  },
  taxiAppStatus: {
    fontSize: 10,
    textAlign: 'center',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  loggedInStatus: {
    backgroundColor: '#E8F5E9',
    color: '#2E7D32',
  },
  notLoggedInStatus: {
    backgroundColor: '#FFEBEE',
    color: '#C62828',
  },
  moneyManagerCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 20,
    shadowColor: '#ffd700',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  moneyStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  moneyStat: {
    alignItems: 'center',
  },
  moneyValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  moneyLabel: {
    fontSize: 12,
    color: '#777',
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  tabItem: {
    alignItems: 'center',
  },
  tabLabel: {
    fontSize: 12,
    color: '#0277BD',
    marginTop: 5,
  },
  inactiveTab: {
    color: '#777',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    width: '85%',
    maxHeight: '85%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  breakTypeSubtitle: {
    fontSize: 16,
    color: '#0277BD',
    marginBottom: 20,
    textAlign: 'center',
  },
  driverModeOption: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionIcon: {
    marginRight: 15,
  },
  optionText: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: 14,
    color: '#777',
  },
  durationSelector: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  durationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#0277BD',
    justifyContent: 'center',
    alignItems: 'center',
  },
  durationButtonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  durationDisplay: {
    marginHorizontal: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  durationText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  confirmButton: {
    backgroundColor: '#0277BD',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#f5f5f5',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#333',
    fontSize: 16,
  },
  summaryContainer: {
    marginVertical: 20,
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  summaryLabel: {
    fontSize: 16,
    color: '#333',
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0277BD',
  },
  summaryTotal: {
    marginTop: 10,
    paddingTop: 10,
    borderBottomWidth: 0,
  },
  summaryTotalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  summaryTotalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0277BD',
  },
});