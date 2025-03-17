import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Grid2x2 as Grid, Clock, DollarSign, Settings } from 'lucide-react-native';

export default function AnalysisScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.profileContainer}>
          <Image 
            source={{ uri: 'https://media.licdn.com/dms/image/v2/D4D03AQEibgItFB3cmA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1725048816239?e=1746057600&v=beta&t=n8lmhxwmLFCaTAWkUjHjNTsXTYdQhUzjcnyB9RctlRE' }} 
            style={styles.profileImage} 
          />
        </View>
        
        <Text style={styles.headerTitle}>Analysis</Text>
      </View>
      
      <View style={styles.profileSection}>
        <Image 
          source={{ uri: 'https://media.licdn.com/dms/image/v2/D4D03AQEibgItFB3cmA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1725048816209?e=1746057600&v=beta&t=7bYFsTwYrjjAxb113axTdlxLAWDsuOfVvhdoMjkbjjA' }} 
          style={styles.largeProfileImage} 
        />
        <Text style={styles.profileName}>Zaki Hasbi</Text>
      </View>
      
      <View style={styles.menuGrid}>
        <TouchableOpacity 
          style={styles.menuItem}
          onPress={() => router.push('/driver-performance-detail')}
        >
          <View style={styles.menuIconContainer}>
            <Image 
              source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2684/2684218.png' }} 
              style={styles.menuIcon} 
              resizeMode="contain"
            />
          </View>
          <Text style={styles.menuText}>Driver Performance</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.menuItem}
          onPress={() => router.push('/car-performance-detail')}
        >
          <View style={styles.menuIconContainer}>
            <Image 
              source={{ uri: 'https://cdn-icons-png.flaticon.com/512/8308/8308866.png' }} 
              style={styles.menuIcon} 
              resizeMode="contain"
            />
          </View>
          <Text style={styles.menuText}>Car Performance</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuIconContainer}>
            <Image 
              source={{ uri: 'https://cdn-icons-png.flaticon.com/512/1611/1611255.png' }} 
              style={styles.menuIcon} 
              resizeMode="contain"
            />
          </View>
          <Text style={styles.menuText}>Offers</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.menuItem}
          onPress={() => router.push('/money-manager')}
        >
          <View style={styles.menuIconContainer}>
            <Image 
              source={{ uri: 'https://cdn-icons-png.flaticon.com/512/1907/1907675.png' }} 
              style={styles.menuIcon} 
              resizeMode="contain"
            />
          </View>
          <Text style={styles.menuText}>Money Manager</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.tabBar}>
        <TouchableOpacity 
          style={styles.tabItem}
          onPress={() => router.push('/driver-performance')}
        >
          <Grid color="#777" size={24} />
          <Text style={[styles.tabLabel, styles.inactiveTab]}>Dashboard</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.tabItem}>
          <Clock color="#0277BD" size={24} />
          <Text style={styles.tabLabel}>Analysis</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.tabItem}>
          <DollarSign color="#777" size={24} />
          <Text style={[styles.tabLabel, styles.inactiveTab]}>Finance</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.tabItem}>
          <Settings color="#777" size={24} />
          <Text style={[styles.tabLabel, styles.inactiveTab]}>Settings</Text>
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
    marginRight: 15,
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  profileSection: {
    alignItems: 'center',
    marginVertical: 20,
  },
  largeProfileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  menuItem: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
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
  menuIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  menuIcon: {
    width: 30,
    height: 30,
  },
  menuText: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
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
});