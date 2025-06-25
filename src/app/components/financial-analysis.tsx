'use client'

import React from 'react';
import { TrendingUp, DollarSign, BarChart3, Calculator, PieChart, Target } from 'lucide-react';

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
  precioDispositivo: number;
  costoPlanDatos: number;
  numNodos: number;
  costoAWSNodo: number;
  mantenimientoCredits: number;
  infraPolygon: number;
  tarifaBaseFija: number;
  tarifaBase: number;
  transaccionesBlockchainDia: number;
  comisionCredits: number;
  gasPolygon: number;
  precioMatic: number;
  comisionPolygon: number;
}

interface FinancialAnalysisProps {
  totales: Totales;
  config: Config;
}

export const FinancialAnalysis: React.FC<FinancialAnalysisProps> = ({ totales, config }) => {
  // Función para formatear números de manera consistente
  const formatNumber = (num: number): string => {
    return num.toLocaleString('en-US', { 
      minimumFractionDigits: 0,
      maximumFractionDigits: 0 
    });
  };

  const { credits, polygon } = totales;

  // Cálculos CAPEX
  const dispositivosTotal = config.numFlotas * config.dispositivosFlota;
  const capexDispositivos = dispositivosTotal * config.precioDispositivo;
  const capexInfraCredits = config.numNodos * config.costoAWSNodo * 12; // Anual
  const capexInfraPolygon = config.infraPolygon * 12; // Anual
  
  const capexCreditsTotal = capexDispositivos + capexInfraCredits;
  const capexPolygonTotal = capexDispositivos + capexInfraPolygon;

  // Cálculos OPEX mensuales
  const opexCredits = credits.costo;
  const opexPolygon = polygon.costo;

  // Métricas financieras avanzadas
  const ebitdaCreditsAnual = credits.ganancia * 12;
  const ebitdaPolygonAnual = polygon.ganancia * 12;
  
  const paybackCredits = capexCreditsTotal / ebitdaCreditsAnual; // en años
  const paybackPolygon = capexPolygonTotal / ebitdaPolygonAnual; // en años

  const irrCredits = (ebitdaCreditsAnual / capexCreditsTotal) * 100;
  const irrPolygon = (ebitdaPolygonAnual / capexPolygonTotal) * 100;

  // Desglose de costos por categoría
  const costosCreditsDesglose = {
    conectividad: config.numFlotas * config.dispositivosFlota * config.costoPlanDatos,
    blockchain: config.numFlotas * config.dispositivosFlota * config.transaccionesBlockchainDia * 30 * config.comisionCredits,
    infraestructura: (config.numNodos * config.costoAWSNodo + config.mantenimientoCredits),
  };

  const costosPolygonDesglose = {
    conectividad: config.numFlotas * config.dispositivosFlota * config.costoPlanDatos,
    blockchain: config.numFlotas * config.dispositivosFlota * config.transaccionesBlockchainDia * 30 * (config.gasPolygon * config.precioMatic),
    infraestructura: config.infraPolygon,
  };

  // Desglose de ingresos
  const ingresosDesglose = {
    tarifaFija: config.numFlotas * config.tarifaBaseFija,
    tarifaDispositivos: config.numFlotas * config.dispositivosFlota * config.tarifaBase,
    comisionesPolygon: config.numFlotas * config.dispositivosFlota * config.transaccionesBlockchainDia * 30 * config.comisionPolygon,
  };

  const MetricCard = ({ title, value, subtitle, color, icon: Icon }: {
    title: string;
    value: string;
    subtitle?: string;
    color: string;
    icon: React.ElementType;
  }) => (
    <div className={`bg-${color}-500/10 border border-${color}-500/20 rounded-xl p-6`}>
      <div className="flex items-center space-x-3 mb-3">
        <Icon className={`w-6 h-6 text-${color}-400`} />
        <h3 className="text-lg font-semibold text-white">{title}</h3>
      </div>
      <div className={`text-3xl font-bold text-${color}-300 mb-1`}>{value}</div>
      {subtitle && <div className="text-sm text-gray-400">{subtitle}</div>}
    </div>
  );

  return (
    <div className="space-y-8">
      {/* CAPEX vs OPEX Analysis */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
        <div className="flex items-center space-x-3 mb-6">
          <Calculator className="w-6 h-6 text-blue-400" />
          <h2 className="text-xl font-semibold text-white">Análisis CAPEX vs OPEX</h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* CAPEX */}
          <div>
            <h3 className="text-lg font-medium text-blue-300 mb-4">📊 CAPEX (Gastos de Capital)</h3>
            <div className="space-y-4">
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                <h4 className="font-medium text-blue-300 mb-3">Credits</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Dispositivos ({dispositivosTotal})</span>
                    <span className="text-white">${formatNumber(capexDispositivos)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Infraestructura (anual)</span>
                    <span className="text-white">${formatNumber(capexInfraCredits)}</span>
                  </div>
                  <hr className="border-blue-500/30" />
                  <div className="flex justify-between font-bold">
                    <span className="text-blue-300">Total CAPEX</span>
                    <span className="text-blue-300">${formatNumber(capexCreditsTotal)}</span>
                  </div>
                </div>
              </div>

              <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
                <h4 className="font-medium text-purple-300 mb-3">Polygon</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Dispositivos ({dispositivosTotal})</span>
                    <span className="text-white">${formatNumber(capexDispositivos)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Infraestructura (anual)</span>
                    <span className="text-white">${formatNumber(capexInfraPolygon)}</span>
                  </div>
                  <hr className="border-purple-500/30" />
                  <div className="flex justify-between font-bold">
                    <span className="text-purple-300">Total CAPEX</span>
                    <span className="text-purple-300">${formatNumber(capexPolygonTotal)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* OPEX */}
          <div>
            <h3 className="text-lg font-medium text-orange-300 mb-4">🔄 OPEX (Gastos Operacionales)</h3>
            <div className="space-y-4">
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                <h4 className="font-medium text-red-300 mb-3">Credits (Mensual)</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Conectividad</span>
                    <span className="text-white">${costosCreditsDesglose.conectividad.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Blockchain</span>
                    <span className="text-white">${costosCreditsDesglose.blockchain.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Infraestructura</span>
                    <span className="text-white">${costosCreditsDesglose.infraestructura.toFixed(2)}</span>
                  </div>
                  <hr className="border-red-500/30" />
                  <div className="flex justify-between font-bold">
                    <span className="text-red-300">Total OPEX/mes</span>
                    <span className="text-red-300">${opexCredits.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
                <h4 className="font-medium text-purple-300 mb-3">Polygon (Mensual)</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Conectividad</span>
                    <span className="text-white">${costosPolygonDesglose.conectividad.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Blockchain</span>
                    <span className="text-white">${costosPolygonDesglose.blockchain.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Infraestructura</span>
                    <span className="text-white">${costosPolygonDesglose.infraestructura.toFixed(2)}</span>
                  </div>
                  <hr className="border-purple-500/30" />
                  <div className="flex justify-between font-bold">
                    <span className="text-purple-300">Total OPEX/mes</span>
                    <span className="text-purple-300">${opexPolygon.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Métricas Financieras Avanzadas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-3">
            <Target className="w-6 h-6 text-red-400" />
            <h3 className="text-lg font-semibold text-white">Payback Credits</h3>
          </div>
          <div className="text-3xl font-bold text-red-300 mb-1">{paybackCredits.toFixed(1)} años</div>
        </div>
        
        <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-3">
            <Target className="w-6 h-6 text-purple-400" />
            <h3 className="text-lg font-semibold text-white">Payback Polygon</h3>
          </div>
          <div className="text-3xl font-bold text-purple-300 mb-1">{paybackPolygon.toFixed(1)} años</div>
        </div>
        
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-3">
            <TrendingUp className="w-6 h-6 text-blue-400" />
            <h3 className="text-lg font-semibold text-white">IRR Credits</h3>
          </div>
          <div className="text-3xl font-bold text-blue-300 mb-1">{irrCredits.toFixed(1)}%</div>
        </div>
        
        <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-3">
            <TrendingUp className="w-6 h-6 text-green-400" />
            <h3 className="text-lg font-semibold text-white">IRR Polygon</h3>
          </div>
          <div className="text-3xl font-bold text-green-300 mb-1">{irrPolygon.toFixed(1)}%</div>
        </div>
      </div>

      {/* Desglose de Ingresos */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
        <div className="flex items-center space-x-3 mb-6">
          <PieChart className="w-6 h-6 text-green-400" />
          <h2 className="text-xl font-semibold text-white">Desglose de Ingresos Detallado</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
            <h3 className="font-medium text-green-300 mb-3">💰 Tarifa Base Fija</h3>
            <div className="text-2xl font-bold text-green-400 mb-1">
              ${formatNumber(ingresosDesglose.tarifaFija)}/mes
            </div>
            <div className="text-sm text-gray-400">
              {config.numFlotas} flotas × ${config.tarifaBaseFija}
            </div>
          </div>

          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
            <h3 className="font-medium text-blue-300 mb-3">📱 Tarifa por Dispositivos</h3>
            <div className="text-2xl font-bold text-blue-400 mb-1">
              ${formatNumber(ingresosDesglose.tarifaDispositivos)}/mes
            </div>
            <div className="text-sm text-gray-400">
              {dispositivosTotal} dispositivos × ${config.tarifaBase}
            </div>
          </div>

          <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
            <h3 className="font-medium text-purple-300 mb-3">⚡ Comisiones Polygon</h3>
            <div className="text-2xl font-bold text-purple-400 mb-1">
              ${ingresosDesglose.comisionesPolygon.toFixed(2)}/mes
            </div>
            <div className="text-sm text-gray-400">
              Solo con Polygon (+${(ingresosDesglose.comisionesPolygon * 12).toFixed(0)}/año)
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-500/30 rounded-lg">
          <div className="grid grid-cols-2 gap-6">
            <div className="text-center">
              <div className="text-sm text-gray-300 mb-1">📊 Ingresos Totales Credits</div>
                              <div className="text-2xl font-bold text-green-400">
                  ${formatNumber(ingresosDesglose.tarifaFija + ingresosDesglose.tarifaDispositivos)}/mes
                </div>
                <div className="text-sm text-gray-400">
                  ${formatNumber((ingresosDesglose.tarifaFija + ingresosDesglose.tarifaDispositivos) * 12)}/año
                </div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-300 mb-1">📊 Ingresos Totales Polygon</div>
                              <div className="text-2xl font-bold text-purple-400">
                  ${formatNumber(ingresosDesglose.tarifaFija + ingresosDesglose.tarifaDispositivos + ingresosDesglose.comisionesPolygon)}/mes
                </div>
                <div className="text-sm text-gray-400">
                  ${formatNumber((ingresosDesglose.tarifaFija + ingresosDesglose.tarifaDispositivos + ingresosDesglose.comisionesPolygon) * 12)}/año
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 