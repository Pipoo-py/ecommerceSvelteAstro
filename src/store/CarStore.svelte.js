export const carStore = $state({
  savedProducts: [],
});

export const addProductToCar = (product) => {
  carStore.savedProducts.push(product);
}
