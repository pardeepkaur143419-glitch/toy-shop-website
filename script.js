// TOYLAND PRODUCTS

const products = [
    {
        id: 1,
        name: "Cute Teddy Bear",
        category: "Soft Toys",
        price: 599,
        image: "https://images.unsplash.com/photo-1559454403-b8fb88521f11?w=500"
    },
    {
        id: 2,
        name: "Plush Bunny",
        category: "Soft Toys",
        price: 449,
        image: "https://images.unsplash.com/photo-1583301286816-f4f05e1e8b25?w=500"
    },
    {
        id: 3,
        name: "Racing Toy Car",
        category: "Cars",
        price: 299,
        image: "https://images.unsplash.com/photo-1594787318286-3d835c1d207f?w=500"
    },
    {
        id: 4,
        name: "Sport Car",
        category: "Cars",
        price: 399,
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500"
    },
    {
        id: 5,
        name: "Cute Fashion Doll",
        category: "Dolls",
        price: 799,
        image: "https://images.unsplash.com/photo-1607453998774-d533f65dac99?w=500"
    },
    {
        id: 6,
        name: "Princess Doll",
        category: "Dolls",
        price: 699,
        image: "https://images.unsplash.com/photo-1599629954294-14df9ec1f2e7?w=500"
    },
    {
        id: 7,
        name: "Building Blocks",
        category: "Educational",
        price: 499,
        image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=500"
    },
    {
        id: 8,
        name: "Puzzle Game",
        category: "Educational",
        price: 349,
        image: "https://images.unsplash.com/photo-1606503153255-59d8b8b8219e?w=500"
    }
];

let cart = [];

// DISPLAY PRODUCTS

const productList = document.getElementById("product-list");

function displayProducts(items) {
    productList.innerHTML = "";

    if (items.length === 0) {
        productList.innerHTML =
            '<h3 class="no-products">No toys found! Try another search.</h3>';
        return;
    }

    items.forEach(product => {
        productList.innerHTML += `
            <div class="product-card">
                <img src="${product.image}"
                     alt="${product.name}"
                     onerror="this.src='https://placehold.co/500x300?text=Toyland'">

                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p>${product.category}</p>
                    <div class="price">₹${product.price}</div>

                    <button class="add-btn"
                        onclick="addToCart(${product.id})">
                        Add to Cart +
                    </button>
                </div>
            </div>
        `;
    });
}

displayProducts(products);

// ADD TO CART

function addToCart(id) {
    const product = products.find(item => item.id === id);

    const existing = cart.find(item => item.id === id);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({...product, quantity: 1});
    }

    updateCart();

    document.getElementById("cart-overlay").classList.add("active");
}

// UPDATE CART

function updateCart() {
    const cartItems = document.getElementById("cart-items");

    let total = 0;
    let count = 0;

    cartItems.innerHTML = "";

    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Your cart is empty! 🧸</p>";
    }

    cart.forEach(item => {
        total += item.price * item.quantity;
        count += item.quantity;

        cartItems.innerHTML += `
            <div class="cart-item">
                <div>
                    <h4>${item.name}</h4>
                    <p>₹${item.price} × ${item.quantity}</p>
                </div>

                <div>
                    <button onclick="changeQuantity(${item.id}, -1)">−</button>
                    <button onclick="changeQuantity(${item.id}, 1)">+</button>
                    <button onclick="removeItem(${item.id})">✕</button>
                </div>
            </div>
        `;
    });

    document.getElementById("cart-count").innerText = count;
    document.getElementById("cart-total").innerText = total;
}

// CHANGE QUANTITY

function changeQuantity(id, amount) {
    const item = cart.find(item => item.id === id);

    if (!item) return;

    item.quantity += amount;

    if (item.quantity <= 0) {
        cart = cart.filter(item => item.id !== id);
    }

    updateCart();
}

// REMOVE PRODUCT

function removeItem(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
}

// OPEN AND CLOSE CART

document.getElementById("cart-btn").onclick = () => {
    document.getElementById("cart-overlay").classList.add("active");
};

document.getElementById("close-cart").onclick = () => {
    document.getElementById("cart-overlay").classList.remove("active");
};

// CLOSE CART ON BACKGROUND CLICK

document.getElementById("cart-overlay").addEventListener("click", function(e) {
    if (e.target === this) {
        this.classList.remove("active");
    }
});

// CHECKOUT

document.getElementById("checkout").onclick = () => {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
    );

    alert("Thank you for shopping at TOYLAND! 🎉\nYour order total is ₹" + total);

    cart = [];
    updateCart();
    document.getElementById("cart-overlay").classList.remove("active");
};

// SEARCH PRODUCTS

document.getElementById("search").addEventListener("input", function() {
    const value = this.value.toLowerCase();

    const filtered = products.filter(product =>
        product.name.toLowerCase().includes(value) ||
        product.category.toLowerCase().includes(value)
    );

    displayProducts(filtered);
});

// CATEGORY FILTER

document.getElementById("filter").addEventListener("change", function() {
    const category = this.value;

    const filtered = category === "All"
        ? products
        : products.filter(item => item.category === category);

    displayProducts(filtered);
});

// CATEGORY CARDS

document.querySelectorAll(".category-card").forEach(card => {
    card.addEventListener("click", () => {
        const category = card.dataset.category;

        document.getElementById("filter").value = category;

        displayProducts(
            products.filter(item => item.category === category)
        );

        document.getElementById("shop").scrollIntoView({
            behavior: "smooth"
        });
    });
});

// MOBILE MENU

document.getElementById("menu-btn").onclick = () => {
    document.querySelector("nav").classList.toggle("active");
};

document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", () => {
        document.querySelector("nav").classList.remove("active");
    });
});

// CONTACT FORM

document.getElementById("contact-form").addEventListener("submit", function(e) {
    e.preventDefault();

    document.getElementById("contact-message").innerText =
        "Thank you! Your message has been received.";

    this.reset();
});