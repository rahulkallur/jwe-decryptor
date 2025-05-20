import jose from "node-jose";
import jwt from "jsonwebtoken";

export const decryptJWE = async (token: string): Promise<any> => {
  const JWKCONFIG = {
    exportedJwk: {
      kty: "oct",
      kid: process.env.JWE_KID_KEY!,
      alg: "A256GCM",
      k: process.env.JWE_K_KEY!,
    },
  };

  try {
    const key = await jose.JWK.asKey(JWKCONFIG.exportedJwk);
    const decryptedJwe = await jose.JWE.createDecrypt(key).decrypt(token);
    const data = JSON.parse(decryptedJwe.payload.toString("utf-8"));
    return data;
  } catch (err: any) {
    console.error("Error decrypting JWE:", err);
    return null;
  }
};

export const verifyJwtToken = (jwtToken: string): any => {
  try {
    if (!process.env.APP_SECRET) {
      throw new Error('APP_SECRET environment variable is not set');
    }
    const decodedToken = jwt.verify(jwtToken, process.env.APP_SECRET);
    return decodedToken;
  } catch (err: any) {
    console.error('Error verifying JWT token:', err);
    return null;
  }
};
