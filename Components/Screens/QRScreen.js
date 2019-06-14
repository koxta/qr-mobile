import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
  Button
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';

import DeviceInfo from 'react-native-device-info';

class ScanScreen extends Component {

    constructor() {
        super();
        this.state = {
          deviceId: '',
        };
        this.getdeviceId();
      }
      getdeviceId = () => {
        const id = DeviceInfo.getUniqueID();
        this.setState({ deviceId: id, });
      };

  render() {

    let scanner;

    const startScan = () => {
      if (scanner) {
        scanner._setScanning(false);
      }
    };

    return (
      <QRCodeScanner
        ref={(camera) => scanner = camera}
        onRead={(e)=>{
            console.log("detected");

            console.warn(e.data);
          this.props.navigation.navigate('Cart');
        }}
        topContent={
          <Text style={styles.centerText}>
              Scan QR Code
          </Text>
        }
        bottomContent={(<Button title="Reactivate" onPress={() => startScan()} />)
        }
      />
    );
  }
}

export default ScanScreen;


const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
});


