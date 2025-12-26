# Apuntes para Diseño de Mockups - Sistema de Liquidación de Promociones

## Reunión 1: Levantamiento de Requerimientos

### Pantallas Principales
- **Dashboard principal** con acceso a todos los módulos
- **Gestión de planes promocionales** (PMC, Cupones, Rebates, etc.)
- **Carga de archivos** Excel/CSV
- **Validación de información**
- **Liquidación** por cliente y plan
- **Emisión de NC** (integración con SAP)

### Elementos Clave
- Menú lateral con módulos: PMC, Cupones, Rebates, Semana Descuentos, OII, Provisiones
- Estados visuales: Pendiente, En Proceso, Aprobado, Rechazado
- Indicadores de progreso
- Alertas de validación

---

## Reunión 2: Historias de Usuario

### Flujos de Usuario
1. **Auditoría:** Recibe info → Valida → Liquida → Solicita NC
2. **Facturación:** Recibe solicitud → Genera NC → Notifica
3. **Contabilidad:** Recibe provisiones → Registra → Confirma

### Campos Comunes
- Cliente (dropdown con búsqueda)
- Plan promocional (dropdown)
- Período (date picker)
- Productos (tabla editable)
- Valores (inputs numéricos con formato moneda)
- Estado (badge visual)

---

## Reunión 3: Proceso PMC

### Pantalla: Carga de Archivo PMC
- **Botón:** "Cargar Archivo Excel"
- **Drag & drop** para archivos
- **Preview** de datos antes de procesar
- **Columnas esperadas:** Cédula, Código Producto, Cantidad, Valor

### Pantalla: Validación InnovaSer
- **Tabla** con resultados de validación
- **Columnas:** Cédula, Estado Validación, Observaciones
- **Filtros:** Válidos, Inválidos, Todos
- **Acciones:** Exportar errores, Continuar con válidos

### Pantalla: Liquidación PMC
- **Resumen:** Total pacientes, Total unidades, Total valor
- **Tabla por cliente:** Cliente, Unidades, Valor a reconocer
- **Botón:** "Generar Solicitud NC"

---

## Reunión 4: Liquidación PMC y Cupones

### Pantalla: Proceso de Cupones
- **Tabs:** Por plan (Trifamox, Novo Morav, Letti, Corpus)
- **Carga de archivos** por subcódigo
- **Validación de facturas** (número, fecha, valor)
- **Consolidación** de todos los subcódigos

### Elementos Visuales
- **Cards** por cada subcódigo con contador de registros
- **Progress bar** del proceso de validación
- **Tabla resumen** con totales por producto
- **Botones de acción:** Validar, Liquidar, Exportar

---

## Reunión 5: Cupones y Validaciones

### Pantalla: Validaciones de Cupones
- **Reglas visualizadas:**
  - ✓ Factura válida (verde)
  - ✗ Factura inválida (rojo)
  - ⚠ Advertencia (amarillo)

### Tabla de Validación
- Columnas: Factura, Producto, Cantidad, Valor, Estado, Observación
- Filtros por estado
- Búsqueda por número de factura
- Acciones: Ver detalle, Corregir, Eliminar

---

## Reunión 6: Sistema InnovaSer

### Pantalla: Configuración InnovaSer
- **Campos:**
  - URL del servicio
  - Usuario
  - Contraseña (oculta)
  - Timeout (segundos)
- **Botón:** "Probar Conexión"
- **Indicador:** Estado de conexión (conectado/desconectado)

### Pantalla: Resultados de Validación
- **Estadísticas:**
  - Total cédulas enviadas
  - Válidas (%)
  - Inválidas (%)
  - Errores de servicio
- **Gráfico de dona** con distribución
- **Tabla detallada** de resultados

---

## Reunión 7: Semana de Descuentos y Rebates

### Pantalla: Semana de Descuentos
- **Selector de período** (semana específica)
- **Lista de productos** participantes
- **Descuento aplicable** por producto
- **Clientes participantes** (multiselect)

### Pantalla: Rebates
- **Tipo de rebate:** Volumen, Crecimiento, Mixto
- **Condiciones:** Tabla editable con rangos y %
- **Ejemplo:** "Si compras 1000-5000 unidades → 5% descuento"
- **Cálculo automático** al ingresar ventas

---

## Reunión 8: OII y Provisiones

### Pantalla: Órdenes Internas (OII)
- **Formulario:**
  - Número de orden
  - Cliente
  - Productos (tabla)
  - Observaciones
- **Estado:** Pendiente, Aprobada, Procesada
- **Timeline** de estados

### Pantalla: Cálculo de Provisiones
- **Selector de mes**
- **Tabla automática:**
  - Cliente
  - Plan
  - Promedio 3 meses
  - Provisión calculada
