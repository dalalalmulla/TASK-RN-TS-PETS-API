import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View, Button, Alert } from "react-native";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addPet } from "../api/pets";
import { useRouter } from "expo-router";

export default function AddPet() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [image, setImage] = useState("");
  const [adopted, setAdopted] = useState(false);

  const { mutate: createPet, isPending } = useMutation({
    mutationFn: (newPet: {
      name: string;
      description: string;
      image: string;
      type: string;
      adopted: number;
    }) =>
      addPet(
        newPet.name,
        newPet.image,
        newPet.type,
        newPet.adopted,
        newPet.description
      ),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pets"] });

      setName("");
      setDescription("");
      setType("");
      setImage("");
      setAdopted(false);

      router.back();
    },

    onError: () => {
      Alert.alert("Error", "Failed to create pet. Please try again.");
    },
  });

  const handleAdd = () => {
    if (!name.trim() || !type.trim()) {
      Alert.alert("Missing info", "Please enter Name and Type.");
      return;
    }

    createPet({
      name: name.trim(),
      description: description.trim(),
      type: type.trim(),
      image:
        image.trim() ||
        "https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=400&h=400&fit=crop",
      adopted: adopted ? 1 : 0,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Your Pet!</Text>

      <TextInput
        placeholder="Name"
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholderTextColor="#888"
      />

      <TextInput
        placeholder="Description"
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        placeholderTextColor="#888"
      />

      <TextInput
        placeholder="Type (Cat / Dog / Rabbit)"
        style={styles.input}
        value={type}
        onChangeText={setType}
        placeholderTextColor="#888"
      />

      <TextInput
        placeholder="Image URL (optional)"
        style={styles.input}
        value={image}
        onChangeText={setImage}
        placeholderTextColor="#888"
      />

      <TextInput
        placeholder="Adopted? (0 or 1)"
        style={styles.input}
        value={adopted ? "1" : "0"}
        onChangeText={(val) => setAdopted(val === "1")}
        placeholderTextColor="#888"
        keyboardType="numeric"
      />

      <View style={{ margin: 10 }}>
        <Button
          title={isPending ? "Creating..." : "Add Pet"}
          onPress={handleAdd}
          disabled={isPending}
          color="black"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9e3be",
    paddingTop: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    margin: 10,
  },
  input: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    margin: 10,
  },
});
