import { useLocalSearchParams } from 'expo-router';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import Entypo from '@expo/vector-icons/Entypo';



export default function ProjetScreen() {
  const { id } = useLocalSearchParams(); 
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={{ marginTop: '13%', marginLeft: 20 }}>
      <Ionicons name="arrow-back-outline" size={24} color="black" />
      </TouchableOpacity>
      <Text style={{fontSize: 30, marginTop: 15, fontWeight: 500, marginLeft:15}}>Titre action</Text>

       <View style={styles.card}>
        <View style={{flexDirection : 'row', gap: 20}}>
        <View>
        <Text style={{fontSize: 16}}>Seuil min : 29.788</Text>
        <Text style={{marginTop: 20, fontSize: 16}}>Seuil max : 56.788</Text>
        </View>
       
        <View style={styles.line}></View>
        <Text style={{fontSize: 16}}>Echelle : Sotuba</Text>
        </View>
       
        <Text style={{fontSize: 16, marginTop: 20}}>Resp : Diarafa SOUKOUNA</Text>

       </View>
       <Text style={{fontWeight: 200, maxWidth: '95%', marginTop: 25, marginLeft:15}}> <Text style={{fontSize: 20, fontWeight: 400, color: '#01afaf'}}>Domaine : </Text>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
        when an is simply dummy text of the printing and
        </Text> 
        <Text style={{fontSize: 20, marginTop : 20, marginLeft: 20 }}>Graphiques : </Text>
    </View>
  );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        
    },
    card:{
        width: '90%',
        padding: 20,
        marginTop: 20,
       
        marginLeft: 15,
        borderRadius: 10,
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
    },
    line :{
        width: 1,
        height: 80,
        backgroundColor: '#000',
      
    }

})