- **Botón:** "Generar Reporte para Contabilidad"

---

## Reunión 9: Rebates y GPF

### Pantalla: Plan Comercial GPF
- **Configuración específica** para cliente GPF
- **Metas:** Tabla con objetivos mensuales
- **Seguimiento:** Gráfico de líneas (meta vs real)
- **Alertas:** Si está por debajo de meta

---

## Reunión 10: Verdezoto y Franquiciados

### Pantalla: Clientes Especiales
- **Lista de clientes** con tratamiento especial
- **Configuración por cliente:**
  - Tipo de validación
  - Descuentos aplicables
  - Condiciones particulares
- **Checkbox:** "Requiere aprobación manual"

---

## Reunión 11: Estados de Cuenta

### Pantalla: Monitor de Estados de Cuenta
- **Tabla principal:**
  - Cliente
  - Última actualización
  - Saldo pendiente
  - NC emitidas
  - Estado
- **Filtros:** Por cliente, por estado, por fecha
- **Acción:** "Actualizar desde SAP"

### Elementos Visuales
- **Badge de estado:** Al día (verde), Atrasado (rojo), Pendiente (amarillo)
- **Tooltip** con detalle al pasar mouse
- **Modal** con detalle completo al hacer click

---

## Reunión 12: Proceso SAP (Gaby Cajas)

### Pantalla: Solicitudes de NC Pendientes
- **Tabla:**
  - Secuencial interno
  - Cliente
  - Plan
  - Valor
  - Fecha solicitud
  - Estado
- **Checkbox** para selección múltiple
- **Botones:** "Procesar Seleccionadas", "Rechazar"

### Pantalla: Generación de NC
- **Formulario automático** (pre-llenado):
  - Cliente (KIFATEX - fijo)
  - Interlocutor (dropdown)
  - Productos (tabla)
  - Condición de descuento (dropdown)
  - Motivo de rechazo (auto-asignado)
- **Preview** de NC antes de generar
- **Botón:** "Generar NC en SAP"

### Pantalla: Reporte de NC Generadas
- **Tabla:**
  - Secuencial
  - Orden SAP (600XXX)
  - NC SAP (900XXX)
  - Cliente
  - Valor
- **Botón:** "Descargar PDF", "Enviar Email"

---

## Reunión 13: Integración SAP (Peter)

### Decisiones de Diseño
- **NO usar plantilla TXT** (proceso automático)
- **Interfaz de aprobación** para Gaby
- **Notificaciones automáticas** por email
- **Log de facturas** usadas como referencia

### Elementos Técnicos
- **Indicador de conexión** con SAP
- **Mensajes de error** claros y accionables
- **Confirmación** antes de acciones irreversibles

---

## Reunión 14: Evaluación de Promociones (Rosita)

### Pantalla: Selección de Evaluación
- **Dropdown:** "Promoción a evaluar" (lista de bitácora)
- **Datos de cabecera** (solo lectura):
  - Nombre promoción
  - Mecánica
  - Vigencia
  - Productos
  - Clientes

### Pantalla: Configuración de Períodos
- **Date pickers editables:**
  - Período de análisis (inicio - fin)
  - Período comparativo (inicio - fin)
- **Sugerencias:** "YTD", "Trimestre anterior", "Mismo período año anterior"

### Pantalla: Reporte de Evaluación
- **Tabs:**
  1. Resumen Ejecutivo
  2. Detalle por Producto
  3. Detalle por Cliente

**Tab 1: Resumen**
- **Cards con métricas:**
  - Crecimiento unidades (% y valor absoluto)
  - Crecimiento ventas
  - Crecimiento margen
  - % NC vs Ventas
- **Comparativa:** Total clientes vs Solo participantes
- **Indicador visual:** ✓ Cumplió objetivo / ✗ No cumplió

**Tab 2: Por Producto**
- **Tabla:**
  - Producto
  - Unidades Ant/Act/Var%
  - Ventas Ant/Act/Var%
  - Margen Ant/Act/Var%
- **Ordenamiento** por columnas
- **Exportar** a Excel

**Tab 3: Por Cliente**
- **Tabla similar** agrupada por cliente
- **Drill-down:** Click en cliente → ver productos

### Elementos Visuales
- **Gráficos de barras** comparativas (opcional Fase 2)
- **Colores:** Verde (crecimiento), Rojo (decrecimiento)
- **Iconos:** ↑ ↓ para tendencias

---

## Reunión 15: Provisiones Contables (Willy)

### Pantalla: Reporte de Provisiones
- **Generación automática** al final de mes
- **Tabla:**
  - Código material
  - Valor provisión
  - Cliente (KIFATEX)
  - Base jerarquía
  - Org ventas (S10)
  - Canal (01)
