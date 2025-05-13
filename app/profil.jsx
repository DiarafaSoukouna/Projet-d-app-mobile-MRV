import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  TouchableWithoutFeedback, 
  SafeAreaView,
  StatusBar,
  Dimensions,
  Animated,
  Platform
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { get_data, BaseURL } from './get_api';
import AsyncStorage from '@react-native-async-storage/async-storage';


const { width } = Dimensions.get('window');
const HEADER_MAX_HEIGHT = 220;
const HEADER_MIN_HEIGHT = Platform.OS === 'ios' ? 90 : 70;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const ProfileScreen = () => {
  const router = useRouter();
  const [menu, setMenu] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current;
  const [isScrolled, setIsScrolled] = useState(false);
  const [id, setId] = useState(1);
  const [user, setUser] = useState({});


  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;

  const getInitials = (text1, text2) => {
  const firstLetter1 = text1?.trim()?.charAt(0).toUpperCase() || '';
  const firstLetter2 = text2?.trim()?.charAt(0).toUpperCase() || '';
  return firstLetter1 + firstLetter2;
};
  const get_user = async () => {
    get_data(`${BaseURL}/users.routes.php?id=${id}`, setUser);
  }
  // const get_groupes = async () => {
  //   get_data(`${BaseURL}/groupes.routes.php?id=${id}`, setUser);
  // }
  useEffect(() => {
  setId(AsyncStorage.getItem('userId'));
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      })
    ]).start();
   get_user()
  }, []);

  const closeMenu = () => {
    if (menu) setMenu(false);
  };

  const headerHeight = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    extrapolate: 'clamp',
  });

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 0.5, 0],
    extrapolate: 'clamp',
  });


  return (
<SafeAreaView style={styles.container}>
  <StatusBar barStyle="light-content" backgroundColor="#0a8f8f" />


  <View style={styles.header}>
    <LinearGradient colors={['#0a8f8f', '#01afaf', '#3cc4c4']} style={styles.headerGradient}>
      <View style={{justifyContent: 'space-between' , flexDirection: 'row',  paddingHorizontal: 16, paddingTop: Platform.OS === 'ios' ? 40 : 20 }}>
         <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Ionicons name="arrow-back-outline" size={22} color="#fff" />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setMenu(!menu)} style={styles.menuButton}>
        <Ionicons name="ellipsis-vertical" size={22} color={isScrolled ? "#01afaf" : "#fff"} />
      </TouchableOpacity>
      </View>
     

      <View style={styles.headerContent}>
        <View style={styles.pic}>
          <Text style={styles.initials}>{getInitials(user.prenom, user.nom)}</Text>
        </View>
        <Text style={styles.nom}>{user.prenom} {user.nom}</Text>

        <View style={styles.badgeContainer}>
          <View style={styles.badge}>
            <Ionicons name="shield-checkmark-outline" size={14} color="#fff" style={{ marginRight: 4 }} />
            <Text style={styles.badgeText}>{user.fonction}</Text>
          </View>
        </View>
      </View>
    </LinearGradient>
  </View>


  {menu && (
    <TouchableWithoutFeedback onPress={closeMenu}>
      <View style={styles.overlay}>
        <View style={styles.dropdown}>
          <TouchableOpacity
            onPress={() => {
              setMenu(false);
              router.push('./mot_de_passe');
            }}
            style={styles.menuItem}
          >
            <Ionicons name="create-outline" size={18} color="#01afaf" style={styles.menuIcon} />
            <Text style={styles.menuText}>Modifier mon mot de passe</Text>
          </TouchableOpacity>

          <View style={styles.menuDivider} />

          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="log-out-outline" size={18} color="#db2a3e" style={styles.menuIcon} />
            <Text style={styles.menuTextDanger}>Déconnexion</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )}


  <ScrollView
    contentContainerStyle={[styles.scrollContent, { paddingTop: HEADER_MAX_HEIGHT + 16 }]}
    scrollEventThrottle={16}
    onScroll={Animated.event(
      [{ nativeEvent: { contentOffset: { y: scrollY } } }],
      {
        useNativeDriver: false,
        listener: event => {
          const offsetY = event.nativeEvent.contentOffset.y;
          setIsScrolled(offsetY > 10);
        },
      }
    )}
    showsVerticalScrollIndicator={false}
    bounces={false}
  >
    <View style={styles.infoCard}>
      <View style={styles.infoCardHeader}>
        <Ionicons name="person" size={20} color="#01afaf" />
        <Text style={styles.infoCardTitle}>Informations personnelles</Text>
      </View>

      <View style={styles.infoItem}>
        <Ionicons name="mail-outline" size={18} color="#01afaf" />
        <Text style={styles.infoText}>{user.email}</Text>
      </View>

      <View style={styles.infoItem}>
        <Ionicons name="person-circle-outline" size={18} color="#01afaf" />
        <Text style={styles.infoText}>{user.username}</Text>
      </View>

      <View style={styles.infoItem}>
        <Ionicons name="call" size={18} color="#01afaf" />
        <Text style={styles.infoText}>{user.phone}</Text>
      </View>

      <View style={[styles.infoItem, styles.noBorder]}>
        <Ionicons name="briefcase-outline" size={18} color="#01afaf" />
        <Text style={styles.infoText}>{user.fonction}</Text>
      </View>
    </View>

    <View style={styles.sectionHeader}>
      <Ionicons name="people" size={20} color="#01afaf" />
      <Text style={styles.sectionTitle}>Groupes de travail</Text>
    </View>


    <View style={styles.cardList}>
      {[
        {
          titre: "Projet Marketing Q2",
          date: "12/02/2025",
          membres: "8 membres",
          statut: "Actif",
          badgeStyle: styles.cardBadge,
          badgeTextStyle: styles.cardBadgeText,
        },
        {
          titre: "Développement App Mobile",
          date: "12/02/2025",
          membres: "5 membres",
          statut: "Urgent",
          badgeStyle: [styles.cardBadge, styles.cardBadgeUrgent],
          badgeTextStyle: [styles.cardBadgeText, styles.cardBadgeTextUrgent],
        },
        {
          titre: "Analyse des données",
          date: "05/01/2025",
          membres: "3 membres",
          statut: "Terminé",
          badgeStyle: [styles.cardBadge, styles.cardBadgeCompleted],
          badgeTextStyle: [styles.cardBadgeText, styles.cardBadgeTextCompleted],
        },
      ].map((card, index) => (
        <TouchableOpacity
          key={index}
          style={styles.card}
          activeOpacity={0.9}
          onPress={() => router.push(`./groupe/${id}`)}
        >
          <LinearGradient
            colors={['rgba(1, 175, 175, 0.08)', 'rgba(1, 175, 175, 0.03)']}
            style={styles.cardGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.cardHeader}>
              <Text style={styles.titre}>{card.titre}</Text>
              <View style={card.badgeStyle}>
                <Text style={card.badgeTextStyle}>{card.statut}</Text>
              </View>
            </View>

            <View style={styles.cardContent}>
              <View style={styles.cardInfo}>
                <View style={styles.cardInfoItem}>
                  <AntDesign name="calendar" size={16} color="#01afaf" />
                  <Text style={styles.dateText}>{card.date}</Text>
                </View>

                <View style={styles.cardInfoItem}>
                  <Ionicons name="people-outline" size={16} color="#01afaf" />
                  <Text style={styles.dateText}>{card.membres}</Text>
                </View>
              </View>

              <View style={styles.viewButton}>
                <Text style={styles.viewButtonText}>Voir</Text>
                <Ionicons name="chevron-forward" size={16} color="#fff" />
              </View>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      ))}
    </View>
  </ScrollView>
</SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
    zIndex: 10,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    overflow: 'hidden',
    

  },
  headerGradient: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 20,
  },
  headerContent: {
    alignItems: 'center',
    

  },
  navbar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: HEADER_MIN_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: Platform.OS === 'ios' ? 40 : 20,
    paddingHorizontal: 16,
    zIndex: 2,
  },
  navbarScrolled: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
  },
  navbarTitleContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 40 : 20,
  },
  navbarTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#fff',
  },
  navbarTitleScrolled: {
    color: '#01afaf',
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  menuButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  dropdown: {
    position: 'absolute',
    right: 16,
    top: Platform.OS === 'ios' ? 90 : 70,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 8,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    width: 220,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  menuIcon: {
    marginRight: 12,
  },
  menuText: {
    fontSize: 15,
    color: '#333',
    fontWeight: '500',
  },
  menuTextDanger: {
    fontSize: 15,
    color: '#db2a3e',
    fontWeight: '500',
  },
  menuDivider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 8,
  },
  scrollContent: {
    paddingBottom: 30,
  },
  contentContainer: {
    padding: 16,
  },
  pic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    marginBottom: 12,
  },
  initials: {
    fontSize: 36,
    fontWeight: '700',
    color: 'white',
  },
  nom: {
    fontSize: 24,
    fontWeight: '700',
    color: 'white',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  badgeContainer: {
    flexDirection: 'row',
  },
  badge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
    marginTop: 15,
    shadowColor: '#01afaf',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  infoCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  infoCardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginLeft: 8,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
  },
  noBorder: {
    borderBottomWidth: 0,
    marginBottom: 0,
    paddingBottom: 0,
  },
  infoText: {
    fontSize: 15,
    color: '#444',
    marginLeft: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    marginLeft: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginLeft: 8,
  },
  cardList: {
    gap: 16,
    // marginBottom: 24,
  },
  card: {
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#01afaf',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
    backgroundColor: '#fff',
  },
  cardGradient: {
    padding: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  titre: {
    fontSize: 17,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  cardBadge: {
    backgroundColor: 'rgba(1, 175, 175, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  cardBadgeUrgent: {
    backgroundColor: 'rgba(219, 42, 62, 0.15)',
  },
  cardBadgeCompleted: {
    backgroundColor: 'rgba(76, 175, 80, 0.15)',
  },
  cardBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#01afaf',
  },
  cardBadgeTextUrgent: {
    color: '#db2a3e',
  },
  cardBadgeTextCompleted: {
    color: '#4CAF50',
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardInfo: {
    gap: 8,
  },
  cardInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dateText: {
    fontSize: 14,
    color: '#666',
  },
  viewButton: {
    backgroundColor: '#01afaf',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  viewButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  statsContainer: {
    marginBottom: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    width: (width - 48) / 2,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#01afaf',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    marginBottom: 16,
  },
  statNumber: {
    fontSize: 28,
    fontWeight: '700',
    color: '#01afaf',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
});

export default ProfileScreen;