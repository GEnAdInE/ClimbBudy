<template>
  <ion-item>
    <ion-label position="floating">Name :</ion-label>
    <ion-input v-model="localDetails.name" :placeholder="details ? details.name : ''"></ion-input>
  </ion-item>

  <ion-item>
    <ion-label position="floating">Description :</ion-label>
    <ion-input v-model="localDetails.description" :placeholder="details ? details.description : ''"></ion-input>
  </ion-item>

  <ion-item>
    <ion-label position="floating">Tips :</ion-label>
    <ion-input v-model="localDetails.tips" :placeholder="details ? details.tips : ''"></ion-input>
  </ion-item>

  <ion-item>
    <ion-label position="floating">Author :</ion-label>
    <ion-input v-model="localDetails.author" ::placeholder="details ? details.author : ''"></ion-input>
  </ion-item>

  <ion-item>
    <ion-label position="floating">Location :</ion-label>
    <ion-input v-model="localDetails.location" :placeholder="details ? details.location : ''"></ion-input>
  </ion-item>

  <ion-item>
    <ion-label position="floating">Icon :</ion-label>
    <ion-input v-model="localDetails.icon" :placeholder="details ? details.icon : ''" ></ion-input>
  </ion-item>
  <ion-list>
    <ion-item>
      <ion-select v-model="localDetails.difficulty" placeholder="Difficulty">
        <ion-select-option value="9B">9B</ion-select-option>
        <ion-select-option value="9A+">9A+</ion-select-option>
        <ion-select-option value="9A">9A</ion-select-option>
        <ion-select-option value="8C+">8C+</ion-select-option>
         <ion-select-option value="8C">8C</ion-select-option>
        <ion-select-option value="8B+">8B+</ion-select-option>
        <ion-select-option value="8B">8B</ion-select-option>
        <ion-select-option value="8A+">8A+</ion-select-option>
        <ion-select-option value="8A">8A</ion-select-option>
        <ion-select-option value="7C+">7C+</ion-select-option>
        <ion-select-option value="7C">7C</ion-select-option>
        <ion-select-option value="7B+">7B+</ion-select-option>
        <ion-select-option value="7B">7B</ion-select-option>
        <ion-select-option value="7A+">7A+</ion-select-option>
        <ion-select-option value="7A">7A</ion-select-option>
        <ion-select-option value="6C+">6C+</ion-select-option>
        <ion-select-option value="6C">6C</ion-select-option>
        <ion-select-option value="6B+">6B+</ion-select-option>
        <ion-select-option value="6B">6B</ion-select-option>
        <ion-select-option value="6A+">6A+</ion-select-option>
        <ion-select-option value="6A">6A</ion-select-option>
        <ion-select-option value="5C+">5C+</ion-select-option>
        <ion-select-option value="5C">5C</ion-select-option>
        <ion-select-option value="5B+">5B+</ion-select-option>
        <ion-select-option value="5B">5B</ion-select-option>
        <ion-select-option value="5A+">5A+</ion-select-option>
        <ion-select-option value="5A">5A</ion-select-option>
        <ion-select-option value="4C+">4C+</ion-select-option>
        <ion-select-option value="4C">4C</ion-select-option>
      </ion-select>
    </ion-item>
  </ion-list>

  <ion-button style="margin-bottom: 1vh; margin-top: 1vh" expand="block" color="success" @click="save()">SAVE ROUTE</ion-button>

</template>

<script>
import {IonInput, IonItem, IonLabel, IonList, IonSelect, IonSelectOption} from "@ionic/vue";
import {Route} from "@/data/route";


export default {
  name: "EditRouteDetails",
  components: {IonItem, IonLabel, IonInput,IonList, IonSelect, IonSelectOption},
  props : {
    details : {
      type : Route,
      required : false
    }
  },
  data(){
   return {
      localDetails : new Route("","","","","","","","","",""),
   }
  },
  methods: {
    save(){
      this.$emit('saved', this.localDetails);
    },
  }
}
</script>

<style scoped>

</style>