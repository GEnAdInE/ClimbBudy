<template>
<ion-page :class="{ activescann : isScanning, notactivescann : !isScanning }">
  <ion-header :translucent="true">
    <ion-toolbar>
      <ion-title>Climb buddy</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-label>{{qr}}</ion-label>
  <ion-button @click="goBack()" style="z-index: 9; float: bottom">GoBack</ion-button>
  <div v-if="isScanning" class="scan-box"></div>
</ion-page>

</template>

<script>
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import {IonButton, IonHeader, IonLabel, IonPage, IonTitle, IonToolbar} from "@ionic/vue";
import router from "@/router";

export default {
  name: "CameraPage",
  components: {
    IonPage,
    IonButton,
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
      router.push("/home")
      BarcodeScanner.stopScan();

    },

  },
  mounted() {

     BarcodeScanner.prepare();
    this.isScanning = true;
    //BarcodeScanner.hideBackground();
    document.querySelector('body').classList.add('scanner-active');
    document.querySelector('.md body').style.setProperty('--ion-background-color', 'transparent');

    BarcodeScanner.startScan().then((data) => {
      console.log(data);
      this.qr = data.content;
      this.isScanning = false;
      document.querySelector('body').classList.remove('scanner-active');
      document.querySelector('.md body').style.setProperty('--ion-background-color', 'black');
      BarcodeScanner.stopScan();
      router.push("/routes/"+data.content);


    });
  }
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