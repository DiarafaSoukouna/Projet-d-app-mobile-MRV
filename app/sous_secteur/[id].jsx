import { useLocalSearchParams } from 'expo-router';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import Entypo from '@expo/vector-icons/Entypo';
import { TextInput } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";
import {get_data} from '../get_api';
import { useState, useEffect } from 'react';
import {BaseURL} from '../get_api';

export default function SousSecteurScreen() {
  const { id } = useLocalSearchParams(); 
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [sous_secteurs, setSousSecteurs] = useState([]);
  const [actions, setActions] = useState([]);
  const get_sous_secteurs = async () => {
    get_data(`${BaseURL}/sous_secteurs`, setSousSecteurs );
  }
  const get_actions = async () => {
    get_data(`${BaseURL}/actions`, setActions);
  }
  useEffect(() => {
    get_sous_secteurs();
    get_actions();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={{ marginLeft: 20 }}>
      <Ionicons name="arrow-back-outline" size={24} color="black" />
      </TouchableOpacity>
      {sous_secteurs
  .filter((sous_secteur) => sous_secteur.id.toString() === id)  
  .map((sous_secteur) => (
    <View key={sous_secteur.id}>
      <Text style={{fontSize: 30, marginTop: 15, fontWeight: "500", marginLeft:15}}>
        {sous_secteur.nom_sous_secteur}
      </Text>
      <ScrollView>
        <View style={styles.contBack}>
          <Text style={styles.desc}>
            <Text style={{ fontSize: 20, fontWeight: "400" }}>Description : </Text>
            {sous_secteur.description}
          </Text>
        </View>

        <View style={styles.searchContainer}>
          <Icon name="search" size={24} color="#fff" style={styles.icon} />
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Rechercher une action..."
            style={styles.input}
          />
        </View>

        <Text style={{marginTop: 30, marginLeft:15, fontSize: 20}}>Actions liées</Text>
        
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          {actions
            .filter(action => action.sous_secteur_id.toString() === id && action.nom.toLowerCase().includes(searchQuery.toLowerCase()))
            .map(action => (
              <View style={styles.card} key={action.id}>
                <Text style={styles.text}> {action.nom}</Text>
                <Text style={{fontWeight: "300", marginTop:10, fontSize: 12}}>{action.description}.</Text>
                <View style={{alignItems: 'flex-end'}}>
                  <TouchableOpacity onPress={() => router.push(`../action/${action.id}`)}>
                    <Entypo name="eye" style={{float:'right'}} size={24} color="#01afaf" />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
        </View>
      </ScrollView>
    </View>
  ))}
     
    </SafeAreaView>
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
      marginLeft: 15,
      borderRadius: 15,
      backgroundColor: '#e6fafa',
    },
    text:{
        textAlign: 'center',
        fontSize: 16,
    },
    contBack: {
      padding: 20,
      borderRadius: 10,
      backgroundColor: '#01afaf',
      margin: 10,     
    },
    desc: {
      fontWeight: "300", 
      maxWidth: '95%',
      color: '#fff'
    },
    searchContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#e6fafa",
      borderRadius: 15,
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowOffset: { width: 0, height: 2 },
      elevation: 3,
      marginHorizontal: 10,
      marginTop: 15,
    },
    icon: {
      borderRadius: 10,
      backgroundColor: '#01afaf',
      padding: 10,   
      marginLeft: 5 
    },
    input: {
      flex: 1,
      backgroundColor: "transparent",
  
    },
})