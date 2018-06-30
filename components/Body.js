import React, { Component } from 'react';

import { StyleSheet, View, Text } from 'react-native';

import {
  ViroARScene,
  ViroText,
  ViroConstants,
  ViroBox,
  ViroMaterials,
  ViroAmbientLight,
  Viro3DObject,
  ViroNode,
  ViroImage,
  ViroARPlaneSelector,
  ViroOrbitCamera,
  ViroSpotLight,
  ViroQuad,
  ViroSurface,
  ViroOmniLight
} from 'react-viro';

export default class Body extends Component {
  constructor() {
    super();
    this.state = {
      scale: [.1, .1, .1],
      rotation: [0, 0, 0],
      clickFlag: 0
    };

    // this._onInitialized = this._onInitialized.bind(this);
  }

  render() {
    ViroMaterials.createMaterials({
      dress_flower: {
        lightingModel: "Constant",
        normalTexture: require('../js/assets/apron/apron_normal.png'),
        diffuseTexture: require('../js/assets/apron/apron_color.png'),
        specularTexture: require('../js/assets/apron/apron_low_feb_body_backup_lambert5SG_SpecularSmoothness.png'),
      },
    });
    return (
      
        <Viro3DObject
          ref={this._setARNodeRef}
          source={require('../js/assets/apron_low.obj')}
          onDrag={() => {
            this.setState({
              clickFlag: 0
            })
          }}
          rotation={this.state.rotation}
          onRotate={this._onRotate}
          onPinch={this._onPinch}
          position={[0, 0, -10]}
          scale={this.state.scale}
          materials={["dress_flower"]}
          type="OBJ" />
    )
  }

  _setARNodeRef = (component) => {
    this.arNodeRef = component;
  }

  _onPinch = (pinchState, scaleFactor, source) => {
    let newScale = this.state.scale.map(scale => {
      return scale * scaleFactor
    })

    // console.log(newScale)
    if (pinchState == 3) {
      this.setState({
        scale: newScale
      })
      return;
    }
    this.arNodeRef.setNativeProps({ scale: newScale })
  }

  _onRotate = (rotateState, rotationFactor, source) => {
    console.log('rotationFactor :', rotationFactor);
    if (rotateState == 3) {
      this.setState({
        rotation: [this.state.rotation[0], this.state.rotation[1] + rotationFactor, this.state.rotation[2]]
      })
      return;
    }

    this.arNodeRef.setNativeProps({ rotation: [this.state.rotation[0], this.state.rotation[1] + rotationFactor, this.state.rotation[2]] });
  }

  _onClick = () => {
    this.setState({
      clickFlag: this.state.clickFlag + 1
    })
    if (this.state.clickFlag === 2) {
      Alert.alert(
        'Alert Title',
        'My Alert Msg',
        [
          { text: 'Ask me later', onPress: () => console.log('Ask me later pressed') },
          { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ],
        { cancelable: false }
      )
      this.setState({
        clickFlag: 0
      })
    }
  }
}
