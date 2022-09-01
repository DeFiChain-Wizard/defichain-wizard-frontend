export const toObject = (string: string) => {
  return JSON.parse(string)
}

export const toString = (obj: {} | []) => {
  return JSON.stringify(obj)
}

export const truncate = function (fullStr, strLen, separator) {
  if (fullStr.length <= strLen) return fullStr;
  
  separator = separator || '...';
  
  var sepLen = separator.length,
      charsToShow = strLen - sepLen,
      frontChars = Math.ceil(charsToShow/2),
      backChars = Math.floor(charsToShow/2);
  
  return fullStr.substr(0, frontChars) + 
         separator + 
         fullStr.substr(fullStr.length - backChars);
};