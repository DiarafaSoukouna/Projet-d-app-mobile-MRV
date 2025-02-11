import { View, Text, StyleSheet, ScrollView } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Feather from '@expo/vector-icons/Feather';


export default function Tab() {
  return (
    <View style={styles.container}>
           <Text style={{fontSize: 30, marginTop: '15%', fontWeight: 500, marginLeft:10}}>Documents</Text>
           <ScrollView >
            <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
            <View style={styles.card}>
           <MaterialIcons name="insert-drive-file" size={30} color="#01afaf" />
           <Text style={{fontSize:20, marginTop: 10}}>Document 1</Text>
           <View style={{alignItems: 'flex-end'}}>
           <Feather name="download" size={24} color="#01afaf" />
           </View>
           </View>
           <View style={styles.card}>
           <MaterialIcons name="insert-drive-file" size={30} color="#01afaf" />
           <Text style={{fontSize:20, marginTop: 10}}>Document 1</Text>
           <View style={{alignItems: 'flex-end'}}>
           <Feather name="download" size={24} color="#01afaf" />
           </View>
           </View>
           <View style={styles.card}>
           <MaterialIcons name="insert-drive-file" size={30} color="#01afaf" />
           <Text style={{fontSize:20, marginTop: 10}}>Document 1</Text>
           <View style={{alignItems: 'flex-end'}}>
           <Feather name="download" size={24} color="#01afaf" />
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
    backgroundColor: '#fff',
  },
  card: {
  width: '45%',
    padding: 20,
    margin: 10,
    borderRadius: 10,
    backgroundColor: '#f9f9f9',

  },
});
