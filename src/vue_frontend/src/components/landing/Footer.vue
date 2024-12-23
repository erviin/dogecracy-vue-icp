<script>
import { RouterLink } from 'vue-router';
</script>
<template>
  <footer className="bg-black text-brand-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start lg:items-center">
          <div className="mb-4 md:mb-0">
            <RouterLink to="/" className="text-2xl font-bold font-intro">
              DOGECRACY
            </RouterLink>
            <p className="text-gray-300 text-lg">Empowering communities to shape the future.</p>
          </div>
          <nav className="flex flex-wrap justify-center md:justify-end gap-x-6 gap-y-4">
            <RouterLink to="/#about" className="hover:text-[#FFAC43]">About</RouterLink>
            <RouterLink to="/#featurre" className="hover:text-[#FFAC43]">Features</RouterLink>
            <RouterLink to="/explorer" className="hover:text-[#FFAC43]">Explorer Petitions</RouterLink>
            <RouterLink to="#" className="hover:text-[#FFAC43]">Terms</RouterLink>
            <RouterLink to="#" className="hover:text-[#FFAC43]">Privacy</RouterLink>
            <RouterLink to="#" className="hover:text-[#FFAC43]">Contact</RouterLink>
          </nav>
        </div>
        <div className="mt-8 text-start lg:text-center text-xs">
          © {{new Date().getFullYear()}} DOGECRACY. All rights reserved.
        </div>
      </div>
    </footer >
</template>
