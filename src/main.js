// ----
// Depedencies
import Vue from 'vue';
import App from './App.vue';
import Toasted from 'vue-toasted';
import './theme.css';


// ----
// Middleware, Plugins, and config
Vue.use( Toasted );
Vue.config.productionTip = false;

// ----
// Mount application
new Vue({
  render: h => h( App ),
}).$mount( '#app' );
