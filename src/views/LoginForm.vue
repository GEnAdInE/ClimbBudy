<template>
    <!--Create a login/register state-->
    <ion-page>
        <AppHeader/>
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

                <ion-button style="margin-top: 50px;" expand="block" @click="loginOrRegister">Continue</ion-button>


            </ion-card-content>
        </ion-card>
    </ion-page>
</template>

<script lang="ts" setup>
import {reactive, watch} from 'vue'
import {useStore} from 'vuex'
import firestore from "@firebase/firestore";
import {firebaseApp} from "@/firebase";
import {collection, getDocs, getFirestore} from "firebase/firestore";
import {getAuth} from "firebase/auth";
import router from "@/router";
import AppHeader from "@/components/AppHeader.vue";
import {UserServices} from "@/services/user-services";
import {User} from "@/data/user";
import Firestore = firestore.Firestore;

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

const myFirestore: Firestore = getFirestore(firebaseApp)
const auth = getAuth(firebaseApp)


watch(state.form, () => {
    if (hasFormChanged()) {
        const changedFormKeys = getChangedFormKeys()

        for (const key of changedFormKeys) {
            console.log('changedFormKeys', key)
            switch (key) {
                case 'username':
                    checkUsernameAvailability()
                    break
                case 'email':
                    checkEmailAvailability().then(() => {
                            console.log('email changed', state.errors.email)
                        }
                    )
                    break
                case 'password':
                    state.errors.password = ''
                    break
            }
        }
    }
})

// Log the store
console.log('store', store)

// If the user is already logged in, redirect to the home page
if (store.state.user) {
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

/**
 * Function to check if the form input values has changed
 */
function hasFormChanged() {
    return getChangedFormKeys().length > 0
}

/**
 * Function to get the keys of the form that have been modified
 * @returns {string[]} An array of the keys that have been modified
 */
function getChangedFormKeys() {
    const modifiedFields: string[] = []
    Object.keys(state.form).forEach(field => {
        if (state.form[field].trim() !== defaultForm[field].trim()) {
            modifiedFields.push(field)
        }
    })
    return modifiedFields
}


/**
 * Function to check if the username is available
 */
async function checkUsernameAvailability(): Promise<boolean> {
    // Check from firebase if the username is available using getDocs(collection())
    const docRef = collection(myFirestore, "users");
    const querySnapshot = await getDocs(docRef);
    for (const doc of querySnapshot.docs) {
        if (doc.data().username === state.form.username) {
            state.errors.username = 'Username is not available'
            return false
        }
    }
    state.errors.username = ''
    return true
}


/**
 * Function to check if the email is available
 */
async function checkEmailAvailability(): Promise<boolean> {
    // Check from firebase if the email is available using getDocs(collection())
    const docRef = collection(myFirestore, "users");
    const querySnapshot = await getDocs(docRef);
    for (const doc of querySnapshot.docs) {
        if (doc.data().email === state.form.email) {
            state.errors.email = 'Email is not available'
            console.log('email changed', state.errors.email)
            return false
        }
    }
    console.log('email changed', state.errors.email)
    state.errors.email = ''
    return true
}

function loginOrRegister() {
    /*if (store.state.user) {
        const user = new User(store.state.user.uid, state.form.username, state.form.email, "")
        UserServices.updateUserAsync(user).then(
            () => {
                router.push('/')
            }
        ).catch(
            (error) => {
                state.errors.global = error.message
            }
        )

        return;
    }*/

    //Entrée : l'utilisateur essai de se connecter
    if(!state.register) {
        UserServices.loginOrRegisterUserAsync(store, state.form.email, state.form.password).then(
            (user) => {
                console.log('user', user)
                state.register = false
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

                state.errors.global = error.message
            }
        )

        return;
    }



    UserServices.createUserAsync(store, state.form.email, state.form.password, state.form.username).then(
        (user) => {
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