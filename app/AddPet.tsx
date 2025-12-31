import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";

const AddPet = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Your Pet! </Text>
      <TextInput placeholder="Name" style={styles.input} placeholderTextColor="#888" />
      <TextInput placeholder="Description" style={styles.input} placeholderTextColor="#888" />
      <TextInput placeholder="Type" style={styles.input} placeholderTextColor="#888" />
      <TextInput placeholder="Image" style={styles.input} placeholderTextColor="#888" />
      <TextInput placeholder="Adopted" style={styles.input} placeholderTextColor="#888" />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Add Pet</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddPet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9e3be",
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
  button: {
    backgroundColor: "black",
    padding: 10,
    borderRadius: 10,
    margin: 10,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
});
