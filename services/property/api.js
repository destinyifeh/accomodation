import axios from "axios";
import { base_url } from "../requesters";
export function addNewProperty(data) {
  return axios.post("/api/property/new", data);
}

export function getProperties() {
  return axios.get(`${base_url}/api/property/new`);
}

export function getRecent() {
  return axios.get(`${base_url}/api/property/new`);
}

export function getProperty(id) {
  return axios.get(`${base_url}/api/property/${id}`);
}

export function deleteProperty(id) {
  return axios.delete(`${base_url}/api/property/${id}`);
}

export function updatePropertyRequest({ id, data }) {
  return axios.put(`/api/property/${id}`, data);
}

export function getRelatedProperty(slug) {
  return axios.get(`${base_url}/api/property/related/${slug}`);
}

export function getPropertySlug(slug) {
  return axios.get(`${base_url}/api/property/main/${slug}`);
}

export function getQuery(slug) {
  return axios.get(`${base_url}/api/property/query/${slug}`);
}
