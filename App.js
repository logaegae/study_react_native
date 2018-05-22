import React from 'react';
import { StyleSheet, Text, View, StatusBar, TextInput, Dimensions, Platform, ScrollView  } from 'react-native';
import Todo from './components/Todo';

const { height, width } = Dimensions.get("window");

export default class App extends React.Component {
  state = {
    newToDo : ""
  }

  __contorlNewToDo = text => {
    this.setState({
      newToDo : text
    })
  }

  render() {
    const { newToDo } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar barstyle="light-content" />
        <Text style={styles.title}>To Do List</Text>
        <View style={styles.card}>
          <TextInput 
            style={styles.input}
            underlineColorAndroid="transparent"
            placeholder={"New To Do"}
            value={newToDo}
            onChangeText={this.__contorlNewToDo}
            placeholderTextColor={"#999"}
          >
          </TextInput>
          <ScrollView>
            <Todo/>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'tomato',
    alignItems: 'center',
  },
  title: {
    color: "white",
    fontSize: 30,
    marginTop: 50,
    fontWeight: "200",
    marginBottom : 30
  },
  card: {
    flex : 1,
    backgroundColor : "white",
    width : width -25,
    borderTopLeftRadius : 10,
    borderTopRightRadius : 10,
    ...Platform.select({
      ios: {
        shadowColor : "rgb(50, 50, 50)",
        shadowOpacity : 0.5,
        shadowRadius : 5,
        shadowOffset : {
          height : -1,
          width : 1
        }
      },
      android: {
        elevation : 10
      },
    })
  },
  input : {
    padding : 20,
    borderBottomColor : '#BBB',
    borderBottomWidth : 1,
    fontSize : 25
  }
});
