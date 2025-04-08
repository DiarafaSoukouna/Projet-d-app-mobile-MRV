import { View, Text, StyleSheet, ImageBackground,ScrollView, TouchableOpacity, SafeAreaView  } from 'react-native';
import { StatusBar } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useRouter } from 'expo-router';
import {get_data} from '../get_api';
import { useState, useEffect } from 'react';
import { BaseURL } from '../get_api';


export default function Home() {
  const router = useRouter();
  const id = 1;
  const [secteursAffiches, setSecteursAffiches] = useState([]);
  const [secteurs, setSecteurs] = useState([]);
  const [actions, setActions] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [notifications, setNotifications] = useState([]);

  const get_secteurs = async () => {
    get_data(`${BaseURL}/secteurs`, setSecteurs );
  }
  const get_actions = async () => {
    get_data(`${BaseURL}/actions`, setActions);
  }
  const get_documents = async () => {
    get_data(`${BaseURL}/documents`, setDocuments);
  }
  const get_notifications = async () => {
    get_data(`${BaseURL}/notifications`, setNotifications);
  }
  useEffect(() => {
    get_secteurs();
    get_actions();
    get_documents();
    get_notifications();
  }, []);
  useEffect(() => {
    setSecteursAffiches(secteurs.slice(0, 3)); 
}, [secteurs]);
  
  return (
   
<SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

        <View style={styles.header}> 
            <View style={styles.element}> 
            <TouchableOpacity onPress={()=> router.push('../profil')}>
            <View style={styles.back}>

            <Text style={{color: '#fff', fontSize: 22, fontWeight: 600}}>DS</Text>

            </View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.9} onPress={()=> router.push('../notifications')}> 
            <Ionicons name="notifications-outline" style={{marginTop:20, color:'black'}} size={24} color="#888" />
            </TouchableOpacity> 

            

            </View> 
        </View>
  <ScrollView>
        <ImageBackground 
        source={require("../../assets/images/5366317_33300.jpg")} 
        imageStyle={{ borderRadius: 20}}
        style={styles.background}
        >
            <Text style={styles.head}>MRV Mali </Text>

        </ImageBackground>

        <Text style={{marginTop: 20, marginLeft:20, fontSize: 20}}>Secteurs</Text>

        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <ScrollView  horizontal={true} showsHorizontalScrollIndicator={false} style={{marginHorizontal: 7}}>
          {secteursAffiches.map((secteur, index) => (
            <TouchableOpacity key={index} onPress={() => router.push(`../secteur/${secteur.id}`)}>
              <View style={styles.card}>
                <Text style={{fontSize: 17, fontWeight: 600, color: '#fff'}}>{secteur.nom_secteur}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
        </View>
        <Text style={{marginTop: 20, marginLeft:20, fontSize: 20}}>Dernière action</Text>
        {actions.length > 0 && (
    <TouchableOpacity activeOpacity={0.7} onPress={() => router.push(`../action/${actions[0].id}`)}>
        <View style={styles.cardAction}>
                <Text style={{fontSize: 25, fontWeight: 500, marginBottom:10}}>{actions[0].nom}</Text>
                <Text>{actions[0].description}</Text>

                <View style={{justifyContent: 'space-between', flexDirection: 'row', marginTop: 20}}>
                    <View style={{flexDirection: 'row'}}>
                        <AntDesign name="calendar" size={24} color="#01AFAF" />
                        <Text style={{marginTop: 3, marginLeft: 10}}>
                            Date: {new Date(actions[0].created_date).toISOString().slice(0, 10).replace(/-/g, '/')}
                        </Text>
                    </View>
                    <Feather name="corner-down-right" size={30} color="#01AFAF" />
                </View>
        </View>
    </TouchableOpacity>
)}
       

        <Text style={{marginTop: 20, marginLeft:20, fontSize: 20}}>Documents</Text>
        {/* {documents.slice(0, 3).map((document, index) => (
          <TouchableOpacity key={index} onPress={()=> router.push('./documents')}>
            <View style={{flexDirection: 'row', gap: 10, marginTop: 5, marginBottom: 10}}>
              <View style={styles.backg}>
                <FontAwesome6 name="file-text" size={24} color='#01AFAF' />
              </View>
              <Text style={{maxWidth: '80%'}}>galley of type and scrambled it to make a type specimen book.</Text>
            </View>
          </TouchableOpacity>
        ))} */}
        <TouchableOpacity onPress={()=> router.push('./documents')}>
        <View style={{flexDirection: 'row', gap: 10, marginTop: 5, marginBottom: 10}}>
          <View style={styles.backg}>
          <FontAwesome6 name="file-text" size={24} color='#01AFAF' />
          </View>
        
        <Text style={{maxWidth: '80%'}}>galley of type and scrambled it to make a type specimen book.</Text>
        </View>
        </TouchableOpacity>
        <View style={{flexDirection: 'row', gap: 10, marginBottom: 10}}>
          <View style={styles.backg}>
          <FontAwesome6 name="file-text" size={24} color='#01AFAF' />
          </View>
        
        <Text style={{maxWidth: '80%'}}> to make a type specimen book.</Text>
        </View>
        <View style={{flexDirection: 'row', gap: 10, marginBottom: 10}}>
          <View style={styles.backg}>
          <FontAwesome6 name="file-text" size={24} color='#01AFAF' />
          </View>
        
        <Text style={{maxWidth: '80%'}}>galley of type and scrambled it to make a type specimen book.</Text>
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
   
    element: {
        flexDirection: 'row', 
        justifyContent: 'space-between',
         marginHorizontal: 20
    },
    back: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#01afaf',
        width: 60,
        height: 60,
        borderRadius: 50,
    },

    background: {
        justifyContent: "center",
        height: 140,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderRadius: 200,

   
        marginHorizontal: 20,
        marginTop: 20,
      
      },
      head: {
      textAlign: "right",
        fontSize: 30,
        fontWeight: 700,
        color: '#098D8D',
        marginRight: 20
      },
      card: {
       height: 80,
       width: 140,
       backgroundColor: '#01afaf',
         borderRadius: 15,
         alignItems: 'center',
            justifyContent: 'center',
            marginLeft: 6,
            marginRight: 6,
            marginTop: 20,
    },
    cardAction: {
      backgroundColor: '#e6fafa',
      borderRadius: 16, 
      padding: 20, 
      marginHorizontal: 13,
      marginTop: 20,
      width: '94%',
      height: 200,
      shadowColor: '#01afaf',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 6,
      elevation: 8, 

      borderWidth: 1,
      borderColor: '#01afaf',
  },
    backg: {
        backgroundColor: '#f1f1f1',
        width: 45,
        height: 45,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 13,
       
    }
  })