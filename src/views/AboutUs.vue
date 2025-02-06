<template>
  <div class="about-us-container">
    <!-- Image for mission section -->
    <div class="mission-image text-center mt-5">
      <img
          src="@/assets/images/mission.png"
          alt="Mission Image"
          class="img-fluid rounded"
      />
    </div>
    <div class="mission-section text-center mt-4">
      <h3 class="fade-in">Our Mission</h3>
      <p class="fade-in">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget consectetur sagittis, nisl nunc condimentum eros, quis auctor velit erat ut tortor. Integer vitae purus eu lacus interdum maximus.
      </p>
    </div>

    <!-- CEO Cards Section -->
    <div class="ceo-section row justify-content-center mt-5">
      <div class="col-md-4">
        <div class="ceo-card scale-up">
          <img
              src="@/assets/images/ceo1.jpg"
              alt="CEO Image 1"
              class="img-fluid rounded-circle"
          />
          <div class="ceo-card-body">
            <h5>Isen Osman</h5>
            <p>CEO</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet dui leo. Vivamus facilisis, ligula a feugiat hendrerit, dui velit auctor purus, eu maximus elit dui eget ipsum.
            </p>
            <p><strong>Email:</strong> <a href="mailto:isen@example.com">isen@example.com</a></p>
            <p><strong>Phone:</strong> +389 70 123 456</p>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="ceo-card scale-up">
          <img
              src="@/assets/images/ceo2.jpg"
              alt="CEO Image 2"
              class="img-fluid rounded-circle"
          />
          <div class="ceo-card-body">
            <h5>Amir Osman</h5>
            <p>CEO</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam euismod, elit vitae pharetra lobortis, sapien justo facilisis felis, non ultricies nulla urna id purus.
            </p>
            <p><strong>Email:</strong> <a href="mailto:amir@example.com">amir@example.com</a></p>
            <p><strong>Phone:</strong> +389 70 987 654</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AboutUs'
};
</script>

<style scoped>
.about-us-container {
  padding: 60px 20px;
  background-color: #f9f9f9;
  animation: fadeIn 1s ease-out;
}

.mission-image img {
  width: 100%;
  height: auto;
  max-width: 600px;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.5s ease;
}

.mission-image img:hover {
  transform: scale(1.05);
}

.mission-section {
  margin-top: 30px;
}

.ceo-section {
  margin-top: 40px;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

.ceo-card {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  text-align: center;
  padding: 20px;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease;
}

.ceo-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.ceo-card img {
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 50%;
  border: 5px solid #007bff;
  transition: transform 0.3s ease;
}

.ceo-card img:hover {
  transform: scale(1.1);
}

.ceo-card-body {
  margin-top: 20px;
}

.ceo-card h5 {
  font-size: 1.5rem;
  font-weight: bold;
  color: #343a40;
  transition: color 0.3s ease;
}

.ceo-card:hover h5 {
  color: #007bff;
}

.ceo-card p {
  color: #555;
  font-size: 1rem;
}

.mission-section h3 {
  font-size: 2rem;
  color: #343a40;
  font-weight: bold;
  animation: slideUp 1s ease-out;
}

.mission-section p {
  font-size: 1.1rem;
  color: #555;
  max-width: 750px;
  margin: 0 auto;
  line-height: 1.6;
  animation: fadeIn 1.5s ease-out;
}

/* Animations */
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes slideUp {
  0% {
    transform: translateY(50px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes scale-up {
  0% {
    transform: scale(0.8);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.scale-up {
  animation: scale-up 0.8s ease-out;
}
</style>
