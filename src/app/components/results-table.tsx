'use client'

import React from 'react';
import { BarChart3, TrendingUp } from 'lucide-react';

interface Flota {
  id: number;
  dispositivos: number;
  transMes: number;
  costoCredits: number;
  costoPolygon: number;
  ingreso: number;
  roiCredits: number;
  roiPolygon: number;
  descuento: number;
}

interface ResultsTableProps {
  flotas: Flota[];
}

export const ResultsTable: React.FC<ResultsTableProps> = ({ flotas }) => {
  // Función para formatear números de manera consistente
  const formatNumber = (num: number): string => {
    return num.toLocaleString('en-US', { 
      minimumFractionDigits: 0,
      maximumFractionDigits: 0 
    });
  };
  if (!flotas || flotas.length === 0) {
    return (
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-6 border border-white/20">
        <div className="flex items-center space-x-3 mb-6">
          <BarChart3 className="w-6 h-6 text-green-400" />
          <h2 className="text-xl font-semibold text-white">Resultados por Flota</h2>
        </div>
        <p className="text-gray-400 text-center">No hay datos de flotas para mostrar</p>
      </div>
    );
  }

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-6 border border-white/20">
      <div className="flex items-center space-x-3 mb-6">
        <BarChart3 className="w-6 h-6 text-green-400" />
        <h2 className="text-xl font-semibold text-white">Resultados por Flota</h2>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/20">
              <th className="text-left p-3 text-gray-300">Flota</th>
              <th className="text-left p-3 text-gray-300">Dispositivos</th>
              <th className="text-left p-3 text-gray-300">Transacciones/Mes</th>
              <th className="text-left p-3 text-gray-300">Costo Credits</th>
              <th className="text-left p-3 text-gray-300">Costo Polygon</th>
              <th className="text-left p-3 text-gray-300">Ingreso</th>
              <th className="text-left p-3 text-gray-300">ROI Credits</th>
              <th className="text-left p-3 text-gray-300">ROI Polygon</th>
              <th className="text-left p-3 text-gray-300">Descuento</th>
            </tr>
          </thead>
          <tbody>
            {flotas.map((flota) => (
              <tr key={flota.id} className="border-b border-white/10 hover:bg-white/5">
                <td className="p-3 text-white font-medium">#{flota.id}</td>
                <td className="p-3 text-gray-300">{flota.dispositivos}</td>
                <td className="p-3 text-gray-300">{formatNumber(flota.transMes)}</td>
                <td className="p-3 text-red-400">${flota.costoCredits.toFixed(2)}</td>
                <td className="p-3 text-orange-400">${flota.costoPolygon.toFixed(2)}</td>
                <td className="p-3 text-green-400">${flota.ingreso.toFixed(2)}</td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    flota.roiCredits > 0 ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'
                  }`}>
                    {flota.roiCredits.toFixed(1)}%
                  </span>
                </td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    flota.roiPolygon > 0 ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'
                  }`}>
                    {flota.roiPolygon.toFixed(1)}%
                  </span>
                </td>
                <td className="p-3 text-blue-300">{flota.descuento}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Resumen rápido */}
      <div className="mt-6 p-4 bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-white/20 rounded-lg">
        <div className="flex items-center space-x-2 mb-3">
          <TrendingUp className="w-5 h-5 text-green-400" />
          <h3 className="text-lg font-medium text-white">Resumen</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">{flotas.length}</div>
            <div className="text-gray-300">Flotas</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">
              {flotas.reduce((sum, f) => sum + f.dispositivos, 0)}
            </div>
            <div className="text-gray-300">Dispositivos</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">
              ${flotas.reduce((sum, f) => sum + f.ingreso, 0).toFixed(0)}
            </div>
            <div className="text-gray-300">Ingreso Total</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-400">
              {formatNumber(flotas.reduce((sum, f) => sum + f.transMes, 0))}
            </div>
            <div className="text-gray-300">Transacciones/Mes</div>
          </div>
        </div>
      </div>
    </div>
  );
}; 