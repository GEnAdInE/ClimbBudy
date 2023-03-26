<template>
  <ion-card>
    <ion-card-header>
      <ion-card-title>{{ props.comment.user?.name }}</ion-card-title>
    </ion-card-header>
    <ion-card-content>
      {{ props.comment?.subject }}
      <div v-for="image in props.comment.images" :key="image">
        <img :src="state.imageUrls[image]" />
      </div>
    </ion-card-content>
  </ion-card>
</template>

<script lang="ts" setup>
import { IonCard, IonCardContent, IonCardHeader, IonCardTitle } from "@ionic/vue";
import { Comment } from "@/data/comment";
import { getPhotoFromStorage } from "@/services/fstorage-service";
import { onMounted, reactive } from "vue";

const props = defineProps({
  comment: {
    type: Object as () => Comment,
    required: true,
  },
});

const state = reactive({
  imageUrls: {},
});

async function getImagesForDom(imageName: string) {
  const url = await getPhotoFromStorage(imageName);
  state.imageUrls = { ...state.imageUrls, [imageName]: url };
}

console.log("PROPS HERE", props.comment);

onMounted(() => {
  if (props.comment?.images) {
    props.comment.images.forEach((image) => getImagesForDom(image));
  }
});
</script>

<style scoped></style>
