<script>
  import CartIcon from "../icons/CartIcon.svelte";
  import HeartIcon from "../icons/HeartIcon.svelte";
  import ProfileIcon from "../icons/ProfileIcon.svelte";
  import Search from "./Search.svelte";
  import MenuHamburguer from "../icons/MenuHamburguer.svelte";
  import Moon from "../icons/Moon.svelte";
  import Sun from "../icons/Sun.svelte";
  import { themeStore, toggleTheme } from "../../store/ThemeStore.svelte.js";
  import { fetchProducts } from "../../store/ProductsStore.svelte.js";
  import { carStore } from "../../store/CarStore.svelte.js";
  import { fly } from "svelte/transition";

  import ListProducts from "../ListProducts/ListProducts.svelte";
  let isMobile = $state(false);
  let isMobileNavOpen = $state(false);
  let isViewingCar = $state(false);

  const checkIsMobile = () => {
    let mobileRes = window.matchMedia("(max-width: 700px)").matches;
    if (!mobileRes) {
      isMobile = false;
      return;
    }
    isMobile = true;
  };

  const changeTheme = () => {
    toggleTheme();
    document.body.classList = [];
    document.body.classList.add(themeStore.isDark);
  };

  $effect(() => {
    fetchProducts();
    if (typeof window != undefined) {
      checkIsMobile();
      window
        .matchMedia("(max-width: 700px)")
        .addEventListener("change", checkIsMobile);
    }
    return () => {
      window.matchMedia().removeEventListener("change", checkIsMobile);
    };
  });
</script>

<div class="header-container">
  <header class="header" class:isDark={themeStore.isDark}>
    <h1><a href="/">iZhop</a></h1>
    {#if !isMobile || isMobileNavOpen}
      <nav
        class="nav"
        class:mobileNav={isMobileNavOpen}
        transition:fly={{ duration: 300, y: -30 }}
        class:isDark={themeStore.isDark}
      >
        {#if !isMobile}
          <Search />
        {/if}
        <ul class="nav-ul">
          <li class="ul-li"><a href="/products">Productos</a></li>
        </ul>
        {#if !isMobile}
          <ul class="nav-ul">
            <li class="ul-li li-icon">
              <button onclick={changeTheme}>
                {#if !themeStore.isDark}
                  <Moon color={themeStore.isDark ? "#f1f5f9" : "#1e293b"} />
                {:else}
                  <Sun color={themeStore.isDark ? "#f1f5f9" : "#1e293b"} />
                {/if}
              </button>
            </li>
            <li class="ul-li li-icon">
              <button>
                <ProfileIcon
                  color={themeStore.isDark ? "#f1f5f9" : "#1e293b"}
                />
              </button>
            </li>
            <li class="ul-li li-icon">
              <button>
                <HeartIcon color={themeStore.isDark ? "#f1f5f9" : "#1e293b"} />
              </button>
            </li>
            <li class="ul-li li-icon --car-li">
              <button onclick={() => (isViewingCar = !isViewingCar)}>
                <CartIcon
                  color={themeStore.isDark ? "#f1f5f9" : "#1e293b"}
                  bind:badge={carStore.savedProducts.length}
                />
              </button>
              {#if isViewingCar}
                <div
                  class="results-container"
                  transition:fly={{ duration: 200, y: -30 }}
                >
                  <ListProducts bind:products={carStore.savedProducts} />
                </div>
              {/if}
            </li>
          </ul>
        {/if}
      </nav>
    {:else if isMobile && !isMobileNavOpen}
      <nav class="nav">
        <ul class="nav-ul">
          <li class="ul-li li-icon">
            <button onclick={changeTheme}>
              {#if !themeStore.isDark}
                <Moon color={themeStore.isDark ? "#f1f5f9" : "#1e293b"} />
              {:else}
                <Sun color={themeStore.isDark ? "#f1f5f9" : "#1e293b"} />
              {/if}
            </button>
          </li>
          <li class="ul-li li-icon">
            <button>
              <HeartIcon
                size={20}
                color={themeStore.isDark ? "#f1f5f9" : "#1e293b"}
              />
            </button>
          </li>
          <li class="ul-li li-icon">
            <button onclick={() => (isViewingCar = !isViewingCar)}>
              <CartIcon
                color={themeStore.isDark ? "#f1f5f9" : "#1e293b"}
                bind:badge={carStore.savedProducts.length}
              />
            </button>
            {#if isViewingCar}
              <div
                class="results-container"
                transition:fly={{ duration: 200, y: -30 }}
                style="right: 50px;"
              >
                <ListProducts bind:products={carStore.savedProducts} />
              </div>
            {/if}
          </li>
        </ul>
      </nav>
    {/if}
    {#if isMobile}
      <button
        class="mobile-menu"
        onclick={() => (isMobileNavOpen = !isMobileNavOpen)}
      >
        <MenuHamburguer
          size={20}
          color={themeStore.isDark ? "#f1f5f9" : "#1e293b"}
        />
      </button>
    {/if}
  </header>
</div>

<style>
  .header-container {
    container-name: header;
    container-type: inline-size;
  }
  .header {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 0px 42px;
    background-color: #fffa;
    backdrop-filter: blur(10px);
    position: fixed;
    top: 0;
    border-bottom: 1px solid var(--border);
    width: 100%;
    z-index: 80;
  }

  .header.isDark {
    background-color: #123a;
    border: none;
  }

  .header.isDark .ul-li a {
    color: var(--dark-text-secondary);
  }

  h1 {
    font-weight: bold;
    letter-spacing: 1.5px;
    font-size: clamp(1.5rem, 5dvw, 2rem);
  }

  h1 a {
    text-decoration: none;
    color: var(--text-primary);
  }
  .header.isDark h1 a {
    color: var(--dark-text-primary);
  }
  .nav {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    gap: 3.5rem;
    width: 100%;
  }
  .nav-ul {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2.5rem;
  }

  .ul-li {
    list-style: none;
  }
  .ul-li button {
    background: none;
    border: none;
    cursor: pointer;
  }

  .ul-li a {
    text-decoration: none;
    color: var(--text-secondary);
  }

  .mobile-menu {
    background: none;
    padding: 0;
    border: none;
  }
  .results-container {
    position: absolute;
    top: calc(100% + 10px);
    right: 0;
    background-color: #fff;
    border-radius: 12px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    max-height: 400px;
    overflow-y: auto;
    z-index: 90;
    padding: 12px;
    min-width: 320px;
    width: max-content;
    display: block;
  }

  .--car-li {
    position: relative;
  }

  .header.isDark .results-container {
    background-color: var(--dark-bg-secondary);
  }
  @container header (max-width: 700px) {
    .header {
      justify-content: space-between;
      padding: 6px 24px;
      width: 89dvw;
    }
    .nav {
      justify-content: space-between;
      width: initial;
    }
    .nav-ul {
      justify-content: center;
      align-items: center;
      gap: 1.5rem;
    }
    .mobile-menu {
      z-index: 50;
    }
    .nav.mobileNav {
      display: grid;
      place-content: center;
      position: absolute;
      background-color: var(--bg-secondary);
      top: 0;
      right: 0;
      height: 30dvh;
      width: 100dvw;
    }

    .nav.mobileNav.isDark {
      background-color: var(--dark-bg-secondary);
    }

    .nav.mobileNav .nav-ul {
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 1.5rem;
      margin: 0 auto;
      padding: 0;
      margin: 0;
    }

    .nav.mobileNav.isDark .ul-li a {
      color: var(--dark-text-primary);
    }
  }
</style>
