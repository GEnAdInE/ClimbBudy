<template>
    <ion-page>
        <ion-header :translucent="true">
            <ion-toolbar>
                <ion-title>Climb buddy</ion-title>
            </ion-toolbar>


        </ion-header>
        <ion-content>
            <ion-fab slot="fixed" :edge="true" horizontal="end" vertical="top">
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
            <ion-card color="tertiary">
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
                <RouteCard v-for="route in routesRef" :key="route.id" :author="route.author"
                           :color="route.color" :description="route.description"
                           :difficulty="route.difficulty" :icon="route.icon" :location="route.location"
                           :name="route.name" :tips="route.tips"
                           @click="goTo(centerRef.id, route.id)"/>

            </ion-list>
            <ion-modal :is-open="isNewRouteModalOpen.value">
                <ion-header>
                    <ion-toolbar>
                        <ion-title>Add Route</ion-title>
                        <ion-button slot="end" color="danger" shape="round" @click="showAddModal()">CLOSE</ion-button>
                    </ion-toolbar>
                </ion-header>

                <ion-content >
                    <EditRouteDetails @saved="handleAdd"></EditRouteDetails>
                </ion-content>
            </ion-modal>


        </ion-content>


        <ion-fab slot="fixed" horizontal="end" vertical="bottom">
            <ion-fab-button @click="goBack()">
                <ion-icon :icon="arrowBackCircleOutline"></ion-icon>
            </ion-fab-button>
        </ion-fab>


    </ion-page>

</template>

<script lang="ts" setup>
import {
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonContent,
    IonFab,
    IonFabButton,
    IonFabList,
    IonHeader,
    IonIcon,
    IonLabel,
    IonList,
    IonListHeader,
    IonModal,
    IonPage,
    IonTitle,
    IonToolbar,

} from "@ionic/vue";
import router from "@/router";
import {CenterServices} from "@/services/center-services";
import {onMounted, reactive, ref} from "vue";
import {Center} from "@/data/center";
import RouteCard from "@/components/RouteCard.vue";
import {Route} from "@/data/route";
import {addCircleOutline, arrowBackCircleOutline, chevronDownCircle, createOutline} from "ionicons/icons";
import EditRouteDetails from "@/components/EditRouteDetails.vue";
import {RouteServices} from "@/services/route-services";


const props = defineProps({
    centerId: {
        type: String,
        required: true
    }
})

const isNewRouteModalOpen = reactive({
    value: false
})

function showAddModal() {
    console.log(isNewRouteModalOpen)
    isNewRouteModalOpen.value = !isNewRouteModalOpen.value;
    console.log(isNewRouteModalOpen)

}

async function handleAdd(e: any) {
    console.log(e);
    if (!props.centerId) return;
    e.center_id = props.centerId;
    e.id = null;
    const res = await RouteServices.addRoute(e);
    console.log(res);
    if (res && routesRef.value) {
        routesRef.value.push(e);
    }
    showAddModal();
}

function goTo(centerId: string, routeId: string) {
    router.push('/centers/' + centerId + '/routes/' + routeId);
}

function log(data: any) {
    console.log(data);
}

const goBack = () => {
    router.push('/home');
}
const centerRef = ref<Center>();
const routesRef = ref<Route[]>();

onMounted(async () => {
    console.log("CENTER ID : ", props.centerId)
    if (!props.centerId) return;

    const center: Center = await CenterServices.getCenterAsync(props.centerId, true);
    centerRef.value = center;
    routesRef.value = center.routes;
    console.log("CENTER : ", centerRef)
    console.log("ROUTES : ", centerRef.value.routes);
});
</script>

<style scoped>

</style>