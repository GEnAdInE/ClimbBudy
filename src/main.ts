import {createApp} from 'vue'
import App from './App.vue'
import router from './router';

import {IonicVue} from '@ionic/vue';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/* Theme variables */
import './theme/variables.css';
import {VueFire, VueFireAuth} from "vuefire";
import {firebaseApp} from './firebase';
import {createStore} from "vuex";
import createPersistedState from "vuex-persistedstate";
import {UserCredential} from "@firebase/auth";


const app = createApp(App)
    .use(IonicVue)
    .use(router)
    .use(VueFire, {
        firebaseApp,
        modules: [
            VueFireAuth(),
        ]
    });

const store = createStore(
    {
        state() {
            return {
                // User object of type UserCredential from firebase being null by default
                user: null as UserCredential | null
            }
        },
        mutations: {
            // Mutation to set user
            setUser(state: { user: UserCredential | null; }, user: UserCredential | null) {
                console.log("Setting user to: ", user);
                state.user = user;
            }
        },
        plugins: [createPersistedState({storage: window.sessionStorage})],
    }
)

app.use(store);
router.isReady().then(() => {
    app.mount('#app');
});

