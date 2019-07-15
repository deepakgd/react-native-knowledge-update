import React, { Component } from 'react';
import {View, ImageBackground, Text, Image} from 'react-native';
import Draggable from '../Components/Draggable';
import { Button } from 'react-native-elements';
import Canvas, {Image as CanvasImage, Path2D, ImageData}  from 'react-native-canvas';

export default class DragglePoc extends Component {

    constructor(props){
        super(props) 

        this.line1 = React.createRef();
        this.line2 = React.createRef();
        this.state = {
            line1_x: 100,
            line1_y: 20,
            line1_dummy_x: 100,
            line1_dummy_y: 20,
            line1_offsetX: null, 
            line1_offsetY: null, 
            line1_reverse: false,
            line2_x: 20,
            line2_y: 20,
            line2_dummy_x: 100,
            line2_dummy_y: 20,
            line2_offsetX: null, 
            line2_offsetY: null, 
            line2_visible: false,
            line2_reverse: false,
            line3_x: 20,
            line3_y: 20,
            line3_dummy_x: 100,
            line3_dummy_y: 20,
            line3_offsetX: null, 
            line3_offsetY: null, 
            line3_reverse: true,
            line4_x: 20,
            line4_y: 20,
            line4_dummy_x: 100,
            line4_dummy_y: 20,
            line4_offsetX: null, 
            line4_offsetY: null, 
            line4_reverse: true,
            line5_x: 20,
            line5_y: 20,
            line5_dummy_x: 100,
            line5_dummy_y: 20,
            line5_offsetX: null, 
            line5_offsetY: null, 
            line5_reverse: true,
            line6_x: 20,
            line6_y: 20,
            line6_dummy_x: 100,
            line6_dummy_y: 20,
            line6_offsetX: null, 
            line6_offsetY: null, 
            line6_reverse: true,
            other_lines_visible: false
        }

        console.log(this.state.line1_reverse)
    } 

    done(name){
        // console.log("invoked")
        
        // this.setState({ line2_visible: true })
        // this.line2.current.reversePosition();
        if(this.state[`${name}_reverse`]){
            // alert(`inside ${name}_x - ${this.state[`${name}_x`]} - ${this.state[`${name}_y`]}`)
            console.log("reverse position", this.state)
            this[name].current.reversePosition(this.state[`${name}_x`], this.state[`${name}_y`], this.state[`${name}_offsetX`], this.state[`${name}_offsetY`]);
            return;
        } 

        let newdata = this[name].current.getPosition();
        console.log(name, newdata)

        let newvalue = {  [`${name}_x`]: newdata.x - this.state[`${name}_dummy_x`], [`${name}_y`]: newdata.y - this.state[`${name}_dummy_y`], [`${name}_offsetX`]: newdata.offsetX,  [`${name}_offsetY`]: newdata.offsetY }
        console.log("save", newvalue) 
        this.setState(newvalue)
          
    
    }

    confirm(current, next){
        console.log("confirmation"); 
        
        if(current === "line1"){
            let conf = { [`${next}_visible`]: true, [`${current}_reverse`]: true };
            this.setState(conf);
        }

        if(current === "line2"){
            let line1 = this.line1.current.getPosition();
            let line2 = this.line2.current.getPosition();
            let distance = line2.x - line1.x
            let line3_dummy_x = line2.x + distance;
            let line4_dummy_x = line3_dummy_x + distance;
            let line5_dummy_x = line4_dummy_x + distance;
            let line6_dummy_x = line1.x - distance;

            this.setState({ 
                other_lines_visible: true, 
                [`${current}_reverse`]: true,
                line3_dummy_x: line3_dummy_x,
                line4_dummy_x: line4_dummy_x,
                line5_dummy_x: line5_dummy_x,
                line6_dummy_x: line6_dummy_x
            });
        }

    }


    handleImageRect(canvas) {
        const image = new CanvasImage(canvas);
        canvas.width = 100;
        canvas.height = 100;

        let position = this.line1.current.getPosition();


        const context = canvas.getContext('2d');

        image.src = 'https://upload.wikimedia.org/wikipedia/commons/6/63/Biho_Takashi._Bat_Before_the_Moon%2C_ca._1910.jpg';
        image.addEventListener('load', () => {
            context.drawImage(image, 0, 0, 100, 100);
        });
    }

