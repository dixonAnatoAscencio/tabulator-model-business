'use client'

import React, { useState, useEffect } from 'react';
import { saveAs } from 'file-saver';
import GeneralConfig from './components/general-config';
import CreditsConfig from './components/credits-config';
import PolygonConfig from './components/polygon-config';
import { PricingModel } from './components/pricing-model';
import { ResultsTable } from './components/results-table';
import { SummaryCards } from './components/summary-cards';
import { FinancialAnalysis } from './components/financial-analysis';
import { CostBreakdown } from './components/cost-breakdown';

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

export default function FleetCalculatorPage() {
  const [config, setConfig] = useState({
    numFlotas: 10,
    dispositivosFlota: 10,
    transaccionesDia: 24,
    precioDispositivo: 147.5,
    numNodos: 4,
    costoAWSNodo: 150,
    comisionCredits: 0.001,
    mantenimientoCredits: 500,
    gasPolygon: 0.001,
    precioMatic: 0.9,
    comisionPolygon: 0.002,
    infraPolygon: 200,
    costoPlanDatos: 10,
    mbTransaccion: 0.1,
    planServicio: 'estandar',
    tarifaBaseFija: 149,
    tarifaBase: 15,
    descuento100: 10,
    descuento500: 20,
    descuento1000: 30,
    // Propiedades adicionales necesarias para los componentes
    dispositivoSeleccionado: 'edgebox-esp100',
    soporteLatAm: 0.145,
    mbPorTransaccion: 0.1,
    transaccionesBlockchainDia: 7,
    tipoFacturacionBlockchain: 'por_evento',
    factorEscala: 0,
    costoInstalacion: 50,
    costoMantenimientoDispositivo: 10,
  });

  const [resultados, setResultados] = useState<{
    flotas: Flota[];
    totales: Totales;
  }>({
    flotas: [],
    totales: {
      credits: {
        costo: 0,
        ingreso: 0,
        ganancia: 0,
        roi: 0,
        recuperacion: null,
      },
      polygon: {
        costo: 0,
        ingreso: 0,
        ganancia: 0,
        roi: 0,
        recuperacion: null,
      },
    },
  });

  const planes = {
    basico: { fija: 49, porDispositivo: 2 },
    estandar: { fija: 149, porDispositivo: 15 },
    avanzado: { fija: 399, porDispositivo: 1 },
  };

  const actualizarTarifas = (plan: string) => {
    if (plan !== 'custom' && planes[plan as keyof typeof planes]) {
      const planData = planes[plan as keyof typeof planes];
      setConfig((prev) => ({
        ...prev,
        planServicio: plan,
        tarifaBaseFija: planData.fija,
        tarifaBase: planData.porDispositivo,
      }));
    } else {
      setConfig((prev) => ({ ...prev, planServicio: plan }));
    }
  };

  const calcularDescuento = (totalDispositivos: number) => {
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
      const transMes = config.dispositivosFlota * config.transaccionesBlockchainDia * 30;
      const desc = calcularDescuento(totalDispositivos);
      const tarifaDesc = config.tarifaBase * (1 - desc / 100);
      const datos = config.dispositivosFlota * config.costoPlanDatos;
      const costoTxCredits = transMes * config.comisionCredits;
      const costoGasPolygon = transMes * (config.gasPolygon * config.precioMatic);
      const comisionPolygonIngreso = transMes * config.comisionPolygon;
      const costoCredits = datos + costoTxCredits + fijosCredits / config.numFlotas;
      const costoPolygon = datos + costoGasPolygon + fijosPolygon / config.numFlotas;
      const ingresoBase = config.tarifaBaseFija + config.dispositivosFlota * tarifaDesc;
      const ingresoCredits = ingresoBase; // Credits solo tiene ingreso base
      const ingresoPolygon = ingresoBase + comisionPolygonIngreso; // Polygon suma comisiones SC
      const roiCredits = ((ingresoCredits - costoCredits) / costoCredits) * 100;
      const roiPolygon = ((ingresoPolygon - costoPolygon) / costoPolygon) * 100;

      totalCredits += costoCredits;
      totalPolygon += costoPolygon;
      ingresoTotal += ingresoCredits; // Usamos ingresoCredits para el total base
      inversion += config.dispositivosFlota * config.precioDispositivo;

      flotas.push({
        id: i,
        dispositivos: config.dispositivosFlota,
        transMes,
        costoCredits,
        costoPolygon,
        ingreso: ingresoCredits, // Mostramos el ingreso base en la tabla
        roiCredits,
        roiPolygon,
        descuento: desc,
      });
    }

    // Calcular ingreso total de Polygon (incluye comisiones SC)
    const ingresoTotalPolygon = ingresoTotal + (config.numFlotas * config.dispositivosFlota * config.transaccionesBlockchainDia * 30 * config.comisionPolygon);
    
    const gananciaCredits = ingresoTotal - totalCredits;
    const gananciaPolygon = ingresoTotalPolygon - totalPolygon;

    setResultados({
      flotas,
      totales: {
        credits: {
          costo: totalCredits,
          ingreso: ingresoTotal,
          ganancia: gananciaCredits,
          roi: (gananciaCredits / totalCredits) * 100,
          recuperacion: gananciaCredits > 0 ? inversion / (gananciaCredits * 12) : null, // Recuperación en años
        },
        polygon: {
          costo: totalPolygon,
          ingreso: ingresoTotalPolygon,
          ganancia: gananciaPolygon,
          roi: (gananciaPolygon / totalPolygon) * 100,
          recuperacion: gananciaPolygon > 0 ? inversion / (gananciaPolygon * 12) : null, // Recuperación en años
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
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-slate-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-600">
          Tabulador Costos Blockchain Model Business
        </h1>
        <GeneralConfig 
          config={config} 
          updateConfig={(key: any, value: any) => setConfig(prev => ({ ...prev, [key]: value }))}
          cambiarPlan={actualizarTarifas}
          isExpanded={true}
          onToggle={() => {}}
          planes={{
            basico: { fija: 49, porDispositivo: 2, nombre: 'Básico' },
            estandar: { fija: 149, porDispositivo: 15, nombre: 'Estándar' },
            avanzado: { fija: 399, porDispositivo: 1, nombre: 'Avanzado/Premium' }
          }}
        />
        <CreditsConfig 
          config={config} 
          updateConfig={(key: any, value: any) => setConfig(prev => ({ ...prev, [key]: value }))}
          isExpanded={true}
          onToggle={() => {}}
        />
        <PolygonConfig 
          config={config} 
          updateConfig={(key: any, value: any) => setConfig(prev => ({ ...prev, [key]: value }))}
          isExpanded={true}
          onToggle={() => {}}
        />
        <PricingModel config={config} setConfig={setConfig} actualizarTarifas={actualizarTarifas} />
        <CostBreakdown config={config} />
        <ResultsTable flotas={resultados.flotas} />
        <SummaryCards totales={resultados.totales} />
        <FinancialAnalysis totales={resultados.totales} config={config} />
        <div className="text-center mt-10">
          <button onClick={exportarCSV} className="bg-gradient-to-r from-indigo-500 to-purple-500 px-6 py-3 rounded-xl text-white font-semibold hover:shadow-lg">
            Exportar CSV 📥
          </button>
        </div>
      </div>
    </div>
  );
}
