<template>
  <div class="container-fluid">
    <h1 class="text-center mt-4 mb-5 animate-fade-in text-white">
      Enter Your Location
    </h1>

    <!-- Location Input Form -->
    <form @submit.prevent="handleSubmit" class="mt-4 animate-slide-up">
      <div class="mb-3">
        <label for="location" class="form-label text-white">Location</label>
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

    <div
        v-if="showModal"
        class="modal fade show"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
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
            <!-- Display total price if it's available -->
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
export default {
  name: "HomePage",
  data() {
    return {
      location: "", // Location input field
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
        const timeDiff = end - start; // Difference in milliseconds
        const dayCount = timeDiff / (1000 * 3600 * 24); // Convert to days
        if (dayCount < 1) return 0; // If the selected dates don't span at least 1 day
        return this.selectedCar.price * dayCount; // Calculate total price
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
        alert(
            `You have successfully booked the ${this.selectedCar.brand} ${this.selectedCar.model}`
        );
        this.closeModal();
      } else {
        alert("Booking canceled.");
      }
    },

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
body {
  background: linear-gradient(
      to right,
      #00c6ff,
      #0072ff
  );
  font-family: "Roboto", sans-serif;
}

/* Animations */
@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slide-up {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.animate-fade-in {
  animation: fade-in 0.5s ease-in-out;
}

.animate-slide-up {
  animation: slide-up 0.5s ease-in-out;
}

/* Card hover effect */
.hovered-card {
  transform: scale(1.05);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.card-body {
  background-color: #fff; /* White card body */
  border-radius: 15px;
}

/* Modal Styling */
.modal-content {
  border-radius: 15px;
  background-color: #f9f9f9;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.modal-body {
  margin-bottom: 20px;
}

.form-group input[type="date"] {
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.modal-footer button {
  border-radius: 10px;
  padding: 10px 20px;
}

.modal-footer .btn-primary {
  background-color: #007bff;
  border: none;
}

.modal-footer .btn-secondary {
  background-color: #6c757d;
  border: none;
}

.modal-footer {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.modal.show {
  display: block;
}

/* Button Styling */
.btn-primary,
.btn-success,
.btn-secondary {
  transition: background-color 0.3s ease;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.btn-success:hover {
  background-color: #28a745;
}

.btn-secondary:hover {
  background-color: #5a6268;
}

.w-100 {
  width: 100%;
}

.rounded-pill {
  border-radius: 50px;
}

/* Hover Effect on Cards */
.card-img-top {
  border-radius: 15px 15px 0 0;
}

/* Font and Title Styles */
h1,
.car-title {
  font-family: "Arial", sans-serif;
  font-weight: bold;
}

h1 {
  font-size: 2.5rem;
}

.car-brand,
.car-model {
  font-size: 1.2rem;
  font-weight: 600;
}

/* Responsive Styling */
@media (max-width: 768px) {
  .card-body {
    font-size: 0.9rem;
  }
}
</style>
