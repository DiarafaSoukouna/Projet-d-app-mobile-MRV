import { useLocalSearchParams } from 'expo-router';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import Entypo from '@expo/vector-icons/Entypo';



export default function SousSecteurScreen() {
  const { id } = useLocalSearchParams(); 
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={{ marginTop: '13%', marginLeft: 20 }}>
      <Ionicons name="arrow-back-outline" size={24} color="black" />
      </TouchableOpacity>
      <Text style={{fontSize: 30, marginTop: 15, fontWeight: 500, marginLeft:15}}>Titre sous secteur</Text>

        <Text style={{fontWeight: 200, maxWidth: '95%', marginTop: 20, marginLeft:15,}}> <Text style={{fontSize: 20, fontWeight: 400}}>Description : </Text> 
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
            Lorem Ipsum hass been the industry's standard dummy text ever since the 1500s, when an
         </Text>
        
        <Text style={{marginTop: 30, marginLeft:15, fontSize: 20}}>Actions liées</Text>
        
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
        <View style={styles.card}>
         <Text style={styles.text}> Action 1</Text>
         <Text style={{fontWeight:300, marginTop:10, fontSize: 12}} >Lorem Ipsum is simply dummy text of the printing and typesetting industry........</Text>
         <View style={{alignItems: 'flex-end'}}>
        <TouchableOpacity onPress={() => router.push(`../action/${id}`)}>
        <Entypo name="eye" style={{float:'right'}}size={24} color="#01afaf" />
        </TouchableOpacity>
        
      </View>

        </View>
        <View style={styles.card}>
         <Text style={styles.text}> Action 1</Text>
         <Text style={{fontWeight:300, marginTop:10, fontSize: 12}} >Lorem Ipsum is simply dummy text of the printing and typesetting industry........</Text>
         <View style={{alignItems: 'flex-end'}}>
        <Entypo name="eye" style={{float:'right'}}size={24} color="#01afaf" />
        
      </View>

        </View>
        <View style={styles.card}>
         <Text style={styles.text}> Action1</Text>
         <Text style={{fontWeight:300, marginTop:10, fontSize: 12}} >Lorem Ipsum is simply dummy text of the printing and typesetting industry........</Text>
         <View style={{alignItems: 'flex-end'}}>
        <Entypo name="eye" style={{float:'right'}}size={24} color="#01afaf" />
        
      </View>

        </View>
        </View>
    </View>
  );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        
    },
    card:{
        width: '45%',
        padding: 20,
        marginTop: 20,
        // marginHorizontal: 15,
        marginLeft: 15,
        borderRadius: 15,
        backgroundColor: '#f9f9f9',
    },
    text:{
        textAlign: 'center',
        fontSize: 16,
    }
})