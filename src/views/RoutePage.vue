<template>
  <ion-page>
    <RouteDetail :color="details.color" :icon="details.color" :author="details.author" :description="details.description" :difficulty="details.difficulty" :location="details.location" :name="details.name"></RouteDetail>
  <!-- ici component commentaires -->
  </ion-page>
</template>

<script>
import RouteDetail from "../components/RouteDetail";
import {IonPage} from "@ionic/vue";
import router from "@/router";
import {onMounted, ref, toRefs} from "vue";
import {CenterServices} from "@/services/center-services";
import {Route} from "@/data/route";
export default {
  name: "RoutePage",
  components: {RouteDetail, IonPage},
  data() {
    return {
      details: Route,
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



}

</script>

<style scoped>

</style>