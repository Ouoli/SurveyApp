<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link> |
      <!-- <router-link to="/creator">Creator</router-link> | -->
      <!-- <router-link to="/details">Details</router-link> |
      <router-link to="/feedback">Feedback</router-link> | -->
      <router-link to="/createcourse">Create Course</router-link> |
      <router-link to="/myapplications">Student Read</router-link> |
      <router-link to="/adminread">Admin Read</router-link> |
      <!-- <router-link to="/adminmanage">Admin Manage</router-link> -->
    </nav>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
