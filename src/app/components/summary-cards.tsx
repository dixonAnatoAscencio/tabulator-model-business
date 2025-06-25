'use client'

import React from 'react';
import { TrendingUp, DollarSign, Target, Clock } from 'lucide-react';

interface Totales {
  credits: {
    costo: number;
    ingreso: number;
    ganancia: number;
    roi: number;
    recuperacion: number | null;
  };
  polygon: {
    costo: number;
    ingreso: number;
    ganancia: number;
    roi: number;
    recuperacion: number | null;
  };
}

interface Config {
  numFlotas: number;
  dispositivosFlota: number;
  transaccionesBlockchainDia: number;
}

interface SummaryCardsProps {
  totales: Totales;
  config?: Config;
}

export const SummaryCards: React.FC<SummaryCardsProps> = ({ totales, config }) => {
  if (!totales || !totales.credits || !totales.polygon) {
    return (
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-6 border border-white/20">
        <h2 className="text-xl font-semibold text-white mb-4">Resumen Comparativo</h2>
        <p className="text-gray-400 text-center">No hay datos para mostrar</p>
      </div>
    );
  }

  const { credits, polygon } = totales;

  const MetricCard = ({ 
    title, 
    icon: Icon, 
    creditsValue, 
    polygonValue, 
    suffix = '', 
    isPercentage = false,
    isCurrency = false 
  }: {
    title: string;
    icon: React.ElementType;
    creditsValue: number;
    polygonValue: number;
    suffix?: string;
    isPercentage?: boolean;
    isCurrency?: boolean;
  }) => {
    const creditsDisplay = isCurrency ? `$${creditsValue.toFixed(2)}` : 
                          isPercentage ? `${creditsValue.toFixed(1)}%` : 
                          creditsValue.toFixed(2);
    
    const polygonDisplay = isCurrency ? `$${polygonValue.toFixed(2)}` : 
                          isPercentage ? `${polygonValue.toFixed(1)}%` : 
                          polygonValue.toFixed(2);

    const creditsBetter = creditsValue > polygonValue;
    const polygonBetter = polygonValue > creditsValue;

    return (
      <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/20">
        <div className="flex items-center space-x-3 mb-4">
          <Icon className="w-6 h-6 text-blue-400" />
          <h3 className="text-lg font-semibold text-white">{title}</h3>
        </div>
        
        <div className="space-y-4">
          {/* Credits */}
          <div className="flex justify-between items-center p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
            <span className="text-red-300 font-medium">Credits</span>
            <div className="flex items-center space-x-2">
              <span className={`text-xl font-bold ${creditsBetter ? 'text-green-400' : 'text-red-300'}`}>
                {creditsDisplay}{suffix}
              </span>
              {creditsBetter && <span className="text-green-400 text-sm">✓</span>}
            </div>
          </div>
          
          {/* Polygon */}
          <div className="flex justify-between items-center p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg">
            <span className="text-purple-300 font-medium">Polygon</span>
            <div className="flex items-center space-x-2">
              <span className={`text-xl font-bold ${polygonBetter ? 'text-green-400' : 'text-purple-300'}`}>
                {polygonDisplay}{suffix}
              </span>
              {polygonBetter && <span className="text-green-400 text-sm">✓</span>}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Cálculos generales
  const totalDispositivos = config ? config.numFlotas * config.dispositivosFlota : 0;
  const transaccionesMes = config ? totalDispositivos * config.transaccionesBlockchainDia * 30 : 0;

  return (
    <div className="mb-6">
      <h2 className="text-2xl font-bold text-white mb-6 text-center">
        📊 Resumen Comparativo
      </h2>
      
      {/* Métricas Generales */}
      {config && (
        <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-blue-500/20 to-indigo-500/10 backdrop-blur-sm rounded-xl p-4 border border-blue-500/30">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-300 mb-1">{config.numFlotas}</div>
              <div className="text-blue-200">Flotas</div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/10 backdrop-blur-sm rounded-xl p-4 border border-green-500/30">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-300 mb-1">{totalDispositivos}</div>
              <div className="text-green-200">Dispositivos</div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-purple-500/20 to-violet-500/10 backdrop-blur-sm rounded-xl p-4 border border-purple-500/30">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-300 mb-1">{transaccionesMes.toLocaleString('en-US')}</div>
              <div className="text-purple-200">Transacciones/Mes</div>
            </div>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Costos Totales"
          icon={DollarSign}
          creditsValue={credits.costo}
          polygonValue={polygon.costo}
          isCurrency={true}
        />
        
        <MetricCard
          title="Ingresos Totales"
          icon={TrendingUp}
          creditsValue={credits.ingreso}
          polygonValue={polygon.ingreso}
          isCurrency={true}
        />
        
        <MetricCard
          title="Ganancia Mensual"
          icon={Target}
          creditsValue={credits.ganancia}
          polygonValue={polygon.ganancia}
          isCurrency={true}
        />
        
        <MetricCard
          title="ROI"
          icon={TrendingUp}
          creditsValue={credits.roi}
          polygonValue={polygon.roi}
          isPercentage={true}
        />
      </div>

      {/* Período de Recuperación */}
      <div className="mt-6">
        <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <div className="flex items-center space-x-3 mb-4">
            <Clock className="w-6 h-6 text-yellow-400" />
            <h3 className="text-lg font-semibold text-white">Período de Recuperación</h3>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
              <div className="text-red-300 font-medium mb-2">Credits</div>
              <div className="text-2xl font-bold text-red-300">
                {credits.recuperacion ? `${credits.recuperacion.toFixed(1)} años` : 'N/A'}
              </div>
            </div>
            
            <div className="text-center p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
              <div className="text-purple-300 font-medium mb-2">Polygon</div>
              <div className="text-2xl font-bold text-purple-300">
                {polygon.recuperacion ? `${polygon.recuperacion.toFixed(1)} años` : 'N/A'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recomendación */}
      <div className="mt-6 p-6 bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-500/30 rounded-xl">
        <h3 className="text-lg font-semibold text-green-300 mb-3">💡 Recomendación</h3>
        {polygon.roi > credits.roi ? (
          <p className="text-green-200">
            <strong>Polygon</strong> ofrece mejor rentabilidad con un ROI de {polygon.roi.toFixed(1)}% vs {credits.roi.toFixed(1)}% de Credits.
            La ganancia adicional es de ${(polygon.ganancia - credits.ganancia).toFixed(2)}/mes.
          </p>
        ) : (
          <p className="text-green-200">
            <strong>Credits</strong> ofrece mejor rentabilidad con un ROI de {credits.roi.toFixed(1)}% vs {polygon.roi.toFixed(1)}% de Polygon.
            La ganancia adicional es de ${(credits.ganancia - polygon.ganancia).toFixed(2)}/mes.
          </p>
        )}
      </div>
    </div>
  );
}; 