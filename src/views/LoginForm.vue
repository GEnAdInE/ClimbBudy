<template>
    <!--Create a login/register state-->
    <ion-page>
        <AppHeader/>
        <ion-content>
        <ion-card id="main-content">
            <ion-card-header>
                <ion-card-title>Login or register</ion-card-title>
            </ion-card-header>
            <ion-card-content>
                <p v-if="state.errors.global" class="error">{{ state.errors.global }}</p>

                <ion-item>
                    <ion-label position="floating">Email</ion-label>
                    <ion-input :disabled="state.register" type="email"
                               @change="changeInputValue('email', $event.target.value)"></ion-input>
                </ion-item>
                <p v-if="state.errors.email" class="error">{{ state.errors.email }}</p>

                <ion-item>
                    <ion-label position="floating">Password</ion-label>
                    <ion-input :disabled="state.register && !state.errors.password" type="password"
                               @change="changeInputValue('password', $event.target.value)"></ion-input>
                </ion-item>
                <p v-if="state.errors.password" class="error">{{ state.errors.password }}</p>

                <div v-if="state.register" style="margin-top:40px;">
                    <h4>Last step, choose your username</h4>
                    <ion-item>
                        <ion-label position="floating">Username</ion-label>
                        <ion-input type="text" @change="changeInputValue('username', $event.target.value)"></ion-input>
                    </ion-item>
                    <p v-if="state.errors.username" class="error">{{ state.errors.username }}</p>
                </div>

                <ion-button expand="block" style="margin-top: 50px;" @click="loginOrRegister">Continue</ion-button>


            </ion-card-content>
        </ion-card>
        </ion-content>
    </ion-page>
</template>

<script lang="ts" setup>
import {IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonLabel, IonInput, IonButton,IonPage,IonContent} from '@ionic/vue';
import {reactive} from 'vue'
import {useStore} from 'vuex'
import firestore from "@firebase/firestore";
import router from "@/router";
import AppHeader from "@/components/AppHeader.vue";
import {UserServices} from "@/services/user-services";

const store = useStore()

const defaultForm = {
    username: '',
    email: '',
    password: ''
}

// References to the input values
const state = reactive({
    form: {...defaultForm},
    errors: {
        username: '',
        email: '',
        password: '',
        global: ''
    },
    register: false
});


// If the userCredential is already logged in, redirect to the home page
if (store.state.userCredential) {
    router.push('/')
}


/**
 * Function equivalent to the v-model which does not work here
 * @param input the input name
 * @param value the value to set
 */
function changeInputValue(input: string, value: string) {
    state.form[input] = value
}

function loginOrRegister() {

    //Entrée : l'utilisateur essai de se connecter
    if (!state.register) {
        UserServices.loginUserAsync(store, state.form.email, state.form.password).then(
            (userCredential) => {
                state.register = false
                router.push('/')
            }
        ).catch(
            (error) => {
                if (error.code === 'auth/user-not-found') {
                    state.register = true
                    return;
                }

                if (error.code === 'auth/wrong-password') {
                    state.errors.password = 'Wrong password'
                    return;
                }

                if (error.code === 'auth/invalid-email') {
                    state.errors.email = 'Invalid email'
                    return;
                }

                console.error(error)
                state.errors.global = error.message
            }
        )

        return;
    }


    UserServices.createUserAsync(store, state.form.email, state.form.password, state.form.username).then(
        (userCredential) => {
            router.push('/')
        }
    ).catch(
        (error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            if (errorCode === 'auth/weak-password') {
                state.errors.password = 'Password is too weak'
                return;
            }

            if (errorCode === 'auth/email-already-in-use') {
                state.errors.email = 'Email is already in use'
                return;
            }

            state.errors.global = errorMessage
            console.error(error)
            return;
        }
    )
}

</script>

<style scoped>

.error {
    color: red;
}

</style>