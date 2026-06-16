import { useState, useEffect } from 'react';
import { Wallet } from '@mercadopago/sdk-react';
import { useCrearPago } from '../hooks';

interface MercadoPagoButtonProps {
  pedidoId: number;
  montoTotal: number;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export const MercadoPagoButton = ({ pedidoId, montoTotal, onSuccess, onError }: MercadoPagoButtonProps) => {
  const { mutate, data: preferencia, isPending, isError, error } = useCrearPago();
  const [preferenceId, setPreferenceId] = useState<string | null>(null);

  // Cuando la mutación es exitosa, guardamos el ID de la preferencia
  useEffect(() => {
    if (preferencia?.preference_id) {
      setPreferenceId(preferencia.preference_id);
      if (onSuccess) onSuccess();
    }
  }, [preferencia, onSuccess]);

  useEffect(() => {
    if (isError && error && onError) {
      onError(error);
    }
  }, [isError, error, onError]);

  const handleCrearPreferencia = () => {
    mutate({ pedido_id: pedidoId });
  };

  // Si ya tenemos el ID de preferencia, mostramos el Wallet de Mercado Pago
  if (preferenceId) {
    return (
      <div className="w-full mt-4 animate-fade-in">
        <Wallet 
          initialization={{ preferenceId: preferenceId, redirectMode: 'modal' }} 
          customization={{ texts: { valueProp: 'security_details' } }}
        />
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center gap-3">
      <button
        onClick={handleCrearPreferencia}
        disabled={isPending}
        className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-300 shadow-md flex justify-center items-center gap-2
          ${isPending 
            ? 'bg-blue-400 cursor-not-allowed' 
            : 'bg-blue-500 hover:bg-blue-600 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0'
          }
        `}
      >
        {isPending ? (
          <>
            <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Procesando...
          </>
        ) : (
          `Pagar $${montoTotal.toFixed(2)} con Mercado Pago`
        )}
      </button>

      {isError && (
        <p className="text-red-500 text-sm mt-2 font-medium bg-red-50 p-3 rounded-md w-full border border-red-100">
          Ocurrió un error al iniciar el pago. Intenta nuevamente.
        </p>
      )}
    </div>
  );
};
