/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  row: {
    flexDirection: 'row'
  },
  square: {
    padding: 29,
    margin: 1,
    backgroundColor: 'green',
    borderColor: 'darkgray'
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20
  }
});

export default class TicTacToe extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Game />
      </View>
    );
  }
}


class Board extends Component {

  render() {
    return (
      <View>
        <View style={styles.row}>
          <TouchableOpacity style={styles.square} onPress={() => this.props.onPress(0)}>
            <Text style={styles.text}>{String(this.props.squares[0])}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.square} onPress={() => this.props.onPress(1)}>
            <Text style={styles.text}>{String(this.props.squares[1])}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.square} onPress={() => this.props.onPress(2)}>
            <Text style={styles.text}>{String(this.props.squares[2])}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity style={styles.square} onPress={() => this.props.onPress(3)}>
            <Text style={styles.text}>{String(this.props.squares[3])}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.square} onPress={() => this.props.onPress(4)}>
            <Text style={styles.text}>{String(this.props.squares[4])}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.square} onPress={() => this.props.onPress(5)}>
            <Text style={styles.text}>{String(this.props.squares[5])}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity style={styles.square} onPress={() => this.props.onPress(6)}>
            <Text style={styles.text}>{String(this.props.squares[6])}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.square} onPress={() => this.props.onPress(7)}>
            <Text style={styles.text}>{String(this.props.squares[7])}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.square} onPress={() => this.props.onPress(8)}>
            <Text style={styles.text}>{String(this.props.squares[8])}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill('')
        }
      ],
      stepNumber: 0,
      xIsNext: true
    };
  }

  handlePress(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <View>
        <Board
          squares={current.squares}
          onPress={i => this.handlePress(i)}
        />
        <Text>{status}</Text>
        <Button title="Reset" onPress={ () => this.jumpTo(0)} />
      </View>
    );
  }
}

// ========================================

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

AppRegistry.registerComponent('TicTacToe', () => TicTacToe);
