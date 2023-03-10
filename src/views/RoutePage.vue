<template>
    <ion-page v-if="routeRef">
        <ion-header :translucent="true">
            <ion-toolbar>
                <ion-title>Climb buddy || PUT NAME OF CENTER HERE</ion-title>

            </ion-toolbar>

        </ion-header>
        <ion-content class="ion-padding">

            <ion-fab slot="fixed" :edge="true" horizontal="end" vertical="top">
                <ion-fab-button color="tertiary">
                    <ion-icon :icon="chevronDownCircle"></ion-icon>
                </ion-fab-button>
                <ion-fab-list side="bottom">
                    <ion-fab-button color="light" @click="createImage()">
                        <ion-icon :icon="shareOutline"></ion-icon>
                    </ion-fab-button>
                    <ion-fab-button color="light" @click="showModal()">
                        <ion-icon :icon="createOutline"></ion-icon>
                    </ion-fab-button>
                </ion-fab-list>
            </ion-fab>


            <!-- ici remplacer tout les props pas juste un seul props detail -->

            <RouteDetail :author="routeRef.author" :color="routeRef.color" :description="routeRef.description"
                         :difficulty="routeRef.difficulty" :icon="routeRef.icon"
                         :location="routeRef.location" :name="routeRef.name"></RouteDetail>
            <div class="comment-title">
                <ion-label>Comments :</ion-label>
            </div>

            <ion-content style="height: 50vh" scroll-y="scroll-y">
                <!-- For each messages in "messages" -->
                <CommentListItem v-for="comment in routeRef.comments" :key="comment.id" :comment="comment"/>
            </ion-content>
            <ion-button id="click-trigger" color="secondary" expand="block" shape="round" strong="strong"
                        style="margin-top: 2vh">Add a comment
            </ion-button>
            <ion-popover ref="sendCommentPopover" alignment="center" side="top" trigger="click-trigger" trigger-action="click">
                <ion-content>
                    <ion-card>
                        <ion-card-header>
                            <ion-card-title>Adding a comment</ion-card-title>
                        </ion-card-header>
                        <ion-card-content>
                            <ion-item>
                                <ion-label position="floating">Your text</ion-label>
                                <ion-input id="commentText"></ion-input>

                            </ion-item>
                            <ion-button id="send-btn" color="success" expand="block" style="margin-top: 2vh" @click="sendComment()">
                                Send
                            </ion-button>
                        </ion-card-content>
                    </ion-card>

                </ion-content>
            </ion-popover>

            <ion-modal :is-open="isModalOpen">
                <ion-header>
                    <ion-toolbar>
                        <ion-title>Edit Route</ion-title>
                        <ion-button slot="end" color="danger" shape="round" @click="showModal()">CLOSE</ion-button>
                    </ion-toolbar>
                </ion-header>

                <ion-content>
                    <EditRouteDetails :details="routeRef" @saved="handleSave"></EditRouteDetails>
                    <ion-button color="danger" expand="block" @click="deleted()"> REMOVE ROUTE</ion-button>

                </ion-content>
            </ion-modal>


        </ion-content>


        <!-- ici component commentaires -->

        <ion-fab slot="fixed" horizontal="end" vertical="bottom">
            <ion-fab-button @click="goBack()">
                <ion-icon :icon="arrowBackCircleOutline"></ion-icon>
            </ion-fab-button>
        </ion-fab>

        <div :id="'square'+routeRef.id" class="square">
            <div class="top-left">{{ routeRef.difficulty }}</div>
            <div class="top-right">{{ routeRef.difficulty }}</div>
            <div class="bottom-left">{{ routeRef.difficulty }}</div>
            <div class="bottom-right">{{ routeRef.difficulty }}</div>
            <div class="title">
                <ion-label>{{ routeRef.name }}</ion-label>
            </div>
            <div class="center">
                <div :id="'qr'+routeRef.id" class="qr"></div>
                <ion-grid>
                    <ion-row>
                        <ion-col size="8">
                            <ion-label color="superdark">Pied relief</ion-label>
                        </ion-col>
                        <ion-col size="3">
                            <ion-label color="superdark">Oui</ion-label>
                        </ion-col>
                    </ion-row>
                    <ion-row>
                        <ion-col size="8">
                            <ion-label color="superdark">Main relief</ion-label>
                        </ion-col>
                        <ion-col size="3">
                            <ion-label color="superdark">Oui</ion-label>
                        </ion-col>
                    </ion-row>
                    <ion-row>
                        <ion-col size="8">
                            <ion-label color="superdark">Diedre</ion-label>
                        </ion-col>
                        <ion-col size="3">
                            <ion-label color="superdark">Oui</ion-label>
                        </ion-col>
                    </ion-row>
                    <ion-row>
                        <ion-col size="8">
                            <ion-label color="superdark">Diedre</ion-label>
                        </ion-col>
                        <ion-col size="3">
                            <ion-label color="superdark">Oui</ion-label>
                        </ion-col>
                    </ion-row>
                    <ion-row>
                        <ion-col size="8">
                            <ion-label color="superdark">Diedre</ion-label>
                        </ion-col>
                        <ion-col size="3">
                            <ion-label color="superdark">Oui</ion-label>
                        </ion-col>
                    </ion-row>
                </ion-grid>
            </div>
        </div>
    </ion-page>

