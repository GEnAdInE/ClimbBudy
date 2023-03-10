<template>
    <ion-item routerDirection="forward">
        <ion-label>
            <h2>{{ route.name }}</h2>
        </ion-label>
        <ion-icon v-if="isIos()" :icon="chevronForward" size="small"></ion-icon>
    </ion-item>
</template>

<script lang="ts" setup>
import {IonIcon, IonItem, IonLabel} from '@ionic/vue';
import {chevronForward} from 'ionicons/icons';
import {Route} from "@/data/route";
import {defineProps} from 'vue';


const props = defineProps({
    route: {
        type: Object as () => Route,
        required: true
    },
});

const isIos = () => {
    const win = window as any;
    return win && win.Ionic && win.Ionic.mode === 'ios';
};
</script>

<style scoped>

</style>