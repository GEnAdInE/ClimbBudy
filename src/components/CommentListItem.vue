<template>
    <ion-card>
        <ion-card-header>
            <ion-card-title>{{ props.comment.user?.name }}</ion-card-title>
        </ion-card-header>
        <ion-card-content>
            {{ props.comment?.subject }}
        </ion-card-content>
    </ion-card>
</template>

<script lang="ts" setup>
import {IonCard, IonCardContent, IonCardHeader, IonCardTitle} from "@ionic/vue";
import {Comment} from "@/data/comment";

const props = defineProps({
    comment: {
        type: Object as () => Comment,
        required: true
    },
});

console.log("PROPS HERE", props.comment)

</script>

<style scoped>

</style>