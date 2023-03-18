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
    type: Array,
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
    props.card?.forEach((item: any) => {
      const spliter = item.split(':');
      if(spliter[1] == "true"){
        state.itemList.push({name: spliter[0], value: true})
      }else{
        state.itemList.push({name: spliter[0], value: false})
      }
    });

  }

})

defineExpose({
  state
})

</script>

<style scoped>

</style>