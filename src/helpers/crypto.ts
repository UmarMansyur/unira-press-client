import CryptoJS from 'crypto-js';

const secret_key = "KhanaZulfanaImam";

const encrypt = (text: string) => {
  const encrypted = CryptoJS.AES.encrypt(text, secret_key).toString();
  return encrypted.replace(/\//g, "_").replace(/\+/g, "-").replace(/\=/g, "~");
};

const decrypt = (text: string) => {
  const revertedText = text.replace(/_/g, "/").replace(/-/g, "+").replace(/~/g, "=");
  const decrypted = CryptoJS.AES.decrypt(revertedText, secret_key).toString(CryptoJS.enc.Utf8);
  return decrypted;
};

export { encrypt, decrypt };