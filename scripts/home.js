// API DOCS: https://dummyjson.com
const allProducts = document.querySelector(".all-products");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
const pageNumber = document.querySelector(".page-no");

let skip = 0;
// IF skip is 0 page number is 1 means if skip is 90 what is the page no 10
// page no = skip/10  + 1
const limit = 10;

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

  //
  div.addEventListener("click", () => {
    location.href = `details.html?productID=${product.id}`;
  });

  button.addEventListener("click", (e) => {
    e.stopPropagation();
    console.log("CART clicked");
  });

  return allProducts.append(div);
};

//
pageNumber.innerText = skip / 10 + 1;

nextBtn.addEventListener("click", () => {
  prevBtn.disabled = false;
  if (pageNumber === 10 || skip === 90) {
    nextBtn.disabled = true;
    return;
  }
  nextBtn.disabled = false;
  skip += 10;
  pageNumber.innerText = skip / 10 + 1;
  fetchAllProducts();
});

prevBtn.addEventListener("click", () => {
  nextBtn.disabled = false;
  if (pageNumber === 1 || skip === 0) {
    prevBtn.disabled = true;
    return;
  }
  prevBtn.disabled = false;
  skip -= 10;
  pageNumber.innerText = skip / 10 + 1;
  fetchAllProducts();
});

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

fetchAllProducts();
