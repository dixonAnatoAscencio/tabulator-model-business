'use client'

import React from 'react';
import { Database, Server, DollarSign, ChevronDown, ChevronUp } from 'lucide-react';

interface ConfigItem {
  numNodos: number;
  costoAWSNodo: number;
  comisionCredits: number;
  mantenimientoCredits: number;
}

interface CreditsConfigProps {
  config: ConfigItem;
  updateConfig: (key: keyof ConfigItem, value: string | number) => void;
  isExpanded: boolean;
  onToggle: () => void;
}

const CreditsConfig: React.FC<CreditsConfigProps> = ({
  config,
  updateConfig,
  isExpanded,
  onToggle
}) => {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-6 border border-white/20">
      <div 
        className="flex items-center justify-between cursor-pointer"
        onClick={onToggle}
      >
        <div className="flex items-center space-x-3">
          <Database className="w-6 h-6 text-blue-400" />
          <h2 className="text-xl font-semibold text-white">Configuración Credits (Red Propia)</h2>
        </div>
        {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
      </div>
      
      {isExpanded && (
        <div className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Configuración de Nodos */}
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-4">
                <Server className="w-5 h-5 text-blue-400" />
                <h3 className="text-lg font-medium text-blue-300">Infraestructura</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Número de Nodos
                  </label>
                  <input
                    type="number"
                    value={config.numNodos}
                    onChange={(e) => updateConfig('numNodos', e.target.value)}
                    className="w-full p-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="1"
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    Nodos de la red Credits requeridos
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Costo AWS por Nodo ($)
                  </label>
                  <input
                    type="number"
                    value={config.costoAWSNodo}
                    onChange={(e) => updateConfig('costoAWSNodo', e.target.value)}
                    className="w-full p-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="0"
                    step="0.01"
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    Costo mensual de servidor AWS por nodo
                  </p>
                </div>
              </div>
            </div>

            {/* Configuración de Transacciones */}
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-4">
                <DollarSign className="w-5 h-5 text-green-400" />
                <h3 className="text-lg font-medium text-green-300">Transacciones</h3>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Comisión por Transacción ($)
                </label>
                <input
                  type="number"
                  value={config.comisionCredits}
                  onChange={(e) => updateConfig('comisionCredits', e.target.value)}
                  className="w-full p-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                  min="0"
                  step="0.0001"
                />
                <p className="text-xs text-gray-400 mt-1">
                  Costo por transacción en la red Credits
                </p>
              </div>
            </div>

            {/* Configuración de Mantenimiento */}
            <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-4">
                <Database className="w-5 h-5 text-purple-400" />
                <h3 className="text-lg font-medium text-purple-300">Mantenimiento</h3>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Costo de Mantenimiento ($)
                </label>
                <input
                  type="number"
                  value={config.mantenimientoCredits}
                  onChange={(e) => updateConfig('mantenimientoCredits', e.target.value)}
                  className="w-full p-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  min="0"
                  step="0.01"
                />
                <p className="text-xs text-gray-400 mt-1">
                  Costo mensual de mantenimiento de la red
                </p>
              </div>
            </div>

            {/* Resumen de Costos */}
            <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
              <h3 className="text-lg font-medium text-orange-300 mb-4">Resumen Credits</h3>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-300">Infraestructura:</span>
                  <span className="text-white font-medium">
                    ${(config.numNodos * config.costoAWSNodo).toFixed(2)}/mes
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-300">Mantenimiento:</span>
                  <span className="text-white font-medium">
                    ${config.mantenimientoCredits}/mes
                  </span>
                </div>
                
                <div className="border-t border-orange-500/20 pt-2">
                  <div className="flex justify-between">
                    <span className="text-orange-300 font-medium">Total Fijo:</span>
                    <span className="text-orange-300 font-bold">
                      ${(config.numNodos * config.costoAWSNodo + config.mantenimientoCredits).toFixed(2)}/mes
                    </span>
                  </div>
                </div>
                
                <div className="text-center pt-2 border-t border-orange-500/20">
                  <span className="text-gray-300 text-xs">
                    + ${config.comisionCredits} por transacción
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Información adicional */}
          <div className="mt-6 bg-blue-500/5 border border-blue-500/20 rounded-lg p-4">
            <h4 className="text-md font-medium text-blue-300 mb-3">💡 Información sobre Credits</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-300">
              <div>
                <strong className="text-blue-300">Ventajas:</strong>
                <ul className="list-disc list-inside mt-1 space-y-1">
                  <li>Control total de la red</li>
                  <li>Tarifas predecibles</li>
                  <li>Sin dependencia de tokens externos</li>
                  <li>Escalabilidad personalizada</li>
                </ul>
              </div>
              <div>
                <strong className="text-blue-300">Consideraciones:</strong>
                <ul className="list-disc list-inside mt-1 space-y-1">
                  <li>Inversión inicial en infraestructura</li>
                  <li>Costos fijos de mantenimiento</li>
                  <li>Responsabilidad de operación</li>
                  <li>Desarrollo y actualización propia</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreditsConfig;