    render() {
        return (
            <View >
                {/* <Draggable renderSize={56} renderColor='black' offsetX={-100} offsetY={-200} renderText='A' pressDrag={()=>alert('touched!!')}/>  */}
                {/* <Draggable reverse={false} renderColor='red' renderShape='square' offsetX={0} offsetY={0} renderText='B'/> */}
                {/* <Draggable/> */}
                {/* <Draggable/> */}
                <Image source={require("../img/face-test.jpeg")} style={{width: 300, height: 300, marginHorizontal: 25, marginVertical: 25}} />
                    
                <Draggable 
                    renderShape='image' 
                    imageSource={require('../img/linev3.png')} 
                    width={20}
                    height={300}
                    pressDragRelease={this.done.bind(this, "line1")}
                    ref={this.line1}
                    reverse={this.state.line1_reverse} 
                    x={this.state.line1_dummy_x} 
                    y={this.state.line1_dummy_y} 
                    offsetX={this.state.line1_offsetX}
                    offsetY={this.state.line1_offsetY}
                /> 

                {/* <Canvas ref={this.handleImageData} /> */}
                
                {this.state.line2_visible && 
                    <Draggable 
                            renderShape='image' 
                            imageSource={require('../img/linev3.png')} 
                            width={20}
                            height={300}
                            pressDragRelease={this.done.bind(this, "line2")}
                            ref={this.line2}
                            reverse={this.state.line2_reverse} 
                            x={this.state.line2_dummy_x} 
                            y={this.state.line2_dummy_y} 
                            offsetX={this.state.line2_offsetX}
                            offsetY={this.state.line2_offsetY}
                    />
                }


                {this.state.other_lines_visible && 
                    <Draggable 
                            renderShape='image' 
                            imageSource={require('../img/linev3.png')} 
                            width={20}
                            height={300}
                            ref={this.line3}
                            reverse={this.state.line3_reverse} 
                            x={this.state.line3_dummy_x} 
                            y={this.state.line3_dummy_y} 
                            offsetX={this.state.line3_offsetX}
                            offsetY={this.state.line3_offsetY}
                    />
                }


                {this.state.other_lines_visible && 
                    <Draggable 
                            renderShape='image' 
                            imageSource={require('../img/linev3.png')} 
                            width={20}
                            height={300}
                            ref={this.line4}
                            reverse={this.state.line4_reverse} 
                            x={this.state.line4_dummy_x} 
                            y={this.state.line4_dummy_y} 
                            offsetX={this.state.line4_offsetX}
                            offsetY={this.state.line4_offsetY}
                    />
                }


                {this.state.other_lines_visible && 
                    <Draggable 
                            renderShape='image' 
                            imageSource={require('../img/linev3.png')} 
                            width={20}
                            height={300}
                            ref={this.line5}
                            reverse={this.state.line5_reverse} 
                            x={this.state.line5_dummy_x} 
                            y={this.state.line5_dummy_y} 
                            offsetX={this.state.line5_offsetX}
                            offsetY={this.state.line5_offsetY}
                    />
                }  


                 {this.state.other_lines_visible && 
                    <Draggable 
                            renderShape='image' 
                            imageSource={require('../img/linev3.png')} 
                            width={20}
                            height={300}
                            ref={this.line6}
                            reverse={this.state.line6_reverse} 
                            x={this.state.line6_dummy_x} 
                            y={this.state.line6_dummy_y} 
                            offsetX={this.state.line6_offsetX}
                            offsetY={this.state.line6_offsetY}
                    />
                }   



                

                {!this.state.line2_visible && 
                    <Button 
                        title="Confirm"
                        onPress={this.confirm.bind(this, "line1", "line2")}
                    />
                }  

                {this.state.line2_visible &&  !this.state.other_lines_visible && 
                    <Button 
                        title="Confirm"
                        onPress={this.confirm.bind(this, "line2", "line3")}
                    />
                }
            </View>
        
        // <Text>Inside</Text>
        )
    }
}
