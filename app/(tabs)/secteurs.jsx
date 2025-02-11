import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import Entypo from '@expo/vector-icons/Entypo';

export default function Tab() {
const router = useRouter();
const id = 1;


  return (
    <View style={styles.container}>
     
      <Text style={{fontSize: 30, marginTop: '15%', fontWeight: 500, marginLeft:10}}>Secteurs</Text>
    <ScrollView>
    
        
      <View style={styles.card}> 
        <Text style={{color: '#01afaf'}}>Titre...</Text>
        <View style={{flexDirection: 'row', gap:10}}>
        <View style={styles.verticleLine}></View>
        <Text style={{maxWidth: '90%', marginTop: 10, fontWeight:300}}>
          <Text style={{fontSize: 16, color: '#01AFAF', fontWeight: 500}}>Description : </Text>printing and typesetting industry. 
          Lorem Ipsum has been the industry's standard dummy 
          text ever since the 1500s, when an
         </Text>
        </View>
        <TouchableOpacity onPress={() => router.push(`/secteur/${id}`)}> 
        <View style={{alignItems: 'flex-end'}}>
          <Entypo name="eye" style={{float:'right'}}size={24} color="#01afaf" />
       
        
      </View>
        </TouchableOpacity>

      </View>
      <View style={styles.card}>
        <Text style={{color: '#01afaf'}}>Titre...</Text>
        <View style={{flexDirection: 'row', gap:10}}>
        <View style={styles.verticleLine}></View>
        <Text style={{maxWidth: '90%', marginTop: 10, fontWeight:300}}>
          <Text style={{fontSize: 16, color: '#01AFAF', fontWeight: 500}}>Description : </Text>printing and typesetting industry. 
          Lorem Ipsum has been the industry's standard dummy 
          text ever since the 1500s, when an
         </Text>
        </View>
        <View style={{alignItems: 'flex-end'}}>
        <Entypo name="eye" style={{float:'right'}}size={24} color="#01afaf" />
        
      </View>
      </View>
      <View style={styles.card}>
        <Text style={{color: '#01afaf'}}>Titre...</Text>
        <View style={{flexDirection: 'row', gap:10}}>
        <View style={styles.verticleLine}></View>
        <Text style={{maxWidth: '90%', marginTop: 10, fontWeight:300}}>
          <Text style={{fontSize: 16, color: '#01AFAF', fontWeight: 500}}>Description : </Text>printing and typesetting industry. 
          Lorem Ipsum has been the industry's standard dummy 
          text ever since the 1500s, when an
         </Text>
        </View>
        <View style={{alignItems: 'flex-end'}}>
        <Entypo name="eye" style={{float:'right'}}size={24} color="#01afaf" />
        
      </View>
      </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginLeft: 15,
    backgroundColor: '#fff',
   
  },
  verticleLine:{
    height: '90%',
    width: 1.8,
    marginTop: 10,
    marginLeft: 10,
    backgroundColor: '#01afaf',
  },
  card: {
    backgroundColor: '#f1f1f1',
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
    marginRight: 15,
    marginLeft: 15,
  
  }
});
