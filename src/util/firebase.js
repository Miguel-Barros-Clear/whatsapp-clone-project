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
        if (window._initializedFirebase) return null
        firebase.initializeApp(this._config);
        firebase.firestore().settings({
            timestampsInSnapshots: true
        })

        window._initializedFirebase = true;
    }

    static db() {
        return firebase.firestore();
    }

    static hd() {
        return firebase.storage();
    }

    initAuth() {
        return new Promise((s, f) => {
            let provider = new firebase.auth.GoogleAuthProvider();

            firebase.auth().signInWithPopup(provider).then((res) => {
                let token = res.credential.accessToken;
                let user = res.user;
                s({
                    user,
                    token
                });
            }).catch((err) => {
                f(err)
            })
        })
    }
}