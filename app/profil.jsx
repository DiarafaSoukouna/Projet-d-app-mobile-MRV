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

const { width } = Dimensions.get('window');
const HEADER_MAX_HEIGHT = 220;
const HEADER_MIN_HEIGHT = Platform.OS === 'ios' ? 90 : 70;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const ProfileScreen = () => {
  const id =1;
  const router = useRouter();
  const [menu, setMenu] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current;
  const [isScrolled, setIsScrolled] = useState(false);

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;

  useEffect(() => {
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

  const titleOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [0, 0.5, 1],
    extrapolate: 'clamp',
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0a8f8f" />
      
      {/* Fixed Header Background */}
      <Animated.View style={[styles.header, { height: headerHeight }]}>
        <LinearGradient
          colors={['#0a8f8f', '#01afaf', '#3cc4c4']}
          style={styles.headerGradient}
        >
          <Animated.View style={[styles.headerContent, { opacity: headerOpacity }]}>
            <View style={styles.pic}>
              <Text style={styles.initials}>DS</Text>
            </View>
            <Text style={styles.nom}>Diarafa Soukouna</Text>
            <View style={styles.badgeContainer}>
              <View style={styles.badge}>
                <Ionicons name="shield-checkmark" size={14} color="#fff" style={{ marginRight: 4 }} />
                <Text style={styles.badgeText}>Administrateur</Text>
              </View>
            </View>
          </Animated.View>
        </LinearGradient>
      </Animated.View>

      {/* Fixed Navigation Bar */}
      <View style={[styles.navbar, isScrolled && styles.navbarScrolled]}>
        <TouchableOpacity 
          onPress={() => router.back()} 
          style={styles.backButton}
        >
          <Ionicons name="arrow-back-outline" size={22} color={isScrolled ? "#01afaf" : "#fff"} />
        </TouchableOpacity>

        <Animated.View 
          style={[
            styles.navbarTitleContainer, 
            { opacity: titleOpacity }
          ]}
        >
          <Text style={[styles.navbarTitle, isScrolled && styles.navbarTitleScrolled]}>
            Diarafa Soukouna
          </Text>
        </Animated.View>

        <TouchableOpacity 
          onPress={() => setMenu(!menu)} 
          style={styles.menuButton}
        >
          <Ionicons name="ellipsis-horizontal" size={22} color={isScrolled ? "#01afaf" : "#fff"} />
        </TouchableOpacity>
      </View>

      {menu && (
        <TouchableWithoutFeedback onPress={closeMenu}>
          <View style={styles.overlay}>
            <Animated.View 
              style={[styles.dropdown, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}
            >
              <TouchableOpacity 
                onPress={() => {
                  setMenu(false);
                  router.push('./modifier_profil');
                }} 
                style={styles.menuItem}
              >
                <Ionicons name="create-outline" size={18} color="#01afaf" style={styles.menuIcon} />
                <Text style={styles.menuText}>Modifier mon profil</Text>
              </TouchableOpacity>
              
              <View style={styles.menuDivider} />
              
              <TouchableOpacity style={styles.menuItem}>
                <Ionicons name="log-out-outline" size={18} color="#db2a3e" style={styles.menuIcon} />
                <Text style={styles.menuTextDanger}>Déconnexion</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </TouchableWithoutFeedback>
      )}

      {/* Main Scrollable Content */}
      <Animated.ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingTop: HEADER_MAX_HEIGHT + 16 }]}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { 
            useNativeDriver: false,
            listener: event => {
              const offsetY = event.nativeEvent.contentOffset.y;
              setIsScrolled(offsetY > 10);
            }
          }
        )}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <Animated.View 
          style={[styles.contentContainer, { opacity: fadeAnim, transform: [{ translateY: fadeAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [20, 0]
          })}] }]}
        >
          <View style={styles.infoCard}>
            <View style={styles.infoCardHeader}>
              <Ionicons name="person" size={20} color="#01afaf" />
              <Text style={styles.infoCardTitle}>Informations personnelles</Text>
            </View>
            
            <View style={styles.infoItem}>
              <Ionicons name="mail-outline" size={18} color="#01afaf" />
              <Text style={styles.infoText}>diarafasouk@gmail.com</Text>
            </View>
            
        
            
            <View style={[styles.infoItem, styles.noBorder]}>
              <Ionicons name="location-outline" size={18} color="#01afaf" />
              <Text style={styles.infoText}>Paris, France</Text>
            </View>
          </View>
          
          <View style={styles.sectionHeader}>
            <Ionicons name="people" size={20} color="#01afaf" />
            <Text style={styles.sectionTitle}>Groupes de travail</Text>
          </View>
          
          <View style={styles.cardList}>
            <TouchableOpacity 
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
                  <Text style={styles.titre}>Projet Marketing Q2</Text>
                  <View style={styles.cardBadge}>
                    <Text style={styles.cardBadgeText}>Actif</Text>
                  </View>
                </View>
                
                <View style={styles.cardContent}>
                  <View style={styles.cardInfo}>
                    <View style={styles.cardInfoItem}>
                      <AntDesign name="calendar" size={16} color="#01afaf" />
                      <Text style={styles.dateText}>12/02/2025</Text>
                    </View>
                    
                    <View style={styles.cardInfoItem}>
                      <Ionicons name="people-outline" size={16} color="#01afaf" />
                      <Text style={styles.dateText}>8 membres</Text>
                    </View>
                  </View>
                  
                  <View style={styles.viewButton}>
                    <Text style={styles.viewButtonText}>Voir</Text>
                    <Ionicons name="chevron-forward" size={16} color="#fff" />
                  </View>
                </View>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity 
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
                  <Text style={styles.titre}>Développement App Mobile</Text>
                  <View style={[styles.cardBadge, styles.cardBadgeUrgent]}>
                    <Text style={[styles.cardBadgeText, styles.cardBadgeTextUrgent]}>Urgent</Text>
                  </View>
                </View>
                
                <View style={styles.cardContent}>
                  <View style={styles.cardInfo}>
                    <View style={styles.cardInfoItem}>
                      <AntDesign name="calendar" size={16} color="#01afaf" />
                      <Text style={styles.dateText}>12/02/2025</Text>
                    </View>
                    
                    <View style={styles.cardInfoItem}>
                      <Ionicons name="people-outline" size={16} color="#01afaf" />
                      <Text style={styles.dateText}>5 membres</Text>
                    </View>
                  </View>
                  
                  <View style={styles.viewButton}>
                    <Text style={styles.viewButtonText}>Voir</Text>
                    <Ionicons name="chevron-forward" size={16} color="#fff" />
                  </View>
                </View>
              </LinearGradient>
            </TouchableOpacity>
            
            <TouchableOpacity 
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
                  <Text style={styles.titre}>Analyse des données</Text>
                  <View style={[styles.cardBadge, styles.cardBadgeCompleted]}>
                    <Text style={[styles.cardBadgeText, styles.cardBadgeTextCompleted]}>Terminé</Text>
                  </View>
                </View>
                
                <View style={styles.cardContent}>
                  <View style={styles.cardInfo}>
                    <View style={styles.cardInfoItem}>
                      <AntDesign name="calendar" size={16} color="#01afaf" />
                      <Text style={styles.dateText}>05/01/2025</Text>
                    </View>
                    
                    <View style={styles.cardInfoItem}>
                      <Ionicons name="people-outline" size={16} color="#01afaf" />
                      <Text style={styles.dateText}>3 membres</Text>
                    </View>
                  </View>
                  
                  <View style={styles.viewButton}>
                    <Text style={styles.viewButtonText}>Voir</Text>
                    <Ionicons name="chevron-forward" size={16} color="#fff" />
                  </View>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </View>
          
        
        </Animated.View>
      </Animated.ScrollView>
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
    paddingBottom: 20,
    top :10

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