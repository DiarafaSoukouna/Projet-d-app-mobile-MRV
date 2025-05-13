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
import {LoadingComponent, useAnimations} from '../loading';



export default function SecteurScreen() {
  const { id } = useLocalSearchParams(); 
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [secteurs, setSecteurs] = useState({});
  const [sous_secteurs, setSousSecteurs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { fadeAnim, scaleAnim, spinValue, animatedP, animatedP2 } = useAnimations();


  // Fonction modifiée pour s'assurer que les données sont correctement définies
  const get_secteurs = async () => {
    return new Promise((resolve) => {
      get_data(`${BaseURL}/secteurs.routes.php?id=${id}`, (data) => {
        setSecteurs(data);
        resolve(data);
      });
    });
  }
  
  const get_sous_secteurs = async () => {
    return new Promise((resolve) => {
      get_data(`${BaseURL}/secteurs.routes.php`, (data) => {
        setSousSecteurs(data.filter((secteur) => secteur.parent_id !== 0));
   
        resolve(data);
      });
    });
  }
  
  useEffect(() => {
    // Démarrer l'animation de rotation immédiatement
    Animated.loop(
      animatedP
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
          Animated.parallel(animatedP2).start();
        }, 300);
      } catch (error) {
        console.error("Erreur lors du chargement des données:", error);
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);


  const currentSecteur = secteurs;
  const filteredSousSecteurs = sous_secteurs.filter(
    sous_secteur => sous_secteur.parent_id.toString() === id && 
    sous_secteur.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
       <View style={styles.header}>
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="arrow-back-outline" size={24} color="black" />
      </TouchableOpacity>
      <Text style={{fontSize: 22, fontWeight: 600}}>Secteur</Text>

      </View>
      
      {isLoading ? (
        <LoadingComponent Nom='secteurs' />
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
              <Text style={{ fontSize: 20, marginTop: 15, fontWeight: "500", marginLeft: 15 }}>
                {currentSecteur.name}
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
                
                <Text style={{ marginTop: 30, marginLeft: 15, fontSize: 20 }}>Sous secteurs liés </Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                {filteredSousSecteurs.map((sous_secteur) => (
                  <TouchableOpacity onPress={() => router.push(`../sous_secteur/${sous_secteur.id}`)} key={sous_secteur.id} style={styles.card}>
                 
                    <Text style={styles.text}>{sous_secteur.name}</Text>
                   <Text style={{ fontWeight: "400", marginTop: 10, fontSize: 12, fontFamily: "sans-serif" }}>
                      {sous_secteur.description.length > 80
                        ? sous_secteur.description.substring(0, 80) + '...'
                        : sous_secteur.description}
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
  },
   header:{
      backgroundColor: '#e6fafa',
      padding: 15,
      flexDirection: 'row',
      alignItems: 'center',
      gap : 10
    },
});