- **Botón:** "Descargar Template para SAP"
- **Estado:** Pendiente, Procesado

### Notificación a Contabilidad
- **Email automático** a William
- **Cambio de estado** cuando procesa
- **Notificación** a interlocutores

---

## Reunión 16: Diseño Interfaz NC (Peter)

### Pantalla: Liquidaciones Pendientes (CLAVE)
```
┌─────────────────────────────────────────────────────┐
│ Liquidaciones Pendientes de Procesar               │
├─────────────────────────────────────────────────────┤
│ [✓] Secuencial | Cliente | Plan | Valor | Factura │
│ [ ] NC-2025-01 | GPF     | PMC  | $5K   | 001-... │
│ [ ] NC-2025-02 | Difar   | Cup  | $3K   | 001-... │
│ [ ] NC-2025-03 | FarmaE  | Reb  | $2K   | 001-... │
├─────────────────────────────────────────────────────┤
│ [Seleccionar Todas] [Procesar] [Rechazar]          │
└─────────────────────────────────────────────────────┘
```

### Elementos de Diseño
- **Checkbox** en cada fila
- **Botón "Seleccionar Todas"**
- **Botones de acción** destacados
- **Factura de referencia** visible
- **Tooltip** con detalle completo

### Pantalla: Resultado de Procesamiento
- **Modal o página nueva**
- **Tabla de resultados:**
  - Secuencial
  - Orden SAP
  - NC SAP
  - Estado (Exitoso/Error)
- **Botón:** "Cerrar", "Descargar Reporte"

---

## Reunión 17: Cierre y Consolidación

### Pantalla: Bitácora de NC
- **Tabla histórica:**
  - Año
  - Plan
  - Cliente
  - Productos
  - Unidades
  - Valores
  - NC Bagó
  - NC Kifatex
  - Estado
- **Filtros:** Por año, plan, cliente, estado
- **Búsqueda** por número de NC
- **Exportar** histórico

### Pantalla: Conciliaciones
- **Tabs:**
  1. Ventas vs NC
  2. Provisiones vs NC
  3. NC Bagó vs NC Kifatex
- **Tabla comparativa** con diferencias resaltadas
- **Acciones:** Marcar como conciliado, Reportar diferencia

---

## Elementos de Diseño Transversales

### Componentes Comunes
1. **Navbar:** Logo, Usuario, Notificaciones, Logout
2. **Sidebar:** Menú de módulos colapsable
3. **Breadcrumbs:** Navegación contextual
4. **Footer:** Versión, Soporte, Ayuda

### Estados Visuales
- **Pendiente:** Amarillo/Naranja
- **Aprobado:** Verde
- **Rechazado:** Rojo
- **En Proceso:** Azul
- **Completado:** Verde oscuro

### Acciones Comunes
- **Botones primarios:** Azul (#007bff)
- **Botones secundarios:** Gris (#6c757d)
- **Botones de peligro:** Rojo (#dc3545)
- **Botones de éxito:** Verde (#28a745)

### Tablas
- **Paginación:** 10, 25, 50, 100 registros
- **Búsqueda global**
- **Filtros por columna**
- **Ordenamiento** (click en header)
- **Acciones** en última columna (iconos)

### Formularios
- **Labels** claros y concisos
- **Placeholders** con ejemplos
- **Validaciones** en tiempo real
- **Mensajes de error** debajo del campo
- **Campos requeridos** con asterisco (*)

### Notificaciones
- **Toast** para acciones exitosas (esquina superior derecha)
- **Alertas** para advertencias (parte superior de página)
- **Modales** para confirmaciones
- **Badges** para contadores

---

## Prioridades para Mockups

### Fase 1 (MVP)
1. ✅ Carga de archivos PMC
2. ✅ Validación InnovaSer
3. ✅ Liquidación PMC
4. ✅ Solicitudes de NC pendientes
5. ✅ Generación de NC

### Fase 2
6. Cupones (todos los subcódigos)
7. Rebates
8. Semana de Descuentos
9. Evaluaciones de promociones
10. Provisiones

### Fase 3
11. OII
12. Conciliaciones
13. Bitácora histórica
14. Reportes avanzados

---

## Notas Importantes

- **Responsive:** Diseñar para desktop primero (usuarios trabajan en oficina)
- **Accesibilidad:** Contraste adecuado, tamaños de fuente legibles
- **Consistencia:** Usar mismo patrón de diseño en todos los módulos
- **Feedback visual:** Siempre confirmar acciones del usuario
- **Carga de datos:** Mostrar spinners/skeletons mientras carga
- **Errores:** Mensajes claros y accionables, nunca técnicos

---

**Documento creado para:** Jonnathan Suasnavas  
**Fecha:** 23 de diciembre de 2025  
**Basado en:** 17 transcripciones de reuniones del proyecto
