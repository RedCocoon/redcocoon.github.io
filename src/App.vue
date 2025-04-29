<script setup>
import TopBar from './components/TopBar.vue'
import ParallaxBackground from './components/ParallaxBackground.vue'
import SpriteButton from './components/SpriteButton.vue';

const imagePath = new URL('./assets/textures/main_pfp.png', import.meta.url).href;
</script>

<template>
  <TopBar/>
  <SpriteButton
    :imagePath="imagePath"
    :imageSize="384"
    />
  <ParallaxBackground/>
</template>