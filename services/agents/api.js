import axios from "axios";
import { base_url } from "../requesters";
export const getAgents = axios.get(`${base_url}/api/agent`);

export function sendForgotEmail(mail) {
  return axios.post("/api/agent/forgot-password", mail);
}

export function sendForgotCode(theCode) {
  return axios.post("/api/agent/reset-code", theCode);
}

export function sendReset(agentId, newPassword) {
  return axios.post(`/api/agent/reset/${agentId}`, newPassword);
}

export function sendRegister(formData) {
  return axios.post("/api/agent/register", formData);
}

export function sendLogin(formData) {
  return axios.post("/api/agent/login", formData);
}

export function getAgent(id) {
  return axios.get(`${base_url}/api/agent/${id}`);
}
