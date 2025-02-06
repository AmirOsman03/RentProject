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
import '../assets/css/aboutUs.css'

export default {
  name: 'AboutUs'
};
</script>

<style scoped>

</style>
