import axios from "axios";
import { base_url } from "../requesters";
export const getAgents = axios.get(`${base_url}/api/agent`, {
  headers: {
    Accept: "application/json",
  },
});

export function sendForgotEmail(mail) {
  return axios.post("/api/agent/forgot-password", mail, {
    headers: {
      Accept: "application/json",
    },
  });
}

export function sendForgotCode(theCode) {
  return axios.post("/api/agent/reset-code", theCode, {
    headers: {
      Accept: "application/json",
    },
  });
}

export function sendReset(agentId, newPassword) {
  return axios.post(`/api/agent/reset/${agentId}`, newPassword, {
    headers: {
      Accept: "application/json",
    },
  });
}

export function sendRegister(formData) {
  return axios.post("/api/agent/register", formData, {
    headers: {
      Accept: "application/json",
    },
  });
}

export function sendLogin(formData) {
  return axios.post("/api/agent/login", formData, {
    headers: {
      Accept: "application/json",
    },
  });
}

export function getAgent(id) {
  return axios.get(`${base_url}/api/agent/${id}`, {
    headers: {
      Accept: "application/json",
    },
  });
}
