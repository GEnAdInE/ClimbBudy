<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Climb buddy</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <RouteDetail :color="details.color" :icon="details.icon" :author="details.author" :description="details.description" :difficulty="details.difficulty" :location="details.location" :name="details.name"></RouteDetail>
    </ion-content>
  <!-- ici component commentaires -->

    <ion-fab slot="fixed" vertical="bottom" horizontal="end">
      <ion-fab-button @click="goBack()">
        <ion-icon :icon="arrowBackCircleOutline"></ion-icon>
      </ion-fab-button>
    </ion-fab>
  </ion-page>
</template>

<script>
import RouteDetail from "../components/RouteDetail";
import {IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar} from "@ionic/vue";
import router from "@/router";
import {onMounted, ref, toRefs} from "vue";
import {CenterServices} from "@/services/center-services";
import {Route} from "@/data/route";
import {arrowBackCircleOutline} from "ionicons/icons";
export default {
  name: "RoutePage",
  components: {RouteDetail, IonPage, IonHeader, IonToolbar, IonTitle,IonIcon,IonFab,IonFabButton,IonContent},
  data() {
    return {
      details: Route,
    }
  },
  methods:{
    goBack(){
      router.push('/centers/' + this.$route.params.centerId);
    }
  },

  mounted() {
    //get route details
    CenterServices.getCenterAsync(this.$route.params.centerId).then((center) => {
      center.routes.forEach((route) => {
        if (route.id == this.$route.params.routeId) {
          this.details = route;
        }
      });
    });
  },
  setup(){
   return{
     arrowBackCircleOutline
   }
  }



}

</script>

<style scoped>

</style>