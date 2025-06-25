'use client'

import React from 'react';
import { Smartphone, Truck, MapPin, DollarSign, ChevronDown, ChevronUp, Info } from 'lucide-react';

interface DeviceType {
  id: string;
  name: string;
  priceRange: [number, number];
  avgPrice: number;
  simCost: [number, number];
  avgSimCost: number;
  industry: string;
  autonomy: string;
  protocols: string[];
  certifications: string[];
  notes: string;
}

interface ConfigItem {
  dispositivoSeleccionado: string;
  precioDispositivo: number;
  costoPlanDatos: number;
  soporteLatAm: number;
  mbPorTransaccion: number;
  factorEscala: number;
  costoInstalacion: number;
  costoMantenimientoDispositivo: number;
}

interface DispositivosConfigProps {
  config: ConfigItem;
  updateConfig: (key: keyof ConfigItem, value: string | number) => void;
  isExpanded: boolean;
  onToggle: () => void;
}

const DispositivosConfig: React.FC<DispositivosConfigProps> = ({
  config,
  updateConfig,
  isExpanded,
  onToggle
}) => {
  const dispositivos: DeviceType[] = [
    {
      id: 'queclink-gv600',
      name: 'Queclink GV600/WG',
      priceRange: [110, 225],
      avgPrice: 167.5,
      simCost: [5, 15],
      avgSimCost: 10,
      industry: 'Assets/Logística',
      autonomy: '90-120 días standby',
      protocols: ['TCP', 'UDP', 'MQTT'],
      certifications: ['IP67', 'CE', 'FCC', 'BLE', 'SAE J1455'],
      notes: 'Ideal para assets sin alimentación fija'
    },
    {
      id: 'teltonika-fmb125',
      name: 'Teltonika FMB125',
      priceRange: [40, 40],
      avgPrice: 40,
      simCost: [3, 10],
      avgSimCost: 6.5,
      industry: 'Vehicular',
      autonomy: '170 mAh backup',
      protocols: ['MQTT', 'HTTP', 'Modbus'],
      certifications: ['IP41', 'CE', 'E-Mark', 'RoHS'],
      notes: 'Vehicular, dual-SIM, granular, plug-and-play'
    },
    {
      id: 'calamp-ttu2830',
      name: 'CalAmp TTU-2830',
      priceRange: [164, 165],
      avgPrice: 164.8,
      simCost: [5, 15],
      avgSimCost: 10,
      industry: 'Asset Tracking',
      autonomy: 'Batería larga duración (meses)',
      protocols: ['TCP', 'UDP', 'MQTT'],
      certifications: ['IP67', 'CE', 'FCC', 'SAE J1455'],
      notes: 'Asset tracking con batería de larga duración'
    },
    {
      id: 'digital-matter-oyster2',
      name: 'Digital Matter Oyster2',
      priceRange: [80, 120],
      avgPrice: 100,
      simCost: [5, 15],
      avgSimCost: 10,
      industry: 'Activos Fijos',
      autonomy: 'Hasta 7 años',
      protocols: ['MQTT', 'TCP', 'Webhooks'],
      certifications: ['IP67', 'CE', 'FCC', 'RCM'],
      notes: 'Ultra compacto para activos fijos'
    },
    {
      id: 'ruptela-fm-pro4',
      name: 'Ruptela FM-Pro4',
      priceRange: [70, 110],
      avgPrice: 90,
      simCost: [5, 15],
      avgSimCost: 10,
      industry: 'Vehículos/Maquinaria',
      autonomy: 'Depende alimentación vehicular',
      protocols: ['MQTT', 'HTTP', 'Modbus'],
      certifications: ['IP67', 'E-Mark', 'CE', 'RoHS'],
      notes: 'Vehículos y maquinaria robusta'
    },
    {
      id: 'edgebox-esp100',
      name: 'EdgeBox-ESP-100',
      priceRange: [65, 230],
      avgPrice: 147.5,
      simCost: [5, 15],
      avgSimCost: 10,
      industry: 'Edge Computing',
      autonomy: 'Según la SIM',
      protocols: ['MQTT', 'Modbus', 'CAN'],
      certifications: ['CE', 'FCC', 'RoHS', 'UKCA', 'TELEC'],
      notes: 'Máxima flexibilidad + edge computing'
    }
  ];



  const handleDeviceChange = (deviceId: string) => {
    const device = dispositivos.find(d => d.id === deviceId);
    if (device) {
      updateConfig('dispositivoSeleccionado', deviceId);
      updateConfig('precioDispositivo', device.avgPrice);
      updateConfig('costoPlanDatos', device.avgSimCost);
    }
  };

  const selectedDevice = dispositivos.find(d => d.id === config.dispositivoSeleccionado) || dispositivos[0];

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-6 border border-white/20">
      <div 
        className="flex items-center justify-between cursor-pointer"
        onClick={onToggle}
      >
        <div className="flex items-center space-x-3">
          <Smartphone className="w-6 h-6 text-green-400" />
          <h2 className="text-xl font-semibold text-white">Configuración de Dispositivos IoT</h2>
        </div>
        {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
      </div>
      
      {isExpanded && (
        <div className="mt-6">

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Selección de Dispositivo */}
            <div className="lg:col-span-2 space-y-4">
              <h3 className="text-lg font-medium text-green-300 flex items-center space-x-2">
                <Smartphone className="w-5 h-5" />
                <span>Dispositivo Seleccionado</span>
              </h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Tipo de Dispositivo
                </label>
                <select
                  value={config.dispositivoSeleccionado}
                  onChange={(e) => handleDeviceChange(e.target.value)}
                  className="w-full p-3 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  {dispositivos.map((device) => (
                    <option key={device.id} value={device.id} className="bg-gray-800">
                      {device.name} - ${device.avgPrice} ({device.industry})
                    </option>
                  ))}
                </select>
              </div>

              {/* Información del dispositivo seleccionado */}
              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                <h4 className="font-medium text-green-300 mb-3">{selectedDevice.name}</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-300">Precio:</span>
                    <span className="text-white ml-2">${selectedDevice.priceRange[0]} - ${selectedDevice.priceRange[1]}</span>
                  </div>
                  <div>
                    <span className="text-gray-300">Industria:</span>
                    <span className="text-white ml-2">{selectedDevice.industry}</span>
                  </div>
                  <div>
                    <span className="text-gray-300">Autonomía:</span>
                    <span className="text-white ml-2">{selectedDevice.autonomy}</span>
                  </div>
                  <div>
                    <span className="text-gray-300">SIM:</span>
                    <span className="text-white ml-2">${selectedDevice.simCost[0]}-${selectedDevice.simCost[1]}/mes</span>
                  </div>
                </div>
                <div className="mt-3">
                  <span className="text-gray-300">Protocolos:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {selectedDevice.protocols.map(protocol => (
                      <span key={protocol} className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded text-xs">
                        {protocol}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-gray-300">Certificaciones:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {selectedDevice.certifications.map(cert => (
                      <span key={cert} className="bg-purple-500/20 text-purple-300 px-2 py-1 rounded text-xs">
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-3 p-2 bg-green-500/5 border border-green-500/20 rounded text-xs text-gray-300">
                  <Info className="w-3 h-3 inline mr-1" />
                  {selectedDevice.notes}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Precio por Dispositivo ($)
                  </label>
                  <input
                    type="number"
                    value={config.precioDispositivo}
                    onChange={(e) => updateConfig('precioDispositivo', e.target.value)}
                    className="w-full p-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                    min="0"
                    step="0.01"
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    Rango sugerido: ${selectedDevice.priceRange[0]} - ${selectedDevice.priceRange[1]}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Plan de Datos SIM ($/mes)
                  </label>
                  <input
                    type="number"
                    value={config.costoPlanDatos}
                    onChange={(e) => updateConfig('costoPlanDatos', e.target.value)}
                    className="w-full p-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                    min="0"
                    step="0.01"
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    Rango sugerido: ${selectedDevice.simCost[0]} - ${selectedDevice.simCost[1]}/mes
                  </p>
                </div>
              </div>
            </div>

            {/* Costos Adicionales */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-orange-300 flex items-center space-x-2">
                <DollarSign className="w-5 h-5" />
                <span>Costos Operacionales</span>
              </h3>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Soporte LatAm ($/MB)
                </label>
                <input
                  type="number"
                  value={config.soporteLatAm}
                  onChange={(e) => updateConfig('soporteLatAm', e.target.value)}
                  className="w-full p-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  min="0"
                  step="0.001"
                />
                <p className="text-xs text-gray-400 mt-1">
                  Estándar LatAm: ~$0.145/MB (0.725/5MB)
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  MB por Transacción
                </label>
                <input
                  type="number"
                  value={config.mbPorTransaccion}
                  onChange={(e) => updateConfig('mbPorTransaccion', e.target.value)}
                  className="w-full p-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  min="0"
                  step="0.01"
                />
                <p className="text-xs text-gray-400 mt-1">
                  Promedio: 0.1-0.5 MB por transacción
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Costo de Instalación ($)
                </label>
                <input
                  type="number"
                  value={config.costoInstalacion}
                  onChange={(e) => updateConfig('costoInstalacion', e.target.value)}
                  className="w-full p-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  min="0"
                  step="0.01"
                />
                <p className="text-xs text-gray-400 mt-1">
                  Incluye instalación y configuración inicial
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Mantenimiento Anual (% del precio)
                </label>
                <input
                  type="number"
                  value={config.costoMantenimientoDispositivo}
                  onChange={(e) => updateConfig('costoMantenimientoDispositivo', e.target.value)}
                  className="w-full p-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  min="0"
                  max="100"
                  step="0.1"
                />
                <p className="text-xs text-gray-400 mt-1">
                  Típicamente 5-15% del valor del dispositivo
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Factor de Escala (descuento bulk)
                </label>
                <input
                  type="number"
                  value={config.factorEscala}
                  onChange={(e) => updateConfig('factorEscala', e.target.value)}
                  className="w-full p-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  min="0"
                  max="50"
                  step="0.1"
                />
                <p className="text-xs text-gray-400 mt-1">
                  Descuento por volumen en %
                </p>
              </div>
            </div>
          </div>

          {/* Resumen de Costos */}
          <div className="mt-6 bg-gradient-to-r from-green-500/10 to-orange-500/10 border border-white/20 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-white mb-4">💰 Resumen de Costos por Dispositivo</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">
                  ${(config.precioDispositivo * (1 - config.factorEscala / 100)).toFixed(2)}
                </div>
                <div className="text-gray-300">Costo Dispositivo</div>
                <div className="text-xs text-gray-400">(con descuento)</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">
                  ${config.costoInstalacion}
                </div>
                <div className="text-gray-300">Instalación</div>
                <div className="text-xs text-gray-400">(una vez)</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">
                  ${config.costoPlanDatos}
                </div>
                <div className="text-gray-300">SIM/mes</div>
                <div className="text-xs text-gray-400">(recurrente)</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-400">
                  ${((config.precioDispositivo * config.costoMantenimientoDispositivo / 100) / 12).toFixed(2)}
                </div>
                <div className="text-gray-300">Mantenimiento/mes</div>
                <div className="text-xs text-gray-400">({config.costoMantenimientoDispositivo}% anual)</div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-white/20">
              <div className="flex justify-between items-center">
                <span className="text-lg font-medium text-white">Costo Total Inicial por Dispositivo:</span>
                <span className="text-2xl font-bold text-green-400">
                  ${(config.precioDispositivo * (1 - config.factorEscala / 100) + config.costoInstalacion).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-lg font-medium text-white">Costo Operacional Mensual por Dispositivo:</span>
                <span className="text-2xl font-bold text-blue-400">
                  ${(config.costoPlanDatos + (config.precioDispositivo * config.costoMantenimientoDispositivo / 100) / 12).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DispositivosConfig; 