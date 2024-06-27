<template>
  <main>
    <section>
      <h1>App Vue</h1>
    </section>

    <section>
      <h2>Stencil Components</h2>
      <div class="component-row">
        <my-button />
      </div>
    </section>
  </main>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
