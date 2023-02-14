<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Climb buddy</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content scroll-x="false" scroll-y="false">
      <div style="height: 45vh">
        <ion-content>
          <ion-list>
            <ion-item color="primary" @click="magic()">
              <ion-label >Salle</ion-label>
            </ion-item>
            <ion-item color="tertiary">
              <ion-label >Salle</ion-label>
            </ion-item> <ion-item color="medium">
            <ion-label >Salle</ion-label>
          </ion-item> <ion-item>
            <ion-label >Salle</ion-label>
          </ion-item> <ion-item>
            <ion-label >Salle</ion-label>
          </ion-item> <ion-item>
            <ion-label >Salle</ion-label>
          </ion-item>
            <ion-item>
              <ion-label >Salle</ion-label>
            </ion-item>
            <ion-item>
              <ion-label >Salle</ion-label>
            </ion-item>
            <ion-item>
              <ion-label >Salle</ion-label>
            </ion-item>
            <ion-item>
              <ion-label >Salle</ion-label>
            </ion-item>
            <ion-item>
              <ion-label >Salle</ion-label>
            </ion-item>
            <ion-item>
              <ion-label >Salle</ion-label>
            </ion-item>
            <ion-item>
              <ion-label >Salle</ion-label>
            </ion-item>







          </ion-list>

        </ion-content>

      </div>
      <div class="line"></div>
      <ion-card id="swipe">
        <ion-card-header>
          <ion-card-title>Scan QR Code 🔎  </ion-card-title>
          <ion-card-subtitle>To open camera swipe up</ion-card-subtitle>
          <ion-card-content id="cameraPreview" style="height: 30vh;" >
          </ion-card-content>
        </ion-card-header>
      </ion-card>
      <div style="height: 45vh; display: flex;  justify-content: center; " class="rectangleRef">
      </div>
     <!-- <ion-list>
        <RouteCard color="warning" name="Route1" icon="🔥" difficulty="7A" author="Ouvreur1" tips="Degaine 1 faire attention" description="Voie en devers avec des grosse prise"  location="7"></RouteCard>
        <RouteCard color="primary" name="Route2" icon="🔎" difficulty="6CA" author="Ouvreur2" tips="Degaine 1 faire attention" description="Voie en devers avec des grosse prise"  location="7"></RouteCard>
        <RouteCard color="medium" name="Route3" icon="👨‍💻" difficulty="5A" author="Ouvreur1" tips="Degaine 1 faire attention" description="Voie en devers avec des grosse prise"  location="7"></RouteCard>
        <RouteCard color="tertiary" name="Route4" icon="😲" difficulty="8A+" author="Ouvreur1" tips="Degaine 1 faire attention" description="Voie en devers avec des grosse prise"  location="7"></RouteCard>

      </ion-list>-->

    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  createGesture,
  Gesture, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle,
  IonContent,
  IonHeader, IonIcon, IonImg, IonItem, IonLabel,
  IonList,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonTitle,
  IonToolbar,
} from '@ionic/vue';
import MessageListItem from '@/components/MessageListItem.vue';
import { getMessages, Message } from '@/data/messages';
import { ref } from 'vue';
import RouteCard from "@/components/RouteCard.vue";
import RouteDetail from "@/components/RouteDetail.vue";
import TestChat from "@/components/TestChat.vue";
import {chevronDownOutline} from "ionicons/icons";
import {CameraPreview, CameraPreviewOptions} from "@capacitor-community/camera-preview";
import router from "@/router";


export default {

  name: 'HomePage',
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonList,
    IonLabel,
    IonItem,
    IonToolbar,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,

  },
  methods: {
      doSomehting(detail: any): void {
        console.log(detail);
      },



      campage(){

        router.push('/camera');
      },
      magic(){
        router.push('/centers/69')
      }


  },

  mounted() {

    const refges = document.getElementById('swipe');
    if(refges){
      const gesture: Gesture = createGesture({
        el: refges,
        gestureName: 'swipe',
        direction: 'y',
        threshold: 150,
        onMove: ev => {
          console.log('onMove', ev);
          router.push('/camera');
        },
      });
      gesture.enable(true);
    }




  },
  setup(){
    return{
      chevronDownOutline : chevronDownOutline
    }
  }

};

</script>
<style>
.line {
  border: 5px solid grey;
  border-radius: 5px;
}
</style>