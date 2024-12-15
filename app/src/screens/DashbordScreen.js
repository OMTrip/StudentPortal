import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  FlatList,
  Image,
} from "react-native";
import Modal from "react-native-modal";
import { Ionicons } from "@expo/vector-icons"; // Import icon for the menu button
import { useNavigation } from "expo-router";
import { useSelector } from "react-redux";

export default function DashbordScreen() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [slideAnim] = useState(new Animated.Value(-300)); // Start off-screen
  const [students, setStudents] = useState([]);
  const [profile, setProfile] = useState(null); // To store the current student's profile
  const userProfile = useSelector((state) => state.profile);

  const navigation = useNavigation();
  // Fetch student data (multiple students)
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => {
        setStudents(data); // Set the students data
        setProfile(data[0]); // Set the first student as the profile (just for demonstration)
      })
      .catch((error) => {
        console.error("Error fetching student data:", error);
      });
  }, []);

  // Toggle the modal visibility
  const toggleModal = () => {
    setModalVisible(!isModalVisible);

    // Slide animation for modal
    if (!isModalVisible) {
      Animated.timing(slideAnim, {
        toValue: 0, // Move to the left side (0 means fully visible)
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: -300, // Slide off-screen to the left
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  // Handle click on profile image
  const handleProfileClick = () => {
    navigation.navigate("ProfileScreen", { profile });
  };

  // Render each student item
  const renderStudentItem = ({ item }) => (
    <View style={styles.studentCard}>
      <Image
        source={{ uri: "https://via.placeholder.com/100" }} // Placeholder image
        style={styles.studentImage}
      />
      <View style={styles.studentInfo}>
        <Text style={styles.studentName}>{item.name}</Text>
        <Text>Email: {item.email}</Text>
        <Text>Phone: {item.phone}</Text>
        <Text>Website: {item.website}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <TouchableOpacity onPress={toggleModal}>
          <Ionicons
            name="menu"
            size={30}
            color="#fff"
            style={{ marginLeft: 10 }}
          />
        </TouchableOpacity>
        <Text style={{ textAlign: "center", fontSize: 25, width: "100%",color:"#fff",marginLeft:10 }}>
              Student Details
            </Text>
      </View>
      {/* Main content (Student List) */}
      <FlatList
        data={students}
        renderItem={renderStudentItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.studentList}
      />
      {/* Modal (Sliding from Left) */}
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={toggleModal}
        onBackButtonPress={toggleModal}
        animationIn="slideInLeft"
        animationOut="slideOutLeft"
        backdropOpacity={0.5}
        style={styles.modal}
      >
        <Animated.View
          style={[
            styles.modalContent,
            { transform: [{ translateX: slideAnim }] },
          ]}
        >
          {/* Profile Section */}
          {/* <TouchableOpacity style={styles.profileSection} onPress={()=> navigation.navigate('ProfileScreen')}>
      <Image
        source={ require('../../../assets/images/edu.png')} // Replace with actual profile image URI
        style={styles.profileImage}
      />
      <Text style={styles.profileEmail}>user@example.com</Text>
    </TouchableOpacity> */}

          <TouchableOpacity
            onPress={handleProfileClick}
            style={{ alignItems: "center" }}
          >
            <Image
              source={
                userProfile.picture
                  ? { uri: userProfile.picture }
                  : require("../../../assets/images/edu.png")
              }
              style={styles.profileImage}
            />
            <Text style={{ textAlign: "center", fontSize: 18, width: "100%" }}>
              {userProfile.email}
            </Text>
          </TouchableOpacity>

          {/* Menu Items */}
          <Text style={styles.modalTitle}>Menu</Text>

          <TouchableOpacity onPress={toggleModal} style={styles.menuItem}>
            <Ionicons
              name="close"
              size={24}
              color="black"
              style={styles.menuIcon}
            />
            <Text style={styles.modalItem}>Close Menu</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("Courses")}
            style={styles.menuItem}
          >
            <Ionicons
              name="book"
              size={24}
              color="black"
              style={styles.menuIcon}
            />
            <Text style={styles.modalItem}>View Courses</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("RaiseQueryScreen")}
            style={styles.menuItem}
          >
            <Ionicons
              name="chatbox"
              size={24}
              color="black"
              style={styles.menuIcon}
            />
            <Text style={styles.modalItem}>Raise Query</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("PreRecordedClasses")}
            style={styles.menuItem}
          >
            <Ionicons
              name="videocam"
              size={24}
              color="black"
              style={styles.menuIcon}
            />
            <Text style={styles.modalItem}>Pre-recorded Classes</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("UploadAssignmentScreen")}
            style={styles.menuItem}
          >
            <Ionicons
              name="cloud-upload"
              size={24}
              color="black"
              style={styles.menuIcon}
            />
            <Text style={styles.modalItem}>Upload Assignment</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("LiveStreamingScreen")}
            style={styles.menuItem}
          >
            <Ionicons
              name="radio"
              size={24}
              color="black"
              style={styles.menuIcon}
            />
            <Text style={styles.modalItem}>Live Stream</Text>
          </TouchableOpacity>
        </Animated.View>
      </Modal>
     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  profileHeader: {
    padding: 20,
    backgroundColor: "#6200ee",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: "#fff", // Border to make the profile image look neat
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  studentList: {
    padding: 20,
  },
  studentCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  studentImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  studentInfo: {
    flex: 1,
  },
  studentName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#6200ee",
    marginBottom: 5,
  },
  modal: {
    margin: 0,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    width: 250,
    height: "100%",
    position: "absolute",
    left: 0,
    top: 0,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: -3, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#6200ee",
  },
  modalItem: {
    fontSize: 18,
    // paddingVertical: 10,
    color: "#6200ee",
  },

  modal: {
    margin: 0,
    justifyContent: "flex-start",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    width: "75%",
    height: "100%",
  },
  profileSection: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  profileEmail: {
    fontSize: 16,
    color: "gray",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  menuIcon: {
    marginRight: 10,
  },
  modalItem: {
    fontSize: 16,
    width: "100%",
  },
});
