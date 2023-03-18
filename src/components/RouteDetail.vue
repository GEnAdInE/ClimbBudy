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
                <div v-bind:key="key" v-for="[key,value] in state.cardata">
                  <ion-chip v-if="value" color="light" >
                    <ion-icon :icon="checkmark"></ion-icon>
                    <ion-label >{{key}}</ion-label>
                  </ion-chip>
                </div>

            </ion-card-content>
            <ion-card-content>
                <ion-label>{{ description }}</ion-label>
              <ion-card-subtitle style="margin-top: 2vh">TIPS : {{ tips }}</ion-card-subtitle>
            </ion-card-content>
        </ion-card-header>

    </ion-card>
</template>

<script setup lang="ts">
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
import {onMounted, reactive} from "vue";

const props = defineProps({
    color: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    icon: {
        type: String,
        required: true
    },
    difficulty: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    tips: {
        type: String,
        required: true
    },
  description: {
        type: String,
        required: true
    },
  location: {
        type: String,
        required: true
    },
  card: {
        type: Array,
        required: true
    }
});

const state = reactive({
  cardata :new Map<string,boolean>()
})

onMounted(() => {
  state.cardata = new Map<string,boolean>();

  props.card?.forEach((item: any) => {
    const spliter = item.split(':');
    if(spliter[1] == "true"){
      state.cardata.set(spliter[0],true);
    }else{
      state.cardata.set(spliter[0],false);
    }
  });
  console.log(state.cardata);


});

</script>

<style scoped>
.infobulle{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;}
</style>