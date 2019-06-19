const crypto = require("crypto");

module.exports = {
  encrypt(text) {
    const key = crypto.createCipher("aes-128-cbc", process.env.KEY);
    let encryptedText = key.update(text, "utf8", "hex");
    encryptedText += key.final("hex");
    return encryptedText;
  },

  decrypt(text) {
    const key = crypto.createDecipher("aes-128-cbc", process.env.KEY);
    let decryptedText = key.update(text, "hex", "utf8");
    decryptedText += key.final("utf8");
    return decryptedText;
  }
};
