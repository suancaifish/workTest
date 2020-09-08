<template>
    <div id="app">

        <div id="nav">
            <Home></Home>

            <!-- <vue-particles
            class="lizi"
            color="#dedede"
            :particleOpacity="0.7"
            :particlesNumber="80"
            shapeType="triangle"
            :particleSize="4"
            linesColor="#ff00fa"
            :linesWidth="1"
            :lineLinked="true"
            :lineOpacity="0.3"
            :linesDistance="150"
            :moveSpeed="3"
            :hoverEffect="true"
            hoverMode="grab"
            :clickEffect="true"
            clickMode="push"
        ></vue-particles> -->
        </div>
    </div>
</template>

<script>
import Home from "./views/Home";
export default {
    components: {
        Home
    }
};
</script>
<style lang="scss">
#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

#nav {
    padding: 30px;
}

#nav a {
    font-weight: bold;
    color: #2c3e50;
}

#nav a.router-link-exact-active {
    color: #42b983;
}
.lizi{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
}
</style>
