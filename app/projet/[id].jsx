import { useLocalSearchParams } from 'expo-router';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, ActivityIndicator, Animated } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import Entypo from '@expo/vector-icons/Entypo';
import { TextInput } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";
import {get_data} from '../get_api';
import { useState, useEffect, useRef } from 'react';
import { BaseURL } from '../get_api';
import {LoadingComponent, useAnimations, SearchBar} from '../loading';



export default function ProjetScreen() {
  const { id } = useLocalSearchParams(); 
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [projets, setProjets] = useState([]);
  const [actions, setActions] = useState([]);
  const [indicateurs, setIndicateurs] = useState([]);
  const [priority, setPriority] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const { fadeAnim, scaleAnim, spinValue, animatedP, animatedP2 } = useAnimations();

  
 
  
  const get_projet = async () => {
    return new Promise((resolve) => {
      get_data(`${BaseURL}/projets.routes.php`, (data) => {
        setProjets(data);
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
  
  // const get_indicateurs = async () => {
  //   return new Promise((resolve) => {
  //     get_data(`${BaseURL}/indicateurs`, (data) => {
  //       setIndicateurs(data);
  //       resolve(data);
  //     });
  //   });
  // }
  
  const get_priority = async () => {  
    return new Promise((resolve) => {
      get_data(`${BaseURL}/priorites.routes.php`, (data) => {
        setPriority(data);
        resolve(data);
      });
    });
  }
  
  const return_action = (id) => {
    const action = actions.find((action) => action.id === id);
    return action ? action.nom : "Inconnu";
  }
  
  useEffect(() => {
    // Démarrer l'animation de rotation immédiatement
    Animated.loop(
      animatedP
    ).start();
    
    const fetchData = async () => {
      setIsLoading(true);
      
      try {
        // Charger toutes les données en parallèle
        await Promise.all([
          get_projet(),
          get_actions(),
          // get_indicateurs(),
          get_priority()
        ]);
        
        // Attendre un court délai pour s'assurer que les états sont mis à jour
        setTimeout(() => {
          setIsLoading(false);
          
          // Démarrer les animations après que isLoading soit défini à false
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

  // Vérifier si le projet existe
  const currentProjet = projets.find(projet => projet.id.toString() === id);
  const filteredIndicateurs = indicateurs.filter(
    indicateur => indicateur.project_id.toString() === id && 
    indicateur.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="arrow-back-outline" size={24} color="black" />
      </TouchableOpacity>
      <Text style={{fontSize: 22, fontWeight: 600}}>Projet</Text>

      </View>
      
      {isLoading ? (
        <LoadingComponent Nom='projets'/>
      ) : (
        <Animated.View 
          style={{ 
            flex: 1, 
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }]
          }}
        >
          {currentProjet ? (
            <ScrollView>
              <Text style={{fontSize: 20, marginTop: 15, fontWeight: '500', marginLeft: 15}}>
                {currentProjet.name}
              </Text>
        
              <View style={{flexDirection: 'row', justifyContent: "space-between", marginTop: 20}}>
                <View style={{flexDirection: 'row', gap: 10, marginLeft: 20}}>
                  <Ionicons name="calendar-outline" size={24} color="#01afaf" />
                  <Text style={{marginTop: 4}}>
                    Date : {new Date(currentProjet.created_at).toISOString().slice(0, 10).replace(/-/g, '/')}
                  </Text>
                </View>
                <View style={{flexDirection: "row", gap: 10, marginRight: 20}}>
                  <View style={styles.forme}></View>
                  <Text style={{marginTop: 4}}>Priorité</Text>
                </View>
              </View>
              
              <Text style={{fontWeight: '200', maxWidth: '95%', marginTop: 25, marginLeft: 15}}>
                <Text style={{fontSize: 20, fontWeight: '400', color: '#01afaf'}}>Objectif : </Text> 
                {currentProjet.objectif}
              </Text>
        
              <Text style={{fontWeight: '200', maxWidth: '95%', marginTop: 25, marginLeft: 15}}> 
                <Text style={{fontSize: 20, fontWeight: '400', color: '#01afaf'}}>Description : </Text> 
                {currentProjet.description}
              </Text>
              
              <Text style={{marginTop: 30, marginLeft: 15, fontSize: 20}}>
                Action : {currentProjet.action_name} 
              </Text>
              
              <View style={styles.searchContainer}>
                <Icon name="search" size={24} color="#fff" style={styles.icon} />
                <TextInput
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  placeholder="Rechercher un indicateur..."
                  style={styles.input}
                />
              </View>
        
              <Text style={{marginTop: 30, marginLeft: 15, fontSize: 20}}>Indicateurs liés</Text>
        
              <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                {filteredIndicateurs.length > 0 ? (
                  filteredIndicateurs.map(indicateur => (
                    <View key={indicateur.id} style={styles.card}>
                      <Text style={styles.text}>{indicateur.name}</Text>
                      <Text style={{fontWeight: '300', marginTop: 10, fontSize: 12}}>
                        {indicateur.description}
                      </Text>
                      <View style={{alignItems: 'flex-end'}}>
                        <TouchableOpacity onPress={() => router.push(`../indicateur/${indicateur.id}`)}>
                          <Entypo name="eye" size={24} color="#01afaf" />
                        </TouchableOpacity>
                      </View>
                    </View>
                  ))
                ) : (
                  <Text style={{marginLeft: 15, marginTop: 10, fontStyle: 'italic'}}>
                    Aucun indicateur trouvé pour ce projet.
                  </Text>
                )}
              </View>
            </ScrollView>
          ) : (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>Aucun projet trouvé avec l'ID: {id}</Text>
            </View>
          )}
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
    // Loading styles
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    header:{
      backgroundColor: '#e6fafa',
      padding: 15,
      flexDirection: 'row',
      alignItems: 'center',
      gap : 10
    },
    loadingCircle: {
      width: 80,
      height: 80,
      borderRadius: 40,
      borderWidth: 3,
      borderColor: '#01afaf',
      borderTopColor: '#e6fafa',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
    },
    innerCircle: {
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: '#01afaf',
      justifyContent: 'center',
      alignItems: 'center',
    },
    loadingText: {
      marginTop: 10,
      fontSize: 16,
      color: '#01afaf',
      fontWeight: '500',
    },
    loadingBars: {
      flexDirection: 'row',
      marginTop: 20,
      height: 30,
      alignItems: 'center',
    },
    loadingBar: {
      height: 4,
      width: 60,
      borderRadius: 2,
      marginHorizontal: 3,
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