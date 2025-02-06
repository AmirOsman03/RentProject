<template>
  <div class="container">
    <h1 class="text-center mb-4">Cars</h1>

    <!-- Filter by Car Type -->
    <div class="form-group">
      <label for="carType">Filter by Type:</label>
      <select v-model="selectedType" class="form-control" id="carType">
        <option value="">All</option>
        <option value="COUPE">COUPE</option>
        <option value="SEDAN">SEDAN</option>
        <option value="HATCHBACK">HATCHBACK</option>
        <option value="SUV">SUV</option>
      </select>
    </div>

    <!-- Filter by Fuel Type -->
    <div class="form-group mt-3">
      <label for="fuelType">Filter by Fuel Type:</label>
      <select v-model="selectedFuelType" class="form-control" id="fuelType">
        <option value="">All</option>
        <option value="Petrol">Petrol</option>
        <option value="Diesel">Diesel</option>
        <option value="Hybrid">Hybrid</option>
      </select>
    </div>

    <!-- Add New Car Button - Only for Admin -->
    <div v-if="currentUser.role === 'admin'" class="mb-4 text-center">
      <button class="btn btn-success" @click="openAddCarModal">
        Add New Car
      </button>
    </div>

    <!-- Displaying Cars -->
    <div class="row mt-4">
      <div class="col-12 col-md-4" v-for="car in filteredCars" :key="car.id">
        <div class="card shadow-lg mb-4 rounded">
          <img
              :src="require(`@/assets/images/${car.image}`)"
              class="card-img-top"
              alt="Car image"
          />
          <div class="card-body">
            <h5 class="car-title">
              <span class="car-brand">{{ car.brand }} </span>
              <span class="car-model">{{ car.model }}</span>
            </h5>
            <p class="card-text">
              <strong>Type:</strong> {{ car.type }} <br />
              <strong>Year:</strong> {{ car.productionYear }} <br />
              <strong>Price:</strong> ${{ car.price }} <br />
              <strong>Location:</strong> {{ car.location }} <br />
              <strong>Fuel Type:</strong> {{ car.fuelType }} <br />
            </p>
            <button class="btn btn-primary w-100" @click="openModal(car)">
              Book Now
            </button>
            <button
                v-if="currentUser.role === 'admin'"
                class="btn btn-warning w-100 mt-2"
                @click="openEditModal(car)"
            >
              Edit
            </button>
            <button
                v-if="currentUser.role === 'admin'"
                class="btn btn-danger w-100 mt-2"
                @click="deleteCar(car.id)"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal for Adding New Car -->
    <div
        v-if="showAddCarModal"
        class="modal fade show"
        tabindex="-1"
        role="dialog"
        aria-labelledby="addCarModalLabel"
        aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content card shadow-lg p-4 rounded-3 animate-fade-in">
          <div class="modal-header border-0">
            <h5 class="modal-title text-success">Add New Car</h5>
            <button
                type="button"
                class="btn-close"
                @click="closeAddCarModal"
                aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="addNewCar">
              <div class="row g-3">
                <div class="col-md-6">
                  <label for="newBrand" class="form-label fw-bold">Brand</label>
                  <input
                      type="text"
                      id="newBrand"
                      v-model="newCar.brand"
                      class="form-control border-success"
                      required
                  />
                </div>
                <div class="col-md-6">
                  <label for="newModel" class="form-label fw-bold">Model</label>
                  <input
                      type="text"
                      id="newModel"
                      v-model="newCar.model"
                      class="form-control border-success"
                      required
                  />
                </div>
                <div class="col-md-6">
                  <label for="newPrice" class="form-label fw-bold">Price</label>
                  <input
                      type="number"
                      id="newPrice"
                      v-model="newCar.price"
                      class="form-control border-success"
                      required
                  />
                </div>
                <div class="col-md-6">
                  <label for="newType" class="form-label fw-bold">Type</label>
                  <select
                      v-model="newCar.type"
                      class="form-control border-success"
                      id="newType"
                      required
                  >
                    <option value="COUPE">COUPE</option>
                    <option value="SEDAN">SEDAN</option>
                    <option value="HATCHBACK">HATCHBACK</option>
                    <option value="SUV">SUV</option>
                  </select>
                </div>
                <div class="col-md-12">
                  <label for="newFuelType" class="form-label fw-bold"
                  >Fuel Type</label
                  >
                  <select
                      v-model="newCar.fuelType"
                      class="form-control border-success"
                      id="newFuelType"
                      required
                  >
                    <option value="Petrol">Petrol</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer justify-content-center border-0">
            <button
                type="button"
                class="btn btn-outline-secondary rounded-pill"
                @click="closeAddCarModal"
            >
              Close
            </button>
            <button
                type="button"
                class="btn btn-success rounded-pill"
                @click="addNewCar"
            >
              Add Car
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal for Editing Car Details -->
    <div
        v-if="showEditModal"
        class="modal fade show"
        tabindex="-1"
        role="dialog"
        aria-labelledby="editCarModalLabel"
        aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content card shadow-lg p-4 rounded-3 animate-fade-in">
          <div class="modal-header border-0">
            <h5 class="modal-title text-primary">Edit Car Details</h5>
            <button
                type="button"
                class="btn-close"
                @click="closeEditModal"
                aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="saveEditedCar">
              <div class="row g-3">
                <div class="col-md-6">
                  <label for="editBrand" class="form-label fw-bold"
                  >Brand</label
                  >
                  <input
                      type="text"
                      id="editBrand"
                      v-model="editedCar.brand"
                      class="form-control border-primary"
                      required
                  />
                </div>
                <div class="col-md-6">
                  <label for="editModel" class="form-label fw-bold"
                  >Model</label
                  >
                  <input
                      type="text"
                      id="editModel"
                      v-model="editedCar.model"
                      class="form-control border-primary"
                      required
                  />
                </div>
                <div class="col-md-6">
                  <label for="editPrice" class="form-label fw-bold"
                  >Price</label
                  >
                  <input
                      type="number"
                      id="editPrice"
                      v-model="editedCar.price"
                      class="form-control border-primary"
                      required
                  />
                </div>
                <div class="col-md-6">
                  <label for="editType" class="form-label fw-bold">Type</label>
                  <select
                      v-model="editedCar.type"
                      class="form-control border-primary"
                      id="editType"
                      required
                  >
                    <option value="COUPE">COUPE</option>
                    <option value="SEDAN">SEDAN</option>
                    <option value="HATCHBACK">HATCHBACK</option>
                    <option value="SUV">SUV</option>
                  </select>
                </div>
                <div class="col-md-12">
                  <label for="editFuelType" class="form-label fw-bold"
                  >Fuel Type</label
                  >
                  <select
                      v-model="editedCar.fuelType"
                      class="form-control border-primary"
                      id="editFuelType"
                      required
                  >
                    <option value="Petrol">Petrol</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer justify-content-center border-0">
            <button
                type="button"
                class="btn btn-outline-secondary rounded-pill"
                @click="closeEditModal"
            >
              Close
            </button>
            <button
                type="button"
                class="btn btn-primary rounded-pill"
                @click="saveEditedCar"
            >
              Save Changes
            </button>
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
export default {
  name: "CarList",
  data() {
    return {
      showAddCarModal: false,
      newCar: {
        brand: "",
        model: "",
        price: 0,
        type: "",
        fuelType: "",
      },
      cars: [
        {
          id: 1,
          brand: "Mercedes-Benz",
          model: "C63",
          productionYear: 2003,
          type: "COUPE",
          price: 300,
          image: "c63.jpg",
          location: "Strumica, Address 1",
          fuelType: "Petrol",
        },
        {
          id: 2,
          brand: "BMW",
          model: "M3",
          productionYear: 2019,
          type: "SEDAN",
          price: 400,
          image: "m3.jpg",
          location: "Skopje, Address 2",
          fuelType: "Petrol",
        },
        {
          id: 3,
          brand: "Audi",
          model: "RS5",
          productionYear: 2018,
          type: "COUPE",
          price: 300,
          image: "rs5.jpg",
          location: "Bitola, Address 3",
          fuelType: "Petrol",
        },
        {
          id: 4,
          brand: "Volkswagen",
          model: "Golf R",
          productionYear: 2022,
          type: "HATCHBACK",
          price: 200,
          image: "golf.jpg",
          location: "Skopje, Address 4",
          fuelType: "Petrol",
        },
        {
          id: 5,
          brand: "Toyota",
          model: "Supra",
          productionYear: 2021,
          type: "COUPE",
          price: 300,
          image: "supra.jpg",
          location: "Ohrid, Address 5",
          fuelType: "Petrol",
        },
        {
          id: 6,
          brand: "Porsche",
          model: "911 Turbo S",
          productionYear: 2023,
          type: "COUPE",
          price: 400,
          image: "911.jpg",
          location: "Skopje, Address 6",
          fuelType: "Petrol",
        },
        {
          id: 7,
          brand: "Ford",
          model: "Mustang GT",
          productionYear: 2020,
          type: "COUPE",
          price: 350,
          image: "mustang.jpg",
          location: "Bitola, Address 7",
          fuelType: "Petrol",
        },
        {
          id: 8,
          brand: "Lamborghini",
          model: "Huracan",
          productionYear: 2022,
          type: "COUPE",
          price: 500,
          image: "huracan.jpg",
          location: "Ohrid, Address 8",
          fuelType: "Petrol",
        },
        {
          id: 9,
          brand: "Ferrari",
          model: "F8 Tributo",
          productionYear: 2024,
          type: "COUPE",
          price: 500,
          image: "f8.jpg",
          location: "Tetovo, Address 9",
          fuelType: "Petrol",
        },
        {
          id: 10,
          brand: "Nissan",
          model: "GT-R",
          productionYear: 2018,
          type: "COUPE",
          price: 450,
          image: "gtr.jpg",
          location: "Kumanovo, Address 10",
          fuelType: "Petrol",
        },
        {
          id: 11,
          brand: "Honda",
          model: "Accord",
          productionYear: 2021,
          type: "SEDAN",
          price: 350,
          image: "accord.jpg",
          location: "Skopje, Address 11",
          fuelType: "Petrol",
        },
        {
          id: 12,
          brand: "Hyundai",
          model: "Sonata",
          productionYear: 2022,
          type: "SEDAN",
          price: 300,
          image: "sonata.jpg",
          location: "Bitola, Address 12",
          fuelType: "Hybrid",
        },
        {
          id: 13,
          brand: "Toyota",
          model: "Camry",
          productionYear: 2023,
          type: "SEDAN",
          price: 400,
          image: "camry.jpg",
          location: "Ohrid, Address 13",
          fuelType: "Hybrid",
        },
        {
          id: 14,
          brand: "BMW",
          model: "5 Series",
          productionYear: 2020,
          type: "SEDAN",
          price: 450,
          image: "5series.jpg",
          location: "Skopje, Address 14",
          fuelType: "Diesel",
        },
        {
          id: 15,
          brand: "Audi",
          model: "A6",
          productionYear: 2021,
          type: "SEDAN",
          price: 500,
          image: "a6.jpg",
          location: "Prilep, Address 15",
          fuelType: "Diesel",
        },
        {
          id: 16,
          brand: "Jeep",
          model: "Grand Cherokee",
          productionYear: 2022,
          type: "SUV",
          price: 450,
          image: "grandcherokee.jpg",
          location: "Skopje, Address 16",
          fuelType: "Diesel",
        },
        {
          id: 17,
          brand: "Range Rover",
          model: "Velar",
          productionYear: 2021,
          type: "SUV",
          price: 600,
          image: "velar.jpg",
          location: "Strumica, Address 17",
          fuelType: "Diesel",
        },
        {
          id: 18,
          brand: "BMW",
          model: "X5",
          productionYear: 2023,
          type: "SUV",
          price: 700,
          image: "x5.jpg",
          location: "Skopje, Address 18",
          fuelType: "Diesel",
        },
        {
          id: 19,
          brand: "Mercedes-Benz",
          model: "GLC",
          productionYear: 2022,
          type: "SUV",
          price: 650,
          image: "glc.jpg",
          location: "Bitola, Address 19",
          fuelType: "Diesel",
        },
        {
          id: 20,
          brand: "Toyota",
          model: "Land Cruiser",
          productionYear: 2025,
          type: "SUV",
          price: 750,
          image: "landcruiser.jpg",
          location: "Strumica, Address 20",
          fuelType: "Diesel",
        },
        {
          id: 21,
          brand: "Volkswagen",
          model: "Polo",
          productionYear: 2021,
          type: "HATCHBACK",
          price: 180,
          image: "polo.jpg",
          location: "Gevgelija, Address 21",
          fuelType: "Petrol",
        },
        {
          id: 22,
          brand: "Honda",
          model: "Civic",
          productionYear: 2020,
          type: "HATCHBACK",
          price: 250,
          image: "civic.jpg",
          location: "Bitola, Address 22",
          fuelType: "Petrol",
        },
        {
          id: 23,
          brand: "Ford",
          model: "Focus ST",
          productionYear: 2022,
          type: "HATCHBACK",
          price: 280,
          image: "focus.jpg",
          location: "Ohrid, Address 23",
          fuelType: "Petrol",
        },
        {
          id: 24,
          brand: "Mazda",
          model: "3",
          productionYear: 2021,
          type: "HATCHBACK",
          price: 220,
          image: "mazda3.jpg",
          location: "Gostivar, Address 24",
          fuelType: "Petrol",
        },
        {
          id: 25,
          brand: "BMW",
          model: "1 Series",
          productionYear: 2023,
          type: "HATCHBACK",
          price: 350,
          image: "bmw1.jpg",
          location: "Strumica, Address 25",
          fuelType: "Diesel",
        },
      ],
      selectedType: "",
      selectedFuelType: "",
      showModal: false,
      showEditModal: false,
      selectedCar: null,
      startDate: "",
      endDate: "",
      editedCar: {},
      currentUser: {
        role: "admin", // menuvanje na role
      },
      myBookings: [],
    };
  },
  computed: {
    filteredCars() {
      return this.cars.filter((car) => {
        const matchesType =
            !this.selectedType || car.type === this.selectedType;
        const matchesFuelType =
            !this.selectedFuelType || car.fuelType === this.selectedFuelType;
        return matchesType && matchesFuelType;
      });
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
    openAddCarModal() {
      this.showAddCarModal = true;
      this.newCar = {
        brand: "",
        model: "",
        price: "",
        type: "COUPE",
        fuelType: "Petrol",
      };
    },

    closeAddCarModal() {
      this.showAddCarModal = false;
    },

    addNewCar() {
      if (
          !this.newCar.brand ||
          !this.newCar.model ||
          !this.newCar.price ||
          !this.newCar.type ||
          !this.newCar.fuelType
      ) {
        alert("Please fill all fields.");
        return;
      }

      const newCar = {
        id: this.cars.length + 1,
        ...this.newCar,
      };

      // Додавање на новото возило
      this.cars.push(newCar);

      // Затворање на модалот
      this.closeAddCarModal();

      alert(`You have successfully added the ${newCar.brand} ${newCar.model}`);
    },

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
        // Dodaj ja rezervacijata vo "myBookings"
        const booking = {
          car: this.selectedCar,
          startDate: this.startDate,
          endDate: this.endDate,
          totalPrice: this.totalPrice,
        };
        this.myBookings.push(booking); // Dodavanje vo lista
        alert(
            `You have successfully booked the ${this.selectedCar.brand} ${this.selectedCar.model}`
        );
        this.closeModal();
      } else {
        alert("Booking canceled.");
      }
    },

    deleteCar(carId) {
      this.cars = this.cars.filter((car) => car.id !== carId);
    },

    saveEditedCar() {
      const index = this.cars.findIndex((car) => car.id === this.editedCar.id);
      if (index !== -1) {
        this.cars.splice(index, 1, { ...this.editedCar });
      }
      this.showEditModal = false;
    },

    closeEditModal() {
      this.showEditModal = false;
    },

    openEditModal(car) {
      this.editedCar = { ...car };
      this.showEditModal = true;
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
}

.card-body {
  padding: 20px;
}

.car-title {
  font-size: 1.25rem;
  font-weight: bold;
}

.car-brand {
  color: #007bff;
}

.car-model {
  color: #6c757d;
}

.card {
  transition: transform 0.2s ease-in-out;
}

.card:hover {
  transform: scale(1.05);
}

.modal-backdrop {
  display: none;
}

.modal {
  display: block;
}

.modal .modal-dialog {
  max-width: 500px;
}
</style>
