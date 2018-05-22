import React from 'react';
import { StyleSheet, Text, View, StatusBar, TextInput, Dimensions, Platform, ScrollView, AsyncStorage  } from 'react-native';
import Todo from './components/Todo';
import { AppLoading } from 'expo';
import uuidv1 from 'uuid/v1';

const { height, width } = Dimensions.get("window");

export default class App extends React.Component {
  state = {
    newToDo : "",
    toDos : {},
    loadedToDos : false
  }

  componentDidMount(){
    this.__loadToDos();
  }

  __contorlNewToDo = text => {
    this.setState({
      newToDo : text
    })
  }

  __loadToDos = async () => {
    try {
      const toDos = await AsyncStorage.getItem("toDos");
      const parsedToDos = JSON.parse(toDos);
      this.setState({
        loadedToDos : true,
        toDos : parsedToDos || {}
      });
    }catch(e){
      alert(e);
    }
  }

  __addToDo = () => {
    const { newToDo } = this.state;
    if(newToDo !== ""){
      this.setState(prevState => {
        const ID = uuidv1();
        const newToDoObj = {
          [ID] : {
            id : ID,
            isCompleted : false,
            text : newToDo,
            createAt : Date.now()
          }
        }
        const newState = {
          ...prevState,
          newToDo : "",
          toDos : {
            ...prevState.toDos,
            ...newToDoObj
          }
        }
        this.__saveToDos(newState.toDos);
        return {...newState};
      })
    }
  }

  __deleteToDo = (id) => {
      this.setState(prevState => {
        const toDos = prevState.toDos;
        delete toDos[id];
        const newState = {
            ...prevState,
            toDos
        };
        this.__saveToDos(newState.toDos);
        return {...newState}
    })
  }

  __uncompleteToDo = (id) => {
    this.setState(prevState => {
      const newState = {
        ...prevState,
        toDos : {
          ...prevState.toDos,
          [id] : {
            ...prevState.toDos[id],
            isCompleted: false
          }
        }
      };
      this.__saveToDos(newState.toDos);
      return {...newState};
    });
  }

  __completeToDo = (id) => {
    this.setState(prevState => {
      const newState = {
        ...prevState,
        toDos : {
          ...prevState.toDos,
          [id] : {
            ...prevState.toDos[id],
            isCompleted: true
          }
        }
      };
      this.__saveToDos(newState.toDos);
      return {...newState};
    });
  }

  __updateToDo = (id, text) => {
    this.setState(prevState => {
      const newState = {
        ...prevState,
        toDos : {
          ...prevState.toDos,
          [id] : {
            ...prevState.toDos[id],
            text
          }
        }
      }
      this.__saveToDos(newState.toDos);
      return {...newState};
    });
  }

  __saveToDos = (newToDos) => {
    const saveToDos = AsyncStorage.setItem("toDos", JSON.stringify(newToDos));
  }

  render() {
    const { newToDo, loadedToDos, toDos } = this.state;
    if(!loadedToDos){
      return <AppLoading/>;
    }
    return (
      <View style={styles.container}>
        <StatusBar barstyle="light-content" />
        <Text style={styles.title}>To Do List</Text>
        <View style={styles.card}>
          <TextInput 
            style={styles.input}
            underlineColorAndroid="transparent"
            placeholder={"New To Do"}
            placeholderTextColor={"#999"}
            value={newToDo}
            onChangeText={this.__contorlNewToDo}
            onSubmitEditing={this.__addToDo}
          >
          </TextInput>
          <ScrollView contentContainerStyle={styles.toDos}>
            {Object.values(toDos).reverse().map(toDo => 
              <Todo
                key={toDo.id}
                {...toDo}
                deleteToDo={this.__deleteToDo}
                uncompleteToDo={this.__uncompleteToDo}
                completeToDo={this.__completeToDo}
                updateToDo={this.__updateToDo}
              />)}
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
  },
  toDos : {
    alignItems : "center"
  }
});
