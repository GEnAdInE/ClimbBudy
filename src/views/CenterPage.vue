<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Climb buddy</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-card color="tertiary">
      <ion-card-header>
        <ion-card-title>{{name}}</ion-card-title>
        <ion-card-subtitle>{{adress}}</ion-card-subtitle>
        <ion-card-content >
          {{description}}
        </ion-card-content>
      </ion-card-header>
    </ion-card>

    <ion-list>
      <ion-item v-for="item in routes" v-bind:key="item.id" :color="item.color" @click="goTo(item.id)">
        <ion-label >{{ item.name }}{{item.emoji}}</ion-label>
        <ion-chip>{{item.difficulty}}</ion-chip>
      </ion-item>

    </ion-list>
  </ion-page>

</template>

<script>
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle, IonChip, IonHeader,
  IonItem, IonLabel,
  IonList,
  IonPage, IonTitle, IonToolbar
} from "@ionic/vue";
import router from "@/router";

export default {
  name: "CenterPage",
  components: {
    IonPage,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonList,
    IonItem,
    IonLabel,
    IonChip,
    IonHeader,
IonToolbar,
IonTitle,


  },
  methods:{
    goTo(id){
      router.push('routes/'+id);
    }
  },

  data() {
    return{
      name:'Block Out',
      adress:'22 rue du moulin',
      description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam',
      routes : [ {
        id: 1,
        name: 'El muerte',
        color: 'primary',
        difficulty: '7A',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam',
        emoji: '🔎'
      },
        {
          id: 2,
          name: 'La bestia',
          color: 'secondary',
          difficulty: '6B+',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam',
          emoji: '🐉'
        },
        {
          id: 3,
          name: 'The wall',
          color: 'tertiary',
          difficulty: '7B',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam',
          emoji: '🧱'
        },
        {
          id: 4,
          name: 'The beast',
          color: 'danger',
          difficulty: '6C+',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam',
          emoji: '🦁'
        },
        {
          id: 5,
          name: 'The edge',
          color: 'success',
          difficulty: '7C',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam',
          emoji: '🔪'
        },
        {
          id: 6,
          name: 'The boulder',
          color: 'meduium',
          difficulty: '6A+',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam',
          emoji: '🗿'
        },
        {
          id: 7,
          name: 'The crack',
          color: 'light',
          difficulty: '7B+',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam',
          emoji: '💔'
        },
        {
          id: 8,
          name: 'The beast 2',
          color: 'secondary',
          difficulty: '6C',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam',
          emoji: '🐻'
        },
        {
          id: 9,
          name: 'The slope',
          color: 'primary',
          difficulty: '7A+',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam',
          emoji: '📉'
        },]

   }
  },
  mounted() {
    console.log(this.$route.params.id);
    // get date for the center
  }
}
</script>

<style scoped>

</style>