<template>
  <div class="background-page">
    <div class="container-fluid">
      <h1 class="text-center mt-4 mb-5 animate-fade-in text-black">
        Enter Your Location
      </h1>

      <!-- Location Input Form -->
      <form @submit.prevent="handleSubmit" class="mt-4 animate-slide-up">
        <div class="mb-3">
          <label for="location" class="form-label"></label>
          <input
              type="text"
              class="form-control"
              id="location"
              v-model="location"
              placeholder="Enter city"
              required
          />
        </div>
        <button type="submit" class="btn btn-primary w-100 rounded-pill">
          Search
        </button>
      </form>

      <!-- Display Cars if Location is Entered -->
      <div v-if="location" class="row mt-4">
        <div
            class="col-12 col-md-4 mb-4"
            v-for="car in filteredCars"
            :key="car.id"
        >
          <div
              class="card shadow-lg rounded animate-fade-in"
              style="transition: transform 0.3s ease; border-radius: 15px"
              @mouseenter="hoverCard(car.id)"
              @mouseleave="unhoverCard(car.id)"
              :class="{ 'hovered-card': hoveredCardId === car.id }"
          >
            <img
                :src="require(`@/assets/images/${car.image}`)"
                class="card-img-top rounded-top"
                alt="Car image"
            />
            <div class="card-body">
              <h5 class="car-title text-center">
                <span class="car-brand">{{ car.brand }} </span>
                <span class="car-model">{{ car.model }}</span>
              </h5>
              <p class="card-text">
                <strong>Location:</strong> {{ car.location }} <br />
                <strong>Type:</strong> {{ car.type }} <br />
                <strong>Year:</strong> {{ car.productionYear }} <br />
                <strong>Price:</strong> ${{ car.price }} <br />
                <strong>Fuel Type:</strong> {{ car.fuelType }}
              </p>
              <button
                  class="btn btn-primary w-100 rounded-pill"
                  @click="openModal(car)"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { cars } from "@/cars";
export default {
  name: "HomePage",
  data() {
    return {
      location: "",
      cars: cars,
      showModal: false,
      selectedCar: null,
      startDate: "",
      endDate: "",
      hoveredCardId: null,
    };
  },
  computed: {
    filteredCars() {
      if (this.location) {
        return this.cars.filter((car) =>
            car.location.toLowerCase().includes(this.location.toLowerCase())
        );
      }
      return this.cars;
    },
  },
  methods: {
    hoverCard(carId) {
      this.hoveredCardId = carId;
    },
    unhoverCard() {
      this.hoveredCardId = null;
    },
  },
};
</script>

<style scoped>
.background-page {
  position: relative;
  background: url('@/assets/images/paris.jpg') no-repeat center center fixed;
  background-size: cover;
  min-height: 100vh;
  padding-top: 20px;
  overflow: hidden;
}

.background-page::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3); /* Темен слој за подобра видливост */
  backdrop-filter: blur(2px); /* Замаглување */
  z-index: 1;
}

.container-fluid {
  position: relative;
  z-index: 2; /* Елементи над замаглувањето */
}
</style>
