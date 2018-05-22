import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default class Todo extends Component {
    state = {
        isEditing : false
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>this is todo</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container : {}
});