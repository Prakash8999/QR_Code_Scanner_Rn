// export type QRCodeDetails = 
//   | { type: "WiFi"; details: WiFiDetails }
//   | { type: "vCard"; details: VCardDetails }
//   | { type: "URL"; details: URLDetails }
//   | { type: "Unknown"; rawData: string };


export interface QRCodeDetails {
  type: string; // The type of the QR code (e.g., "WiFi", "vCard", "URL", etc.)
  details: Record<string, any>; // The parsed data (e.g., WiFi SSID, URL, etc.)
}

interface WiFiDetails {
  ssid: string;
  securityType: string;
  password: string;
  hidden: boolean;
}

interface VCardDetails {
  name?: string;
  fullName?: string;
  mobile?: string;
  homePhone?: string;
  email?: string;
  url?: string;
}

interface URLDetails {
  url: string;
}

// export const parseQRCodeData = (rawData: string): QRCodeDetails => {
//   // Trim whitespace for safety
//   const data = rawData.trim();

//   // WiFi QR Code
//   if (data.startsWith("WIFI:")) {
//     const wifiDetails: WiFiDetails = {
//       ssid: "Unknown",
//       securityType: "Unknown",
//       password: "Unknown",
//       hidden: false,
//     };


//     // Look for different possible parameters in any order
//     const wifiPattern = /WIFI:S:([^;]+);T:([^;]+);P:([^;]+);H:([^;]*);/;
//     const match = data.match(wifiPattern);

//     if (match) {
//       // Assign values if matched
//       wifiDetails.ssid = match[1] || "Unknown";
//       wifiDetails.securityType = match[2] || "Unknown";
//       wifiDetails.password = match[3] || "Unknown";
//       wifiDetails.hidden = match[4] === "true"; // If H is 'true', the WiFi is hidden
//     }

//     // If no match found with the expected pattern, we try a more flexible parsing strategy
//     const params = data.slice(5).split(';');
//     params.forEach(param => {
//       const [key, value] = param.split(':');
//       if (key && value) {
//         switch (key) {
//           case 'S':
//             wifiDetails.ssid = value || "Unknown";
//             break;
//           case 'T':
//             wifiDetails.securityType = value || "Unknown";
//             break;
//           case 'P':
//             wifiDetails.password = value || "Unknown";
//             break;
//           case 'H':
//             wifiDetails.hidden = value === "true";
//             break;
//           default:
//             break;
//         }
//       }
//     });

//     return { type: "WiFi", details: wifiDetails };
//   }

//   // vCard QR Code
//   if (data.startsWith("BEGIN:VCARD")) {
//     const vCardDetails: VCardDetails = {};
//     const lines = data.split("\n");

//     lines.forEach((line) => {
//       if (line.startsWith("N;")) {
//         vCardDetails.name = line.split(":")[1] || "Unknown";
//       } else if (line.startsWith("FN;")) {
//         vCardDetails.fullName = line.split(":")[1] || "Unknown";
//       } else if (line.startsWith("TEL;CELL")) {
//         vCardDetails.mobile = line.split(":")[1] || "Unknown";
//       } else if (line.startsWith("TEL;HOME;VOICE")) {
//         vCardDetails.homePhone = line.split(":")[1] || "Unknown";
//       } else if (line.startsWith("EMAIL:")) {
//         vCardDetails.email = line.split(":")[1] || "Unknown";
//       } else if (line.startsWith("URL:")) {
//         vCardDetails.url = line.split(":")[1] || "Unknown";
//       }
//     });

//     return { type: "vCard", details: vCardDetails };
//   }

//   // URL QR Code
//   if (data.startsWith("http://") || data.startsWith("https://")) {
//     const urlDetails: URLDetails = { url: data };
//     return { type: "URL", details: urlDetails };
//   }

//   // Unknown QR Code
//   return { type: "Unknown", rawData };
// };

export const parseQRCodeData = (rawData: string): QRCodeDetails => {
  // Trim whitespace for safety
  const data = rawData.trim();

  // Handle WiFi QR Code
  if (data.startsWith("WIFI:")) {
    const wifiDetails: WiFiDetails = {
      ssid: "Unknown",
      securityType: "Unknown",
      password: "Unknown",
      hidden: false,
    };
    const wifiPattern = /WIFI:S:([^;]+);T:([^;]+);P:([^;]+);H:([^;]*);/;
    const match = data.match(wifiPattern);

    if (match) {
      wifiDetails.ssid = match[1] || "Unknown";
      wifiDetails.securityType = match[2] || "Unknown";
      wifiDetails.password = match[3] || "Unknown";
      wifiDetails.hidden = match[4] === "true";
    } else {
      const params = data.slice(5).split(';');
      params.forEach(param => {
        const [key, value] = param.split(':');
        if (key && value) {
          switch (key) {
            case 'S':
              wifiDetails.ssid = value || "Unknown";
              break;
            case 'T':
              wifiDetails.securityType = value || "Unknown";
              break;
            case 'P':
              wifiDetails.password = value || "Unknown";
              break;
            case 'H':
              wifiDetails.hidden = value === "true";
              break;
            default:
              break;
          }
        }
      });
    }
    return { type: "WiFi", details: wifiDetails };
  }

  // Handle vCard QR Code
  if (data.startsWith("BEGIN:VCARD")) {
    const vCardDetails: VCardDetails = {

    };
    const lines = data.split("\n");

    lines.forEach((line) => {
      if (line.startsWith("N;")) {
        vCardDetails.name = line.split(":")[1] || "Unknown";
      } else if (line.startsWith("FN;")) {
        vCardDetails.fullName = line.split(":")[1] || "Unknown";
      } else if (line.startsWith("TEL;CELL")) {
        vCardDetails.mobile = line.split(":")[1] || "Unknown";
      } else if (line.startsWith("TEL;HOME;VOICE")) {
        vCardDetails.homePhone = line.split(":")[1] || "Unknown";
      } else if (line.startsWith("EMAIL:")) {
        vCardDetails.email = line.split(":")[1] || "Unknown";
      } else if (line.startsWith("URL:")) {
        vCardDetails.url = line.split(":")[1] || "Unknown";
      }
    });
    return { type: "vCard", details: vCardDetails };
  }

  // Handle URL QR Code
  if (data.startsWith("http://") || data.startsWith("https://")) {
    return { type: "URL", details: { url: data } };
  }

  // Handle Aztec QR Code (just a simple placeholder for now)
  if (data.startsWith("AZTEC:")) {
    return { type: "Aztec", details: { data } };
  }

  // Handle DataMatrix QR Code (just a simple placeholder for now)
  if (data.startsWith("DATAMATRIX:")) {
    return { type: "DataMatrix", details: { data } };
  }

  // Handle Codebar QR Code (just a simple placeholder for now)
  if (data.startsWith("CODEBAR:")) {
    return { type: "Codebar", details: { data } };
  }

  // If the QR code is not recognized, treat it as a generic text or unknown type
  return { type: "Unknown", details: { rawData: data } };
};
