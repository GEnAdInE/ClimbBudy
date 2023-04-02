// Create services to handle user related operations from Google Firebase
// It should be able to handle user login, user logout, user registration, user profile update, etc.
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
     * Gets a user from the database
     * @param id The id of the user
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
     * Logs in a user
     * @param store The store to commit the user to
     * @param email The email of the user
     * @param password The password of the user
     */
    public static async loginOrRegisterUserAsync(store: Store<any>, email: string, password: string): Promise<User> {

        const userCredential = await signInWithEmailAndPassword(getAuth(firebaseApp), email, password)
        const user = userCredential.user;

        store.commit('setUser', userCredential.user)
        return new User(userCredential.user.uid, "", email, "")
    }


    /**
     * Creates a new user in the database
     * @param store The store to commit the user to
     * @param email The email of the user
     * @param password The password of the user
     * @param username The username of the user
     */
    public static async createUserAsync(store: Store<any>, email: string, password: string, username: string|null = null): Promise<User> {
        const userCredential = await createUserWithEmailAndPassword(getAuth(firebaseApp), email, password)
        const user = userCredential.user;
        useStore()
        store.commit('setUser', user)

        const userObj = new User(user.uid, username || "", email, "")

        if(username != null) {
            // Save the username in the database
            await this.updateUserAsync(userObj)
        }

        return userObj

    }


    /**
     * Updates a user in the database
     * @param user The user to update
     */
    public static async updateUserAsync(user: User): Promise<void> {
        await updateDoc(doc(this.collection, user.id), {
            username: user.username,
            center_id: user.center_id
        }).catch((error) => {
            console.error(error)
            // If the error is that the user does not exist, create the user
            if(error.code == "not-found") {
                const userDoc = doc(this.collection, user.id)
                setDoc(userDoc, {
                    username: user.username,
                    center_id: user.center_id
                })
            }
        })
    }

}

