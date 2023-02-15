<template>
    <ion-item @click="test(center)" routerDirection="forward">
        <ion-label>
            <h2>{{ center.name }}</h2>
            <p>{{ center.address }}<!--, {{ center.address.longitude }}--></p>
            <p>{{ center.website }}</p>
        </ion-label>
        <ion-icon :icon="chevronForward" size="small" v-if="isIos()"></ion-icon>
    </ion-item>
</template>

<script setup lang="ts">
import {chevronForward} from 'ionicons/icons';
import {Center} from "@/data/center";
import {IonIcon, IonItem, IonLabel} from "@ionic/vue";


defineProps({
    center: Object as () => Center
})

function test(center: Center) {
    // make an ionic toast
    console.log(center)
    //navigate to the route page
}

function isIos() {
    const win = window as any;
    return win && win.Ionic && win.Ionic.mode === 'ios';
}

</script>

<style scoped>

</style>