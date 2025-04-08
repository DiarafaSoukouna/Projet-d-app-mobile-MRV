import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Feather from '@expo/vector-icons/Feather';
import {get_data} from '../get_api';
import { useState, useEffect } from 'react';
import { BaseURL } from '../get_api';


export default function Tab() {
  const [documents, setDocuments] = useState([]);
  const get_documents = async () => {
    get_data(`${BaseURL}/documents`, setDocuments);
  }
  useEffect(() => {
    get_documents();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
           <Text style={{fontSize: 30,fontWeight: 500, marginLeft:10}}>Documents</Text>
           <ScrollView >
            <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
            {/* {documents.map((document) => (
               <View style={styles.card}>
               <MaterialIcons name="insert-drive-file" size={30} color="#01afaf" />
               <Text style={{fontSize:20, marginTop: 10}}>{document.nom}</Text>
               <View style={{alignItems: 'flex-end'}}>
               <Feather name="download" size={24} color="#01afaf" />
               </View>
               </View>
            ))} */}
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
          
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  card: {
  width: '42%',
    padding: 20,
    margin: 10,
    borderRadius: 10,
    backgroundColor: '#e6fafa',

  },
});
