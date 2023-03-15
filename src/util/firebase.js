const firebase = require('firebase');

require('firebase/firestore')

export class Firebase {
    constructor() {
        this._config = {
            apiKey: "AIzaSyBXtTMcVID7n_vlJVE1l0gjJ4fVVxSPSS4",
            authDomain: "whatsapp-clone-project-5dca0.firebaseapp.com",
            projectId: "whatsapp-clone-project-5dca0",
            storageBucket: "whatsapp-clone-project-5dca0.appspot.com",
            messagingSenderId: "662316627913",
            appId: "1:662316627913:web:c27401230d077ba2bdda18"
        };

        this.init();
    }

    init() {
        if (this._initialized) return null
        firebase.initializeApp(this._config);
        firebase.firestore().settings({
            timestampsInSnapshots: true
        })

        this._initialized = true;
    }

    static db(){
        return firebase.firestore();
    }

    static hd(){
        return firebase.storage();
    }
}