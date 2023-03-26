<template>
    <ion-item routerDirection="forward" @click="test(props.center)">
        <ion-label>
            <h2>{{ props.center.name }}</h2>
            <p>{{ props.center.address }}<!--, {{ center.address.longitude }}--></p>
            <p>{{ props.center.website }}</p>
        </ion-label>
        <ion-icon v-if="isIos()" :icon="chevronForward" size="small"></ion-icon>
    </ion-item>
</template>

<script lang="ts" setup>
import {chevronForward} from 'ionicons/icons';
import {Center} from "@/data/center";
import {IonIcon, IonItem, IonLabel} from "@ionic/vue";
import {onMounted} from "vue";


const props = defineProps({
    center: {
        type: Object as () => Center,
        required: true
    }
});

function test(center: Center) {
    // make an ionic toast
    console.log(center)
    //navigate to the route page
}

function isIos() {
    const win = window as any;
    return win && win.Ionic && win.Ionic.mode === 'ios';
}

onMounted( () =>{
  console.log(props.center)
})

</script>

<style scoped>

</style>