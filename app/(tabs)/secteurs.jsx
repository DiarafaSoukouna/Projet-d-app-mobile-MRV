import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, ActivityIndicator, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import Entypo from '@expo/vector-icons/Entypo';
import {get_data} from '../get_api';
import { useState, useEffect, useRef } from 'react';
import { BaseURL } from '../get_api';
import {LoadingComponent, useAnimations} from '../loading';


export default function Tab() {
  const router = useRouter();
  const [secteurs, setSecteurs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const { fadeAnim, scaleAnim, spinValue, animatedP, animatedP2 } = useAnimations();
  // Create rotation interpolation

  
  const get_secteurs = async () => {
    return new Promise((resolve) => {
      get_data(`${BaseURL}/secteurs.routes.php`, (data) => {
        setSecteurs(data.filter((secteur) => secteur.parent_id === 0));
        
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
        await get_secteurs();

        setTimeout(() => {
          setIsLoading(false);
          
          Animated.parallel(animatedP2).start();
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
          <Text style={{fontSize: 30, fontWeight: "500", marginLeft: 10}}>Secteurs</Text>
          <ScrollView>
            {secteurs.map((secteur) => (
              <TouchableOpacity 
                key={secteur.id}
                onPress={() => router.push(`/secteur/${secteur.id}`)}
              > 
                <View style={styles.card}> 
                  <Text style={{color: '#01afaf', fontSize: 16}}>{secteur.name}</Text>
                  <View style={{flexDirection: 'row', gap: 10}}>
                    <View style={styles.verticleLine}></View>
                    <Text style={{maxWidth: '90%', marginTop: 10, fontWeight: "300"}}>
                      <Text style={{fontSize: 16, color: '#01AFAF', fontWeight: "500"}}>Description : </Text> 
                      {secteur.description}
                    </Text>
                  </View>
                  <View style={{alignItems: 'flex-end'}}>
                    <Entypo name="eye" size={24} color="#01afaf" />
                  </View>
                </View>
              </TouchableOpacity>
            ))}
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
  verticleLine: {
    height: '90%',
    width: 1.8,
    marginTop: 10,
    marginLeft: 10,
    backgroundColor: '#01afaf',
  },
  card: {
    backgroundColor: '#e6fafa', 
    padding: 20,
    borderRadius: 12,
    marginTop: 20,
    marginRight: 15,
    marginLeft: 15,
    shadowColor: '#01afaf',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08, 
    shadowRadius: 6, 
    elevation: 5, 
    borderWidth: 1,
    borderColor: '#01afaf',
  },
  
});