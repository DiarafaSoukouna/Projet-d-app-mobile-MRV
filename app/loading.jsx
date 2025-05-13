import { View, Text, ActivityIndicator, Animated, StyleSheet } from 'react-native';
import {  useRef } from 'react';
import { TextInput } from "react-native-paper";

import Icon from "react-native-vector-icons/MaterialIcons";

export const LoadingComponent = ({Nom}) => {
    const spinValue = useRef(new Animated.Value(0)).current;

    const spin = spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    });
  
    return (
      <View style={styles.loadingContainer}>
        <Animated.View style={[styles.loadingCircle, { transform: [{ rotate: spin }] }]}>
          <View style={styles.innerCircle}>
            <ActivityIndicator size="large" color="#ffffff" />
          </View>
        </Animated.View>
        <Text style={styles.loadingText}>Chargement des {Nom}...</Text>
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
    
  };
  const styles = StyleSheet.create({
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
      input: {
        flex: 1,
        backgroundColor: "transparent",
      },
      icon: {
        borderRadius: 10,
        backgroundColor: '#01afaf',
        padding: 10,   
        marginLeft: 5 
      },
})
  export const useAnimations = () => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.95)).current;
    const spinValue = useRef(new Animated.Value(0)).current;
  
    const animatedP = Animated.timing(spinValue, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true
    });
  
    const animatedP2 = [
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
    ];
  
    return {
      fadeAnim,
      scaleAnim,
      spinValue,
      animatedP,
      animatedP2
    };
  };
  export const SearchBar = ({ searchQuery, setSearchQuery }) => {
    return (
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
    );
  };
  