import api from '../../../shared/services/api';
import type { PagoRequest, PreferenciaResponse, PagoResponse } from '../types';

export const pagosService = {
  /**
   * Crea un pago/preferencia en Mercado Pago a través del backend
   */
  crearPago: async (payload: PagoRequest): Promise<PreferenciaResponse> => {
    const { data } = await api.post('/pagos/crear', payload);
    return data;
  },

  /**
   * Obtiene la información de un pago por su ID
   */
  obtenerPago: async (pagoId: number): Promise<PagoResponse> => {
    const { data } = await api.get(`/pagos/${pagoId}`);
    return data;
  },
};
