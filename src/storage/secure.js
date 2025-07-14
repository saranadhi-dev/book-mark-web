import CryptoJS from "crypto-js";

const key = "my-book-mark-data-secure-key";
const iv = "my-book-mark-data-secure-iv";

export const encryptData = (data) => {
    const encrypted = CryptoJS.AES.encrypt(
        data,
        CryptoJS.enc.Utf8.parse(key),
        {
            iv: CryptoJS.enc.Utf8.parse(iv),
            padding: CryptoJS.pad.Pkcs7,
            mode: CryptoJS.mode.CBC
        }
    ).toString();
    return encrypted;
}

export const decryptData = (data) => {
    const bytes = CryptoJS.AES.decrypt(
        data,
        CryptoJS.enc.Utf8.parse(key),
        {
            iv: CryptoJS.enc.Utf8.parse(iv),
            padding: CryptoJS.pad.Pkcs7,
            mode: CryptoJS.mode.CBC
        }
    );
    const decryptData = bytes.toString(CryptoJS.enc.Utf8)
    return decryptData;
}