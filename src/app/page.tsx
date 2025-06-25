'use client'

import React, { useState, useEffect } from 'react';
import { saveAs } from 'file-saver';
import { GeneralConfig } from '@/components/fleet/GeneralConfig';
import { CreditsConfig } from '@/components/fleet/CreditsConfig';
import { PolygonConfig } from '@/components/fleet/PolygonConfig';
import { PricingModel } from '@/components/fleet/PricingModel';
import { ResultsTable } from '@/components/fleet/ResultsTable';
import { SummaryCards } from '@/components/fleet/SummaryCards';

export default function FleetCalculatorPage() {
  const [config, setConfig] = useState({
    numFlotas: 10,
    dispositivosFlota: 50,
    transaccionesDia: 24,
    precioDispositivo: 100,
    numNodos: 4,
    costoAWSNodo: 150,
    comisionCredits: 0.001,
    mantenimientoCredits: 500,
    gasPolygon: 0.001,
    precioMatic: 0.9,
    comisionPolygon: 0.002,
    infraPolygon: 200,
    costoPlanDatos: 5,
    mbTransaccion: 0.1,
    planServicio: 'estandar',
    tarifaBaseFija: 149,
    tarifaBase: 15,
    descuento100: 10,
    descuento500: 20,
    descuento1000: 30,
  });

  const [resultados, setResultados] = useState({
    flotas: [],
    totales: {
      credits: {},
      polygon: {},
    },
  });

  const planes = {
    basico: { fija: 49, porDispositivo: 2 },
    estandar: { fija: 149, porDispositivo: 15 },
    avanzado: { fija: 399, porDispositivo: 1 },
  };

  const actualizarTarifas = (plan) => {
    if (plan !== 'custom' && planes[plan]) {
      setConfig((prev) => ({
        ...prev,
        planServicio: plan,
        tarifaBaseFija: planes[plan].fija,
        tarifaBase: planes[plan].porDispositivo,
      }));
    } else {
      setConfig((prev) => ({ ...prev, planServicio: plan }));
    }
  };

  const calcularDescuento = (totalDispositivos) => {
    if (totalDispositivos >= 1000) return config.descuento1000;
    if (totalDispositivos >= 500) return config.descuento500;
    if (totalDispositivos >= 100) return config.descuento100;
    return 0;
  };

  const calcular = () => {
    let flotas = [];
    let totalDispositivos = 0;
    let totalCredits = 0;
    let totalPolygon = 0;
    let ingresoTotal = 0;
    let inversion = 0;
    const fijosCredits = config.numNodos * config.costoAWSNodo + config.mantenimientoCredits;
    const fijosPolygon = config.infraPolygon;

    for (let i = 1; i <= config.numFlotas; i++) {
      totalDispositivos += config.dispositivosFlota;
      const transMes = config.dispositivosFlota * config.transaccionesDia * 30;
      const desc = calcularDescuento(totalDispositivos);
      const tarifaDesc = config.tarifaBase * (1 - desc / 100);
      const datos = config.dispositivosFlota * config.costoPlanDatos;
      const costoTxCredits = transMes * config.comisionCredits;
      const costoTxPolygon = transMes * (config.gasPolygon * config.precioMatic + config.comisionPolygon);
      const costoCredits = datos + costoTxCredits + fijosCredits / config.numFlotas;
      const costoPolygon = datos + costoTxPolygon + fijosPolygon / config.numFlotas;
      const ingreso = config.tarifaBaseFija + config.dispositivosFlota * tarifaDesc;
      const roiCredits = ((ingreso - costoCredits) / costoCredits) * 100;
      const roiPolygon = ((ingreso - costoPolygon) / costoPolygon) * 100;

      totalCredits += costoCredits;
      totalPolygon += costoPolygon;
      ingresoTotal += ingreso;
      inversion += config.dispositivosFlota * config.precioDispositivo;

      flotas.push({
        id: i,
        dispositivos: config.dispositivosFlota,
        transMes,
        costoCredits,
        costoPolygon,
        ingreso,
        roiCredits,
        roiPolygon,
        descuento: desc,
      });
    }

    const gananciaCredits = ingresoTotal - totalCredits;
    const gananciaPolygon = ingresoTotal - totalPolygon;

    setResultados({
      flotas,
      totales: {
        credits: {
          costo: totalCredits,
          ingreso: ingresoTotal,
          ganancia: gananciaCredits,
          roi: (gananciaCredits / totalCredits) * 100,
          recuperacion: gananciaCredits > 0 ? inversion / gananciaCredits : null,
        },
        polygon: {
          costo: totalPolygon,
          ingreso: ingresoTotal,
          ganancia: gananciaPolygon,
          roi: (gananciaPolygon / totalPolygon) * 100,
          recuperacion: gananciaPolygon > 0 ? inversion / gananciaPolygon : null,
        },
      },
    });
  };

  const exportarCSV = () => {
    let csv = 'Flota,Dispositivos,Transacciones/Mes,Costo Credits,Costo Polygon,Ingreso,ROI Credits,ROI Polygon\n';
    resultados.flotas.forEach((f) => {
      csv += `${f.id},${f.dispositivos},${f.transMes},${f.costoCredits.toFixed(2)},${f.costoPolygon.toFixed(2)},${f.ingreso.toFixed(2)},${f.roiCredits.toFixed(2)}%,${f.roiPolygon.toFixed(2)}%\n`;
    });
    csv += '\nResumen General\n';
    csv += 'Métrica,Credits,Polygon\n';
    csv += `Costo Total,${resultados.totales.credits.costo.toFixed(2)},${resultados.totales.polygon.costo.toFixed(2)}\n`;
    csv += `Ingreso Total,${resultados.totales.credits.ingreso.toFixed(2)},${resultados.totales.polygon.ingreso.toFixed(2)}\n`;
    csv += `Ganancia,${resultados.totales.credits.ganancia.toFixed(2)},${resultados.totales.polygon.ganancia.toFixed(2)}\n`;
    csv += `ROI,${resultados.totales.credits.roi.toFixed(2)}%,${resultados.totales.polygon.roi.toFixed(2)}%\n`;
    csv += `Recuperación,${resultados.totales.credits.recuperacion?.toFixed(2) || 'N/A'},${resultados.totales.polygon.recuperacion?.toFixed(2) || 'N/A'}\n`;

    const blob = new Blob([csv], { type: 'text/csv' });
    saveAs(blob, 'analisis_flotas_blockchain.csv');
  };

  useEffect(() => {
    calcular();
  }, [config]);

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-600">
          Calculadora de Flotas Blockchain
        </h1>
        <GeneralConfig config={config} setConfig={setConfig} />
        <CreditsConfig config={config} setConfig={setConfig} />
        <PolygonConfig config={config} setConfig={setConfig} />
        <PricingModel config={config} setConfig={setConfig} actualizarTarifas={actualizarTarifas} />
        <ResultsTable flotas={resultados.flotas} />
        <SummaryCards totales={resultados.totales} />
        <div className="text-center mt-10">
          <button onClick={exportarCSV} className="bg-gradient-to-r from-indigo-500 to-purple-500 px-6 py-3 rounded-xl text-white font-semibold hover:shadow-lg">
            Exportar CSV 📥
          </button>
        </div>
      </div>
    </div>
  );
}
