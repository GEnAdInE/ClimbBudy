import firestore, {
    collection,
    doc,
    DocumentData,
    getDoc,
    getDocs,
    getFirestore,
    onSnapshot,
    setDoc,
    updateDoc
} from 'firebase/firestore';
import {CenterServices} from "@/services/center-services";
import {Route} from "@/data/route";
import {firebaseApp} from "@/firebase";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {sprintf} from "sprintf-js";
import {QuerySnapshot} from "@firebase/firestore";

import {Center} from "@/data/center";
import {CommentServices} from "@/services/comment-services";
import Firestore = firestore.Firestore;

export class RouteServices {

    private static firestore: Firestore = getFirestore(firebaseApp);
    private static collectionPath = 'centers/%s/routes';

    /**
     * Method to get a route from database asynchronously.
     * @param center The center of the route.
     * @param id The id of the route to get.
     * @param loadChildren If true, the child objects will be loaded. Default is false.
     */
    public static async getRouteAsync(center: Center | string, id: string, loadChildren = false): Promise<Route> {
        let centerId: string;
        if (typeof center === 'string') {
            centerId = center;
            center = await CenterServices.getCenterAsync(center);
        } else {
            centerId = center.id;
        }
        const routeCollection = sprintf(this.collectionPath, centerId);
        const routeDoc = await getDoc(doc(this.firestore, routeCollection, id));

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const route: Route = routeDoc.data() satisfies Route;
        route.center = center;
        route.id = id;

        if (loadChildren) {
            route.comments = await CommentServices.getCommentsOfRouteAsync(route);
        }

        return route;
    }

    /**
     * Method to get all routes from database asynchronously.
     * @param routeList The list of routes where the new routes will be added.
     * @param loadChildren If true, the child objects will be loaded. Default is false.
     */
    public static async getRoutesAsync(routeList: Route[] = [], loadChildren = false): Promise<Route[]> {

        const newRouteList: Route[] = [];

        //const routeList: Route[] = [];
        const centers = await CenterServices.getCentersAsync();

        for (const center of centers) {
            await this.getRoutesOfCenterAsync(center, newRouteList, loadChildren);
        }

        // Log the reference to the array, not the array itself
        routeList.splice(0, routeList.length);
        routeList.push(...newRouteList);

        return routeList;
    }


    /**
     * Method to get all routes of a center from database asynchronously.
     * @param center Center object
     * @param routeList Route list
     * @param loadChildren If true, the child objects will be loaded. Default is false.
     */
    public static async getRoutesOfCenterAsync(center: Center | string, routeList: Route[] = [], loadChildren = false): Promise<Route[]> {

        let centerId: string;
        if (typeof center === 'string') {
            centerId = center;
            center = await CenterServices.getCenterAsync(center);
        } else {
            centerId = center.id;
        }

        // Get routes collection
        const routesCollection = collection(this.firestore, sprintf(this.collectionPath, centerId));
        const newRouteList: Route[] = [];

        // Get all routes of the center
        const routes = await getDocs(routesCollection);

        for (const doc of routes.docs) {

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            const route: Route = doc.data() satisfies Route;
            route.id = doc.id;
            route.center = center;
            if (loadChildren) {
                route.comments = await CommentServices.getCommentsOfRouteAsync(route);
            }

            newRouteList.push(route);
        }

        // Clear the array
        routeList.splice(0, routeList.length);
        routeList.push(...newRouteList);

        center.routes = routeList;

        console.log('routeList', routeList);

        return routeList;
    }


    /**
     * Method to subscribe to all routes of a center from database asynchronously.
     * @param center Center object
     * @param routeList Route list
     * @param callback Callback function
     */
    public static onSnapshotRoutesOfCenter(
        center: Center,
        routeList: Route[] = [],
        callback: (routeList: Route[]) => void = (routeList) => {
            return routeList
        }) {

        const routesCollection = collection(this.firestore, sprintf(this.collectionPath, center.id));

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


    /**
     * Method to listen to changes in the database
     * @param routeList Route list
     * @param callback Callback function
     */
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


    /**
     * Method to update a route in the database
     * @param route Route to update
     * @param updateChildren True if the children should be updated, false otherwise (default is false)
     */
    public static async updateRoute(route: Route, updateChildren = false): Promise<void> {
        // Get user document
        const routeDoc = doc(this.firestore, sprintf(this.collectionPath, route.center?.id), route.id);

        if (updateChildren) {
            for (const message of route.comments) {
                await CommentServices.updateComments(message);
            }
        }

        // Update user document
        return await updateDoc(routeDoc, route.getCleanDataObject());
    }


    /**
     * Method to add a route to the database
     * @param route Route to add
     */
    public static async addRoute(route: Route): Promise<boolean> {

        console.log("addRoute", route);
        // If route.center_id is null, then grab the first center

        if (route.center === null || route.center === undefined || route.center.id === null || route.center.id === undefined || route.center.id === '') {
            const centers = await CenterServices.getCentersAsync();
            route.center = centers[0] || null;
        }



        const collectionRef = collection(this.firestore, sprintf(this.collectionPath, route.center.id));

        // Get user document
        const newRouteRef = doc(collectionRef);

        return await setDoc(newRouteRef, route.getCleanDataObject()).then(
            () => {
                // Return the id of the new route
                route.id = newRouteRef.id;
                return true;
            }
        ).catch(
            (error) => {
                console.error(error);
                return false;
            }
        );
    }

}