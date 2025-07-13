<script>
  const { size = 24, color = "currentColor", badge = $bindable() } = $props();
</script>

<div style="position: relative; display: inline-block">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    stroke-width="2"
  >
    <circle cx="9" cy="21" r="1" />
    <circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </svg>
  {#if badge}
    <span
      style="position: absolute; top: -5px; right: -8px; background: var(--error); color: white; border-radius: 50%; width: 18px; height: 18px; display: flex; align-items: center; justify-content: center; font-size: 0.65rem;"
    >
      {badge}
    </span>
  {/if}
</div>
