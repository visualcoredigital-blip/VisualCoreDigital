// Detecta si estamos en desarrollo o producción
const IS_PROD = import.meta.env.PROD; 

export const API_BASE_URL = IS_PROD 
  ? 'https://tu-backend-en-render.com'  // URL de Producción
  : 'http://localhost:5000';           // URL Local