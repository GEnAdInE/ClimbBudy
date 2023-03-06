<template>
    <ion-page>
        <ion-header :translucent="true">
            <ion-toolbar>
                <ion-title>Climb buddy</ion-title>
            </ion-toolbar>



        </ion-header>
      <ion-content >
        <ion-fab slot="fixed" vertical="top" horizontal="end" :edge="true">
          <ion-fab-button color="tertiary">
            <ion-icon :icon="chevronDownCircle"></ion-icon>
          </ion-fab-button>
          <ion-fab-list side="bottom">
            <ion-fab-button color="light" @click="showAddModal">
              <ion-icon :icon="addCircleOutline"></ion-icon>
            </ion-fab-button>
            <ion-fab-button color="light">
              <ion-icon :icon="createOutline"></ion-icon>
            </ion-fab-button>
          </ion-fab-list>
        </ion-fab>
        <ion-card  color="tertiary">
            <ion-card-header v-if="centerRef" @click="log(centerRef.routes)">
                <ion-card-title v-if="centerRef.name">{{ centerRef.name ?? "" }}</ion-card-title>
                <ion-card-subtitle v-if="centerRef.address">{{ centerRef.address ?? "" }}</ion-card-subtitle>
                <ion-card-content v-if="centerRef.website">
                    {{ centerRef.website ?? "" }}
                </ion-card-content>
            </ion-card-header>
        </ion-card>

        <ion-list mode="ios">
          <ion-list-header mode="ios">
            <ion-label mode="ios">List of routes</ion-label>
          </ion-list-header>
            <RouteCard @click="goTo(centerRef.id, route.id)" v-for="route in routesRef" :key="route.id"
                       :color="route.color" :name="route.name"
                       :icon="route.icon" :difficulty="route.difficulty" :author="route.author"
                       :tips="route.tips" :description="route.description"
                       :location="route.location"/>

        </ion-list>
        <ion-modal :is-open="isNewRouteModalOpen.value" >
          <ion-header>
            <ion-toolbar>
              <ion-title>Add Route</ion-title>
              <ion-button color="danger" shape="round" @click="showAddModal()" slot="end">CLOSE</ion-button>
            </ion-toolbar>
          </ion-header>

          <ion-content>
            <EditRouteDetails  @saved="handleAdd"></EditRouteDetails>
          </ion-content>
        </ion-modal>


      </ion-content>




      <ion-fab slot="fixed" vertical="bottom" horizontal="end">
        <ion-fab-button @click="goBack()">
          <ion-icon :icon="arrowBackCircleOutline"></ion-icon>
        </ion-fab-button>
      </ion-fab>


    </ion-page>

</template>

<script setup lang="ts">
import {
    IonCard,
    IonHeader,
    IonList,
    IonPage,
    IonTitle,
    IonToolbar,
    IonCardTitle,
    IonCardHeader,
    IonCardSubtitle,
    IonCardContent,
    IonListHeader,
    IonLabel,
    IonContent,
    IonIcon,
    IonFab,
    IonFabButton,
    IonFabList,
    IonModal,
    IonButton

} from "@ionic/vue";
import router from "@/router";
import {CenterServices} from "@/services/center-services";
import {onMounted, reactive, ref} from "vue";
import {Center} from "@/data/center";
import RouteCard from "@/components/RouteCard.vue";
import {Route} from "@/data/route";
import {arrowBackCircleOutline,chevronDownCircle,addCircleOutline,createOutline} from "ionicons/icons";
import EditRouteDetails from "@/components/EditRouteDetails.vue";

const isNewRouteModalOpen = reactive({
    value: false
})

function showAddModal() {
    console.log(isNewRouteModalOpen)
    isNewRouteModalOpen.value = !isNewRouteModalOpen.value;
  console.log(isNewRouteModalOpen)

}

function handleAdd(e : any) {
    console.log(e);
    showAddModal();
}

function goTo(centerId : string, routeId : string) {
    router.push('/centers/' + centerId + '/routes/' + routeId);
}

function log(data : any) {
    console.log(data);
}

const props = defineProps({
    centerId: String,
});

const goBack = () => {
    router.push('/home');
}
const centerRef = ref<Center>();
const routesRef = ref<Route[]>();

onMounted(async () => {
    console.log("CENTER ID : ", props.centerId)
    if(!props.centerId) return;

    const center : Center = await CenterServices.getCenterAsync(props.centerId);
    centerRef.value = center;
    routesRef.value = center.routes;
    console.log("CENTER : ", centerRef)
    console.log("ROUTES : ", centerRef.value.routes);
});
</script>

<style scoped>

</style>