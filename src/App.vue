<template>
  <!-- You can add a navbar or footer here if needed -->
  <router-view />
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
:root {
  --text-font-color: #484954; /* Dark Grayish Blue */
  --action-button-color: #0d4477; /* Dark Cerulean */
  --delete-button-color: #f44336; /* Red */
  --accent-color: #489dda; /* Steel Blue */
  --bg-color: #f8fafc;
  /* Office Colors */
  --color-1-sunglow: #ffbe0b;
  --color-2-coral-orange: #ff9b71;
  --color-3-orange-red: #fb5607;
  --color-4-copper: #97512c;
  --color-5-pale-lilac: #dbbadd;
  --color-6-hollywood-cerise: #ff006e;
  --color-7-magic-mint: #a9f0d1;
  --color-8-mint-green: #00b402;
  --color-9-steel-blue: #489dda;
  --color-10-bright-navy-blue: #0072e8;
  --color-11-electric-purple: #8338ec;
}
#app {
  padding: 1rem;
  height: 100vh;
  overflow-x:hidden;
}
#app::-webkit-scrollbar {
  display: none;
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none; 
}

body {
  height: 100vh;
  font-family: "Poppins", serif;
  font-weight: 400;
  font-style: normal;
  display: flex;
  justify-content: center;
  padding: 0;
  margin: 0;
  color: var(--text-font-color);
  background-color: var(--bg-color);
}
button {
  background-color: white;
  border: none;
}
.primary-button {
  background-color: var(--color-9-steel-blue);
  color: white;
  width: 14.5rem;
  height: 3rem;
  border-radius: 6.25rem;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1rem;
  letter-spacing: 0.063rem;
  text-align: center;
}
.secondary-button {
  background-color: white;
  color: var(--color-9-steel-blue);
  width: 14.5rem;
  height: 3rem;
  border-radius: 6.25rem;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1rem;
  letter-spacing: 0.063rem;
  text-align: center;
}
.delete-button {
  background-color: var(--delete-button-color);
  color: white;
  width: 14.5rem;
  height: 3rem;
  border-radius: 6.25rem;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1rem;
  letter-spacing: 0.063rem;
  text-align: center;
}
.back-button {
  background-color: var(--bg-color);
}
.home-heading-div {
  padding: 1rem;
  display:flex;
  justify-content: flex-start;
  justify-content: start;
  width: 21.438rem;
}
.home-heading {
  font-size: 1.75rem;
  line-height: 2.118rem;
  font-weight: 600;
  letter-spacing: -2%;
}
.heading {
  font-size: 1.5rem;
  font-weight: 800;
  line-height: 1.816rem;
  letter-spacing: -2%;
  padding: 1.088rem 0rem 0rem 0rem;
}
.body-text {
  font-size: 0.75rem;
  line-height: 1.375rem;
  font-weight: 400;
}

.icon {
  width: 1.5rem;
  height: 1.5rem;
}
.add-button {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 4rem;
  height: 4rem;
  background-color:transparent;
}
.buttons-div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}
.input-div {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
  gap: 0.625rem;
}
.input {
  border-radius: 0.5rem;
  padding: 0.75rem 1rem;
  border: none;
}
.page-heading-div {
  width: 9.563rem;
}
.page-heading {
  font-size: 1.125rem;
  line-height: 1.361rem;
  letter-spacing: -2%;
  text-align: center;
}
.page-header {
  height: 1.563rem;
  display: flex;
  flex-direction: row;
  gap: 4.188rem;
  align-items: center;
  width: 23.438rem;
  padding: 0rem 0rem 1.438rem 1rem;
}
.page {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.sub-heading {
  font-size: 1.5rem;
  font-weight: 800;
  line-height: 1.816rem;
  letter-spacing: -2%;
  color: #000;
  gap: 0.75rem;
}
.confirm-delete-modal {
  height: 15.625rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.modal-header {
  display: flex;
  color: #000;
  justify-content: start;
  align-items: baseline;
  gap: 0.75rem;
  font-size: 1.25rem;
}
@media (min-width: 315px) and (max-width: 375px) {
  .home-heading-div {
  width: 17.438rem;
}
.page-header {
  gap: 3.188rem;
  width: 20.438rem;
}
.modal-header{
width: 17.563rem;
}
}
</style>
