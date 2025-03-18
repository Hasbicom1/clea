import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft, MapPin, Clock, DollarSign, User } from 'lucide-react-native';

export default function OffersScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft color="white" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Customer Orders</Text>
      </View>
      
      <ScrollView style={styles.content}>
        {/* Active Orders Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Active Orders</Text>
          
          {/* Uber Order */}
          <View style={styles.orderCard}>
            <View style={styles.orderHeader}>
              <Image 
                source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png' }}
                style={styles.orderLogo}
              />
              <View style={styles.orderStatus}>
                <Text style={styles.orderStatusText}>New</Text>
              </View>
            </View>
            
            <View style={styles.orderContent}>
              <View style={styles.customerInfo}>
                <User size={16} color="#666" />
                <Text style={styles.customerName}>John Doe</Text>
              </View>
              
              <View style={styles.locationInfo}>
                <View style={styles.locationItem}>
                  <MapPin size={16} color="#0277BD" />
                  <Text style={styles.locationText}>Pickup: Central Station</Text>
                </View>
                <View style={styles.locationItem}>
                  <MapPin size={16} color="#E53935" />
                  <Text style={styles.locationText}>Dropoff: Arlanda Airport</Text>
                </View>
              </View>
              
              <View style={styles.orderDetails}>
                <View style={styles.detailItem}>
                  <Clock size={16} color="#666" />
                  <Text style={styles.detailText}>ETA: 5 mins</Text>
                </View>
                <View style={styles.detailItem}>
                  <DollarSign size={16} color="#666" />
                  <Text style={styles.detailText}>Sek 450</Text>
                </View>
              </View>
              
              <TouchableOpacity style={styles.acceptButton}>
                <Text style={styles.acceptButtonText}>Accept Order</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          {/* Bolt Order */}
          <View style={styles.orderCard}>
            <View style={styles.orderHeader}>
              <Image 
                source={{ uri: 'https://bolt.eu/img/logo.svg' }}
                style={styles.orderLogo}
              />
              <View style={[styles.orderStatus, styles.urgentStatus]}>
                <Text style={styles.orderStatusText}>Urgent</Text>
              </View>
            </View>
            
            <View style={styles.orderContent}>
              <View style={styles.customerInfo}>
                <User size={16} color="#666" />
                <Text style={styles.customerName}>Emma Smith</Text>
              </View>
              
              <View style={styles.locationInfo}>
                <View style={styles.locationItem}>
                  <MapPin size={16} color="#0277BD" />
                  <Text style={styles.locationText}>Pickup: Södermalm</Text>
                </View>
                <View style={styles.locationItem}>
                  <MapPin size={16} color="#E53935" />
                  <Text style={styles.locationText}>Dropoff: Gamla Stan</Text>
                </View>
              </View>
              
              <View style={styles.orderDetails}>
                <View style={styles.detailItem}>
                  <Clock size={16} color="#666" />
                  <Text style={styles.detailText}>ETA: 3 mins</Text>
                </View>
                <View style={styles.detailItem}>
                  <DollarSign size={16} color="#666" />
                  <Text style={styles.detailText}>Sek 280</Text>
                </View>
              </View>
              
              <TouchableOpacity style={styles.acceptButton}>
                <Text style={styles.acceptButtonText}>Accept Order</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        
        {/* Upcoming Orders Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Upcoming Orders</Text>
          
          {/* TaxiKurir Order */}
          <View style={styles.orderCard}>
            <View style={styles.orderHeader}>
              <Image 
                source={{ uri: 'https://www.cabonline.com/wp-content/themes/cabonline/assets/images/logo.svg' }}
                style={styles.orderLogo}
              />
              <View style={[styles.orderStatus, styles.scheduledStatus]}>
                <Text style={styles.orderStatusText}>Scheduled</Text>
              </View>
            </View>
            
            <View style={styles.orderContent}>
              <View style={styles.customerInfo}>
                <User size={16} color="#666" />
                <Text style={styles.customerName}>Alex Johnson</Text>
              </View>
              
              <View style={styles.locationInfo}>
                <View style={styles.locationItem}>
                  <MapPin size={16} color="#0277BD" />
                  <Text style={styles.locationText}>Pickup: Östermalm</Text>
                </View>
                <View style={styles.locationItem}>
                  <MapPin size={16} color="#E53935" />
                  <Text style={styles.locationText}>Dropoff: Vasastan</Text>
                </View>
              </View>
              
              <View style={styles.orderDetails}>
                <View style={styles.detailItem}>
                  <Clock size={16} color="#666" />
                  <Text style={styles.detailText}>Scheduled for 15:30</Text>
                </View>
                <View style={styles.detailItem}>
                  <DollarSign size={16} color="#666" />
                  <Text style={styles.detailText}>Sek 320</Text>
                </View>
              </View>
              
              <TouchableOpacity style={styles.acceptButton}>
                <Text style={styles.acceptButtonText}>Schedule Order</Text>
              </TouchableOpacity>
            </View>
          </View>
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
    backgroundColor: '#0277BD',
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
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  orderCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  orderLogo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  orderStatus: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  urgentStatus: {
    backgroundColor: '#FFEBEE',
  },
  scheduledStatus: {
    backgroundColor: '#E3F2FD',
  },
  orderStatusText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#2E7D32',
  },
  orderContent: {
    gap: 12,
  },
  customerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  customerName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  locationInfo: {
    gap: 8,
  },
  locationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  locationText: {
    fontSize: 14,
    color: '#666',
  },
  orderDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  detailText: {
    fontSize: 14,
    color: '#666',
  },
  acceptButton: {
    backgroundColor: '#0277BD',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  acceptButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
}); 