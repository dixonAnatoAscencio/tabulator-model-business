'use client'

import React from 'react';
import { DollarSign  } from 'lucide-react';

interface PricingModelProps {
  config: any;
  setConfig: (config: any) => void;
  actualizarTarifas: (plan: string) => void;
}

export const PricingModel: React.FC<PricingModelProps> = ({
  config,
  setConfig,
  actualizarTarifas
}) => {
  const planes = {
    basico: { fija: 49, porDispositivo: 2, nombre: 'Básico' },
    estandar: { fija: 149, porDispositivo: 15, nombre: 'Estándar' },
    avanzado: { fija: 399, porDispositivo: 1, nombre: 'Avanzado/Premium' }
  };

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-6 border border-white/20">
      <div className="flex items-center space-x-3 mb-6">
        <DollarSign className="w-6 h-6 text-blue-400" />
        <h2 className="text-xl font-semibold text-white">Modelo de Precios</h2>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Plan de Servicio
          </label>
          <select
            value={config.planServicio}
            onChange={(e) => actualizarTarifas(e.target.value)}
            className="w-full p-3 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {Object.entries(planes).map(([key, plan]) => (
              <option key={key} value={key} className="bg-gray-800">
                {plan.nombre} - ${plan.fija}/mes + ${plan.porDispositivo}/dispositivo
              </option>
            ))}
            <option value="custom" className="bg-gray-800">Personalizado</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Tarifa Base Fija ($)
            </label>
            <input
              type="number"
              value={config.tarifaBaseFija}
              onChange={(e) => setConfig({ ...config, tarifaBaseFija: parseFloat(e.target.value) })}
              className="w-full p-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="0"
              step="0.01"
              disabled={config.planServicio !== 'custom'}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Tarifa por Dispositivo ($)
            </label>
            <input
              type="number"
              value={config.tarifaBase}
              onChange={(e) => setConfig({ ...config, tarifaBase: parseFloat(e.target.value) })}
              className="w-full p-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="0"
              step="0.01"
              disabled={config.planServicio !== 'custom'}
            />
          </div>
        </div>
      </div>

      {/* Descuentos por volumen */}
      <div className="mt-6">
        <h3 className="text-lg font-medium text-blue-300 mb-4">Descuentos por Volumen</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Descuento 100+ dispositivos (%)
            </label>
            <input
              type="number"
              value={config.descuento100}
              onChange={(e) => setConfig({ ...config, descuento100: parseFloat(e.target.value) })}
              className="w-full p-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="0"
              max="100"
              step="0.1"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Descuento 500+ dispositivos (%)
            </label>
            <input
              type="number"
              value={config.descuento500}
              onChange={(e) => setConfig({ ...config, descuento500: parseFloat(e.target.value) })}
              className="w-full p-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="0"
              max="100"
              step="0.1"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Descuento 1000+ dispositivos (%)
            </label>
            <input
              type="number"
              value={config.descuento1000}
              onChange={(e) => setConfig({ ...config, descuento1000: parseFloat(e.target.value) })}
              className="w-full p-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="0"
              max="100"
              step="0.1"
            />
          </div>
        </div>
      </div>
    </div>
  );
}; 