import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";

import { createStackNavigator, createAppContainer } from "react-navigation";

import QRScreen from "./Components/Screens/QRScreen";
import CartScreen from "./Components/Screens/CartScreen";

const MainNavigator = createStackNavigator(
  {
    QR: { screen: QRScreen },
    Cart: { screen: CartScreen }
  },
  {
    initialRouteName: "QR"
  }
);

const App = createAppContainer(MainNavigator);

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});
