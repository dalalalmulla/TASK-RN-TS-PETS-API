import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import React from "react";
import { useLocalSearchParams, router } from "expo-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deletePet, getPetById } from "../api/pets";

const PetDetails = () => {
  const { petId } = useLocalSearchParams<{ petId: string }>();
  const queryClient = useQueryClient();

  const {
    data: pet,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["pet", petId],
    queryFn: () => getPetById(petId as string),
    enabled: !!petId,
  });

  const { mutate: removePet, isPending } = useMutation({
    mutationFn: (id: string) => deletePet(id),
    onSuccess: () => {
      // يحدّث قائمة pets
      queryClient.invalidateQueries({ queryKey: ["pets"] });
      // يرجع للصفحة اللي قبل
      router.back();
    },
    onError: () => {
      Alert.alert("Error", "Failed to delete pet. Please try again.");
    },
  });

  const handleDelete = () => {
    if (!petId) return;

    Alert.alert(
      "Delete this pet?",
      "Are you sure you want to delete this pet?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Yes, Delete",
          style: "destructive",
          onPress: () => removePet(petId),
        },
      ]
    );
  };

  if (isLoading) return <Text>Loading pet details... 🐾</Text>;
  if (isError || !pet) return <Text>Pet not found 😢</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{pet.name}</Text>

      <Image source={{ uri: pet.image }} style={styles.image} />

      <Text style={styles.description}>{pet.description}</Text>
      <Text style={styles.type}>Type: {pet.type}</Text>

      <TouchableOpacity
        style={[styles.button, isPending && styles.buttonDisabled]}
        onPress={handleDelete}
        disabled={isPending}
      >
        <Text style={styles.buttonText}>
          {isPending ? "Deleting..." : "Delete"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default PetDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9e3be",
    padding: 20,
  },
  image: {
    width: "100%",
    height: 300,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    marginTop: 10,
    textAlign: "center",
  },
  type: {
    fontSize: 16,
    marginTop: 10,
    textAlign: "center",
  },
  button: {
    backgroundColor: "black",
    padding: 10,
    borderRadius: 10,
    margin: 10,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
});
