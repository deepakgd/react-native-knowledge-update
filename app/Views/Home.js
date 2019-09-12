import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    ImageBackground,
    View
} from 'react-native';
import {Button} from 'react-native-elements';
import to from 'await-to-js';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { navigateTo } from '../Redux/actions';
import helper from '../utils/helper';
import { bgDrawerActiveItem } from '../global.styles';
const backgroundImage = require('../img/bg_travel.jpeg');
class Home extends React.Component{

  constructor(props){
    super(props)
  }

  componentDidMount(){
  }


  render(){
    const { activeRoute, navigateTo } = this.props
    return (
      <ImageBackground
        source={backgroundImage}
        style={styles.container}
        imageStyle={{ opacity: 0.3 }}
      >
        
        {/* <View style={styles.bottomView}>
                    <Button
                        title="Show all" 
                        buttonStyle={styles.buttonLeft}
                    />
                    <Button
                        title="Add"
                        buttonStyle={styles.buttonRight}
                    />
                </View> */}
      </ImageBackground>
    )
  }
}

Home.propTypes = {
  activeRoute: PropTypes.shape({
    name: PropTypes.string.isRequired,
    screen: PropTypes.any.isRequired,
    icon: PropTypes.string.isRequired,
  }).isRequired,
  navigateTo: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      resizeMode: 'cover',
      backgroundColor: '#ECEFF1',
    },
    view: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        paddingTop: 20,
        marginHorizontal: 22
    },
    buttonView: {
      width: 90, 
      height: 40,
      marginBottom:15,
      marginRight: 15
    },
    header1: {
        fontSize: 28,
        marginBottom: '30%',
    },
    text: {
        fontSize: 20,
        width: '70%',
        textAlign: 'center',
        lineHeight: 30,
        marginBottom: '10%',
    },
    atozButton: {
      backgroundColor: '#868e91'
    },
    bottomView: {
      flexDirection: 'row',
      width: '100%',  
      position: 'absolute',
      bottom: 0.5,
      marginHorizontal: 2
    }, 
    buttonLeft: {
        width: "90%",
        // marginLeft: 2,
        marginRight: -2, 
        backgroundColor: bgDrawerActiveItem
    }, 
    buttonRight: { 
        width: "97%", 
        backgroundColor: bgDrawerActiveItem,
        marginLeft: -17, 
        // marginRight: 1
    }
});

const mapStateToProps = state => ({
  activeRoute: state.routes.activeRoute,
});

const mapDispatchToProps = dispatch => ({
  navigateTo: routeName => { dispatch(navigateTo(routeName)); },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);