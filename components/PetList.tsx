import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useQuery } from "@tanstack/react-query";
import { getAllPets } from "../api/pets";
import PetItem from "./PetItem";
import type { Pet } from "@/data/pets";

const PetList = () => {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["pets"],
    queryFn: getAllPets,
  });

  // لازم hook يكون فوق قبل أي return
  const [displayPets, setDisplayPets] = useState<Pet[]>([]);

  // أول ما توصل البيانات خزنيها
  useEffect(() => {
    if (data) setDisplayPets(data);
  }, [data]);

  if (isLoading) return <Text>Loading pets... 🐾</Text>;
  if (isError) return <Text>Error loading pets 😢</Text>;

  const petList = displayPets
    .filter((pet) => pet.name.toLowerCase().includes(search.toLowerCase()))
    .filter((pet) => pet.type.toLowerCase().includes(type.toLowerCase()))
    .map((pet) => (
      <PetItem
        key={pet.id}
        pet={pet}
        setDisplayPets={setDisplayPets}
        displayPets={displayPets}
      />
    ));

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      style={styles.containerStyle}
    >
      <TextInput
        placeholder="Search for a pet"
        style={styles.searchInput}
        onChangeText={setSearch}
        value={search}
        placeholderTextColor="#888"
      />

      <ScrollView horizontal contentContainerStyle={styles.filterContainer}>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setType("")}
        >
          <Text>All</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setType("Cat")}
        >
          <Text>Cat</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setType("Dog")}
        >
          <Text>Dog</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setType("Rabbit")}
        >
          <Text>Rabbit</Text>
        </TouchableOpacity>
      </ScrollView>

      {petList}
    </ScrollView>
  );
};

export default PetList;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  containerStyle: {
    backgroundColor: "#f9e3be",
    paddingRight: 20,
    paddingLeft: 20,
    paddingBottom: 20,
  },
  searchInput: {
    width: "100%",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
    borderColor: "#000",
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
  },
  filterButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    width: "20%",
    justifyContent: "center",
    alignItems: "center",
  },
});
