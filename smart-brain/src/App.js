import React, { Component } from 'react';
import './App.css';

import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';

// initialize with your api key. This will also work in your browser via http://browserify.org/
const app = new Clarifai.App({
    apiKey: 'e6b2a014ca7a42039725e46d4d1adbe9'
});


const particlesOpt = {
    particles: {
        number: {
            value: 30,
            density: {
                enable: true,
                value_area: 400
            },
            shadow: {
                enable: true,
                color: "#222",
                blur: 5
            }
        },
    }
};

class App extends Component {
    constructor() {
        super();
        this.state = {
            input: '',
            imageUrl: '',
            box: {}
        }
    };

    calculateFaceLocation = (data) => {
       const detectedFace = data.outputs[0].data.regions[0].region_info.bounding_box;
       const image = document.getElementById('input_image');
       const width = Number(image.width);
       const height = Number(image.height);
       return {
           leftCol: detectedFace.left_col * width,
           rightCol: width -  (detectedFace.right_col * width),
           topRow: detectedFace.top_row * height,
           bottomRow: height -  (detectedFace.bottom_row * height)
       }
    };

    displaceFaceBox = (box) => {
        console.log(box);
        this.setState ({box: box});
    };
    onInputChange = (event) => {
        this.setState({input: event.target.value});
    };

    onSubmit = () => {
        this.setState({imageUrl: this.state.input});
        app.models.predict(
            Clarifai.FACE_DETECT_MODEL,
            this.state.input)
            .then ((response) => this.displaceFaceBox(this.calculateFaceLocation(response)))
            .catch((err) => console.log(err));
    };

    render() {
        return (
            <div className="App">
                <Particles className={'particles'} params={particlesOpt}/>
                <Navigation/>
                <Logo/>
                <Rank/>
                <ImageLinkForm onInputChange = {this.onInputChange} onSubmit = {this.onSubmit}/>
                <FaceRecognition box = {this.state.box} imageUrl = {this.state.imageUrl}/>
            </div>
        );
    }
}

export default App;
