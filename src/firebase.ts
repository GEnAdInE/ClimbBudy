import {initializeApp} from "firebase/app";
import {firebaseConfig} from "@/fbaseconf";
import {getFirestore} from "firebase/firestore";
import {getAuth} from "firebase/auth";
import {getAnalytics} from "firebase/analytics";

export const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

const analytics = getAnalytics(firebaseApp);
const auth = getAuth(firebaseApp);