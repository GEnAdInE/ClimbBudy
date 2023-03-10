// Create services to handle user related operations from Google Firebase
// It should be able to handle user login, user logout, user registration, user profile update, etc.
// It should be made for Vue framework

// Import firebase from @firebase
import firestore, {CollectionReference} from '@firebase/firestore';
import {collection, doc, getDoc, getDocs, getFirestore, updateDoc} from 'firebase/firestore';
import {User} from "@/data/user";
import {firebaseApp} from "@/firebase";
import Firestore = firestore.Firestore;


export class UserServices {

    private static readonly firestore: Firestore = getFirestore(firebaseApp);
    private static collection: CollectionReference = collection(this.firestore, 'users');


    public static async getUserAsync(id: string): Promise<User> {
        const userDoc = await getDoc(doc(this.collection, id));
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const user: User = userDoc.data() satisfies User;
        user.id = userDoc.id
        return user;
    }

    /**
     * Method to login user
     * @param email User email
     * @param password User password
     */
    public static login(email: string, password: string): User | null {

        // Get all users
        const users = getDocs(this.collection);

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


    /**
     * Method to update user profile
     * @param user User object
     */
    public static updateUser(user: User): Promise<void> {
        // Get user document
        const userDoc = doc(this.firestore, 'users', user.id);
        return updateDoc(userDoc, JSON.parse(JSON.stringify(user)));
    }

}

