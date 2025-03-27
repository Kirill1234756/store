<template>
  <div class="min-h-screen flex flex-col">
    <NavBar />
    <main class="flex-grow">
      <RouterView />
    </main>
    <Footer />
    <AppToast />
  </div>
</template>

<script setup lang="ts">
import NavBar from '@/components/layout/NavBar.vue'
import Footer from '@/components/layout/Footer.vue'
import AppToast from '@/components/ui/AppToast.vue'
</script>