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
  const [sous_secteurs, setSousSecteurs] = useState({});
  const [actions, setActions] = useState([]);
  const get_sous_secteurs = async () => {
    get_data(`${BaseURL}/secteurs.routes.php?id=${id}`, setSousSecteurs )
  }
  const get_actions = async () => {
    get_data(`${BaseURL}/actions.routes.php`, setActions);
  }
  useEffect(() => {
    get_sous_secteurs();
    get_actions();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
    <View style={styles.header}>
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="arrow-back-outline" size={24} color="black" />
      </TouchableOpacity>
      <Text style={{fontSize: 22, fontWeight: 600}}>Sous secteur</Text>

      </View>
      
    <View key={sous_secteurs.id}>
      <Text style={{fontSize: 20, marginTop: 15, fontWeight: "500", marginLeft:15}}>
        {sous_secteurs.name}
      </Text>
      <ScrollView>
        <View style={styles.contBack}>
          <Text style={styles.desc}>
            <Text style={{ fontSize: 20, fontWeight: "400" }}>Description : </Text>
            {sous_secteurs.description}
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

        <Text style={{marginTop: 30, marginLeft:15, fontSize: 20}}>Actions liées </Text>
        
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          {actions
            .filter(action => action.secteur_id.toString() === id && action.name.toLowerCase().includes(searchQuery.toLowerCase()))
            .map(action => (
              <TouchableOpacity onPress={() => router.push(`../action/${action.id}`)} style={styles.card} key={action.id}>
                <Text style={styles.text}> {action.name}</Text>
                 <Text style={{ fontWeight: "400", marginTop: 10, fontSize: 12, fontFamily: "sans-serif" }}>
                      {action.description.length > 80
                        ? action.description.substring(0, 80) + '...'
                        : action.description}
                    </Text>
                <View style={{alignItems: 'flex-end'}}>
                  <TouchableOpacity >
                    <Entypo name="eye" style={{float:'right'}} size={24} color="#01afaf" />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
        </View>
        
      </ScrollView>
    </View>

     
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        
    },
     errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
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
     header:{
      backgroundColor: '#e6fafa',
      padding: 15,
      flexDirection: 'row',
      alignItems: 'center',
      gap : 10
    },
})