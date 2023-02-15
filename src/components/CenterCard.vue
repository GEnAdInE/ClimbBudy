<template>
    <ion-card @click="test">  <!-- color of the route -->
        <ion-card-header>
            <ion-card-title>{{ name }}
                <ion-chip style="float: right;bottom: 1vh" color="light">{{ website }}</ion-chip>
                <ion-chip style="float: right;bottom: 1vh" color="light">{{ location }}</ion-chip>
            </ion-card-title> <!-- name of the route -->

        </ion-card-header>
        |
    </ion-card>
</template>

<script lang="ts">
import {IonCard, IonCardHeader, IonCardTitle, IonChip} from "@ionic/vue";

export default {
    name: "CenterCard",
    props: ['name', 'location', 'website'],
    components: {IonCard, IonCardHeader, IonCardTitle, IonChip},
    methods: {
        test() {
            // make an ionic toast
            console.log("test")
            //navigate to the route page


        }
    }
}
</script>

<style scoped>

</style>