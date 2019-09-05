import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

export default class Calculator extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            calculations: null,
            result: null,
            isCalculated: false
        };
        this.keypads = [7,8,9,4,5,6,1,2,3,".",0,"="];
        this.operators = ["+", "-", "*", "/"]
        
        this.renderKeys = this.renderKeys.bind(this);
        this.deleteNumber = this.deleteNumber.bind(this);
        this.clearAll = this.clearAll.bind(this);
    }

    handleKeypad(value){
        console.log(value);
        if(this.state.isCalculated){
            if(this.operators.indexOf(value) >= 0){
                this.setState({
                    calculations: this.state.result + value,
                    isCalculated: false
                });
                return;
            }else if(value === "=") return;
            else return this.setState({ calculations: value, isCalculated: false });
        }

        if(value === "="){
            this.setState({ 
                result: eval(this.state.calculations).toString(),
                isCalculated: true 
            });
        } else {
            let content = this.state.calculations ? this.state.calculations.toString().split("") : [];

            if(content.length > 0 && this.operators.indexOf(content[content.length -1]) >= 0 && this.operators.indexOf(value) >= 0){
                content.splice(content.length - 1, 1);
                content = content.join("") + value;
                this.setState({ calculations: content });
            } else {
                this.setState((prevState) => {
                    return { calculations: (prevState.calculations ? prevState.calculations.toString(): "") + value }
                });
            }
            
        } 
    }

    deleteNumber(){
        let content = this.state.calculations ? this.state.calculations.toString().split("") : [];
        content.splice(content.length-1, 1);   
        content = content.join("");
        this.setState({ calculations: content });
    }

    clearAll(){
        this.setState({ calculations: null });
    }

    renderKeys(){
        return (
            <View style={styles.numbers}>
                {this.keypads.map((item, index)=>{ 
                    return (
                        <View style={styles.row} key={"keypad_"+index}>
                            <TouchableOpacity 
                                style={styles.button} 
                                onPress={()=>this.handleKeypad(item)}
                            >
                                <Text style={styles.item}>{item}</Text>
                            </TouchableOpacity>
                        </View>
                    )
                })}
            </View>
        );
    }

    render(){
        return (
            <View style={styles.container}>
                <View style={styles.calculations}>
                    <Text style={styles.operation} numberOfLines={1}>
                        {this.state.calculations}
                    </Text>
                </View>

                <View style={styles.result}>
                    <Text style={styles.calcResult}>{this.state.result}</Text>
                </View>

                <View style={styles.buttons}>

                    {this.renderKeys()}
                    
                    <View style={styles.operations}>
                        <View style={styles.column}>
                            <TouchableOpacity 
                                style={styles.operatorButton}
                                onPress={this.deleteNumber}
                                onLongPress={this.clearAll}    
                            >
                                <Text style={{ fontSize: 15, fontWeight: 'bold' }}>DEL</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.column}>
                            <TouchableOpacity 
                                style={styles.operatorButton}
                                onPress={()=>this.handleKeypad("/")}
                            >
                                <Text style={styles.item}>/</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.column}>
                            <TouchableOpacity 
                                style={styles.operatorButton}
                                onPress={()=>this.handleKeypad("*")}
                            >
                                <Text style={styles.item}>*</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.column}>
                            <TouchableOpacity
                                style={styles.operatorButton}
                                onPress={()=>this.handleKeypad("-")}
                            >
                                <Text style={styles.item}>-</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.column}>
                            <TouchableOpacity 
                                style={styles.operatorButton}
                                onPress={()=>this.handleKeypad("+")}
                            >
                                <Text style={styles.item}>+</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    calculations: {
        flex: 1,
        backgroundColor: 'white',
    },
    operation: {
        textAlign: 'right',
        top: '25%',
        fontSize: 25
    },
    result: {
        flex:1,
        backgroundColor: 'gray'
    },
    buttons: {
        flex: 7,
        flexDirection: 'row',
    },
    numbers: {
        flex: 8,
        flexDirection: 'row',
        // backgroundColor: 'green',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },
    operations: {
        flex: 2,
        backgroundColor: '#b7b5b5',
    },
    row: {
        width: "33.3333333%",
        height: "25.2%",
        // backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems:'center',
    },
    button: {
        backgroundColor: 'white',
        alignSelf: "stretch",
        height: "100%",
        alignItems: "center",
        justifyContent: "center"
    },
    column: {
        justifyContent: 'center',
        alignItems:'center',
        height: '20%'
    },
    operatorButton: {
        alignSelf: "stretch",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    item: {
        fontSize: 25
    },
    calcResult: {
        textAlign: 'right',
        top: '25%',
        fontSize: 25
    }
});