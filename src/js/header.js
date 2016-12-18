/**
 * In this file, we create a React component
 * which incorporates components provided by Material-UI.
 */
import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Toggle from 'material-ui/Toggle';
import {deepOrange500} from 'material-ui/styles/colors';

function goHome() {
  window.location.href = 'https://weyts.xyz/viralengine';
}

function openDrawer() {

}

const styles = {
  title: {
    cursor: 'pointer',
  }
};

const AppBarHeader = () => (
  <AppBar
    title={<span style={styles.title}>Viralengine</span>}
    onLeftIconButtonTouchTap={openDrawer}
    onTitleTouchTap={goHome}
    iconClassNameRight="muidocs-icon-navigation-expand-more"
  />
);

export default AppBarHeader;