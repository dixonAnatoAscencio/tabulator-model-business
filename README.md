# Tabulador Modelo de Negocio Blockchain


## Arquitectura de Cálculos

### 1. Configuración General

#### Valores Predeterminados
```typescript
const configDefaults = {
  numFlotas: 10,                    // Número de flotas a analizar
  dispositivosFlota: 1,             // Dispositivos por flota (ACTUALIZADO)
  transaccionesDia: 24,             // Eventos IoT por día (ej: GPS cada hora)
  precioDispositivo: 0,             // Precio unitario del dispositivo (Gratuito/Prestado)
  costoPlanDatos: 10,               // Costo mensual del plan SIM
  transaccionesBlockchainDia: 7,    // Transacciones blockchain por día
  diasPorMes: 30,                   // Días considerados por mes
  mesesPorAno: 12                   // Meses por año
}
```

#### Fórmulas Detalladas

**Cálculo base de transacciones blockchain por mes:**
```
TransaccionesBlockchainMes = dispositivosFlota × transaccionesBlockchainDia × diasPorMes
```

#### Construcción de Fórmulas Paso a Paso

**1. Costo de Conectividad:**
```
CostoSIM = dispositivosFlota × costoPlanDatos
```

**2. Costo de Transacciones Blockchain:**
```
Credits: CostoTX = (dispositivosFlota × transaccionesBlockchainDia × 30) × comisionCredits
Polygon: CostoGas = (dispositivosFlota × transaccionesBlockchainDia × 30) × (gasPolygon × precioMatic)
```

**3. Costo de Infraestructura por Flota:**
```
Credits: InfraFlota = (numNodos × costoAWSNodo + mantenimientoCredits) ÷ numFlotas
Polygon: InfraFlota = infraPolygon ÷ numFlotas
```

**4. Costo Total por Flota:**
```
Credits: CostoTotal = CostoSIM + CostoTX + InfraFlota
Polygon: CostoTotal = CostoSIM + CostoGas + InfraFlota
```

**5. Ingresos por Flota:**
```
IngresoBase = tarifaBaseFija + (dispositivosFlota × tarifaBase)
Credits: Ingreso = IngresoBase
Polygon: Ingreso = IngresoBase + ComisionesSmartContract
```

**6. ROI por Flota:**
```
Ganancia = Ingreso - CostoTotal
ROI = (Ganancia ÷ CostoTotal) × 100
```

**7. CAPEX:**
```
DispositivosInversion = numFlotas × dispositivosFlota × precioDispositivo
Credits: CAPEX = DispositivosInversion + (numNodos × costoAWSNodo × 12)
Polygon: CAPEX = DispositivosInversion + (infraPolygon × 12)
```

**8. Período de Recuperación:**
```
GananciaAnual = Ganancia × 12
PaybackPeriod = CAPEX ÷ GananciaAnual
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

**Costos por Flota (1 dispositivo):**
```
Plan SIM = dispositivosFlota × costoPlanDatos
Plan SIM = 1 × $10 = $10/mes

Transacciones Blockchain = dispositivosFlota × transaccionesBlockchainDia × diasPorMes × comisionCredits
Transacciones Blockchain = 1 × 7 × 30 × $0.001 = $0.21/mes

Infraestructura por Flota = costosFijosCredits ÷ numFlotas
Infraestructura por Flota = $1,100 ÷ 10 = $110/mes

COSTO TOTAL POR FLOTA = $10 + $0.21 + $110 = $120.21/mes
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

**Costos por Flota (1 dispositivo):**
```
Plan SIM = 1 × $10 = $10/mes (mismo que Credits)

Gas Blockchain = dispositivosFlota × transaccionesBlockchainDia × diasPorMes × (gasPolygon × precioMatic)
Gas Blockchain = 1 × 7 × 30 × ($0.001 × $0.90) = $0.189/mes

Infraestructura por Flota = infraPolygon ÷ numFlotas
Infraestructura por Flota = $200 ÷ 10 = $20/mes

COSTO TOTAL POR FLOTA = $10 + $0.189 + $20 = $30.189/mes
```

**Ingresos Adicionales Polygon:**
```
Comisiones Smart Contract = dispositivosFlota × transaccionesBlockchainDia × diasPorMes × comisionPolygon
Comisiones Smart Contract = 1 × 7 × 30 × $0.002 = $0.42/mes por flota
```

### 4. Cálculo de Ingresos

#### Ingresos Base (Ambas Tecnologías)
```
Tarifa Base Fija = $149/mes (Plan Estándar)
Tarifa por Dispositivo = 1 × $15 = $15/mes

INGRESO BASE POR FLOTA = $149 + $15 = $164/mes
```

Para 1 dispositivo (EdgeBox-ESP-100):
```
Ingreso Credits por Flota = $164/mes
Ingreso Polygon por Flota = $164 + $0.42 = $164.42/mes (incluye comisiones SC)
```

### 5. Análisis de Rentabilidad

#### ROI por Flota

