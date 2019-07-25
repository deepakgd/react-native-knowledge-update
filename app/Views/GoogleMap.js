import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default class GoogleMap extends Component{

    constructor(props){
        super(props)
        
    }


    getDelta(lat, lon, distance) {
        const oneDegreeOfLatitudeInMeters = 111.32 * 1000;
 
        const latitudeDelta =distance / oneDegreeOfLatitudeInMeters;
        const longitudeDelta = distance / (oneDegreeOfLatitudeInMeters * Math.cos(lat * (Math.PI / 180)));
 
        return {
            latitude: lat,
            longitude: lon,
            latitudeDelta,
            longitudeDelta,
        }
    }


    render(){
        const { latitude, longitude, latitudeDelta, longitudeDelta   } = this.getDelta(12.9816959,80.2499082, 1008)
        return (
            <View style={styles.container}>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude,
                        longitude,
                        latitudeDelta,
                        longitudeDelta,
                    }}
                >

                    <Marker
                        coordinate={{latitude, longitude}}
                        title="KRDS"
                        description="Software company"
                    />
                </MapView>
            </View>
        );
    }
};


const styles = StyleSheet.create({
    container: {
      position:'absolute',
      top:0,
      left:0,
      right:0,
      bottom:0,
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
    map: {
      position:'absolute',
      top:0,
      left:0,
      right:0,
      bottom:0,
    },
  });