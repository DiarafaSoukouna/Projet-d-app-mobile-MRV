import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import { useRouter } from 'expo-router';


const ProfileScreen = () => {
    const router = useRouter();
    const id = 1;
  return (
    <View style={StyleSheet.container}>
      <TouchableOpacity onPress={() => router.back()} style={{ marginTop: '13%', marginLeft: 20 }}>
      <Ionicons name="arrow-back-outline" size={24} color="black" />
      </TouchableOpacity>
      <Text style={{fontSize: 30, marginTop: 15, fontWeight: 500, marginLeft:15}}>Profil</Text>

      <View style={styles.pic}>
       <Text style={{fontSize : 70}}>DS</Text>
      </View>
      <Text style={styles.nom}>Diarafa SOUKOUNA</Text>
      <Text style={styles.group}>Groupes de travail : </Text>

      <View style={styles.card}>
         <Text style={styles.titre}>Titre...</Text>
         <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
         <View style={{flexDirection: 'row', gap: 10}}>
         <AntDesign name="calendar" size={24} color="#01afaf" />
         <Text style={{marginTop: 4}}>Date : 12/02/2025</Text>
         </View>
         <Entypo name="eye" size={24} color="#01afaf" />
         </View>
      </View>

      <View style={styles.card}>
         <Text style={styles.titre}>Titre...</Text>
         <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
         <View style={{flexDirection: 'row', gap: 10}}>
         <AntDesign name="calendar" size={24} color="#01afaf" />
         <Text style={{marginTop: 4}}>Date : 12/02/2025</Text>
         </View>
         <TouchableOpacity onPress={()=> router.push(`./groupe/${id}`)}>
         <Entypo name="eye" size={24} color="#01afaf" />
         </TouchableOpacity>
         </View>
      </View>
    </View>
   
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  pic: {
    width: 200,
    height: 200,
    borderRadius: 100,
    alignSelf: 'center',
    marginTop: 50,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#D9D9D9',
    overflow: 'hidden',
    backgroundColor: '#D9D9D9',
    alignItems: "center",
    justifyContent: "center"
  },
  nom :{
    fontSize: 24,
    fontWeight: 400,
    marginTop: 20,
    marginLeft: 20,
    marginBottom: 10,
    textAlign: 'center'
  },
  group: {
    fontSize: 18,
    fontWeight: 300,
    marginLeft: 20,
    marginTop: 50,
  
  },
  card: {
    width: '90%',
    padding: 20,
    marginTop: 20,
    marginLeft: 15,
    borderRadius: 10,
    backgroundColor: '#D9D9D9',

  }, 
  titre:{
    fontSize: 16,
    fontWeight: 500,
    color: '#01afaf',
    marginBottom: 20
   
  }
  
});

export default ProfileScreen;
