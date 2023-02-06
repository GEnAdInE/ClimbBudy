<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Liste des voies</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-refresher slot="fixed" @ionRefresh="refresh($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>

      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Liste des voies</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-list>
        <RouteCard color="warning" name="Route1" icon="🔥" difficulty="7A" author="Ouvreur1" tips="Degaine 1 faire attention" description="Voie en devers avec des grosse prise"  location="7"></RouteCard>
        <RouteCard color="primary" name="Route2" icon="🔎" difficulty="6CA" author="Ouvreur2" tips="Degaine 1 faire attention" description="Voie en devers avec des grosse prise"  location="7"></RouteCard>
        <RouteCard color="medium" name="Route3" icon="👨‍💻" difficulty="5A" author="Ouvreur1" tips="Degaine 1 faire attention" description="Voie en devers avec des grosse prise"  location="7"></RouteCard>
        <RouteCard color="tertiary" name="Route4" icon="😲" difficulty="8A+" author="Ouvreur1" tips="Degaine 1 faire attention" description="Voie en devers avec des grosse prise"  location="7"></RouteCard>

      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonContent,
  IonHeader,
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

const messages = ref<Message[]>(getMessages());

const refresh = (ev: CustomEvent) => {
  setTimeout(() => {
    ev.detail.complete();
  }, 3000);
};
</script>
