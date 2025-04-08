import { useLocalSearchParams } from 'expo-router';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import Chart from './chart';
import {get_data} from '../get_api';
import { useState, useEffect } from 'react';
import { BaseURL } from '../get_api';




export default function ProjetScreen() {
  const { id } = useLocalSearchParams(); 
  const router = useRouter();
  const [projets, setProjets] = useState([]);
  const [indicateurs, setIndicateurs] = useState([]);
  const [refIndicateurs, setRefIndicateurs] = useState([]);
  
  const get_projets = async () => {
    get_data(`${BaseURL}/projets`, setProjets );
  } 
  const get_indicateurs = async () => {
    get_data(`${BaseURL}/indicateurs`, setInndicateurs );
  }
  const get_ref_indicateurs = async () => {
    get_data(`${BaseURL}/referenciel_indicateur`, setRefIndicateurs );
  }
  useEffect(() => {
    get_projets();
    get_indicateurs();
    get_ref_indicateurs()
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={{ marginLeft: 20 }}>
        <Ionicons name="arrow-back-outline" size={24} color="black" />
      </TouchableOpacity>
      {indicateurs.filter((indicateur) => indicateur.id.toString() === id).map((indicateur) => (
        <ScrollView key={indicateur.id}>
          <Text style={{fontSize: 30, marginTop: 15, fontWeight: 500, marginLeft:15}}>{indicateur.name}</Text>
          
          {refIndicateurs.filter((refindicateur) => refindicateur.id_indicateur.toString() === id).map((refindicateur) => (
            <View key={refindicateur.id} style={styles.card}>
              <View style={{flexDirection : 'row', gap: 20}}>
                <View>
                  <Text style={styles.tex}>Seuil min : {refindicateur.seuil_min}</Text>
                  <Text style={styles.tex}>Seuil max : {refindicateur.seuil_max}</Text>
                </View>
                <View style={styles.laine}></View>
                <Text style={styles.tex}>Echelle : {refindicateur.echelle}</Text>
              </View>
              
              <Text style={styles.tex}>Resp : Diarafa SOUKOUNA</Text>
            </View>
          ))}
          
          {refIndicateurs.filter((refindicateur) => refindicateur.id_indicateur.toString() === id).map((refindicateur) => (
            <Text key={`domaine-${refindicateur.id}`} style={styles.dom}> 
              <Text style={{fontSize: 20, fontWeight: 400, color: '#01afaf'}}>Domaine : </Text>
              {refindicateur.domaine}
            </Text> 
          ))}
          
          <Chart></Chart>
        </ScrollView>
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
        width: '90%',
        paddingLeft: 20 ,
        paddingRight: 20,
        paddingBottom: 20,
        marginTop: 20,
        marginLeft: 15,
        borderRadius: 10,
        backgroundColor: '#01afaf',
    },
    text:{
        textAlign: 'center',
        fontSize: 16,
    },
    forme: {
       width : 25,
       height: 25,
       borderRadius:100,
       backgroundColor: '#FFCC00'
    },
    line :{
        width: 1,
        height: 80,
        backgroundColor: '#000',
        marginTop: 20
      
    },
    contBack: {
        padding: 20,
        borderRadius: 10,
        backgroundColor: '#01afaf',
        margin: 10,     
      },
      tex : {
        fontSize: 16,
         color: '#fff',
         marginTop: 20

      }, 
      dom:{
        fontWeight: 200,
        maxWidth: '95%',
        marginTop: 25,
        marginLeft:15,
      },
})