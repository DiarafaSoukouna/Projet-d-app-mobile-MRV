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
  const [structure, setStructure] = useState({});
  const [projets, setProjets] = useState([]);
  const [sous_secteurs, setSousSecteurs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const { fadeAnim, scaleAnim, spinValue, animatedP, animatedP2 } = useAnimations();


  

  
  const get_structures = async () => {
    return new Promise((resolve) => {
      get_data(`${BaseURL}structures.routes.php?id=${id}`, (data) => {
        setStructure(data);
        resolve(data);
      });
    });
  }

  
  useEffect(() => {
    Animated.loop(
      animatedP
    ).start();
    
    const fetchData = async () => {
      setIsLoading(true);
      
      try {
 
        await Promise.all([
          get_structures(),
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


 


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="arrow-back-outline" size={24} color="black" />
      </TouchableOpacity>
      <Text style={{fontSize: 22, fontWeight: 600}}>Structure</Text>

      </View>

      {isLoading ? (
        <LoadingComponent Nom='structures'/>
      ) : (
        <Animated.View 
          style={{ 
            flex: 1, 
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }]
          }}
        >
          <ScrollView>
            {structure ? (
              <View>
                <Text style={{fontSize: 20, marginTop: 15, fontWeight: '500', marginLeft: 15}}>{structure.sigle}</Text>

                <View style={{flexDirection: 'row', justifyContent: "space-between", marginTop: 20 }}>
                  <View style={{flexDirection: 'row', gap: 10, marginLeft: 20 }}>
                    <Ionicons name="calendar-outline" size={24} color="#01afaf" />
                    <Text style={{marginTop: 4}}> Date de création : {new Date(structure.created_at).toISOString().slice(0, 10).replace(/-/g, '/')} </Text>
                  </View>
                 
                </View>

                <Text style={styles.desc}> 
                  <Text style={{fontSize: 16, fontWeight: 'bold', color: '#01afaf'}}>Adresse : </Text> 
                  {structure.address}
                </Text>

                <Text style={styles.desc}> 
                  <Text style={{fontSize: 16, fontWeight: 'bold', color: '#01afaf'}}>Description : </Text> 
                  {structure.description}
                </Text>
                  <Text style={styles.desc}> 
                  <Text style={{fontSize: 16, fontWeight: 'bold', color: '#01afaf'}}>Type : </Text> 
                  {structure.type_name}
                </Text>
                   <Text style={styles.desc}> 
                  <Text style={{fontSize: 16, fontWeight: 'bold', color: '#01afaf'}}>Téléphone : </Text> 
                  {structure.phone}
                </Text>

               

               
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