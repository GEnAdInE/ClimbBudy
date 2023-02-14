<template>
  <ion-page>
    <RouteDetail></RouteDetail>

  </ion-page>
</template>

<script>
import RouteDetail from "../components/RouteDetail";
import {IonPage} from "@ionic/vue";
import router from "@/router";
export default {
  name: "RoutePage",
  components: {RouteDetail,IonPage},
  mounted() {
    console.log(this.$route.params.uid)
  },
}

</script>

<style scoped>

</style>