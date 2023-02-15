<template>
<ion-page :class="{ activescann : isScanning, notactivescann : !isScanning }">
  <ion-header :translucent="true">
    <ion-toolbar>
      <ion-title>Climb buddy</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-fab slot="fixed" vertical="bottom" horizontal="end">
    <ion-fab-button @click="goBack()">
      <ion-icon :icon="arrowBackCircleOutline"></ion-icon>
    </ion-fab-button>
  </ion-fab>
  <div v-if="isScanning" class="scan-box"></div>
</ion-page>

</template>

<script>
import {BarcodeScanner, SupportedFormat} from '@capacitor-community/barcode-scanner';
import {arrowBackCircleOutline} from "ionicons/icons";
import {
  IonFab, IonFabButton,
  IonHeader, IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
  isPlatform,
  toastController
} from "@ionic/vue";
import router from "@/router";

export default {
  name: "CameraPage",
  components: {
    IonPage,
    IonFab,
    IonFabButton,
    IonIcon,
    IonHeader,
    IonToolbar,
    IonTitle,
  },
  data(){
    return{
      qr: '',
      isScanning: false,
    }

  },
  methods:{
    goBack(){
      if(!isPlatform('desktop') && !isPlatform('mobileweb')){
        BarcodeScanner.stopScan();
        this.realShow();
      }

      router.push("/home")


    },
    realShow(){
      BarcodeScanner.showBackground();
      document.querySelector('body').classList.remove('scanner-active');
      if(isPlatform('ios')){
        document.querySelector('.ios body').style.setProperty('--ion-background-color', 'black');

      }
      if(isPlatform('android')){
        document.querySelector('.md body').style.setProperty('--ion-background-color', 'black');
      }
    },
    realHide(){

      BarcodeScanner.showBackground();
      document.querySelector('body').classList.add('scanner-active');
      if(isPlatform('ios')) {
        document.querySelector('.ios body').style.setProperty('--ion-background-color', 'transparent');

      }
      if(isPlatform('android')) {
        document.querySelector('.md body').style.setProperty('--ion-background-color', 'transparent');
      }
    }

  },
  setup(){
    return{
      arrowBackCircleOutline
    }
  },
  ionViewDidEnter() {
    if(isPlatform('desktop') || isPlatform('mobileweb')) {
      toastController.create({
        message: "Don't work on web !!",
        duration: 1500,
        position: 'middle',
        color: 'warning',
      }).then((toast) => {
        toast.present();
      });
    }else{
      BarcodeScanner.prepare();
      this.isScanning = true;
      this.realHide();

      BarcodeScanner.startScan({ targetedFormats: [SupportedFormat.QR_CODE] }).then((data) => {
        console.log(data);
        this.qr = data.content;


        if(data.hasContent){
          if(data.content.startsWith("https://climbbudy.web.app/")){
            router.push(data.content.split("https://climbbudy.web.app")[1]);
            BarcodeScanner.stopScan();
            this.isScanning = false;
            this.realShow();
          }
          else {
            toastController.create({
              message: "Not a valid QR Code",
              duration: 1500,
              position: 'middle',
              color: 'pink',

            }).then((toast) => {
              toast.present();
            });
          }
        }

      });
    }



  },

}
</script>

<style scoped>

.activescann{
  background: #FFFFFF00;
}

.notactivescann{
  background: black; ;
}

.scan-box{
  border: 2px solid #FFFFFF;
  box-shadow: 0 0 0 100vmax rgba(0, 0, 0, 0.5);
  content: '';
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 300px;
  height: 300px;
  background: #FFFFFF00;
  transform: translate(-50%, -50%);

}

</style>