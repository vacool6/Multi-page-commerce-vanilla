const cartItems = JSON.parse(localStorage.getItem("cartItems"));

const cartContainer = document.querySelector(".cart_container");
const subTotal = document.querySelector(".sub_total");

let checkoutTotal = 0;

const quantityChangerFiller = (quantity, id) => {
  const p = document.createElement("p");
  const incBtn = document.createElement("button");
  const decBtn = document.createElement("button");
  const div = document.createElement("div");

  incBtn.append(" + ");
  decBtn.append(" - ");
  p.append(quantity);

  div.classList.add("quantityBtn");
  p.style.margin = "0 0.25rem";
  incBtn.style.fontSize = "inherit";
  decBtn.style.fontSize = "inherit";
  decBtn.style.width = "2.5rem";
  incBtn.style.width = "2.5rem";

  //
  incBtn.addEventListener("click", () => quantityChanger("inc", id));

  decBtn.addEventListener("click", () => quantityChanger("dec", id));

  div.append(decBtn);
  div.append(p);
  div.append(incBtn);

  return div;
};

for (let item of cartItems) {
  const parentDiv = document.createElement("div");
  const div1 = document.createElement("div");
  const div2 = document.createElement("div");
  const div3 = document.createElement("div");
  const img = document.createElement("img");
  const p1 = document.createElement("p");
  const p2 = document.createElement("p");
  const delBtn = document.createElement("button");

  img.setAttribute("src", item.thumbnail);
  img.setAttribute("alt", "product image");
  img.setAttribute("width", 125);
  img.setAttribute("height", 125);
  p1.append("$ " + item.price * item.quantity);
  p2.append(item.title);
  delBtn.append("🗑️");

  parentDiv.classList.add("cartItem");

  div1.append(img);
  div2.append(p1);
  div2.append(p2);
  div2.append(quantityChangerFiller(item.quantity, item.id));
  div3.append(delBtn);

  delBtn.classList.add("del-btn");

  delBtn.addEventListener("click", () => {
    const cartAfterDelete = cartItems.filter((e) => {
      return e.id !== item.id;
    });
    localStorage.setItem("cartItems", JSON.stringify(cartAfterDelete));
    location.reload();
  });

  parentDiv.append(div1);
  parentDiv.append(div2);
  parentDiv.append(div3);

  cartContainer.append(parentDiv);
  checkoutTotal += item.price * item.quantity;
}

//
function quantityChanger(type, id) {
  if (type == "inc") {
    const updatedCart = cartItems.map((e) => {
      if (id === e.id) {
        e.quantity += 1;
        return e;
      }
      return e;
    });
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  } else if (type === "dec") {
    const updatedCart = cartItems.map((e) => {
      if (id === e.id) {
        if (e.quantity === 1) {
          alert("quantity cannot be 0");
          return e;
        }
        e.quantity -= 1;
        return e;
      }
      return e;
    });
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  } else {
    return;
  }

  location.reload();
}

if (checkoutTotal === 0) {
  subTotal.style.textAlign = "center";
  subTotal.append("Your cart is empty");
} else {
  subTotal.append("TOTAL: $ " + checkoutTotal);
}
