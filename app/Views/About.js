import React from 'react';
import {
  View,
  ScrollView,
  Text,
  Linking,
  StyleSheet
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const About = () => (
  <ScrollView contentContainerStyle={styles.view}>
      <Text style={styles.h1}>About</Text>
      <Text style={[styles.text, styles.p]}>This is A to Z notes to store your todo or other important notes here.
      </Text>
      <Text style={[styles.text, styles.p]}>Thank you for using my application.</Text>
      <Text style={styles.signature}>Deepak Govindarajan</Text>
      <Text style={styles.position}>Lead Developer</Text>
      <View style={styles.social}>
        <Icon name="logo-linkedin" size={30} color="#2962FF" style={{marginRight: 10}} />
        <Text onPress={() =>
          Linking.openURL('https://www.linkedin.com/in/')}
          style={styles.link}
        >
          www.linkedin.com/in/
        </Text>
      </View>
      <View style={styles.social}>
        <Icon name="logo-github" size={30} color="#2962FF" style={{marginRight: 10}} />
        <Text onPress={() =>
          Linking.openURL('https://github.com/')}
          style={styles.link}
        >
          https://github.com/
        </Text>
      </View>
    </ScrollView>
);

const styles = StyleSheet.create({
  view: {
    marginTop: 20,
    padding: 20
  },
  h1: {
    fontSize: 22,
    alignSelf: 'center',
    marginBottom: 20
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 10
  },
  p: {
    textAlign: 'left',
    marginBottom: 20
  },
  linkCredits: {
    fontStyle: 'italic',
    color: '#2962FF'
  },
  social: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 10
  },
  signature: {
    fontSize: 16,
    marginBottom: 4,
  },
  position: {
    fontSize: 16,
    marginBottom: 10,
  },
  link: {
    fontSize: 16,
    color: '#2962FF'
  }
});

export default About;
