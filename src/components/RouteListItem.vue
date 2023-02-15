<template>
    <ion-item routerDirection="forward">
        <ion-label>
            <h2>{{ route.name }}</h2>
        </ion-label>
        <ion-icon :icon="chevronForward" size="small" v-if="isIos()"></ion-icon>
    </ion-item>
</template>

<script setup lang="ts">
import { IonIcon, IonItem, IonLabel } from '@ionic/vue';
import { chevronForward } from 'ionicons/icons';
import {Route} from "@/data/route";
import { toRefs, defineProps } from 'vue';


const props = defineProps({
    route: Route,
});

const isIos = () => {
    const win = window as any;
    return win && win.Ionic && win.Ionic.mode === 'ios';
};
</script>

<style scoped>

</style>