// Midtrans client — mock for development
// In production, install midtrans-client and use real keys

export async function createTransaction(params: {
  orderId: string;
  grossAmount: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  itemName: string;
}) {
  // In production, this would call Midtrans Snap API
  // For development, return a mock token
  console.log("[MIDTRANS MOCK] Creating transaction:", params);

  return {
    token: `mock-snap-token-${params.orderId}`,
    redirect_url: `${process.env.NEXT_PUBLIC_BASE_URL}/booking/status?code=${params.orderId}`,
  };
}

export async function verifySignature(body: {
  order_id: string;
  status_code: string;
  gross_amount: string;
  signature_key: string;
}): Promise<boolean> {
  // In production, verify using SHA-512 hash
  // For development, always return true
  console.log("[MIDTRANS MOCK] Verifying signature for:", body.order_id);
  return true;
}
