<template>
    <ion-page v-if="routeRef">
        <ion-header :translucent="true">
            <ion-toolbar>
                <ion-title>Climb buddy | {{routeRef.center.name}}</ion-title>

            </ion-toolbar>

        </ion-header>
        <ion-content class="ion-padding" :scroll-events="false">

            <ion-fab slot="fixed" :edge="true" horizontal="end" vertical="top">
                <ion-fab-button color="tertiary" :disabled="false">
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


            <!--TODO: ici remplacer tout les props pas juste un seul props detail -->

            <RouteDetail :route="routeRef"></RouteDetail>
            <div class="comment-title">
                <ion-label>Comments :</ion-label>
                <img id="testtoto" />
            </div>


                <!-- For each messages in "messages" -->
            <CommentListItem v-for="comment in routeRef.comments" :key="comment.id" :comment="comment"/>

            <ion-button id="click-trigger" color="secondary" expand="block" shape="round" strong="strong"
                        style="margin-top: 2vh" @click="showCommentPopover($event)">Add a comment
            </ion-button>
            <ion-popover alignment="center" side="top" ref="sendCommentPopover" :is-open="state.isPopoverOpen" @didDismiss="state.isPopoverOpen = false" :event="state.event">
                <ion-content > <!-- TODO: transform in component -->
                    <ion-card>
                        <ion-card-header>
                            <ion-card-title>Adding a comment</ion-card-title>
                        </ion-card-header>
                        <ion-card-content>
                            <ion-item>
                                <ion-label position="floating">Your text</ion-label>
                                <ion-input id="commentText"></ion-input>

                            </ion-item>
                          <div style="display: flex; margin-top: 2vh">
                            <ion-button id="send-btn" color="success" expand="full"  @click="sendComment()">
                              Send
                            </ion-button>
                            <ion-button @click="pickMyImages()">
                              <ion-icon :src="imagesOutline" ></ion-icon>
                            </ion-button>
                          </div>
                        </ion-card-content>
                    </ion-card>

                </ion-content>
            </ion-popover>

            <ion-modal :is-open="state.isModalOpen">
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

        <ion-fab slot="fixed" horizontal="end" vertical="bottom">
            <ion-fab-button @click="goBack()">
                <ion-icon :icon="arrowBackCircleOutline"></ion-icon>
            </ion-fab-button>
        </ion-fab>

        <!-- Image maker -->
        <div :id="'square'+routeRef.id" class="square">
            <div class="top-left">{{ routeRef.difficulty }}</div>
            <div class="top-right">{{ routeRef.difficulty }}</div>
            <div class="bottom-left">{{ routeRef.difficulty }}</div>
            <div class="bottom-right">{{ routeRef.difficulty }}</div>
            <div class="title-top">
                <ion-label>{{ routeRef.name }}</ion-label>
            </div>
          <div class="title-bottom">
            <ion-label>{{ routeRef.name }}</ion-label>
          </div>
            <div class="center">
                <div ref="qr" id="qr" class="qr"></div>
                <ion-grid>
                    <ion-row :key="item" v-for="[val,item] in cardConverted()" >
                        <ion-col size="8">
                            <ion-label color="superdark">{{item}}</ion-label>
                        </ion-col>
                        <ion-col size="3">
                            <ion-label color="superdark">{{convertTrueFalse(val)}}</ion-label>
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
    IonPage,
    IonPopover,
    IonRow,
    IonTitle,
    IonToolbar,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonItem,
    IonImg
} from "@ionic/vue";
import router from "@/router";
import {Route} from "@/data/route";
import {arrowBackCircleOutline, chevronDownCircle, createOutline, imagesOutline, shareOutline} from "ionicons/icons";
import RouteDetail from "@/components/RouteDetail.vue";
import EditRouteDetails from "@/components/EditRouteDetails.vue";
import QRCodeStyling from "qr-code-styling";
import * as htmlToImage from "html-to-image";
import CommentListItem from "@/components/CommentListItem.vue";
import {nextTick, onMounted, reactive, ref} from "vue";
import {RouteServices} from "@/services/route-services";
import {Comment} from "@/data/comment";
import {CommentServices} from "@/services/comment-services";

