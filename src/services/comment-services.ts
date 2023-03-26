import firestore, {collection, doc, getDoc, getDocs, getFirestore, setDoc, updateDoc} from "firebase/firestore";
import {firebaseApp} from "@/firebase";
import {Route} from "@/data/route";
import {sprintf} from "sprintf-js";
import {Comment} from "@/data/comment";
import {RouteServices} from "@/services/route-services";
import {Center} from "@/data/center";
import {UserServices} from "@/services/user-services";
import Firestore = firestore.Firestore;
import {checkIfFileExist, getPhotoFromStorage, sendPhotoToStorage} from "@/services/fstorage-service";

export class CommentServices {

    private static firestore: Firestore = getFirestore(firebaseApp);
    private static collectionPath = 'centers/%s/routes/%s/comments';

    /**
     * Method to get a comment from database asynchronously.
     * @param center The center of the route.
     * @param route The route of the comment.
     * @param id The id of the comment to get.
     */
    public static async getComments(center: Center | string, route: Route | string, id: string): Promise<Comment> {
        let centerId: string;
        if (typeof center === 'string') {
            centerId = center;
        } else {
            centerId = center.id;
        }

        let routeId: string;
        if (typeof route === 'string') {
            routeId = route;
            route = await RouteServices.getRouteAsync(center, route);
        } else {
            routeId = route.id;
        }

        const commentCollection = sprintf(this.collectionPath, centerId, routeId);
        const commentDoc = await getDoc(doc(this.firestore, commentCollection, id));

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const comment: Comment = commentDoc.data() satisfies Comment;
        comment.route = route;



        return comment;
    }

    /**
     * Method to get all routes from database asynchronously.
     * @param commentsList The list of routes where the new routes will be added.
     */
    public static async getCommentsAsync(commentsList: Comment[] = []): Promise<Comment[]> {

        const newMessageList: Comment[] = [];

        //const commentsList: Route[] = [];
        const routes = await RouteServices.getRoutesAsync();

        for (const route of routes) {
            await this.getCommentsOfRouteAsync(route, newMessageList);
        }

        // Log the reference to the array, not the array itself
        commentsList.splice(0, commentsList.length);
        commentsList.push(...newMessageList);

        return commentsList;
    }


    /**
     * Method to get all routes of a route from database asynchronously.
     * @param route Center object
     * @param commentsList Route list
     */
    public static async getCommentsOfRouteAsync(route: Route, commentsList: Comment[] = []): Promise<Comment[]> {
        // Get comments collection
        const commentsCollection = collection(this.firestore, sprintf(this.collectionPath, route.center?.id, route.id));
        const newMessageList: Comment[] = [];

        // Get all comments of the route
        const comments = await getDocs(commentsCollection);

        for (const doc of comments.docs) {

            const data = doc.data();

            // Get the userId if it exists
            const userId = data.userId;

            if (userId !== null && userId !== undefined && userId !== "") {
                delete data.userId;
            }

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            const message: Comment = data satisfies Comment;
            message.id = doc.id;
            message.route = route;

            if (userId !== null && userId !== undefined && userId !== "") {
                message.user = await UserServices.getUserAsync(userId);
            }

            newMessageList.push(message);
        }

        // Clear the array
        commentsList.splice(0, commentsList.length);
        commentsList.push(...newMessageList);

        route.comments = commentsList;

        return commentsList;
    }


    /**
     * Method to get all routes of a center from database asynchronously.
     * @param center Center object
     * @param commentsList Route list
     */
    public static async getCommentsOfCenter(center: Center, commentsList: Comment[] = []): Promise<Comment[]> {
        const newMessageList: Comment[] = [];

        const routes: Route[] = await RouteServices.getRoutesOfCenterAsync(center);

        for (const route of routes) {
            await this.getCommentsOfRouteAsync(route, newMessageList);
        }

        // Clear the array
        commentsList.splice(0, commentsList.length);
        commentsList.push(...newMessageList);

        return newMessageList;
    }


    /**
     * Method to update a comment in the database.
     * @param comment Message object
     */
    public static async updateComments(comment: Comment): Promise<void> {
        // Get user document
        const messageDoc = doc(this.firestore, sprintf(this.collectionPath, comment.route?.center?.id, comment.route?.id), comment.id);

        // Update user document
        return await updateDoc(messageDoc, comment.getCleanDataObject());
    }


    /**
     * Method to add a comment to the database.
     * @param comment Message object
     */
    public static async addComment(comment: Comment): Promise<boolean> {

        // If route.center_id is null, then grab the first center
        if (comment.route === null || comment.route === undefined || comment.route.id === null || comment.route.id === undefined || comment.route.id === ''
            || comment.route.center === null || comment.route.center === undefined || comment.route.center.id === null || comment.route.center.id === undefined || comment.route.center.id === '') {
            const routes = await RouteServices.getRoutesAsync();
            comment.route = routes[0] || null;
        }

        if (comment.blobimages.length > 0) {
            for (const blo of comment.blobimages) {
               await sendPhotoToStorage(blo).then((url) => {
                    comment.images.push(url);

                });
            }
        }

        const collectionRef = collection(this.firestore, sprintf(this.collectionPath, comment.route?.center?.id, comment.route?.id));

        // Get user document
        const newCommentRef = doc(collectionRef);

        const copy = comment.getCleanDataObject();
        return await setDoc(newCommentRef, copy).then(
            async () => {
                // Return the id of the new route
                comment.id = newCommentRef.id;

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