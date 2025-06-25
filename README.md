# Tabulador Modelo de Negocio Blockchain


## Arquitectura de Cálculos

### 1. Configuración General

#### Valores Predeterminados
```typescript
const configDefaults = {
  numFlotas: 10,                    // Número de flotas a analizar
  dispositivosFlota: 10,            // Dispositivos por flota
  transaccionesDia: 24,             // Eventos IoT por día (ej: GPS cada hora)
  precioDispositivo: 147.5,         // Precio unitario del dispositivo (EdgeBox-ESP-100)
  costoPlanDatos: 10,               // Costo mensual del plan SIM
  transaccionesBlockchainDia: 7,    // Transacciones blockchain por día
  diasPorMes: 30,                   // Días considerados por mes
  mesesPorAno: 12                   // Meses por año
}
```

#### Plan de Servicios
```typescript
const planes = {
  basico: { fija: 49, porDispositivo: 2, nombre: 'Básico' },
  estandar: { fija: 149, porDispositivo: 15, nombre: 'Estándar' },     // Por defecto
  avanzado: { fija: 399, porDispositivo: 1, nombre: 'Avanzado/Premium' }
}
```

### 2. Configuración Credits (Red Propia)

#### Valores Predeterminados
```typescript
const creditsDefaults = {
  numNodos: 4,                      // Nodos AWS para la red
  costoAWSNodo: 150,                // Costo mensual por nodo AWS
  comisionCredits: 0.001,           // Comisión por transacción blockchain ($)
  mantenimientoCredits: 500         // Costo fijo mensual de mantenimiento
}
```

#### Cálculos Credits

**Costos Fijos Mensuales:**
```
Infraestructura = (numNodos × costoAWSNodo) + mantenimientoCredits
Infraestructura = (4 × $150) + $500 = $1,100/mes
```

**Costos por Flota:**
```
Plan SIM = dispositivosFlota × costoPlanDatos
Plan SIM = 10 × $10 = $100/mes

Transacciones Blockchain = dispositivosFlota × transaccionesBlockchainDia × diasPorMes × comisionCredits
Transacciones Blockchain = 10 × 7 × 30 × $0.001 = $2.1/mes

Infraestructura por Flota = costosFijosCredits ÷ numFlotas
Infraestructura por Flota = $1,100 ÷ 10 = $110/mes

COSTO TOTAL POR FLOTA = $100 + $2.1 + $110 = $212.1/mes
```

### 3. Configuración Polygon

#### Valores Predeterminados
```typescript
const polygonDefaults = {
  gasPolygon: 0.001,                // Gas por transacción
  precioMatic: 0.90,                // Precio de MATIC en USD
  comisionPolygon: 0.002,           // Comisión por transacción smart contract
  infraPolygon: 200                 // Costo fijo mensual infraestructura
}
```

#### Cálculos Polygon

**Costos por Flota:**
```
Plan SIM = 10 × $10 = $100/mes (mismo que Credits)

Gas Blockchain = dispositivosFlota × transaccionesBlockchainDia × diasPorMes × (gasPolygon × precioMatic)
Gas Blockchain = 10 × 7 × 30 × ($0.001 × $0.90) = $1.89/mes

Infraestructura por Flota = infraPolygon ÷ numFlotas
Infraestructura por Flota = $200 ÷ 10 = $20/mes

COSTO TOTAL POR FLOTA = $100 + $1.89 + $20 = $121.89/mes
```

**Ingresos Adicionales Polygon:**
```
Comisiones Smart Contract = dispositivosFlota × transaccionesBlockchainDia × diasPorMes × comisionPolygon
Comisiones Smart Contract = 10 × 7 × 30 × $0.002 = $4.2/mes por flota
```

### 4. Cálculo de Ingresos

#### Ingresos Base (Ambas Tecnologías)
```
Tarifa Base Fija = $149/mes (Plan Estándar)
Tarifa por Dispositivo = 10 × $15 = $150/mes

INGRESO BASE POR FLOTA = $149 + $150 = $299/mes
```

Para 10 dispositivos (EdgeBox-ESP-100):
```
Ingreso Credits por Flota = $299/mes
Ingreso Polygon por Flota = $299 + $4.2 = $303.2/mes (incluye comisiones SC)
```

### 5. Análisis de Rentabilidad

#### ROI por Flota

**Credits:**
```
Ganancia = Ingreso - Costo = $299 - $212.1 = $86.9/mes
ROI = (Ganancia ÷ Costo) × 100 = ($86.9 ÷ $212.1) × 100 = 41.0%
```

**Polygon:**
```
Ganancia = Ingreso - Costo = $303.2 - $121.89 = $181.31/mes
ROI = (Ganancia ÷ Costo) × 100 = ($181.31 ÷ $121.89) × 100 = 148.7%
```

