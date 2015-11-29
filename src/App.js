/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * https://scontent-ord1-1.cdninstagram.com/hphotos-xat1/t51.2885-15/e35/12071219_1657202007888560_582702804_n.jpg
 */
'use strict';

import React, {Component, StyleSheet, View, Dimensions} from 'react-native';
import Tile from './Tile';

var img = 'https://scontent-ord1-1.cdninstagram.com/hphotos-xat1/t51.2885-15/e35/12071219_1657202007888560_582702804_n.jpg';

class PictureScramblerPuzzle extends Component {
  constructor() {
    super();
    var {width, height} = Dimensions.get('window');
    var w = width / 4;
    var h = height / 8;
    var tiles = [];
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 8; j++) {
        tiles.push((
          <Tile
            image={img}
            style={[styles.tile,{
              width: w,
              height: h,
              left: (i * w),
              top: (j * h)
            }]}
            x={i*w}
            y={j*h}
            imageOffset={{x: -(i * w), y: -(j * h)}}/>
        ));
      }
    }
    this.state = {tiles: tiles};
  }
  render() {
    return (
      <View style={styles.container}>
        {this.state.tiles}
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tile: {
    position: 'absolute',
    width: 100,
    height: 100
  }
});

export default PictureScramblerPuzzle;
