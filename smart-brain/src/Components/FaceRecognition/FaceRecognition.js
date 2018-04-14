import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, box }) => {
    return(
        <div className={'center ma'}>
            <div className={'absolute mt2'}>
                <img id='input_image' style={{marginTop: '2px'}} src={imageUrl} alt={''} width={'500px'} height={'auto'}/>
                <div className={'bounding-box'}
                     style={{top: box.topRow, right: box.rightCol, left: box.leftCol, bottom: box.bottomRow}}>
                </div>
            </div>
        </div>
    );
};

export default FaceRecognition;