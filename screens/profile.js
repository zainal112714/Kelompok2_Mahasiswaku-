import { Heading, Center, View, Image, Text, VStack, Button } from "native-base";
import { Header } from "../components";
import FIREBASE from "./config/FIREBASE";
import { clearStorage, getData } from "./utils";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

const Profile = () => {
  const navigation = useNavigation(); //fungsi navigasi
  const [profile, setProfile] = useState(null); //fungsi buat state

  const getUserData = () => {
    getData("user").then((res) => {
      const data = res;
      if (data) {
        console.log("ini ambil data dari user", data);
        setProfile(data);
      } else {
        // navigation.replace('Login');
      }
    });
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getUserData();
    });

    return () => {
      unsubscribe();
    };
  }, [navigation]);

  const onSubmit = (profile) => {
    if (profile) {
      FIREBASE.auth()
        .signOut()
        .then(() => {
          // Sign-out successful.
          clearStorage();
          navigation.navigate("Choose");
        })
        .catch((error) => {
          // An error happened.
          alert(error);
        });
    } else {
      navigation.navigate("Login");
    }
  };

  return (
    <>
      <View backgroundColor={"#9A1314"} w={"full"} h={"300"} borderBottomLeftRadius={"40"} borderBottomRightRadius={"40"}>
        <Center>
          <Heading color={"white"} mt={"50"} mb={"10"}>
            Profile
          </Heading>
          <Image
            source={require("../assets/profile.png")}
            resizeMode="contain"
            w="150"
            h="150"
            alt="Profil Logo"
            borderRadius={"full"}
          />
        </Center>
      </View>
      <View mx={8} mt={"5"}>
        <VStack mb={"5"} >
          <Text bold={true} fontSize={"20"}>
            Nama :
          </Text>
          <Text fontSize={"20"} fontWeight={"light"}>
            {profile?.nama}
          </Text>
        </VStack>
        <VStack mb={"5"} >
          <Text bold={true} fontSize={"20"}>
            Email :
          </Text>
          <Text fontSize={"20"} fontWeight={"light"}>
            {profile?.email}
          </Text>
        </VStack>
        <VStack mb={"5"} >
          <Text bold={true} fontSize={"20"}>
            No HP :
          </Text>
          <Text fontSize={"20"} fontWeight={"light"}>
            {profile?.nohp}
          </Text>
        </VStack>
      </View>
      <Center flex={0.8}>
        <Button bg={"#9A1314"} mb={"2"} w={"30%"} type="text"
        title={profile ? "Logout" : "Login"} onPress={() => onSubmit(profile)}>
          <Text color={"white"} bold={true}>Logout</Text>
        </Button>
        <Button w={"30%"} bg={"#9A1314"} onPress={() => navigation.navigate("About")}>
          <Text color={"white"} bold={true}>About App</Text>
        </Button>
        <Image
          source={require("../assets/telkom.png")}
          resizeMode="contain"
          w="75"
          h="75"
          mt={"2"}
          alt="Profil Logo"
          borderRadius={"full"}
        />
      </Center>
    </>
  );
};

export default Profile;