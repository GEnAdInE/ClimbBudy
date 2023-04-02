<template>
    <ion-menu :content-id="state.contentId">
        <ion-header>
            <ion-toolbar>
                <ion-title>Menu Content</ion-title>
                <!-- Add a cross icon to close the menu -->
                <ion-menu-toggle slot="end" style="margin-right: 5px;">
                    <ion-icon :icon="close"></ion-icon>
                </ion-menu-toggle>
            </ion-toolbar>
        </ion-header>
        <ion-content id="menu-content" class="ion-padding">
            <!-- Add a button home to go to the home page with a home icon -->
            <ion-button expand="block" fill="clear" @click="goTo('home')">
                <ion-icon slot="start" :icon="home"></ion-icon>
                Home
            </ion-button>

            <!-- Add a button to go to the login page, if the user is not logged in -->
            <ion-button v-if="!state.user" expand="block" fill="clear" @click="goTo('login')">
                <ion-icon slot="start" :icon="logIn"></ion-icon>
                Login
            </ion-button>

            <!-- Add a button to logout, if the user is logged in -->
            <ion-button v-if="state.user" expand="block" fill="clear" @click="goTo('logout')">
                <ion-icon slot="start" :icon="logOut"></ion-icon>
                Logout
            </ion-button>

        </ion-content>
    </ion-menu>

    <ion-header :translucent="true">
        <ion-toolbar>
            <!-- Add a account icon at the left of the toolbar -->
            <ion-buttons slot="start">
                <ion-menu-button :autoHide="false" color="dark"></ion-menu-button>
            </ion-buttons>
            <ion-title v-if="state.secondPart">Climb buddy | {{ state.secondPart }}</ion-title>
            <ion-title v-if="!state.secondPart">Climb buddy</ion-title>
        </ion-toolbar>

    </ion-header>

</template>

<script lang="ts" setup>
import {IonHeader, IonTitle, IonToolbar} from '@ionic/vue';
import {reactive} from "vue";
import {useStore} from "vuex";
import {home, logIn, logOut, close} from "ionicons/icons";
import router from "@/router";

// Be able to pass the argument "secondPart" to the component so the call can be like this:
// <Header :secondPart="routeRef.center.name"></Header>
// and the title will be "Climb buddy | routeRef.center.name"
// Make it default to null so that it doesn't have to be passed in the call
const props = defineProps<{
    secondPart: {
        type: string,
        default: null
    },
    contentId: {
        type: string,
        default: "main-content"
    }
}>()

const store = useStore()

const state = reactive({
    secondPart: props.secondPart,
    contentId: props.contentId,
    user: store.state.user
})

if(state.secondPart){
    state.secondPart = state.secondPart.trim()
    if(state.secondPart.length === 0){
        state.secondPart = null
    }
}

if (!state.contentId) {
    state.contentId = "main-content"

    window.addEventListener('load', () => {
        // Try to get the closest .ion-page element and use its id
        const closestPage = window.document.querySelector(".ion-page")
        if (closestPage) {
            if (!closestPage.id) {
                closestPage.id = "main-content"
            }
            state.contentId = closestPage.id
        }
    })
}

function goTo(page: string) {
    switch (page) {
        case "home":
            router.push({name: "Home"})
            break
        case "login":
            router.push({name: "Login or Register"})
            break
        case "logout":
            router.push({name: "Logout"})
            break
    }
}


</script>

<style scoped>

</style>