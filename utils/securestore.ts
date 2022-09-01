import { CustomMessage } from "@defichainwizard/core";
import * as SecureStore from "expo-secure-store";
import { toObject, toString } from "./helper";

// === storage handler ===
export async function setItem(key: string, value: any) {
  await SecureStore.setItemAsync(key, value);
}

export async function getItem(key: string) {
  let result = await SecureStore.getItemAsync(key);
  return result ? result : null;
}

export async function deleteItem(key: string) {
  await SecureStore.deleteItemAsync(key);
}

// === config ===
export const getConfig = async () => {
  const config = await getItem("config")
  return toObject(toObject(config))
}

export const saveConfig = async (config: CustomMessage) => {
  await setItem('config', toString(toString(config)))
}

// === address ===
export const getAddress = async () => {
  const address = await getItem("address")
  return address
}

export const saveAddress = async (address: string) => {
  await setItem('address', address)
}

// === vault ===
export const getVault = async () => {
  const vault = await getItem("vault")
  return vault
}

export const saveVault = async (vault: string) => {
  await setItem('vault', vault)
}