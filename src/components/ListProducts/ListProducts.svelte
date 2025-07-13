<script>
  import { themeStore } from "../../store/ThemeStore.svelte";
  const { products = $bindable() } = $props();
</script>

<ul class="products-list" class:isDark={themeStore.isDark}>
  {#each products as product}
    <li class="product-item">
      <img alt={product.title} src={product.images[0]} />
      <span>{product.title}</span>
    </li>
  {/each}
</ul>
