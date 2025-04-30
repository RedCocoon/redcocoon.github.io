<script setup>
import SpriteButton from './SpriteButton.vue';
import "../style.css";
</script>

<template>
    <a :href="link" target="_blank" class="linked-sprite-button" style="text-decoration: none">
        <SpriteButton
        :imagePath="imagePath"
        :imageSize="imageSize"
        :buttonText="buttonText"
        :fontSize="fontSize"
        />
    </a>
</template>

<script>
export default {
    name: "SpriteButton",
    props: {
        link: {
            type: String,
            default: ''
        },
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
            default: ''
        },
        fontSize: {
            type: Number,
            default: 32
        },
    }
};
</script>