// Create services to handle user related operations from Google Firebase
// It should be able to handle user login, user logout, user registration, user profile update, etc.
// It should be made for Vue framework

// Import firebase from @firebase
import firebase from '@firebase/app';
import firestore from '@firebase/firestore';
import { getFirestore, getDocs, collection } from 'firebase/firestore/lite';
import {User} from "@/data/user";



export class UserServices {

    firestore: firestore.Firestore;

    constructor(
        private firebaseApp: firebase.FirebaseApp,
    ) {
        this.firestore = getFirestore(firebaseApp);
    }

    // Login user using email and password in users collection
    // Return an objects, not a promise
    public login(email: string, password: string): User|null {
        // Get users collection
        const usersCollection = collection(this.firestore, 'users');

        // Get all users
        const users = getDocs(usersCollection);

        // Handle promise
        users.then((querySnapshot) => {
            for (const doc of querySnapshot.docs) {
                // Get user object

                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                const user = doc.data() satisfies User;
                // Check if user email and password matches
                if (user.email == email && user.password == password) {
                    // Return user object
                    return user;
                }
            }
        });

        // Return null if no user found
        return null;
    }

}

