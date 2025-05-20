import type { NextApiRequest, NextApiResponse } from "next";
import { decryptJWE, verifyJwtToken } from "../../utils/decryptJWE";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ error: "Missing JWE token" });
  }

  const decrypted = await decryptJWE(token);

  if (decrypted) {
    const decodedToken = verifyJwtToken(decrypted);
    return res.status(200).json(decodedToken);
  }

  return res.status(500).json({ error: "Failed to decrypt token" });
}
