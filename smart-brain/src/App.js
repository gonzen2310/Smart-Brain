import React, { Component } from 'react';
import './App.css';

import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import Particles from 'react-particles-js';

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
            input: ''
        }
    }

    onInputChange = (event) => {
        console.log(event.target.value);
    };

    render() {
        return (
            <div className="App">
                <Particles className={'particles'} params={particlesOpt}/>
                <Navigation/>
                <Logo/>
                <Rank/>
                <ImageLinkForm onInputChange = {this.onInputChange}/>
                {/*<FaceRecognition/>*/}
            </div>
        );
    }
}

export default App;
