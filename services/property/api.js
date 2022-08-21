import axios from "axios";
import { base_url } from "../requesters";
export function addNewProperty(data) {
  return axios.post("/api/property/new", data, {
    headers: {
      Accept: "application/json",
    },
  });
}

export function getProperties() {
  return axios.get(`${base_url}/api/property/new`, {
    headers: {
      Accept: "application/json",
    },
  });
}

export function getRecent() {
  return axios.get(`${base_url}/api/property/new`, {
    headers: {
      Accept: "application/json",
    },
  });
}

export function getProperty(id) {
  return axios.get(`${base_url}/api/property/${id}`, {
    headers: {
      Accept: "application/json",
    },
  });
}

export function deleteProperty(id) {
  return axios.delete(`${base_url}/api/property/${id}`, {
    headers: {
      Accept: "application/json",
    },
  });
}

export function updatePropertyRequest({ id, data }) {
  return axios.put(`/api/property/${id}`, data, {
    headers: {
      Accept: "application/json",
    },
  });
}

export function getRelatedProperty(slug) {
  return axios.get(`${base_url}/api/property/related/${slug}`, {
    headers: {
      Accept: "application/json",
    },
  });
}

export function getPropertySlug(slug) {
  return axios.get(`${base_url}/api/property/main/${slug}`, {
    headers: {
      Accept: "application/json",
    },
  });
}

export function getQuery(slug) {
  return axios.get(`${base_url}/api/property/query/${slug}`, {
    headers: {
      Accept: "application/json",
    },
  });
}