**Credits:**
```
Ganancia = Ingreso - Costo = $164 - $120.21 = $43.79/mes
ROI = (Ganancia ÷ Costo) × 100 = ($43.79 ÷ $120.21) × 100 = 36.4%
```

**Polygon:**
```
Ganancia = Ingreso - Costo = $164.42 - $30.189 = $134.23/mes
ROI = (Ganancia ÷ Costo) × 100 = ($134.23 ÷ $30.189) × 100 = 444.6%
```

#### Totales (10 Flotas × 1 Dispositivo = 10 Dispositivos)

**Credits:**
```
Costo Total = $120.21 × 10 = $1,202.1/mes
Ingreso Total = $164 × 10 = $1,640/mes
Ganancia Total = $1,640 - $1,202.1 = $437.9/mes
ROI Total = ($437.9 ÷ $1,202.1) × 100 = 36.4%
```

**Polygon:**
```
Costo Total = $30.189 × 10 = $301.9/mes
Ingreso Total = $164.42 × 10 = $1,644.2/mes
Ganancia Total = $1,644.2 - $301.9 = $1,342.3/mes
ROI Total = ($1,342.3 ÷ $301.9) × 100 = 444.6%
```

### 6. Análisis CAPEX vs OPEX

#### CAPEX (Gastos de Capital)

**Credits:**
```
Dispositivos IoT = numFlotas × dispositivosFlota × precioDispositivo
Dispositivos IoT = 10 × 1 × $0 = $0 (Dispositivo Gratuito/Prestado)

Infraestructura Anual = numNodos × costoAWSNodo × 12
Infraestructura Anual = 4 × $150 × 12 = $7,200

CAPEX Credits = $0 + $7,200 = $7,200
```

**Polygon:**
```
Dispositivos IoT = $0 (igual que Credits - Dispositivo Gratuito)

Infraestructura Anual = infraPolygon × 12
Infraestructura Anual = $200 × 12 = $2,400

CAPEX Polygon = $0 + $2,400 = $2,400
```

#### OPEX (Gastos Operacionales Mensual)

**Credits:**
```
OPEX = Costo Total Mensual = $1,202.1/mes
OPEX Anual = $1,202.1 × 12 = $14,425/año
```

**Polygon:**
```
OPEX = Costo Total Mensual = $301.9/mes
OPEX Anual = $301.9 × 12 = $3,623/año
```

### 7. Métricas Financieras Avanzadas

#### Payback Period (Período de Recuperación)

**Credits:**
```
EBITDA Anual = Ganancia Mensual × 12 = $437.9 × 12 = $5,255/año
Payback = CAPEX ÷ EBITDA Anual = $7,200 ÷ $5,255 = 1.37 años
```

**Polygon:**
```
EBITDA Anual = $1,342.3 × 12 = $16,108/año
Payback = $2,400 ÷ $16,108 = 0.15 años (1.8 meses)
```

#### IRR (Internal Rate of Return)

**Credits:**
```
IRR = (EBITDA Anual ÷ CAPEX) × 100 = ($5,255 ÷ $7,200) × 100 = 73.0%
```

**Polygon:**
```
IRR = ($16,108 ÷ $2,400) × 100 = 671.2%
```

### 8. Comparación de Tecnologías

#### Resumen Comparativo

| Métrica | Credits | Polygon | Mejor |
|---------|---------|---------|-------|
| CAPEX | $7,200 | $2,400 | Polygon |
| OPEX Mensual | $1,202.1 | $301.9 | Polygon |
| Ganancia Mensual | $437.9 | $1,342.3 | Polygon |
| ROI | 36.4% | 444.6% | Polygon |
| Payback Period | 1.37 años | 0.15 años | Polygon |
| IRR | 73.0% | 671.2% | Polygon |

#### Diferencias Clave

1. **Diferencia de Ganancia:** $1,342.3 - $437.9 = $904.4/mes (Polygon mejor)
2. **Diferencia de ROI:** 444.6% - 36.4% = 408.2% (Polygon mejor)
3. **Diferencia de CAPEX:** $7,200 - $2,400 = $4,800 (Polygon menor)

### 9. Factores de Costos Detallados

#### Por Dispositivo/Mes

**Conectividad:**
- Plan SIM: $10/mes/dispositivo (EdgeBox-ESP-100)

**Blockchain (Credits):**
- Transacciones: 7 tx/día × 30 días × $0.001 = $0.21/mes/dispositivo
- Infraestructura: $110/flota ÷ 1 dispositivo = $110/mes/dispositivo

**Blockchain (Polygon):**
- Gas: 7 tx/día × 30 días × $0.0009 = $0.189/mes/dispositivo
- Infraestructura: $20/flota ÷ 1 dispositivo = $20/mes/dispositivo
- Comisión SC: 7 tx/día × 30 días × $0.002 = $0.42/mes/dispositivo (ingreso)

### 10. Supuestos y Limitaciones

