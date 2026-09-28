const API_URL = "http://localhost:5000/api";

export async function getCustomers() {
  const response = await fetch(`${API_URL}/customers`);

  if (!response.ok) {
    throw new Error("Failed to fetch customers");
  }

  return response.json();
}

export async function getLeads() {
  const response = await fetch(`${API_URL}/leads`);

  if (!response.ok) {
    throw new Error("Failed to fetch leads");
  }

  return response.json();
}

export async function getFollowUps() {
  const response = await fetch(`${API_URL}/follow-ups`);

  if (!response.ok) {
    throw new Error("Failed to fetch follow-ups");
  }

  return response.json();
}

export async function getOrders() {
  const response = await fetch(`${API_URL}/orders`);

  if (!response.ok) {
    throw new Error("Failed to fetch orders");
  }

  return response.json();
}

export async function getProducts() {
  const response = await fetch(`${API_URL}/products`);

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json();
}