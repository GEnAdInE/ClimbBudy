<template>
    <ion-card color="primary">
      <ion-card-header>
        <ion-card-title>El muerte 🔎  <ion-chip style="float: right;bottom: 1vh" color="light">7A</ion-chip></ion-card-title>
        <ion-card-subtitle>Sylvain</ion-card-subtitle>
        <ion-card-content>
          <ion-chip color="light">
            <ion-icon :icon="locationOutline"></ion-icon>
            <ion-label>P1</ion-label>
          </ion-chip>
          <ion-chip color="light">
            <ion-label>Devers</ion-label>
          </ion-chip>
        </ion-card-content>
          <ion-card-content>

          <ion-label>Voie parfaite pour debuter</ion-label>
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
}
</script>

<style scoped>

</style>