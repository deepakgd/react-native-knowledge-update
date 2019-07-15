import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button, Linking } from 'react-native';
import { RNCamera } from 'react-native-camera';


export default class BarcodeScanner extends Component {

    constructor(props){
        super(props)
        this.state = {
            isUrlLoaded: false,
            url: null
        }

        
    }


    takePicture = async() => {
        if (this.camera) {
          const options = { quality: 0.5, base64: true };
          const data = await this.camera.takePictureAsync(options);
          console.log(data.uri);
        }
    };

    barCodeHandler = ({ barcodes }) => {
        console.log(barcodes);
        if(barcodes && barcodes[0] && barcodes[0].type === "QR_CODE"){
            this.setState({ isUrlLoaded: true, url: barcodes[0].data })
        }
    }

    openWebsite  = () => {
        console.log("open")
        Linking.openURL(this.state.url)
    }

    render() {
        return (
            <View style={styles.container}>
                <RNCamera
                ref={ref => {
                    this.camera = ref;
                }}
                style={styles.preview}
                type={RNCamera.Constants.Type.back}
                flashMode={RNCamera.Constants.FlashMode.off}
                androidCameraPermissionOptions={{
                    title: 'Permission to use camera',
                    message: 'We need your permission to use your camera',
                    buttonPositive: 'Ok',
                    buttonNegative: 'Cancel',
                }}
                androidRecordAudioPermissionOptions={{
                    title: 'Permission to use audio recording',
                    message: 'We need your permission to use your audio',
                    buttonPositive: 'Ok',
                    buttonNegative: 'Cancel',
                }}
                onGoogleVisionBarcodesDetected={this.barCodeHandler}
                />
                <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
                <TouchableOpacity onPress={this.takePicture.bind(this)} style={styles.capture}>
                    <Text style={{ fontSize: 14 }}> SNAP </Text>
                </TouchableOpacity>
                {this.state.isUrlLoaded && 
                    <TouchableOpacity onPress={this.openWebsite.bind(this)} style={styles.capture}>
                        <Text style={{ fontSize: 14 }}> Open </Text>
                    </TouchableOpacity>
                }
                </View>
            </View>
        )
    }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});