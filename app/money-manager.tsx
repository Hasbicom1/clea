import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal, TextInput, Image } from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft, Grid2x2 as Grid, Clock, DollarSign, Settings, Plus, Download, TrendingUp, TrendingDown } from 'lucide-react-native';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

export default function MoneyManagerScreen() {
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [expenseType, setExpenseType] = useState('Business');
  const [expenseCategory, setExpenseCategory] = useState('');
  const [showCategorySelector, setShowCategorySelector] = useState(false);
  const [entryDate, setEntryDate] = useState(new Date());
  const [entryAmount, setEntryAmount] = useState('');
  const [entryNote, setEntryNote] = useState('');
  const [showKeypad, setShowKeypad] = useState(false);
  
  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        data: [150, 220, 180, 250, 300, 270, 350],
        color: (opacity = 1) => `rgba(2, 119, 189, ${opacity})`,
        strokeWidth: 2
      }
    ],
    legend: ["Weekly Earnings"]
  };

  const chartConfig = {
    backgroundGradientFrom: "#fff",
    backgroundGradientTo: "#fff",
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(2, 119, 189, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16
    },
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: "#0277BD"
    }
  };
  
  // Function to handle saving a receipt
  const saveReceipt = () => {
    // Here you would save the receipt data
    // For now, just close the modal and reset fields
    setShowReceiptModal(false);
    setExpenseType('Business');
    setExpenseCategory('');
    setEntryAmount('');
    setEntryNote('');
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
        <Text style={styles.headerTitle}>Money Manager</Text>
      </View>
      
      <ScrollView style={styles.content}>
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Current Balance</Text>
          <Text style={styles.balanceValue}>Sek 1,245.67</Text>
          <View style={styles.balanceActions}>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => setShowReceiptModal(true)}
            >
              <Plus size={16} color="white" style={styles.actionIcon} />
              <Text style={styles.actionButtonText}>ADD RECEIPT</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.chartContainer}>
          <View style={styles.chartHeader}>
            <Text style={styles.sectionTitle}>Earnings Overview</Text>
            <View style={styles.periodSelector}>
              <TouchableOpacity style={[styles.periodButton, styles.activePeriod]}>
                <Text style={styles.activePeriodText}>Week</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.periodButton}>
                <Text style={styles.periodText}>Month</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.periodButton}>
                <Text style={styles.periodText}>Year</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          <LineChart
            data={data}
            width={screenWidth - 40}
            height={220}
            chartConfig={chartConfig}
            bezier
            style={styles.chart}
          />
          
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <View style={styles.statHeader}>
                <Text style={styles.statLabel}>Total Income</Text>
                <TrendingUp size={16} color="#43A047" />
              </View>
              <Text style={[styles.statValue, styles.incomeValue]}>Sek 1,720</Text>
              <Text style={styles.statChange}>+12% from last week</Text>
            </View>
            
            <View style={styles.statItem}>
              <View style={styles.statHeader}>
                <Text style={styles.statLabel}>Total Expenses</Text>
                <TrendingDown size={16} color="#E53935" />
              </View>
              <Text style={[styles.statValue, styles.expenseValue]}>Sek 475</Text>
              <Text style={styles.statChange}>-5% from last week</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.transactionsContainer}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
          
          <View style={styles.transactionItem}>
            <View style={[styles.transactionCategory, styles.fuelCategory]}>
              <DollarSign color="white" size={16} />
            </View>
            <View style={styles.transactionInfo}>
              <Text style={styles.transactionTitle}>Fuel Payment</Text>
              <Text style={styles.transactionDate}>Today, 10:45 AM</Text>
            </View>
            <Text style={[styles.transactionAmount, styles.expenseAmount]}>-Sek 45.00</Text>
          </View>
          
          <View style={styles.transactionItem}>
            <View style={[styles.transactionCategory, styles.earningsCategory]}>
              <TrendingUp color="white" size={16} />
            </View>
            <View style={styles.transactionInfo}>
              <Text style={styles.transactionTitle}>Trip Earnings</Text>
              <Text style={styles.transactionDate}>Today, 09:30 AM</Text>
            </View>
            <Text style={[styles.transactionAmount, styles.incomeAmount]}>+Sek 120.50</Text>
          </View>
          
          <View style={styles.transactionItem}>
            <View style={[styles.transactionCategory, styles.maintenanceCategory]}>
              <Settings color="white" size={16} />
            </View>
            <View style={styles.transactionInfo}>
              <Text style={styles.transactionTitle}>Maintenance</Text>
              <Text style={styles.transactionDate}>Yesterday, 02:15 PM</Text>
            </View>
            <Text style={[styles.transactionAmount, styles.expenseAmount]}>-Sek 85.75</Text>
          </View>
          
          <View style={styles.transactionItem}>
            <View style={[styles.transactionCategory, styles.earningsCategory]}>
              <TrendingUp color="white" size={16} />
            </View>
            <View style={styles.transactionInfo}>
              <Text style={styles.transactionTitle}>Trip Earnings</Text>
              <Text style={styles.transactionDate}>Yesterday, 11:20 AM</Text>
            </View>
            <Text style={[styles.transactionAmount, styles.incomeAmount]}>+Sek 95.25</Text>
          </View>
          
          <TouchableOpacity style={styles.viewAllButton}>
            <Text style={styles.viewAllText}>View All Transactions</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.summaryContainer}>
          <Text style={styles.sectionTitle}>Today's Summary</Text>
          
          <View style={styles.summaryRow}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Income</Text>
              <Text style={[styles.summaryValue, styles.incomeValue]}>Sek 215.75</Text>
            </View>
            
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Expenses</Text>
              <Text style={[styles.summaryValue, styles.expenseValue]}>Sek 130.75</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      
      {/* Receipt Entry Modal */}
      <Modal
        visible={showReceiptModal}
        animationType="slide"
        onRequestClose={() => setShowReceiptModal(false)}
      >
        <View style={styles.receiptModalContainer}>
          <View style={styles.receiptModalHeader}>
            <TouchableOpacity onPress={() => setShowReceiptModal(false)}>
              <Text style={styles.backText}>← Add Entry</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.entryTypeSelector}>
            <TouchableOpacity 
              style={[
                styles.entryTypeButton, 
                expenseType === 'Business' && styles.entryTypeButtonActive
              ]}
              onPress={() => setExpenseType('Business')}
            >
              <Text style={[
                styles.entryTypeText,
                expenseType === 'Business' && styles.entryTypeTextActive
              ]}>Business</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[
                styles.entryTypeButton, 
                expenseType === 'Personal' && styles.entryTypeButtonActive
              ]}
              onPress={() => setExpenseType('Personal')}
            >
              <Text style={[
                styles.entryTypeText,
                expenseType === 'Personal' && styles.entryTypeTextActive
              ]}>Personal</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[
                styles.entryTypeButton, 
                expenseType === 'Other' && styles.entryTypeButtonActive
              ]}
              onPress={() => setExpenseType('Other')}
            >
              <Text style={[
                styles.entryTypeText,
                expenseType === 'Other' && styles.entryTypeTextActive
              ]}>Other</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.formContainer}>
            <View style={styles.formRow}>
              <Text style={styles.formLabel}>Date</Text>
              <View style={styles.formInput}>
                <Text>{entryDate.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: '2-digit' })} (Sat) {entryDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}</Text>
              </View>
            </View>
            
            <View style={styles.formRow}>
              <Text style={styles.formLabel}>Category</Text>
              <TouchableOpacity 
                style={styles.formInput}
                onPress={() => setShowCategorySelector(true)}
              >
                <Text>{expenseCategory || 'Select Category'}</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.formRow}>
              <Text style={styles.formLabel}>Amount</Text>
              <TouchableOpacity
                style={styles.formInput}
                onPress={() => setShowKeypad(true)}
              >
                <Text>{entryAmount || '0.00'}</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.formRow}>
              <Text style={styles.formLabel}>Note</Text>
              <TextInput
                style={styles.formInput}
                placeholder="Add note"
                value={entryNote}
                onChangeText={setEntryNote}
              />
            </View>
            
            <View style={styles.uploadContainer}>
              <TouchableOpacity style={styles.uploadButton}>
                <Text style={styles.uploadButtonText}>UPLOAD RECEIPT</Text>
              </TouchableOpacity>
            </View>
            
            <TouchableOpacity 
              style={styles.saveButton}
              onPress={saveReceipt}
            >
              <Text style={styles.saveButtonText}>SAVE</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      
      {/* Category Selector Modal */}
      <Modal
        visible={showCategorySelector}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowCategorySelector(false)}
      >
        <View style={styles.selectorModalOverlay}>
          <View style={styles.selectorModalContent}>
            <View style={styles.selectorHeader}>
              <Text style={styles.selectorTitle}>Expense Category</Text>
              <TouchableOpacity onPress={() => setShowCategorySelector(false)}>
                <Text style={styles.closeButton}>✕</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.categoryGrid}>
              {['Food', 'Fuel', 'Parking', 'Car Wash', 'Maintenance', 'Fine', 'Payment', 'Tax', 'Tolls'].map((category) => (
                <TouchableOpacity 
                  key={category}
                  style={styles.categoryOption}
                  onPress={() => {
                    setExpenseCategory(category);
                    setShowCategorySelector(false);
                  }}
                >
                  <View style={[styles.categoryIcon, 
                    category === 'Food' ? styles.foodCategory :
                    category === 'Fuel' ? styles.fuelCategory :
                    category === 'Maintenance' ? styles.maintenanceCategory :
                    styles.otherCategory
                  ]}>
                    <Text style={styles.categoryIconText}>•</Text>
                  </View>
                  <Text style={styles.categoryOptionText}>{category}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </Modal>
      
      {/* Keypad Modal */}
      <Modal
        visible={showKeypad}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowKeypad(false)}
      >
        <View style={styles.selectorModalOverlay}>
          <View style={styles.keypadContainer}>
            <View style={styles.selectorHeader}>
              <Text style={styles.selectorTitle}>Amount</Text>
              <TouchableOpacity onPress={() => setShowKeypad(false)}>
                <Text style={styles.closeButton}>✕</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.keypadGrid}>
              {[1, 2, 3, 'DEL', 4, 5, 6, '-', 7, 8, 9, '+', 0, '.', 'Done'].map((key) => (
                <TouchableOpacity 
                  key={key.toString()}
                  style={[
                    styles.keypadButton,
                    key === 'Done' && styles.doneButton
                  ]}
                  onPress={() => {
                    if (key === 'Done') {
                      setShowKeypad(false);
                    } else if (key === 'DEL') {
                      setEntryAmount(prev => prev.slice(0, -1));
                    } else {
                      setEntryAmount(prev => prev + key.toString());
                    }
                  }}
                >
                  <Text style={[
                    styles.keypadText,
                    key === 'Done' && styles.doneText
                  ]}>{key}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </Modal>
      
      <View style={styles.tabBar}>
        <TouchableOpacity 
          style={styles.tabItem}
          onPress={() => router.push('/driver-performance')}
        >
          <Grid color="#777" size={24} />
          <Text style={[styles.tabLabel, styles.inactiveTab]}>Dashboard</Text>
        </TouchableOpacity>
        
        {/* In your Money Manager / Finance screen */}
<TouchableOpacity 
  style={styles.tabItem}
  onPress={() => router.push('/analysis')}  // Make sure this line is present
>
  <Clock color="#777" size={24} />
  <Text style={[styles.tabLabel, styles.inactiveTab]}>Analysis</Text>
</TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.tabItem}
          onPress={() => router.push('/money-manager')}
        >
          <DollarSign color="#0277BD" size={24} />
          <Text style={[styles.tabLabel, styles.activeTab]}>Finance</Text>
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
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    marginRight: 16,
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
  balanceCard: {
    backgroundColor: '#0277BD',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    elevation: 2,
  },
  balanceLabel: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  balanceValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginVertical: 8,
  },
  balanceActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  actionButton: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
    marginHorizontal: 4,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  actionIcon: {
    marginRight: 8,
  },
  actionButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  chartContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  periodSelector: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    padding: 4,
  },
  periodButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  activePeriod: {
    backgroundColor: '#0277BD',
  },
  periodText: {
    fontSize: 12,
    color: '#666',
  },
  activePeriodText: {
    fontSize: 12,
    color: 'white',
    fontWeight: '500',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  statItem: {
    width: '48%',
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 12,
  },
  statHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 4,
  },
  statChange: {
    fontSize: 11,
    color: '#666',
  },
  transactionsContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  transactionCategory: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  fuelCategory: {
    backgroundColor: '#FF9800',
  },
  earningsCategory: {
    backgroundColor: '#4CAF50',
  },
  maintenanceCategory: {
    backgroundColor: '#9C27B0',
  },
  transactionInfo: {
    flex: 1,
  },
  transactionTitle: {
    fontSize: 15,
    fontWeight: '500',
  },
  transactionDate: {
    fontSize: 13,
    color: '#777',
    marginTop: 2,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  expenseAmount: {
    color: '#E53935',
  },
  incomeAmount: {
    color: '#43A047',
  },
  viewAllButton: {
    alignItems: 'center',
    paddingVertical: 12,
    marginTop: 8,
  },
  viewAllText: {
    color: '#0277BD',
    fontWeight: '500',
  },
  summaryContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 80,
    elevation: 2,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 16,
    margin: 4,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#777',
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  incomeValue: {
    color: '#43A047',
  },
  expenseValue: {
    color: '#E53935',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingVertical: 8,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLabel: {
    fontSize: 12,
    marginTop: 4,
  },
  activeTab: {
    color: '#0277BD',
    fontWeight: '500',
  },
  inactiveTab: {
    color: '#777',
  },
  // Receipt Modal Styles
  receiptModalContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  receiptModalHeader: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backText: {
    fontSize: 16,
    color: '#333',
  },
  entryTypeSelector: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  entryTypeButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 20,
    marginHorizontal: 5,
    backgroundColor: '#f5f5f5',
  },
  entryTypeButtonActive: {
    backgroundColor: '#0277BD',
  },
  entryTypeText: {
    color: '#777',
    fontWeight: '500',
  },
  entryTypeTextActive: {
    color: 'white',
  },
  formContainer: {
    padding: 20,
  },
  formRow: {
    marginBottom: 20,
  },
  formLabel: {
    fontSize: 14,
    color: '#777',
    marginBottom: 5,
  },
  formInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 8,
    fontSize: 16,
  },
  uploadContainer: {
    marginVertical: 20,
  },
  uploadButton: {
    backgroundColor: '#f5f5f5',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderStyle: 'dashed',
  },
  uploadButtonText: {
    color: '#0277BD',
    fontWeight: '500',
  },
  saveButton: {
    backgroundColor: '#0277BD',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  selectorModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  selectorModalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingVertical: 20,
    maxHeight: '80%',
  },
  selectorHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  selectorTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    fontSize: 18,
    color: '#777',
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 10,
  },
  categoryOption: {
    width: '33.33%',
    padding: 10,
    alignItems: 'center',
  },
  categoryIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  foodCategory: {
    backgroundColor: '#E53935',
  },
  otherCategory: {
    backgroundColor: '#43A047',
  },
  categoryIconText: {
    color: 'white',
    fontSize: 20,
  },
  categoryOptionText: {
    fontSize: 14,
  },
  keypadContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingBottom: 20,
  },
  keypadGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
  },
  keypadButton: {
    width: '25%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  keypadText: {
    fontSize: 24,
    color: '#333',
  },
  doneButton: {
    backgroundColor: '#0277BD',
    margin: 5,
    borderRadius: 8,
  },
  doneText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  }
});