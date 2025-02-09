# Rent-a-Car Vue App 🚗💨

Ова е Vue.js апликација за изнајмување на возила. Апликацијата користи CSS за стилизирање и овозможува два типа на корисници: "admin" и "user".

## Функционалности

### За обични корисници (User):
- Преглед на достапни возила.
- Креирање на резервации.

### За администратори (Admin):
- Додавање нови возила.
- Уредување и бришење на постоечки возила.
- Преглед и менаџирање на резервации.

## Технологии
- **Vue.js** - Фронтенд JavaScript фрејмворк
- **CSS** - Стилизирање
- **Vue Router** - Навигација низ страниците
- **LocalStorage** - Чување на информации за корисникот


## Структура на проектот

```
📂 src/
 ├── 📂 views/            # Страници (Home.vue, AdminPanel.vue, Login.vue)
 ├── 📂 router/           # Vue Router конфигурација
 ├── 📂 assets/           # Слики и CSS датотеки
 ├── App.vue              # Главната Vue компонента
 ├── main.js              # Влезна точка за апликацијата
```

## Кориснички пристап

### Kориснички улоги:
```js
currentUser: {
    role: localStorage.getItem('userRole') || 'user'; // Default to 'user' if nothing is found in localStorage
};
```

### Админ услуги
#### 

```html
 <button style="background: red"
         v-if="currentUser.role === 'admin'"
         class="btn btn-danger w-100 mt-2 "
         @click="deleteCar(car.id)"
>
    Delete
</button>
```

```html

<button style="background: green"
v-if="currentUser.role === 'admin'"
class="btn --bs-danger w-100 mt-2 "
@click="openEditModal(car)"
>
Edit
</button>
```


## Инсталација и стартување

1. Клонирај го репозиториумот:
   ```bash
   git clone https://github.com/your-repo-url.git
   cd rent-a-car-app
   ```

2. Инсталирај ги зависностите:
   ```bash
   npm install
   ```

3. Стартувај ја апликацијата:
   ```bash
   npm run dev
   ```


## Автор
Isen Osman (https://github.com/Isen-Osman) 

Amir Osman (https://github.com/AmirOsman03)


