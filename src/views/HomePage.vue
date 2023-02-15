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
                        <CenterListItem v-for="center in centersRef" @click="magic(center.id)" :key="center.id" :center="center"/>


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
            <div style="height: 45vh; display: flex;  justify-content: center; " class="rectangleRef">
            </div>

        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import {
    createGesture,
    Gesture, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle,
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

function campage() {

    router.push('/camera');
}

function magic(centerId : string) {
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