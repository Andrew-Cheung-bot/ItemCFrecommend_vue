<template>
  <div id="LoginIcon">
    <img id="logo" src="../assets/logo.png" />
    <div id="name">EBook Recommand System</div>
    <div id="line"></div>
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from "./Footer";

export default {
  name: "LoginIcon",
  components: {
    Footer
  }
};
</script>

<style>
#LoginIcon {
  position: absolute;
  top: 60px;
  left: 250px;
  padding: 20px 30px;
  width: 500px;
  height: 600px;
  text-align: center;
  box-shadow: 0 0 25px #cac6c6;
  background: #e2e9e5;
}
#logo {
  padding: 100px 80px;
}
#name {
  height: 60px;
  font-size: 35px;
  font-weight: 400px;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
}
#line {
  height: 5px;
  width: 500px;
  background: -webkit-linear-gradient(
    left,
    rgba(255, 255, 255, 0),
    #1dd479,
    rgba(255, 255, 255, 0)
  );
  background: linear-gradient(
    to right,
    rgba(255, 255, 255, 0),
    #0acc54,
    rgba(255, 255, 255, 0)
  );
}
</style>
