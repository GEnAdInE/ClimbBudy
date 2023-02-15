<template>
    <ion-card :color="color">
      <ion-card-header>
        <ion-card-title>{{name}} {{icon}}🔎  <ion-chip style="float: right;bottom: 1vh" color="light">{{ difficulty }}</ion-chip></ion-card-title>
        <ion-card-subtitle>{{ author }}</ion-card-subtitle>
        <ion-card-content>
          <ion-chip color="light">
            <ion-icon :icon="locationOutline"></ion-icon>
            <ion-label>{{location}}</ion-label>
          </ion-chip>
        </ion-card-content>
          <ion-card-content>

          <ion-label>{{description}}</ion-label>
        </ion-card-content>
      </ion-card-header>

    </ion-card>
</template>

<script>
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
import {locationOutline} from "ionicons/icons";
export default {
  name: "RouteDetail",
  components: {IonCard,IonCardHeader,IonCardTitle,IonCardSubtitle,IonChip,IonIcon,IonLabel,IonCardContent},
  setup() {
      return { locationOutline };
  },
  props:{
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

  }
}
</script>

<style scoped>

</style>