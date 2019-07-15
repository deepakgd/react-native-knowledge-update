import React, {Fragment} from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from "react-native";
import {
  bgDrawerHeader,
  drawerLogoColor,
  drawerInactiveItemColor,
  bgDrawerInactiveItem,
  bgDrawerActiveItem, 
  drawerHeaderColor
} from "../global.styles";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { navigateTo } from "../Redux/actions"; 

const DrawerContent = ({ navigateTo, activeRoute, routes, closeDrawer }) => (
  <ScrollView>
    <View style={styles.header}>
      <View style={styles.headerLogo}>
        <Icon name="book" size={50} color={drawerLogoColor} />
      </View>
      <View style={styles.subTitle}>
        <Text style={styles.drawerTitle}>POC app</Text>
        <Text style={styles.drawerEmail}>deepakgcsevpm@gmail.com</Text>
      </View>
    </View>
    {routes.map((route, index) => (
      <Fragment key={"menu_"+index}>
        {/* isDrawerDisabled only false/undefined data will be rendered here */}
        {!route.isDrawerDisabled && 
        
          <TouchableOpacity
            key={index+"_"+route.screen}
            onPress={() => {
              closeDrawer();
              navigateTo(route.name);
            }}
            style={
              activeRoute.name === route.name
                ? [styles.drawerItem, styles.activeDrawerItem]
                : styles.drawerItem
            }
          >
            {route.icon && (
              <View style={styles.drawerItemLogo}>
                <Icon
                  name={route.icon}
                  size={30}
                  color={activeRoute.name === route.name ? "#fff" : "#000"}
                />
              </View>
            )}
            <Text
              style={
                activeRoute.name === route.name
                  ? { color: "#fff" }
                  : { color: "#000" }
              }
            >
              {route.name}
            </Text>
          </TouchableOpacity>
        }
        
        </Fragment>
    ))}
  </ScrollView>
);

DrawerContent.propTypes = {
  activeRoute: PropTypes.shape({
    name: PropTypes.string.isRequired,
    screen: PropTypes.any.isRequired,
    icon: PropTypes.string.isRequired
  }).isRequired,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
  navigateTo: PropTypes.func.isRequired,
  closeDrawer: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "column",
    paddingTop: 40, // 24dp (Space for the translucent StatusBar) plus 16dp Android Header paddingTop
    paddingLeft: 16,
    height: 170,
    backgroundColor: bgDrawerHeader
  },
  headerLogo: {
    width: 64,
    height: 64,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 32,
    overflow: "hidden",
    backgroundColor: "#fff"
  },
  subTitle: {
    height: 56,
    paddingTop: 8
  },
  drawerTitle: {
    color: drawerHeaderColor,
    fontFamily: "Roboto",
    fontWeight: "500",
    fontSize: 14
  },
  drawerEmail: {
    color: drawerHeaderColor,
    fontFamily: "Roboto",
    fontWeight: "400",
    fontSize: 14
  },
  activeDrawerItem: {
    backgroundColor: bgDrawerActiveItem
  },
  drawerItem: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: bgDrawerInactiveItem,
    color: drawerInactiveItemColor,
    height: 50,
    paddingLeft: 16,
    borderBottomWidth: 2,
    borderBottomColor: "#fff"
  },
  drawerItemLogo: {
    paddingRight: 16
  }
});

const mapStateToProps = (state, ownProps) => ({
  routes: state.routes.routes,
  activeRoute: state.routes.activeRoute,
  closeDrawer: ownProps.closeDrawer,
});

const mapDispatchToProps = dispatch => ({
  navigateTo: routeName => {
    dispatch(navigateTo(routeName));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DrawerContent);
