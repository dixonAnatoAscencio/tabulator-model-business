'use client'

import React from 'react';
import { Globe, TrendingUp, Zap, ChevronDown, ChevronUp } from 'lucide-react';

interface ConfigItem {
  gasPolygon: number;
  precioMatic: number;
  comisionPolygon: number;
  infraPolygon: number;
}

interface PolygonConfigProps {
  config: ConfigItem;
  updateConfig: (key: keyof ConfigItem, value: string | number) => void;
  isExpanded: boolean;
  onToggle: () => void;
}

const PolygonConfig: React.FC<PolygonConfigProps> = ({
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
          <Globe className="w-6 h-6 text-purple-400" />
          <h2 className="text-xl font-semibold text-white">Configuración Polygon</h2>
        </div>
        {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
      </div>
      
      {isExpanded && (
        <div className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Gas y Tarifas */}
            <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-4">
                <Zap className="w-5 h-5 text-purple-400" />
                <h3 className="text-lg font-medium text-purple-300">Gas y Tarifas</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Gas por Transacción (MATIC)
                  </label>
                  <input
                    type="number"
                    value={config.gasPolygon}
                    onChange={(e) => updateConfig('gasPolygon', e.target.value)}
                    className="w-full p-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    min="0"
                    step="0.0001"
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    Costo de gas en MATIC por transacción
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Tu Comisión Smart Contract ($)
                  </label>
                  <input
                    type="number"
                    value={config.comisionPolygon}
                    onChange={(e) => updateConfig('comisionPolygon', e.target.value)}
                    className="w-full p-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    min="0"
                    step="0.0001"
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    Tu ganancia por transacción en smart contract
                  </p>
                </div>
              </div>
            </div>

            {/* Precio MATIC */}
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-4">
                <TrendingUp className="w-5 h-5 text-green-400" />
                <h3 className="text-lg font-medium text-green-300">Precio MATIC</h3>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Precio MATIC ($)
                </label>
                <input
                  type="number"
                  value={config.precioMatic}
                  onChange={(e) => updateConfig('precioMatic', e.target.value)}
                  className="w-full p-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                  min="0"
                  step="0.01"
                />
                <p className="text-xs text-gray-400 mt-1">
                  Precio actual del token MATIC en USD
                </p>
                
                <div className="mt-3 p-2 bg-green-500/5 border border-green-500/20 rounded text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Costo por tx:</span>
                    <span className="text-green-300">
                      ${(config.gasPolygon * config.precioMatic).toFixed(6)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Infraestructura */}
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-4">
                <Globe className="w-5 h-5 text-blue-400" />
                <h3 className="text-lg font-medium text-blue-300">Infraestructura</h3>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Costo Infraestructura ($)
                </label>
                <input
                  type="number"
                  value={config.infraPolygon}
                  onChange={(e) => updateConfig('infraPolygon', e.target.value)}
                  className="w-full p-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="0"
                  step="0.01"
                />
                <p className="text-xs text-gray-400 mt-1">
                  Costo mensual de infraestructura para Polygon
                </p>
              </div>
            </div>

            {/* Resumen de Costos */}
            <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
              <h3 className="text-lg font-medium text-orange-300 mb-4">Resumen Polygon</h3>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-300">Infraestructura:</span>
                  <span className="text-white font-medium">
                    ${config.infraPolygon}/mes
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-300">Gas por tx:</span>
                  <span className="text-white font-medium">
                    ${(config.gasPolygon * config.precioMatic).toFixed(6)}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-300">Tu comisión:</span>
                  <span className="text-white font-medium">
                    ${config.comisionPolygon}
                  </span>
                </div>
                
                <div className="border-t border-orange-500/20 pt-2">
                  <div className="flex justify-between">
                    <span className="text-orange-300 font-medium">Costo red/tx:</span>
                    <span className="text-orange-300 font-bold">
                      ${(config.gasPolygon * config.precioMatic).toFixed(6)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-300 font-medium">Tu ganancia/tx:</span>
                    <span className="text-green-300 font-bold">
                      ${config.comisionPolygon}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Calculadora de Transacciones */}
          <div className="mt-6 bg-purple-500/5 border border-purple-500/20 rounded-lg p-4">
            <h4 className="text-md font-medium text-purple-300 mb-4">🧮 Calculadora de Costos Polygon</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">
                  ${(config.gasPolygon * config.precioMatic * 1000).toFixed(4)}
                </div>
                <div className="text-sm text-gray-300">1,000 transacciones</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">
                  ${(config.gasPolygon * config.precioMatic * 10000).toFixed(2)}
                </div>
                <div className="text-sm text-gray-300">10,000 transacciones</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">
                  ${(config.gasPolygon * config.precioMatic * 100000).toFixed(2)}
                </div>
                <div className="text-sm text-gray-300">100,000 transacciones</div>
              </div>
            </div>
          </div>

          {/* Información adicional */}
          <div className="mt-6 bg-purple-500/5 border border-purple-500/20 rounded-lg p-4">
            <h4 className="text-md font-medium text-purple-300 mb-3">💡 Información sobre Polygon</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-300">
              <div>
                <strong className="text-purple-300">Ventajas:</strong>
                <ul className="list-disc list-inside mt-1 space-y-1">
                  <li>Red establecida y probada</li>
                  <li>Bajos costos de transacción</li>
                  <li>Amplio ecosistema</li>
                  <li>Compatibilidad con Ethereum</li>
                  <li>Sin inversión inicial en infraestructura</li>
                </ul>
              </div>
              <div>
                <strong className="text-purple-300">Consideraciones:</strong>
                <ul className="list-disc list-inside mt-1 space-y-1">
                  <li>Dependencia del precio de MATIC</li>
                  <li>Volatilidad de costos</li>
                  <li>Menos control sobre la red</li>
                  <li>Posibles congestiones de red</li>
                  <li>Cambios en el protocolo</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <TrendingUp className="w-4 h-4 text-purple-400" />
                <strong className="text-purple-300">Análisis de Volatilidad</strong>
              </div>
              <div className="text-xs text-gray-300">
                El precio de MATIC puede variar significativamente. Considera un rango de precios:
                <div className="mt-2 grid grid-cols-3 gap-2">
                  <div className="text-center">
                    <div className="text-green-400">Escenario bajo: $0.50</div>
                    <div>${(config.gasPolygon * 0.50).toFixed(6)}/tx</div>
                  </div>
                  <div className="text-center">
                    <div className="text-yellow-400">Actual: ${config.precioMatic}</div>
                    <div>${(config.gasPolygon * config.precioMatic).toFixed(6)}/tx</div>
                  </div>
                  <div className="text-center">
                    <div className="text-red-400">Escenario alto: $2.00</div>
                    <div>${(config.gasPolygon * 2.00).toFixed(6)}/tx</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PolygonConfig;
