import {collection, getDocs, getFirestore} from 'firebase/firestore/lite';
import {CenterServices} from "@/services/center-services";
import {Route} from "@/data/route";
import {firebaseApp} from "@/firebase";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {sprintf} from "sprintf-js";
import {DocumentData, onSnapshot} from 'firebase/firestore';
import {QuerySnapshot} from "@firebase/firestore";

import {Center} from "@/data/center";

const db = getFirestore(firebaseApp);
const collectionPath = 'centers/%s/routes';

export class RouteServices {


    /**
     * Method to get all routes from database asynchronously.
     */
    public static async getRoutesAsync(routeList: Route[] = []): Promise<Route[]> {
        //const routeList: Route[] = [];
        const centers = await CenterServices.getCentersAsync();

        for (const center of centers) {

            // Get routes collection
            const routesCollection = collection(db, sprintf(collectionPath, center.id));

            // Get all users
            const routes = await getDocs(routesCollection);


            for (const doc of routes.docs) {

                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                const route: Route = doc.data() satisfies Route;
                route.id = doc.id;

                routeList.push(route);
            }
        }

        // Log the reference to the array, not the array itself


        return routeList;
    }


    public static async getRoutesOfCenterAsync(center: Center, routeList : Route[] = []): Promise<Route[]> {
        // Get routes collection
        const routesCollection = collection(db, sprintf(collectionPath, center.id));
        const newRouteList: Route[] = [];

        // Get all routes of the center
        const routes = await getDocs(routesCollection);

        for (const doc of routes.docs) {

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            const route: Route = doc.data() satisfies Route;
            route.id = doc.id;

            newRouteList.push(route);
        }

        // Clear the array
        routeList.splice(0, routeList.length);
        routeList.push(...newRouteList);

        center.routes = routeList;

        return routeList;
    }


    public static onSnapshotRoutesOfCenter(
        center: Center,
        routeList: Route[] = [],
        callback: (routeList: Route[]) => void = (routeList) => {
            return routeList
        }) {

        const routesCollection = collection(db, sprintf(collectionPath, center.id));

        onSnapshot(routesCollection, (querySnapshot: QuerySnapshot<DocumentData>) => {
            const newRouteList: Route[] = [];
            for (const doc of querySnapshot.docs) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                const route: Route = doc.data() satisfies Route;
                route.id = doc.id;

                newRouteList.push(route);
            }

            center.routes = newRouteList;

            // Clear the array
            routeList.splice(0, routeList.length);
            routeList.push(...newRouteList);

            callback(newRouteList);
        });

    }

    public static async onSnapshot(
        routeList: Route[] = [],
        callback: (routeList: Route[]) => void = (routeList) => {
            return routeList
        }) {

        const centers = await CenterServices.getCentersAsync();

        for (const center of centers) {
            this.onSnapshotRoutesOfCenter(center, routeList, callback);
        }
    }

}