import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Slider, Image } from 'react-native';
import { RNCamera } from 'react-native-camera';

const facemask = require('../img/facemask_dt_en.png');

export default class FaceMask extends Component {

    constructor(props){
        super(props);
        this.state = { 
            isFaceDetected: false,
            flash: 'off',
            zoom: 0,
            autoFocus: 'on',
            depth: 0,
            type: 'front',
            whiteBalance: 'auto',
            ratio: '16:9',
            recordOptions: {
            mute: false,
            maxDuration: 5,
            quality: RNCamera.Constants.VideoQuality['288p'],
            },
            isRecording: false,
            canDetectFaces: true,
            faces: [],
            maskWidth: 10,
            maskHeight: 10,
            imgPath: null,
            textFaceDetect: "Detecting Face..."
        };

    }


    toggle = value => () => this.setState(prevState => ({ [value]: !prevState[value] }));


    takePicture = async function() {
        if (this.camera) {
            const data = await this.camera.takePictureAsync();
            console.warn('takePicture ', data);
            this.setState({ imgPath: data.uri })
        }
    };

    facesDetected = ({ faces }) => {
        console.log("face detected", faces)
        this.setState({ 
            faces, 
            isFaceDetected: true, 
            textFaceDetect: "Face Detected!"
            // maskWidth: faces[0].bounds.size.width,
            // maskHeight: faces[0].bounds.size.height + 100,
            
        })
    };


    render() {
        const { canDetectFaces } = this.state;
        return (
            <View style={styles.container}>
                <Text>Face detection</Text> 
                <RNCamera
                    ref={ref => {
                    this.camera = ref;
                    }}
                    style={{
                    flex: 1,
                    }}
                    type={this.state.type}
                    flashMode={this.state.flash}
                    autoFocus={this.state.autoFocus}
                    zoom={this.state.zoom}
                    whiteBalance={this.state.whiteBalance}
                    ratio={this.state.ratio}
                    focusDepth={this.state.depth}
                    trackingEnabled
                    androidCameraPermissionOptions={{
                    title: 'Permission to use camera',
                    message: 'We need your permission to use your camera',
                    buttonPositive: 'Ok',
                    buttonNegative: 'Cancel',
                    }}
                    faceDetectionLandmarks={
                    RNCamera.Constants.FaceDetection.Landmarks
                        ? RNCamera.Constants.FaceDetection.Landmarks.all
                        : undefined
                    }
                    faceDetectionClassifications={
                    RNCamera.Constants.FaceDetection.Classifications
                        ? RNCamera.Constants.FaceDetection.Classifications.all
                        : undefined
                    }
                    onFacesDetected={canDetectFaces ? this.facesDetected : null}
                >
                    
                    
                <View style={styles.facesContainer} pointerEvents="none">
                    <Image source={facemask} style={{
                        width: 180,
                        height: 360,
                        marginTop: 50
                        }}
                        resizeMode="contain"    
                    />
                </View>
              
                
                <View
                  style={{
                      flex: 0.1,
                      backgroundColor: 'transparent',
                      flexDirection: 'row',
                      alignSelf: 'center',
                      bottom: 30,
                      // position: 'absolute',
                      // width: "100%"
                  }}
                >
                    <TouchableOpacity
                        style={[styles.flipButton, styles.picButton, { flex: 0.3, alignSelf: 'flex-end' }]}
                        onPress={this.takePicture.bind(this)}
                    >
                        <Text style={styles.flipText}> SNAP </Text>
                    </TouchableOpacity>
                    {this.state.imgPath && <TouchableOpacity
                        style={[styles.flipButton, styles.picButton, { flex: 0.3, alignSelf: 'flex-end' }]}
                        onPress={() => this.props.navigation.navigate('FaceMarker', { imageUrl: this.state.imgPath })}
                    >
                        <Text style={styles.flipText}> DONE </Text>
                    </TouchableOpacity>}
                </View>

                {this.state.imgPath && 
                    <Image source={{ uri: this.state.imgPath }} style={{width: 100, height: 100}} />
                }
                
                </RNCamera>
                
            </View>
        )
    }
}



const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 10,
      backgroundColor: '#000',
    },
    flipButton: {
      flex: 0.3,
      height: 40,
      marginHorizontal: 2,
      marginBottom: 10,
      marginTop: 10,
      borderRadius: 8,
      borderColor: 'white',
      borderWidth: 1,
      padding: 5,
      alignItems: 'center',
      justifyContent: 'center',
    },
    flipText: {
      color: 'white',
      fontSize: 15,
    },
    zoomText: {
      position: 'absolute',
      bottom: 70,
      zIndex: 2,
      left: 2,
    },
    picButton: {
      backgroundColor: 'darkseagreen',
    },
    facesContainer: {
      // position: 'absolute',
      flex: 1,
      flexDirection: "row",
      justifyContent: 'center'
      // bottom: 0,
      // right: 0,
      // left: 0,
      // top: 0,
    },
    face: {
      padding: 10,
      borderWidth: 2,
      borderRadius: 2,
      position: 'absolute',
      borderColor: '#FFD700',
      justifyContent: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    landmark: {
      width: 100,
      height: 100,
      position: 'absolute',
      backgroundColor: 'red',
    },
    faceText: {
      color: '#FFD700',
      fontWeight: 'bold',
      textAlign: 'center',
      margin: 10,
      backgroundColor: 'transparent',
    },
    text: {
      padding: 10,
      borderWidth: 2,
      borderRadius: 2,
      position: 'absolute',
      borderColor: '#F00',
      justifyContent: 'center',
    },
    textBlock: {
      color: '#F00',
      position: 'absolute',
      textAlign: 'center',
      backgroundColor: 'transparent',
    },
  });