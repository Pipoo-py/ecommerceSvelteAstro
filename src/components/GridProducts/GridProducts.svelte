<script>
  import Product from "../Product/Product.svelte";
  import { themeStore } from "../../store/ThemeStore.svelte.js";
  import { totalProducts } from "../../store/ProductsStore.svelte.js";
  let filter = $state("");
  let categories = $state([]);

  $effect(async () => {
    try {
      const catRequest = await fetch(
        "https://dummyjson.com/products/categories",
      );
      let catData = await catRequest.json();
      categories = catData;
    } catch (err) {
      console.log(err);
      return err;
    }
  });
</script>

<div class="products-container">
  <section class="product-cats" class:isDark={themeStore.isDark}>
    {#each categories as category}
      <button
        onclick={() => {
          if (!filter == "" && filter == category.slug) {
            filter = "";
            return;
          }
          filter = category.slug;
        }}
        class="button-filter">{category.name}</button
      >
    {/each}
  </section>
  <section class="products-section">
    <div class="products-grid">
      {#if filter == ""}
        {#each totalProducts.products as product}
          <Product productInfo={product} />
        {/each}
      {:else}
        {#each totalProducts.products as product}
          {#if product.category.toLowerCase() == filter.toLowerCase()}
            <Product productInfo={product} />
          {/if}
        {/each}
      {/if}
    </div>
  </section>
</div>

<style>
  .products-section {
    padding: 24px;
  }

  .products-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 3rem;
  }

  .product-cats {
    display: flex;
    align-items: center;
    gap: 1rem;
    max-width: 100dvw;
    flex-wrap: wrap;
    padding: 18px;
  }

  .button-filter {
    background-color: var(--color-secondary);
    border: none;
    padding: 4px 12px;
    cursor: pointer;
    border-radius: 8px;
    color: #fff;
  }

  .product-cats.isDark .button-filter {
    background-color: var(--dark-primary);
  }
</style>
