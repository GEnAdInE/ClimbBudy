<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>Route Details</ion-title>
    </ion-toolbar>
  </ion-header>

  <ion-content>
    <ion-card>
      <ion-card-header>
        <ion-card-subtitle>Name: {{route.name}}</ion-card-subtitle>
        <ion-card-title>Difficulty: {{route.difficulty}}</ion-card-title>
      </ion-card-header>

      <ion-card-content>
        {{route.description}}
      </ion-card-content>
    </ion-card>

    <ion-list>
      <ion-list-header>
        <ion-label>Comments</ion-label>
      </ion-list-header>

      <ion-item v-for="comment in comments" :key="comment.id">
        <ion-avatar slot="start">
          <img :src="comment.userAvatar"/>
        </ion-avatar>
        <ion-label>
          <h2>{{comment.userName}}</h2>
          <p>{{comment.text}}</p>
        </ion-label>
        <ion-thumbnail @click="openModal(comment)" v-if="comment.mediaType === 'image'" slot="end">
          <img :src="comment.mediaUrl"/>
        </ion-thumbnail>
        <ion-icon @click="openModal(comment)" v-if="comment.mediaType === 'video'" slot="end" name="videocam"/>
      </ion-item>
    </ion-list>

    <ion-item>
      <ion-textarea placeholder="Add a comment"></ion-textarea>
      <ion-button slot="end" @click="addComment">Add</ion-button>
      <ion-button slot="end" @click="addMedia">
        <ion-icon name="camera"/>
      </ion-button>
    </ion-item>
  </ion-content>

  <ion-modal v-if="selectedMedia" :is-open="showModal">
    <ion-header>
      <ion-toolbar>
        <ion-title>Preview</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="closeModal">
            <ion-icon name="close"/>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <img v-if="selectedMedia.mediaType === 'image'" :src="selectedMedia.mediaUrl"/>
      <video v-if="selectedMedia.mediaType === 'video'" :src="selectedMedia.mediaUrl" controls></video>
    </ion-content>
  </ion-modal>
</template>

<script>
export default {
  data() {
    return {
      route: {
        name: 'El Capitan',
        difficulty: '5.11a',
        description: 'A iconic big wall route in Yosemite National Park, California.'
      },
      comments: [
        {
          id: 1,
          userName: 'John Doe',
          userAvatar: 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mm&s=50',
          text: 'Great route, highly recommended!',
          mediaType: 'image',
          mediaUrl: 'https://picsum.photos/500/500'
        },
        {
          id: 2,
          userName: 'Jane Doe',
          userAvatar: 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mm&s=50',
          text: 'Tough climb, but worth it!',
          mediaType: 'video',
          mediaUrl: 'https://www.sample-videos.com/video123/mp4/720/big_buck_bunny_720p_20mb.mp4'
        }
      ],
      showModal: false,
      selectedMedia: null
    }
  },
  methods: {
    addComment() {
      // Implement adding a comment
    },
    addMedia() {
      // Implement adding a photo or video
    },
    openModal(media) {
      this.selectedMedia = media
      this.showModal = true
    },
    closeModal() {
      this.selectedMedia = null
      this.showModal = false
    }
  }
}
</script>
