"use strict";

import React, { Component } from "react";

import {
  Button,
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  FlatList
} from "react-native";

class CartScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: "",
      isLoading: true,
      ProductPrice: 0,
      deviceId:""
    };
  }

  buy = () => {
      fetch("http://192.168.100.8:3000/cart/"+this.state.deviceId+"/buy")
      .then(response => response.text())
      .then(responseText =>{
          console.warn(this.state.deviceId);
      })

      this.props.navigation.navigate("QR");
  };

  componentDidMount() {
    const { navigation } = this.props;
    const deviceId = navigation.getParam("deviceId", "NO-ID");

    return fetch("http://192.168.100.8:3000/cart/" + deviceId)
      .then(response => response.json())
      .then(responeJson => {
        let price = 0;

        for (let i = 0; i < responeJson.length; i++) {
          price += responeJson[i].ProductPrice;
        }

        this.setState(
          { products: responeJson, isLoading: false, ProductPrice: price, deviceId:deviceId },
          () => {}
        );
      })
      .catch(error => console.warn(error));
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }
    let key = 0;
    return (
      <View style={{ flex: 1, paddingTop: 20 }}>
        <FlatList
          data={this.state.products}
          renderItem={({ item }) => (
            <Text>
              {item.ProductName}, {item.ProductPrice}
            </Text>
          )}
          keyExtractor={({ id }, index) => id}
        />

        <Button
          onPress={this.buy}
          style={styles.buyButton}
          title={this.state.ProductPrice.toString()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buyButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#ee6e73",
    position: "absolute",
    bottom: 10,
    right: 10
  }
});

export default CartScreen;
