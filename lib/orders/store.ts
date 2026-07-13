import { promises as fs } from "fs";
import path from "path";
import type { OrderRecord } from "@/lib/types";

const memory = new Map<string, OrderRecord>();
const dataDir = path.join(process.cwd(), ".data");
const ordersFile = path.join(dataDir, "orders.json");

async function readFileOrders(): Promise<OrderRecord[]> {
  try {
    const raw = await fs.readFile(ordersFile, "utf8");
    return JSON.parse(raw) as OrderRecord[];
  } catch {
    return [];
  }
}

async function writeFileOrders(orders: OrderRecord[]) {
  await fs.mkdir(dataDir, { recursive: true });
  await fs.writeFile(ordersFile, JSON.stringify(orders, null, 2), "utf8");
}

export async function saveOrder(order: OrderRecord) {
  memory.set(order.reference, order);
  const orders = await readFileOrders();
  const existingIndex = orders.findIndex(
    (o) => o.reference === order.reference || o.id === order.id || (order.stripeSessionId && o.stripeSessionId === order.stripeSessionId)
  );
  if (existingIndex >= 0) {
    orders[existingIndex] = order;
  } else {
    orders.push(order);
  }
  await writeFileOrders(orders);
  return order;
}

export async function getOrderByReference(reference: string, email?: string) {
  const fromMemory = memory.get(reference);
  if (fromMemory && (!email || fromMemory.email === email.toLowerCase())) {
    return fromMemory;
  }
  const orders = await readFileOrders();
  return (
    orders.find(
      (o) =>
        o.reference.toLowerCase() === reference.toLowerCase() &&
        (!email || o.email === email.toLowerCase())
    ) ?? null
  );
}

export async function getOrderById(id: string) {
  for (const order of memory.values()) {
    if (order.id === id) return order;
  }
  const orders = await readFileOrders();
  return orders.find((o) => o.id === id) ?? null;
}

export async function getOrderByStripeSession(sessionId: string) {
  for (const order of memory.values()) {
    if (order.stripeSessionId === sessionId) return order;
  }
  const orders = await readFileOrders();
  return orders.find((o) => o.stripeSessionId === sessionId) ?? null;
}
