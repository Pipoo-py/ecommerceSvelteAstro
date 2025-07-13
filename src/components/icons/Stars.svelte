<script>
  const { rating = 0, size = 24, color = "#FFD700" } = $props();
  const inactiveColor = "#CCCCCC";
  const maxStars = 5;
  const isFilled = (index) => index < Math.floor(rating);
</script>

<div class="star-rating">
  {#each { length: maxStars } as _, index}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={isFilled(index) ? color : "none"}
      stroke={isFilled(index) ? color : inactiveColor}
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="star"
    >
      <path
        d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
      />
    </svg>
  {/each}
</div>

<style>
  .star-rating {
    display: flex;
    gap: 4px;
  }
</style>
