export const totalProducts = $state({
  products: [],
})

export const fetchProducts = async () => {
  try {
    let request = await fetch("https://dummyjson.com/products");
    let data = await request.json();
    totalProducts.products = data.products;
  } catch (err) {
    console.log(err);
    return err
  }
}


