<template>
    <div class="image full sprite_button" 
    :style="`--image-size: ${imageSize}px; --image-offset-1: ${imageSize * -1}px; --image-offset-2: ${imageSize * -2}px; --font-size: ${fontSize}px;`">
        <img :src="imagePath" class="image" alt="Button Image">
    </div>
</template>

<script>
export default {
    name: "SpriteButton",
    props: {
        imagePath: {
            type: String,
            required: true
        },
        imageSize: {
            type: Number,
            required: true
        },
        buttonText: {
            type: String,
            required: true
        },
        fontSize: {
            type: Number,
            default: 32
        },
    }
};
</script>

<style scoped>

.full {
  width: 100%;
}
.sprite_button {
  /* background-color: red; */
  max-width: var(--image-size);
  min-width: var(--image-size);
  left: 0px;
  height: auto;
  overflow: hidden;
  filter:drop-shadow(6px 6px 0px #4444778F);
}

.sprite_button .image {
  height: auto;
}

.sprite_button:hover .image {
  transform: translateX(var(--image-offset-1));
}

.sprite_button:active .image {
  transform: translateX(var(--image-offset-2));
}
</style>