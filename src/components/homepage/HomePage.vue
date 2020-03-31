<template>
  <div class="homey">
    <div class="spacer">
      <div style="font-size: 100px;">Mars</div>
      <div style="font-size: 25px;">An Opportunity to Vue the red planet</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage'
}
</script>

<style scoped>
  .homey {
    height: 100%;
    width: 100%;
    background-image: url("~@/assets/mars.jpg");
    background-color: black;
    background-size: 100vh auto;
    background-repeat: no-repeat;
  }

  .spacer {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    justify-content: center;
  }

  .spacer div {
    margin-left: 60%;
  }

  @media only screen and (max-width: 1350px) {
    .spacer div {
      margin-left: 70%;
    }
  }

  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
  }
  a {
    color: #42b983;
  }
</style>
