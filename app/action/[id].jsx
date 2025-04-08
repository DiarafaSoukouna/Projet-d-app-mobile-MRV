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


export default function ActionScreen() {
  const { id } = useLocalSearchParams(); 
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [actions, setActions] = useState([]);
  const [projets, setProjets] = useState([]);
  const [sous_secteurs, setSousSecteurs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;
  const spinValue = useRef(new Animated.Value(0)).current;
  
  // Create rotation interpolation
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });
  
  const get_sous_secteurs = async () => {
    return new Promise((resolve) => {
      get_data(`${BaseURL}/sous_secteurs`, (data) => {
        setSousSecteurs(data);
        resolve(data);
      });
    });
  }
  
  const get_actions = async () => {
    return new Promise((resolve) => {
      get_data(`${BaseURL}/actions`, (data) => {
        setActions(data);
        resolve(data);
      });
    });
  }
  
  const get_projets = async () => {
    return new Promise((resolve) => {
      get_data(`${BaseURL}/projets`, (data) => {
        setProjets(data);
        resolve(data);
      });
    });
  }
  
  const return_sous_secteur = (id) => {
    const sous_secteur = sous_secteurs.find((sous_secteur) => sous_secteur.id === id);
    return sous_secteur ? sous_secteur.nom_sous_secteur : "Inconnu";
  }
  
  useEffect(() => {
    // Démarrer l'animation de rotation immédiatement
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true
      })
    ).start();
    
    const fetchData = async () => {
      setIsLoading(true);
      
      try {
 
        await Promise.all([
          get_sous_secteurs(),
          get_actions(),
          get_projets()
        ]);
        
        console.log("Toutes les données chargées avec succès");
   
        setTimeout(() => {
          setIsLoading(false);
  
          Animated.parallel([
            Animated.timing(fadeAnim, {
              toValue: 1,
              duration: 600,
              useNativeDriver: true
            }),
            Animated.timing(scaleAnim, {
              toValue: 1,
              duration: 500,
              useNativeDriver: true
            })
          ]).start();
        }, 300);
      } catch (error) {
        console.error("Erreur lors du chargement des données:", error);
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Custom loading component
  const LoadingComponent = () => (
    <View style={styles.loadingContainer}>
      <Animated.View style={[styles.loadingCircle, { transform: [{ rotate: spin }] }]}>
        <View style={styles.innerCircle}>
          <ActivityIndicator size="large" color="#ffffff" />
        </View>
      </Animated.View>
      <Text style={styles.loadingText}>Chargement des détails...</Text>
      <View style={styles.loadingBars}>
        {[1, 2, 3].map((_, index) => (
          <Animated.View 
            key={index}
            style={[
              styles.loadingBar,
              { 
                backgroundColor: '#01afaf',
                marginLeft: index * 10
              }
            ]}
          />
        ))}
      </View>
    </View>
  );

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
        <LoadingComponent />
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
                <Text style={{fontSize: 20, marginTop: 15, fontWeight: '500', marginLeft: 15}}>{currentAction.nom}</Text>

                <View style={{flexDirection: 'row', justifyContent: "space-between", marginTop: 20 }}>
                  <View style={{flexDirection: 'row', gap: 10, marginLeft: 20 }}>
                    <Ionicons name="calendar-outline" size={24} color="#01afaf" />
                    <Text style={{marginTop: 4}}> Date: {new Date(currentAction.created_date).toISOString().slice(0, 10).replace(/-/g, '/')} </Text>
                  </View>
                  <View style={{flexDirection: "row", gap: 10, marginRight: 20}}>
                    <View style={styles.forme}></View>
                    <Text style={{marginTop: 4}}>Priorité</Text>
                  </View>
                </View>

                <Text style={{fontWeight: '200', maxWidth: '95%', marginTop: 25, marginLeft: 15}}> 
                  <Text style={{fontSize: 20, fontWeight: '400', color: '#01afaf'}}>Objectif : </Text> 
                  {currentAction.objectif}
                </Text>

                <Text style={{fontWeight: '200', maxWidth: '95%', marginTop: 25, marginLeft: 15}}> 
                  <Text style={{fontSize: 20, fontWeight: '400', color: '#01afaf'}}>Description : </Text> 
                  {currentAction.description}
                </Text>

                <Text style={{marginTop: 30, marginLeft: 15, fontSize: 20}}>
                  Sous secteur : {return_sous_secteur(currentAction.sous_secteur_id)}
                </Text>

                <View style={styles.searchContainer}>
                  <Icon name="search" size={24} color="#fff" style={styles.icon} />
                  <TextInput
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    placeholder="Rechercher un projet..."
                    style={styles.input}
                    underlineColor="transparent"
                    activeUnderlineColor="#01afaf"
                    
                  />
                </View>

                <Text style={{marginTop: 30, marginLeft: 15, fontSize: 20}}>Projets liés</Text>

                <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                  {filteredProjets.map(projet => (
                    <View key={projet.id} style={styles.card}>
                      <Text style={styles.text}>{projet.name}</Text>
                      <Text style={{fontWeight: '300', marginTop: 10, fontSize: 12}}>{projet.description}</Text>
                      <View style={{alignItems: 'flex-end'}}>
                        <TouchableOpacity onPress={() => router.push(`../projet/${projet.id}`)}>
                          <Entypo name="eye" size={24} color="#01afaf" />
                        </TouchableOpacity>
                      </View>
                    </View>
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