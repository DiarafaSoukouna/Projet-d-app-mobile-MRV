import { useLocalSearchParams } from 'expo-router';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, ActivityIndicator, Animated } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import Entypo from '@expo/vector-icons/Entypo';
import { TextInput } from "react-native-paper";
import { useState, useEffect, useRef } from 'react';
import { BaseURL, get_data } from '../get_api';
import {LoadingComponent, useAnimations, SearchBar} from '../loading';



export default function ActionScreen() {
  const { id } = useLocalSearchParams(); 
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [actions, setActions] = useState([]);
  const [projets, setProjets] = useState([]);
  const [sous_secteurs, setSousSecteurs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const { fadeAnim, scaleAnim, spinValue, animatedP, animatedP2 } = useAnimations();


  
  const get_sous_secteurs = async () => {
    return new Promise((resolve) => {
      get_data(`${BaseURL}/secteurs.routes.php`, (data) => {
        setSousSecteurs(data);
        resolve(data);
      });
    });
  }
  
  const get_actions = async () => {
    return new Promise((resolve) => {
      get_data(`${BaseURL}/actions.routes.php`, (data) => {
        setActions(data);
        resolve(data);
      });
    });
  }
  
  const get_projets = async () => {
    return new Promise((resolve) => {
      get_data(`${BaseURL}/projets.routes.php`, (data) => {
        setProjets(data);
        resolve(data);
      });
    });
  }
  
  const return_sous_secteur = (id) => {
    const sous_secteur = sous_secteurs.find((sous_secteur) => sous_secteur.id === id);
    return sous_secteur ? sous_secteur.name : "Inconnu";
  }
  
  useEffect(() => {
    Animated.loop(
      animatedP
    ).start();
    
    const fetchData = async () => {
      setIsLoading(true);
      
      try {
 
        await Promise.all([
          get_sous_secteurs(),
          get_actions(),
          get_projets()
        ]);
   
        setTimeout(() => {
          setIsLoading(false);
  
          Animated.parallel(
            animatedP2
          ).start();
        }, 300);
      } catch (error) {
        console.error("Erreur lors du chargement des données:", error);
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);


  const currentAction = actions.find(action => action.id.toString() === id);
  const filteredProjets = projets.filter(projet => 
    projet.action_id === (currentAction?.id || 0) && 
    projet.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="arrow-back-outline" size={24} color="black" />
      </TouchableOpacity>
      <Text style={{fontSize: 22, fontWeight: 600}}>Action</Text>

      </View>

      {isLoading ? (
        <LoadingComponent Nom='actions'/>
      ) : (
        <Animated.View 
          style={{ 
            flex: 1, 
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }]
          }}
        >
          <ScrollView>
            {currentAction ? (
              <View>
                <Text style={{fontSize: 20, marginTop: 15, fontWeight: '500', marginLeft: 15}}>{currentAction.name}</Text>

                <View style={{flexDirection: 'row', justifyContent: "space-between", marginTop: 20 }}>
                  <View style={{flexDirection: 'row', gap: 10, marginLeft: 20 }}>
                    <Ionicons name="calendar-outline" size={24} color="#01afaf" />
                    <Text style={{marginTop: 4}}> Date: {new Date(currentAction.created_at).toISOString().slice(0, 10).replace(/-/g, '/')} </Text>
                  </View>
                  <View style={{flexDirection: "row", gap: 10, marginRight: 20}}>
                    <View style={styles.forme}></View>
                    <Text style={{marginTop: 4}}>Priorité</Text>
                  </View>
                </View>

                <Text style={styles.desc}> 
                  <Text style={{fontSize: 20, fontWeight: 'bold', color: '#01afaf'}}>Objectif : </Text> 
                  {currentAction.objectif}
                </Text>

                <Text style={styles.desc}> 
                  <Text style={{fontSize: 20, fontWeight: 'bold', color: '#01afaf'}}>Description : </Text> 
                  {currentAction.description}
                </Text>

                <Text style={{marginTop: 30, marginLeft: 15, fontSize: 20}}>
                  Sous secteur : {return_sous_secteur(currentAction.secteur_id)}
                </Text>

                <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

                <Text style={{marginTop: 30, marginLeft: 15, fontSize: 20}}>Projets liés</Text>

                <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                  {filteredProjets.map(projet => (
                    <TouchableOpacity onPress={() => router.push(`../projet/${projet.id}`)} key={projet.id} style={styles.card}>
                      <Text style={styles.text}>{projet.name}</Text>
                     <Text style={{ fontWeight: "400", marginTop: 10, fontSize: 12, fontFamily: "sans-serif" }}>
                      {projet.description.length > 80
                        ? projet.description.substring(0, 80) + '...'
                        : projet.description}
                    </Text>
                      <View style={{alignItems: 'flex-end'}}>
                        <TouchableOpacity onPress={() => router.push(`../projet/${projet.id}`)}>
                          <Entypo name="eye" size={24} color="#01afaf" />
                        </TouchableOpacity>
                      </View>
                    </TouchableOpacity>
                  ))}
                  
                  {filteredProjets.length === 0 && (
                    <Text style={{marginLeft: 15, marginTop: 10, fontStyle: 'italic'}}>
                      Aucun projet trouvé pour cette action.
                    </Text>
                  )}
                </View>
              </View>
            ) : (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Aucune action trouvée avec l'ID: {id}</Text>
              </View>
            )}
          </ScrollView>
        </Animated.View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    desc :{
      fontWeight: '300', maxWidth: '95%', marginTop: 25, marginLeft: 15, fontFamily: 'Poppins'
    },
    card: {
      width: '45%',
      padding: 20,
      marginTop: 20,
      marginLeft: 15,
      borderRadius: 15,
      backgroundColor: '#e6fafa',
    },
    text: {
        textAlign: 'center',
        fontSize: 16,
    },
    forme: {
       width: 25,
       height: 25,
       borderRadius: 100,
       backgroundColor: '#FFCC00'
    },
   
   
    input: {
      flex: 1,
      backgroundColor: "transparent",
    },
    // Loading styles
   
    header:{
      backgroundColor: '#e6fafa',
      padding: 15,
      flexDirection: 'row',
      alignItems: 'center',
      gap : 10
    },
    errorContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      marginTop: 50,
    },
    errorText: {
      fontSize: 16,
      color: 'red',
      textAlign: 'center',
    }
})