import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, ActivityIndicator, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import Entypo from '@expo/vector-icons/Entypo';
import {get_data} from '../get_api';
import { useState, useEffect, useRef } from 'react';
import { BaseURL } from '../get_api';


export default function Tab() {
  const router = useRouter();
  const [secteurs, setSecteurs] = useState([]);
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
  
  const get_secteurs = async () => {
    return new Promise((resolve) => {
      get_data(`${BaseURL}/secteurs`, (data) => {
        setSecteurs(data);
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
        await get_secteurs();
        
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
      <Text style={styles.loadingText}>Chargement des secteurs...</Text>
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

  return (
    <SafeAreaView style={styles.container}>
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
          <Text style={{fontSize: 30, fontWeight: "500", marginLeft: 10}}>Secteurs</Text>
          <ScrollView>
            {secteurs.map((secteur) => (
              <TouchableOpacity 
                key={secteur.id}
                onPress={() => router.push(`/secteur/${secteur.id}`)}
              > 
                <View style={styles.card}> 
                  <Text style={{color: '#01afaf', fontSize: 16}}>{secteur.nom_secteur}</Text>
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
  }
});