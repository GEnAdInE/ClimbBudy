// Same that route-services.ts but with CenterServices
import {Center} from '@/data/center';
import {collection, doc, DocumentData, getDoc, getDocs, getFirestore, onSnapshot} from 'firebase/firestore'
import {firebaseApp} from "@/firebase";
import {QueryDocumentSnapshot, QuerySnapshot} from "@firebase/firestore";
import firebase from "firebase/compat";
import {RouteServices} from "@/services/route-services";


const db = getFirestore(firebaseApp);
const centersCollection = collection(db, 'centers');

export class CenterServices {

    /**
     * Method to get all centers from database asynchronously.
     */
    public static async getCentersAsync(): Promise<Center[]> {
        const centerList: Center[] = [];

        // Get users
        const centers = getDocs(centersCollection);

        return await centers.then((querySnapshot) => {

                for (const doc of querySnapshot.docs) {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    const center: Center = doc.data() satisfies Center;
                    center.id = doc.id;

                    centerList.push(center);
                }

                return centerList;
            }
        );
    }


    /**
     * Method to get a center from database asynchronously.
     * @param id The id of the center to get.
     */
    public static async getCenterAsync(id: string): Promise<Center> {
        const centerDoc = await getDoc(doc(centersCollection, id));
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const center : Center = centerDoc.data() satisfies Center;
        center.id = centerDoc.id
        center.routes = await RouteServices.getRoutesOfCenterAsync(center)
        return center;
    }


    // Same as onSnapshot but with a function to handle the data
    public static onSnapshot(
        centerList: Center[] = [],
        callback: (centerList: Center[]) => void = (centerList) => {
            return centerList
        }
    ) {
        this.onSnapshotDocsCallback((centerDocuments ) => {
            const newCenterList: Center[] = [];
            for (const doc of centerDocuments) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                const center: Center = doc.data() satisfies Center;
                center.id = doc.id;

                newCenterList.push(center);
            }

            // Clear the array
            centerList.splice(0, centerList.length);
            centerList.push(...newCenterList);

            // Call the function to update the array in real time
            callback(centerList);
        })
    }

    public static onSnapshotDocsCallback(
        callback: (centerDocuments: Array<QueryDocumentSnapshot<DocumentData>>) => void = (centerDocuments) => {
            return centerDocuments
        }
    ) {
        onSnapshot(centersCollection, (querySnapshot : QuerySnapshot<DocumentData>) => {
            return callback(querySnapshot.docs);
        })
    }

}