<template>
  <div id="app">
    <!-- You can add a navbar or footer here if needed -->
    <router-view />
 
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
:root {
  --text-font-color: #484954; /* Dark Grayish Blue */
  --action-button-color: #0d4477; /* Dark Cerulean */
  --delete-button-color: #f44336; /* Red */
  --accent-color: #489dda; /* Steel Blue */

  /* Office Colors */
  --color-1-sunglow: #ffbe0b;
  --color-2-coral-orange: #ff9b71;
  --color-3-orange-red: #fb5607;
  --color-4-copper: #97512c;
  --color-5-pale-lilac: #dbbadd;
  --color-6-hollywood-cerise: #ff006e;
  --color-7-magic-mint: #a9f0d1;
  --color-8-islamic-green: #00b402;
  --color-9-steel-blue: #489dda;
  --color-10-bright-navy-blue: #0072e8;
  --color-11-electric-purple: #8338ec;
}

body {
font-family: "Poppins", serif;
font-weight: 400;
font-style: normal;
display: flex;
justify-content: center;
padding: 0;
margin: 0;
color: var(--text-font-color);
}
.heading{
  font-size:1.5rem;
}
.body-text{
  font-size:0.75rem;
}
#app{
  padding:1rem;
}
.icon{
  width:1.5rem;
  height: 1.5rem;
}
</style>
