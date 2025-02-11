import React from 'react';
import { Text, TouchableOpacity, StyleSheet, View, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';

export default function NotificationScreen() {
  const router = useRouter();

  const handleDeleteNotification = (id) => {
    console.log('Notification supprimée:', id);
  };

  const NotificationCard = ({ id, text, onDelete }) => (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Text style={styles.text}>{text}</Text>
        <TouchableOpacity onPress={onDelete}>
          <Entypo name="trash" size={24} color="#d43b58" style={styles.iconButton} />
        </TouchableOpacity>
      </View>
    </View>
  );

  const notifications = [
    { id: 1, text: "Bienvenue sur l'application mobile Mrv !" },
    { id: 2, text: 'Nouveau message de l’administrateur.' },
    { id: 3, text: 'Votre compte a été mis à jour avec succès.' },
  ];

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Ionicons name="arrow-back-outline" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.title}>Notifications</Text>
      <ScrollView>
        {notifications.map((notification) => (
          <NotificationCard
            key={notification.id}
            id={notification.id}
            text={notification.text}
            onDelete={() => handleDeleteNotification(notification.id)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backButton: {
    marginTop: '13%',
    marginBottom: 10,
    marginLeft: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: '500',
    marginBottom: 20,
    marginLeft: 20,
  },
  card: {
    width: '90%',
    padding: 20,
    marginTop: 20,
    marginLeft: 15,
    borderRadius: 15,
    backgroundColor: '#b3f2f2',
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: '400',
    maxWidth: '85%',
  },
  iconButton: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 15,
  },
});