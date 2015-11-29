'use strict';

import React, {Component, PanResponder, Dimensions, StyleSheet, View, Image, Text, processColor} from 'react-native';

class Tile extends Component {
  constructor(props) {
    super(props);
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder,
      onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder,
      onPanResponderGrant: this._handlePanResponderGrant,
      onPanResponderMove: this._handlePanResponderMove,
      onPanResponderRelease: this._handlePanResponderEnd,
      onPanResponderTerminate: this._handlePanResponderEnd,
    });
    this._previousLeft = props.x;
    this._previousTop = props.y;
    this._circleStyles = {
      style: {
        left: this._previousLeft,
        top: this._previousTop
      }
    };
  }
  render() {
    var {width, height} = Dimensions.get('window');
    var {imageOffset, image} = this.props;
    return (
      <View
        ref={(circle) => {
          this.circle = circle;
        }}
        {...this._panResponder.panHandlers}
        style={[styles.view, this.props.style]}>
        <Image
          source={{uri: image}}
          style={[styles.image,
            {
              top: imageOffset.y,
              left: imageOffset.x,
              width: width,
              height: height
            }
          ]} />
      </View>
    )
  }

  _highlight = () => {
    this.circle.setNativeProps({
      style: {
        shadowColor: processColor('#000000'),
        shadowOffset: {width: 1, height: 1},
        shadowRadius: 5,
        shadowOpacity: 0.5
      }
    });
  }

  _unHighlight = () => {

  }

  _updatePosition = () => {
    this.circle && this.circle.setNativeProps(this._circleStyles);
  }

  _handleStartShouldSetPanResponder = (e, gestureState) => {
    // Should we become active when the user presses down on the circle?
    return true;
  }

  _handleMoveShouldSetPanResponder = (e, gestureState) => {
    // Should we become active when the user moves a touch over the circle?
    return true;
  }

  _handlePanResponderGrant = (e, gestureState) => {
    this._highlight();
  }
  _handlePanResponderMove = (e, gestureState) => {
    // this._circleStyles.style.left = this._previousLeft + gestureState.dx;
    this._circleStyles.style.top = this._previousTop + gestureState.dy;
    this._updatePosition();
  }
  _handlePanResponderEnd = (e, gestureState) => {
    this._unHighlight();
    // this._previousLeft += gestureState.dx;
    this._previousTop += gestureState.dy;
  }
}

const styles = StyleSheet.create({
  view: {
    overflow: 'hidden'
  },
  image: {
    position: 'absolute'
  }
})

export default Tile;
