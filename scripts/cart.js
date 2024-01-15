const cartItems = JSON.parse(localStorage.getItem("cartItems"));

const cartContainer = document.querySelector(".cart_container");
const emptyCart = document.querySelector(".empty_cart");
const notEmptyCart = document.querySelector(".not_empty_cart");
const notEmptyCartPara = document.querySelector(".not_empty_cart_para");
const couponBtn = document.querySelector(".coupon_btn");
const couponVal = document.querySelector(".coupon_val");
const checkoutBtn = document.querySelector(".checkout_btn");

// Login
const emailInp = document.querySelector(".inpEmail");
const passwordInp = document.querySelector(".inpPassword");
const loginBtn = document.querySelector(".loginBtn");

// Free codes
// OFF50
// OFF35
const coupon_codes = ["OFF50", "OFF35"];

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

loginBtn.addEventListener("click", () => {
  if (!emailInp.value || !passwordInp.value) {
    return alert("Email or password cannot be empty");
  }

  // TASK : Use Regex to validate email id's for gmail, yahoo $ outlook
  if (!emailInp.value.includes("@")) {
    return alert("Incorrect Email");
  }

  if (passwordInp.value === "pass123OK") {
    const user = {
      email: emailInp.value,
      userID: Math.random() * 10,
    };

    localStorage.setItem("user", JSON.stringify(user));
    document.querySelector(".layover").style.display = "none";
    location.reload();
  } else {
    return alert("Incorrect password");
  }
});

if (checkoutTotal === 0) {
  emptyCart.style.display = "block";
  notEmptyCart.style.display = "none";
} else {
  emptyCart.style.display = "none";
  notEmptyCart.style.display = "block";

  couponBtn.addEventListener("click", () => {
    const code = couponVal.value;

    if (!coupon_codes.includes(code)) {
      alert("Code is not valid!");
      return;
    }

    // TASK : Use loop here =
    if (code === "OFF50") {
      if (checkoutTotal >= 2000) {
        notEmptyCartPara.innerHTML = "";
        notEmptyCartPara.append("TOTAL: $ " + checkoutTotal * 0.5);
      } else {
        alert("Add items worth $2000 or above");
      }
    } else if (code === "OFF35") {
      notEmptyCartPara.innerHTML = "";
      notEmptyCartPara.append("TOTAL: $ " + checkoutTotal * 0.65);
    }
    // =
  });

  notEmptyCartPara.append("TOTAL: $ " + checkoutTotal);
}

// Validate id user is logged in or not
const user = localStorage.getItem("user");
if (!user) {
  checkoutBtn.append("Login to continue");
  checkoutBtn.disabled = true;
  setTimeout(() => {
    document.querySelector(".layover").style.display = "flex";
  }, 2000);
} else {
  checkoutBtn.append("Checkout");
  checkoutBtn.disabled = false;
}
