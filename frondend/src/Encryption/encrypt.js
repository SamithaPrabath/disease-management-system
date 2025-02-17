import CryptoJS from "crypto-js";
 
const SECRET_KEY = import.meta.env.VITE_SECRET_KEY || "my-secret-key";

 // Encrypt and store token in sessionStorage
 export const encryptAndStoreToken = (token) => {
    const encryptedToken = CryptoJS.AES.encrypt(token, SECRET_KEY).toString();
    sessionStorage.setItem("token", encryptedToken);
    sessionStorage.setItem("tokenExpiry", Date.now() + 3600 * 1000); // 1 hour expiry
  };

  // Decrypt and retrieve token from sessionStorage
 export const decryptAndRetrieveToken = () => {
    const encryptedToken = sessionStorage.getItem("token");
    if (!encryptedToken) return null;
    const bytes = CryptoJS.AES.decrypt(encryptedToken, SECRET_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
  };

  // Check if the token is valid (not expired)
 export  const isTokenValid = () => {
    const tokenExpiry = sessionStorage.getItem("tokenExpiry");
    return tokenExpiry && Date.now() < parseInt(tokenExpiry);
  };
