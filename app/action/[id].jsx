import { useLocalSearchParams } from 'expo-router';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import Entypo from '@expo/vector-icons/Entypo';



export default function ActionScreen() {
  const { id } = useLocalSearchParams(); 
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={{ marginTop: '13%', marginLeft: 20 }}>
      <Ionicons name="arrow-back-outline" size={24} color="black" />
      </TouchableOpacity>
      <Text style={{fontSize: 30, marginTop: 15, fontWeight: 500, marginLeft:15}}>Titre action</Text>

        <View style={{flexDirection: 'row', justifyContent: "space-between", marginTop: 20, }}>
        <View style={{flexDirection: 'row', gap:10, marginLeft: 20 }}>
            <Ionicons name="calendar-outline" size={24} color="#01afaf" />
            <Text style={{marginTop: 4}}>Date : 12/02/2025</Text>
        </View>
        <View style={{flexDirection: "row", gap: 10, marginRight:20}}>
            <View style={styles.forme}></View>
            <Text style={{marginTop: 4}}>Priorité</Text>
        </View>
        </View>
        <Text style={{fontWeight: 200, maxWidth: '95%', marginTop: 25, marginLeft:15,}}> <Text style={{fontSize: 20, fontWeight: 400, color: '#01afaf'}}>Objectif : </Text> 
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
            Lorem Ipsum hass been the industry's standard dummy text ever since the 1500s, when an
         </Text>

         <Text style={{fontWeight: 200, maxWidth: '95%', marginTop: 25, marginLeft:15, }}> <Text style={{fontSize: 20, fontWeight: 400, color: '#01afaf'}}>Description : </Text> 
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
            Lorem Ipsum hass been the industry's standard dummy text ever since the 1500s, when an
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
            Lorem Ipsum hass been the industry's standard dummy text ever since the 1500s, when an
         </Text>
         <Text style={{marginTop: 30, marginLeft:15, fontSize: 20}}>Sous secteur :......</Text>

         <Text style={{marginTop: 30, marginLeft:15, fontSize: 20}}>Projets liés</Text>

        
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
        <View style={styles.card}>
         <Text style={styles.text}> Projet 1</Text>
         <Text style={{fontWeight:300, marginTop:10, fontSize: 12}} >Lorem Ipsum is simply dummy text of the printing and typesetting industry........</Text>
         <View style={{alignItems: 'flex-end'}}>
        <TouchableOpacity onPress={() => router.push(`../projet/${id}`)}>
        <Entypo name="eye" style={{float:'right'}}size={24} color="#01afaf" />
        </TouchableOpacity>
        
      </View>

        </View>
        <View style={styles.card}>
         <Text style={styles.text}> Projet 1</Text>
         <Text style={{fontWeight:300, marginTop:10, fontSize: 12}} >Lorem Ipsum is simply dummy text of the printing and typesetting industry........</Text>
         <View style={{alignItems: 'flex-end'}}>
        <Entypo name="eye" style={{float:'right'}}size={24} color="#01afaf" />
        
      </View>

        </View>
        <View style={styles.card}>
         <Text style={styles.text}> Projet 1</Text>
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
    },
    forme: {
       width : 25,
       height: 25,
       borderRadius:100,
       backgroundColor: '#FFCC00'
    }

})