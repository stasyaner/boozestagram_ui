import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import Pica from 'pica';
import * as tf from '@tensorflow/tfjs';

class MainContainer extends Component {
  constructor(...restProps) {
    super(...restProps);

    const pica = new Pica();
    const IMAGE_SIZE = 2352; // 28 * 28 * 3
    const tmpImg = new Image();
    const tmpCv = document.createElement('canvas');
    tmpCv.width = 28;
    tmpCv.height = 28;

    this.state = {
      tmpImg,
      model: null,
    };

    tf.loadModel('http://localhost:8080/booz_model.json').then((model) => {
      this.state = Object.assign({}, this.state, { model });

      tmpImg.onload = () => {
        pica.resize(tmpImg, tmpCv).then((resCv) => {
          const imageData = resCv.getContext('2d')
            .getImageData(0, 0, resCv.width, resCv.height);
          const imageDataArr = new Float32Array(IMAGE_SIZE);

          let k = 0;
          let l = 0;
          for (let j = 0; j < imageData.data.length; j += 1) {
            if ((j > 0) && (j % (3 + k) === 0)) {
              k += 4;
            } else {
              imageDataArr[l] = imageData.data[j] / 255;
              l += 1;
            }
          }

          const xs = tf.tensor2d(imageDataArr, [1, IMAGE_SIZE]);

          tf.tidy(() => {
            const output = this.state.model.predict(xs.reshape([-1, 28, 28, 3]));

            const axis = 1;
            const predictions = Array.from(output.argMax(axis).dataSync());

            alert(predictions[0] === 1 ? 'wine' : 'beer');
          });
        });
      };
    });

    this.fileChangeHandler = this.fileChangeHandler.bind(this);
  }

  fileChangeHandler(event) {
    const input = event.target;
    const file = input.files[0];
    const { tmpImg } = this.state;

    if (!file.type.startsWith('image/')) {
      input.value = '';
    } else {
      tmpImg.src = URL.createObjectURL(file);
    }
  }

  render() {
    return (
      <div className="main-container">
        <div className="image-form">
          <input
            type="file"
            accept="image/*"
            onChange={this.fileChangeHandler}
          />
        </div>
      </div>
    );
  }
}

export default hot(module)(MainContainer);
