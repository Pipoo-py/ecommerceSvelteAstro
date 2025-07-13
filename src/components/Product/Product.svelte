<script>
  import Stars from "../icons/Stars.svelte";
  import CartIcon from "../icons/CartIcon.svelte";
  import { addProductToCar } from "../../store/CarStore.svelte.js";
  import { fly } from "svelte/transition";
  const { productInfo } = $props();
  let isAdded = $state(false);

  const toggleAdded = () => {
    isAdded = true;
    setInterval(() => {
      isAdded = false;
    }, 1000);
  };
</script>

<div class="product-container">
  <div class="product-img-container">
    <img alt={productInfo.title} src={productInfo.images[0]} />
  </div>
  <div class="product-rating-container">
    <Stars rating={productInfo.rating} />
    <span>{productInfo.rating}</span>
    <span>({productInfo.reviews.length})</span>
  </div>
  <div class="product-price-container">
    ${productInfo.price}
  </div>
  <button
    onclick={() => {
      addProductToCar(productInfo);
      toggleAdded();
    }}
  >
    <CartIcon size={16} color={"#FFF"} />
    Agregar al carrito
  </button>
  {#if isAdded}
    <span class="added-span" transition:fly={{ duration: 200, y: 20 }}
      >Agregado al carrito</span
    >
  {/if}
</div>

<style>
  .product-container {
    position: relative;
    border: 1px solid var(--border);
    padding: 12px;
    border-radius: 8px;
  }

  .product-img-container img {
    width: 100%;
  }
  .product-rating-container {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin: 1rem 0;
  }

  .product-price-container {
    font-size: clamp(1.5rem, 5dvw, 2rem);
    font-weight: bold;
    margin: 1rem 0;
  }
  .product-container button {
    background-color: var(--color-primary);
    padding: 4px 24px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    gap: 1rem;
    color: #fff;
    border: none;
    margin: 0 auto;
    cursor: pointer;
  }

  .added-span {
    position: absolute;
    bottom: 70px;
    margin: 0 auto;
    left: 50%;
    transform: translateX(-50%);
    background-color: var(--success);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    padding: 6px 14px;
    border-radius: 12px;
    color: #fff;
  }
</style>
