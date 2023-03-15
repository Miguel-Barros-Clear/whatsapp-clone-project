import { ClassEvent } from "../util/ClassEvent";

export class MicrophoneController extends ClassEvent {
    constructor() {
        super();

        this._available = false;
        this.__mimetype = 'audio/webm';

        navigator.mediaDevices.getUserMedia({
            audio: true
        }).then((stream) => {
            this._available = true;
            this._stream = stream;
            this.trigger('ready', stream);
        }).catch((err) => {
            console.error(err);
        })
    }

    isAvailable() {
        return this._available;
    }


    stop() {
        if (!this.isAvailable()) return null;
        this._stream.getTracks().forEach(track => {
            track.stop();
        });
    }

    startRecorder() {
        if (!this.isAvailable()) return null;
        this._mediaRecorder = new MediaRecorder(this._stream, {
            mimeType: this._mimetype
        });

        this._recordedChunks = [];
        this._mediaRecorder.addEventListener('dataavailable', (e) => {
            if (e.data.size > 0) this._recordedChunks.push(e.data);
        })

        this._mediaRecorder.addEventListener('stop', (e) => {
            let blob = new Blob(this._recordedChunks, {
                type: this.__mimetype
            })

            let fileName = `rec${Date.now()}.webm`;

            let file = new File([blob], fileName, {
                type: this.__mimetype,
                lastModified: Date.now()
            });
        })

        this._mediaRecorder.start();
    }

    stopRecorder() {
        if (!this.isAvailable()) return null;
        this._mediaRecorder.stop();
        this.stop();
    }
}