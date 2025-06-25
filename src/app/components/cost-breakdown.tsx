'use client'

import React from 'react';
import { Calculator, Smartphone, Wifi, Cpu, DollarSign, Activity } from 'lucide-react';

interface Config {
  numFlotas: number;
  dispositivosFlota: number;
  precioDispositivo: number;
  costoPlanDatos: number;
  numNodos: number;
  costoAWSNodo: number;
  mantenimientoCredits: number;
  infraPolygon: number;
  transaccionesBlockchainDia: number;
  comisionCredits: number;
  gasPolygon: number;
  precioMatic: number;
  comisionPolygon: number;
}

interface CostBreakdownProps {
  config: Config;
}

export const CostBreakdown: React.FC<CostBreakdownProps> = ({ config }) => {
  // Función para formatear números de manera consistente
  const formatNumber = (num: number): string => {
    return num.toLocaleString('en-US', { 
      minimumFractionDigits: 0,
      maximumFractionDigits: 0 
    });
  };

  const dispositivosTotal = config.numFlotas * config.dispositivosFlota;
  const transaccionesMes = config.transaccionesBlockchainDia * 30;
  
  // Costos por dispositivo/mes
  const costoPorDispositivoSIM = config.costoPlanDatos;
  const costoPorDispositivoTxCredits = transaccionesMes * config.comisionCredits;
  const costoPorDispositivoTxPolygon = transaccionesMes * (config.gasPolygon * config.precioMatic);
  const costoPorDispositivoInfraCredits = (config.numNodos * config.costoAWSNodo + config.mantenimientoCredits) / dispositivosTotal;
  const costoPorDispositivoInfraPolygon = config.infraPolygon / dispositivosTotal;

  // Costos por flota/mes
  const costoPorFlotaSIM = config.dispositivosFlota * costoPorDispositivoSIM;
  const costoPorFlotaTxCredits = config.dispositivosFlota * costoPorDispositivoTxCredits;
  const costoPorFlotaTxPolygon = config.dispositivosFlota * costoPorDispositivoTxPolygon;
  const costoPorFlotaInfraCredits = (config.numNodos * config.costoAWSNodo + config.mantenimientoCredits) / config.numFlotas;
  const costoPorFlotaInfraPolygon = config.infraPolygon / config.numFlotas;

  const costoPorFlotaCredits = costoPorFlotaSIM + costoPorFlotaTxCredits + costoPorFlotaInfraCredits;
  const costoPorFlotaPolygon = costoPorFlotaSIM + costoPorFlotaTxPolygon + costoPorFlotaInfraPolygon;

  // Costos totales/mes
  const costoTotalCredits = costoPorFlotaCredits * config.numFlotas;
  const costoTotalPolygon = costoPorFlotaPolygon * config.numFlotas;

  // Ingresos adicionales Polygon
  const comisionPorDispositivoPolygon = transaccionesMes * config.comisionPolygon;
  const comisionPorFlotaPolygon = config.dispositivosFlota * comisionPorDispositivoPolygon;
  const comisionTotalPolygon = comisionPorFlotaPolygon * config.numFlotas;

  const CostCard = ({ title, amount, subtitle, icon: Icon, color = "blue" }: {
    title: string;
    amount: number;
    subtitle?: string;
    icon: React.ElementType;
    color?: string;
  }) => (
    <div className={`bg-${color}-500/10 border border-${color}-500/20 rounded-lg p-4`}>
      <div className="flex items-center space-x-2 mb-2">
        <Icon className={`w-5 h-5 text-${color}-400`} />
        <h4 className={`font-medium text-${color}-300 text-sm`}>{title}</h4>
      </div>
      <div className={`text-xl font-bold text-${color}-400`}>
        ${amount.toFixed(2)}
      </div>
      {subtitle && <div className="text-xs text-gray-400 mt-1">{subtitle}</div>}
    </div>
  );

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-6 border border-white/20">
      <div className="flex items-center space-x-3 mb-6">
        <Calculator className="w-6 h-6 text-green-400" />
        <h2 className="text-xl font-semibold text-white">Desglose Detallado de Costos</h2>
      </div>

      {/* Costos por Dispositivo */}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-green-300 mb-4">📱 Costos por Dispositivo (Mensual)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Wifi className="w-5 h-5 text-blue-400" />
              <h4 className="font-medium text-blue-300 text-sm">Plan SIM</h4>
            </div>
            <div className="text-xl font-bold text-blue-400">
              ${costoPorDispositivoSIM.toFixed(2)}
            </div>
            <div className="text-xs text-gray-400 mt-1">Conectividad 4G/LTE</div>
          </div>

          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Activity className="w-5 h-5 text-red-400" />
              <h4 className="font-medium text-red-300 text-sm">Blockchain Credits</h4>
            </div>
            <div className="text-xl font-bold text-red-400">
              ${costoPorDispositivoTxCredits.toFixed(2)}
            </div>
            <div className="text-xs text-gray-400 mt-1">{transaccionesMes} tx/mes</div>
          </div>

          <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Activity className="w-5 h-5 text-purple-400" />
              <h4 className="font-medium text-purple-300 text-sm">Blockchain Polygon</h4>
            </div>
            <div className="text-xl font-bold text-purple-400">
              ${costoPorDispositivoTxPolygon.toFixed(2)}
            </div>
            <div className="text-xs text-gray-400 mt-1">{transaccionesMes} tx/mes</div>
          </div>

          <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Cpu className="w-5 h-5 text-orange-400" />
              <h4 className="font-medium text-orange-300 text-sm">Infraestructura</h4>
            </div>
            <div className="text-xl font-bold text-orange-400">
              ${costoPorDispositivoInfraCredits.toFixed(2)}
            </div>
            <div className="text-xs text-gray-400 mt-1">Credits (proporcional)</div>
          </div>
        </div>
        
        <div className="mt-4 p-4 bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-500/30 rounded-lg">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-sm text-gray-300">Total/dispositivo Credits</div>
              <div className="text-xl font-bold text-red-400">
                ${(costoPorDispositivoSIM + costoPorDispositivoTxCredits + costoPorDispositivoInfraCredits).toFixed(2)}/mes
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-300">Total/dispositivo Polygon</div>
              <div className="text-xl font-bold text-purple-400">
                ${(costoPorDispositivoSIM + costoPorDispositivoTxPolygon + costoPorDispositivoInfraPolygon).toFixed(2)}/mes
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-300">Ahorro/dispositivo</div>
              <div className="text-xl font-bold text-green-400">
                ${((costoPorDispositivoSIM + costoPorDispositivoTxCredits + costoPorDispositivoInfraCredits) - (costoPorDispositivoSIM + costoPorDispositivoTxPolygon + costoPorDispositivoInfraPolygon)).toFixed(2)}/mes
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Costos por Flota */}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-blue-300 mb-4">🚛 Costos por Flota ({config.dispositivosFlota} dispositivos)</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Credits */}
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
            <h4 className="font-medium text-red-300 mb-4 flex items-center space-x-2">
              <span>Credits</span>
            </h4>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">Conectividad SIM</span>
                <span className="text-white">${costoPorFlotaSIM.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">Transacciones Blockchain</span>
                <span className="text-white">${costoPorFlotaTxCredits.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">Infraestructura (proporcional)</span>
                <span className="text-white">${costoPorFlotaInfraCredits.toFixed(2)}</span>
              </div>
              <hr className="border-red-500/30" />
              <div className="flex justify-between font-bold">
                <span className="text-red-300">Total por Flota</span>
                <span className="text-red-300">${costoPorFlotaCredits.toFixed(2)}/mes</span>
              </div>
            </div>
          </div>

          {/* Polygon */}
          <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
            <h4 className="font-medium text-purple-300 mb-4 flex items-center space-x-2">
              <span>Polygon</span>
            </h4>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">Conectividad SIM</span>
                <span className="text-white">${costoPorFlotaSIM.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">Gas Blockchain</span>
                <span className="text-white">${costoPorFlotaTxPolygon.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">Infraestructura (proporcional)</span>
                <span className="text-white">${costoPorFlotaInfraPolygon.toFixed(2)}</span>
              </div>
              <hr className="border-purple-500/30" />
              <div className="flex justify-between font-bold">
                <span className="text-purple-300">Total por Flota</span>
                <span className="text-purple-300">${costoPorFlotaPolygon.toFixed(2)}/mes</span>
              </div>
              <div className="flex justify-between text-sm text-green-400">
                <span>+ Comisiones SC</span>
                <span>+${comisionPorFlotaPolygon.toFixed(2)}/mes</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Totales del Sistema */}
      <div>
        <h3 className="text-lg font-medium text-yellow-300 mb-4">🏢 Totales del Sistema ({config.numFlotas} flotas)</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6">
            <h4 className="font-medium text-red-300 mb-3 text-center">Credits</h4>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-400 mb-2">
                ${costoTotalCredits.toFixed(2)}
              </div>
              <div className="text-sm text-gray-400">Costo Total/mes</div>
              <div className="text-sm text-gray-300 mt-2">
                ${formatNumber(costoTotalCredits * 12)}/año
              </div>
            </div>
          </div>

          <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-6">
            <h4 className="font-medium text-purple-300 mb-3 text-center">Polygon</h4>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">
                ${costoTotalPolygon.toFixed(2)}
              </div>
              <div className="text-sm text-gray-400">Costo Total/mes</div>
              <div className="text-sm text-gray-300 mt-2">
                ${formatNumber(costoTotalPolygon * 12)}/año
              </div>
              <div className="text-sm text-green-400 mt-1">
                +${comisionTotalPolygon.toFixed(2)}/mes en comisiones
              </div>
            </div>
          </div>

          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-6">
            <h4 className="font-medium text-green-300 mb-3 text-center">Ahorros</h4>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">
                ${(costoTotalCredits - costoTotalPolygon).toFixed(2)}
              </div>
              <div className="text-sm text-gray-400">Ahorro/mes con Polygon</div>
              <div className="text-sm text-gray-300 mt-2">
                ${formatNumber((costoTotalCredits - costoTotalPolygon) * 12)}/año
              </div>
              <div className="text-sm text-purple-400 mt-1">
                +${comisionTotalPolygon.toFixed(2)}/mes ingreso extra
              </div>
            </div>
          </div>
        </div>

        {/* Desglose porcentual */}
        <div className="mt-6 p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-lg">
          <h4 className="font-medium text-white mb-3 text-center">📊 Distribución de Costos (%)</h4>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <div className="text-sm text-gray-300 mb-2 text-center">Credits</div>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-300">Conectividad:</span>
                  <span className="text-white">{((config.numFlotas * costoPorFlotaSIM / costoTotalCredits) * 100).toFixed(1)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Blockchain:</span>
                  <span className="text-white">{((config.numFlotas * costoPorFlotaTxCredits / costoTotalCredits) * 100).toFixed(1)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Infraestructura:</span>
                  <span className="text-white">{((config.numNodos * config.costoAWSNodo + config.mantenimientoCredits) / costoTotalCredits * 100).toFixed(1)}%</span>
                </div>
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-300 mb-2 text-center">Polygon</div>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-300">Conectividad:</span>
                  <span className="text-white">{((config.numFlotas * costoPorFlotaSIM / costoTotalPolygon) * 100).toFixed(1)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Gas:</span>
                  <span className="text-white">{((config.numFlotas * costoPorFlotaTxPolygon / costoTotalPolygon) * 100).toFixed(1)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Infraestructura:</span>
                  <span className="text-white">{(config.infraPolygon / costoTotalPolygon * 100).toFixed(1)}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 