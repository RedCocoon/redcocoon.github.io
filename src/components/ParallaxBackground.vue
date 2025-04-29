<script setup lang="ts">
import Parallaxy from '@lucien144/vue3-parallaxy';
</script>

<template>
    <div class="flex justify-center items-center fill">
        <Parallaxy :speed="0" :direction="opposite"  class="absolute z-20 flex justify-start items-center">
            <img src="../assets/textures/main_background_3.png" alt="Clouds Background" class="fill pixelated">
        </Parallaxy>
        <Parallaxy :speed="20" :direction="opposite"  class="absolute z-20 flex justify-start items-center">
            <img src="../assets/textures/main_background_2.png" alt="Trees Background" class="fill pixelated">
        </Parallaxy>
        <Parallaxy :speed="80" :direction="opposite" class="absolute z-20 flex justify-start items-center">
            <img src="../assets/textures/main_background_1.png" alt="Plains Background" class="fill pixelated">
        </Parallaxy>
        <Parallaxy :speed="160" :direction="opposite" class="absolute z-20 flex justify-start items-center">
            <img src="../assets/textures/main_background_0.png" alt="Branches Background" class="fill pixelated">
        </Parallaxy>
    </div>
</template>

<style scoped>
.fill {
    width: 100vw;
    height: 100vh;
    object-fit: cover;
}
.items-center {
    align-items: center;
}
.flex {
    display: flex;
}
.justify-start {
    justify-content: flex-start;
}
.justify-center {
    justify-content: center;
}
.relative {
    position: relative;
}
.absolute {
    position: absolute;
}
.z-20 {
    z-index: -1;
}
.pixelated {
  height: auto; /* Maintain aspect ratio */
  image-rendering: pixelated; /* For pixelated rendering */
  image-rendering: crisp-edges; /* Alternative for crisp edges */
}
::backdrop {
    background-color: color("61b4c7");
}
</style>