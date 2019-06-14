"use strict";

import React, { Component } from "react";

import {
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
      isLoading: true
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    const deviceId = navigation.getParam('deviceId', 'NO-ID');
    return fetch("http://192.168.100.8:3000/cart/"+deviceId)
      .then(response => response.json())
      .then(responeJson => {
        this.setState({ products: responeJson, isLoading: false }, () => {});
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
      </View>
    );
  }
}

export default CartScreen;
