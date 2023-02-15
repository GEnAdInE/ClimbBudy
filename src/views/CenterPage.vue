<template>
    <ion-page>
        <ion-header :translucent="true">
            <ion-toolbar>
                <ion-title>Climb buddy</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-card color="tertiary">
            <ion-card-header @click="log(centerRef.routes)">
                <ion-card-title>{{ centerRef.name ?? "" }}</ion-card-title>
                <ion-card-subtitle>{{ centerRef.address ?? "" }}</ion-card-subtitle>
                <ion-card-content>
                    {{ centerRef.website ?? "" }}
                </ion-card-content>
            </ion-card-header>
        </ion-card>

        <ion-list>

            <RouteCard @click="goTo(centerRef.id, route.id)" v-for="route in centerRef.routes" :key="route.id"
                       :color="route.color" :name="route.name"
                       :icon="route.icon" :difficulty="route.difficulty" :author="route.author"
                       :tips="route.tips" :description="route.description"
                       :location="route.location"/>

        </ion-list>
    </ion-page>

</template>

<script>
import {
    IonCard,
    IonHeader,
    IonList,
    IonPage, IonTitle, IonToolbar
} from "@ionic/vue";
import router from "@/router";
import {CenterServices} from "@/services/center-services";
import {onMounted, ref, toRefs} from "vue";
import {Center} from "@/data/center";
import RouteCard from "@/components/RouteCard.vue";

export default {
    name: "CenterPage",
    components: {
        RouteCard,
        IonPage,
        IonCard,
        IonList,
        IonHeader,
        IonToolbar,
        IonTitle,
    },
    methods: {
        goTo(centerId, routeId) {
            router.push('/centers/' + centerId + '/routes/' + routeId);
        },
        log(data) {
            console.log(data);
        }
    },
    props: {
        id: {
            type: String,
            required: true,
        },
    },
    setup(props) {
        const centerRef = ref({});

        onMounted(async () => {
            centerRef.value  = await CenterServices.getCenterAsync(props.id);
            console.log("ROUTES : ", centerRef.value.routes);
        });

        return {
            centerRef,
            ...toRefs(props),
        };
    }
}
</script>

<style scoped>

</style>