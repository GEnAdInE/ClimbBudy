// Same that route-services.ts but with CenterServices
import {Center} from '@/data/center';
import {collection, doc, DocumentData, getDoc, getDocs, getFirestore, onSnapshot} from 'firebase/firestore'
import {firebaseApp} from "@/firebase";
import firestore, {CollectionReference, QueryDocumentSnapshot, QuerySnapshot} from "@firebase/firestore";
import {RouteServices} from "@/services/route-services";
import Firestore = firestore.Firestore;


export class CenterServices {

    private static firestore: Firestore = getFirestore(firebaseApp);
    private static collection: CollectionReference = collection(this.firestore, 'centers');

    /**
     * Method to get all centers from database asynchronously.
     * @param centerList The list of centers where the new centers will be added.
     */
    public static async getCentersAsync(centerList: Center[] = []): Promise<Center[]> {
        const newCenterList: Center[] = [];

        // Get users
        const centers = await getDocs(this.collection);

        for (const doc of centers.docs) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            const center: Center = doc.data() satisfies Center;
            center.id = doc.id;

            newCenterList.push(center);
        }

        centerList.splice(0, centerList.length);
        centerList.push(...newCenterList);

        return centerList;
    }


    /**
     * Method to get a center from database asynchronously.
     * @param id The id of the center to get.
     * @param loadChildren If true, the child objects will be loaded. Default is false.
     */
    public static async getCenterAsync(id: string, loadChildren = false): Promise<Center> {
        const centerDoc = await getDoc(doc(this.collection, id));
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const center: Center = centerDoc.data() satisfies Center;
        center.id = centerDoc.id;
        if (loadChildren) {
            await RouteServices.getRoutesOfCenterAsync(center, center.routes, loadChildren);
        }
        return center;
    }


    /**
     * Method to subscribe to changes in the "centers" collection.
     * @param centerList The list of centers where the new centers will be added.
     * @param callback The function to call when the list is updated.
     */
    public static onSnapshot(
        centerList: Center[] = [],
        callback: (centerList: Center[]) => void = (centerList) => {
            return centerList
        }
    ) {
        this.onSnapshotDocsCallback((centerDocuments) => {
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

    /**
     * Method to subscribe to changes in the "centers" collection.
     * @param callback The function to call when the list is updated.
     */
    public static onSnapshotDocsCallback(
        callback: (centerDocuments: Array<QueryDocumentSnapshot<DocumentData>>) => void = (centerDocuments) => {
            return centerDocuments
        }
    ) {
        onSnapshot(this.collection, (querySnapshot: QuerySnapshot<DocumentData>) => {
            return callback(querySnapshot.docs);
        })
    }

}