</template>

<script lang="ts" setup>


import {
    IonButton,
    IonCol,
    IonContent,
    IonFab,
    IonFabButton,
    IonFabList,
    IonGrid,
    IonHeader,
    IonIcon,
    IonInput,
    IonLabel,
    IonModal,
    IonPage, IonPopover,
    IonRow,
    IonTitle,
    IonToolbar
} from "@ionic/vue";
import router from "@/router";
import {Route} from "@/data/route";
import {arrowBackCircleOutline, chevronDownCircle, createOutline, shareOutline} from "ionicons/icons";
import RouteDetail from "@/components/RouteDetail";
import EditRouteDetails from "@/components/EditRouteDetails";
import QRCodeStyling from "qr-code-styling";
import * as htmlToImage from "html-to-image";
import CommentListItem from "@/components/CommentListItem.vue";
import {onMounted, ref} from "vue";
import {RouteServices} from "@/services/route-services";
import {Comment} from "@/data/comment";
import {CommentServices} from "@/services/comment-services";

const sendCommentPopover = ref();

const routeRef = ref<Route>();
let isModalOpen = false;

const props = defineProps({
    centerId: {
        type: String,
        required: true
    },
    routeId: {
        type: String,
        required: true
    }
})

function goBack() {
    router.push('/centers/' + props.centerId);
}

function showModal() {
    isModalOpen = !isModalOpen
}

async function sendComment() {


    const sendBtn = document.getElementById("send-btn");

    if(sendBtn === null || sendCommentPopover.value === null) {
        console.error("Send button or popover is null");
        return;
    }

    // Disable the button
    sendBtn.setAttribute("disabled", "true");

    // Retrieve the comment data from the form
    const commentText = (document.getElementById("commentText") as HTMLInputElement).value;

    if (routeRef.value === undefined) {
        console.error("Route is undefined");
        sendBtn.removeAttribute("disabled");
        return;
    }

    const comment = new Comment("", routeRef.value, undefined, commentText, "");
    if (await CommentServices.addComment(comment)) {
        routeRef.value.comments.push(comment);
    }

    // Force the popover to close
    sendCommentPopover.value.$el.dismiss();
}

function handleSave(route: Route) {
    showModal();
    console.log(route);
    // update route where params of route not equals to ''

}

function deleted() {
    console.log("deleted");
    //delete route
}