import {pickImages} from "@/services/fstorage-service";

import {Center} from "@/data/center";

const sendCommentPopover = ref();

const qr =  ref<HTMLElement>();
const routeRef = ref<Route>();
const state = reactive({
      isModalOpen : false,
      isPopoverOpen : false,
      event : null,
      theblob: null,
    }
);
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

function cardConverted(){
  const mapp = new Map<string,boolean>();

  routeRef.value?.card?.forEach((item: any) => {
    const spliter = item.split(':');
    if(spliter[1] == "true"){
      mapp.set(spliter[0],true);
    }else{
      mapp.set(spliter[0],false);
    }
  });
  return mapp;
}

function convertTrueFalse(value: boolean){
    if(value){
        return "Yes";
    } else {
        return "No";
    }
}
function goBack() {
    router.push('/centers/' + props.centerId);
}

function showModal() {
    state.isModalOpen = !state.isModalOpen
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
    console.log(state.theblob)
    if(state.theblob !== null)
      comment.blobimages.push(state.theblob)

    if (await CommentServices.addComment(comment)) {

        routeRef.value.comments.push(comment);
    }

    // Force the popover to close
    sendCommentPopover.value.$el.dismiss();
}

function handleSave(route: any) {
    showModal();
    console.log(route satisfies Route);
    // update route where params of route not equals to ''

}

function deleted() {
    console.log("deleted");
    //delete route
}
function getImage() {
  const storageRef = fstorage.ref(storage,"/images/"+"id"); //todo: add id
  fstorage.getDownloadURL(storageRef)
      .then((url) => {
        console.log(url)
        document?.getElementById("testtoto")?.setAttribute("src",url);
      }
      ).catch((error) => {
    console.log(error);
  });

}

async function pickMyImages() {

  pickImages().then( (res : any) => {
   console.log(res)

    state.theblob = res;

 });

}

function showCommentPopover(event: any) {
    state.event = event;
    state.isPopoverOpen = !state.isPopoverOpen
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

    qrCode.append(qr.value);
    console.log(qr.value)

    //qrCode.download({ name: "qr", extension: "png" });
}


function createImage() {
  console.log(qr.value)

  const node = document.getElementById('square' + routeRef.value?.id);

    // Ensure the node exists
    if (!node) return;

    node.style.visibility = "visible";
    node.style.background = getComputedStyle(document.documentElement)
        .getPropertyValue('--ion-color-' + routeRef.value?.color);


    htmlToImage.toPng(node)
        .then(function (dataUrl) {
          console.log(dataUrl)
            node.style.visibility = "hidden";
          // assume that the image data is stored in a Blob object called "imageBlob"
          const downloadLink = document.createElement("a");
          downloadLink.href = dataUrl;
          downloadLink.download = "card.png"
          downloadLink.click();

        });
}
//access the $refs object from the template
//const qrCode = ref<QRCodeStyling>();
onMounted(async () => {
    //get route details
    routeRef.value = await RouteServices.getRouteAsync(props.centerId, props.routeId, true);
    await  nextTick()
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
    top: 5px;
    left: 5px;
}

.top-right {
    top: 5px;
    right: 5px;
}

.bottom-left {
    bottom:   5px;
    left: 5px;
}

.bottom-right {
    bottom: 5px;
    right: 5px;
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

.title-top {
    display: flex;
    justify-content: center;
    font-size: 40px;
    font-weight: bold;
    margin-bottom: 10px;
    margin-top: 5px;
}

.title-bottom {
    display: flex;
    justify-content: center;
    font-size: 40px;
    font-weight: bold;
    margin-top: 390px;
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