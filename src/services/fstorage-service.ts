import {Camera} from "@capacitor/camera";
import * as fstorage from "firebase/storage";
import {storage} from "@/firebase";
import { v4 as uuidv4 } from 'uuid';
import {codeSharp} from "ionicons/icons";


/**
 * Return a blob
 */
async function pickImages(): Promise<Blob | null> {
    console.log("pickImages");
    const images = await Camera.pickImages({
        quality: 100,
        limit: 1,
    });

    console.log("images", images);
    if (images.photos.length === 0) {
        return null;
    } else {
        console.log("jackpot")
        const response = await fetch(images.photos[0].webPath);
        const blob = await response.blob();
        return blob;
    }
}

async function sendPhotoToStorage(image : Blob) : Promise<string>{
    const myuid  = uuidv4();
    console.log("myuid",myuid)
    const sref = "images/" + myuid
    const storageRef = fstorage.ref(storage,sref);

    try {
        await fstorage.uploadBytes(storageRef,image);
        console.log('Uploaded a blob!');
        console.log(myuid);
        return myuid;
    } catch (error) {
        console.log(error);
        return "";
    }
}
async function getPhotoFromStorage(filename : string)  {
    const sref = "images/" + filename
    const storageRef = fstorage.ref(storage,sref);
    return fstorage.getDownloadURL(storageRef).then((url) => {
        return url;
    });
}

async function checkIfFileExist (filename : string) {
    const sref = "images/" + filename
    const storageRef = fstorage.ref(storage,sref);
    return fstorage.getDownloadURL(storageRef).then((url) => {
        return true;
    }).catch((error) => {
        return false;
    });
}

export {pickImages,sendPhotoToStorage,getPhotoFromStorage,checkIfFileExist}
