'use client'

import React from 'react';
import { Truck, Settings, ChevronDown, ChevronUp, Smartphone, Info, Database, DollarSign } from 'lucide-react';

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
  numFlotas: number;
  dispositivosFlota: number;
  transaccionesDia: number;
  precioDispositivo: number;
  costoPlanDatos: number;
  planServicio: string;
  tarifaBaseFija: number;
  tarifaBase: number;
  descuento100: number;
  descuento500: number;
  descuento1000: number;
  dispositivoSeleccionado: string;
  soporteLatAm: number;
  mbPorTransaccion: number;
  transaccionesBlockchainDia: number;
  tipoFacturacionBlockchain: string;
}

interface GeneralConfigProps {
  config: ConfigItem;
  updateConfig: (key: keyof ConfigItem, value: string | number) => void;
  cambiarPlan: (plan: string) => void;
  isExpanded: boolean;
  onToggle: () => void;
  planes: Record<string, { fija: number; porDispositivo: number; nombre: string }>;
}

const GeneralConfig: React.FC<GeneralConfigProps> = ({
  config,
  updateConfig,
  cambiarPlan,
  isExpanded,
  onToggle,
  planes
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

  const selectedDevice = dispositivos.find(d => d.id === config.dispositivoSeleccionado) || dispositivos[1];
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-6 border border-white/20">
      <div 
        className="flex items-center justify-between cursor-pointer"
        onClick={onToggle}
      >
        <div className="flex items-center space-x-3">
          <Truck className="w-6 h-6 text-purple-400" />
          <h2 className="text-xl font-semibold text-white">Configuración General</h2>
        </div>
        {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
      </div>
      
      {isExpanded && (
        <div className="mt-6 space-y-8">
          {/* Configuración de Flotas y Dispositivos */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Configuración de Flotas */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-purple-300 flex items-center space-x-2">
                <Settings className="w-5 h-5" />
                <span>Configuración de Flotas</span>
              </h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Número de Flotas
              </label>
              <input
                type="number"
                value={config.numFlotas}
                onChange={(e) => updateConfig('numFlotas', e.target.value)}
                className="w-full p-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                min="1"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Dispositivos por Flota
              </label>
              <input
                type="number"
                value={config.dispositivosFlota}
                onChange={(e) => updateConfig('dispositivosFlota', e.target.value)}
                className="w-full p-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                min="1"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Eventos/Envíos IoT por Día
              </label>
              <input
                type="number"
                value={config.transaccionesDia}
                onChange={(e) => updateConfig('transaccionesDia', e.target.value)}
                className="w-full p-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                min="1"
              />
              <p className="text-xs text-gray-400 mt-1">
                GPS c/hora(24), temp c/30min(48), eventos especiales
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Tipo de Dispositivo IoT
              </label>
              <select
                value={config.dispositivoSeleccionado || 'teltonika-fmb125'}
                onChange={(e) => handleDeviceChange(e.target.value)}
                className="w-full p-3 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {dispositivos.map((device) => (
                  <option key={device.id} value={device.id} className="bg-gray-800">
                    {device.name} - ${device.avgPrice} ({device.industry})
                  </option>
                ))}
              </select>
              
              {/* Información del dispositivo seleccionado */}
              <div className="mt-3 p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                <h4 className="font-medium text-purple-300 mb-2">{selectedDevice.name}</h4>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-gray-300">Precio:</span>
                    <span className="text-white ml-1">${selectedDevice.priceRange[0]} - ${selectedDevice.priceRange[1]}</span>
                  </div>
                  <div>
                    <span className="text-gray-300">SIM:</span>
                    <span className="text-white ml-1">${selectedDevice.simCost[0]}-${selectedDevice.simCost[1]}/mes</span>
                  </div>
                  <div>
                    <span className="text-gray-300">Autonomía:</span>
                    <span className="text-white ml-1">{selectedDevice.autonomy}</span>
                  </div>
                  <div>
                    <span className="text-gray-300">Industria:</span>
                    <span className="text-white ml-1">{selectedDevice.industry}</span>
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-gray-300 text-xs">Protocolos:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {selectedDevice.protocols.map(protocol => (
                      <span key={protocol} className="bg-blue-500/20 text-blue-300 px-1 py-0.5 rounded text-xs">
                        {protocol}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-2 p-2 bg-purple-500/5 border border-purple-500/20 rounded text-xs text-gray-300">
                  <Info className="w-3 h-3 inline mr-1" />
                  {selectedDevice.notes}
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Precio por Dispositivo ($)
              </label>
              <input
                type="number"
                value={config.precioDispositivo}
                onChange={(e) => updateConfig('precioDispositivo', e.target.value)}
                className="w-full p-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                min="0"
                step="0.01"
              />
              <p className="text-xs text-gray-400 mt-1">
                Rango sugerido: ${selectedDevice.priceRange[0]} - ${selectedDevice.priceRange[1]}
              </p>
            </div>
            </div>
            
            {/* Configuración de Precios */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-blue-300 flex items-center space-x-2">
                <DollarSign className="w-5 h-5" />
                <span>Planes de Servicio</span>
              </h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Plan de Servicio
                </label>
                <select
                  value={config.planServicio}
                  onChange={(e) => cambiarPlan(e.target.value)}
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
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Tarifa Base Fija ($)
                  </label>
                  <input
                    type="number"
                    value={config.tarifaBaseFija}
                    onChange={(e) => updateConfig('tarifaBaseFija', e.target.value)}
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
                    onChange={(e) => updateConfig('tarifaBase', e.target.value)}
                    className="w-full p-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="0"
                    step="0.01"
                    disabled={config.planServicio !== 'custom'}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Plan de Datos y Conectividad */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-green-300 flex items-center space-x-2">
              <Smartphone className="w-5 h-5" />
              <span>Plan de Datos y Conectividad</span>
            </h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Costo Plan de Datos SIM ($/mes)
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



            {/* Resumen de costos de conectividad */}
            <div className="mt-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
              <h4 className="font-medium text-green-300 mb-2">💰 Resumen de Conectividad</h4>
              <div className="text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-gray-300">Plan SIM/dispositivo:</span>
                  <span className="text-white">${config.costoPlanDatos}/mes</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Dispositivos por flota:</span>
                  <span className="text-white">{config.dispositivosFlota}</span>
                </div>
                <hr className="border-green-500/30" />
                <div className="flex justify-between font-semibold">
                  <span className="text-green-300">Total conectividad/flota:</span>
                  <span className="text-green-300">
                    ${(config.costoPlanDatos * config.dispositivosFlota).toFixed(2)}/mes
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Transacciones Blockchain */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-yellow-300 flex items-center space-x-2">
              <Database className="w-5 h-5" />
              <span>Transacciones Blockchain</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Tipo de Facturación
                </label>
                <select
                  value={config.tipoFacturacionBlockchain || 'por_evento'}
                  onChange={(e) => updateConfig('tipoFacturacionBlockchain', e.target.value)}
                  className="w-full p-3 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                  <option value="por_evento" className="bg-gray-800">Por Evento/Acción</option>
                  <option value="por_lote" className="bg-gray-800">Por Lote/Contenedor</option>
                  <option value="por_dia" className="bg-gray-800">Tarifa Diaria</option>
                  <option value="hibrido" className="bg-gray-800">Híbrido</option>
                </select>
                <p className="text-xs text-gray-400 mt-1">
                  Como se cobrará el uso de blockchain al cliente
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Transacciones Blockchain por Día
                </label>
                <input
                  type="number"
                  value={config.transaccionesBlockchainDia}
                  onChange={(e) => updateConfig('transaccionesBlockchainDia', e.target.value)}
                  className="w-full p-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  min="1"
                />
                <p className="text-xs text-gray-400 mt-1">
                  Crear envío(1), checkpoints(5), entrega(1) = ~7 tx/día
                </p>
              </div>
            </div>

            {/* Ejemplos de uso */}
            <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
              <h4 className="font-medium text-yellow-300 mb-2">💡 Ejemplos de Transacciones</h4>
              <div className="text-xs space-y-1 text-gray-300">
                <div><strong>Medicamentos:</strong> Crear lote → Actualizar ubicación → Transferir → Entregar</div>
                <div><strong>Cold Chain:</strong> Verificar temperatura → Alertas → Cambio de custodio</div>
                <div><strong>Contenedores:</strong> Sellado → Aduanas → Puerto → Destino final</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GeneralConfig;
