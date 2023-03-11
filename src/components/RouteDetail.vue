<template>
    <ion-card :color="color">
        <ion-card-header>
            <ion-card-title>{{ name }} {{ icon }}🔎
                <ion-chip color="light" style="float: right;bottom: 1vh">{{ difficulty }}</ion-chip>
            </ion-card-title>
            <ion-card-subtitle>{{ author }}</ion-card-subtitle>
            <ion-card-content class="infobulle">
                <ion-chip color="light">
                    <ion-icon :icon="locationOutline"></ion-icon>
                    <ion-label>{{ location }}</ion-label>
                </ion-chip>
                <div v-bind:key="key" v-for="(key,value) in card">
                  <ion-chip v-if="key" color="light" >
                    <ion-icon :icon="checkmark"></ion-icon>
                    <ion-label >{{value}}</ion-label>
                  </ion-chip>
                </div>

            </ion-card-content>
            <ion-card-content>

                <ion-label>{{ description }}</ion-label>
            </ion-card-content>
        </ion-card-header>

    </ion-card>
</template>

<script lang="ts">
import {
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonChip,
    IonIcon,
    IonLabel
} from "@ionic/vue";
import {card, checkmark, locationOutline} from "ionicons/icons";

export default {
    name: "RouteDetail",
    components: {IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonChip, IonIcon, IonLabel, IonCardContent},
    setup() {
        return {locationOutline,checkmark};
    },
    props: {
        color: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        icon: {
            type: String,
            required: true,
        },
        difficulty: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        card:{
          type: Object,
          required: false,
        }

    },
    methods: {
      checkBool(val :string): boolean {
        return val == "true";
      },
    }
}
</script>

<style scoped>
.infobulle{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;}
</style>