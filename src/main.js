import Vue from 'vue';
import App from './App.vue';
import 'bootstrap/dist/css/bootstrap.min.css'; // Импортирај го Bootstrap
import router from './router'; // Импортирај го router

Vue.config.productionTip = false;


// Isen 225031
// Amir 224018
new Vue({
    render: h => h(App),
    router, // Додај router во Vue инстанцата
}).$mount('#app');
