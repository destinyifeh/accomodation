import axios from "axios";
import { base_url } from "../requesters";
export const getAgents = axios.get(`${base_url}/api/agent`, {
  headers: {
    "Content-Type": "application/json",
  },
});

export function sendForgotEmail(mail) {
  return axios.post("/api/agent/forgot-password", mail, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export function sendForgotCode(theCode) {
  return axios.post("/api/agent/reset-code", theCode, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export function sendReset(agentId, newPassword) {
  return axios.post(`/api/agent/reset/${agentId}`, newPassword, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export function sendRegister(formData) {
  return axios.post("/api/agent/register", formData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export function sendLogin(formData) {
  return axios.post("/api/agent/login", formData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export function getAgent(id) {
  return axios.get(`${base_url}/api/agent/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
