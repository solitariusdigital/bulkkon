export function convertNumber(number) {
  return number.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

export function fourGenerator() {
  return Math.floor(1000 + Math.random() * 9000);
}

export function sixGenerator() {
  return Math.floor(100000 + Math.random() * 900000);
}

export function convertDate(date) {
  return new Date(date).toLocaleDateString("fa-IR");
}

export function abbreviateNumber(num) {
  return new Intl.NumberFormat("en-GB", {
    notation: "compact",
    compactDisplay: "short",
  }).format(num);
}

export function convertFaToEn(date) {
  const persianToArabicMap = {
    "۰": "0",
    "۱": "1",
    "۲": "2",
    "۳": "3",
    "۴": "4",
    "۵": "5",
    "۶": "6",
    "۷": "7",
    "۸": "8",
    "۹": "9",
  };
  return date
    .replace(/[۰-۹]/g, (match) => persianToArabicMap[match])
    .replace(/\//g, "-");
}

export function sortPricesByDate(prices) {
  const sortedKeys = Object.keys(prices).sort((a, b) => {
    return (
      new Date(a.replace(/-/g, "/")).getTime() -
      new Date(b.replace(/-/g, "/")).getTime()
    );
  });
  const sortedPrices = {};
  sortedKeys.forEach((key) => {
    sortedPrices[key] = prices[key];
  });
  return sortedPrices;
}

export function onlyLettersAndNumbers(str) {
  return Boolean(str.match(/^[A-Za-z0-9]*$/));
}

// upload media into s3 bucket
export async function uploadMedia(
  media,
  mediaId,
  mediaFolder,
  subFolder,
  format
) {
  const file = media;
  const res = await fetch(
    `/api/upload?file=${mediaFolder}/${subFolder}/${mediaId}${format}`
  );
  const { url, fields } = await res.json();

  const formData = new FormData();
  Object.entries({ ...fields, file }).forEach(([key, value]) => {
    formData.append(key, value);
  });

  await fetch(url, {
    method: "POST",
    body: formData,
  });
}

export function replaceSpacesAndHyphens(str) {
  let result = "";
  for (let i = 0; i < str.length; i++) {
    if (str[i] === " ") {
      result += "-";
    } else if (str[i] === "-") {
      result += " ";
    } else {
      result += str[i];
    }
  }
  return result;
}

export function sliceString(string, number) {
  return string.slice(0, number).split(" ").slice(0, -1).join(" ") + "...";
}

export function areAllStatesValid(states) {
  for (const state of states) {
    const values = Object.values(state);
    for (const value of values) {
      if (value === "") {
        return false;
      }
    }
  }
  return true;
}

export function validateEmail(value) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value);
}

export function extractParagraphs(text) {
  return text
    .split(/-{3,}|\n\n+/)
    .filter((paragraph) => paragraph.trim() !== "");
}
