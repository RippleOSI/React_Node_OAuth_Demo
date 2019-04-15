var CryptoJS = require("crypto-js");

const JWT_HEADER = {
  "alg": "HS256",
  "typ": "JWT"
}

const base64url = (source) => {  
  let encodedSource = CryptoJS.enc.Base64.stringify(source);
  encodedSource = encodedSource.replace(/=+$/, '');
  encodedSource = encodedSource.replace(/\+/g, '-');
  encodedSource = encodedSource.replace(/\//g, '_');
  return encodedSource;
};

const generateUnsignedToken = (data) => {  
  const header = JSON.stringify(JWT_HEADER);
  const utfHeader = CryptoJS.enc.Utf8.parse(header);
  var encodedHeader = base64url(utfHeader);  

  const body = JSON.stringify(data);
  const utfBody = CryptoJS.enc.Utf8.parse(body);
  var encodedData = base64url(utfBody);  
  return encodedHeader + "." + encodedData;
}

module.exports.generateUserProfileJwt = (profile) => {
  return generateUnsignedToken(profile);
}