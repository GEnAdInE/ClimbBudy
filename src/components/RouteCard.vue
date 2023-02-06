<template>
  <ion-card :color="color" >  <!-- color of the route -->
    <ion-card-header>
      <ion-card-title>{{ name }}   {{icon}}</ion-card-title> <!-- name of the route -->
      <ion-card-subtitle><ion-chip color="light">{{ difficulty }}</ion-chip></ion-card-subtitle> <!-- difficulty -->

    </ion-card-header>

    <ion-card-content>
      By {{ author }}<br>
      In sector {{ location }}<br>
      {{description }}<br>
      {{ tips }}<br>
    </ion-card-content>
  </ion-card>
</template>

<script lang="ts">
export default {
  name: "RouteCard",
  props: ['color','name','icon','difficulty','author','tips','description','location'],
}
</script>

<style scoped>

</style>