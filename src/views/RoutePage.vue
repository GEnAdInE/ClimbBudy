<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Climb buddy || PUT NAME OF CENTER HERE</ion-title>

      </ion-toolbar>

    </ion-header>
    <ion-content class="ion-padding">

      <ion-fab slot="fixed" vertical="top" horizontal="end" :edge="true">
        <ion-fab-button color="tertiary">
          <ion-icon :icon="chevronDownCircle"></ion-icon>
        </ion-fab-button>
        <ion-fab-list side="bottom">
          <ion-fab-button color="light" @click="createImage()">
            <ion-icon :icon="shareOutline"></ion-icon>
          </ion-fab-button>
          <ion-fab-button @click="showModal()"  color="light" >
            <ion-icon :icon="createOutline"></ion-icon>
          </ion-fab-button>
        </ion-fab-list>
      </ion-fab>


     <!-- ici remplacer tout les props pas juste un seul props detail -->

      <RouteDetail slot="fixed" :color="details.color" :icon="details.icon" :author="details.author" :description="details.description" :difficulty="details.difficulty" :location="details.location" :name="details.name"></RouteDetail>
      <ion-modal :is-open="isModalOpen" >
        <ion-header>
          <ion-toolbar>
            <ion-title>Edit Route</ion-title>
            <ion-button color="danger" shape="round" @click="showModal()" slot="end">CLOSE</ion-button>
          </ion-toolbar>
        </ion-header>

        <ion-content>
          <EditRouteDetails :details="details" @saved="handleSave"></EditRouteDetails>
          <ion-button expand="block" color="danger" @click="deleted()"> REMOVE ROUTE</ion-button>

        </ion-content>
      </ion-modal>


    </ion-content>
    <ion-content>
    <div :id="'square'+details.id" class="square">
      <div class="top-left">{{ details.difficulty }}</div>
      <div class="top-right">{{ details.difficulty }}</div>
      <div class="bottom-left">{{ details.difficulty }}</div>
      <div class="bottom-right">{{ details.difficulty }}</div>
      <div class="title">
        <ion-label >{{ details.name }}</ion-label>
      </div>
      <div class="center">
        <div :id="'qr'+details.id" class="qr"></div>
        <ion-grid>
          <ion-row>
            <ion-col size="8" >
              <ion-label color="superdark" >Pied relief</ion-label>
            </ion-col>
            <ion-col size="3">
              <ion-label color="superdark" >Oui</ion-label>
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col size="8" >
              <ion-label color="superdark" >Main relief</ion-label>
            </ion-col>
            <ion-col size="3">
              <ion-label color="superdark" >Oui</ion-label>
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col size="8">
              <ion-label color="superdark">Diedre</ion-label>
            </ion-col>
            <ion-col size="3">
              <ion-label color="superdark" >Oui</ion-label>
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col size="8">
              <ion-label color="superdark" >Diedre</ion-label>
            </ion-col>
            <ion-col size="3">
              <ion-label color="superdark" >Oui</ion-label>
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col size="8">
              <ion-label color="superdark" >Diedre</ion-label>
            </ion-col>
            <ion-col size="3">
              <ion-label color="superdark" >Oui</ion-label>
            </ion-col>
          </ion-row>
        </ion-grid>
      </div>
    </div>

    </ion-content>
  <!-- ici component commentaires -->

    <ion-fab slot="fixed" vertical="bottom" horizontal="end">
      <ion-fab-button @click="goBack()">
        <ion-icon :icon="arrowBackCircleOutline"></ion-icon>
      </ion-fab-button>
    </ion-fab>
  </ion-page>
</template>

<script>


import {
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonPage,
  IonButton,
  IonTitle,
  IonToolbar,
  IonModal,
  IonInput,
  IonLabel, IonRow, IonGrid, IonCol, IonFabList
} from "@ionic/vue";
import router from "@/router";
import {onMounted, ref, toRefs} from "vue";
import {CenterServices} from "@/services/center-services";
import {Route} from "@/data/route";
import {arrowBackCircleOutline, chevronDownCircle, createOutline, shareOutline} from "ionicons/icons";
import RouteDetail from "@/components/RouteDetail";
import EditRouteDetails from "@/components/EditRouteDetails";
import QRCodeStyling from "qr-code-styling";
import * as htmlToImage from "html-to-image";
import * as download from "downloadjs";
export default {
  name: "RoutePage",
  components: {RouteDetail, IonPage, IonHeader, IonToolbar, IonTitle,IonIcon,IonFab,IonFabButton,IonContent,IonModal,IonButton,EditRouteDetails,IonLabel,IonCol,IonGrid,IonRow,IonFabList},
  data() {
    return {
      details: Route,
      isModalOpen : false,
    }
  },
  methods:{
    goBack(){
      router.push('/centers/' + this.$route.params.centerId);
    },
    showModal(){
      this.isModalOpen = !this.isModalOpen
    },
    handleSave(e){
      this.showModal();
      console.log(e);
      // update route where params of e not equals to ''

    },
    deleted(){
      console.log("deleted");
      //delete route
    },
    createQrCode(){
      const centerid = this.$route.params.centerId;
      const routeid = this.$route.params.routeId;
      const url = "https://climbbudy.web.app/centers/" + centerid + "/routes/" + routeid;
      const qrCode = new QRCodeStyling({

        width: 300,
        height: 300,
        data: url,
        margin: 0,
        image : require("../../public/assets/qrlogo.png"),
        qrOptions: {
        typeNumber: "0",
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
        dotsOptionsHelper: {
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
      },
        cornersSquareOptions: {
          type: "dot",
              color: "#000000"
        },
        cornersSquareOptionsHelper: {
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
        cornersDotOptions: {
          type: "dot",
              color: "#000000"
        },
        cornersDotOptionsHelper: {
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


      })

      qrCode.append(document.getElementById('qr'+this.details.id));


      //qrCode.download({ name: "qr", extension: "png" });
    },
    createImage(){
      const node = document.getElementById('square'+this.details.id);
      node.style.visibility = "visible";
      node.style.background = getComputedStyle(document.documentElement)
          .getPropertyValue('--ion-color-'+this.details.color);


      htmlToImage.toPng(node)
          .then(function (dataUrl) {
            node.style.visibility = "hidden";
            download(dataUrl, 'my-node.png');

          });
    }
  },

  mounted() {
    //get route details
    CenterServices.getCenterAsync(this.$route.params.centerId).then((center) => {
      center.routes.forEach((route) => {
        if (route.id == this.$route.params.routeId) {
          this.details = route;
        }
      });


    });
    this.createQrCode();

  },
  setup(){
   return{
     arrowBackCircleOutline,
     createOutline,
     chevronDownCircle,
     shareOutline,
   }
  }



}

</script>

<style scoped>

.square {
  visibility: hidden;
  background-color: #f1c40f;
  height: 500px;
  width: 650px;
  position: relative;
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
ion-col{
  border : 2px solid #000000;
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
  display: flex ;
  justify-content: center;
  font-size: 40px;
  font-weight: bold;
  margin-bottom: 16px;
}
.qr{
  margin-right: 2vw;
}



</style>