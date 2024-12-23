<script setup>
import { ref } from 'vue';
import { vue_backend } from 'declarations/vue_backend/index';
import Button from './components/ui/button/Button.vue';
import Header from './components/landing/Header.vue';
import Footer from './components/landing/Footer.vue';
let greeting = ref('');

async function handleSubmit(e) {
  e.preventDefault();
  const target = e.target;
  const name = target.querySelector('#name').value;
  await vue_backend.greet(name).then((response) => {
    greeting.value = response;
  });
}
</script>

<template>
  <div class="flex flex-col justify-between min-h-screen bg-black text-brand-white">
    <Header></Header>
    <RouterView />
    <Footer></Footer>

  </div>
  <!-- <main>
    <img src="/logo2.svg" alt="DFINITY logo" />
    <br />
    <br />
    <form action="#" @submit="handleSubmit">
      <label for="name">Enter your name: &nbsp;</label>
      <input id="name" alt="Name" type="text" />
      <Button>Click Me</Button>
    </form>
    <section id="greeting">{{ greeting }}</section>
  </main> -->
</template>