#### Supuestos Clave
1. Precio de MATIC estable en $0.90
2. Uso constante de transacciones blockchain (7 por día)
3. No se consideran fluctuaciones de red en gas fees
4. Infraestructura escalable linealmente
5. **Descuentos por volumen eliminados** (no se calculan en versión actual)
6. Eventos IoT totales: 24/día, Transacciones blockchain: 7/día
7. **Dispositivos IoT gratuitos/prestados** (Modelo SaaS sin venta de hardware)

#### Limitaciones
1. No incluye costos de desarrollo inicial
2. No considera fluctuaciones de mercado de criptomonedas
3. Supone 100% de utilización de dispositivos
4. No incluye costos de soporte técnico especializado
5. Análisis basado en condiciones actuales de mercado

#### Notas de Implementación
- Los cálculos excluyen descuentos por volumen según configuración actual
- Se distingue entre eventos IoT generales (24/día) y transacciones blockchain (7/día)
- El período de recuperación se calcula en años (CAPEX ÷ ganancia anual)
- Los ingresos de Polygon incluyen comisiones de smart contracts como ingresos adicionales

### 11. Modelo de Dispositivo Gratuito y Plan Personalizado

#### Dispositivo IoT en $0 (Gratuito/Prestado)
Cuando se configura el precio del dispositivo IoT en $0:

**❌ NO se cobra:**
- Costo inicial del dispositivo IoT
- Depreciación del hardware
- Seguros del dispositivo
- Reparaciones o reemplazos de hardware

**✅ SÍ se cobra:**
- Plan de datos SIM ($10/mes por dispositivo)
- Transacciones blockchain (Credits: $0.21/mes, Polygon: $0.189/mes)
- Infraestructura de red (Credits: $110/flota, Polygon: $20/flota)
- Servicios de plataforma (tarifa base fija y por dispositivo)

#### Plan Personalizado con Tarifas en $0
Cuando se configura el plan personalizado con tarifas en $0:

**Tarifa Base Fija = $0:**
- ❌ NO se cobra cuota mensual fija por acceso a la plataforma
- ❌ NO se cobra por panel de control o dashboard
- ❌ NO se cobra por APIs básicas

**Tarifa por Dispositivo = $0:**
- ❌ NO se cobra cuota mensual por cada dispositivo conectado
- ❌ NO se cobra por funcionalidades básicas de monitoreo
- ❌ NO se cobra por alertas estándar

**Costos que SIEMPRE se mantienen (no afectados por el plan):**
- ✅ Conectividad SIM/datos
- ✅ Transacciones blockchain (gas fees o comisiones)
- ✅ Infraestructura de red blockchain
- ✅ Comisiones de smart contracts (solo Polygon - como ingreso)

### 12. Período de Recuperación "N/A" - Explicación

#### ¿Por qué aparece "N/A" en el Período de Recuperación?

El período de recuperación muestra **"N/A"** (No Aplicable) cuando la configuración resulta en **pérdidas operacionales** en lugar de ganancias. Esto ocurre en los siguientes escenarios:

#### Escenario 1: Plan Personalizado con Tarifas en $0
```
Configuración: Tarifa Base Fija = $0, Tarifa por Dispositivo = $0

Resultado por Flota:
Credits:  Ingreso = $0,    Costo = $120.21 → Ganancia = -$120.21 (PÉRDIDA)
Polygon:  Ingreso = $0.42, Costo = $30.19  → Ganancia = -$29.77  (PÉRDIDA)

Período de Recuperación = N/A (Imposible recuperar inversión con pérdidas)
```

#### Escenario 2: Costos Operacionales Superiores a Ingresos
```
Si los costos de infraestructura, SIM o blockchain superan los ingresos del plan,
el resultado será una pérdida operacional y por tanto "N/A".
```

#### Interpretación del "N/A"

**✅ Matemáticamente Correcto:**
- No es posible calcular período de recuperación si no hay ganancia neta
- La fórmula `CAPEX ÷ Ganancia Anual` no aplica con ganancias negativas

**✅ Conceptualmente Válido:**
- **Modelo Freemium**: Servicios gratuitos para atraer usuarios
- **Período de Prueba**: Evaluar valor antes de facturar
- **Partnerships Estratégicos**: Absorber costos por beneficios a largo plazo
- **Subsidio Operacional**: Costos cubiertos por otros ingresos

#### Casos de Uso para Configuración $0/$0

1. **🔬 Pilotos y POCs (Proof of Concept)**
   - Demostrar valor técnico antes de negociar precios
   - Validar casos de uso específicos

2. **🎯 Estrategia de Penetración de Mercado**
   - Ganar market share antes de monetizar
   - Crear dependencia tecnológica

3. **🤝 Modelos B2B Complejos**
   - Parte de contratos más amplios
   - Servicios incluidos en otros productos

4. **📊 Recolección de Datos**
   - Obtener datos valiosos para análisis
   - Entrenar modelos de ML/IA

#### Recomendaciones

**Si ves "N/A" constantemente:**
- ✅ Revisar estructura de costos (reducir infraestructura)
- ✅ Ajustar modelo de precios (incrementar tarifas mínimas)
- ✅ Optimizar eficiencia operacional
- ✅ Considerar modelos de ingresos alternativos (comisiones, publicidad, datos)


