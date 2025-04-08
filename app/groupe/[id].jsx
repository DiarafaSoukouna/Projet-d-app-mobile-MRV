"use client"

import { useState, useEffect } from "react"
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Animated,
  Dimensions,
} from "react-native"
import { useRouter } from "expo-router"
import Ionicons from "react-native-vector-icons/Ionicons"
import { LinearGradient } from "expo-linear-gradient"

const { width } = Dimensions.get("window")

export default function GroupeScreen() {
  const router = useRouter()
  const [groupName] = useState("Groupe Harmonie")
  const [members] = useState([
    { id: 1, nom: "Toure", groupe: "Groupe A", status: "Actif" },
    { id: 2, nom: "Sanogo", groupe: "Groupe B", status: "Inactif" },
    { id: 3, nom: "Fily", groupe: "Groupe C", status: "Actif" },
    { id: 4, nom: "Diallo", groupe: "Groupe A", status: "Actif" },
    { id: 5, nom: "Keita", groupe: "Groupe B", status: "Inactif" },
  ])

  const fadeAnim = useState(new Animated.Value(0))[0]
  const translateAnim = useState(new Animated.Value(30))[0]

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(translateAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start()
  }, [])

  const renderMemberCard = (member, index) => {
    const isActive = member.status === "Actif"
    const delay = index * 100

    return (
      <Animated.View
        key={member.id}
        style={[
          styles.memberCard,
          {
            opacity: fadeAnim,
            transform: [{ translateY: translateAnim }],
          },
        ]}
      >
        <View style={styles.cardContent}>
          <View style={[styles.initialCircle, isActive ? styles.activeInitialCircle : styles.inactiveInitialCircle]}>
            <Text style={styles.initialText}>{member.nom.charAt(0)}</Text>
          </View>
          <View style={styles.memberInfo}>
            <Text style={styles.memberName}>{member.nom}</Text>
            <Text style={styles.memberGroup}>{member.groupe}</Text>
          </View>
          <View style={[styles.statusBadge, isActive ? styles.activeBadge : styles.inactiveBadge]}>
            <Text style={[styles.statusText, isActive ? styles.activeText : styles.inactiveText]}>{member.status}</Text>
          </View>
        </View>
      </Animated.View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <LinearGradient colors={["#01afaf", "#01c2c2"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton} activeOpacity={0.7}>
            <Ionicons name="arrow-back-outline" size={24} color="#ffffff" />
          </TouchableOpacity>
          <Text style={styles.groupName}>{groupName}</Text>
         
        </View>
      </LinearGradient>


      <View style={styles.titleContainer}>
        <Text style={styles.sectionTitle}>Membres</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="filter" size={18} color="#01afaf" />
          <Text style={styles.filterText}>Filtrer</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.membersContainer}>{members.map((member, index) => renderMemberCard(member, index))}</View>
      </ScrollView>

     
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafa",
  },
  header: {
    height: 110,
    width: "100%",
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    elevation: 4,
    shadowColor: "#01afaf",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  headerContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  optionsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  groupName: {
    fontSize: 22,
    fontWeight: "700",
    color: "#ffffff",
    textAlign: "center",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginTop: -25,
  },
  statCard: {
    backgroundColor: "#ffffff",
    borderRadius: 15,
    padding: 15,
    width: "30%",
    alignItems: "center",
    shadowColor: "#01afaf",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "700",
    color: "#01afaf",
  },
  statLabel: {
    fontSize: 14,
    color: "#8a8a8a",
    marginTop: 5,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 25,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(1, 175, 175, 0.1)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  filterText: {
    fontSize: 14,
    color: "#01afaf",
    marginLeft: 5,
  },
  scrollView: {
    flex: 1,
  },
  membersContainer: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  memberCard: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    marginBottom: 15,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  initialCircle: {
    width: 45,
    height: 45,
    borderRadius: 23,
    justifyContent: "center",
    alignItems: "center",
  },
  activeInitialCircle: {
    backgroundColor: "rgba(1, 175, 175, 0.15)",
  },
  inactiveInitialCircle: {
    backgroundColor: "rgba(239, 139, 51, 0.15)",
  },
  initialText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#01afaf",
  },
  memberInfo: {
    flex: 1,
    marginLeft: 15,
  },
  memberName: {
    fontSize: 17,
    fontWeight: "600",
    color: "#333",
  },
  memberGroup: {
    fontSize: 14,
    color: "#8a8a8a",
    marginTop: 4,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  activeBadge: {
    backgroundColor: "rgba(1, 175, 175, 0.15)",
  },
  inactiveBadge: {
    backgroundColor: "rgba(239, 139, 51, 0.15)",
  },
  statusText: {
    fontSize: 14,
    fontWeight: "500",
  },
  activeText: {
    color: "#01afaf",
  },
  inactiveText: {
    color: "#ef8b33",
  },
  addButton: {
    position: "absolute",
    bottom: 25,
    right: 25,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#01afaf",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#01afaf",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
})
