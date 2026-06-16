import { initMercadoPago } from '@mercadopago/sdk-react';

/**
 * Inicializa el SDK de Mercado Pago.
 * Debe llamarse una sola vez al inicio de la aplicación (ej. en App.tsx o main.tsx).
 */
export const initializeMercadoPago = () => {
  const publicKey = import.meta.env.VITE_MP_PUBLIC_KEY;
  
  if (!publicKey) {
    console.error('Mercado Pago Public Key no encontrada en las variables de entorno.');
    return;
  }

  // Inicializamos el SDK con la llave pública
  initMercadoPago(publicKey, { locale: 'es-AR' }); // Ajustar locale según sea necesario
};
