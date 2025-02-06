<template>
  <div class="background-page">
    <div class="container-fluid">
      <h1 class="text-center mt-4 mb-5 animate-fade-in text-white-50">
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
                <strong>Location:</strong> {{ car.location }} <br/>
                <strong>Type:</strong> {{ car.type }} <br/>
                <strong>Year:</strong> {{ car.productionYear }} <br/>
                <strong>Price:</strong> ${{ car.price }} <br/>
                <strong>Fuel Type:</strong> {{ car.fuelType }}
              </p>
              <button class="btn btn-primary w-100" @click="openModal(car)">
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal for Booking Dates -->
    <div
        v-if="showModal"
        class="modal fade show"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        style="display: block;"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content card shadow-lg rounded p-4 animate-fade-in">
          <div class="modal-body">
            <h6>Select your booking dates:</h6>
            <div class="form-group">
              <label for="startDate">From:</label>
              <input
                  type="date"
                  v-model="startDate"
                  class="form-control"
                  min="2025-01-01"
                  required
              />
            </div>
            <div class="form-group">
              <label for="endDate">To:</label>
              <input
                  type="date"
                  v-model="endDate"
                  class="form-control"
                  :min="startDate"
                  required
              />
            </div>
            <div v-if="totalPrice > 0" class="mt-3">
              <strong>Total Price:</strong> ${{ totalPrice }}
            </div>
          </div>
          <div class="modal-footer justify-content-center">
            <button
                type="button"
                class="btn btn-secondary rounded-pill"
                @click="closeModal"
            >
              Close
            </button>
            <button
                type="button"
                class="btn btn-success rounded-pill"
                @click="confirmBooking"
                :disabled="
                    !startDate ||
                    !endDate ||
                    new Date(startDate) >= new Date(endDate)
                "
            >
              Confirm Booking
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {cars} from "@/cars";
import '../assets/css/styles.css'

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
    totalPrice() {
      if (this.startDate && this.endDate && this.selectedCar) {
        const start = new Date(this.startDate);
        const end = new Date(this.endDate);
        const timeDiff = end - start;
        const dayCount = timeDiff / (1000 * 3600 * 24);
        if (dayCount < 1) return 0;
        return this.selectedCar.price * dayCount;
      }
      return 0;
    },
  },
  methods: {
    openModal(car) {
      this.selectedCar = car;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      this.startDate = "";
      this.endDate = "";
      this.selectedCar = null;
    },
    confirmBooking() {
      if (!this.startDate || !this.endDate) {
        alert("Please select both start and end dates for the booking.");
        return;
      }

      if (this.endDate < this.startDate) {
        alert("End date cannot be earlier than start date.");
        return;
      }

      const confirmation = window.confirm(
          `Are you sure you want to book from ${this.startDate} to ${this.endDate}?`
      );

      if (confirmation) {
        // Add booking logic here
        alert(
            `You have successfully booked the ${this.selectedCar.brand} ${this.selectedCar.model}`
        );
        this.closeModal();
      } else {
        alert("Booking canceled.");
      }
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
  background-color: rgba(0, 0, 0, 0.3); /* Dark overlay for better visibility */
  backdrop-filter: blur(2px); /* Blur effect */
  z-index: 1;
}

.container-fluid {
  position: relative;
  z-index: 2;
}

.mt-4 {
  margin-bottom: 1.5rem;
}
</style>
