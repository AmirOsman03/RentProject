import Vue from 'vue';
import Router from 'vue-router';
import HomePage from '../views/HomePage.vue';
import LoginPage from '../views/LoginPage.vue';
import Cars from '../views/Cars.vue';
import AboutUs from '../views/AboutUs.vue';
import RegisterPage from '../views/RegisterPage';


Vue.use(Router);

export default new Router({
    mode: 'history',  // Овој режим ги отстранува # од URL-то
    routes: [
        { path: '/', component: HomePage },     // Рута за HomePage на /
        { path: '/home', component: HomePage }, // Рута за HomePage на /home
        { path: '/cars', component: Cars },
        { path: '/about_us', component: AboutUs },
        { path: '/login', component: LoginPage },
        { path: '/register', component: RegisterPage },
    ]
});
