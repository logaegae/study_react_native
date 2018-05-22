import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, TextInput } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import PropTypes from 'prop-types';

const { height, width } = Dimensions.get("window");

export default class Todo extends Component {

    constructor(prop){
        super(prop);
        this.state = {
            isEditing : false,
            isCompleted : false,
            toDoValue : this.props.text
        }
    }

    static propTypes = {
        text : PropTypes.string.isRequired,
        isCompleted : PropTypes.bool.isRequired,
        deleteToDo : PropTypes.func.isRequired,
        id : PropTypes.string.isRequired,
        uncompleteToDo : PropTypes.func.isRequired,
        completeToDo : PropTypes.func.isRequired,
        updateToDo : PropTypes.func.isRequired
    }

    __toggleComplete = () => {
        const { isCompleted, completeToDo, uncompleteToDo, id } = this.props;
        if(isCompleted) {
            uncompleteToDo(id);
        }else{
            completeToDo(id);
        }
    }

    __startEditing = () => {
        this.setState({
            isEditing : true
        });
    }

    __finishEditing = () => {
        const { toDoValue } = this.state;
        const { id, updateToDo } = this.props;
        updateToDo(id, toDoValue);
        this.setState({isEditing : false});
    }

    __controllInput = (text) => {
        this.setState({
            toDoValue : text
        })
    }
    
    render() {
        const { isEditing, toDoValue } = this.state;
        const { text, id, deleteToDo, isCompleted } = this.props
        return (
            <View style={styles.container}>
                <View style={styles.column}>
                <TouchableOpacity onPressOut={this.__toggleComplete}>
                    <View style={[styles.circle, isCompleted ? styles.completedCircle : styles.uncompletedCircle]}></View>
                </TouchableOpacity>
                {isEditing ? (
                    <TextInput 
                        style={[styles.text, styles.input, isCompleted ? styles.completedText : styles.uncompletedText]} value={toDoValue}
                        multiline={true} 
                        onChangeText={this.__controllInput}
                        returnKeyType={"done"}
                        onBlur={this.__finishEditing}
                    />
                ) : 
                (<Text style={[styles.text, isCompleted ? styles.completedText : styles.uncompletedText]}>
                    {text}
                </Text>)}
                </View>
                { isEditing ? (
                    <View style={styles.action}>
                        <TouchableOpacity onPressOut={this.__finishEditing}>
                            <View style={styles.actionsContainer}>
                                <FontAwesome name="check" size={32} color="#353535"/>
                            </View>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View style={styles.action}>
                        <TouchableOpacity onPressOut={this.__startEditing}>
                            <View style={styles.actionsContainer}>
                                <FontAwesome name="pencil" size={25} color="#353535"/>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPressOut={()=>{deleteToDo(id)}}>
                            <View style={styles.actionsContainer}>
                                <FontAwesome name="close" size={25} color="#353535"/>
                            </View>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container : {
        width : width - 50,
        borderBottomColor : "#BBB",
        borderBottomWidth : StyleSheet.hairlineWidth,
        flexDirection : "row",
        alignItems : "center",
        justifyContent: "space-between",
    },
    circle : {
        width : 30,
        height : 30,
        borderRadius: 15,
        borderWidth: 3,
        marginRight : 20
    },
    text : {
        fontWeight: "600",
        fontSize: 20,
        marginVertical: 20,
    },
    completedCircle : {
        borderColor : "gray",
    },
    uncompletedCircle : {
        borderColor : "tomato",
    },
    completedText : {
        color : "gray",
        textDecorationLine : "line-through"
    },
    uncompletedText : {
        color : "#353535"
    },
    column : {
        flexDirection: 'row',
        alignItems : 'center',
        width : width / 2
    },
    action : {
        flexDirection : "row"
    },
    actionsContainer : {
        marginVertical : 10,
        marginHorizontal : 10
    },
    input : {
        marginVertical : 15,
        paddingBottom : 5,
        width : width / 2
    }
});