// Create services to handle userCredential related operations from Google Firebase
// It should be able to handle userCredential login, userCredential logout, userCredential registration, userCredential profile update, etc.
// It should be made for Vue framework

// Import firebase from @firebase
import firestore, {CollectionReference} from '@firebase/firestore';
import {collection, doc, getDoc, getDocs, getFirestore, setDoc, updateDoc} from 'firebase/firestore';
import {User} from "@/data/user";
import {firebaseApp} from "@/firebase";
import Firestore = firestore.Firestore;
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword} from "firebase/auth";
import router from "@/router";
import {Store, useStore} from "vuex";
/*import aes from 'crypto-js/aes';
import sha256 from 'crypto-js/sha256';
import utf8 from 'crypto-js/enc-utf8';*/

export class UserServices {

    private static readonly firestore: Firestore = getFirestore(firebaseApp);
    private static collection: CollectionReference = collection(this.firestore, 'users');


    /**
     * Gets a userCredential from the database
     * @param id The id of the userCredential
     */
    public static async getUserAsync(id: string): Promise<User> {
        const userDoc = await getDoc(doc(this.collection, id));
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const user: User = userDoc.data() satisfies User;
        user.id = userDoc.id
        return user;
    }


    /**
     * Logs in a userCredential
     * @param store The store to commit the userCredential to
     * @param email The email of the userCredential
     * @param password The password of the userCredential
     */
    public static async loginUserAsync(store: Store<any>, email: string, password: string): Promise<User> {

        const userCredential = await signInWithEmailAndPassword(getAuth(firebaseApp), email, password)
        const user = userCredential.user;

        // Get the data info from the firestore
        const userDoc = await getDoc(doc(this.collection, user.uid));
        console.log("The user get from firestore is: ", userDoc.data(), user.uid)
        let userObj: User;

        if(userDoc.exists()) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            userObj = userDoc.data() satisfies User;
            userObj.id = userDoc.id
            userObj.email = user.email || email
        } else {
            userObj = new User(user.uid, "", email)
            await this.updateUserAsync(userObj)
        }

        store.commit('setUserCredential', userCredential.user)
        store.commit('setUser', userObj)
        return userObj
    }


    /**
     * Creates a new userCredential in the database
     * @param store The store to commit the userCredential to
     * @param email The email of the userCredential
     * @param password The password of the userCredential
     * @param username The username of the userCredential
     */
    public static async createUserAsync(store: Store<any>, email: string, password: string, username: string|null = null): Promise<User> {
        const userCredential = await createUserWithEmailAndPassword(getAuth(firebaseApp), email, password)
        const user = userCredential.user;
        useStore()

        const userObj = new User(user.uid, username || "", email)

        if(username != null) {
            // Save the username in the database
            await this.updateUserAsync(userObj)
        }

        store.commit('setUserCredential', user)
        store.commit('setUser', userObj)

        return userObj
    }


    /**
     * Updates a userCredential in the database
     * @param user The userCredential to update
     */
    public static async updateUserAsync(user: User): Promise<void> {
        await updateDoc(doc(this.collection, user.id), {
            username: user.username,
            center_id: user.center_id
        }).catch((error) => {
            console.error(error)
            // If the error is that the userCredential does not exist, create the userCredential
            if(error.code == "not-found") {
                const userDoc = doc(this.collection, user.id)
                setDoc(userDoc, user.getCleanDataObject())
            }
        })
    }

}

