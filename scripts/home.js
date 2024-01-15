// API DOCS: https://dummyjson.com
const allProducts = document.querySelector(".all-products");
// const prevBtn = document.querySelector(".prev-btn");
// const nextBtn = document.querySelector(".next-btn");
// const pageNumber = document.querySelector(".page-no");

let skip = 0;
// IF skip is 0 page number is 1 means if skip is 90 what is the page no 10
// page no = skip/10  + 1
let limit = 10;

// Helper functions

const homePageFiller = (product) => {
  const img = document.createElement("img");
  const p1 = document.createElement("p");
  const p2 = document.createElement("p");
  const p3 = document.createElement("p");
  const button = document.createElement("button");
  const div = document.createElement("div");

  img.setAttribute("src", product.thumbnail);
  img.setAttribute("alt", "product image");
  img.setAttribute("height", 200);
  p1.append(`${product.brand} / ${product.title}`);
  p2.append(product.description.slice(0, 35) + ".....");
  p3.append("$ " + product.price);
  button.append("ADD TO CART");

  div.classList.add("item-container");
  img.style.width = "100%";
  p2.style.color = "grey";
  p3.style.fontWeight = 700;
  button.classList.add("add-to-cart-btn");

  div.append(img);
  div.append(p1);
  div.append(p2);
  div.append(p3);
  div.append(button);

  // pageNumber.innerText = skip / 10 + 1;
  //
  div.addEventListener("click", () => {
    location.href = `details.html?productID=${product.id}`;
  });

  button.addEventListener("click", (e) => {
    e.stopPropagation();
    addToCart(product);
  });

  return allProducts.append(div);
};

// const pagination_btn_condition = () => {
//   if (skip >= 90) {
//     nextBtn.disabled = true;
//   } else {
//     nextBtn.disabled = false;
//   }

//   if (skip <= 0) {
//     prevBtn.disabled = true;
//   } else {
//     prevBtn.disabled = false;
//   }
// };

// const page_changer = (type) => {
//   if (type === "next") {
//     skip = skip + 10;
//   } else if (type === "prev") {
//     skip = skip - 10;
//   } else {
//     return;
//   }

//   pagination_btn_condition();
fetchAllProducts();
// };

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

//
async function fetchAllProducts() {
  try {
    const data = await fetch(
      `https://dummyjson.com/products?skip=${skip}&limit=${limit}`
    );
    const response = await data.json();

    allProducts.innerHTML = "";
    for (let product of response.products) {
      homePageFiller(product);
    }
  } catch (err) {
    console.log(err);
  }
}

// pagination_btn_condition();

fetchAllProducts();

// nextBtn.addEventListener("click", () => {
//   page_changer("next");
// });

// prevBtn.addEventListener("click", () => {
//   page_changer("prev");
// });

// Infinity scroll
window.addEventListener("scroll", () => {
  const windowHeight = window.innerHeight;
  const scrollHeight = document.documentElement.scrollHeight;
  const scrollPosition =
    document.body.scrollTop + document.documentElement.scrollTop;
  const correctorVal = 1;

  const isAtBottom =
    scrollPosition > scrollHeight - windowHeight - correctorVal;

  if (isAtBottom) {
    // ADD your logic
    limit = limit + 10;

    if (limit <= 100) fetchAllProducts();
  }
});
