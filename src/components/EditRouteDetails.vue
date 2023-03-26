<template>
  <div class="helper-container">

  <ion-grid >
    <ion-row>
      <ion-col>
        <ion-item>
          <ion-label position="floating">Name :</ion-label>
          <ion-input v-model="state.localDetails.name" :placeholder="details ? details.name : ''"></ion-input>
        </ion-item>
      </ion-col>
      <ion-col size ="4">
        <ion-item>
          <ion-label position="floating">Icon :</ion-label>
          <ion-input v-model="state.localDetails.icon" :placeholder="details ? details.icon : ''"></ion-input>
        </ion-item>
      </ion-col>
    </ion-row>
    <ion-row>
      <ion-col>
        <ion-item>
          <ion-label position="floating">Description :</ion-label>
          <ion-input v-model="state.localDetails.description" :placeholder="details ? details.description : ''"></ion-input>
        </ion-item>
      </ion-col>
    </ion-row>
    <ion-row>
      <ion-col>
        <ion-item>
          <ion-label position="floating">Author :</ion-label>
          <ion-input v-model="state.localDetails.author" :placeholder="details ? details.author : ''"></ion-input>
        </ion-item>
      </ion-col>
      <ion-col>
        <ion-item>
          <ion-label position="floating">Location :</ion-label>
          <ion-input v-model="state.localDetails.location" :placeholder="details ? details.location : ''"></ion-input>
        </ion-item>
      </ion-col>
    </ion-row>

    <ion-row>
      <ion-col>
        <ion-item>
          <ion-label position="floating">Tips :</ion-label>
          <ion-input v-model="state.localDetails.tips" :placeholder="details ? details.tips : ''"></ion-input>
        </ion-item>
      </ion-col>
    </ion-row>
    <ion-row>
      <ion-col>
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
      </ion-col>
      <ion-col>
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
      </ion-col>
    </ion-row>
    <ion-row>
      <ion-col>
        <ion-list>
          <ion-item style="display: flex; align-items: center">
            <ion-label style="flex-grow: 0.5">Technique</ion-label>
            <ion-range style="flex-grow: 1" :pin-formatter="pinFormatter" v-model="state.localDetails.tech" :key="state.localDetails.tech"></ion-range>
          </ion-item>
        </ion-list>
      </ion-col>
    </ion-row>
    <ion-row>
      <ion-col>
        <ion-list>
          <ion-item style="display: flex; align-items: center">
            <ion-label style="flex-grow: 0.5">Resistance</ion-label>
            <ion-range style="flex-grow: 1" :pin-formatter="pinFormatter" v-model="state.localDetails.resi" :key="state.localDetails.resi"></ion-range>
          </ion-item>
        </ion-list>
      </ion-col>
    </ion-row>
    <ion-row>
      <ion-col>
        <ion-list>
          <ion-item style="display: flex; align-items: center">
            <ion-label style="flex-grow: 0.5">Morpho</ion-label>
            <ion-range style="flex-grow: 1" :pin-formatter="pinFormatter" v-model="state.localDetails.morph" :key="state.localDetails.morph"></ion-range>
          </ion-item>
        </ion-list>
      </ion-col>
    </ion-row>
    <ion-row>
      <ion-col>
        <ion-list>
          <ion-item style="display: flex; align-items: center">
            <ion-label style="flex-grow: 0.5">Dynamics</ion-label>
            <ion-range style="flex-grow: 1" :pin-formatter="pinFormatter" :pin="true" v-model="state.localDetails.dyn" :key="state.localDetails.dyn"></ion-range>
          </ion-item>
        </ion-list>
      </ion-col>
    </ion-row>
  </ion-grid>
  <card-option-picker ref="localComp" :card="details ? details.card : null "></card-option-picker>

  <ion-button color="success" expand="block" style="margin-bottom: 1vh; margin-top: 1vh" @click="save()">SAVE ROUTE
  </ion-button>

  </div>


</template>

<script lang="ts" setup>
import {
  IonRange,
  IonButton,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonSelect,
  IonSelectOption,
    IonGrid,
    IonRow,
    IonCol

} from "@ionic/vue";
import {Route} from "@/data/route";
import colorlist from "@//theme/colorlist";
import CardOptionPicker from "@/components/CardOptionPicker.vue";
import {ref, reactive, onMounted, nextTick} from "vue";

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
    tech: 0,
    resi:0,
    morph:0,
    dyn:0,
    card: new Array<string>()
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
const pinFormatter = (value: number) => `${value}%`;
const localComp = ref();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const emit = defineEmits(['saved'])

function save() {
  if (localComp.value) {
    const itemList = localComp.value.state.itemList;
    for (const { name, value } of itemList) {
      const tmp = name + ":" + value;
      console.log(tmp)
      state.localDetails.card.push(tmp);
    }

    const convertedroute = new Route('', state.localDetails.name,state.localDetails.description,state.localDetails.difficulty,undefined,state.localDetails.tips,state.localDetails.icon,state.localDetails.author,state.localDetails.location,state.localDetails.color,[],state.localDetails.tech,state.localDetails.resi,state.localDetails.morph,state.localDetails.dyn,state.localDetails.card);
    console.log(convertedroute)
    emit("saved", convertedroute);
  }
}

onMounted( async () => {
  if (props.details) {
    state.localDetails.tech = props.details.tech;
    state.localDetails.resi = props.details.resi;
    state.localDetails.morph = props.details.morph;
    state.localDetails.dyn = props.details.dyn;
    console.log("Local details", state.localDetails);
    console.log("Props details", props.details)
  }
})

</script>

<style scoped>
.helper-container {
  height: 85vh;
  overflow-y: scroll;
}

</style>