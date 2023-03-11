<template>
  <ion-list>
    <ion-list-header>
      Add card details :
      <ion-button @click="addItem">
        <ion-icon :icon="addCircleOutline"></ion-icon>
      </ion-button>
    </ion-list-header>
      <ion-item :key="item" v-for="item in state.itemList">
      <ion-input style="margin-right: 2vw " v-model="item.name"></ion-input>
      <ion-checkbox v-model="item.value"></ion-checkbox>
      <ion-button style="margin-left: 10vw" color="danger" @click="removeItem(item)">
        <ion-icon :icon="removeCircleOutline"></ion-icon>
      </ion-button>
    </ion-item>
  </ion-list>
</template>

<script lang="ts" setup>
import {IonButton, IonList, IonListHeader,IonIcon,IonItem,IonInput,IonCheckbox} from "@ionic/vue";
import {addCircleOutline, removeCircleOutline} from "ionicons/icons";
import {onMounted, reactive} from "vue";

const props = defineProps({
  card: {
    type: Object,
    required: false
  }
})

const state = reactive({
      itemList :[{ name: "", value: false}]
    }

)

function addItem() {
  state.itemList.push({ name: "", value: false})
}

function removeItem(item: any) {
  state.itemList.splice(state.itemList.indexOf(item), 1);
}

onMounted(() => {
  state.itemList.pop();
  if (props.card) {
    const tmpMap = new Map(Object.entries(props.card));
    for(const [key, value] of tmpMap){
      state.itemList.push({name: key, value: value})
    }
  }

})

defineExpose({
  state
})

</script>

<style scoped>

</style>