function createQrCode() {
    const url = "https://climbbudy.web.app/centers/" + props.centerId + "/routes/" + props.routeId;
    const qrCode = new QRCodeStyling({
        width: 300,
        height: 300,
        data: url,
        margin: 0,
        image: require("../../public/assets/qrlogo.png"),
        qrOptions: {
            typeNumber: 0,
            mode: "Byte",
            errorCorrectionLevel: "Q"
        },
        imageOptions: {
            hideBackgroundDots: true,
            imageSize: 0.4,
            margin: 0
        },
        dotsOptions: {
            type: "rounded",
            color: "#000000"
        },
        backgroundOptions: {
            color: "#ffffff"
        },
        /*dotsOptionsHelper: {
            colorType: {
                single: true,
                gradient: false
            },
            gradient: {
                linear: true,
                radial: false,
                color1: "#6a1a4c",
                color2: "#6a1a4c",
                rotation: "0"
            }
        },*/
        cornersSquareOptions: {
            type: "dot",
            color: "#000000"
        },
        /*cornersSquareOptionsHelper: {
            colorType: {
                single: true,
                gradient: false
            },
            gradient: {
                linear: true,
                radial: false,
                color1: "#000000",
                color2: "#000000",
                rotation: "0"
            }
        },*/
        cornersDotOptions: {
            type: "dot",
            color: "#000000"
        },
        /*cornersDotOptionsHelper: {
            colorType: {
                single: true,
                gradient: false
            },
            gradient: {
                linear: true,
                radial: false,
                color1: "#000000",
                color2: "#000000",
                rotation: "0"
            }
        },
        backgroundOptionsHelper: {
            colorType: {
                single: true,
                gradient: false
            },
            gradient: {
                linear: true,
                radial: false,
                color1: "#ffffff",
                color2: "#ffffff",
                rotation: "0"
            }
        }
         */

    })

    const el = document.getElementById('qr' + routeRef.value?.id)
    if (!el) return;
    qrCode.append();


    //qrCode.download({ name: "qr", extension: "png" });
}


function createImage() {
    const node = document.getElementById('square' + routeRef.value?.id);

    // Ensure the node exists
    if (!node) return;

    node.style.visibility = "visible";
    node.style.background = getComputedStyle(document.documentElement)
        .getPropertyValue('--ion-color-' + routeRef.value?.color);


    htmlToImage.toPng(node)
        .then(function (dataUrl) {
            node.style.visibility = "hidden";
            //download(dataUrl, 'my-node.png');

        });
}
//access the $refs object from the template
//const qrCode = ref<QRCodeStyling>();
onMounted(async () => {
    //get route details
    routeRef.value = await RouteServices.getRouteAsync(props.centerId, props.routeId, true);
    createQrCode();

});


</script>

<style scoped>

.square {

    visibility: hidden;
    background-color: #f1c40f;
    height: 500px;
    width: 650px;
    position: fixed;
}

.top-left,
.top-right,
.bottom-left,
.bottom-right {
    position: absolute;
    font-size: 40px;
    font-weight: bold;
}

.top-left {
    top: 0;
    left: 0;
}

.top-right {
    top: 0;
    right: 0;
}

.bottom-left {
    bottom: 0;
    left: 0;
}

.bottom-right {
    bottom: 0;
    right: 0;
}

ion-col {
    border: 2px solid #000000;
    background: #FFFFFF;
}

.center {
    font-size: 40px;
    margin-left: 1vw;
    position: absolute;
    display: flex;
    top: 20%;
    justify-content: center;
    align-items: center;
    width: 100%;
}

.title {
    display: flex;
    justify-content: center;
    font-size: 40px;
    font-weight: bold;
    margin-bottom: 16px;
}

.qr {
    margin-right: 2vw;
}

.comment-title {
    display: flex;
    justify-items: center;

    margin-bottom: 0vh;
    margin-left: 2vw;
    font-size: 30px;
    font-weight: bold;
}


</style>