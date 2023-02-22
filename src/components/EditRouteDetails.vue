<template>
  <ion-item>
    <ion-label position="floating">Change name</ion-label>
    <ion-input :placeholder="details.name"></ion-input>
  </ion-item>

  <ion-item>
    <ion-label position="floating">Change description</ion-label>
    <ion-input :placeholder="details.description"></ion-input>
  </ion-item>

  <ion-item>
    <ion-label position="floating">Change tips</ion-label>
    <ion-input :placeholder="details.tips"></ion-input>
  </ion-item>

  <ion-item>
    <ion-label position="floating">Change Author</ion-label>
    <ion-input :placeholder="details.author"></ion-input>
  </ion-item>

  <ion-item>
    <ion-label position="floating">Change location</ion-label>
    <ion-input :placeholder="details.location"></ion-input>
  </ion-item>

  <ion-item>
    <ion-label position="floating">Change Icon</ion-label>
    <ion-input :placeholder="details.icon" ></ion-input>
  </ion-item>

</template>

<script>
import {IonInput, IonItem, IonLabel} from "@ionic/vue";

export default {
  name: "EditRouteDetails",
  components: {IonItem, IonLabel, IonInput},
  props : ['details']
}
</script>

<style scoped>

</style>