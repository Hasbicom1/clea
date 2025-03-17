import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft, ChevronRight } from 'lucide-react-native';

export default function OverviewScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft color="white" size={24} />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerTitle}>Översikt</Text>
          <Text style={styles.headerSubtitle}>WU-JE-2592</Text>
        </View>
      </View>
      
      <ScrollView style={styles.content}>
        <View style={styles.chartContainer}>
          <View style={styles.chartHeader}>
            <Text style={styles.chartValue}>09:45h</Text>
            <View style={styles.chartIndicator}>
              <View style={styles.indicatorDot} />
            </View>
          </View>
          
          <View style={styles.chart}>
            {/* Chart bars */}
            <View style={styles.chartBars}>
              {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, index) => (
                <View key={index} style={styles.barContainer}>
                  <View 
                    style={[
                      styles.bar, 
                      index === 4 && styles.activeBar,
                      { height: [60, 30, 70, 40, 90, 50, 80][index] }
                    ]} 
                  />
                  <Text style={styles.barLabel}>{day}</Text>
                </View>
              ))}
            </View>
            
            {/* Y-axis labels */}
            <View style={styles.yAxis}>
              {['10:00', '08:00', '06:00', '04:00', '02:00', '00:00'].map((time, index) => (
                <Text key={index} style={styles.yAxisLabel}>{time}</Text>
              ))}
            </View>
          </View>
        </View>
        
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <View style={styles.statContent}>
              <View>
                <Text style={styles.statLabel}>Senaste körtid</Text>
                <Text style={styles.statValue}>09:45</Text>
              </View>
              <Text style={styles.statSubtext}>Nästa körpass 0:45 h</Text>
            </View>
          </View>
          
          <TouchableOpacity 
            style={styles.statCard}
            onPress={() => router.push('/overview-performance')}
          >
            <View style={styles.statContent}>
              <View style={styles.statRow}>
                <Text style={styles.statLabel}>Bilen basprestanda</Text>
                <ChevronRight size={20} color="#0277BD" />
              </View>
              <View style={styles.statValueContainer}>
                <Text style={[styles.statValue, styles.performanceValue]}>90%</Text>
                <Text style={styles.scoreText}>Totalt</Text>
              </View>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.statCard}
            onPress={() => router.push('/overview-usage')}
          >
            <View style={styles.statContent}>
              <View style={styles.statRow}>
                <Text style={styles.statLabel}>Laddnings-bränslestatistik</Text>
                <ChevronRight size={20} color="#0277BD" />
              </View>
              <View style={styles.statValueContainer}>
                <Text style={[styles.statValue, styles.usageValue]}>15%</Text>
                <Text style={styles.remainingText}>kvar</Text>
              </View>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.statCard}
            onPress={() => router.push('/overview-earnings')}
          >
            <View style={styles.statContent}>
              <View style={styles.statRow}>
                <Text style={styles.statLabel}>Igår inkomst</Text>
                <ChevronRight size={20} color="#0277BD" />
              </View>
              <Text style={[styles.statValue, styles.earningValue]}>Sek 300.49</Text>
            </View>
          </TouchableOpacity>
        </View>
        
      <TouchableOpacity style={styles.skipButton} onPress={() => router.push('/driver-performance')}>
          <Text style={styles.skipButtonText}>SKIP</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0277BD',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  backButton: {
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  content: {
    flex: 1,
  },
  chartContainer: {
    backgroundColor: '#0277BD',
    padding: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  chartValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  chartIndicator: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicatorDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#0277BD',
  },
  chart: {
    height: 200,
    flexDirection: 'row',
    marginTop: 10,
  },
  yAxis: {
    width: 50,
    justifyContent: 'space-between',
  },
  yAxisLabel: {
    color: 'white',
    fontSize: 12,
  },
  chartBars: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
  },
  barContainer: {
    alignItems: 'center',
  },
  bar: {
    width: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 5,
  },
  activeBar: {
    backgroundColor: '#FFD700',
    width: 15,
  },
  barLabel: {
    color: 'white',
    marginTop: 5,
    fontSize: 12,
  },
  statsContainer: {
    padding: 15,
  },
  statCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 15,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  statContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
  statLabel: {
    fontSize: 16,
    color: '#333',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  statSubtext: {
    fontSize: 14,
    color: '#666',
  },
  statValueContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  performanceValue: {
    color: '#0277BD',
  },
  usageValue: {
    color: '#0277BD',
  },
  earningValue: {
    color: '#0277BD',
  },
  scoreText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 5,
  },
  remainingText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 5,
  },
  skipButton: {
    backgroundColor: '#0277BD',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 30,
  },
  skipButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});