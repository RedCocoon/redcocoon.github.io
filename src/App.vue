<script setup>
import TopBar from './components/TopBar.vue'
import ParallaxBackground from './components/ParallaxBackground.vue'
import SpriteButton from './components/SpriteButton.vue';
import LinkedSpriteButton from './components/LinkedSpriteButton.vue';
import "./style.css";

const pfpImagePath = new URL('./assets/textures/main_pfp.png', import.meta.url).href;
const asepriteImagePath = new URL('./assets/textures/buttons/aseprite_plugins.png', import.meta.url).href;
const collectibleImagePath = new URL('./assets/textures/buttons/collectible.png', import.meta.url).href;
const discordImagePath = new URL('./assets/textures/buttons/discord.png', import.meta.url).href;
const gamesImagePath = new URL('./assets/textures/buttons/games.png', import.meta.url).href;
const itchImagePath = new URL('./assets/textures/buttons/itch_io.png', import.meta.url).href;
const merchImagePath = new URL('./assets/textures/buttons/merch.png', import.meta.url).href;
</script>

<template>
  <TopBar/>
  <div class="full absolute">
    <div class="left-bar justify-center items-center flex">
      <div class="about-grid grid justify-center items-center">
        <SpriteButton
          style="margin:auto;"
          :imagePath="pfpImagePath"
          :imageSize="384"
        />
        <p>
          <b>Hi! I'm Red Cocoon!</b><br>
          <b>I'm a Pixel Artist</b><br>
          <b>and a Game Developer!</b>
        </p>
      </div>
    </div>
  </div>
  <ParallaxBackground/>
  <div id="projects" class="full absolute justify-center items-center flex">
    <img src="./assets/textures/stone_background.png" alt="Stone Background" class="absolute full pixelated">
    <div class="bottom-container grid">
      <LinkedSpriteButton
      :link="'https://github.com/RedCocoon/AsepriteSiphon'"
      :imagePath="asepriteImagePath"
      :imageSize="384"
      :buttonText="'Ase Plugins'"
      :fontSize="64"
      />
      <LinkedSpriteButton
      :imagePath="collectibleImagePath"
      :imageSize="384"
      :buttonText="'Collectible'"
      :fontSize="64"
      />
      <LinkedSpriteButton
      :link="'https://discord.gg/QfwFmqU'"
      :imagePath="discordImagePath"
      :imageSize="384"
      :buttonText="'Discord'"
      :fontSize="64"
      />
      <LinkedSpriteButton
      :imagePath="gamesImagePath"
      :imageSize="384"
      :buttonText="'Mini Games'"
      :fontSize="64"
      />
      <LinkedSpriteButton
      :link="'https://redcocoon.itch.io/'"
      :imagePath="itchImagePath"
      :imageSize="384"
      :buttonText="'Itch.io'"
      :fontSize="64"
      />
      <LinkedSpriteButton
      :imagePath="merchImagePath"
      :imageSize="384"
      :buttonText="'Merch'"
      :fontSize="64"
      />
    </div>
  </div>
</template>

<style lang="css" scoped>
p {
    font-family: Bitfantasy;
    font-size: 48px;
    text-align: center;
    color: white;
    text-size-adjust: auto;
    filter: drop-shadow(1px 1px 1px #000000);
}
.absolute {
    position: absolute;
}
.left-bar{
    background-color: rgba(24, 33, 41, 0.75);
    width: 30%;
    height: 100%;
}
.about-grid {
    gap: 0px;
    row-gap: 0px;
    grid-template-columns: repeat(1, 1fr);
    grid-template-rows: repeat(2, 0.7fr);
}
.bottom-container {
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  column-gap: 1.5rem;
}
</style>