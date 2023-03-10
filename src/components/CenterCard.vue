<template>
    <ion-card @click="test(props.center)">  <!-- color of the route -->
        <ion-card-header>
            <ion-card-title>{{ props.center.name }}
                <ion-chip color="light" style="float: right;bottom: 1vh">{{ props.center.website }}</ion-chip>
                <ion-chip color="light" style="float: right;bottom: 1vh">{{ props.center.location }}</ion-chip>
            </ion-card-title> <!-- name of the route -->

        </ion-card-header>
        |
    </ion-card>
</template>

<script lang="ts" setup>
import {IonCard, IonCardHeader, IonCardTitle, IonChip} from "@ionic/vue";
import {Center} from "@/data/center";

const props = defineProps({
    center: {
        type: Object as () => Center,
        required: true
    }
})

function test(center: Center) {
    // make an ionic toast
    console.log(center)
    //navigate to the route page
}


</script>

<style scoped>

</style>