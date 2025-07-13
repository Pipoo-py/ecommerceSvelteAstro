<script>
  import SearchIcon from "../icons/SearchIcon.svelte";
  import { themeStore } from "../../store/ThemeStore.svelte";
  import { totalProducts } from "../../store/ProductsStore.svelte";
  import ListProducts from "../ListProducts/ListProducts.svelte";
  let itemToSearch = $state("");
  let similarProducts = $state([]);

  const changeProductToSearch = () => {
    similarProducts = totalProducts.products.filter((product) =>
      product.title.toLowerCase().includes(itemToSearch.toLowerCase()),
    );
  };
</script>

<div class="search-container" class:isDark={themeStore.isDark}>
  <form class="form" class:isDark={themeStore.isDark}>
    <button type="submit"
      ><SearchIcon
        size={18}
        color={themeStore.isDark ? "#f1f5f9" : "#1e293b"}
      /></button
    >
    <input
      type="text"
      placeholder="Buscar productos..."
      bind:value={itemToSearch}
      oninput={changeProductToSearch}
    />
  </form>
  {#if itemToSearch !== ""}
    <div class="results-container">
      <ListProducts bind:products={similarProducts} />
    </div>
  {/if}
</div>

<style>
  .search-container {
    position: relative;
    width: 30%;
    margin-left: 2rem;
  }
  .form {
    border: 1px solid var(--border);
    padding: 4px 12px;
    border-radius: 4px;
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 0.5rem;
    background-color: var(--bg-primary);
  }
  .form input {
    border: none;
    outline: none;
    background: none;
    width: 100%;
  }

  .form button {
    background: none;
    border: none;
    cursor: pointer;
  }
  .results-container {
    position: absolute;
    top: calc(100% + 10px);
    left: 0;
    background-color: #fff;
    border-radius: 12px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    width: 320px;
    max-height: 400px;
    overflow-y: auto;
    z-index: 90;
    padding: 12px;
    display: block;
    box-sizing: border-box;
  }
  .form.isDark {
    background-color: var(--dark-bg-secondary);
    border: 1px solid var(--dark-border);
  }
  .form.isDark input::placeholder {
    color: var(--dark-text-secondary);
  }

  .form.isDark input {
    color: var(--dark-text-primary);
  }

  .search-container.isDark .results-container {
    background-color: var(--dark-bg-secondary);
  }
</style>
