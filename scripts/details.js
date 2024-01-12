const urlString = location.href;
const searchParams = new URL(urlString);

const productID = searchParams.searchParams.get("productID");
//
const detailsContainer = document.querySelector(".details-container");
// Helper functions
const detailsPageFiller = (product) => {
  const img = document.createElement("img");
  const p1 = document.createElement("p");
  const p2 = document.createElement("p");
  const p3 = document.createElement("p");
  const button = document.createElement("button");
  const previewDiv = document.createElement("div");
  const div = document.createElement("div");

  //
  for (let i of product.images) {
    const previewImg = document.createElement("img");
    const div = document.createElement("div");

    previewImg.setAttribute("src", i);
    previewImg.setAttribute("alt", "preview image");

    previewImg.style.width = "100%";
    previewImg.style.height = "100%";
    div.style.marginRight = "0.5rem";
    div.style.border = "1px solid grey";
    div.style.padding = "0.25rem";
    div.style.cursor = "pointer";

    //
    div.addEventListener("mouseenter", () => {
      img.setAttribute("src", i);
    });

    div.append(previewImg);
    previewDiv.append(div);
  }

  img.setAttribute("src", product.thumbnail);
  img.setAttribute("alt", "product image");
  img.setAttribute("height", 400);
  img.style.width = "100%";
  p1.append(`${product.brand} / ${product.title}`);
  p2.append(product.description);
  p3.append("$ " + product.price + " | " + product.rating + " / 5");
  button.append("ADD TO CART");

  div.classList.add("product-container");
  previewDiv.classList.add("preview-container");
  p2.style.color = "grey";
  p3.style.fontWeight = "700";
  p3.style.fontSize = "24px";
  button.classList.add("add-to-cart-btn");

  div.append(img);
  div.append(previewDiv);
  div.append(p1);
  div.append(p2);
  div.append(p3);
  div.append(button);

  //
  button.addEventListener("click", () => {
    addToCart(product);
  });
  return detailsContainer.append(div);
};

// Add to cart
function addToCart(newItem) {
  if (!localStorage.getItem("cartItems")) {
    localStorage.setItem("cartItems", "[]");
  }

  const cart = JSON.parse(localStorage.getItem("cartItems"));

  for (let i of cart) {
    if (i.id === newItem.id) {
      alert("Item is already present in the cart");
      return;
    }
  }

  cart.push({ ...newItem, quantity: 1 });
  localStorage.setItem("cartItems", JSON.stringify(cart));
  alert("Item added!");
  // console.log(cart);
}

const fetchProduct = async () => {
  try {
    const data = await fetch(`https://dummyjson.com/products/${productID}`);
    const response = await data.json();

    detailsPageFiller(response);
  } catch (err) {
    console.log(err);
  }
};

fetchProduct();
