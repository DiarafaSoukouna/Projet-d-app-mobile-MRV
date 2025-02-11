import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useRouter } from 'expo-router';





export default function Tab() {
  const router= useRouter();
  const id=1;
  return (
    <View style={styles.container}>
          
           <Text style={{fontSize: 30, marginTop: '15%', fontWeight: 500, marginLeft:10}}>Actions</Text>
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
              <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 20}}>
              <View style={{flexDirection: 'row'}}>
                    <AntDesign name="calendar" size={24} color="#01AFAF" />
                    <Text style={{marginTop: 3, marginLeft: 10}}>
                        Date: 12/12/2021
                    </Text>
                    </View>
              <TouchableOpacity onPress={()=> router.push(`../action/${id}`)}>
              <Entypo name="eye" style={{float:'right'}}size={24} color="#01afaf" />
              </TouchableOpacity>
              
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
              <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 20}}>
              <View style={{flexDirection: 'row'}}>
                    <AntDesign name="calendar" size={24} color="#01AFAF" />
                    <Text style={{marginTop: 3, marginLeft: 10}}>
                        Date: 12/12/2021
                    </Text>
                    </View>
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
              <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 20}}>
              <View style={{flexDirection: 'row'}}>
                    <AntDesign name="calendar" size={24} color="#01AFAF" />
                    <Text style={{marginTop: 3, marginLeft: 10}}>
                        Date: 12/12/2021
                    </Text>
                    </View>
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
    backgroundColor: '#fff',
  
  },
  verticleLine:{
    height: '90%',
    width: 2,
    marginTop: 10,
    marginLeft: 10,
    backgroundColor: '#FFCC00',
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
