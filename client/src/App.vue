<template>
  <div id="mix">
    <Navbar />
    <Dashboard />
    <Footer />
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';
import Dashboard from './components/Dashboard.vue';
import Footer from './components/Footer.vue';

export default {
  name: 'App',
  components: {
    Navbar,
    Dashboard,
    Footer
  }
}
</script>

<style>
 *{
   margin: 0;
   padding: 0;
   box-sizing: border-box;

 }  
 #mix{
   background-color: #f1f1f1;

 }
 
</style>
