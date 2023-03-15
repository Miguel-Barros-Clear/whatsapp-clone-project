import { Firebase } from "../util/firebase";
import { ClassEvent } from "../util/ClassEvent";

export class User {
    constructor() {

    }

    static getRef(){
        return Firebase.db().collection('/users')
    }

    static findByEmail(email){
        return User.getRef().doc(email);
    }
}