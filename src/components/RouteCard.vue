<template>
    <ion-card :color="color">  <!-- color of the route -->
        <ion-card-header>
            <ion-card-title>{{ name }} {{ icon }}
                <ion-chip color="light" style="float: right;bottom: 1vh">{{ difficulty }}</ion-chip>
            </ion-card-title> <!-- name of the route -->

        </ion-card-header>

    </ion-card>
</template>

<script lang="ts">
import {IonCard, IonCardHeader, IonCardTitle, IonChip} from "@ionic/vue";

export default {
    name: "RouteCard",
    props: ['color', 'name', 'icon', 'difficulty', 'author', 'tips', 'description', 'location'],
    components: {IonCard, IonCardHeader, IonCardTitle, IonChip},

}
</script>

<style scoped>

</style>