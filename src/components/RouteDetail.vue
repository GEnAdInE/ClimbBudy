<template>
  <ion-card :color=" route ? route.color : 'primary'">
    <ion-card-header>
      <ion-card-title>{{ route ? route.name : 'Loading' }} {{ route ? route.icon : 'Loading' }}🔎
        <ion-chip color="light" style="float: right;bottom: 1vh">{{
            route ? route.difficulty : 'Loading'
          }}
        </ion-chip>
      </ion-card-title>
      <ion-card-subtitle>{{ route ? route.author : 'Loading' }}</ion-card-subtitle>
      <ion-card-content class="infobulle">
        <ion-chip color="light">
          <ion-icon :icon="locationOutline"></ion-icon>
          <ion-label>{{ route ? route.location : 'Loading' }}</ion-label>
        </ion-chip>
        <div v-bind:key="key" v-for="[key,value] in state.cardata">
          <ion-chip v-if="value" color="light">
            <ion-icon :icon="checkmark"></ion-icon>
            <ion-label>{{ key }}</ion-label>
          </ion-chip>
        </div>

      </ion-card-content>
      <ion-card-content :v-if="route">
        <ion-label>{{ route ? route.description : 'Loading' }}</ion-label>
        <ion-card-subtitle style="margin-top: 2vh">TIPS : {{
            route ? route.tips : 'Loading'
          }}
        </ion-card-subtitle>
        <ion-grid>
          <!-- For each route.difficultyPerCategory -->

          <ion-row v-for="difficultyCategory in state.difficultyPerCategory" :key="difficultyCategory"
                   style="display: flex; align-items: center">

            <ion-col>
              <ion-label>{{ difficultyCategory.name }} :</ion-label>
            </ion-col>
            <ion-col>
              <ion-progress-bar color="medium" :value="difficultyCategory.difficulty / 100"></ion-progress-bar>
            </ion-col>
          </ion-row>

        </ion-grid>
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
  IonCol,
  IonGrid,
  IonIcon,
  IonLabel,
  IonProgressBar,
  IonRow
} from "@ionic/vue";
import {checkmark, locationOutline} from "ionicons/icons";
import {onMounted, reactive} from "vue";
import {Route} from "@/data/route";

const props = defineProps({
  route: {
    type: Object as () => Route,
    required: true
  },
})

const state = reactive({
  cardata: new Map<string, boolean>(),
  difficultyPerCategory: Route.defaultDifficultyPerCategory,
})

onMounted(() => {
  state.cardata = new Map<string, boolean>();

  if (!props.route?.difficultyPerCategory) {
    state.difficultyPerCategory = Route.defaultDifficultyPerCategory;
  } else {
    state.difficultyPerCategory = props.route.difficultyPerCategory;
  }

  console.log("DA PROPS", props.route)
  if (props.route.card == undefined) {
    return;
  }
  props.route.card?.forEach((item: any) => {
    const spliter = item.split(':');
    if (spliter[1] == "true") {
      state.cardata.set(spliter[0], true);
    } else {
      state.cardata.set(spliter[0], false);
    }
  });
  console.log(state.cardata);


});

</script>

<style scoped>
.infobulle {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
</style>