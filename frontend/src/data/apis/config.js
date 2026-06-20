let API_BASE_URL = "";
if (process.env.NODE_ENV === "production") {
    API_BASE_URL = process.env.VITE_API_BASE_URL
} else{
    API_BASE_URL =  "http://localhost:3000/api/v1";
}

export const API_BASE_URL;

