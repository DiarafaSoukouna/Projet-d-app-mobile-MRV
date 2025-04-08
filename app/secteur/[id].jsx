import { useLocalSearchParams } from 'expo-router';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ActivityIndicator, Animated } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import Entypo from '@expo/vector-icons/Entypo';
import { TextInput } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";
import {get_data} from '../get_api';
import { useState, useEffect, useRef } from 'react';
import { BaseURL } from '../get_api';


export default function SecteurScreen() {
  const { id } = useLocalSearchParams(); 
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [secteurs, setSecteurs] = useState([]);
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
  
  // Fonction modifiée pour s'assurer que les données sont correctement définies
  const get_secteurs = async () => {
    return new Promise((resolve) => {
      get_data(`${BaseURL}/secteurs`, (data) => {
        setSecteurs(data);
        console.log("Secteurs chargés:", data.length);
        resolve(data);
      });
    });
  }
  
  const get_sous_secteurs = async () => {
    return new Promise((resolve) => {
      get_data(`${BaseURL}/sous_secteurs`, (data) => {
        setSousSecteurs(data);
        console.log("Sous-secteurs chargés:", data.length);
        resolve(data);
      });
    });
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
        // Charger les données
        await Promise.all([get_secteurs(), get_sous_secteurs()]);
        
        console.log("Toutes les données chargées");
        
        // Attendre un court délai pour s'assurer que les états sont mis à jour
        setTimeout(() => {
          setIsLoading(false);
          
          // Démarrer les animations après que isLoading soit défini à false
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
      <Text style={styles.loadingText}>Chargement des données...</Text>
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

  // Vérifier si les données sont disponibles
  const currentSecteur = secteurs.find(secteur => secteur.id.toString() === id);
  const filteredSousSecteurs = sous_secteurs.filter(
    sous_secteur => sous_secteur.secteur_id.toString() === id && 
    sous_secteur.nom_sous_secteur.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={{ marginLeft: 20 }}>
        <Ionicons name="arrow-back-outline" size={24} color="black" />
      </TouchableOpacity>
      
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
          {currentSecteur ? (
            <View>
              <Text style={{ fontSize: 30, marginTop: 15, fontWeight: "500", marginLeft: 15 }}>
                {currentSecteur.nom_secteur}
              </Text>
              <View style={styles.contBack}>
                <Text style={styles.desc}>
                  <Text style={{ fontSize: 20, fontWeight: "400" }}>Description : </Text>
                  {currentSecteur.description}
                </Text>
              </View>
              <View style={styles.searchContainer}>
                <Icon name="search" size={24} color="#fff" style={styles.icon} />
                <TextInput
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  placeholder="Rechercher un sous secteur..."
                  style={styles.input}
                />
              </View>
              <Text style={{ marginTop: 30, marginLeft: 15, fontSize: 20 }}>Sous secteurs liés</Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                {filteredSousSecteurs.map((sous_secteur) => (
                  <TouchableOpacity onPress={() => router.push(`../sous_secteur/${sous_secteur.id}`)} key={sous_secteur.id} style={styles.card}>
                 
                    <Text style={styles.text}>{sous_secteur.nom_sous_secteur}</Text>
                    <Text style={{ fontWeight: "300", marginTop: 10, fontSize: 12 }}>
                      {sous_secteur.description}
                    </Text>
                    <View style={{ alignItems: 'flex-end' }}>
                      <TouchableOpacity onPress={() => router.push(`../sous_secteur/${sous_secteur.id}`)}>
                        <Entypo name="eye" size={24} color="#01afaf" />
                      </TouchableOpacity>
                    </View>
             
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ) : (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>Aucun secteur trouvé avec l'ID: {id}</Text>
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
  // Loading styles
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
  }
});