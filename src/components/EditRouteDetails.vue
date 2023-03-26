<template>
  <ion-button color="success" expand="block" style="margin-bottom: 1vh; margin-top: 1vh" @click="save()">SAVE ROUTE
  </ion-button>
    <ion-item>
        <ion-label position="floating">Name :</ion-label>
        <ion-input v-model="state.localDetails.name" :placeholder="details ? details.name : ''"></ion-input>
    </ion-item>

    <ion-item>
        <ion-label position="floating">Description :</ion-label>
        <ion-input v-model="state.localDetails.description" :placeholder="details ? details.description : ''"></ion-input>
    </ion-item>

    <ion-item>
        <ion-label position="floating">Tips :</ion-label>
        <ion-input v-model="state.localDetails.tips" :placeholder="details ? details.tips : ''"></ion-input>
    </ion-item>

    <ion-item>
        <ion-label position="floating">Author :</ion-label>
        <ion-input v-model="state.localDetails.author" :placeholder="details ? details.author : ''"></ion-input>
    </ion-item>

    <ion-item>
        <ion-label position="floating">Location :</ion-label>
        <ion-input v-model="state.localDetails.location" :placeholder="details ? details.location : ''"></ion-input>
    </ion-item>

    <ion-item>
        <ion-label position="floating">Icon :</ion-label>
        <ion-input v-model="state.localDetails.icon" :placeholder="details ? details.icon : ''"></ion-input>
    </ion-item>
    <ion-list>
        <ion-item>
            <ion-select interface="popover" v-model="state.localDetails.difficulty" placeholder="Difficulty">
                <IonSelectOption value="9B">9B</IonSelectOption>
                <IonSelectOption value="9A+">9A+</IonSelectOption>
                <IonSelectOption value="9A">9A</IonSelectOption>
                <IonSelectOption value="8C+">8C+</IonSelectOption>
                <IonSelectOption value="8C">8C</IonSelectOption>
                <IonSelectOption value="8B+">8B+</IonSelectOption>
                <IonSelectOption value="8B">8B</IonSelectOption>
                <IonSelectOption value="8A+">8A+</IonSelectOption>
                <IonSelectOption value="8A">8A</IonSelectOption>
                <IonSelectOption value="7C+">7C+</IonSelectOption>
                <IonSelectOption value="7C">7C</IonSelectOption>
                <IonSelectOption value="7B+">7B+</IonSelectOption>
                <IonSelectOption value="7B">7B</IonSelectOption>
                <IonSelectOption value="7A+">7A+</IonSelectOption>
                <IonSelectOption value="7A">7A</IonSelectOption>
                <IonSelectOption value="6C+">6C+</IonSelectOption>
                <IonSelectOption value="6C">6C</IonSelectOption>
                <IonSelectOption value="6B+">6B+</IonSelectOption>
                <IonSelectOption value="6B">6B</IonSelectOption>
                <IonSelectOption value="6A+">6A+</IonSelectOption>
                <IonSelectOption value="6A">6A</IonSelectOption>
                <IonSelectOption value="5C+">5C+</IonSelectOption>
                <IonSelectOption value="5C">5C</IonSelectOption>
                <IonSelectOption value="5B+">5B+</IonSelectOption>
                <IonSelectOption value="5B">5B</IonSelectOption>
                <IonSelectOption value="5A+">5A+</IonSelectOption>
                <IonSelectOption value="5A">5A</IonSelectOption>
                <IonSelectOption value="4C+">4C+</IonSelectOption>
                <IonSelectOption value="4C">4C</IonSelectOption>
            </ion-select>
        </ion-item>
    </ion-list>
  <ion-list>
    <ion-item>
      <ion-select v-model="state.localDetails.color" interface="popover" placeholder="Color">
        <IonSelectOption v-for="(name, code) in colors" :key="code" :value="code">
          {{ name }}
        </IonSelectOption>
      </ion-select>
      <ion-button :color="state.localDetails.color"></ion-button>
    </ion-item>
  </ion-list>


<card-option-picker ref="localComp" :card="details ? details.card : null "></card-option-picker>



</template>

<script lang="ts" setup>
import {
  IonBadge,
  IonButton, IonCheckbox,
  IonChip,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonSelect,
  IonSelectOption
} from "@ionic/vue";
import {Route} from "@/data/route";
import colorlist from "@//theme/colorlist";
import CardOptionPicker from "@/components/CardOptionPicker.vue";
import {ref, reactive, onMounted} from "vue";

const state = reactive({
  localDetails: {
    name: "",
    description: "",
    tips: "",
    author : "",
    location : "",
    icon : "",
    difficulty : "",
    color : "",
    card: {},
  }


})
const props = defineProps({
        details: {
            type: Object as () => Route,
            required: false
        }
    });

//empty route
 
const colors = colorlist;

const localComp = ref();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const emit = defineEmits(['saved'])

function save() {
  if (localComp.value) {
    const itemList = localComp.value.state.itemList;
    const convertedItemList = {};
    for (const { name, value } of itemList) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      convertedItemList[name] = value; //tranquille ca marche quand meme
    }
    state.localDetails.card = convertedItemList;
    const convertedroute = new Route('', state.localDetails.name,state.localDetails.description,state.localDetails.difficulty,undefined,state.localDetails.tips,state.localDetails.icon,state.localDetails.author,state.localDetails.location,state.localDetails.color,null,state.localDetails.card);
    emit("saved", convertedroute);
  }
}

</script>

<style scoped>

</style>