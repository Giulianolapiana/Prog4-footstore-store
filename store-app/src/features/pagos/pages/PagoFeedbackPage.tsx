import { useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { CheckCircle, XCircle, Clock, ArrowRight } from 'lucide-react';
import { useCartStore } from '../../../store/cart.store';

export const PagoFeedbackPage = () => {
  const { status } = useParams<{ status: string }>(); // 'exito', 'pendiente', 'error'
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const clearCart = useCartStore((state) => state.clearCart);

  const paymentId = searchParams.get('payment_id');
  const collectionId = searchParams.get('collection_id');
  const externalReference = searchParams.get('external_reference');

  useEffect(() => {
    // Si fue exitoso o pendiente, nos aseguramos de limpiar el carrito
    if (status === 'exito' || status === 'pendiente') {
      clearCart();
    }
  }, [status, clearCart]);

  const getConfig = () => {
    switch (status) {
      case 'exito':
        return {
          icon: <CheckCircle className="w-16 h-16 text-green-500" />,
          title: '¡Pago exitoso!',
          message: 'Tu pago ha sido procesado correctamente. En breve comenzaremos a preparar tu pedido.',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200'
        };
      case 'pendiente':
        return {
          icon: <Clock className="w-16 h-16 text-yellow-500" />,
          title: 'Pago pendiente',
          message: 'Tu pago está en proceso de validación. Te avisaremos cuando se confirme.',
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-200'
        };
      case 'error':
      default:
        return {
          icon: <XCircle className="w-16 h-16 text-red-500" />,
          title: 'Error en el pago',
          message: 'Hubo un problema al procesar tu pago. Por favor, intenta de nuevo desde tus pedidos.',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200'
        };
    }
  };

  const config = getConfig();

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-10 animate-fade-in">
      <div className={`max-w-md w-full bg-white p-8 rounded-2xl shadow-lg border ${config.borderColor} text-center`}>
        <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-6 ${config.bgColor}`}>
          {config.icon}
        </div>
        
        <h1 className="text-2xl font-bold text-[#151c27] mb-3">{config.title}</h1>
        <p className="text-[#5b4038] mb-6">{config.message}</p>
        
        {paymentId && status !== 'error' && (
          <div className="bg-gray-50 rounded-lg p-3 mb-6 text-sm text-gray-600 border border-gray-100">
            <span className="font-semibold block mb-1">Comprobante:</span>
            #{paymentId || collectionId}
          </div>
        )}

        <button
          onClick={() => navigate('/orders')}
          className="w-full bg-[#ae3200] hover:bg-[#8a2700] text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
        >
          Ver mis pedidos <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
