import React from 'react';
import { Text, View } from 'react-native';
import AppLoading from 'expo-app-loading';
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto';

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
      }}
    >
      <Text style={{ fontFamily: 'Roboto_400Regular', fontSize: 24 }}>
        Texte en Roboto régulier
      </Text>
      <Text style={{ fontFamily: 'Roboto_700Bold', fontSize: 24, marginTop: 10 }}>
        Texte en Roboto bold
      </Text>
    </View>
  );
}