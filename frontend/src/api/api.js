import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api", // or use deployed backend URL
});

export const fetchListings = (filters) =>
  API.get("/listings", { params: filters });

export const createListing = (data) =>
  API.post("/listings", data);
