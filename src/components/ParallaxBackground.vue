<template>
    <div class="root">
      <img ref="background" class="background" src="../assets/tree-1.jpg" />
      <img
        ref="foreground"
        class="foreground"
        src="../assets/tree-foreground.png"
      />
      <div ref="first" class="section section-1">
        <div>
          <h1>Parallax Made Easy.</h1>
        </div>
      </div>
      <div ref="second" class="section section-2">
        <div>
          <h2>Here's more info</h2>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit...</p>
        </div>
      </div>
    </div>
</template>

<script>
export default {
    name: "ParallaxBackground"
};
</script>