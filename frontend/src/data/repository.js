import axios from "axios";

// --- Constants ----------------------------------------------------------------------------------
const API_HOST = "http://localhost:4000";
const USER_KEY = "user";

// --- User ---------------------------------------------------------------------------------------
async function verifyUser(username, password) {
  try {
    const response = await axios.get(`${API_HOST}/api/users/login`, {
      params: { username, password }
    });
    const user = response.data;

    if (user !== null) {
      setUser(user);
    }
    return user;

  } catch (error) {
    if (error.response && error.response.status === 401) {
      // Unauthorized: Incorrect username or password
      return { error: 'Incorrect username or password. Please try again.' };
    } else {
      // Other errors, e.g., network error
      console.error('Error verifying user:', error);
      throw error;
    }
  }
}

async function findUser(username) { 
  const response = await axios.get(API_HOST + `/api/users/select/${username}`);
  return response.data;
}

async function createUser(user) {
  const response = await axios.post(API_HOST + "/api/users", user);

  return response.data;
}

async function updateUser(originalUsername, user) {
  const response = await axios.post(`${API_HOST}/api/users/${originalUsername}`, user);
  return response.data;
}


async function deleteUser(username) {
  const response = await axios.delete(`${API_HOST}/api/users/${username}`);
  return response.data;
}

// --- Post ---------------------------------------------------------------------------------------
async function getPosts() {
  const response = await axios.get(API_HOST + "/api/posts");

  return response.data;
}

async function createPost(post) {
  const response = await axios.post(API_HOST + "/api/posts", post);

  return response.data;
}

// --- Product ------------------------------------------------------------------------------------
async function getProducts() {
  const response = await axios.get(API_HOST + "/api/products");

  return response.data;
}

async function getProduct(id) {
  const response = await axios.get(API_HOST + `/api/products/select/${id}`);

  return response.data;
}

async function createProduct(product) {
  const response = await axios.post(API_HOST + "/api/products", product);

  return response.data;
}

// --- Cart ---------------------------------------------------------------------------------------
async function getCart(userId) {
  const response = await axios.get(API_HOST + `/api/cart/${userId}`);
  return response.data;
}

async function addToCart(cartItem) {
  const response = await axios.post(API_HOST + "/api/cart", cartItem);
  return response.data;
}

async function updateCartItem(cartItem) {
  const response = await axios.put(API_HOST + "/api/cart", cartItem);
  return response.data;
}

async function removeFromCart(cartItem) {
  const response = await axios.delete(API_HOST + "/api/cart", { data: cartItem });
  return response.data;
}

// --- Helper functions to interact with local storage --------------------------------------------
function setUser(user) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

function getUser() {
  return JSON.parse(localStorage.getItem(USER_KEY));
}

function removeUser() {
  localStorage.removeItem(USER_KEY);
}

export {
  verifyUser, findUser, createUser,
  getPosts, createPost,
  getUser, removeUser, updateUser,
  deleteUser, getProducts, getProduct, createProduct,
  getCart, addToCart, updateCartItem, removeFromCart,
}
