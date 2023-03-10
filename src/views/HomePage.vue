<template>
    <ion-page>
        <ion-header :translucent="true">
            <ion-toolbar>
                <ion-title>Climb buddy</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content scroll-x="false" scroll-y="false">
            <div style="height: 45vh">
                <ion-content>
                    <ion-list>
                        <CenterListItem v-for="center in centersRef" :key="center.id" :center="center"
                                        @click="magic(center.id)"/>


                    </ion-list>

                </ion-content>

            </div>
            <div class="line"></div>
            <ion-card id="swipe">
                <ion-card-header>
                    <ion-card-title>Scan QR Code 🔎</ion-card-title>
                    <ion-card-subtitle>To open camera swipe up</ion-card-subtitle>
                    <ion-card-content id="cameraPreview" style="height: 30vh;">
                    </ion-card-content>
                </ion-card-header>
            </ion-card>
            <div class="rectangleRef" style="height: 45vh; display: flex;  justify-content: center; ">
            </div>

        </ion-content>
    </ion-page>
</template>

<script lang="ts" setup>
import {
    createGesture,
    Gesture,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonContent,
    IonHeader,
    IonList,
    IonPage,
    IonTitle,
    IonToolbar,
} from '@ionic/vue';


import {onMounted, ref} from 'vue';
import router from "@/router";
import {CenterServices} from "@/services/center-services";
import {Center} from "@/data/center";
import CenterListItem from "@/components/CenterListItem.vue";


function doSomehting(detail: any): void {
    console.log(detail);
}

function castToCenter(center: any): Center {
    return center as Center;
}

function debug(): void {
    /*
    const collectionPath = 'centers/b8P2z2Bd1YWKDYtasjRl/routes';
      const data = [
      {
        name: "Golden Flake",
        description: "A challenging route with a crux move near the top.",
        difficulty: "7C",
        tips: "Be sure to use small crimps to get through the crux section.",
        icon: "🧗‍♂️",
        author: "Ouvreur 1",
        location: "15",
        color: "primary",
      },
      {
        name: "Black Diamond",
        description: "A steep route with big moves between jugs.",
        difficulty: "6C",
        tips: "Use your legs to push off from the large footholds.",
        icon: "🌑",
        author: "Ouvreur 1",
        location: "12",
        color: "warning"
      },
      {
        name: "Red River",
        description: "A classic route with small edges and technical footwork.",
        difficulty: "7B",
        tips: "Take your time to find the right footholds for each move.",
        icon: "🔴",
        author: "Ouvreur 1",
        location: "8",
        color: "tertiary"
      },
      {
        name: "Yellow Jacket",
        description: "A pumpy route with lots of big holds.",
        difficulty: "6B+",
        tips: "Don't waste energy by over-gripping on the big holds.",
        icon: "🟡",
        author: "Ouvreur 1",
        location: "2",
        color: "danger"
      },
      {
        name: "Green Goblin",
        description: "A crimpy route with a tricky sequence near the top.",
        difficulty: "7A+",
        tips: "Make sure to get a good rest before attempting the crux section.",
        icon: "🟢",
        author: "Ouvreur 1",
        location: "4",
        color: "secondary"
      },
      {
        name: "Purple Haze",
        description: "A technical route with delicate footwork on small edges.",
        difficulty: "6C+",
        tips: "Take your time to find the right body position for each move.",
        icon: "🟣",
        author: "Ouvreur 1",
        location: "11",
        color: "warning"
      },
      {
        name: "White Rhino",
        description: "A powerful route with big moves and steep terrain.",
        difficulty: "7B+",
        tips: "Use your momentum to make big moves between the good holds.",
        icon: "🦏",
        author: "Ouvreur 1",
        location: "9",
        color: "warning"
      },
      {
        name: "Blue Lagoon",
        description: "A fun route with lots of juggy holds and interesting movement.",
        difficulty: "6B",
        tips: "Enjoy the movement and flow of this fun route.",
        icon: "🌊",
        author: "Ouvreur 1",
        location: "5",
        color: "primary"
      }];
      //for each element in data push document in firabse
      data.forEach((element) => {

        const db = getFirestore(firebaseApp);
        const routesCollection = collection(db,collectionPath);
        setDoc(doc(routesCollection), element);
            });*/

}

function campage() {

    router.push('/camera');
}

function magic(centerId: string) {
    router.push('/centers/' + centerId)
}


const centersRef = ref<Center[]>([]);

onMounted(async () => {

    const refges = document.getElementById('swipe');
    if (refges) {
        const gesture: Gesture = createGesture({
            el: refges,
            gestureName: 'swipe',
            direction: 'y',
            threshold: 150,
            onMove: ev => {
                console.log('onMove', ev);
                router.push('/camera');
            },
        });
        gesture.enable(true);
    }

    centersRef.value = await CenterServices.getCentersAsync();
    console.log(centersRef.value);

});


</script>
<style>
.line {
    border: 5px solid grey;
    border-radius: 5px;
}
</style>