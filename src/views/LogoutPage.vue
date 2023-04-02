<template>
    <!-- Add a message that says "You are logged out" and that he will be redirected to the login page in 5 seconds -->
    <ion-page>
        <AppHeader/>
        <ion-content>
            <ion-card>
                <ion-card-header>
                    <ion-card-title>You are logged out</ion-card-title>
                </ion-card-header>
                <ion-card-content>
                    <p>You will be redirected to the login page in 5 seconds</p>
                </ion-card-content>
            </ion-card>
        </ion-content>
    </ion-page>
</template>

<script lang="ts" setup>
import AppHeader from "@/components/AppHeader.vue";
import {useStore} from "vuex";
import router from "@/router";

const store = useStore();

if(!store.state.user) {
    router.push({name: "Home"});
}


store.commit('setUser', null);
setTimeout(() => {
    router.push({name: "Home"});
}, 5000);

</script>

<style scoped>

</style>