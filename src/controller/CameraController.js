import { Format } from './../util/Format'
import { CameraController } from './CameraController'

export class CameraController {
    constructor(videoEl) {
        this._videoEl = videoEl;
        
        navigator.mediaDevices.getUserMedia({
            video: true
        }).then((stream) => {
            this._stream = stream;
            this._videoEl.srcObject = new MediaStream(stream);
            this._videoEl.play();
        }).catch((err) => {
            console.error(err);
        })
    }

    stop(){
        this.stream.getTracks().forEach((track) => {
            track.stop();
        });
    }
}