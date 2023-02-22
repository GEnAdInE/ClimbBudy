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



    <ion-fab slot="fixed" vertical="top" horizontal="end">
      <ion-fab-button @click="showModal()">
        <ion-icon :icon="arrowBackCircleOutline"></ion-icon> <!-- TODO : edit icon -->
      </ion-fab-button>
    </ion-fab>

    <ion-modal :is-open="isModalOpen" >
        <ion-header>
          <ion-toolbar>
            <ion-title>Edit Route</ion-title>
            <ion-button color="danger" shape="round" @click="showModal()" slot="end">CLOSE</ion-button>
          </ion-toolbar>
        </ion-header>

        <ion-content>
          <EditRouteDetails :details="details"></EditRouteDetails>
          <ion-button color="danger"> REMOVE ROUTE</ion-button>
          <ion-button color="success"> SAVE CHANGE</ion-button>
        </ion-content>




        <!-- TODO selector for diff -->
      <ion-content>


      </ion-content>


    </ion-modal>

  </ion-page>
</template>

<script>

// TODO: ADD EVENTS ETC
// TODO: ADD STYLE

import RouteDetail from "../components/RouteDetail";
import {IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonPage,IonButton, IonTitle, IonToolbar,IonModal , IonInput} from "@ionic/vue";
import router from "@/router";
import {onMounted, ref, toRefs} from "vue";
import {CenterServices} from "@/services/center-services";
import {Route} from "@/data/route";
import {arrowBackCircleOutline} from "ionicons/icons";
import EditRouteDetails from "@/components/EditRouteDetails";
export default {
  name: "RoutePage",
  components: {RouteDetail, IonPage, IonHeader, IonToolbar, IonTitle,IonIcon,IonFab,IonFabButton,IonContent,IonModal,IonButton,EditRouteDetails},
  data() {
    return {
      details: Route,
      isModalOpen : false,
    }
  },
  methods:{
    goBack(){
      router.push('/centers/' + this.$route.params.centerId);
    },
    showModal(){
      this.isModalOpen = !this.isModalOpen
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