#### Totales (10 Flotas)

**Credits:**
```
Costo Total = $212.1 × 10 = $2,121/mes
Ingreso Total = $299 × 10 = $2,990/mes
Ganancia Total = $2,990 - $2,121 = $869/mes
ROI Total = ($869 ÷ $2,121) × 100 = 41.0%
```

**Polygon:**
```
Costo Total = $121.89 × 10 = $1,218.9/mes
Ingreso Total = $303.2 × 10 = $3,032/mes
Ganancia Total = $3,032 - $1,218.9 = $1,813.1/mes
ROI Total = ($1,813.1 ÷ $1,218.9) × 100 = 148.7%
```

### 6. Análisis CAPEX vs OPEX

#### CAPEX (Gastos de Capital)

**Credits:**
```
Dispositivos IoT = numFlotas × dispositivosFlota × precioDispositivo
Dispositivos IoT = 10 × 10 × $147.5 = $14,750 (EdgeBox-ESP-100)

Infraestructura Anual = numNodos × costoAWSNodo × 12
Infraestructura Anual = 4 × $150 × 12 = $7,200

CAPEX Credits = $14,750 + $7,200 = $21,950
```

**Polygon:**
```
Dispositivos IoT = $14,750 (igual que Credits)

Infraestructura Anual = infraPolygon × 12
Infraestructura Anual = $200 × 12 = $2,400

CAPEX Polygon = $14,750 + $2,400 = $17,150
```

#### OPEX (Gastos Operacionales Mensual)

**Credits:**
```
OPEX = Costo Total Mensual = $2,121/mes
OPEX Anual = $2,121 × 12 = $25,452/año
```

**Polygon:**
```
OPEX = Costo Total Mensual = $1,218.9/mes
OPEX Anual = $1,218.9 × 12 = $14,627/año
```

### 7. Métricas Financieras Avanzadas

#### Payback Period (Período de Recuperación)

**Credits:**
```
EBITDA Anual = Ganancia Mensual × 12 = $869 × 12 = $10,428/año
Payback = CAPEX ÷ EBITDA Anual = $21,950 ÷ $10,428 = 2.11 años
```

**Polygon:**
```
EBITDA Anual = $1,813.1 × 12 = $21,757/año
Payback = $17,150 ÷ $21,757 = 0.79 años
```

#### IRR (Internal Rate of Return)

**Credits:**
```
IRR = (EBITDA Anual ÷ CAPEX) × 100 = ($10,428 ÷ $21,950) × 100 = 47.5%
```

**Polygon:**
```
IRR = ($21,757 ÷ $17,150) × 100 = 126.9%
```

### 8. Comparación de Tecnologías

#### Resumen Comparativo

| Métrica | Credits | Polygon | Mejor |
|---------|---------|---------|-------|
| CAPEX | $21,950 | $17,150 | Polygon |
| OPEX Mensual | $2,121 | $1,218.9 | Polygon |
| Ganancia Mensual | $869 | $1,813.1 | Polygon |
| ROI | 41.0% | 148.7% | Polygon |
| Payback Period | 2.11 años | 0.79 años | Polygon |
| IRR | 47.5% | 126.9% | Polygon |

#### Diferencias Clave

1. **Diferencia de Ganancia:** $1,813.1 - $869 = $944.1/mes (Polygon mejor)
2. **Diferencia de ROI:** 148.7% - 41.0% = 107.7% (Polygon mejor)
3. **Diferencia de CAPEX:** $21,950 - $17,150 = $4,800 (Polygon menor)

### 9. Factores de Costos Detallados

#### Por Dispositivo/Mes

**Conectividad:**
- Plan SIM: $10/mes/dispositivo (EdgeBox-ESP-100)

**Blockchain (Credits):**
- Transacciones: 7 tx/día × 30 días × $0.001 = $0.21/mes/dispositivo
- Infraestructura: $110/flota ÷ 10 dispositivos = $11/mes/dispositivo

**Blockchain (Polygon):**
- Gas: 7 tx/día × 30 días × $0.0009 = $0.189/mes/dispositivo
- Infraestructura: $20/flota ÷ 10 dispositivos = $2/mes/dispositivo
- Comisión SC: 7 tx/día × 30 días × $0.002 = $0.42/mes/dispositivo (ingreso)

### 10. Supuestos y Limitaciones

#### Supuestos Clave
1. Precio de MATIC estable en $0.90
2. Uso constante de transacciones blockchain (7 por día)
3. No se consideran fluctuaciones de red en gas fees
4. Infraestructura escalable linealmente

#### Limitaciones
1. No incluye costos de desarrollo inicial
2. No considera fluctuaciones de mercado de criptomonedas
3. Supone 100% de utilización de dispositivos
4. No incluye costos de soporte técnico especializado
5. Análisis basado en condiciones actuales de mercado


