# Transcripciones de Reuniones - Sistema de Liquidación de Promociones

---

## Transcripción 1/17 - Reunión de Levantamiento de Requerimientos

**Fecha:** No especificada  
**Participantes:** Equipo de Auditoría (María Augusta "Magus", Rosita), Equipo de TI (Cintia, Orlando "Orly", Peter), Gestión de Proyectos (Chris Zapata, Pablo Ochoa)

---

### Contexto del Proyecto

Este proyecto está en fase de **iniciativa** (no es proyecto aprobado aún). Se requiere:
- Levantamiento de requerimientos
- Estimación de tiempos y costos
- Aprobación de presupuesto en comité
- Alineación con pilares estratégicos de Bagó

**Metodología:** Se está implementando una nueva herramienta de gestión de proyectos que permitirá a los usuarios ver el estado de iniciativas y proyectos.

---

### Proceso de Promociones

#### 1. **Notificación Inicial**

Llega un correo desde:
- **Área de Ventas** (Morayma)
- **Área de Marketing** (Susana, CAB)
- **Área de Consumo** (Diana, Alex)

**Contenido del correo:**
- Qué promoción se aplicará
- Vigencia (fecha inicio/fin)
- Condiciones
- Farmacias/clientes aplicables
- Mecánica del descuento

---

#### 2. **Bitácora de Promociones**

**Responsables:** María Augusta (Auditoría), Rosita (Ventas/Marketing)

**Ubicación actual:** Archivo Excel en OneDrive

**Campos registrados:**
- Nombre de la promoción
- Vigencia
- Mecánica (tipo de descuento)
- Porcentaje de descuento
- Productos participantes
- Clientes participantes
- Estatus (Vigente/Finalizada)

**Datos Históricos:**
- Se mantiene información desde 2023
- Es acumulativa (todas las promociones en un solo archivo)
- Incluye promociones finalizadas para análisis histórico

**Tipos de Promociones:**
- Cupones (anuales)
- Semanas de descuento (periódicas)
- Plan de Medicación Continua (PMC)
- Descuentos sobre precio de venta al público
- Planes acumulativos
- Cupones físicos

---

#### 3. **Recepción de Información de Farmacias**

Cada farmacia envía:
- Archivo Excel con su sell-out
- **Problema:** Cada cadena tiene formato diferente según su sistema
- Ejemplos: Farmelasto, Coxybamba tienen estructuras distintas

---

#### 4. **Revisión Manual (Proceso Actual)**

María Augusta realiza:
1. Revisa en Excel con fórmulas
2. Valida contra condiciones de la bitácora
3. Crea tabla dinámica
4. Verifica cumplimiento de mecánica
5. Registra en bitácora:
   - Unidades reconocidas
   - Valor reconocido
   - Observaciones (si hay diferencias)

---

#### 5. **Solicitud de Nota de Crédito**

**Proceso:**
1. Se envía correo a Gaby Cajas (Facturación)
2. Se especifica: valor, producto, cliente
3. Se adjunta Excel con detalle
4. Gaby genera NC y envía a Kifatex (Ivon)
5. Kifatex tiene 5 días para emitir réplica (no siempre se cumple)

**Control de Notas de Crédito:**

Archivo compartido con numeración interna que incluye:
- Número interno de control
- Código de cliente Bagó
- Código de cliente Kifatex
- Concepto
- Mes
- Fecha de solicitud
- Valor solicitado
- Número de NC emitida
- Fecha de emisión
- Valor real emitido
- Diferencias (si existen)
- Tipo de descuento (PMC, Cupones, Semana de Descuentos, Franquiciados)
- Estado (Pendiente/Emitida)

**Problema identificado:** Kifatex a veces emitía NCs con valores incorrectos o a productos/farmacias equivocadas.

**Solución implementada:** Ahora se envía siempre un Excel detallado, incluso para un solo producto.

---

### Plan de Medicación Continua (PMC)

**Sistema Actual:** InnovaSer (proveedor externo - sistema pagado con fee mensual)

#### Dos Modalidades:

**A. Grandes Cadenas (procesado por Bagó):**
1. Cadena envía archivo Excel
2. Se carga en plantilla de InnovaSer
3. Sistema valida condiciones
4. Retorna archivo con unidades a bonificar
5. Auditoría ingresa costo neto
6. Sistema calcula y notifica a Facturación

**B. Cadenas Pequeñas (procesado por InnovaSer):**
1. Bagó notifica a InnovaSer sobre nuevo cliente en PMC
2. InnovaSer contacta a la farmacia
3. Retiran facturas físicas
4. Validan factura vs Excel
5. Cargan al sistema
6. Sistema valida y procesa

**Validaciones del Sistema:**
- Identificación válida (concatenado con Registro Civil)
- No aplica para empresas (solo personas naturales)
- Cédula correctamente digitada
- Facturas no duplicadas
- Cumplimiento de condiciones de bonificación

**Mecánica PMC:**
- Productos crónicos
- Ejemplo: Compra 3 cajas → Bonifica 1 caja
- Validación de data histórica del paciente

**Notificación Automática:** El sistema envía correo a Facturación con resumen y Excel para generar NC.

---

### Análisis de Promociones

**Cuándo:** Al finalizar la promoción o por trimestre

**Objetivo:** Verificar si se cumplió la meta/objetivo de la promoción

**Métricas:**
- Total reconocido por cliente
- Total reconocido por producto
- Comparativa vs objetivo
- Análisis de participación por cadena

---

### Requerimientos del Nuevo Sistema

#### Funcionalidades Clave:

**1. Gestión de Clientes** (Implícito)
- Catálogo de clientes Bagó
- Catálogo de clientes Kifatex
- Mapeo entre códigos

**2. Creación de Promociones**
- Formulario web (reemplaza correo electrónico)
- Campos:
  - Nombre de promoción
  - Vigencia (fecha inicio/fin)
  - Mecánica/Tipo
  - Porcentaje de descuento
  - Productos participantes
  - Clientes participantes
  - Condiciones específicas
- Notificación automática a Auditoría
- Usuarios: Ventas (Rosita), Marketing (Susana, CAB), Consumo (Diana, Alex)

**3. Portal para Farmacias** (Nuevo)
- Carga de archivos sell-out
- Validación de formato
- Validación contra SRI (facturas válidas)
- Reemplaza proceso de InnovaSer para cadenas pequeñas
- **Beneficio:** Elimina dependencia de proveedor externo
- **Beneficio:** Farmacias cargan info directamente (no envían copias físicas)

**4. Procesamiento y Validación**
- Lectura flexible de archivos Excel (columnas pueden variar)
- Plantilla configurable
- Validaciones automáticas según mecánica
- Cálculo de unidades/valores a reconocer
- Generación de observaciones

**5. Gestión de Notas de Crédito**
- Control de solicitudes
- Numeración interna
- Seguimiento de estado
- Alertas de pendientes
- Conciliación Bagó vs Kifatex

**6. Integración con InnovaSer** (Temporal)
- Consumo de API o base de datos
- Migración gradual de funcionalidad
- Objetivo: Independencia total del proveedor

**7. Reportes y Análisis**
- Dashboard de promociones vigentes
- Análisis por trimestre
- Histórico de promociones
- Métricas de cumplimiento

---

### Consideraciones Técnicas

**Seguridad:**
- **Acceso:** Solo usuarios Bagó (información estratégica confidencial)
- **Roles:** Ventas, Marketing, Auditoría, Facturación
- **Portal Externo:** Farmacias (solo carga de datos)

**Datos Históricos:**
- Cargar información desde 2023
- Mantener trazabilidad de promociones finalizadas
- Conservar histórico de NCs emitidas

**Integraciones:**
- **Kifatex:** Generación de NCs
- **SRI:** Validación de facturas
- **InnovaSer:** Consumo de datos (fase 1), reemplazo total (fase 2)
- **Registro Civil:** Validación de cédulas

**Validaciones Críticas:**
- Identificación válida
- Facturas no duplicadas
- Cumplimiento de mecánica
- Productos correctos
- Clientes correctos
- Períodos de vigencia

---

### Próximos Pasos Definidos

1. Reunión de 2 horas (miércoles 16, 2:00 PM) para profundizar
2. Definir alcance completo incluyendo portal de farmacias
3. Reunión con InnovaSer para definir API/integración
4. Validar costos con Chris Zapata
5. Presentar prototipos al equipo
6. Mostrar sistema de descuentos como referencia

---

### Notas Importantes

- **Título del Proyecto:** Cambiar de "Liquidación de Descuentos" a "Liquidación de Promociones"
- **Diferencia clave:** Descuentos ≠ Promociones (son procesos distintos)
- **Oportunidad:** Eliminar fee mensual a InnovaSer desarrollando funcionalidad propia
- **Reto:** Manejar múltiples formatos de archivos de farmacias
- **Visión:** Sistema autónomo sin dependencias externas

---

## Transcripción 2/17 - Reunión Detallada de Historias de Usuario

**Fecha:** No especificada  
**Participantes:** Rosita, María Augusta (Magus), Cintia, Orlando (Orly), Marixa

---

### Resumen de Temas Principales

#### 1. Flujo de Creación de Promociones

**Proceso tiene 3 versiones:**
- **Propuesta** → Análisis inicial preparado por el área
- **Aprobada** → Versión revisada y modificada por gerencia
- **Socializada** → Versión final comunicada para implementación

**Sistema debe registrar:** Versión APROBADA (no la propuesta inicial)

**Modificaciones posibles por gerencia:**
- Porcentajes de descuento
- Duración de la promoción
- Clientes participantes
- Mecánica de aplicación

**Ejemplo:**
- Propuesta: 10 clientes, 10% descuento, 3 meses
- Aprobado: 5 clientes, 15% descuento, 2 meses

---

#### 2. Campos del Formulario de Registro

**Campos principales:**
- Nombre de la promoción
- Vigencia (fecha inicio/fin)
- Productos participantes
- Clientes participantes
- Tipo de promoción:
  - Descuento sobre PVP
  - 1+1 (compra uno, lleva otro)
  - Cupones
  - PMC (Plan de Medicación Continua)
- Mecánica: Descripción textual + porcentajes
- Soporte: Adjuntar archivos de respaldo

**Campos editables vs parametrizados:**
- Mecánica puede ser campo de texto libre
- O campos específicos según tipo (ej: "% Bagó", "% Cliente")

---

#### 3. Catálogo Cliente-Producto

**Problema identificado:**
Cada farmacia usa códigos propios diferentes a los códigos Bagó

**Ejemplo:**
- Farmacia Farmelasto: Producto código "001"
- Bagó: Mismo producto código "1020"

**Solución propuesta:**
Tabla de mapeo: `Cliente → Código Cliente → Código Bagó`

**Opciones de carga:**
1. **Individual:** Seleccionar cliente, producto Bagó, ingresar código del cliente
2. **Masiva:** Cargar archivo Excel con formato:
   - Cliente
   - Código Cliente
   - Código Producto Bagó
   - Nombre Producto

**Actualización:**
- No borra registros existentes
- Solo actualiza y agrega nuevos
- Permite correcciones sin perder información histórica

---

#### 4. Recepción de Información

**Situación actual:**
- Correos dispersos a diferentes personas (Magus, Rosita, supervisores)
- Falta de centralización
- Información puede perderse

**Propuesta:**
- **Opción A:** Correo único `promociones@bago.com`
  - Manejado por área de Auditoría
  - Repositorio centralizado
  - Usuarios descargan archivos para procesamiento

- **Opción B:** Portal web para carga directa (ideal)
  - Clientes/supervisores cargan información directamente
  - Elimina envío de correos
  - Validación inmediata

**Decisión:** Crear correo específico para promociones como paso inicial

---

#### 5. Plantillas y Formatos

**Desafío:**
Cada cliente envía formato diferente según su sistema

**Ejemplos:**
- Farmelasto: Formato A con columnas X, Y, Z
- Coxybamba: Formato B con columnas A, B, C
- GPF: Formato C con información mezclada

**Estrategia propuesta:**

**Opción 1: Formato único obligatorio**
- Solicitar a todos los clientes que se adapten
- Precedente: Kifatex aceptó cambiar formato en proyecto de descuentos
- Facilita procesamiento automático

**Opción 2: Plantillas parametrizadas**
- Sistema reconoce diferentes formatos
- Lee por nombre de columna (no por posición)
- Auditoría descarga, clasifica y carga en plantilla del sistema

**Opción 3: Portal para farmacias**
- Farmacias cargan información directamente
- Sistema valida formato automáticamente
- Elimina intermediarios

---

#### 6. Validaciones por Tipo de Promoción

**PMC (Plan de Medicación Continua):**
- Cédula válida (10 dígitos)
- Persona natural (no empresas)
- Cantidad mínima cumplida
- Producto correcto
- Fecha dentro de vigencia

**Cupones:**
- Número válido y registrado
- No usado previamente
- Vigente en fecha de venta
- Producto coincide con cupón

**Descuentos sobre PVP:**
- Precio ≤ PVP vigente
- Porcentaje correcto aplicado
- Cliente participante

**1+1:**
- Unidades correctas
- Presentación adecuada (cajas completas vs comprimidos)

---

#### 7. Escenarios de Liquidación

**Escenario 1: Cumplimiento total**
- Cliente cumple todas las condiciones
- Sistema bonifica/descuenta según mecánica
- Sin observaciones

**Escenario 2: Cumplimiento parcial**
- Cliente cumple parcialmente
- Sistema bonifica proporcionalmente
- Genera observación explicativa

**Escenario 3: Presentación incorrecta**
- Ejemplo: Promoción para cajas completas, cliente compró comprimidos sueltos
- Sistema rechaza bonificación
- Genera observación: "Promoción solo aplica para cajas completas"

**Escenario 4: Producto no relacionado**
- Producto no está en catálogo de relaciones
- Sistema alerta para agregar relación
- Auditoría decide si procede

---

#### 8. Integración con Kifatex

**Propósito:**
- Consultar ventas para evaluación de promociones
- Comparar períodos (antes vs durante promoción)

**Consideraciones técnicas:**
- Períodos flexibles (no solo mes/trimestre)
- Ejemplo: 1 enero - 15 abril 2025 vs mismo período 2024
- **Cuidado:** ~320,000 registros/mes
- Riesgo de sobrecarga si se consultan múltiples períodos

**Solución:**
- Limitar consultas a clientes específicos (no todos)
- Usar datos agregados (totales, no transacciones individuales)
- Optimizar rendimiento

---

#### 9. Proceso de Validación y Carga

**Flujo propuesto:**

1. **Descarga de información**
   - Usuario descarga archivos de correo/portal
   - Clasifica por tipo de promoción

2. **Carga en plantilla**
   - Campos requeridos según tipo
   - Sistema valida formato

3. **Validaciones automáticas**
   - Cliente existe
   - Producto existe
   - Relación cliente-producto existe
   - Fechas dentro de vigencia
   - Condiciones de mecánica

4. **Procesamiento**
   - Sistema calcula bonificaciones/descuentos
   - Genera observaciones si hay diferencias
   - Presenta resumen para aprobación

5. **Generación de NC**
   - Usuario aprueba liquidación
   - Sistema envía correo a Facturación
   - Se registra en control de NCs

---

### Decisiones Clave

**1. Repositorio centralizado obligatorio**
- Correo específico `promociones@bago.com`
- Manejado por Auditoría
- Todos los stakeholders envían información ahí

**2. Catálogo de relaciones prerequisito**
- Debe cargarse antes de procesar liquidaciones
- Carga masiva inicial + actualizaciones incrementales
- Permite identificar productos nuevos

**3. Validaciones parametrizadas por tipo**
- Cada tipo de promoción tiene validaciones específicas
- Sistema aplica validaciones según tipo seleccionado
- Escenarios documentados para cada caso

**4. Escenarios documentados**
- Todos los casos posibles deben estar en historias de usuario
- Incluir ejemplos reales de archivos
- Especificar qué hace el sistema en cada caso

**5. Flexibilidad de formatos**
- Sistema lee por nombre de columna (no posición)
- Permite cambios en orden de columnas
- Plantillas configurables por cliente si es necesario

---

### Próximos Pasos Acordados

1. **Reunión 3 horas (29 marzo)**
   - Profundizar en cada tipo de promoción
   - Revisar ejemplos reales de archivos
   - Documentar todos los escenarios

2. **Magus:** Completar historias de usuario con ejemplos reales

3. **Orly/Mari/Rosita:** Caso GPF separado (requiere análisis específico)

4. **Cintia:** Estimación de tiempos y costos

5. **Equipo:** Mostrar sistema de descuentos como referencia

---

### Notas Importantes

- **Versión a registrar:** Aprobada (no propuesta)
- **Catálogo crítico:** Cliente-Producto-Código
- **Formatos variables:** Cada farmacia tiene su sistema
- **Validaciones específicas:** Según tipo de promoción
- **Escenarios múltiples:** Documentar todos los casos posibles
- **Integración Kifatex:** Cuidado con volumen de datos
- **Portal farmacias:** Ideal a largo plazo

---

## Transcripción 3/17 - Demostración Detallada del Proceso PMC

**Fecha:** No especificada  
**Participantes:** María Augusta (Magus), Cintia, Orlando (Orly)

---

### Proceso Completo de Carga y Validación PMC

#### 1. **Recepción de Archivos**

**Fuentes:**
- Supervisores (ej: Fabián)
- Cadenas directamente (ej: Suiza)
- Por correo electrónico

**Organización:**
- Clasificación por carpetas en correo
- Separación por tipo: PMC vs Promociones vs Cupones
- Identificación visual por productos (32 presentaciones PMC conocidas)

**Problema:** Algunas cadenas mezclan PMC y promociones en un solo archivo

---

#### 2. **Carga de Respaldo (Archivo Original)**

**Historia de Usuario Identificada:**

**Como** usuario de Auditoría  
**Quiero** cargar el archivo original enviado por la cadena  
**Para** tener respaldo de la información recibida

**Campos del Formulario:**
- Cadena/Farmacia (código: ej. 8127 para Suiza)
- Archivo Excel original
- Mes y Año

**Criterios de Aceptación:**

1. **Formato de Nombre:** `NombreCadena_Mes_Año.xlsx`
   - Ejemplo: `Suiza_Marzo_2025.xlsx`

2. **Validación de Duplicados:**
   - Sistema valida por nombre de archivo
   - Si ya existe: Muestra alerta "Este documento ya fue cargado"
   - No permite duplicados

3. **Eliminación:**
   - Usuario NO puede eliminar directamente
   - Debe solicitar al administrador/proveedor
   - Permite recargar en caso de error

4. **Formato Aceptado:** Solo Excel (.xlsx)

---

#### 3. **Descarga y Preparación de Plantilla**

**Proceso:**
1. Usuario descarga plantilla del sistema
2. Plantilla contiene campos predefinidos
3. Usuario copia datos del archivo original a la plantilla
4. Realiza depuraciones manuales

**Campos de la Plantilla PMC:**

| Campo | Descripción | Validaciones |
|-------|-------------|--------------|
| Código Cadena Kifatex | Ej: 8127 | Obligatorio |
| Código Cadena Bagó | Código interno | Obligatorio |
| Nombre Farmacia | Texto | Debe coincidir con código |
| Número Factura | Alfanumérico | Obligatorio |
| Fecha Factura | DD/MM/YYYY | Formato corto obligatorio |
| Código Producto | Del cliente | Debe existir en catálogo |
| Cantidad Compra | Numérico | > 0 |
| Cantidad Bonificación | Numérico | Calculado por sistema |
| Identificación Paciente | Cédula/RUC/Código | Ver validaciones especiales |
| Nombre Paciente | Texto | Opcional (algunas cadenas no envían) |
| Precio Negociado | Decimal | Opcional |
| Autorizar | Sí/No | Obligatorio |

---

#### 4. **Validaciones Críticas de Identificación**

**Tipos de Identificación Aceptados:**

**A. Cédula (10 dígitos):**
- Formato: Solo números
- Validación: 10 dígitos exactos
- Ejemplo: 1234567890

**B. RUC Persona Natural (13 dígitos):**
- Formato: Solo números
- Validación: 13 dígitos exactos
- **Regla especial:** Tercer dígito ≠ 9 (si es 9 = empresa)
- Ejemplo: 1234567890001

**C. RUC Empresa (13 dígitos):**
- **NO VÁLIDO para PMC**
- Tercer dígito = 9
- Sistema rechaza automáticamente

**D. Código Alfanumérico (Protección de Datos):**
- Formato: P + números
- Longitud mínima: 7 caracteres
- Ejemplo: P1234567
- **Razón:** Ley de protección de datos personales

**E. Identificación Genérica:**
- 9999 o 99999999 = **NO VÁLIDO**
- Sistema rechaza (no es paciente identificable)

**Validaciones del Sistema:**

1. **Longitud:**
   - Cédula: Exactamente 10 dígitos
   - RUC: Exactamente 13 dígitos
   - Alfanumérico: Mínimo 7 caracteres con P inicial

2. **Tipo de Persona:**
   - Si RUC y tercer dígito = 9 → Empresa → **RECHAZAR**
   - Si RUC y tercer dígito ≠ 9 → Persona Natural → **ACEPTAR**

3. **Validación SRI (Propuesta):**
   - Consumir API del SRI
   - Verificar si identificación es válida
   - Obtener tipo de contribuyente
   - **Beneficio:** Automatiza validación manual actual
   - **Costo:** Requiere presupuesto para API

4. **Casos Especiales:**
   - Algunas cadenas envían solo 9 dígitos (falta 0 inicial)
   - Sistema debe detectar y alertar
   - Auditoría corrige manualmente

---

#### 5. **Validaciones de Formato de Archivo**

**Validación 1: Código y Nombre de Cadena**
- Al cargar plantilla, sistema valida:
  - Código ingresado = Código en archivo
  - Nombre ingresado = Nombre en archivo
- Si no coincide: Alerta "Código/nombre no coincide con registro"

**Validación 2: Formato de Fechas**
- **Obligatorio:** Formato corto (DD/MM/YYYY)
- **Problema:** Algunas cadenas envían formato inglés (MM/DD/YYYY)
- Si formato incorrecto: "Formato de fechas no válido"
- No permite continuar hasta corregir

**Validación 3: Número de Factura**
- Acepta alfanumérico
- Puede contener espacios o guiones
- Ejemplo: 001-001-123456

---

#### 6. **Proceso de Depuración Manual (Actual)**

**Identificación de Bonificaciones:**

Algunas cadenas envían todo mezclado (compras + bonificaciones).

**Ejemplo:**
```
Producto | Cantidad | Precio Negociado
Carvedil | 3        | 10.50
Carvedil | 1        | 0.00    ← Esta es la bonificación
```

**Regla:** Si Precio Negociado = 0 → Es bonificación

**Proceso de Magus:**
1. Identifica filas con precio = 0
2. Separa bonificaciones de compras
3. Copia solo compras a plantilla del sistema
4. Sistema calculará bonificaciones automáticamente

---

#### 7. **Catálogo de Productos PMC**

**Archivo de Referencia:**
- Lista de 32 presentaciones PMC
- Incluye:
  - Nombre como aparece en archivos de cada cadena
  - Código Bagó correspondiente
  - Condiciones de bonificación

**Ejemplo:**
```
Cadena: Suiza
Producto en archivo: "CARVEDIL 6.25MG X30"
Código Bagó: BG-1020
Condición: 3 cajas → 1 bonificada
```

**Uso:**
- Magus usa este archivo para hacer búsquedas
- Identifica qué productos son PMC
- Obtiene código Bagó correcto

---

#### 8. **Campo "Autorizar" (Sí/No)**

**Propósito:** Indicar si el registro debe procesarse

**Valores:**
- **Sí:** No hay impedimento, procesar normalmente
- **No:** Existe impedimento, no procesar

**Casos para "No":**
- Registro sin factura física (para InnovaSer)
- Información detectada como incorrecta en revisión
- Identificación inválida

**Uso Actual:**
- Magus siempre pone "Sí" (solo maneja archivos digitales)
- InnovaSer usa "No" cuando falta factura física

---

#### 9. **Carga al Sistema InnovaSer**

**Pasos:**
1. Guardar plantilla completada con formato: `Cadena_Mes_Año.xlsx`
2. Ir al sistema InnovaSer
3. Menú → Opciones → Cargar Archivos
4. Seleccionar cadena (código)
5. Seleccionar archivo
6. Sistema procesa y muestra validaciones

**Validaciones en Tiempo Real:**
- Identificaciones inválidas
- Formatos incorrectos
- Duplicados
- Productos no reconocidos

---

#### 10. **Observaciones y Correcciones**

**Identificaciones Inválidas:**

Sistema genera lista de identificaciones que no pasaron validación.

**Proceso de Corrección:**
1. Descargar lista de identificaciones inválidas
2. Consultar manualmente en SRI (RUC)
3. Identificar si son:
   - Personas naturales (profesionales) → **ACEPTAR**
   - Empresas/farmacias → **RECHAZAR**
4. Para las válidas:
   - Ir a "Compras y Edición"
   - Descargar archivo de identificaciones
   - Marcar como válidas
   - Cargar archivo actualizado
5. Para las inválidas:
   - Eliminar registro completo
   - Recargar archivo sin esos registros

**Problema Actual:**
- Proceso manual muy tedioso
- Requiere validar RUC por RUC en SRI
- Doble carga (eliminar y volver a cargar)

**Solución Propuesta:**
- Integración con API SRI
- Validación automática en tiempo de carga
- Evita doble trabajo

---

### Requerimientos del Nuevo Sistema

#### 1. **Gestión de Archivos**
- Carga de respaldo (original)
- Validación de duplicados por nombre
- No permitir eliminación directa
- Trazabilidad de quién cargó qué

#### 2. **Plantilla Configurable**
- Campos predefinidos pero editables
- Validaciones en tiempo real
- Formato de fechas estricto
- Validación de códigos de cadena

#### 3. **Validación de Identificaciones**
- Longitud correcta (10 o 13 dígitos)
- Formato alfanumérico con P
- Validación de tercer dígito (RUC)
- **Ideal:** Integración API SRI

#### 4. **Catálogo de Productos**
- Mapeo Cadena-Producto-Bagó
- Condiciones de bonificación por producto
- Actualización flexible

#### 5. **Procesamiento Automático**
- Cálculo de bonificaciones
- Detección de registros duplicados
- Generación de observaciones
- Lista de identificaciones inválidas

#### 6. **Corrección de Errores**
- Edición de identificaciones
- Marcado manual de válidas/inválidas
- Recarga sin eliminar todo

---

### Notas Técnicas Importantes

- **Cada cadena es un mundo:** Formatos completamente diferentes
- **Protección de datos:** Códigos alfanuméricos en lugar de cédulas
- **Validación SRI:** Costo adicional pero ahorra mucho tiempo
- **Doble trabajo actual:** Eliminar y recargar por cada corrección
- **32 presentaciones PMC:** Lista fija de productos crónicos
- **Precio = 0:** Indicador de bonificación en archivos mezclados

---

### Decisión Pendiente

**Integración API SRI:**
- Requiere validar presupuesto
- Consultar con Orlando sobre viabilidad
- Precedente: Ya se usa en otros sistemas Bagó
- Beneficio: Elimina validación manual de RUCs

---

## Transcripción 4/17 - Proceso Completo de Liquidación PMC y Cupones

**Fecha:** No especificada  
**Participantes:** María Augusta (Magus), Cintia, Orlando (Orly), Marixa, Rosita

---

### Proceso de Validación y Liquidación PMC

#### 1. **Comparación: Solicitud vs Sistema**

**Objetivo:** Verificar que las bonificaciones calculadas por el sistema coincidan con lo solicitado por la cadena.

**Archivos Involucrados:**

**A. Archivo Original de la Cadena:**
- Ejemplo: Suiza envía 2 archivos Excel:
  - `Total PMC`: Solo bonificaciones en cajas y valores
  - `PMC`: Detalle completo de cada compra por paciente

**B. Archivo de Resumen (creado por Magus):**
- Nombre: `Resumen_Suiza_Marzo_2025.xlsx`
- Contiene:
  - Productos participantes (30 productos para Suiza)
  - Unidades solicitadas por cadena
  - Valor solicitado
  - Conversión comprimidos → cajas

**Ejemplo de Conversión:**
```
Carvedil: 3,286 comprimidos ÷ 30 comprimidos/caja = 109.53 cajas
Total: 151 cajas solicitadas
Valor: $3,286.34
```

---

#### 2. **Productos PMC por Cadena**

**Concepto Clave:** Cada cadena firma convenio inicial con productos específicos.

**Características:**
- Total productos PMC disponibles: 31 presentaciones
- Cada cadena elige cuáles participan
- Ejemplo Suiza: 30 productos (falta Tolva)
- Convenio especifica:
  - Productos incluidos
  - Condiciones de bonificación
  - Fecha de inicio

**Proceso Inicial:**
1. Cadena firma convenio
2. Se envía correo a proveedor (InnovaSer)
3. Se especifica: Farmacia, productos, condiciones, fecha inicio
4. Se activa en sistema

---

#### 3. **Validación de Diferencias**

**Historia de Usuario Identificada:**

**Como** usuario de Auditoría  
**Quiero** comparar bonificaciones solicitadas vs calculadas por sistema  
**Para** identificar y resolver diferencias antes de emitir NC

**Proceso:**

1. **Descarga información del sistema**
   - Archivo: `Liquidacion_12530.xlsx`
   - Contiene cálculos automáticos del sistema

2. **Copia a archivo de resumen**
   - Pega en hoja "Liquidación 12530"
   - Incluye hoja de "Pacientes" con detalle

3. **Comparación automática con fórmulas**
   - Cadena solicita: 151 cajas
   - Sistema calcula: 152 cajas
   - **Diferencia:** 1 caja

4. **Identificación de la diferencia**
   - Producto: GlisenX CR 1000
   - Sistema: 8 cajas
   - Cadena solicita: 7 cajas
   - **Acción:** Ajustar a 7 cajas (lo solicitado)

**Criterios de Aceptación:**

1. Sistema debe mostrar comparativa:
   - Unidades solicitadas por cadena/farmacia
   - Unidades calculadas por sistema
   - Diferencias resaltadas

2. Si existe diferencia:
   - Permitir ajuste manual
   - Generar observación obligatoria
   - Registrar motivo del ajuste

---

#### 4. **Cálculo de Costo a Reconocer**

**Fuente de Datos:** Base de ventas Kifatex

**Proceso Actual (Manual):**
1. Acceder a carpeta compartida "Query"
2. Abrir reporte de ventas Kifatex
3. Filtrar por:
   - Cliente (código cadena)
   - Mes (marzo 2025)
   - Motivo de NC (excluir devoluciones, productos en mal estado, etc.)
4. Obtener precio neto por producto
5. Calcular: `Cajas bonificadas × Precio neto = Total a reconocer`

**Ejemplo:**
```
151 cajas × $21.73 = $3,281.40
Diferencia con solicitud ($3,286.34): $4.94 (por decimales)
```

**Propuesta para Nuevo Sistema:**
- Consumir directamente base de ventas Kifatex
- Integración con sistema de descuentos existente
- Cálculo automático considerando:
  - Precio neto Kifatex
  - Descuentos aplicables
  - Fórmula: Precio - Tabla de descuentos - 5.85% (fee adicional)

**Validación Adicional:**
- Comparar costo solicitado por cadena vs costo calculado
- **Regla:** Tomar el **menor costo**
- Generar observación si hay diferencia

---

#### 5. **Notificación para Liquidación**

**Proceso en Sistema InnovaSer:**

1. Usuario hace clic en "Notificar"
2. Sistema pregunta: "¿Desea notificar el reporte?"
3. Confirmar: "Sí"
4. Sistema muestra: "Liquidación 12530 enviada correctamente"
5. Se habilita opción "Notificar Reportes"

**Campos a Completar:**
- Número de NC (secuencial interno)
- Año
- Mes de liquidación
- Costo neto a reconocer (por producto)

**Problema Actual:**
- Si se notifica en mes incorrecto, afecta reportes
- No se puede cambiar después
- Requiere análisis manual para corregir

---

#### 6. **Control Secuencial de Notas de Crédito**

**Archivo Compartido:** Control interno entre María Augusta, Marixa y equipo

**Formato del Secuencial:**
```
Número: 001-25
Formato: [Secuencial]-[Año]

Ejemplos:
- 393-25 (año 2025)
- 885-24 (año 2024)
```

**Campos del Control:**

| Campo | Descripción | Ejemplo |
|-------|-------------|---------|
| Secuencial | Número correlativo | 393-25 |
| Fecha Solicitud | Cuándo se solicitó a Facturación | 15/04/2025 |
| Responsable | Quién procesó | María Augusta |
| Código Kifatex | Código del cliente en Kifatex | 8127 |
| Código Bagó | Código interno | 0011 |
| Nombre Cliente | Farmacia/Cadena | Suiza |
| Concepto | Tipo de promoción | PMC Marzo 2025 |
| Mes | Mes de liquidación | Marzo |
| Año | Año de liquidación | 2025 |
| Valor Solicitado | Monto solicitado a Facturación | $3,281.40 |
| NC Bagó | Número NC emitida por Bagó | 357-25 |
| Fecha Emisión Bagó | Cuándo Bagó emitió | 16/04/2025 |
| Valor Emitido Bagó | Monto en NC Bagó | $3,281.40 |
| NC Kifatex | Número NC réplica Kifatex | 8195 |
| Fecha Emisión Kifatex | Cuándo Kifatex emitió réplica | 20/04/2025 |
| Valor Emitido Kifatex | Monto en NC Kifatex | $3,281.40 |
| Documento Interno | Número interno Kifatex | 001-001-123456 |
| Serie | Serie del documento | 001-001 |
| Diferencia | Bagó vs Kifatex | $0.00 |
| Tiempo Réplica | Días entre Bagó y Kifatex | 4 días |
| Tipo Descuento | Clasificación | PMC |
| Estado | Procesada/Pendiente | Procesada |

**Propósito:**
- Control de quién procesa qué
- Evitar duplicados de secuencial
- Trazabilidad completa
- Conciliación Bagó vs Kifatex
- Análisis de tiempos de respuesta

---

#### 7. **Correo Automático a Facturación**

**Destinatario:** Gaby Cajas (Facturación Bagó)

**Asunto:** Solicitud NC - Liquidación PMC

**Contenido del Correo:**

```
Estimada Gaby,

Por favor, solicitar nota de crédito a través de Kifatex para posterior 
réplica al cliente.

Código Kifatex: 8127
Código Bagó: 0011
Nombre: Farmacia Suiza
Liquidación: PMC Marzo 2025

Detalle:
- Bonificaciones: 151 cajas
- Valor Total: $3,281.40

[Ver detalle en archivo adjunto Excel]

Gracias por su atención.
Saludos cordiales.
```

**Archivo Adjunto Excel:**
- Detalle por producto
- Código producto
- Cantidad bonificada
- Precio unitario
- Subtotal
- Total

**Razón del Excel:**
- Kifatex requiere detalle exacto
- Evita errores de producto/cliente
- Se envía incluso para 1 solo producto
- Sube a SAP para facturación

**Destinatarios en Copia:**
- Supervisores de la cadena
- Encargado de reportería de la farmacia
- Visitador a cargo
- Todos los contactos registrados en convenio inicial

---

#### 8. **Observaciones en el Correo**

**Caso:** Diferencias en bonificaciones

**Ejemplo:**
```
Estimados,

Según revisión existe diferencia de 1 unidad por valor de $30.00.
Por favor, verificar y descontar de su cuenta.

Motivo: Paciente [cédula] - Venta a entidad (no aplica PMC)

[Captura de pantalla adjunta]
```

**Motivos Comunes de Diferencias:**
- Venta a empresa (RUC con tercer dígito = 9)
- Venta a farmacia (para reventa)
- Identificación inválida
- Producto no participante
- Factura duplicada
- Fuera de vigencia

**Importancia:**
- Evidencia para conciliación de estados de cuenta
- Transparencia con la cadena
- Respaldo para auditorías

---

#### 9. **Gestión de Notificaciones por Cliente**

**Historia de Usuario Identificada:**

**Como** administrador del sistema  
**Quiero** gestionar usuarios que reciben notificaciones por cliente  
**Para** mantener actualizada la lista de contactos

**Funcionalidades:**

1. **Crear usuarios de notificación**
   - Nombre
   - Email
   - Rol (Supervisor, Visitador, Encargado Reportería)
   - Cliente/Cadena asociada

2. **Editar usuarios**
   - Actualizar email
   - Cambiar rol
   - Activar/Desactivar

3. **Deshabilitar usuarios**
   - No eliminar (mantener histórico)
   - Marcar como inactivo
   - No recibe más notificaciones

**Razón:**
- Personal cambia frecuentemente
- Supervisores rotan zonas
- Visitadores cambian de cartera
- Encargados de reportería renuncian

---

#### 10. **Proceso de Facturación (Gaby Cajas)**

**Recepción:**
1. Recibe correo de Auditoría
2. Descarga Excel adjunto
3. Verifica información

**Emisión NC Bagó:**
1. Genera NC en SAP
2. Incluye:
   - Beneficiario (farmacia)
   - Concepto (PMC + mes)
   - Detalle de productos
   - Subtotal y Total
3. Envía PDF a Auditoría
4. Envía PDF + Excel a Kifatex (Ivon)

**Validaciones de Auditoría:**
- Beneficiario correcto
- Mes correcto
- Valor correcto
- Productos correctos

**Registro en Control:**
- Número NC Bagó
- Fecha emisión
- Valor emitido

---

#### 11. **Proceso Kifatex (Réplica)**

**SLA:** 5 días hábiles (no siempre se cumple)

**Recepción:**
1. Kifatex recibe de Gaby Cajas
2. Procesa internamente
3. Emite NC réplica a farmacia

**Documento Kifatex:**
- Número NC Kifatex
- Documento Interno (8 dígitos)
- Serie (001-001)
- Beneficiario
- Detalle productos
- Subtotal y Total
- Fecha emisión

**Validaciones de Auditoría:**
- Cliente correcto
- Fecha de emisión
- Valor total = Valor solicitado
- Concepto (PMC + mes)

**Registro en Control:**
- Número NC Kifatex
- Documento Interno
- Serie
- Fecha emisión
- Valor emitido
- Diferencia (si existe)
- Tiempo de réplica (días)

---

#### 12. **Control de Diferencias**

**Reporte Automático:**

**Campos:**
- Total NCs emitidas en el período
- NCs pendientes de Kifatex
- Diferencias en valores
- Tiempo promedio de réplica

**Ejemplo:**
```
Total NCs 2025: 406
Pendientes: 5
Diferencia total: $0.00 (ideal)
Tiempo promedio réplica: 4 días
```

**Alertas:**
- Si diferencia ≠ $0.00 → Investigar
- Si pendientes > 5 días → Presionar a Kifatex
- Si diferencia > $10 → Alerta crítica

**Caso Real Mencionado:**
- NC demorada 40 días
- Requirió seguimiento constante
- Generó análisis de tiempos

---

#### 13. **Integración con SAP**

**Propuesta:** Consumir NCs directamente de SAP

**Campos a Obtener:**
- Número NC
- Fecha emisión
- Beneficiario
- Concepto
- Valor total
- Detalle de productos

**Beneficio:**
- Elimina carga manual
- Datos en tiempo real
- Reduce errores de transcripción

---

#### 14. **Lectura de PDF Kifatex**

**Desafío:** Kifatex no proporciona archivo estructurado

**Propuesta:** Inteligencia Artificial para leer PDF

**Proceso:**
1. Sistema recibe PDF de Kifatex
2. IA extrae:
   - Número NC
   - Documento Interno
   - Serie
   - Beneficiario
   - Productos
   - Valores
   - Fecha
3. Compara automáticamente con NC Bagó
4. Si hay diferencias → Alerta en rojo
5. Usuario revisa solo casos con diferencias

**Consideraciones:**
- Costo de desarrollo (días/semanas)
- Más económico que fee mensual a proveedor
- Precedente: Primer proyecto con IA en Bagó
- Requiere validar presupuesto

**Alternativa:**
- Negociar con Kifatex archivo estructurado
- Precedente: Ya aceptaron cambios en proyecto de descuentos
- Beneficio mutuo: Reduce errores

---

#### 15. **Validación de Productos**

**Problema:** Kifatex a veces emite NC con producto incorrecto

**Ejemplo Real:**
- Solicitado: Colnature
- Emitido: Otro producto

**Validación Propuesta:**

**Comparar:**
- Código producto NC Bagó vs NC Kifatex
- Nombre producto NC Bagó vs NC Kifatex

**Si no coincide:**
- Resaltar en rojo
- Generar observación
- Enviar correo a Kifatex solicitando corrección

**Proceso de Corrección:**
1. Kifatex cancela NC incorrecta
2. Emite nueva NC con mismo secuencial
3. Sistema valida nuevamente
4. Si OK → Actualiza registro
5. Si persiste error → Nueva alerta

---

### Proceso de Cupones

#### 16. **Gestión de Cupones Físicos**

**Flujo Completo:**

**A. Creación (Marketing):**
1. Análisis de ventas año anterior
2. Presentación a gerencia
3. Aprobación de presupuesto
4. Impresión de cupones físicos
5. Asignación de secuencial

**B. Distribución (Visitadores):**
1. Visitador recibe talonario de cupones
2. Ejemplo: 100 cupones para Dr. Orlando Briones
3. Visitador entrega a médico
4. Médico entrega a pacientes con receta

**C. Redención (Farmacias):**
1. Paciente presenta cupón en farmacia
2. Farmacia aplica descuento
3. Farmacia archiva cupón físico
4. Fin de mes: Recopila todos los cupones

**D. Solicitud de Reposición (Farmacia → Auditoría):**
1. Envía cupones físicos en sobre
2. Envía archivo Excel con detalle
3. Envía correo con resumen

---

#### 17. **Registro de Secuencial de Cupones**

**Historia de Usuario Identificada:**

**Como** usuario de Bodega/Logística de Marketing  
**Quiero** registrar el secuencial de cupones emitidos  
**Para** validar que cupones redimidos sean válidos

**Campos del Formulario:**
- Producto (ej: Trifamox)
- Presentación (Suspensión / Comprimidos 875mg)
- Secuencial Inicio (ej: 10001)
- Secuencial Fin (ej: 15000)
- Fecha Inicio Vigencia
- Fecha Fin Vigencia
- Valor Descuento ($10)

**Validación Automática:**
Al procesar cupón, sistema verifica:
1. Código cupón está en rango válido
2. Fecha redención dentro de vigencia
3. Cupón no usado previamente
4. Producto coincide con cupón

---

#### 18. **Anatomía del Cupón Físico**

**Elementos:**
- **Código de barras:** Identificador único
- **Producto:** Nombre y presentación
- **Valor:** Descuento en dólares
- **Vigencia:** 01/01/2025 - 31/12/2025
- **Farmacias participantes:** Lista de cadenas
- **Datos del médico:**
  - Nombre
  - Firma
  - Sello
- **Datos del paciente:**
  - Nombre (opcional)

**Ejemplo Trifamox 2025:**
- 2 presentaciones:
  - Suspensión (pediátrica)
  - Comprimidos 875mg (adultos)
- Descuento: $10
- Vigencia: Todo 2025
- Cadenas: 15 farmacias participantes

---

#### 19. **Validación Manual de Cupones (Proceso Actual)**

**Recepción:**
1. Sobre físico con cupones
2. Correo con Excel
3. Ejemplo: 26 cupones Trifamox

**Proceso de Magus:**
1. Cuenta cupones físicos
2. Separa por presentación:
   - Suspensión: 98 cupones
   - Comprimidos: 163 cupones
3. Verifica cada cupón:
   - Año vigente (2025)
   - Farmacia participante
   - Firma y sello médico
   - Código de barras legible
4. Compara con Excel de farmacia
5. Calcula: `Cupones × $10 = Total NC`
6. Ejemplo: 261 cupones × $10 = $2,610

**Excepciones:**

**Cupones año anterior:**
- **Regla general:** No se aceptan
- **Excepción:** Enero y Febrero
- **Razón:** Cupones nuevos aún no distribuidos

**Diferencias con farmacia:**
- Farmacia reporta: 39 cupones
- Físicos recibidos: 5 cupones
- **Acción:** Reconocer solo 5
- **Seguimiento:** Farmacia envía faltantes después

---

#### 20. **Propuesta: Validación Automática de Cupones**

**Reemplazo de Validación Manual:**

**Sistema debe:**
1. Leer código de barras del cupón
2. Validar contra secuencial registrado
3. Verificar vigencia
4. Verificar no duplicado
5. Calcular automáticamente NC

**Limitación Identificada:**
- Validación de firma/sello médico debe permanecer manual
- No todas las cadenas tienen registro digital de médicos
- Solo grandes cadenas con seguros médicos tienen esta info

**Solución Híbrida:**
- Validación automática: Código, vigencia, duplicados
- Validación manual: Firma, sello, farmacia participante

---

### Requerimientos del Nuevo Sistema

#### 1. **Módulo de Validación de Liquidación**
- Comparativa solicitud vs sistema
- Ajustes manuales con observaciones
- Cálculo automático de costos
- Integración con base Kifatex

#### 2. **Control Secuencial de NCs**
- Generación automática de secuencial
- Formato: `[Número]-[Año]`
- Trazabilidad completa
- Reporte de estado

#### 3. **Correos Automáticos**
- A Facturación con detalle
- A contactos de cadena (configurable)
- Con observaciones si hay diferencias
- Adjuntar Excel automáticamente

#### 4. **Gestión de Contactos por Cliente**
- CRUD de usuarios de notificación
- Activar/Desactivar (no eliminar)
- Asociación a cliente/cadena

#### 5. **Integración SAP**
- Consumir NCs emitidas
- Datos en tiempo real
- Evitar carga manual

#### 6. **Lectura de PDF Kifatex (IA)**
- Extracción automática de datos
- Comparación con NC Bagó
- Alertas de diferencias
- Validación de productos

#### 7. **Módulo de Cupones**
- Registro de secuenciales
- Validación automática de códigos
- Control de vigencias
- Detección de duplicados

---

### Decisiones Pendientes

1. **IA para PDF:** Validar presupuesto y viabilidad
2. **Negociación Kifatex:** Solicitar archivo estructurado
3. **Integración SAP:** Confirmar disponibilidad de servicio
4. **Portal Farmacias:** Definir alcance y prioridad

---

### Notas Importantes

- **Control secuencial crítico:** Evita duplicados y mantiene trazabilidad
- **Tiempo Kifatex:** 5 días SLA, pero puede llegar a 40 días
- **Diferencias frecuentes:** Productos incorrectos, valores erróneos
- **Cupones físicos:** Validación manual de firma/sello permanece
- **Enero-Febrero:** Excepción para cupones año anterior
- **Contactos cambian:** Necesario módulo de gestión

---

## Transcripción 5/17 - Proceso Detallado de Cupones y Validaciones

**Fecha:** No especificada  
**Participantes:** María Augusta (Magus), Cintia, Marixa, Rosita

---

### Contexto del Proyecto

**Estado:** Iniciativa (no proyecto aprobado aún)

**Reunión reciente con Carlita (Finanzas):**
- 2 proyectos de finanzas fueron aprobados
- Este proyecto aún está en evaluación
- Próxima reunión en 3 semanas
- Necesidad de acelerar el proceso

---

### Proceso de Cupones - Detalle Completo

#### 1. **Tipos de Cupones Activos 2025**

**A. Trifamox:**
- Descuento: $10 fijo
- Presentaciones: 2
  - Comprimidos 875mg (adultos)
  - Suspensión (pediátrica)
- Vigencia: 01/01/2025 - 31/12/2025

**B. Novo Morab:**
- Descuento: 25% sobre PVP
- Presentaciones: 2
- Vigencia: Variable (cambió en abril 2025)
- **Nota:** Precio cambió durante el año

**C. Letty:**
- Descuento: 25% sobre PVP
- Presentaciones: 6
- Vigencia: 01/01/2025 - 30/06/2025 (solo primer semestre)

---

#### 2. **Formatos de Reporte por Cadena**

**Problema Identificado:** Cada cadena envía formato diferente

**A. GPF (Grande):**
- Formato básico
- **NO incluye código de cupón**
- Campos:
  - Número de venta
  - Producto
  - Cantidad
  - Identificación de promoción interna
  - Fecha
  - Valor solicitado

**Ejemplo problema GPF:**
- Solicitan: 1.42 cajas × $10 = $14.20
- **Corrección:** Solo cajas completas → 1 caja × $10 = $10
- Diferencia: $4.20 (descuento del cliente)

**B. Difar (Grande):**
- Formato extenso
- **SÍ incluye código de cupón** ✓
- Campos:
  - Establecimiento
  - Cédula cliente
  - Número factura
  - Código producto
  - Fracción
  - Tipo
  - Precio
  - Valor calculado
  - **Código cupón**

**C. Farmenace (Grande):**
- Sistema propio con portal
- **SÍ incluye código de cupón** ✓
- Envía imagen escaneada del cupón
- Campos:
  - Código de barras
  - Serie factura
  - Fecha emisión
  - Código cupón
  - Producto
  - Presentación

**D. Cadenas Pequeñas:**
- Formato mínimo
- Solo texto/impreso
- Ejemplo: "100 cupones Trifamox suspensión"
- **NO incluyen código de cupón**

**Ejemplos mencionados:**
- Coxybamba
- San Gregorio
- Secoafarma (punto dermatológico)
- Farma Mía

---

#### 3. **Formato Estándar Propuesto**

**Campos Mínimos Requeridos:**

| Campo | Obligatorio | Descripción |
|-------|-------------|-------------|
| Fecha | Sí | Fecha de redención |
| Código Cupón | Sí | Código de barras |
| Código Producto | Sí | Código del producto |
| Descripción Producto | No | Nombre del producto |
| Cantidad | Sí | Unidades vendidas |
| Presentación | Sí | Tipo de presentación |
| % Descuento o Valor | Sí | 25% o $10 |
| PVP | Sí | Precio de venta público |
| Valor Reconocer | Calculado | Sistema calcula |

**Decisión:** Solicitar a todas las cadenas este formato mínimo

---

#### 4. **Validaciones del Sistema**

**Validación 1: Fecha de Vigencia**
- Cupón debe estar dentro del rango registrado
- Ejemplo: 01/01/2025 - 31/12/2025
- **Excepción:** Letty solo hasta 30/06/2025

**Validación 2: Código de Cupón**
- Debe estar en secuencial registrado
- Ejemplo: 10001 - 15000
- Detectar cupones año anterior

**Validación 3: Presentación**
- Producto debe coincidir con cupón
- Ejemplo: Trifamox 875mg vs Suspensión

**Validación 4: Cantidad**
- Solo cajas completas (según promoción)
- Rechazar comprimidos sueltos si aplica

**Validación 5: Precio**
- Validar contra lista de precios vigente
- **Importante:** Precios pueden cambiar durante el año
- Ejemplo: Novo Morab cambió precio en abril

**Validación 6: Duplicados**
- Mismo cupón no puede usarse dos veces
- Validar por código de cupón

---

#### 5. **Proceso de Validación Física vs Digital**

**Problema Real:**
- Farmacia reporta: 100 cupones
- Físicos recibidos: 80 cupones
- **Diferencia:** 20 cupones

**Solución Propuesta:**

**Opción A: Validación por código (ideal)**
- Sistema valida 100 códigos del reporte
- Magus ingresa: "Cupones físicos: 80"
- Sistema calcula diferencia automáticamente
- **Problema:** Requiere que todas las cadenas envíen códigos

**Opción B: Validación por cantidad (actual)**
- Magus cuenta físicos: 80
- Magus ingresa cantidad física
- Sistema ajusta valor a reconocer
- Genera observación automática

**Campos Adicionales Necesarios:**
- **Cupones Físicos:** Campo manual
- **Observaciones:** Campo de texto libre

**Cálculo Automático:**
```
Reportados: 100 cupones × $10 = $1,000
Físicos: 80 cupones × $10 = $800
Diferencia: 20 cupones × $10 = $200

Valor a reconocer: $800
Observación: "Se reconocen 80 cupones físicos de 100 reportados"
```

---

#### 6. **Portal para Farmacias (Propuesta)**

**Objetivo:** Eliminar envío por correo

**Usuarios del Portal:**
- Encargado de reportería de cada farmacia
- Cadenas grandes y pequeñas

**Funcionalidades:**

**A. Carga de Reporte:**
1. Farmacia accede al portal
2. Selecciona tipo de cupón
3. Carga archivo Excel (formato estándar)
4. Carga respaldo (PDF/imágenes de cupones)
5. Sistema valida formato
6. Sistema procesa automáticamente

**B. Notificación a Auditoría:**
1. Sistema envía correo a Magus
2. Magus revisa validaciones
3. Magus ingresa cupones físicos
4. Sistema calcula diferencias
5. Magus aprueba liquidación

**Alternativa (si portal no es viable):**
- Correo único: `promociones@bago.com`
- Magus descarga archivos
- Magus carga al sistema manualmente

---

#### 7. **Validación de Cupones Año Anterior**

**Problema Frecuente:**
- Farmacias reciben cupones 2024 en 2025
- Dependiente no se da cuenta
- Aplica descuento con cupón vencido

**Validación del Sistema:**
- Comparar año del cupón vs año actual
- Rechazar automáticamente
- Generar alerta

**Excepción (Enero-Febrero):**
- Cupones año anterior SÍ se aceptan
- Razón: Cupones nuevos aún no distribuidos
- Validación especial en sistema

---

#### 8. **Validación de Precios Variables**

**Caso Real: Novo Morab**
- Enero-Marzo 2025: Precio A
- Abril-Diciembre 2025: Precio B

**Solución:**
- Consumir lista de precios vigente
- Validar precio según fecha de factura
- Aplicar descuento sobre precio correcto

**Integración:**
- Sistema de descuentos ya tiene lista de precios
- Consumir mismo servicio
- Actualización automática

---

#### 9. **Correo a Facturación (Cupones)**

**Destinatario:** Gaby Cajas

**Asunto:** Solicitud NC - Cupones [Producto] [Mes]

**Contenido:**
```
Estimada Gaby,

Por favor proceder con nota de crédito por valor de $1,740.00
correspondiente al mes de Diciembre 2025.

Producto: Trifamox
Presentación: Suspensión + Comprimidos 875mg
Cadena: Coxybamba
Cupones físicos: 174

Detalle:
- Suspensión: 100 cupones × $10 = $1,000
- Comprimidos: 74 cupones × $10 = $740
Total: $1,740

[Ver archivo adjunto Excel]

Saludos cordiales.
```

**Destinatarios en Copia:**
- Supervisor de la cadena
- Encargado de reportería
- Visitador (si aplica)

---

#### 10. **Control Secuencial (Cupones)**

**Mismo formato que PMC:**
- Secuencial: 001-25
- Responsable: María Augusta
- Código Kifatex
- Código Bagó
- Nombre Cliente
- Concepto: "Cupones Trifamox Diciembre 2025"
- Mes y Año
- Valor solicitado
- NC Bagó
- NC Kifatex
- Diferencias
- Estado

---

### Semana de Descuentos

#### 11. **Características de Semana de Descuentos**

**Variabilidad:**
- Duración: Días, semanas, meses o todo el año
- Ejemplos:
  - 1 mes específico
  - 3 meses consecutivos
  - Todo el año
  - Solo días específicos

**Decisión:** Área de Ventas y Marketing

**Proceso Inicial:**
1. Rosita recibe notificación de Ventas/Marketing
2. Rosita completa formulario en sistema
3. Especifica:
   - Producto(s)
   - Vigencia (fecha inicio/fin)
   - Condiciones
   - Tipo de descuento (compartido, solo Bagó, etc.)
   - Clientes participantes

**Ejemplo Actual:**
- **Bagó Bixolar:** Promoción vigente
- Múltiples productos
- Diferentes condiciones por producto

---

#### 12. **Bitácora de Promociones Vigentes**

**Archivo Actual:** Excel compartido

**Información Registrada:**
- Nombre promoción
- Vigencia
- Mecánica
- Productos
- Clientes
- Estatus (Vigente/Finalizada)

**Ejemplo Mencionado:**
- **Lusca:** 01/03/2025 - 31/12/2025

**Proceso:**
1. Rosita registra en bitácora
2. Magus consulta bitácora
3. Magus valida contra reportes de farmacias
4. Magus liquida según condiciones

---

### Requerimientos del Nuevo Sistema

#### 1. **Módulo de Cupones**

**Historia de Usuario:**

**Como** usuario de Auditoría  
**Quiero** validar cupones reportados vs físicos  
**Para** reconocer solo cupones válidos

**Campos del Formulario de Carga:**
- Archivo Excel (formato estándar)
- Respaldo (opcional: PDF/imágenes)
- Cupones físicos (manual)
- Observaciones

**Validaciones Automáticas:**
- Fecha vigencia
- Código en secuencial
- Presentación correcta
- Precio vigente
- No duplicados
- Año correcto

**Cálculos Automáticos:**
- Valor reportado
- Valor físico
- Diferencia
- Valor a reconocer

#### 2. **Portal para Farmacias**

**Usuarios:**
- Encargados de reportería
- Por cadena/farmacia

**Funcionalidades:**
- Login seguro
- Carga de archivos
- Carga de respaldos
- Validación de formato
- Confirmación de carga

**Notificaciones:**
- A Auditoría cuando se carga
- A farmacia cuando se procesa

#### 3. **Gestión de Precios**

**Integración:**
- Consumir lista de precios existente
- Validar precio por fecha
- Aplicar descuento correcto

**Consideración:**
- Precios pueden cambiar durante vigencia de cupón
- Validar precio según fecha de factura

#### 4. **Formato Estándar de Reporte**

**Campos Obligatorios:**
- Fecha
- Código Cupón
- Código Producto
- Cantidad
- Presentación
- % o Valor Descuento
- PVP

**Validación de Formato:**
- Sistema valida columnas requeridas
- Rechaza si falta información crítica
- Genera reporte de errores

---

### Decisiones Clave

1. **Formato Estándar Obligatorio:**
   - Solicitar a todas las cadenas
   - Incluir código de cupón
   - Facilita validación automática

2. **Portal vs Correo:**
   - Ideal: Portal para farmacias
   - Alternativa: Correo único `promociones@bago.com`
   - Magus carga manualmente

3. **Validación Física Permanece:**
   - Campo manual "Cupones Físicos"
   - Sistema calcula diferencias
   - Genera observaciones automáticas

4. **Integración con Precios:**
   - Consumir lista de precios vigente
   - Validar según fecha de factura
   - Considerar cambios durante el año

5. **Cupones Año Anterior:**
   - Rechazar automáticamente
   - Excepción: Enero-Febrero
   - Configuración por parámetro

---

### Casos Especiales Identificados

**1. Farma Mía:**
- Reportó: 200 cupones
- Físicos: 10 cupones
- Reconocido: 10 cupones ($100)
- Diferencia: 190 cupones ($1,900)

**2. GPF - Cajas Incompletas:**
- Solicita: 1.42 cajas × $10 = $14.20
- Válido: 1 caja × $10 = $10
- Diferencia: $4.20 (descuento cliente)

**3. Novo Morab - Cambio de Precio:**
- Enero-Marzo: Precio X
- Abril en adelante: Precio Y
- Sistema debe validar precio correcto por fecha

---

### Notas Técnicas

- **Validación física crítica:** No se puede eliminar conteo manual
- **Formato estándar necesario:** Facilita automatización
- **Portal reduce trabajo:** Elimina correos y carga manual
- **Precios variables:** Requiere integración con lista vigente
- **Cupones físicos mandan:** Lo físico prevalece sobre lo digital

---


## Transcripción 6/17 - Validaciones del Sistema InnovaSer y Manejo de Observaciones

**Fecha:** No especificada  
**Participantes:** María Augusta (Magus), Cintia, Marixa, Alex (proveedor InnovaSer)

---

### Proceso de Validación en Sistema InnovaSer

#### 1. **Carga de Archivo de Pacientes**

**Paso 1: Seleccionar Archivo**
- Sistema permite seleccionar archivo Excel
- Validación de formato automática
- Advertencias si hay errores de formato

**Mensajes del Sistema:**
- ✓ "Archivo autorizado correctamente"
- ⚠ "Su archivo puede tener errores porque hay celdas que no están en el formato correcto"
- ⚠ "Hay espacios dentro de la identificación"

**Paso 2: Procesar Información**
- Sistema procesa registros
- Ejemplo: 656 transacciones
- Genera validaciones automáticas

---

#### 2. **Campo "Autorizar" (Sí/No)**

**Propósito:** Indicar si el registro debe procesarse

**Valores:**
- **Sí:** Procesar y cargar al sistema
- **No:** No cargar (por observaciones)

**Uso:**
- Magus revisa observaciones
- Marca "Sí" solo en registros válidos
- Registros con "No" se excluyen de carga

---

#### 3. **Validaciones Automáticas del Sistema**

**Validación 1: Identificación Válida**
- Cédula válida (10 dígitos)
- RUC Persona Natural válido (13 dígitos)
- Código Alfanumérico válido
- **Rechaza:** RUC Empresa, Identificación Genérica

**Validación 2: Factura No Duplicada**
- Compara contra reportes anteriores
- Valida: Misma identificación + Misma factura + Misma cadena
- **Nota:** Fecha puede ser diferente

**Validación 3: Ventas Válidas**
- Ventas > 0 (compras)
- Ventas ≤ 0 (bonificaciones) - No genera observación
- Separa compras de bonificaciones

**Validación 4: Bonificaciones Correctas**
- Valida mecánica (3+1 o 4+1)
- Compara compras vs bonificaciones
- Genera observación si no cumple condición

---

#### 4. **Tipos de Observaciones Generadas**

**A. Ventas ≤ 0 (Sin Problema)**
- Descripción: "Ventas menos o igual a cero"
- Razón: Son bonificaciones (precio = 0)
- Acción: Ninguna, es normal

**B. Identificación No Válida**
- Descripción: "Identificación no válida"
- Razón: RUC Empresa, ID Genérica, formato incorrecto
- Acción: Validar manualmente en SRI

**C. Factura Duplicada**
- Descripción: "Factura duplicada - Reporte [número]"
- Razón: Ya procesada en mes anterior
- Acción: No reconocer, informar a cadena

**D. Bonificación Incorrecta**
- Descripción: "No cumple condición de bonificación"
- Razón: Compras insuficientes para bonificar
- Acción: No reconocer bonificación

**E. Unidades Faltantes**
- Descripción: "Unidades sobrantes" (mal nombrado)
- Razón: Cadena solicita más de lo validado
- Acción: Reconocer solo lo validado

---

#### 5. **Proceso de Revisión Manual de Observaciones**

**Paso 1: Ver Resumen de Observaciones**
- Sistema muestra observaciones por producto
- Ejemplo: "Knox CBL - Identificaciones inválidas"

**Paso 2: Validar Identificaciones en SRI**

**Caso Real - Identificación Inválida:**
```
Observación: "Identificación no válida"
Acción:
1. Copiar identificación
2. Consultar en portal SRI
3. Verificar tipo de persona
4. Decisión:
   - Persona Natural → Válida
   - Empresa → Rechazar
   - No existe → Rechazar
```

**Ejemplo:**
- Identificación consultada en SRI
- Resultado: "Persona Natural - Mayor de edad"
- **Decisión:** Válida (no pertenece a empresa)

**Paso 3: Validar Facturas Duplicadas**

**Proceso:**
1. Ir a "Pacientes" → "Historial de Compras"
2. Buscar por número de factura
3. Verificar en qué reporte se procesó
4. Confirmar duplicidad

**Caso Real - Factura Duplicada:**
```
Factura: 03-01-0120-003
Observación: "Duplicada en reporte 1248-7"
Búsqueda: Sistema muestra que se procesó en Febrero
Decisión: No reconocer
Observación adicional: "Factura ya dio bonificación"
```

**Paso 4: Validar Bonificaciones**

**Proceso:**
1. Descargar archivo de "Pacientes Procesados"
2. Filtrar por producto y cadena
3. Revisar historial de compras del paciente
4. Validar si cumple mecánica (3+1 o 4+1)

**Caso Real - Bonificación Incorrecta:**
```
Producto: Somacina
Mecánica: 4+1
Paciente compró: 3 unidades
Observación: "No cumple condición"
Decisión: No bonificar (falta 1 compra)
```

---

#### 6. **Archivo de Pacientes Procesados (Descarga)**

**Propósito:** Reporte detallado para análisis

**Campos del Archivo:**

| Campo | Descripción |
|-------|-------------|
| Identificación | Cédula/RUC del paciente |
| Producto | Nombre del producto |
| Cadena | Farmacia donde compró |
| Compras | Unidades compradas |
| Bonificaciones | Unidades bonificadas |
| Estado | Correcto / Incorrecto |
| Observación | Motivo si es incorrecto |

**Estados:**

**Correcto:**
- Ejemplo: Compró 91 cajas, bonificó 30
- Sistema procesó correctamente
- Cumple mecánica de bonificación

**Incorrecto:**
- Ejemplo: Compró 91, bonificó 30, pero sistema solo procesó 91 sin bonificar
- No cumplió condición (3+1 o 4+1)
- Identificación inválida

**Uso del Archivo:**
- Magus hace resumen manual
- Valida bonificaciones por paciente
- Identifica patrones de compra
- Detecta pacientes que compran en múltiples cadenas

---

#### 7. **Corrección de Identificaciones (RUC)**

**Problema Identificado:**
- Sistema no acepta RUC Empresa
- Necesario convertir a RUC Persona Natural (13 dígitos)

**Proceso de Corrección:**

**Paso 1: Consultar SRI**
- Ingresar identificación en portal SRI
- Verificar tipo de persona
- Obtener RUC correcto (13 dígitos)

**Paso 2: Actualizar Archivo**
- Editar Excel original
- Reemplazar identificación incorrecta
- Guardar archivo corregido

**Paso 3: Recargar Información**
1. Eliminar carga anterior
2. Confirmar eliminación
3. Seleccionar archivo corregido
4. Procesar nuevamente

**Problema Detectado en Esta Sesión:**
- Magus corrigió RUCs
- Sistema confirmó: "Cargado correctamente"
- **Pero:** Observaciones persisten
- **Primera vez que ocurre este error**
- Contactar a proveedor (Alex)

---

#### 8. **Validación de Facturas Duplicadas - Caso Especial**

**Caso: Farmenace - Numeración Parcial**

**Problema:**
- Farmenace NO envía numeración completa
- Ejemplo: Solo envía "438-6" (últimos dígitos)
- NO envía: "009-001-438-6" (serie completa)

**Consecuencia:**
- Sistema detectó factura duplicada
- Misma identificación
- Mismo número parcial
- **Pero:** Diferente fecha

**Investigación:**
- Solicitaron facturas físicas
- Verificación: Diferente serie y caja
- Diferente autorización SRI
- **Conclusión:** NO era duplicada

**Decisión:**
- Farmenace debe enviar numeración completa
- Incluir: Serie + Caja + Número
- Evitar falsos positivos

**Respuesta de Farmenace:**
- "Sistema no permite descargar serie completa"
- Problema técnico de su lado
- Solución: Enviar facturas físicas cuando hay conflicto

---

#### 9. **Volumen de Transacciones por Cadena**

**Cadenas Pequeñas:**
- Ejemplo: 600 transacciones/mes
- Facturas físicas: Viable

**Cadenas Grandes:**
- **Difar:** 45,000 transacciones/mes
- **GPF:** Alto volumen
- **Farmenace:** Alto volumen
- **Farmacias Mía:** Alto volumen
- **San Gregorio:** Alto volumen

**Decisión:**
- Cadenas grandes: Solo Excel
- NO solicitar facturas físicas
- Validación solo por base de datos
- Excepción: Casos conflictivos específicos

---

#### 10. **Comparación: Proceso Manual vs Sistema**

**Antes (Manual - Rosita y Mari):**
- Revisión 100% manual
- Sin validaciones automáticas
- No detectaban duplicados
- No validaban identificaciones
- Proceso muy lento

**Ahora (Sistema InnovaSer):**
- Validaciones automáticas
- Detecta duplicados
- Valida identificaciones
- Genera observaciones
- Proceso más rápido
- **Pero:** Aún requiere revisión manual de observaciones

---

#### 11. **Pantalla de Notificación de Reportes**

**Ubicación:** Menú → "Notificar Reportes"

**Función:** Bandeja de reportes pendientes de notificación

**Campos Mostrados:**

| Campo | Descripción |
|-------|-------------|
| Fecha Recepción | Cuándo se recibió el reporte |
| Cadena | Nombre de la farmacia |
| Productos | Productos incluidos |
| Estado | Pendiente / Notificado |

**Proceso:**

**Paso 1: Seleccionar Reporte**
- Abrir reporte de la lista
- Revisar información

**Paso 2: Ingresar Valores de Reconocimiento**
- **Importante:** Magus ingresa manualmente
- Valor por producto
- Valor por cadena
- Cada cadena tiene costos diferentes

**Paso 3: Notificar**
- Click en "Notificar"
- Sistema genera correo automático
- Envía a Facturación (Gaby Cajas)

---

#### 12. **Reportes de InnovaSer (Proveedor Externo)**

**Diferencia con Proceso Manual:**
- InnovaSer hace TODO el proceso de validación
- Magus NO hace carga de archivo
- Magus NO hace validaciones
- Magus solo recibe reporte final

**Proceso:**
1. InnovaSer recibe información de farmacias
2. InnovaSer valida facturas
3. InnovaSer procesa bonificaciones
4. InnovaSer envía reporte a Magus
5. Magus ingresa valores de reconocimiento
6. Magus notifica

**Campo Crítico:**
- **"Valor para Notificación":** Magus lo ingresa manualmente
- Razón: Cada cadena tiene costo diferente
- Sistema no tiene tabla de costos por cadena

---

#### 13. **Estructura de Notificación por Producto**

**Ejemplo: Difar**

**Nivel 1: Cadena**
- Difar

**Nivel 2: Productos**
- Producto A
- Producto B
- Producto C

**Nivel 3: Detalle por Producto**
- Cajas vendidas
- Bonificaciones otorgadas
- Valor a reconocer

**Otros Clientes Mencionados:**
- GenesisMed
- Farmacias Camila
- Distribuidores Vinosa

---

#### 14. **Caso Especial: Reportes Pendientes**

**Situación:**
- Reportes recibidos el 17 de mes
- No se trabajó el 17 (feriado/fin de semana)
- Kifatex no aceptó generar NC después de fecha límite

**Decisión:**
- Dejar reportes en bandeja
- NO procesarlos en abril
- Procesarlos primeros días de mayo
- Razón: Análisis mensual debe ser correcto

**Implicación:**
- Reportes deben procesarse en mes correspondiente
- No mezclar meses en análisis
- Mantener trazabilidad temporal

---

### Requerimientos del Nuevo Sistema

#### 1. **Historia de Usuario: Descarga de Reportes**

**Como** usuario de Auditoría  
**Quiero** descargar reporte de pacientes procesados  
**Para** hacer análisis y validaciones manuales

**Campos del Archivo:**
- Identificación paciente
- Producto
- Cadena
- Compras
- Bonificaciones
- Estado (Correcto/Incorrecto)
- Observaciones

**Criterios de Aceptación:**
- Archivo Excel descargable
- Incluir todos los campos mencionados
- Permitir filtros por producto/cadena
- Mostrar observaciones detalladas

---

#### 2. **Historia de Usuario: Validación de Bonificaciones**

**Como** sistema  
**Quiero** validar que bonificaciones aplicadas sean correctas  
**Para** reconocer solo bonificaciones válidas

**Validaciones:**
- Verificar mecánica (3+1 o 4+1)
- Comparar compras vs bonificaciones
- Validar por cadena/farmacia
- Generar observación si no cumple

**Criterios de Aceptación:**
- Sistema valida automáticamente
- Genera observación clara
- Permite revisión manual
- Muestra historial de compras del paciente

---

#### 3. **Historia de Usuario: Consulta de Pacientes**

**Como** usuario de Auditoría  
**Quiero** visualizar pacientes cargados en el sistema  
**Para** verificar que la carga fue correcta

**Funcionalidades:**
- Pantalla de consulta de pacientes
- Filtros: Por farmacia, por identificación
- Mostrar historial de compras
- Mostrar productos comprados
- Mostrar bonificaciones recibidas

**Criterios de Aceptación:**
- Búsqueda por identificación
- Búsqueda por factura
- Filtro por cadena
- Mostrar todas las transacciones del paciente

---

#### 4. **Historia de Usuario: Portal para Farmacias**

**Como** farmacia  
**Quiero** cargar mis bonificaciones directamente al sistema  
**Para** eliminar intermediarios y correos

**Funcionalidades:**
- Login seguro por cadena
- Carga de archivo Excel
- Validación de formato
- Confirmación de carga
- Consulta de estado de reportes

**Validaciones:**
- Factura con autorización SRI
- Formato de archivo correcto
- Campos obligatorios completos

**Nota:** Esta funcionalidad reemplazaría a InnovaSer

---

#### 5. **Historia de Usuario: Validación de Facturas SRI**

**Como** sistema  
**Quiero** validar facturas contra autorización SRI  
**Para** asegurar que son facturas legítimas

**Integración:**
- API del SRI
- Validar número de autorización
- Validar fecha de emisión
- Validar estado (vigente/anulada)

**Criterios de Aceptación:**
- Validación automática
- Generar alerta si factura inválida
- Registrar resultado de validación

---

#### 6. **Historia de Usuario: Corrección de Identificaciones**

**Como** usuario de Auditoría  
**Quiero** corregir identificaciones inválidas  
**Para** procesar registros que fueron rechazados

**Funcionalidades:**
- Pantalla de observaciones
- Edición de identificación
- Validación en SRI
- Reprocesar registro

**Criterios de Aceptación:**
- Permitir edición de identificación
- Validar formato (10 o 13 dígitos)
- Consultar SRI automáticamente
- Actualizar registro sin recargar archivo completo

---

### Decisiones Clave

1. **Validación Física Permanece:**
   - Revisión manual de observaciones es crítica
   - Sistema automatiza detección, humano decide
   - Cada penny cuenta para las farmacias

2. **Portal para Farmacias (Futuro):**
   - Reemplazar a InnovaSer
   - Farmacias cargan directamente
   - Validación automática de facturas SRI
   - Reduce intermediarios

3. **Pantalla de Consulta de Pacientes:**
   - Necesaria para verificar cargas
   - Filtros por farmacia e identificación
   - Mostrar historial completo

4. **Descarga de Reportes:**
   - Archivo Excel con todos los campos
   - Permite análisis manual
   - Crítico para validaciones complejas

5. **Validación de Duplicados:**
   - Considerar: Identificación + Factura + Cadena
   - Fecha puede variar
   - Farmenace debe enviar numeración completa

---

### Casos Especiales Identificados

**1. Error de Carga (Primera Vez):**
- Sistema confirmó: "Cargado correctamente"
- Pero observaciones persisten
- RUCs corregidos no se reflejaron
- **Acción:** Contactar proveedor (Alex)

**2. Farmenace - Numeración Parcial:**
- Solo envía últimos dígitos de factura
- Genera falsos positivos de duplicados
- Solución: Enviar numeración completa
- Limitación técnica de su sistema

**3. Reportes Pendientes por Fecha:**
- Recibidos después de fecha límite Kifatex
- No procesados en mes actual
- Se procesan en mes siguiente
- Mantiene integridad de análisis mensual

**4. Pacientes Multi-Cadena:**
- Mismo paciente compra en varias farmacias
- Sistema debe consolidar historial
- Validar bonificaciones por cadena
- Evitar duplicar bonificaciones

---

### Métricas del Sistema

**Volumen Anual (Mencionado):**
- **9,000 millones** en Notas de Crédito emitidas por año
- Miles de pacientes
- Miles de clientes (farmacias)
- Ahorro significativo de tiempo vs proceso manual

**Importancia del Proyecto:**
- Presentado a Sebastián (directivo)
- Impacto: "Wow"
- Métricas clave: Tiempo, volumen, clientes, pacientes

---

### Notas Técnicas

- **Validación manual crítica:** No se puede eliminar completamente
- **Observaciones por producto:** Facilita revisión
- **Historial de pacientes:** Necesario para validar bonificaciones
- **Portal futuro:** Reducirá dependencia de InnovaSer
- **Integración SRI:** Validación automática de facturas
- **Cada penny cuenta:** Farmacias son muy estrictas con valores

---

## Transcripción 7/17 - Semana de Descuentos, Validación de Reportes y Proceso de Rebates

**Fecha:** No especificada  
**Participantes:** Rosita, Marixa, Cintia, Gaby Cajas (Facturación), Jorgito (Logística)

---

### Proceso de Semana de Descuentos

#### 1. **Notificación de Promoción**

**Origen:** Área de Ventas o Marketing

**Contenido del Correo:**

**Ejemplo: Promoción Lusca (1+1)**
```
Producto: Lusca [presentación específica]
Mecánica: 1+1 (compra 1 caja, recibe 1 caja bonificada)
Vigencia: 01/03/2025 - 31/03/2025
Reconocimiento: Nota de Crédito
Clientes participantes: [Lista de farmacias/cadenas]
```

**Información Clave:**
- Producto y presentación
- Mecánica de promoción
- Fechas de vigencia
- Forma de reconocimiento (NC)
- Farmacias participantes

---

#### 2. **Registro en Bitácora**

**Responsable:** Rosita (Ventas)

**Proceso:**
1. Recibe correo de Ventas/Marketing
2. Registra promoción en bitácora Excel
3. Especifica condiciones
4. Notifica a Auditoría (Marixa)

**Campos Registrados:**
- Nombre promoción
- Vigencia
- Mecánica
- Productos
- Clientes participantes
- Condiciones especiales

---

#### 3. **Recepción de Reportes de Farmacias**

**Cada farmacia envía su propio formato**

**Problema:** Formatos diferentes por cadena

**Ejemplo: Farmacia Keilas**
- Envía Excel con su formato propio
- Incluye: Fechas, producto, cantidad, unidades bonificadas
- **Crítico:** Identificación del paciente

**Campos Mínimos Necesarios:**
- Fecha de venta
- Producto
- Cantidad vendida
- Unidades bonificadas
- Identificación paciente (opcional pero importante)

---

#### 4. **Proceso de Validación Manual (Marixa)**

**Paso 1: Descargar Reporte**
- Farmacia envía por correo
- Marixa descarga archivo

**Paso 2: Validar Información**

**Validaciones Críticas:**
- ✓ Fechas dentro de vigencia
- ✓ Producto correcto
- ✓ Cantidad vendida
- ✓ Unidades bonificadas según mecánica
- ✓ Identificación paciente (si aplica)

**Paso 3: Crear Tabla de Validación**

**Marixa crea Excel con:**
- Producto
- Cantidad comprada
- Costo (de tabla Kifatex)
- Condición (1+1, 2+1, etc.)
- Valor a reconocer

**Cálculo:**
```
Ejemplo Lusca (1+1):
- Pacientes compraron: 100 cajas
- Bonificaciones: 100 cajas
- Costo unitario: $2.60 (tabla Kifatex)
- Valor a reconocer: 100 × $2.60 = $260
```

**Paso 4: Crear Tabla Dinámica**
- Resumen por producto
- Total unidades bonificadas
- Total valor a reconocer

---

#### 5. **Códigos de Afectación SAP**

**Crítico para Facturación**

**Tipos de Códigos:**

**A. Código Kifatex (Cliente):**
- Identifica al cliente en sistema Kifatex
- Ejemplo: Código de farmacia/cadena

**B. Código de Afectación Contable:**
- Define qué cuenta afectar en SAP
- **Semana de Descuentos:** 011 (Kifatex) → CD08 (SAP)

**Información en Correo a Facturación:**
```
Estimada Gaby,

Por favor ayudarme con emisión de NC para:
- Cliente Kifatex: [Código]
- Concepto: Promoción Lusca - Marzo 2025
- Valor: $260.00
- Código afectación: CD08

Adjunto:
- Tabla dinámica (resumen)
- Excel detallado (producto + valor)
```

---

#### 6. **Generación de Nota de Crédito en SAP**

**Responsable:** Gaby Cajas (Facturación)

**Proceso Actual (Manual):**

**Opción 1: Carga Individual**
1. Recibe correo de Marixa
2. Abre SAP
3. Crea NC manualmente
4. Ingresa datos uno por uno
5. Especifica código de afectación
6. Guarda NC

**Opción 2: Plantilla (Más Rápido)**
1. Recibe Excel de Marixa
2. Copia datos a plantilla SAP
3. Plantilla genera archivo
4. Sube archivo a carpeta específica
5. SAP lee carpeta y crea NC automáticamente

**Problema:**
- Si tiene 20 productos, debe copiar/pegar 20 veces
- Proceso tedioso y propenso a errores

---

#### 7. **Proceso de Logística (Jorgito) - Referencia**

**Proceso Masivo de NCs por Devolución**

**Método:**
1. Crea Excel con múltiples NCs
2. Copia/pega en plantilla SAP
3. Plantilla genera archivo
4. Archivo se sube a carpeta
5. SAP consume carpeta
6. Genera múltiples NCs automáticamente

**Ventaja:**
- Procesa múltiples NCs en una sola carga
- Ahorra tiempo significativo

**Aplicación a Promociones:**
- Marixa quiere proceso similar
- Generar múltiples NCs de una vez
- Evitar carga individual por producto

---

#### 8. **Propuesta de Mejora: Generación Masiva**

**Objetivo:** Automatizar generación de NCs

**Proceso Propuesto:**

**Paso 1: Marixa Valida en Sistema**
- Sistema muestra resumen de validación
- Marixa revisa información
- Marixa confirma o modifica valores

**Paso 2: Sistema Genera Archivo**
- Sistema crea archivo para SAP
- Incluye todos los productos
- Aplica códigos de afectación correctos

**Paso 3: SAP Consume Archivo**
- Archivo se guarda en tabla de BD
- SAP consulta tabla (no carpeta)
- SAP genera NCs automáticamente

**Paso 4: Gaby Solo Valida**
- Gaby revisa NCs generadas
- Gaby hace relación factura-NC (manual)
- Gaby aprueba

**Beneficio:**
- Elimina copiar/pegar
- Reduce errores
- Ahorra tiempo

---

#### 9. **Desafío: Formatos Diferentes por Farmacia**

**Problema Identificado:**

**Cada farmacia tiene formato propio:**
- Diferentes nombres de columnas
- Diferentes estructuras
- Diferentes campos

**Ejemplo:**
- Farmacia A: "Código Producto"
- Farmacia B: "Código"
- Farmacia C: "Material"
- Farmacia D: "Producto"

**Soluciones Discutidas:**

**Opción A: Formato Estándar Obligatorio**
- Definir formato único
- Todas las farmacias deben usarlo
- Sistema lee formato estándar
- **Problema:** Farmacias deben cambiar sus procesos

**Opción B: Múltiples Formatos en Sistema**
- Sistema reconoce múltiples nombres de columnas
- Ejemplo: "Código" OR "Producto" OR "Material" → Campo "Producto"
- **Problema:** Nueva farmacia = nuevo desarrollo

**Opción C: Marixa Adapta Manualmente**
- Marixa recibe cualquier formato
- Marixa copia/pega a formato estándar
- Marixa carga formato estándar al sistema
- **Problema:** Trabajo manual permanece

**Opción D: Portal con Plantilla**
- Farmacias acceden a portal
- Descargan plantilla estándar
- Llenan plantilla
- Cargan plantilla al portal
- **Ventaja:** Formato garantizado

**Decisión Pendiente:**
- Analizar con equipo técnico
- Evaluar viabilidad de lectura flexible
- Considerar portal como solución a largo plazo

---

#### 10. **Validaciones del Sistema (Semana de Descuentos)**

**Validación 1: Fechas**
- Ventas dentro de vigencia de promoción
- Ejemplo: 01/03/2025 - 31/03/2025

**Validación 2: Producto**
- Producto corresponde a promoción
- Presentación correcta

**Validación 3: Mecánica**
- Bonificaciones según condición
- Ejemplo: 1+1, 2+1, 3+1

**Validación 4: Costo**
- Validar contra tabla de costos Kifatex
- Aplicar costo correcto por farmacia

**Validación 5: Código de Afectación**
- Aplicar código correcto según tipo de promoción
- Ejemplo: Semana Descuentos → CD08

---

#### 11. **Condiciones Variables por Cliente**

**Problema Real:**

**Misma promoción, diferentes condiciones:**

**Ejemplo:**
- Promoción: Descuento 20% compartido
- Cliente A (GPF): 10% Bagó + 10% Farmacia
- Cliente B (Difar): 8% Bagó + 12% Farmacia
- Cliente C (Farmenace): 12% Bagó + 8% Farmacia

**Razón:**
- Negociación individual con cada cadena
- Supervisor negocia porcentajes
- Ventas aprueba cambios

**Proceso de Cambio:**

**Paso 1: Negociación**
- Supervisor negocia con cadena
- Cadena no acepta condición original
- Proponen nueva distribución

**Paso 2: Autorización**
- Supervisor solicita autorización a Ventas
- Ventas aprueba por correo
- Rosita actualiza condiciones en sistema

**Paso 3: Notificación**
- Sistema notifica a Marixa del cambio
- Marixa valida con nuevas condiciones

**Requerimiento del Sistema:**
- Permitir condiciones por cliente
- Permitir modificación de condiciones
- Notificar cambios a usuarios relevantes
- Mantener historial de cambios

---

#### 12. **Caso Especial: Cambio de Presentación**

**Situación Real:**

**Promoción Original:**
- Producto: Cerrado (cajas completas)
- Mecánica: 2+1

**Problema:**
- Supervisor no comunicó bien
- Farmacia aplicó en comprimidos (sueltos)
- Farmacia reportó comprimidos

**Solución:**
- Supervisor solicita autorización a Ventas
- Ventas aprueba excepción por correo
- Marixa reconoce comprimidos (excepcional)
- **Razón:** Mantener relación con cliente

**Requerimiento:**
- Campo de "Observaciones" en validación
- Adjuntar correo de autorización
- Marcar como excepción
- Mantener evidencia

---

#### 13. **Integración con Kifatex**

**Propuesta de Kifatex:**

**Automatización de su lado:**
- Kifatex está desarrollando automatización
- Necesitan archivo Excel de Bagó
- Formato específico requerido

**Campos Solicitados:**
- Código producto Bagó
- Nombre producto (opcional)
- Valor a reconocer

**Beneficio Mutuo:**
- Bagó genera Excel automáticamente
- Kifatex consume Excel automáticamente
- Elimina proceso manual en ambos lados

**Acción:**
- Contactar a Ivonne (Kifatex)
- Coordinar formato de archivo
- Validar que desarrollo esté funcional
- Alinear sistemas

**Consideración:**
- Desarrollo de Kifatex puede estar en progreso
- Validar que sea funcional antes de integrar
- Generar plantilla compatible

---

#### 14. **Secuencial de Notas de Crédito**

**Mismo proceso que PMC y Cupones:**

**Formato:** 001-25, 002-25, 003-25...

**Campos:**
- Secuencial
- Responsable: Marixa
- Código Kifatex
- Código Bagó
- Nombre Cliente
- Concepto: "Promoción Lusca - Marzo 2025"
- Mes y Año
- Valor solicitado
- NC Bagó (número)
- NC Kifatex (número)
- Diferencias (si aplica)
- Estado: Pendiente/Procesado/Replicado

**Carpeta de Pendientes:**
- NCs que no se procesaron a tiempo
- Ejemplo: Recibidas después de fecha límite
- Se procesan en mes siguiente
- Mantiene integridad de análisis mensual

---

### Proceso de Rebates

#### 15. **Introducción a Rebates**

**Definición:** Descuentos por cumplimiento de metas

**Ubicación:** Contractualidad Comercial

**Responsables:**
- Molly (Ventas): Presenta análisis
- Rosita: Colabora en análisis
- Sebastián: Autoriza proceso

**Proceso:**
1. Molly analiza ventas y crecimiento
2. Presenta a Sebastián
3. Sebastián autoriza Rebate
4. Se procesa reconocimiento

**Diferencia con otras promociones:**
- No es por producto específico
- Es por cumplimiento de objetivos
- Requiere autorización de Sebastián
- Análisis más complejo

---

### Requerimientos del Nuevo Sistema

#### 1. **Historia de Usuario: Notificación de Promoción**

**Como** usuario de Ventas (Rosita)  
**Quiero** que el sistema notifique automáticamente a Auditoría cuando creo una promoción  
**Para** que Auditoría esté al tanto de promociones vigentes

**Criterios de Aceptación:**
- Al crear/modificar promoción, enviar correo a Auditoría
- Incluir: Nombre, vigencia, mecánica, productos, clientes
- Notificar cambios en condiciones
- Mantener historial de notificaciones

---

#### 2. **Historia de Usuario: Validación de Reportes**

**Como** usuario de Auditoría (Marixa)  
**Quiero** cargar reportes de farmacias y que el sistema valide automáticamente  
**Para** agilizar el proceso de validación

**Funcionalidades:**
- Carga de archivo Excel
- Validación de fechas, productos, mecánica
- Cálculo automático de valores
- Aplicación de tabla de costos Kifatex
- Generación de resumen

**Criterios de Aceptación:**
- Sistema valida formato de archivo
- Aplica validaciones automáticas
- Calcula valor a reconocer
- Muestra resumen para revisión
- Permite modificaciones manuales

---

#### 3. **Historia de Usuario: Condiciones por Cliente**

**Como** usuario de Ventas (Rosita)  
**Quiero** configurar condiciones específicas por cliente  
**Para** reflejar negociaciones individuales

**Funcionalidades:**
- Crear promoción general
- Especificar condiciones por cliente
- Modificar condiciones de cliente específico
- Notificar cambios a Auditoría

**Criterios de Aceptación:**
- Permitir condiciones diferentes por cliente
- Mantener historial de cambios
- Notificar automáticamente
- Validar con condiciones específicas

---

#### 4. **Historia de Usuario: Generación Masiva de NCs**

**Como** usuario de Facturación (Gaby)  
**Quiero** que el sistema genere archivo para SAP con múltiples NCs  
**Para** evitar carga individual

**Funcionalidades:**
- Sistema genera archivo SAP
- Incluye múltiples productos
- Aplica códigos de afectación correctos
- Guarda en tabla de BD
- SAP consume tabla

**Criterios de Aceptación:**
- Generar archivo compatible con SAP
- Incluir todos los campos requeridos
- Aplicar código de afectación correcto
- Permitir validación antes de generar
- Registrar en secuencial

---

#### 5. **Historia de Usuario: Formato Flexible de Carga**

**Como** sistema  
**Quiero** reconocer múltiples nombres de columnas  
**Para** aceptar diferentes formatos de farmacias

**Funcionalidades:**
- Mapeo de nombres de columnas
- Ejemplo: "Código" = "Producto" = "Material"
- Validación de campos obligatorios
- Generación de errores si falta información

**Criterios de Aceptación:**
- Reconocer al menos 3 variantes por campo
- Validar campos obligatorios presentes
- Generar reporte de errores claro
- Permitir configuración de nuevos mapeos

**Nota:** Requiere análisis técnico de viabilidad

---

#### 6. **Historia de Usuario: Integración con Kifatex**

**Como** sistema  
**Quiero** generar archivo Excel para Kifatex  
**Para** automatizar su proceso de réplica

**Funcionalidades:**
- Generar Excel con formato Kifatex
- Incluir: Código producto, nombre, valor
- Guardar en ubicación accesible
- Notificar a Kifatex cuando esté listo

**Criterios de Aceptación:**
- Formato compatible con sistema Kifatex
- Generación automática al aprobar NC
- Campos requeridos completos
- Validar con Kifatex antes de implementar

---

#### 7. **Historia de Usuario: Gestión de Excepciones**

**Como** usuario de Auditoría (Marixa)  
**Quiero** registrar excepciones autorizadas  
**Para** mantener evidencia de casos especiales

**Funcionalidades:**
- Campo de observaciones
- Adjuntar correo de autorización
- Marcar como excepción
- Requiere aprobación adicional

**Criterios de Aceptación:**
- Permitir adjuntar archivos
- Campo de observaciones obligatorio en excepciones
- Notificar a supervisor de excepción
- Mantener trazabilidad

---

#### 8. **Historia de Usuario: Reportes de Promociones**

**Como** usuario de Auditoría/Ventas  
**Quiero** consultar reportes de promociones procesadas  
**Para** análisis y toma de decisiones

**Filtros:**
- Por fecha (mes/año)
- Por producto
- Por cliente/farmacia
- Por tipo de promoción
- Por estado (pendiente/procesado)

**Campos del Reporte:**
- Promoción
- Cliente
- Producto
- Unidades bonificadas
- Valor reconocido
- Fecha procesamiento
- Estado

**Criterios de Aceptación:**
- Exportar a Excel
- Aplicar múltiples filtros
- Mostrar totales
- Gráficos de tendencias

---

### Decisiones Clave

1. **Formato de Archivo:**
   - Ideal: Formato estándar obligatorio
   - Alternativa: Sistema reconoce múltiples variantes
   - Requiere análisis técnico de viabilidad

2. **Generación de NCs:**
   - Sistema genera archivo para SAP
   - SAP consume desde tabla (no carpeta)
   - Gaby solo valida y aprueba

3. **Condiciones por Cliente:**
   - Permitir configuración individual
   - Notificar cambios automáticamente
   - Mantener historial completo

4. **Integración Kifatex:**
   - Validar desarrollo de Kifatex
   - Generar archivo compatible
   - Automatización mutua

5. **Excepciones:**
   - Requieren autorización por correo
   - Sistema debe permitir adjuntar evidencia
   - Marcar claramente como excepción

---

### Casos Especiales Identificados

**1. Cambio de Condiciones Mid-Promoción:**
- Promoción ya creada
- Cliente negocia nuevas condiciones
- Ventas aprueba cambio
- Sistema debe permitir modificación
- Notificar a Auditoría

**2. Cambio de Presentación:**
- Promoción para cajas
- Farmacia aplicó en comprimidos
- Ventas autoriza excepción
- Reconocer con observación
- Adjuntar correo de autorización

**3. NCs Pendientes por Fecha:**
- Recibidas después de cierre
- No procesar en mes actual
- Guardar en carpeta "Pendientes"
- Procesar en mes siguiente
- Mantener secuencial correcto

**4. Múltiples Promociones Simultáneas:**
- Mismo cliente, múltiples promociones
- Generar NC por cada promoción
- Agrupar en un solo archivo SAP
- Diferenciar por concepto

---

### Notas Técnicas

- **Formato flexible:** Requiere análisis técnico profundo
- **Integración SAP:** Consumir tabla en lugar de carpeta
- **Integración Kifatex:** Validar desarrollo antes de implementar
- **Condiciones variables:** Crítico para negocio
- **Evidencia de excepciones:** Obligatorio para auditoría
- **Secuencial único:** Mantener para todas las promociones

---

### Métricas y Análisis

**Volumen de Promociones:**
- Múltiples promociones simultáneas
- Diferentes condiciones por cliente
- Procesamiento mensual

**Tiempo Ahorrado:**
- Generación masiva vs individual
- Validación automática vs manual
- Integración con Kifatex

**Trazabilidad:**
- Historial de cambios
- Evidencia de autorizaciones
- Secuencial de NCs

---

## Transcripción 8/17 - Proceso OII, Validaciones de Productos y Provisiones

**Fecha:** No especificada  
**Participantes:** Marixa, Rosita, Cintia, Ivonne (Kifatex)

---

### Proceso de OII (Orden Interna de Inventario)

#### 1. **¿Qué es OII?**

**Definición:** Orden Interna de Inventario

**Diferencia con Alternativa:**
- **OII:** Producto sin mejora
- **Alternativa:** Producto mejorado

**Archivos Recibidos:**
- GPF envía 2 archivos separados
- Antes: 2 tabs (Fitbec y San Hassan)
- Ahora: 1 solo archivo (fusión a Parcomet)

---

#### 2. **Campo Orden de Compra**

**Problema Identificado:**
- GPF tiene campo "Orden de Compra" en sus archivos
- Kifatex podría incluir este campo en archivos diarios

**Acción Tomada:**
- Marixa contactó a Ivonne (Kifatex)
- Solicitó incluir "Orden de Compra" en archivos
- Envió ejemplos de archivos GPF
- Esperando respuesta

**Beneficio:**
- Facilita cruce de información
- Mejora trazabilidad
- Simplifica validaciones

**Consideración:**
- Si Kifatex incluye campo, sistema debe consumirlo
- Validar que no requiera cambios en sistema interno

---

#### 3. **Proceso de Validación Producto por Producto**

**Herramienta:** Query manual en base de datos

**Ejemplo: Producto Carvegi (Código 23423)**

**Paso 1: Filtrar por Producto**
- Seleccionar producto específico
- Ver todas las transacciones

**Paso 2: Revisar Transacciones**

**Caso Real Detectado:**
```
Fecha: 10 Abril (fecha Kifatex)
Fecha recepción GPF: 11 Abril
Unidades: 1,512

Fecha: 17 Abril
Unidades: 912

Fecha: 22 Abril
Unidades: -912 (devolución/regularización)

Cálculo: 1,512 - 912 = 600 (diferencia)
```

**Análisis:**
- 17 Abril: Facturación de 912 unidades
- 22 Abril: Regularización (devolución)
- **Conclusión:** Duplicación corregida por Kifatex

---

#### 4. **Detección de Duplicados**

**Problema Frecuente:**
- Kifatex tiene área de facturación
- A veces emiten facturas duplicadas
- Luego regularizan con devolución

**Validación Manual Actual:**
- Marixa revisa query completo
- Identifica mismo número de factura
- Detecta duplicación
- Valida regularización

**Campos para Validar Duplicados:**
- Número de factura
- Fecha
- Cantidad
- Producto
- Cliente

**Requerimiento del Sistema:**
- Validar registros no duplicados
- Basarse en: Fecha + Cantidad + Producto + Cliente
- Generar alerta si detecta duplicado
- Permitir revisión manual

---

#### 5. **Cálculo de Diferenciales de Precio**

**Proceso Completo:**

**Paso 1: Obtener Precio Kifatex**
- Precio facturado por Kifatex a farmacia
- Ejemplo: $14.84

**Paso 2: Obtener Costo Negociado**
- Costo acordado con farmacia
- Ejemplo: $9.15

**Paso 3: Calcular Diferencial**
```
Diferencial = Precio Kifatex - Costo Negociado
Diferencial = $14.84 - $9.15 = $5.69
```

**Paso 4: Calcular Valor a Reconocer**
```
Valor = Unidades × Diferencial
Valor = 912 × $5.69 = $5,189.28
```

---

#### 6. **Caso Especial: Producto Corto Vencimiento**

**Situación:**
- Producto con fecha de vencimiento próxima
- GPF recibe descuento adicional

**Ejemplo: Producto Eqibra**

**Cálculo Normal:**
```
Precio lista: $17.20
Costo negociado: $9.15
Diferencial: $17.20 - $9.15 = $8.05
```

**Cálculo Real (Corto Vencimiento):**
```
Precio Kifatex facturó: $14.84 (con descuento adicional)
Costo negociado: $9.15
Diferencial: $14.84 - $9.15 = $5.69
```

**Problema:**
- Cliente solicita reconocimiento: $6.33
- Sistema calcula: $8.05 (usando precio lista)
- **Diferencia:** Sistema calcula más de lo solicitado

**Solución Actual:**
- Marixa ajusta manualmente
- Usa precio facturado ($14.84) en lugar de lista ($17.20)
- Respeta valor solicitado por cliente
- Reconoce: $5.69 (no $8.05)

**Razón:**
- Descuento adicional es beneficio de GPF
- No debe ser reconocido por Bagó
- Producto corto vencimiento tiene precio especial

**Requerimiento del Sistema:**
- Usar precio Kifatex (no precio lista)
- Validar contra valor solicitado por cliente
- Generar alerta si diferencia > solicitado
- Permitir ajuste manual con observación

---

#### 7. **Validación Final de Valores**

**Proceso:**

**Paso 1: Calcular Valor por Producto**
```
Valor = Unidades × Diferencial
```

**Paso 2: Comparar con Solicitud Cliente**
- Cliente solicita: $X
- Sistema calcula: $Y
- Validar: $X = $Y

**Paso 3: Ajustes**
- Si diferencia pequeña ($5 aprox): Contactar cliente
- Si diferencia significativa: Investigar
- Ajustar manualmente si es necesario

**Paso 4: Generar Resumen**
- Código producto
- Descripción producto
- Valor a reconocer
- **NO incluir unidades** (solo valores)

---

#### 8. **Correo a Facturación (OII)**

**Destinatario:** Gaby Cajas

**Contenido:**
```
Estimada Gaby,

Por favor proceder con emisión de NC para:
- Cliente: GPF
- Concepto: OII - [Mes] 2025
- Valor total: $[Total]

Adjunto archivo Excel con:
- Código producto
- Descripción producto
- Valor a reconocer por producto
```

**Archivo Adjunto:**
- Solo 3 columnas: Código, Descripción, Valor
- NO incluir unidades
- Formato Excel

---

### Proceso de Provisiones

#### 9. **¿Qué son las Provisiones?**

**Definición:** Estimación de gastos futuros por promociones pendientes de liquidar

**Contexto:**
- Cierre mensual de ventas (ejemplo: Mayo)
- Algunas farmacias NO han enviado información de meses anteriores
- Necesario estimar valor a reconocer

**Ejemplo:**
- Estamos en Mayo
- Farmacia debe información de Febrero, Marzo, Abril
- Necesario provisionar esos valores

---

#### 10. **Cálculo de Provisiones**

**Método 1: Promedio 3 Meses (Cliente al Día)**

**Ejemplo: Cliente Difar**
```
Febrero: $7,000
Marzo: $6,000
Abril: $5,000

Promedio = ($7,000 + $6,000 + $5,000) ÷ 3 = $6,000

Provisión Mayo = $6,000
```

**Método 2: Último Mes × Meses Pendientes**

**Ejemplo: Cliente Trifal (debe 3 meses)**
```
Último mes liquidado: $8,000
Meses pendientes: 3 (Febrero, Marzo, Abril)
Mes actual: 1 (Mayo)

Provisión = $8,000 × 4 = $32,000
```

**Criterio:**
- Si cliente está al día: Promedio 3 meses
- Si cliente debe varios meses: Último valor × meses pendientes

---

#### 11. **Problema Actual: Provisión por Producto Genérico**

**Situación Actual:**

**Contabilidad registra:**
- Provisión total: $1,000,000
- Código: GENÉRICO (un solo código para todo)

**Problema:**
- No se distribuye por producto
- Distorsiona evaluación económica de productos
- Al emitir NC real, impacto contable incorrecto

**Ejemplo del Problema:**
```
Provisión: $1,000,000 (código genérico)
NC Real: $800,000 distribuida en 31 productos

Resultado:
- Evaluación económica incorrecta
- No se puede analizar rentabilidad por producto
- Impacto contable distorsionado
```

---

#### 12. **Solución Propuesta: Provisión por Producto**

**Objetivo:** Distribuir provisión según productos de la promoción

**Ejemplo: Plan Medicación Continua (PMC)**

**Cliente:** Difar  
**Provisión Total:** $50,000  
**Productos PMC:** 31 productos

**Distribución:**
```
Producto A: $5,000
Producto B: $3,500
Producto C: $2,800
...
(Total 31 productos = $50,000)
```

**Beneficio:**
- Evaluación económica correcta por producto
- Impacto contable preciso
- Análisis de rentabilidad real

---

#### 13. **Integración con SAP (Provisiones)**

**Responsable Actual:** Wildarabon (Contabilidad)

**Proceso Actual:**
- Wildarabon recibe provisiones
- Registra código por código manualmente
- Desarrolló plantilla con Peter (TI)
- Ahora puede descargar en lugar de tipear

**Propuesta:**
- Sistema genera archivo para SAP
- Incluye provisión por producto
- SAP consume archivo automáticamente
- Elimina carga manual

**Acción Necesaria:**
- Reunir con Wildarabon
- Entender plantilla actual
- Validar formato requerido
- Coordinar integración

---

#### 14. **Notificación a Kifatex (Provisiones)**

**Requerimiento de Kifatex:**
- Notificación por cliente
- Provisión por concepto de promoción

**Información Enviada:**
```
Cliente: GPF
Promoción: PMC
Mes: Abril 2025
Provisión: $8,198
```

**Necesidad:**
- Sistema debe generar notificación
- Por cliente
- Por promoción
- Automática

---

### Reportes y Análisis

#### 15. **Reporte General de Promociones**

**Objetivo:** Resumen ejecutivo para gerencia

**Estructura Actual (Excel):**

**Nivel 1: Tipo de Promoción**
- Plan Medicación Continua
- Rebates
- Cupones (Trifamox, Novo Morab, Letty)
- Semana de Descuentos

**Nivel 2: Por Tipo**
- Ejemplo Cupones:
  - Trifamox
  - Novo Morab
  - Letty

**Nivel 3: Detalle Mensual**
- Enero: $X
- Febrero: $Y
- Marzo: $Z
- Total: $T

**Fuente de Datos:**
- Notas de Crédito emitidas
- Agrupadas por tipo de promoción

---

#### 16. **Reporte Detallado por Cliente**

**Funcionalidad:**
- Click en cliente (ejemplo: GPF)
- Abre detalle de promociones
- Por mes
- Por tipo de promoción

**Ejemplo:**
```
Cliente: GPF
Mes: Abril 2025

PMC: $50,000
Cupones Trifamox: $10,000
Semana Descuentos: $15,000
Total: $75,000
```

**Filtros Necesarios:**

**Filtro 1: Mes de Liquidación**
- Mes en que se procesó la NC
- Ejemplo: Mayo 2025

**Filtro 2: Mes de la Promoción**
- Mes al que corresponde la venta
- Ejemplo: Abril 2025

**Razón de 2 Filtros:**
- En Mayo puedo liquidar ventas de Abril
- Pero también ventas atrasadas de Marzo o Febrero
- Necesario diferenciar

---

#### 17. **Reporte de Unidades y Valores**

**Necesidad:** Análisis de evaluación de productos

**Campos:**
- Producto
- Unidades bonificadas
- Valor reconocido

**Uso:**
- Evaluación de rentabilidad
- Análisis de impacto por producto
- Proyecciones

**Formato:**
- Valores en dólares
- Unidades en cantidad
- Ambos campos visibles

---

#### 18. **Reporte de Control de Liquidaciones**

**Objetivo:** Seguimiento de información pendiente

**Problema:**
- Farmacias no envían información a tiempo
- Necesario hacer seguimiento

**Ejemplo:**
```
Cliente: Difar
Febrero: $70,000 (Liquidado en Mayo)
Marzo: $60,000 (Liquidado en Mayo)
Abril: $50,000 (Liquidado en Mayo)

Total NC Mayo: $180,000
Pero corresponde a 3 meses diferentes
```

**Reporte Necesario:**

**Por Mes de Promoción:**
- Febrero: $70,000 (liquidado)
- Marzo: $60,000 (liquidado)
- Abril: $50,000 (liquidado)

**Control:**
- Identificar qué meses están pendientes
- Quién no ha enviado información
- Seguimiento a supervisores

**Beneficio:**
- Saber quién está al día
- Quién está atrasado
- Proyectar provisiones correctamente

---

#### 19. **Reporte de Bitácora de Promociones**

**Funcionalidad:**
- Ver todas las promociones vigentes
- Estado: Activa/Cerrada
- Fechas inicio/fin
- Valor de NCs emitidas

**Detalle por Promoción:**

**Ejemplo: PMC**
- Click en PMC
- Muestra todos los clientes
- Por cliente, detalle mensual

**Ejemplo: Cliente Difar en PMC**
```
Enero 2025: $45,000
Febrero 2025: $48,000
Marzo 2025: $52,000
...
```

**Información Adicional:**
- Unidades bonificadas
- Valores reconocidos
- Estado de liquidación

---

### Requerimientos del Nuevo Sistema

#### 1. **Historia de Usuario: Validación de Duplicados**

**Como** sistema  
**Quiero** detectar registros duplicados automáticamente  
**Para** evitar reconocimientos incorrectos

**Validaciones:**
- Número de factura
- Fecha
- Cantidad
- Producto
- Cliente

**Criterios de Aceptación:**
- Detectar duplicados automáticamente
- Generar alerta visible
- Permitir revisión manual
- Registrar decisión (aceptar/rechazar)

---

#### 2. **Historia de Usuario: Cálculo de Diferenciales**

**Como** sistema  
**Quiero** calcular diferenciales de precio automáticamente  
**Para** determinar valor a reconocer

**Cálculo:**
```
Diferencial = Precio Kifatex - Costo Negociado
Valor = Unidades × Diferencial
```

**Criterios de Aceptación:**
- Usar precio Kifatex (no lista)
- Calcular diferencial automáticamente
- Validar contra valor solicitado
- Generar alerta si diferencia significativa
- Permitir ajuste manual con observación

---

#### 3. **Historia de Usuario: Productos Corto Vencimiento**

**Como** usuario de Auditoría  
**Quiero** identificar productos con descuento adicional  
**Para** aplicar precio correcto

**Funcionalidad:**
- Detectar precio Kifatex < precio lista
- Marcar como "descuento adicional"
- Usar precio Kifatex para cálculo
- Generar observación automática

**Criterios de Aceptación:**
- Comparar precio Kifatex vs lista
- Alertar si diferencia > 10%
- Permitir confirmar descuento adicional
- Registrar motivo (corto vencimiento, etc.)

---

#### 4. **Historia de Usuario: Cálculo de Provisiones**

**Como** sistema  
**Quiero** calcular provisiones automáticamente  
**Para** cierre mensual contable

**Métodos:**
- Promedio 3 meses (cliente al día)
- Último mes × meses pendientes (cliente atrasado)

**Criterios de Aceptación:**
- Identificar meses pendientes por cliente
- Aplicar método correcto automáticamente
- Distribuir por producto
- Generar archivo para SAP
- Notificar a Kifatex

---

#### 5. **Historia de Usuario: Provisión por Producto**

**Como** usuario de Contabilidad  
**Quiero** recibir provisiones distribuidas por producto  
**Para** evaluación económica correcta

**Funcionalidad:**
- Distribuir provisión total
- Asignar a cada producto de la promoción
- Generar archivo para SAP
- Formato compatible con plantilla actual

**Criterios de Aceptación:**
- Provisión por producto (no genérico)
- Suma total = provisión calculada
- Formato SAP compatible
- Validación con Wildarabon

---

#### 6. **Historia de Usuario: Reporte General de Promociones**

**Como** usuario de Gerencia  
**Quiero** ver resumen ejecutivo de todas las promociones  
**Para** análisis y toma de decisiones

**Filtros:**
- Mes de liquidación
- Mes de promoción
- Tipo de promoción
- Cliente

**Visualización:**
- Por tipo de promoción
- Por cliente
- Por mes
- Drill-down a detalle

**Criterios de Aceptación:**
- Exportar a Excel
- Gráficos de tendencias
- Comparativa mes a mes
- Totales por categoría

---

#### 7. **Historia de Usuario: Reporte de Control**

**Como** usuario de Auditoría  
**Quiero** ver qué clientes están atrasados  
**Para** hacer seguimiento

**Información:**
- Cliente
- Meses pendientes
- Último mes liquidado
- Valor estimado pendiente

**Criterios de Aceptación:**
- Lista de clientes atrasados
- Ordenar por meses pendientes
- Mostrar valor estimado
- Generar alerta automática
- Notificar a supervisores

---

#### 8. **Historia de Usuario: Integración SAP (Provisiones)**

**Como** sistema  
**Quiero** generar archivo para SAP con provisiones  
**Para** eliminar carga manual

**Funcionalidad:**
- Generar archivo formato SAP
- Incluir provisión por producto
- Guardar en ubicación accesible
- Notificar a Contabilidad

**Criterios de Aceptación:**
- Formato compatible con plantilla Wildarabon
- Incluir todos los campos requeridos
- Validar suma total
- Coordinar con Peter (TI)

---

### Decisiones Clave

1. **Orden de Compra:**
   - Validar con Kifatex inclusión del campo
   - Sistema debe estar preparado para consumirlo
   - No requiere cambios en sistema interno

2. **Detección de Duplicados:**
   - Validación automática obligatoria
   - Basada en múltiples campos
   - Alerta visible para revisión manual

3. **Precio para Cálculo:**
   - Usar precio Kifatex (no lista)
   - Considerar descuentos adicionales
   - Validar contra solicitud cliente

4. **Provisiones por Producto:**
   - Crítico para evaluación económica
   - Requiere coordinación con Contabilidad
   - Integración con SAP necesaria

5. **Reportes con Doble Filtro:**
   - Mes de liquidación
   - Mes de promoción
   - Ambos necesarios para análisis correcto

---

### Casos Especiales Identificados

**1. Duplicados con Regularización:**
- Kifatex emite factura duplicada
- Luego regulariza con devolución
- Sistema debe detectar y alertar
- Permitir validación manual

**2. Producto Corto Vencimiento:**
- Precio Kifatex < precio lista
- Descuento adicional es de farmacia
- No reconocer descuento adicional
- Usar precio Kifatex para cálculo

**3. Cliente Atrasado Múltiples Meses:**
- Envía información de 3 meses juntos
- NC se emite en un solo mes
- Pero corresponde a 3 meses diferentes
- Reporte debe mostrar desglose

**4. Provisión Distribuida:**
- No usar código genérico
- Distribuir por cada producto
- Mantener suma total correcta
- Integrar con SAP

---

### Notas Técnicas

- **Query manual:** Actualmente necesario para validaciones complejas
- **Orden de compra:** Pendiente confirmación Kifatex
- **Integración SAP:** Coordinar con Wildarabon y Peter
- **Doble filtro:** Crítico para reportes correctos
- **Provisión por producto:** Cambio significativo en proceso contable

---

### Próximos Pasos

1. **Validar con Kifatex:** Campo orden de compra
2. **Reunión con Wildarabon:** Formato provisiones SAP
3. **Coordinar con Peter:** Integración técnica
4. **Definir formato:** Archivo provisiones
5. **Próxima sesión:** Proceso de provisiones en detalle

---

## Transcripción 9/17 - Proceso Completo de Rebates y Plan Comercial GPF

**Fecha:** No especificada  
**Participantes:** Marixa, Rosita, Cintia  
**Duración:** ~3 horas (la reunión más extensa)

---

### Introducción a Rebates

**Definición:** Reconocimiento porcentual por cumplimiento de objetivos anuales de compra

**Importancia Estratégica:**
- Plan más complejo de todos
- Mayor impacto económico
- Requiere autorización de Sebastián (Gerencia)
- Análisis previo de Molly y Rosita (Ventas)

**Diferencia con otras promociones:**
- No es por producto específico
- Es por cumplimiento de metas globales
- Evaluación anual con cortes trimestrales/semestrales
- Condiciones variables por cliente

---

### Estructura de Carpetas

**Ubicación:** Carpeta "Comercial" → "Rebates" → "2025"

**Organización:**
- Por año
- Por trimestre/semestre
- Archivos por cliente
- Cartas firmadas (imágenes convenios)

---

### Proceso de Rebates

#### 1. **Análisis y Aprobación (Ventas)**

**Responsables:** Molly y Rosita

**Proceso:**
1. Analizar ventas año anterior del cliente
2. Proyectar crecimiento deseado
3. Definir objetivos y porcentajes
4. Presentar a Sebastián
5. Sebastián aprueba o rechaza

**Resultado:** Plan de Rebate autorizado

---

#### 2. **Envío de Cartas a Clientes**

**Contenido de la Carta:**
- Objetivos de compra (unidades/valores)
- Porcentajes de reconocimiento
- Condiciones del plan
- Período de evaluación
- Firma del cliente (aceptación)

**Tipos de Rebates:**

**A. Rebate por Marcas:**
- Productos específicos (ejemplo: 22 productos)
- Objetivo en unidades
- Por semestre
- Ejemplo: 113 unidades semestre 1, 118 unidades semestre 2

**B. Rebate por Montos:**
- Ventas totales (excluyendo productos de marcas)
- Objetivo en valores
- Por año
- Ejemplo: $1,144,000 anual

---

#### 3. **Carga Inicial del Plan**

**Fuente:** Cartas firmadas por clientes

**Información a Registrar:**

**Por Cliente:**
- Código cliente
- Nombre cliente
- Tipo de rebate (Marcas, Montos, o Ambos)

**Objetivo Marcas:**
- Lista de productos participantes (código + nombre)
- Unidades objetivo semestre 1
- Unidades objetivo semestre 2
- Porcentaje reconocimiento (ejemplo: 5%)

**Objetivo Montos:**
- Valor objetivo anual
- Niveles de cumplimiento:
  - Nivel 1: $1,144,000 → 1.5%
  - Nivel 2: Mayor a nivel 1 → 2%
  - Nivel 3: Mayor a nivel 2 → 2.5%

**Propuesta de Carga:**
- Plantilla Excel con formato estándar
- Campos: Cliente, Código Kifatex, Producto, Objetivo, Porcentaje
- Carga masiva al sistema
- Validación de formato

---

#### 4. **Condiciones del Plan**

**Condiciones Comunes:**

**A. Nivel de Devoluciones:**
- Máximo permitido: 1.5% (varía por cliente)
- Cálculo: Devoluciones ÷ Ventas totales
- Excluir: Productos descontinuados, defectos de fabricación

**B. Nivel de Inventario:**
- Máximo permitido: 30 días (varía por cliente)
- Requiere solicitud de inventario a supervisores
- Cálculo: Stock bodega ÷ Ventas promedio

**C. Compra de Productos Nuevos:**
- Cliente debe comprar productos de lanzamiento
- Validación manual (no hay campo en sistema)
- Productos nuevos: Lanzados en año actual o anterior

**D. Cumplimiento Parcial:**
- Cliente puede solicitar pago parcial (trimestral/semestral)
- Aunque objetivo sea anual
- Sistema debe calcular proporcional

---

#### 5. **Evaluación Trimestral/Semestral**

**Fuente de Datos:** Query de ventas Kifatex

**Proceso de Evaluación:**

**Paso 1: Actualizar Query**
- Ejecutar query con datos actualizados
- Fecha: Siempre día anterior
- Ejemplo: Evaluación al 31 Marzo

**Paso 2: Filtrar por Cliente**
- Seleccionar cliente específico (ejemplo: Cordespa código 8653)
- Aplicar filtros de motivos de venta

**Paso 3: Crear Tabla Dinámica**
- Productos participantes
- Unidades vendidas por mes
- Valores vendidos por mes
- Totales acumulados

**Paso 4: Validar Cumplimiento**

**Ejemplo: Rebate Marcas - Cordespa**
```
Objetivo Semestre 1: 113 unidades
Real vendido (Ene-Mar): 50 unidades

Cumplimiento: 50 ÷ 113 = 44%
Decisión: NO cumple (no se paga)

Si hubiera vendido 115:
Cumplimiento: 115 ÷ 113 = 102%
Valor ventas: $398,000
Reconocimiento: $398,000 × 5% = $19,900
```

**Ejemplo: Rebate Montos - Cordespa**
```
Objetivo Anual: $1,144,000 (Nivel 1 = 1.5%)
Real vendido (Semestre 1): $557,000

Evaluación Semestral:
Objetivo semestre: $1,144,000 ÷ 2 = $572,000
Real: $557,000
Cumplimiento: 97% (NO cumple)

Si hubiera vendido $600,000:
Cumplimiento: 105%
Nivel aplicable: 2% (superó nivel 1)
Reconocimiento: $600,000 × 2% = $12,000
```

---

#### 6. **Motivos de Venta (Filtros)**

**Problema:** No todos los movimientos cuentan para rebate

**Condiciones Variables por Cliente:**

**Cliente A (Venta Neta):**
- Incluir: FSC (ventas)
- Excluir: Devoluciones, provisiones, descuentos promocionales, rebates

**Cliente B (Venta Bruta):**
- Incluir: FSC + otros movimientos
- Considerar: Rebates en cálculo

**Motivos Adicionales Considerados:**
- Devoluciones por defecto de fabricación (incluir)
- Devoluciones por precio (incluir)
- Devoluciones por error cantidad (incluir)
- Razón: Validar que no sean devoluciones masivas que afecten cálculo

**Requerimiento del Sistema:**
- Configuración de motivos por cliente
- Permitir incluir/excluir motivos específicos
- Mantener historial de configuración

---

#### 7. **Validación de Condiciones**

**A. Validación de Devoluciones**

**Proceso:**
1. Calcular total devoluciones por motivo
2. Excluir productos descontinuados
3. Excluir defectos de fabricación (según criterio)
4. Calcular porcentaje: Devoluciones ÷ Ventas

**Ejemplo:**
```
Ventas totales: $1,000,000
Devoluciones totales: $43,600
Devoluciones caducado: $9,000
Productos descontinuados: $5,000

Devoluciones válidas: $43,600 - $5,000 = $38,600
Porcentaje: $38,600 ÷ $1,000,000 = 3.86%

Condición: Máximo 1.5%
Resultado: NO cumple (3.86% > 1.5%)
```

**Pantalla Propuesta:**
- Mostrar lista de productos devueltos
- Permitir seleccionar cuáles excluir
- Calcular porcentaje automáticamente
- Generar alerta si excede límite

**B. Validación de Inventario**

**Proceso:**
1. Solicitar inventario a supervisores
2. Recibir archivo con stock por producto
3. Comparar stock vs ventas
4. Calcular días de inventario

**Ejemplo:**
```
Ventas mensuales promedio: 1,000 unidades
Stock en bodega: 3,200 unidades

Días inventario: (3,200 ÷ 1,000) × 30 = 96 días

Condición: Máximo 30 días
Resultado: NO cumple (96 > 30)
```

**Nota:** Validación manual (fuera del sistema actual)

**C. Validación de Productos Nuevos**

**Proceso:**
1. Identificar productos de lanzamiento
2. Verificar si cliente compró al menos uno
3. Marcar cumplimiento Sí/No

**Propuesta:**
- Pantalla de parametrización de productos lanzamiento
- Campos: Código producto, Fecha lanzamiento, Fecha fin consideración
- Validación automática contra ventas cliente

---

#### 8. **Resumen de Evaluación**

**Archivo Generado:** Resumen ejecutivo para gerencia

**Campos del Resumen:**

| Campo | Descripción |
|-------|-------------|
| Cliente | Nombre del cliente |
| Objetivo | Marcas / Montos |
| Meta | Valor/unidades objetivo |
| Real | Valor/unidades vendidas |
| % Cumplimiento | Real ÷ Meta |
| % Rebate Convenio | Porcentaje original |
| % Rebate Final | Porcentaje ajustado (si aplica) |
| Valor Reconocer | Monto a pagar |
| Devoluciones | % devoluciones |
| Inventario | Días de inventario |
| Productos Nuevos | Sí/No |
| Estado | Cumple/No Cumple |

**Uso:**
- Enviar a gerencia para aprobación
- Gerencia revisa condiciones
- Gerencia autoriza pago o rechaza

---

#### 9. **Modificación de Porcentajes (Excepciones)**

**Caso Real:**

**Situación:**
- Cliente objetivo: 2.5%
- Nivel devoluciones: 4% (excede 1.5%)
- Gerencia: NO autoriza pago con 2.5%

**Negociación:**
- Ventas negocia con gerencia
- Gerencia acepta pago reducido
- Nuevo porcentaje: 2.3% (en lugar de 2.5%)

**Razón:**
- Mantener relación comercial
- Cliente cumplió objetivo de ventas
- Penalización por incumplimiento de condición

**Requerimiento del Sistema:**
- Campo "% Rebate Final" editable
- Al modificar, recalcular valor a reconocer
- Recalcular distribución por producto
- Mantener historial de cambios
- Registrar motivo de modificación

---

#### 10. **Distribución por Producto**

**Objetivo:** Distribuir valor total entre productos vendidos

**Proceso:**

**Ejemplo: Rebate Montos**
```
Cliente: Cordespa
Ventas totales: $7,489,000
% Rebate: 1.5%
Valor total reconocer: $112,335

Distribución:
Producto A vendió: $500,000
Proporción: $500,000 ÷ $7,489,000 = 6.68%
Reconocimiento: $112,335 × 6.68% = $7,504

Producto B vendió: $300,000
Proporción: $300,000 ÷ $7,489,000 = 4.01%
Reconocimiento: $112,335 × 4.01% = $4,504

...
(Continuar para todos los productos)

Suma total: $112,335
```

**Archivo para Facturación:**
- Código producto
- Descripción producto
- Valor a reconocer por producto
- Total general

**Uso:** Gaby Cajas emite NC con detalle por producto

---

#### 11. **Correo a Facturación (Rebates)**

**Destinatario:** Gaby Cajas

**Asunto:** Solicitud NC - Rebate [Cliente] [Período]

**Contenido:**
```
Estimada Gaby,

Por favor proceder con emisión de NC para:
- Cliente: Cordespa
- Concepto: Rebate Objetivo Marcas - Semestre 1 2025
- Período: Enero-Junio 2025
- Valor: $112,335

Condiciones del plan:
- Objetivo: 113 unidades
- Real: 115 unidades
- % Cumplimiento: 102%
- % Rebate: 1.5%

Adjunto archivo Excel con distribución por producto.

Saludos cordiales.
```

**Archivos Adjuntos:**
- Excel con distribución por producto
- Resumen de evaluación (opcional)

---

### Plan Comercial GPF

#### 12. **Características del Plan**

**Cliente Exclusivo:** GPF (Farcomet)

**Tipo:** Plan especial con costos negociados por producto

**Mecánica:**
- Producto X: Costo negociado $5.00
- Kifatex factura a GPF: $8.66
- Diferencial: $8.66 - $5.00 = $3.66
- Bagó reconoce: $3.66 por unidad vendida

**Diferencia con Rebates:**
- No es por cumplimiento de objetivo
- Es por diferencial de precio
- Se liquida mensualmente
- Productos específicos en el plan

---

#### 13. **Registro de Productos del Plan**

**Archivo:** Lista de productos participantes

**Campos:**
- Código Bagó
- Código Kifatex
- Descripción producto
- Costo negociado
- Estado (Activo/Inactivo)
- Fecha ingreso al plan
- Fecha salida del plan (si aplica)

**Gestión de Cambios:**

**Productos que Ingresan:**
- Ventas negocia con GPF
- Rosita registra en sistema
- Fecha efectiva de ingreso
- Ejemplo: "Producto X ingresa desde Agosto 2025"

**Productos que Salen:**
- Ventas notifica salida
- Rosita marca como inactivo
- Fecha efectiva de salida
- Mantener historial

**Requerimiento:**
- Mantener historial de cambios
- Trazabilidad por mes
- Saber qué productos estaban activos en cada período

---

#### 14. **Recepción de Información GPF**

**Fuente:** Correo de Kifatex

**Archivo Recibido:**
- Orden de compra
- Fecha orden
- Fecha recepción GPF
- Código GPF (código interno)
- Código Bagó
- Descripción producto
- Unidades solicitadas
- Unidades entregadas
- Valor facturado Kifatex
- Diferencial solicitado
- Total a reconocer

**Ejemplo:**
```
Producto: Benci Ali
Unidades: 2,850
Precio Kifatex: $8.66
Costo negociado: $5.00
Diferencial: $3.66
Total: 2,850 × $3.66 = $10,431
```

---

#### 15. **Validación Producto por Producto**

**Proceso Manual Actual:**

**Paso 1: Cargar Reporte GPF**
- Archivo Excel enviado por Kifatex
- Guardar en carpeta del mes

**Paso 2: Consultar Ventas Kifatex**
- Query con ventas del mes
- Filtrar por cliente GPF
- Filtrar por producto

**Paso 3: Validar Unidades**
- Comparar unidades solicitadas vs vendidas
- Verificar fechas
- Detectar discrepancias

**Paso 4: Validar Precio**
- Verificar precio Kifatex facturado
- Comparar con costo negociado
- Calcular diferencial

**Paso 5: Calcular Valor**
```
Valor = Unidades × Diferencial
```

**Paso 6: Comparar con Solicitud**
- GPF solicita: $X
- Sistema calcula: $Y
- Si X = Y: Aprobar
- Si X ≠ Y: Investigar

**Caso Real - Producto Carvegi:**
```
Fecha Kifatex: 10 Abril
Fecha recepción GPF: 11 Abril
Unidades: 1,512

Fecha: 17 Abril
Unidades: 912

Fecha: 22 Abril
Unidades: -912 (regularización)

Análisis: Duplicación corregida
Decisión: Reconocer 1,512 (no 912 adicional)
```

---

#### 16. **Carga de Información GPF al Sistema**

**Propuesta:**
- Carga masiva de archivo Excel
- Formato estándar (plantilla)
- Validación automática de formato
- Campos obligatorios

**Validaciones:**
- Producto existe en plan
- Producto activo en el mes
- Costo negociado registrado
- Unidades > 0

---

#### 17. **Validación Automática (Plan GPF)**

**Validación 1: Producto en Plan**
- Verificar que producto esté en lista activa
- Verificar fecha efectiva
- Generar alerta si producto no está en plan

**Validación 2: Unidades vs Ventas Kifatex**
- Comparar unidades solicitadas vs query Kifatex
- Generar alerta si diferencia > 5%
- Permitir revisión manual

**Validación 3: Precio Kifatex**
- Validar precio facturado
- Comparar con histórico
- Alertar si variación significativa

**Validación 4: Costo Negociado**
- Verificar costo registrado en sistema
- Permitir modificación si cambió
- Mantener historial de cambios

**Validación 5: Cálculo Diferencial**
```
Diferencial = Precio Kifatex - Costo Negociado
Valor = Unidades × Diferencial
```

**Validación 6: Comparación con Solicitud**
- Comparar valor calculado vs solicitado
- Generar alerta si diferencia > $100
- Permitir ajuste manual con observación

---

#### 18. **Resumen de Liquidación (Plan GPF)**

**Campos:**
- Producto
- Unidades
- Precio Kifatex
- Costo negociado
- Diferencial
- Valor a reconocer

**Total General:** Suma de todos los productos

**Validación Final:**
- Total calculado vs total solicitado
- Diferencia aceptable: ±$50

---

#### 19. **Correo a Facturación (Plan GPF)**

**Destinatario:** Gaby Cajas

**Contenido:**
```
Estimada Gaby,

Por favor proceder con emisión de NC para:
- Cliente: GPF (Farcomet)
- Concepto: Plan Comercial - Abril 2025
- Valor: $348,500

Adjunto archivo Excel con detalle por producto.

Saludos cordiales.
```

**Archivo Adjunto:**
- Código producto
- Descripción producto
- Valor a reconocer

**Nota:** Gaby emite NC con total general (no detalle por producto en SAP)

---

### Requerimientos del Nuevo Sistema

#### 1. **Historia de Usuario: Carga Inicial Rebates**

**Como** usuario de Auditoría  
**Quiero** cargar plan de rebates desde plantilla  
**Para** evitar registro manual producto por producto

**Funcionalidad:**
- Plantilla Excel con formato estándar
- Carga masiva
- Validación de formato
- Confirmación de carga

**Criterios de Aceptación:**
- Validar campos obligatorios
- Detectar duplicados
- Permitir reemplazo o actualización
- Generar reporte de errores

---

#### 2. **Historia de Usuario: Evaluación de Rebates**

**Como** usuario de Auditoría  
**Quiero** evaluar cumplimiento de objetivos automáticamente  
**Para** agilizar proceso de evaluación

**Funcionalidad:**
- Seleccionar cliente
- Seleccionar período (trimestre/semestre/año)
- Sistema calcula cumplimiento
- Muestra progreso por mes
- Calcula valor a reconocer

**Criterios de Aceptación:**
- Aplicar filtros de motivos configurados
- Calcular unidades y valores
- Comparar vs objetivo
- Calcular porcentaje cumplimiento
- Aplicar % rebate correcto según nivel

---

#### 3. **Historia de Usuario: Validación de Condiciones**

**Como** usuario de Auditoría  
**Quiero** validar condiciones del plan  
**Para** determinar si se autoriza pago

**Condiciones a Validar:**
- Nivel de devoluciones
- Nivel de inventario (manual)
- Compra productos nuevos (manual)

**Criterios de Aceptación:**
- Calcular % devoluciones automáticamente
- Permitir excluir productos
- Mostrar resultado por condición
- Generar resumen de cumplimiento

---

#### 4. **Historia de Usuario: Modificación de Porcentajes**

**Como** usuario de Auditoría  
**Quiero** modificar % rebate final  
**Para** aplicar excepciones autorizadas

**Funcionalidad:**
- Campo editable "% Rebate Final"
- Recalcular valor automáticamente
- Recalcular distribución por producto
- Registrar motivo de cambio

**Criterios de Aceptación:**
- Permitir modificación manual
- Recalcular en tiempo real
- Mantener historial de cambios
- Generar observación obligatoria

---

#### 5. **Historia de Usuario: Distribución por Producto**

**Como** sistema  
**Quiero** distribuir valor total entre productos  
**Para** generar archivo para facturación

**Cálculo:**
```
Por cada producto:
Proporción = Ventas producto ÷ Ventas totales
Reconocimiento = Valor total × Proporción
```

**Criterios de Aceptación:**
- Calcular proporción automáticamente
- Distribuir valor total
- Validar suma = total
- Generar archivo Excel

---

#### 6. **Historia de Usuario: Plan Comercial GPF**

**Como** usuario de Auditoría  
**Quiero** validar liquidación GPF automáticamente  
**Para** reducir validación manual

**Funcionalidad:**
- Cargar archivo GPF
- Validar contra ventas Kifatex
- Calcular diferenciales
- Comparar con solicitud
- Generar alertas de discrepancias

**Criterios de Aceptación:**
- Validar producto en plan activo
- Comparar unidades ±5%
- Calcular diferencial automáticamente
- Generar alerta si diferencia > $100
- Permitir ajuste manual

---

#### 7. **Historia de Usuario: Gestión de Productos Plan GPF**

**Como** usuario de Ventas  
**Quiero** gestionar productos del plan  
**Para** mantener lista actualizada

**Funcionalidad:**
- Agregar producto al plan
- Modificar costo negociado
- Marcar producto como inactivo
- Consultar historial de cambios

**Criterios de Aceptación:**
- Registrar fecha efectiva de cambios
- Mantener historial completo
- Permitir consulta por período
- Validar productos activos en liquidación

---

### Decisiones Clave

1. **Carga Inicial:**
   - Plantilla Excel obligatoria
   - Formato estándar para todos los clientes
   - Validación estricta de campos

2. **Motivos de Venta:**
   - Configuración por cliente
   - Permitir venta neta o bruta
   - Mantener flexibilidad

3. **Validación de Condiciones:**
   - Devoluciones: Automática con exclusiones manuales
   - Inventario: Manual (fuera del sistema)
   - Productos nuevos: Parametrización + validación automática

4. **Modificación de Porcentajes:**
   - Permitir ajustes por excepciones
   - Requiere observación obligatoria
   - Recalcular automáticamente

5. **Plan GPF:**
   - Validación automática contra Kifatex
   - Alertas de discrepancias
   - Permitir ajustes manuales

---

### Casos Especiales Identificados

**1. Cliente con Devoluciones Altas:**
- Objetivo: 2.5%
- Devoluciones: 4% (excede 1.5%)
- Gerencia reduce a 2.3%
- Sistema debe permitir modificación

**2. Cumplimiento Parcial:**
- Objetivo anual: $1,000,000
- Cliente solicita pago trimestral
- Vendió $300,000 en trimestre
- Pagar proporcionalmente

**3. Producto Ingresa Mid-Year:**
- Producto ingresa en Agosto
- Solo considerar ventas Agosto-Diciembre
- No considerar Enero-Julio

**4. Cambio de Costo Negociado (GPF):**
- Costo original: $5.00
- Nuevo costo: $5.50 (desde Junio)
- Sistema debe usar costo correcto por fecha

---

### Notas Técnicas

- **Proceso más complejo:** Requiere múltiples validaciones
- **Importancia estratégica:** Mayor impacto económico
- **Configurabilidad crítica:** Cada cliente es diferente
- **Historial obligatorio:** Trazabilidad de todos los cambios
- **Integración SAP:** Distribución por producto necesaria

---

### Importancia del Proyecto

**Impacto Económico:**
- Millones de dólares en reconocimientos anuales
- Decisiones estratégicas de gerencia
- Relaciones comerciales con clientes clave

**Beneficios del Sistema:**
- Automatizar cálculos complejos
- Reducir errores manuales
- Agilizar evaluaciones
- Mejorar trazabilidad
- Facilitar toma de decisiones

**Próxima Presentación:**
- Presentar a Carlita (Finanzas)
- Solicitar aprobación del proyecto
- Priorización vs otros proyectos

---

## Transcripción 10/17 - Provisiones Detalladas, Reconocimiento Verdezoto y Franquiciados

**Fecha:** No especificada  
**Participantes:** Marixa, Rosita, Cintia

---

### Proceso de Provisiones (Continuación)

#### 1. **Contexto de Provisiones**

**Objetivo:** Informar valores para cierre mensual de ventas

**Ejemplo:**
- Estamos en Mayo
- Próxima semana: Cierre de ventas
- Necesario proyectar provisiones

**Razón:**
- Clientes atrasados en envío de información
- Ejemplo: Difar debe 3 meses (implementó SAP, tiene problemas)
- No se puede reconocer sin información
- Pero impacto contable debe registrarse

**Consecuencia de NO provisionar:**
- Mes que se reconozca: Impacto grande en un solo mes
- Distorsiona análisis de ventas
- Afecta evaluaciones económicas

---

#### 2. **Cálculo de Provisiones por Plan**

**Fuente de Datos:** Query de ventas Kifatex

**Proceso:**

**Paso 1: Actualizar Query**
- Ejecutar query con datos actualizados
- Ejemplo: 1 Mayo - 14 Mayo (datos hasta ayer)

**Paso 2: Crear Tabla Dinámica**
- Filtrar productos del plan
- Ver unidades vendidas en lo que va del mes

**Paso 3: Calcular Promedio 3 Meses**

**Ejemplo: Producto en Plan SEOI**
```
Historial:
Febrero: 1,200 unidades
Marzo: 1,150 unidades
Abril: 1,395 unidades

Promedio = (1,200 + 1,150 + 1,395) ÷ 3 = 1,248 unidades

Mayo (hasta el 14):
Real vendido: 1,669 unidades

Análisis:
1,669 > 1,248 (ya superó el promedio)
Decisión: NO provisionar (ya vendió más de lo esperado)
```

**Paso 4: Proyectar Unidades Faltantes**

**Ejemplo: Producto con ventas bajas**
```
Promedio 3 meses: 3,848 unidades
Mayo (hasta el 14): 3,768 unidades

Unidades faltantes: 3,848 - 3,768 = 80 unidades
Proyección: 3,768 + 80 = 3,848 unidades

Provisión: Valorar 3,848 unidades al costo
```

**Paso 5: Caso Sin Ventas en el Mes**

**Ejemplo: Producto sin movimiento**
```
Promedio 3 meses: 500 unidades
Mayo (hasta el 14): 0 unidades

Proyección: 0 + 500 = 500 unidades
Provisión: Valorar 500 unidades al costo
```

---

#### 3. **Provisiones por Tipo de Plan**

**A. Rebates Trimestrales**

**Situación:**
- Cliente ya liquidado en trimestre 1
- Ya se pagó Rebate Q1
- Ahora provisionar Q2

**Proceso:**
1. Identificar clientes con pago trimestral
2. Calcular avance Q2 (Abril-Mayo)
3. Si avance > 60%: Provisionar
4. Si avance < 60%: NO provisionar

**Ejemplo:**
```
Cliente: Cordespa
Objetivo Q2: $500,000
Avance (Abril + Mayo parcial): $385,000

% Avance: $385,000 ÷ $500,000 = 77%

Decisión: Provisionar (77% > 60%)
Cálculo: $385,000 × 1.5% = $5,775
```

**B. Rebates Semestrales**

**Situación:**
- Cliente NO cumplió Q1
- Esperando mejorar en semestre completo
- Provisionar si avance > 60%

**C. Rebates Anuales**

**Situación:**
- Cliente solicita pago anual
- Provisionar mensualmente según avance

---

#### 4. **Criterio de Avance 60%**

**Regla:** Solo provisionar si cliente tiene avance ≥ 60%

**Razón:**
- Si avance < 60%: Poco probable que cumpla
- Si avance ≥ 60%: Alta probabilidad de cumplimiento
- Evita provisiones innecesarias

**Cálculo de Avance:**
```
Avance % = Ventas reales ÷ Objetivo período × 100
```

**Aplicación:**
- Sistema calcula avance automáticamente
- Si ≥ 60%: Calcular provisión
- Si < 60%: NO provisionar

---

#### 5. **Actualización Mensual de Provisiones**

**Proceso:**

**Marzo (Ejemplo):**
```
Cliente: Cordespa
Objetivo Q1: $572,000 (mensual: $190,667)
Avance al 24 Marzo: $560,000 (98%)

Provisión Marzo: $560,000 × 1.5% = $8,400
```

**Abril:**
```
Cliente cumplió objetivo Q1
Se pagó Rebate Q1
Provisión Abril: $0 (ya se liquidó)

Ahora provisionar Q2:
Objetivo Q2: $572,000
Avance Abril: $150,000 (26%)
Decisión: NO provisionar (26% < 60%)
```

**Mayo:**
```
Avance Q2 (Abril + Mayo): $385,000 (67%)
Decisión: Provisionar
Provisión Mayo: $385,000 × 1.5% = $5,775
```

---

#### 6. **Resumen de Provisiones Interno**

**Objetivo:** Control interno por plan

**Estructura:**

**Por Plan:**
- Plan SEOI: $50,000
- Rebates: $80,000
- PMC: $120,000
- Cupones: $30,000
- **Total:** $280,000

**Detalle Rebates ($80,000):**
- Cliente A: $35,000
- Cliente B: $45,000

**Uso:**
- Control interno de Auditoría
- Seguimiento por tipo de promoción
- Análisis de tendencias

---

#### 7. **Resumen de Provisiones para Kifatex**

**Objetivo:** Notificar a Kifatex valores a provisionar

**Estructura:**

**Por Cliente (NO por plan):**
- Cliente A: $85,000
- Cliente B: $95,000
- Cliente C: $100,000
- **Total:** $280,000

**Diferencia con Resumen Interno:**
- Interno: Separado por plan
- Kifatex: Agrupado por cliente
- Mismo total, diferente agrupación

**Razón:**
- Kifatex no necesita saber detalle de planes
- Solo necesita total por cliente
- Simplifica su proceso

---

#### 8. **Bitácora de Provisiones**

**Información Registrada:**

**Por Cliente:**
- Nombre cliente
- Plan(es) participante(s)
- Período evaluado
- Objetivo
- Avance real
- % Avance
- Provisión calculada
- Estado: Trimestre/Semestre/Año

**Uso:**
- Rosita alimenta desde bitácora general
- Marixa valida cálculos
- Contraste de información
- Detección de diferencias

**Validación Cruzada:**
- Rosita calcula desde bitácora
- Marixa calcula desde queries
- Comparan resultados
- Resuelven diferencias

**Causas de Diferencias:**
- NC no cargada aún en sistema
- Movimientos adicionales
- Diferentes motivos de venta considerados

---

### Reconocimiento Verdezoto

#### 9. **Características del Plan**

**Cliente:** Distribuidora Verdezoto (Cuenca)

**Contexto:**
- Farmacia Farmasor (Cuenca)
- Pertenece a Bagó
- Kifatex NO vende directo a Farmasor
- Problema de cartera

**Solución:**
- Ventas negocia con distribuidor local (Verdezoto)
- Verdezoto compra a Kifatex
- Verdezoto vende a Farmasor
- Bagó reconoce descuento adicional a Verdezoto

**Mecánica:**
- NO es promoción tradicional
- Es reconocimiento por distribución
- Descuento adicional para Farmasor
- Bagó asume costo

---

#### 10. **Tabla de Descuentos Verdezoto**

**Fuente:** Área de Ventas

**Estructura:**

| Código Bagó | Producto | % Descuento Verdezoto | % Descuento Farmasor | Total |
|-------------|----------|----------------------|---------------------|-------|
| 12345 | Producto A | 5% | 10% | 15% |
| 67890 | Producto B | 3% | 8% | 11% |

**Uso:**
- Marixa recibe archivo de Verdezoto
- Valida contra tabla de descuentos
- Calcula reconocimiento

---

#### 11. **Proceso de Validación Verdezoto**

**Paso 1: Recibir Archivo**
- Verdezoto envía reporte mensual
- Productos vendidos a Farmasor
- Unidades
- Valores

**Paso 2: Validar Descuentos**

**Proceso:**
1. Identificar producto
2. Buscar en tabla de descuentos
3. Validar % Verdezoto
4. Validar % Farmasor
5. Calcular reconocimiento

**Ejemplo:**
```
Producto: X
Ventas: $10,000
% Verdezoto: 5%
% Farmasor: 10%

Verdezoto solicita: $1,500 (15%)

Validación:
Descuento Verdezoto: $10,000 × 5% = $500
Descuento Farmasor: $10,000 × 10% = $1,000
Total: $500 + $1,000 = $1,500 ✓

Decisión: Aprobar
```

**Paso 3: Detectar Diferencias**

**Causas:**
- Decimales en porcentajes
- Redondeos
- Productos nuevos sin % definido

**Solución:**
- Diferencias pequeñas ($5-$10): Ajustar
- Diferencias grandes: Investigar
- Productos nuevos: Solicitar % a Ventas

---

#### 12. **Archivo para Facturación (Verdezoto)**

**Formato:**
- Código Bagó
- Descripción producto
- Valor a reconocer
- Total general

**Proceso:**
- Marixa crea tabla dinámica
- Genera archivo Excel
- Envía a Gaby Cajas
- Gaby emite NC

---

### Franquiciados (Difar)

#### 13. **Características del Plan**

**Cliente:** Difar

**Contexto:**
- Difar tiene franquicias
- Franquicias: Super Maxi, Comisariato, El Rosado, etc.
- Cada franquicia tiene tabla de descuentos propia

**Complejidad:**
- Múltiples códigos de producto (Neptune, Zeus, Bagó)
- Múltiples tablas de descuentos
- Eventos especiales (ferias)

---

#### 14. **Códigos de Producto**

**Problema:** Cada sistema usa código diferente

**Códigos Existentes:**
- **Código Difar:** Neptune (sistema interno Difar)
- **Código Zeus:** Otro sistema Difar
- **Código Bagó:** Código estándar Bagó

**Ejemplo:**
```
Producto: Aspirina
Código Neptune: 12345
Código Zeus: 67890
Código Bagó: ASP001
```

**Necesidad:**
- Tabla de equivalencias
- Mapeo Neptune ↔ Zeus ↔ Bagó
- Sistema debe reconocer cualquier código

---

#### 15. **Tablas de Descuentos por Franquicia**

**A. Tabla General (Franquicias Estándar)**
- Aplica a franquicias sin tabla específica
- Descuentos estándar por producto

**B. Tabla Super Maxi**
- Descuentos específicos para Super Maxi
- Diferentes % que tabla general

**C. Tabla Comisariato**
- Descuentos específicos para Comisariato
- Diferentes % que tabla general

**D. Tabla Corporación El Rosado**
- Descuentos específicos para El Rosado
- Diferentes % que tabla general

**E. Tabla Ferias Especiales**
- Eventos temporales
- Ejemplo: Feria Marzo (por días específicos)
- Descuentos mayores durante feria
- Vigencia: Solo días de feria

---

#### 16. **Proceso de Validación Franquiciados**

**Paso 1: Recibir Archivo Difar**
- Difar envía reporte mensual
- Incluye: Código Neptune, Franquicia, Unidades, Valores

**Paso 2: Identificar Franquicia**
- Leer campo "Franquicia" en archivo
- Determinar tabla de descuentos aplicable

**Paso 3: Aplicar Tabla Correcta**

**Ejemplo:**
```
Producto: X
Franquicia: Super Maxi
Ventas: $5,000

Tabla General: 10%
Tabla Super Maxi: 12%

Usar: Tabla Super Maxi (12%)
Reconocimiento: $5,000 × 12% = $600
```

**Paso 4: Validar Fechas (Ferias)**

**Ejemplo Feria Marzo:**
```
Feria: 15-17 Marzo
Tabla Feria: 15% (solo esos días)
Tabla Normal: 10%

Ventas 15 Marzo: $1,000 → Aplicar 15%
Ventas 20 Marzo: $1,000 → Aplicar 10%
```

**Paso 5: Calcular Total**
- Sumar reconocimientos por producto
- Validar contra solicitud Difar
- Generar archivo para facturación

---

#### 17. **Plantilla de Carga Franquiciados**

**Propuesta:**

**Campos:**
- Código Referencia (001 = Difar)
- Código Producto Cadena (Neptune/Zeus)
- Código Producto Bagó
- Nombre Producto
- Franquicia
- % Descuento

**Proceso:**
1. Cargar plantilla con códigos equivalentes
2. Sistema mapea automáticamente
3. Aplica tabla de descuentos correcta
4. Calcula reconocimiento

**Beneficio:**
- Formato estándar
- Mapeo automático de códigos
- Aplicación correcta de tablas

---

#### 18. **Tabla de Equivalencias**

**Estructura Propuesta:**

| Código Referencia | Código Cadena | Código Bagó | Nombre Producto |
|-------------------|---------------|-------------|-----------------|
| 001 (Difar) | 12345 (Neptune) | ASP001 | Aspirina |
| 001 (Difar) | 67890 (Zeus) | ASP001 | Aspirina |
| 002 (Verdezoto) | VZ123 | ASP001 | Aspirina |

**Uso:**
- Sistema busca por Código Cadena
- Identifica Código Bagó equivalente
- Aplica descuentos correctos

**Mantenimiento:**
- Productos nuevos: Agregar a tabla
- Cambios de código: Actualizar tabla
- Historial de cambios

---

### Requerimientos del Nuevo Sistema

#### 1. **Historia de Usuario: Cálculo de Provisiones**

**Como** sistema  
**Quiero** calcular provisiones automáticamente  
**Para** cierre mensual contable

**Funcionalidad:**
- Calcular promedio 3 meses por producto
- Comparar vs ventas del mes actual
- Proyectar unidades faltantes
- Calcular avance % por cliente
- Provisionar solo si avance ≥ 60%

**Criterios de Aceptación:**
- Actualizar con datos hasta ayer
- Aplicar regla 60% automáticamente
- Calcular por plan y por cliente
- Generar resumen interno y para Kifatex

---

#### 2. **Historia de Usuario: Resumen Dual de Provisiones**

**Como** usuario de Auditoría  
**Quiero** generar dos tipos de resumen  
**Para** control interno y notificación Kifatex

**Resumen Interno:**
- Agrupado por plan
- Detalle por cliente dentro de cada plan
- Total por plan

**Resumen Kifatex:**
- Agrupado por cliente
- Total por cliente (sin detalle de planes)
- Total general

**Criterios de Aceptación:**
- Mismo total en ambos resúmenes
- Permitir exportar ambos
- Formato Excel

---

#### 3. **Historia de Usuario: Reconocimiento Verdezoto**

**Como** usuario de Auditoría  
**Quiero** validar reconocimiento Verdezoto automáticamente  
**Para** agilizar proceso

**Funcionalidad:**
- Cargar archivo Verdezoto
- Validar contra tabla de descuentos
- Calcular % Verdezoto + % Farmasor
- Comparar con solicitud
- Generar alertas de diferencias

**Criterios de Aceptación:**
- Tabla de descuentos parametrizable
- Validación automática de %
- Alerta si diferencia > $10
- Permitir ajuste manual

---

#### 4. **Historia de Usuario: Franquiciados Difar**

**Como** usuario de Auditoría  
**Quiero** procesar franquiciados automáticamente  
**Para** aplicar tablas correctas

**Funcionalidad:**
- Cargar archivo Difar
- Identificar franquicia por registro
- Aplicar tabla de descuentos correcta
- Validar fechas (ferias especiales)
- Calcular reconocimiento

**Criterios de Aceptación:**
- Mapeo automático de códigos (Neptune/Zeus/Bagó)
- Aplicar tabla según franquicia
- Validar fechas de ferias
- Generar archivo para facturación

---

#### 5. **Historia de Usuario: Tabla de Equivalencias**

**Como** sistema  
**Quiero** mapear códigos de diferentes sistemas  
**Para** identificar productos correctamente

**Funcionalidad:**
- Tabla de equivalencias por cliente
- Código Cadena ↔ Código Bagó
- Búsqueda bidireccional
- Mantenimiento de tabla

**Criterios de Aceptación:**
- Permitir agregar nuevos códigos
- Validar unicidad
- Mantener historial de cambios
- Búsqueda rápida

---

#### 6. **Historia de Usuario: Tablas de Descuentos Parametrizables**

**Como** usuario de Auditoría  
**Quiero** gestionar tablas de descuentos  
**Para** mantenerlas actualizadas

**Funcionalidad:**
- Crear tabla por cliente/franquicia
- Cargar desde Excel
- Modificar % descuentos
- Activar/desactivar tablas
- Tablas temporales (ferias)

**Criterios de Aceptación:**
- Carga masiva desde Excel
- Validación de formato
- Vigencia por fechas (ferias)
- Historial de cambios

---

### Decisiones Clave

1. **Provisiones:**
   - Regla 60% de avance obligatoria
   - Promedio 3 meses como base
   - Actualización mensual

2. **Resúmenes:**
   - Dual: Interno (por plan) + Kifatex (por cliente)
   - Mismo total, diferente agrupación
   - Ambos necesarios

3. **Verdezoto:**
   - Tabla de descuentos parametrizable
   - Validación automática
   - Permitir ajustes manuales

4. **Franquiciados:**
   - Tabla de equivalencias obligatoria
   - Tablas por franquicia
   - Tablas temporales para ferias

5. **Códigos:**
   - Mapeo automático Neptune/Zeus/Bagó
   - Tabla de equivalencias centralizada
   - Mantenimiento continuo

---

### Casos Especiales Identificados

**1. Cliente Atrasado 3 Meses:**
- Debe Febrero, Marzo, Abril
- Estamos en Mayo
- Provisionar 4 meses (Feb+Mar+Abr+May)

**2. Cliente Cumplió Trimestre:**
- Ya se pagó Q1
- Provisión Q1 = $0
- Iniciar provisión Q2

**3. Feria Especial (Marzo):**
- Días 15-17: Tabla feria (15%)
- Resto del mes: Tabla normal (10%)
- Sistema debe validar fechas

**4. Producto Nuevo Sin % Definido:**
- Verdezoto solicita reconocimiento
- Producto no está en tabla
- Solicitar % a Ventas
- Actualizar tabla

**5. Diferencias por Decimales:**
- Diferencia $5-$10: Aceptable
- Ajustar manualmente
- Registrar observación

---

### Notas Técnicas

- **Provisiones críticas:** Evitan impacto contable concentrado
- **Resumen dual necesario:** Control interno vs notificación externa
- **Códigos múltiples:** Complejidad de mapeo Neptune/Zeus/Bagó
- **Tablas dinámicas:** Cambios frecuentes por negociaciones
- **Ferias temporales:** Validación de fechas obligatoria

---

### Cierre de Levantamiento

**Estado:** Levantamiento de requerimientos completo

**Próximos Pasos:**
1. Revisar historias de usuario
2. Priorizar funcionalidades
3. Presentar a Carlita (Finanzas)
4. Solicitar aprobación del proyecto
5. Iniciar fase de diseño

**Agradecimientos:**
- Marixa y Rosita por tiempo y paciencia
- Cintia por facilitación
- Equipo por colaboración

---

## Transcripción 11/17 - Provisiones Detalladas, Estados de Cuenta y Automatización

**Fecha:** No especificada  
**Participantes:** Marixa, Rosita, Cintia, Orlando  
**Duración:** ~2.5 horas

---

### Proceso de Provisiones (Detalle Adicional)

#### 1. **Contexto y Responsabilidades**

**Responsable:** Marixa (Auditoría)

**Destinatario:** Mari (Finanzas)

**Plazo:** Máximo 22 de cada mes

**Razón del Plazo:**
- Mari tiene reunión de cierre de ventas
- Necesita cifra de provisiones para cierre contable
- A veces antes del 22 (según urgencia de Mari)

**Fuente de Información:**
- Bitácora de promociones
- Historial de liquidaciones
- Estados de cuenta de clientes

---

#### 2. **Construcción del Archivo de Provisiones**

**Fuente Principal:** Bitácora

**Importancia de la Bitácora:**
- Registro de todas las notificaciones de NC
- Control de cumplimiento por cliente
- Historial de liquidaciones

**Problema Común:**
- Clientes atrasados en envío de información
- Ejemplo: Difar debe Febrero, Marzo, Abril
- Estamos en Mayo: Provisionar 4 meses

---

#### 3. **Cálculo Detallado de Provisiones**

**Método A: Cliente con Estado de Cuenta**

**Ejemplo: Difar**
```
Difar envía estado de cuenta mensual
Solicita: $93,000

Provisión Mayo: $93,000 (valor solicitado)
No usar promedio, usar valor real solicitado
```

**Método B: Cliente SIN Estado de Cuenta**

**Paso 1: Calcular Promedio 3 Meses**
```
Febrero: $50,000
Marzo: $55,000
Abril: $52,000

Promedio = ($50,000 + $55,000 + $52,000) ÷ 3 = $52,333
```

**Paso 2: Determinar Meses Adeudados**
```
Cliente debe: Febrero, Marzo (2 meses)
Provisionar: Mayo (1 mes)

Total meses: 2 + 1 = 3 meses
```

**Paso 3: Calcular Provisión**
```
Provisión = Promedio × Meses adeudados
Provisión = $52,333 × 2 = $104,666 (meses atrasados)
Provisión Mayo = $52,333 × 1 = $52,333 (mes actual)

Total provisión Mayo: $104,666 + $52,333 = $157,000
```

**Método C: Cliente al Día**

**Ejemplo: Farcomet**
```
Cliente al día (no debe meses)
Solo provisionar próximo mes

Promedio 3 meses: $30,000
Provisión Mayo: $30,000 × 1 = $30,000
```

---

#### 4. **Casos Especiales de Provisiones**

**A. Promoción Nueva (Sin Historial)**

**Ejemplo: Promoción Lusca (Inició Abril)**
```
Historial disponible:
Marzo: $10,000
Abril: $12,000

Promedio = ($10,000 + $12,000) ÷ 2 = $11,000
Provisión Mayo: $11,000
```

**B. Promoción Nueva (Solo 1 Mes)**

**Ejemplo: Farmaenlace (Solo Marzo)**
```
Historial disponible:
Marzo: $8,000

Provisión Mayo: $8,000 (mismo valor)
```

**C. Promoción Nueva (Sin Datos)**

**Ejemplo: Botica Comunitarios Machal**
```
Historial disponible: Ninguno

Provisión Mayo: $0 (no se puede provisionar)
```

**D. Promoción Año Anterior (2024 → 2025)**

**Ejemplo: Cupones Trifamox**
```
Situación:
- Promoción activa en 2024
- 2025: No se recibió información aún
- Farmacia sigue aplicando cupones

Solución:
Promedio últimos 3 meses de 2024:
Octubre 2024: $15,000
Noviembre 2024: $18,000
Diciembre 2024: $16,000

Promedio = ($15,000 + $18,000 + $16,000) ÷ 3 = $16,333
Provisión Enero 2025: $16,333
```

---

### Estados de Cuenta

#### 5. **Estado de Cuenta Difar**

**Formato Recibido:** Excel

**Campos:**
- Referencia (código promoción interno Difar)
- Código promoción
- Fecha documento
- Fecha contabilización
- Fecha vencimiento
- Días de atraso
- Valor a reconocer
- Número de documento (interno Difar)
- Texto documento
- Asignación

**Ejemplo:**
```
Referencia: 10
Código: PMC_FEB_2025
Fecha: 28/02/2025
Valor: $45,000
```

**Proceso de Validación:**

**Paso 1: Recibir Estado de Cuenta**
- Difar envía archivo Excel
- Incluye todas las promociones activas

**Paso 2: Identificar Promociones**
- Leer campo "Nombre de Promoción"
- Cruzar con bitácora interna

**Paso 3: Validar Valores**

**Archivo de Control Marixa:**
- Columnas en magenta: Llenado manual
- Promociones con facturas
- Promociones con créditos
- Observaciones

**Ejemplo de Validación:**
```
Difar solicita PMC Febrero: $29,000
Marixa calculó: $29,000 ✓

Difar solicita PMC Marzo: $31,000
Marixa calculó: $31,000 ✓

Difar solicita PMC Abril: $33,000
Marixa calculó: $35,000 ✗ (Diferencia: $2,000)

Observación: Revisar con Natali (contacto Difar)
```

**Paso 4: Actualizar Provisión**

**Caso Real:**
```
Provisión original (sin estado cuenta): $70,000
Estado cuenta Difar: $93,000

Diferencia: $23,000
Acción: Actualizar provisión a $93,000
Razón: Valor real solicitado prevalece sobre promedio
```

**Paso 5: Comunicación con Cliente**
- Enviar observaciones a Natali (Difar)
- Resolver diferencias
- Confirmar valores finales

---

#### 6. **Estado de Cuenta GPF**

**Formato Recibido:** Excel (Muy básico)

**Campos:**
- Promoción (nombre genérico)
- Farcomet (valor)
- Econofar (valor)

**Ejemplo:**
```
Promoción: BICP
Farcomet: $17,373.30
Econofar: $37,327.82

Promoción: FARM
Farcomet: $5,000
Econofar: $8,500

Promoción: ACOAI
Farcomet: $12,000
Econofar: $15,000

Promoción: PMC
Farcomet: $20,000
Econofar: $25,000
```

**Problema:** Nombres genéricos, no códigos específicos

**Composición de Promociones:**

**BICP (Productos de Consumo):**
- VagoVid Solar
- Fontactive
- VagoVid Facial

**FARM (Farma):**
- Productos farmacéuticos varios

**ACOAI:**
- Plan SEOI

**PMC:**
- Plan PMC

---

#### 7. **Validación Estado de Cuenta GPF**

**Proceso:**

**Paso 1: Recibir Estado de Cuenta**
- GPF envía archivo mensual
- Valores por Farcomet y Econofar

**Paso 2: Identificar Promociones**
- BICP → Buscar en archivos de productos consumo
- FARM → Buscar en archivos farma
- ACOAI → Buscar en plan SEOI
- PMC → Buscar en plan PMC

**Paso 3: Abrir Archivos Correspondientes**
- GPF envía archivos comprimidos
- Por referencia (no por código)
- Ejemplo: Referencia 23.005

**Paso 4: Identificar Productos**

**Ejemplo:**
```
Referencia: 23.005
Archivo contiene: Trifamox

Marixa identifica: Promoción por cupón

Referencia: 3598-7
Archivo contiene: VagoVid

Marixa identifica: Productos consumo (BICP)
```

**Problema:** Proceso 100% manual

**Paso 5: Validar contra Secuencial NC**

**Archivo de Control Marixa:**
- Número NC Bagó
- Valor solicitado inicial
- Valor reconocido final
- Diferencia
- Observación

**Ejemplo:**
```
GPF solicita Fontactive: $699.87
Marixa reconoció: $380.00
Diferencia: $319.87

Observación: GPF envió solo parte de las unidades
Informado por correo
```

**Paso 6: Validar Fecha de Corte**

**Regla GPF:** Acepta NC hasta el 20 de cada mes

**Problema:**
```
Marixa envía solicitud: 18 Mayo
Gaby emite NC Bagó: 19 Mayo
Kifatex emite NC a GPF: 23 Mayo (TARDE)

Resultado:
GPF no registra en Mayo
Aparece como pendiente en estado cuenta
Pero NC ya fue emitida
```

**Solución:**
- Registrar observación
- Informar por correo
- GPF registrará en mes siguiente

---

#### 8. **Estado de Cuenta Farmaenlace**

**Formato Recibido:** Archivos separados por promoción

**Características:**
- NO envía estado de cuenta consolidado
- Envía archivos individuales
- Por correo

**Ejemplo:**
```
Correo 1: PMC_Marzo.xlsx
Correo 2: Cupones_Abril.xlsx
Correo 3: Descuentos_Mayo.xlsx
```

**Proceso:**
- Descargar cada archivo
- Identificar promoción por contenido
- Validar productos
- Calcular reconocimiento

---

#### 9. **Estado de Cuenta Farmaenlace (Detalle)**

**Campos Recibidos:**
- Referencia
- Producto
- Unidades
- Valor

**Proceso de Identificación:**

**Problema:** No especifica tipo de promoción

**Solución:**
1. Leer productos en archivo
2. Identificar promoción por producto
3. Aplicar condiciones correspondientes

**Ejemplo:**
```
Archivo recibe:
Producto: Trifamox
Unidades: 500

Marixa identifica: Cupón Trifamox ($10)
Reconocimiento: 500 × $10 = $5,000
```

---

### Códigos de Promoción

#### 10. **Necesidad Crítica de Estandarización**

**Problema Actual:**

**Difar:**
- Usa "Referencia" (10, 20, 38, etc.)
- Marixa identifica manualmente por experiencia

**GPF:**
- Usa nombres genéricos (BICP, FARM, ACOAI, PMC)
- Requiere abrir archivos para identificar productos

**Farmaenlace:**
- NO usa códigos
- Envía archivos separados sin identificador

**Consecuencia:**
- Proceso 100% manual
- Requiere experiencia de Marixa
- No escalable
- Propenso a errores

---

#### 11. **Propuesta de Solución: Código Único de Promoción**

**Objetivo:** Sistema genere código único por promoción

**Formato Propuesto:**
```
Código: PPPP-AAAA-NNNN

PPPP = Tipo de plan (PMC, CUP, REB, etc.)
AAAA = Año
NNNN = Secuencial

Ejemplos:
PMC-2025-0001 (PMC primera promoción 2025)
CUP-2025-0015 (Cupón Trifamox)
REB-2025-0003 (Rebate tercer cliente)
```

**Uso:**
1. Sistema genera código al crear promoción
2. Código se comunica a farmacias
3. Farmacias incluyen código en archivos
4. Sistema identifica automáticamente

**Beneficio:**
- Eliminación de identificación manual
- Mapeo automático promoción ↔ condiciones
- Escalable a nuevas farmacias
- Reducción de errores

---

#### 12. **Implementación de Códigos**

**Paso 1: Creación de Promoción**
- Usuario crea promoción en sistema
- Sistema asigna código automáticamente
- Código se muestra en pantalla

**Paso 2: Comunicación a Farmacias**
- Incluir código en correo de notificación
- Solicitar inclusión en archivos
- Ejemplo: "Campo 'Código Promoción': PMC-2025-0001"

**Paso 3: Validación de Carga**
- Sistema lee campo "Código Promoción"
- Busca en base de datos
- Aplica condiciones automáticamente

**Paso 4: Manejo de Excepciones**
- Si código no existe: Alerta
- Si código inválido: Alerta
- Permitir mapeo manual temporal

---

### Opciones de Automatización

#### 13. **Contexto de Automatización**

**Objetivo:** Reducir trabajo manual de carga de archivos

**Problema Actual:**
1. Recibir correo de farmacia
2. Descargar archivo
3. Abrir Excel
4. Copiar datos
5. Pegar en plantilla
6. Cargar al sistema

**Tiempo:** 15-30 minutos por farmacia por mes

**Volumen:** ~20 farmacias = 5-10 horas/mes

---

#### 14. **Opción 1: Plantillas Excel (Actual)**

**Descripción:**
- Farmacias envían archivos Excel
- Formato estándar definido por Bagó
- Marixa carga manualmente al sistema

**Ventajas:**
- Fácil de implementar
- No requiere autorización de farmacias
- Control total de Bagó

**Desventajas:**
- Requiere trabajo manual
- Propenso a errores de formato
- No escalable

**Decisión:** Implementar como primera fase

---

#### 15. **Opción 2: API (Integración Directa)**

**Descripción:**
- Bagó consume datos directamente de sistemas de farmacias
- Conexión automática a bases de datos
- Sin intervención manual

**Proceso:**
1. Farmacia autoriza acceso a su BD
2. Bagó desarrolla API de consumo
3. Sistema extrae datos automáticamente
4. Procesa sin intervención humana

**Ventajas:**
- 100% automático
- Sin errores de formato
- Tiempo real

**Desventajas:**
- Requiere autorización de farmacias
- Complejo de implementar
- Difar y GPF: Muy difícil (consultan a Perú)
- Tiempo de autorización: ~1 mes

**Decisión:** NO viable para grandes cadenas

**Posible para:** Farmacias pequeñas

---

#### 16. **Opción 3: Bots (RPA - Robotic Process Automation)**

**Descripción:**
- Bot lee correos automáticamente
- Descarga archivos adjuntos
- Extrae datos
- Carga al sistema

**Tecnología Propuesta:** N8N (herramienta de automatización)

**Proceso:**
1. Farmacia envía correo a `promociones@bago.com`
2. Bot detecta correo nuevo
3. Bot descarga archivo adjunto
4. Bot lee datos (si formato estándar)
5. Bot carga al sistema
6. Bot notifica a Marixa

**Ventajas:**
- Automatización sin autorización de farmacias
- Reduce trabajo manual significativamente
- Escalable

**Desventajas:**
- Requiere formatos estándar
- Costo de desarrollo
- Requiere mantenimiento

**Responsable:** Diana Cueva (Gestión de Bots en Bagó)

**Acción:** Consultar con Diana y Gaby Pachacama

**Decisión:** Evaluar como segunda fase

---

#### 17. **Comparación de Opciones**

| Aspecto | Plantillas | API | Bots |
|---------|-----------|-----|------|
| Automatización | Baja | Alta | Media-Alta |
| Costo | Bajo | Alto | Medio |
| Tiempo Implementación | Corto | Largo | Medio |
| Requiere Autorización | No | Sí | No |
| Escalabilidad | Baja | Alta | Alta |
| Mantenimiento | Bajo | Medio | Medio |

**Decisión Final:**
- **Fase 1:** Plantillas Excel (inmediato)
- **Fase 2:** Bots N8N (evaluar con Diana)
- **Fase 3:** API (solo farmacias pequeñas)

---

### Secuencial de Notas de Crédito

#### 18. **Control de Secuencial**

**Objetivo:** Trazabilidad completa de NC

**Información Registrada:**

**NC Bagó:**
- Número NC
- Fecha emisión
- Cliente
- Promoción (CÓDIGO)
- Valor
- Estado

**NC Kifatex:**
- Número NC Kifatex
- Fecha emisión Kifatex
- Valor Kifatex
- PDF NC Kifatex

**Validación:**
- Comparar valor Bagó vs Kifatex
- Detectar diferencias
- Generar alertas

---

#### 19. **Proceso de Emisión de NC**

**Paso 1: Marixa Solicita NC**
- Valida liquidación
- Genera archivo para Gaby Cajas
- Envía correo con código promoción

**Paso 2: Gaby Cajas Emite NC Bagó**
- Recibe archivo de Marixa
- Carga en plantilla SAP
- Emite NC en SAP
- Notifica a Marixa

**Paso 3: Kifatex Replica NC**
- Recibe NC de Bagó
- Emite NC a farmacia
- Envía PDF a Marixa

**Paso 4: Marixa Registra**
- Registra NC Bagó en secuencial
- Registra NC Kifatex en secuencial
- Valida valores
- Detecta diferencias

---

#### 20. **Validación de Diferencias NC**

**Caso 1: Valores Coinciden**
```
NC Bagó: $50,000
NC Kifatex: $50,000
Diferencia: $0 ✓
```

**Caso 2: Diferencias Menores**
```
NC Bagó: $50,000.00
NC Kifatex: $49,999.85
Diferencia: $0.15 (redondeo) ✓
```

**Caso 3: Diferencias Significativas**
```
NC Bagó: $50,000
NC Kifatex: $48,500
Diferencia: $1,500 ✗

Acción:
1. Alertar a Marixa
2. Investigar causa
3. Contactar Kifatex
4. Resolver diferencia
```

**Causas Comunes:**
- Productos duplicados
- Productos omitidos
- Errores de cálculo
- Problemas de sistema

---

### Reportes y Consultas

#### 21. **Reporte de Estado de Cuenta**

**Objetivo:** Consulta rápida por cliente

**Funcionalidad:**

**Filtros:**
- Cliente
- Período (desde - hasta)
- Promoción (opcional)

**Información Mostrada:**
- Promoción
- Mes
- Valor solicitado
- Valor reconocido
- NC Bagó
- NC Kifatex
- Diferencia
- Estado

**Ejemplo:**
```
Cliente: GPF
Período: Enero - Mayo 2025

Resultados:
PMC Enero: $45,000 solicitado, $45,000 reconocido, NC-001, NC-KIF-123 ✓
PMC Febrero: $48,000 solicitado, $46,500 reconocido, NC-002, NC-KIF-124, Dif: $1,500 ✗
BICP Marzo: $12,000 solicitado, $12,000 reconocido, NC-003, NC-KIF-125 ✓
```

**Uso:**
- Validación cruzada con estado cuenta cliente
- Detección de pendientes
- Análisis de diferencias

---

#### 22. **Reporte de Provisiones**

**Objetivo:** Generar archivo para Mari (Finanzas)

**Funcionalidad:**

**Filtros:**
- Mes de provisión
- Plan (opcional)

**Información Generada:**

**Por Plan:**
- PMC: $120,000
- Cupones: $30,000
- Rebates: $80,000
- SEOI: $50,000
- **Total:** $280,000

**Por Cliente:**
- Difar: $95,000
- GPF: $85,000
- Farmaenlace: $25,000
- Otros: $75,000
- **Total:** $280,000

**Exportar:** Excel

---

### Requerimientos del Nuevo Sistema

#### 1. **Historia de Usuario: Código de Promoción**

**Como** sistema  
**Quiero** generar código único por promoción  
**Para** identificación automática

**Funcionalidad:**
- Generar código al crear promoción
- Formato: PLAN-AÑO-SECUENCIAL
- Mostrar en pantalla
- Incluir en notificaciones

**Criterios de Aceptación:**
- Código único
- Secuencial por año
- No modificable
- Visible en todas las pantallas

---

#### 2. **Historia de Usuario: Carga de Archivos con Código**

**Como** usuario de Auditoría  
**Quiero** cargar archivos con código de promoción  
**Para** mapeo automático

**Funcionalidad:**
- Leer campo "Código Promoción"
- Buscar en base de datos
- Aplicar condiciones automáticamente
- Alertar si código no existe

**Criterios de Aceptación:**
- Validar código existe
- Mapear a promoción correcta
- Aplicar condiciones
- Generar alerta si inválido

---

#### 3. **Historia de Usuario: Estados de Cuenta**

**Como** usuario de Auditoría  
**Quiero** cargar estados de cuenta  
**Para** validación cruzada

**Funcionalidad:**
- Cargar archivo estado cuenta
- Identificar promociones
- Comparar vs liquidaciones
- Detectar diferencias

**Criterios de Aceptación:**
- Formato flexible
- Validación automática
- Alerta de diferencias > $100
- Exportar diferencias

---

#### 4. **Historia de Usuario: Secuencial de NC**

**Como** usuario de Auditoría  
**Quiero** registrar NC Bagó y Kifatex  
**Para** trazabilidad completa

**Funcionalidad:**
- Registrar NC Bagó automáticamente
- Cargar NC Kifatex (PDF)
- Comparar valores
- Detectar diferencias

**Criterios de Aceptación:**
- Registro automático NC Bagó
- Carga manual NC Kifatex
- Validación de valores
- Alerta si diferencia > $50

---

#### 5. **Historia de Usuario: Reporte Estado de Cuenta**

**Como** usuario de Auditoría  
**Quiero** consultar estado de cuenta por cliente  
**Para** validación cruzada

**Funcionalidad:**
- Filtrar por cliente
- Filtrar por período
- Mostrar promociones
- Mostrar NC emitidas
- Mostrar diferencias

**Criterios de Aceptación:**
- Filtros funcionales
- Información completa
- Exportar a Excel
- Resaltar diferencias

---

#### 6. **Historia de Usuario: Automatización con Bots (Fase 2)**

**Como** sistema  
**Quiero** integrar con bots N8N  
**Para** carga automática

**Funcionalidad:**
- Bot lee correos
- Bot descarga archivos
- Bot extrae datos
- Bot carga al sistema
- Bot notifica usuario

**Criterios de Aceptación:**
- Integración con N8N
- Validación de formato
- Notificación de errores
- Log de actividades

---

### Decisiones Clave

1. **Códigos de Promoción:**
   - Obligatorios en todas las promociones
   - Formato estándar PLAN-AÑO-SECUENCIAL
   - Comunicar a farmacias

2. **Automatización:**
   - Fase 1: Plantillas Excel
   - Fase 2: Bots N8N (evaluar)
   - Fase 3: API (solo farmacias pequeñas)

3. **Estados de Cuenta:**
   - Carga opcional
   - Validación cruzada
   - Alertas de diferencias

4. **Secuencial NC:**
   - Registro automático NC Bagó
   - Carga manual NC Kifatex
   - Validación de diferencias

5. **Reportes:**
   - Estado de cuenta por cliente
   - Provisiones por plan y por cliente
   - Exportar a Excel

---

### Casos Especiales Identificados

**1. Promoción Sin Historial:**
- Usar datos disponibles (1-2 meses)
- Si no hay datos: NO provisionar

**2. Promoción Año Anterior:**
- Usar últimos 3 meses año anterior
- Actualizar cuando llegue información año actual

**3. Cliente Atrasado Múltiples Meses:**
- Multiplicar promedio × meses adeudados
- Ejemplo: 3 meses × $50K = $150K

**4. Diferencia NC Bagó vs Kifatex:**
- Alerta si > $50
- Investigar causa
- Contactar Kifatex

**5. NC Fuera de Fecha de Corte (GPF):**
- Registrar observación
- Informar por correo
- Cliente registrará mes siguiente

---

### Notas Técnicas

- **Códigos críticos:** Sin códigos, no hay automatización posible
- **Bots N8N:** Requiere evaluación con Diana Cueva
- **API:** Solo viable para farmacias pequeñas
- **Estados de cuenta:** Formatos muy diversos, difícil estandarizar
- **Secuencial NC:** Crítico para trazabilidad y auditoría

---

### Próximos Pasos

1. **Reunión con Gaby Cajas:** Proceso de emisión NC en SAP
2. **Reunión con Diana Cueva:** Evaluación de bots N8N
3. **Definir plantillas estándar:** Para todas las farmacias
4. **Comunicar códigos:** A farmacias activas
5. **Desarrollar Fase 1:** Sistema con plantillas Excel

---

## Transcripción 12/17 - Reunión con Gaby Cajas (Facturación) - Proceso SAP

**Fecha:** No especificada  
**Participantes:** Marixa, Rosita, Cintia, Orlando, Gaby Cajas, Paulina  
**Duración:** ~2 horas

---

### Contexto de la Reunión

**Objetivo:** Levantar requerimientos de Facturación para automatización

**Participantes Clave:**
- **Gaby Cajas:** Asistente de Facturación (emisión NC en SAP)
- **Paulina:** Facturación
- **Marixa/Rosita:** Auditoría (solicitan NC)
- **Cintia/Orlando:** TI (levantamiento de requerimientos)

**Alcance:**
- Proceso de emisión de NC en SAP
- Plantillas y formatos
- Códigos de descuento
- Transacciones SAP
- Automatización propuesta

---

### Proceso Actual de Emisión de NC

#### 1. **Recepción de Solicitud**

**Fuentes:**
- Correo de Marixa
- Correo de Rosita
- Correo CRM

**Formato Recibido:**
- Excel con diferentes formatos
- Cada usuario envía formato diferente

**Ejemplo Marixa:**
- Código producto
- Valor a reconocer

**Ejemplo Rosita:**
- Formato diferente

**Problema:** Formatos inconsistentes

---

#### 2. **Plantilla de Carga SAP**

**Descripción:** Plantilla Excel diseñada para carga automática en SAP

**Beneficio:** Evita digitación manual

**Proceso Actual:**
1. Recibir Excel de Marixa/Rosita
2. Descargar plantilla SAP
3. Copiar código producto
4. Copiar valor
5. Cambiar clase y tipo de documento
6. Guardar
7. Cargar en SAP

**Problema:** Proceso uno por uno (no masivo)

---

#### 3. **Campos de la Plantilla**

**Campos Obligatorios:**

**1. Código Producto SAP:**
- Debe incluir ceros a la izquierda
- Ejemplo: 0000012345 (10 dígitos)
- Si falta cero: NO carga

**2. Valor:**
- Monto a reconocer
- Ejemplo: $398.89

**3. Condición de Descuento:**
- Código que identifica tipo de plan
- Ejemplos:
  - ZD01: PMC
  - ZD08: Semana de Descuentos
  - ZD12: Volumen de Compras
  - ZD19: Modificación
  - Etc.

**4. Motivo de Rechazo:**
- Código que identifica razón comercial
- Ejemplos:
  - Z32: Volumen de compras
  - Z02: Otro motivo
  - Etc.

**5. Cliente Final:**
- A quién va dirigida la NC
- Ejemplo: Medica Pharma

**6. Plan Comercial:**
- Nombre del plan
- Ejemplo: Medicación Continua

**7. Asunto del Correo:**
- Secuencial interno
- Número de NC interno
- Descripción

---

#### 4. **Relación Condición de Descuento ↔ Motivo de Rechazo**

**Importante:** Cada condición tiene su motivo asociado

**Tabla de Relaciones:**

| Condición Descuento | Motivo Rechazo | Plan |
|---------------------|----------------|------|
| ZD01 | Z32 | PMC |
| ZD08 | Z02 | Semana Descuentos |
| ZD12 | Z32 | Volumen Compras |
| ZD19 | Z05 | Modificación |

**Problema:** Gaby debe conocer estas relaciones de memoria

**Solución Propuesta:** Sistema asigna automáticamente

---

#### 5. **Códigos en SAP KE30**

**Transacción:** KE30 (Reporte de ventas)

**Estructura:**
- Comercial 01: PMC
- Comercial 02: Cupones
- Comercial 03: Semana Descuentos
- Comercial 18: Volumen Compras
- Etc.

**Problema Identificado:**
- Cupones aparece como una sola línea
- Pero existen múltiples tipos:
  - Cupón Trifamox
  - Cupón Novo Morav
  - Cupón Letti

**Necesidad de Marixa:**
- Abrir detalle por tipo de cupón
- Trazabilidad específica
- Evaluación individual

**Solución:**
- Crear subcódigos dentro de Cupones
- Ejemplo: Comercial 02.01 (Trifamox), 02.02 (Novo Morav)
- Requiere coordinación con Cata (dueña de KE30)

---

#### 6. **Generación de Archivo TXT**

**Proceso:**

**Paso 1: Llenar Plantilla**
- Copiar datos de solicitud
- Pegar en plantilla
- Cambiar condición y motivo

**Paso 2: Generar TXT**
- Plantilla tiene macro
- Al guardar, genera archivo TXT automáticamente
- Ubicación: Mis Documentos

**Paso 3: Nombrar Archivo**
- Formato: AAAAMMDD-N.txt
- Ejemplo: 20250521-1.txt
- Si hay segundo archivo mismo día: 20250521-2.txt

**Contenido TXT:**
- Formato específico para SAP
- Campos separados por delimitadores
- Listo para carga automática

---

#### 7. **Carga en SAP**

**Paso 1: Mover Archivo**
- Origen: Mis Documentos
- Destino: Carpeta "Pendientes" en SAP
- Ruta: (Específica de SAP)

**Paso 2: Interfaz SAP**
- SAP lee carpeta "Pendientes" automáticamente
- Procesa archivos TXT
- Genera solicitud de pedido

**Paso 3: Transacción ZSD_CUENTAS_0**
- Gaby ejecuta transacción
- Sube archivo
- SAP procesa

**Resultado:** Solicitud de pedido creada

---

#### 8. **Procesamiento de Solicitud**

**Transacción:** ZSD_CUENTAS_0

**Proceso:**

**Paso 1: Cargar Archivo**
- Seleccionar archivo TXT
- Subir a SAP

**Paso 2: Generar Solicitud**
- SAP crea solicitud de pedido
- Asigna número de solicitud
- Ejemplo: 600XXXXX

**Paso 3: Completar Datos Manualmente**
- Ir a "Ver Cabecera"
- Llenar campos:
  - Tipo de documento que afecta
  - Fecha de documento que afecta
  - Motivo de rechazo
  - Cliente final
  - Plan comercial

**Paso 4: Procesar**
- Guardar solicitud
- SAP genera NC

---

#### 9. **Emisión de Nota de Crédito**

**Resultado:** NC emitida en SAP

**Número de NC:**
- SAP asigna número automáticamente
- Ejemplo: 900XXXXX

**Descarga:**
- Gaby descarga PDF de NC
- NC lista para enviar

---

#### 10. **Envío a Kifatex**

**Destinatarios:**
- Ivonne Pérez (actual)
- Eric Busca (nuevo responsable)

**Contenido del Correo:**

**Asunto:**
```
NC [Número] - [Cliente] - [Plan]
```

**Cuerpo:**
```
Estimados,

Se ha emitido la siguiente Nota de Crédito:

- Número NC: 900XXXXX
- Cliente: Medica Pharma
- Plan: PMC
- Valor: $398.89

Adjunto:
- PDF Nota de Crédito Bagó
- Excel solicitud original (excepto planes confidenciales)

Saludos cordiales.
```

**Archivos Adjuntos:**
1. PDF NC Bagó
2. Excel solicitud (si NO es plan confidencial)

**Planes Confidenciales:**
- Plan SEOI
- Plan AC
- NO enviar Excel (solo PDF NC)

**Razón:** Información confidencial de costos

---

#### 11. **Recepción de NC Kifatex**

**Proceso:**

**Paso 1: Kifatex Procesa**
- Recibe NC Bagó
- Genera NC Kifatex
- Envía PDF a Gaby

**Paso 2: Gaby Recibe**
- PDF con NC Kifatex
- Número de documento interno Kifatex

**Paso 3: Registrar en SAP**
- Transacción: BF02
- Buscar solicitud original (900XXXXX)
- Ir a "Ver Cabecera"
- Campo: "Texto Cabecera"
- Pegar número documento interno Kifatex

**Paso 4: Guardar**
- SAP registra NC Kifatex
- Proceso completo

---

#### 12. **Validación Cruzada**

**Objetivo:** Asegurar que NC Bagó = NC Kifatex

**Campos a Validar:**
- Número NC Bagó
- Número NC Kifatex (documento interno)
- Valor NC Bagó
- Valor NC Kifatex
- Cliente
- Productos

**Responsable:** Marixa (Auditoría)

**Proceso:**
- Marixa recibe notificación de Gaby
- Marixa recibe PDF NC Kifatex
- Marixa valida valores
- Marixa registra en secuencial

---

### Propuesta de Automatización

#### 13. **Historia de Usuario 1: Generación de Plantilla**

**Título:** Registro y Creación de TXT para Generación de NC

**Como** usuario de Facturación  
**Quiero** que el sistema genere plantilla automáticamente  
**Para** evitar copiar y pegar datos

**Funcionalidad:**
1. Marixa/Rosita completan liquidación en sistema
2. Sistema genera plantilla con datos:
   - Código producto SAP (con ceros)
   - Valor
   - Condición descuento (automática según plan)
   - Motivo rechazo (automático según plan)
   - Cliente final
   - Plan comercial
   - Asunto (secuencial interno)
3. Sistema genera archivo TXT
4. TXT listo para carga

**Criterios de Aceptación:**
1. Plantilla contiene 7 campos obligatorios
2. Código producto con formato correcto (10 dígitos)
3. Condición y motivo asignados automáticamente
4. TXT generado con formato SAP
5. Archivo nombrado correctamente (AAAAMMDD-N.txt)

---

#### 14. **Historia de Usuario 2: Carga Automática en SAP**

**Título:** Generación de Solicitud de Pedido en SAP

**Como** usuario de Facturación  
**Quiero** que archivo TXT se cargue automáticamente  
**Para** evitar mover archivos manualmente

**Funcionalidad:**
1. Sistema genera TXT
2. Sistema copia TXT a carpeta "Pendientes" SAP
3. Interfaz SAP procesa automáticamente
4. Transacción ZSD_CUENTAS_0 ejecutada
5. Solicitud de pedido generada
6. Sistema notifica a Gaby

**Criterios de Aceptación:**
1. Archivo TXT cargado en carpeta "Pendientes"
2. Interfaz SAP procesa sin errores
3. Solicitud de pedido creada
4. Correo de notificación enviado a facturacion@bago.com
5. Número de solicitud visible en sistema

---

#### 15. **Historia de Usuario 3: Registro NC Kifatex**

**Título:** Registro de NC Kifatex con Bot

**Como** usuario de Facturación  
**Quiero** que bot lea correo de Kifatex automáticamente  
**Para** evitar registro manual

**Funcionalidad:**
1. Kifatex envía correo con PDF NC
2. Bot lee correo
3. Bot descarga PDF
4. Bot extrae número documento interno
5. Bot actualiza SAP (transacción BF02)
6. Bot llena campo "Texto Cabecera"
7. Bot notifica a Gaby y Marixa

**Criterios de Aceptación:**
1. Bot detecta correo de Kifatex
2. Bot extrae número documento interno del PDF
3. Bot actualiza campo en SAP
4. Validación: Número registrado correctamente
5. Notificación enviada

**Tecnología:** Bot N8N

**Responsables:** Diana Cueva, Gaby Pachacama

---

### Desafíos Identificados

#### 16. **Desafío 1: Carga Masiva**

**Problema Actual:**
- Gaby procesa NC una por una
- Ejemplo: 20 NC/día = 20 archivos TXT
- Tiempo: ~30 minutos

**Solución Ideal:**
- Un solo archivo TXT con múltiples NC
- Carga masiva en SAP

**Investigación:**
- Consultar con Jorge (Logística)
- Jorge también carga uno por uno
- Confirmar si existe carga masiva

**Decisión:**
- Si existe carga masiva: Implementar
- Si NO existe: Mantener uno por uno (pero automatizado)

---

#### 17. **Desafío 2: Carpeta Compartida SAP**

**Problema:**
- Carpeta "Pendientes" compartida con otros procesos
- Ejemplo: Isa Zapata (Medicamentos)
- Riesgo de conflictos

**Solución:**
- Coordinar con Isa Zapata
- Definir convención de nombres
- O crear carpeta separada

---

#### 18. **Desafío 3: Lectura de PDF por Bot**

**Pregunta:** ¿Bot puede leer PDF de Kifatex?

**Respuesta:** Sí, con limitaciones

**Proceso:**
1. Bot descarga PDF
2. Bot extrae texto (OCR si necesario)
3. Bot busca patrón "Documento: XXXXX"
4. Bot extrae número

**Consideración:**
- Formato PDF debe ser consistente
- Si Kifatex cambia formato: Bot falla

**Alternativa:**
- Solicitar a Kifatex campo adicional en correo
- Ejemplo: "Número Documento: XXXXX" en asunto

---

### Campos SAP Identificados

#### 19. **Campos Críticos**

**Campo 1: Código Producto**
- Nombre SAP: Material
- Formato: 10 dígitos con ceros
- Ejemplo: 0000012345

**Campo 2: Condición de Descuento**
- Nombre SAP: Condición
- Valores: ZD01, ZD08, ZD12, etc.

**Campo 3: Motivo de Rechazo**
- Nombre SAP: Motivo
- Valores: Z32, Z02, Z05, etc.

**Campo 4: Texto Cabecera**
- Nombre SAP: Texto Cabecera
- Uso: Número documento interno Kifatex
- Transacción: BF02

**Campo 5: Cliente Final**
- Nombre SAP: (A definir)
- Uso: Identificar destinatario final

**Campo 6: Plan Comercial**
- Nombre SAP: (A definir)
- Uso: Identificar tipo de plan

---

### Integración con Proceso Completo

#### 20. **Flujo End-to-End**

**Paso 1: Marixa Liquida Promoción**
- Valida condiciones
- Calcula valores
- Genera solicitud NC

**Paso 2: Sistema Genera Plantilla**
- Crea archivo TXT
- Asigna códigos automáticamente

**Paso 3: Sistema Carga en SAP**
- Copia a carpeta "Pendientes"
- Interfaz SAP procesa
- Genera solicitud pedido

**Paso 4: Gaby Completa Datos**
- Llena campos manuales
- Procesa solicitud
- Emite NC

**Paso 5: Gaby Envía a Kifatex**
- Descarga PDF
- Envía correo con adjuntos

**Paso 6: Bot Registra NC Kifatex**
- Lee correo de Kifatex
- Extrae número documento
- Actualiza SAP

**Paso 7: Marixa Valida**
- Recibe notificación
- Valida valores
- Registra en secuencial

---

### Decisiones Clave

1. **Plantilla Automática:**
   - Sistema genera desde liquidación
   - NO requiere intervención de Marixa/Rosita

2. **Códigos Automáticos:**
   - Sistema asigna condición y motivo
   - Basado en tipo de plan

3. **Carga SAP:**
   - Automática a carpeta "Pendientes"
   - Interfaz SAP procesa

4. **Bot para NC Kifatex:**
   - Evaluar con Diana Cueva/Gaby Pachacama
   - Fase 2 de automatización

5. **Campos Manuales:**
   - Gaby sigue llenando:
     - Tipo documento que afecta
     - Fecha documento que afecta
   - Evaluar automatización futura

---

### Próximos Pasos

1. **Reunión con Diana Cueva/Gaby Pachacama:**
   - Evaluar viabilidad de bots
   - Estimar costos
   - Definir alcance

2. **Coordinación con Isa Zapata:**
   - Carpeta compartida SAP
   - Convención de nombres

3. **Coordinación con Cata:**
   - Modificación KE30
   - Nuevos códigos para cupones

4. **Definir Campos SAP:**
   - Nombres técnicos exactos
   - Validar con Peter (TI SAP)

5. **Documentar Relaciones:**
   - Condición ↔ Motivo
   - Plan ↔ Código

---

### Casos Especiales

**1. Planes Confidenciales:**
- SEOI y AC
- NO enviar Excel a Kifatex
- Solo PDF NC

**2. Múltiples NC Mismo Día:**
- Nombrar archivos: -1, -2, -3, etc.
- Evitar duplicados

**3. NC con Múltiples Productos:**
- Un solo archivo TXT
- Múltiples líneas de producto

**4. Corrección de NC:**
- Si error en NC emitida
- Proceso de reversión (no cubierto)

---

### Notas Técnicas

- **Transacción ZSD_CUENTAS_0:** Carga de archivos TXT
- **Transacción BF02:** Registro NC Kifatex
- **Transacción KE30:** Reporte de ventas
- **Carpeta Pendientes:** Interfaz SAP automática
- **Formato TXT:** Específico de SAP (delimitadores)
- **Bot N8N:** Lectura de correos y PDFs

---

### Reunión con Will Aragón (Pendiente)

**Tema:** Carga de provisiones en SAP

**Fecha Propuesta:** 27 (5-6 PM, primeros 15 minutos)

**Objetivo:**
- Entender proceso de carga de provisiones
- Validar si requiere automatización
- Definir historias de usuario

---

## Transcripción 13/17 - Reunión con Peter (TI SAP) - Integración Técnica

**Fecha:** No especificada  
**Participantes:** Marixa, Rosita, Cintia, Orlando, Gaby Cajas, Paulina, Peter (TI SAP), Luis  
**Duración:** ~45 minutos

---

### Contexto de la Reunión

**Objetivo:** Definir integración técnica con SAP

**Participantes Clave:**
- **Peter:** Líder Técnico SAP
- **Gaby Cajas:** Facturación (usuario final)
- **Marixa/Rosita:** Auditoría (generan solicitudes)
- **Cintia/Orlando:** TI (coordinación)

**Temas Críticos:**
- Opciones de automatización
- Segregación de funciones
- Integración con Kifatex
- Proceso de emisión masiva de NC

---

### Proceso Actual - Registro NC Kifatex

#### 1. **Contexto del Problema**

**Situación Actual:**

**Paso 1: Gaby Emite NC Bagó**
- Procesa solicitud de Marixa
- Genera NC en SAP
- Número: 900XXXXX

**Paso 2: Gaby Envía a Kifatex**
- Correo con PDF NC
- Kifatex recibe

**Paso 3: Kifatex Replica NC**
- Genera NC Kifatex
- Envía PDF a Gaby

**Paso 4: Gaby Registra Manualmente**
- Recibe correo de Kifatex
- Abre PDF
- Copia número documento interno
- Va a SAP transacción BF02
- Busca NC Bagó (900XXXXX)
- Pega número Kifatex
- Guarda

**Problema:** 100% manual, repetitivo

**Volumen:** ~100 NC/mes

**Tiempo:** ~5 minutos por NC = 8 horas/mes

---

#### 2. **Propuesta Inicial: Bot**

**Descripción:**
- Bot lee correo de Kifatex
- Bot descarga PDF
- Bot extrae número documento
- Bot actualiza SAP (BF02)

**Ventaja:**
- Automatización completa
- Sin intervención de Gaby

**Desventaja:**
- Costo de desarrollo
- Mantenimiento
- Susceptible a cambios de formato

---

#### 3. **Propuesta Peter: Integración Nativa**

**Alternativa Sugerida:**

**Opción A: Archivo de Kifatex**
- Kifatex envía archivo (TXT/Excel)
- Contiene: NC Bagó ↔ NC Kifatex
- Sistema lee archivo automáticamente
- Actualiza SAP sin intervención

**Opción B: API Kifatex**
- Consumir datos directamente de Kifatex
- Integración en tiempo real
- Sin archivos intermedios

**Ventaja:**
- Más natural y robusto
- Menos susceptible a cambios
- Menor costo de mantenimiento

**Desventaja:**
- Requiere negociación con Kifatex
- Tiempo de implementación

**Decisión:** Evaluar con Kifatex

---

### Integración SAP - Emisión de NC

#### 4. **Propuesta Técnica de Peter**

**Objetivo:** Automatizar generación masiva de NC

**Arquitectura Propuesta:**

**Componente 1: Sistema de Liquidación (Nuevo)**
- Marixa/Rosita liquidan promociones
- Sistema valida condiciones
- Sistema genera solicitudes de NC
- Datos almacenados en BD

**Componente 2: Transacción SAP (Nueva)**
- Pantalla para Gaby Cajas
- Lista de NC pendientes
- Gaby selecciona NC a procesar
- Un click: Genera orden + NC

**Componente 3: Integración**
- API/Servicio entre sistema nuevo y SAP
- Consume datos de liquidación
- Genera NC en SAP automáticamente

---

#### 5. **Flujo Propuesto por Peter**

**Paso 1: Liquidación (Marixa/Rosita)**
- Completan liquidación en sistema nuevo
- Validan condiciones
- Aprueban para emisión

**Paso 2: Transferencia a SAP**
- Sistema nuevo envía datos a SAP vía API
- SAP recibe y almacena
- NO genera NC aún

**Paso 3: Procesamiento (Gaby)**
- Gaby abre transacción SAP
- Ve lista de NC pendientes
- Selecciona NC a procesar
- Click en "Ejecutar"

**Paso 4: Generación Automática**
- SAP genera orden (600XXXXX)
- SAP genera NC (900XXXXX)
- Todo en un solo paso

**Paso 5: Notificación**
- Sistema notifica a Gaby
- Muestra número de NC generada
- Gaby puede descargar PDF

---

#### 6. **Comparación con Proceso Actual**

**Proceso Actual:**
1. Gaby recibe Excel de Marixa
2. Gaby copia datos a plantilla
3. Gaby genera archivo TXT
4. Gaby carga TXT a carpeta Pendientes
5. Gaby ejecuta transacción ZSD_CUENTAS_0
6. SAP genera orden (600XXXXX)
7. Gaby completa datos manualmente
8. Gaby procesa orden
9. SAP genera NC (900XXXXX)

**Tiempo:** ~10 minutos por NC

**Proceso Propuesto:**
1. Gaby abre transacción SAP
2. Gaby selecciona NC pendientes
3. Gaby click "Ejecutar"
4. SAP genera orden + NC automáticamente

**Tiempo:** ~1 minuto por lote de NC

**Ahorro:** 90% de tiempo

---

### Segregación de Funciones

#### 7. **Debate: ¿Quién Emite la NC?**

**Posición 1: Automatización Completa**

**Propuesta:** Marixa aprueba → NC se genera automáticamente

**Ventaja:**
- Máxima eficiencia
- Sin intervención manual

**Desventaja:**
- Auditoría estaría emitiendo NC
- Violación de segregación de funciones

---

**Posición 2: Control Intermedio (Peter)**

**Propuesta:** Marixa aprueba → Gaby ejecuta → NC se genera

**Ventaja:**
- Segregación de funciones respetada
- Gaby mantiene control
- Doble validación

**Desventaja:**
- Requiere intervención de Gaby

---

**Posición 3: Analogía Orden de Compra (Paulina)**

**Argumento:**
- Kifatex pone orden en repositorio
- SAP procesa automáticamente
- Gaby solo ejecuta transacción
- ¿Por qué NC debe ser diferente?

**Contraargumento (Peter):**
- Orden de compra: Kifatex es externo
- NC: Auditoría es interno
- Requiere control adicional

---

#### 8. **Decisión Final: Control Intermedio**

**Acuerdo:**
- Marixa/Rosita liquidan y aprueban
- Sistema transfiere datos a SAP
- Gaby ejecuta emisión desde SAP
- Gaby mantiene responsabilidad

**Razón:**
- Respeta segregación de funciones
- Auditoría NO emite NC directamente
- Facturación mantiene control
- Doble validación

**Beneficio:**
- Automatización significativa
- Control preservado
- Trazabilidad clara

---

### Notificación a Clientes

#### 9. **Proceso Actual de Notificación**

**Email de Gaby a Kifatex:**

**Destinatarios:**
- Kifatex (Ivonne Pérez/Eric Busca)
- Cliente final (copia)

**Contenido:**
- Número NC Bagó
- Cliente
- Plan
- Valor
- PDF NC
- Excel solicitud (si no es confidencial)

**Problema Identificado:**
- ¿Cómo se mantiene esta notificación con automatización?

---

#### 10. **Solución Propuesta**

**Opción A: Email Automático desde SAP**
- Al generar NC, SAP envía email automático
- Plantilla predefinida
- Adjunta PDF NC

**Opción B: Email desde Sistema Nuevo**
- Sistema nuevo detecta NC generada
- Envía notificación
- Incluye datos de NC

**Decisión:** Evaluar viabilidad técnica

---

### Integración con Kifatex

#### 11. **Template para Kifatex**

**Contexto:**
- Kifatex también está automatizando
- Requieren formato específico
- Actualmente copian y pegan de Excel

**Necesidad:**
- Definir formato estándar
- Columnas: Código producto, nombre, valor
- Generar archivo automáticamente

**Problema Identificado (Cintia):**
- Kifatex en proceso de implementación
- No se puede depender de proyecto externo
- Riesgo: Kifatex cancela/cambia proyecto

**Decisión:**
- **Fase 1:** Generar Excel estándar para Kifatex
- **Fase 2:** Evaluar integración directa (API/archivo)
- **Condición:** Solo cuando proceso Kifatex esté maduro

---

#### 12. **Formato de Archivo para Kifatex**

**Campos Propuestos:**
- Código producto
- Nombre producto
- Valor a reconocer
- Cliente
- Plan

**Formato:**
- Excel (.xlsx)
- TXT (si Kifatex lo requiere)

**Generación:**
- Automática desde sistema nuevo
- Adjunto en correo a Kifatex

---

### Decisiones Técnicas

#### 13. **Arquitectura de Integración**

**Componente 1: Sistema Nuevo (Liquidación)**
- Tecnología: Por definir
- Base de datos: Por definir
- Funcionalidad:
  - Gestión de promociones
  - Carga de archivos
  - Validaciones
  - Liquidación
  - Generación de solicitudes NC

**Componente 2: API de Integración**
- Consume datos de sistema nuevo
- Envía a SAP
- Formato: Por definir (REST/SOAP)

**Componente 3: Transacción SAP (Nueva)**
- Desarrollo custom en SAP
- Pantalla de selección de NC
- Generación masiva
- Notificaciones

**Componente 4: Integración Kifatex (Fase 2)**
- Consumo de archivo/API de Kifatex
- Actualización automática de NC

---

#### 14. **Categorización para Cotización**

**Necesidad:**
- Peter requiere saber qué es desarrollo SAP
- Qué es desarrollo en sistema nuevo

**Solución:**
- Agregar columna "Categoría" en historias de usuario
- Valores:
  - "Nueva Herramienta" (sistema de liquidación)
  - "SAP" (desarrollos en SAP)
  - "Integración" (APIs entre sistemas)

**Objetivo:**
- Peter cotiza solo parte SAP
- Otro equipo cotiza sistema nuevo

---

### Proceso de Emisión Masiva

#### 15. **Transacción SAP Propuesta**

**Nombre:** (Por definir)

**Funcionalidad:**

**Pantalla Principal:**
- Lista de NC pendientes
- Columnas:
  - Secuencial interno
  - Cliente
  - Plan
  - Valor
  - Fecha solicitud
  - Solicitante (Marixa/Rosita)

**Filtros:**
- Por cliente
- Por plan
- Por fecha
- Por solicitante

**Acciones:**
- Seleccionar individual
- Seleccionar múltiple
- Seleccionar todas
- Ejecutar

**Resultado:**
- Genera orden + NC automáticamente
- Muestra número de NC generada
- Permite descargar PDF

---

#### 16. **Validaciones en Transacción**

**Validación 1: Datos Completos**
- Código producto válido
- Valor > 0
- Cliente existe
- Plan válido

**Validación 2: Duplicados**
- No generar NC duplicada
- Validar contra secuencial

**Validación 3: Autorización**
- Solo Gaby puede ejecutar
- Registro de usuario

**Validación 4: Límites**
- Máximo NC por lote (ej: 50)
- Evitar sobrecarga

---

### Comparación de Opciones

#### 17. **Opción 1: Bot (Descartada)**

**Pros:**
- Automatización completa
- Sin cambios en SAP

**Contras:**
- Costo alto
- Mantenimiento complejo
- Susceptible a cambios
- No escalable

**Decisión:** NO implementar

---

#### 18. **Opción 2: Integración Nativa (Seleccionada)**

**Pros:**
- Robusto
- Escalable
- Menor mantenimiento
- Control preservado

**Contras:**
- Requiere desarrollo SAP
- Tiempo de implementación

**Decisión:** Implementar

---

#### 19. **Opción 3: Automatización Completa (Descartada)**

**Pros:**
- Máxima eficiencia

**Contras:**
- Violación segregación de funciones
- Sin control intermedio
- Riesgo de auditoría

**Decisión:** NO implementar

---

### Próximos Pasos

#### 20. **Acciones Inmediatas**

**1. Definir Proceso Final:**
- Confirmar segregación de funciones
- Validar con Auditoría Interna
- Documentar flujo aprobado

**2. Categorizar Historias de Usuario:**
- Agregar columna "Categoría"
- Clasificar cada historia
- Facilitar cotización

**3. Reunión con Kifatex:**
- Evaluar opciones de integración
- Definir formato de archivo
- Negociar API (si aplica)

**4. Diseño Técnico SAP:**
- Peter diseña transacción
- Define API de integración
- Estima esfuerzo

**5. Reunión con Willy Aragón:**
- Proceso de provisiones
- Integración con SAP
- Pendiente de reagendar

---

### Decisiones Clave

1. **Integración Nativa vs Bot:**
   - Seleccionada: Integración nativa
   - Razón: Más robusto y escalable

2. **Segregación de Funciones:**
   - Auditoría: Liquida y aprueba
   - Facturación: Ejecuta emisión
   - Control intermedio preservado

3. **Generación Masiva:**
   - Transacción SAP custom
   - Gaby selecciona y ejecuta
   - Un click: Orden + NC

4. **Notificación a Clientes:**
   - Mantener email actual
   - Automatizar desde SAP o sistema nuevo

5. **Integración Kifatex:**
   - Fase 1: Archivo Excel estándar
   - Fase 2: API (cuando proceso madure)

---

### Casos Especiales

**1. NC Confidenciales (SEOI/AC):**
- NO enviar Excel a Kifatex
- Solo PDF NC
- Validar en automatización

**2. Múltiples NC Mismo Cliente:**
- Agrupar en transacción
- Procesar en lote
- Un solo email

**3. Error en NC Generada:**
- Proceso de reversión
- Registrar en sistema
- Notificar a Marixa

**4. Kifatex No Replica:**
- Alerta automática
- Seguimiento manual
- Escalamiento

---

### Notas Técnicas

- **Transacción BF02:** Registro manual actual de NC Kifatex
- **Transacción ZSD_CUENTAS_0:** Carga actual de archivos TXT
- **Nueva Transacción SAP:** Por diseñar (generación masiva)
- **API de Integración:** REST/SOAP (por definir)
- **Categorías:** Nueva Herramienta, SAP, Integración
- **Volumen:** ~100 NC/mes
- **Ahorro Estimado:** 90% de tiempo de Gaby

---

### Reuniones Pendientes

**1. Reunión con Gaby Pachacama:**
- Tema: Evaluación de bots
- Fecha: Mañana 9-10 AM
- Objetivo: Validar viabilidad y costos

**2. Reunión con Willy Aragón:**
- Tema: Carga de provisiones en SAP
- Fecha: Por reagendar (propuesta: mañana 4:30-5:30 PM)
- Objetivo: Definir proceso y automatización

**3. Seguimiento Interno:**
- Definir proceso final
- Categorizar historias de usuario
- Preparar para cotización

---

### Conclusiones

1. **Integración nativa con SAP es la mejor opción**
   - Más robusto que bots
   - Escalable y mantenible

2. **Segregación de funciones debe respetarse**
   - Auditoría NO emite NC directamente
   - Facturación mantiene control

3. **Automatización significativa es posible**
   - 90% reducción de tiempo
   - Proceso masivo vs uno por uno

4. **Integración con Kifatex requiere negociación**
   - Fase 1: Archivo estándar
   - Fase 2: API (futuro)

5. **Categorización crítica para cotización**
   - Separar desarrollo SAP vs sistema nuevo
   - Facilitar estimación de costos

---

## Transcripción 14/17 - Reunión con Rosita (Ventas) - Evaluación de Promociones

**Fecha:** No especificada  
**Participantes:** Rosita (Ventas), Marixa, Cintia, Orlando  
**Duración:** ~4 horas (la más extensa)

---

### Contexto de la Reunión

**Objetivo:** Definir módulo de Evaluación de Promociones

**Participante Clave:**
- **Rosita:** Jefa Comercial (Ventas)
- **Responsabilidad:** Evaluar efectividad de promociones

**Alcance:**
- Estructura de reportes de evaluación
- Fuentes de datos
- Métricas y KPIs
- Comparativas periódicas
- Reportes consolidados

---

### Proceso de Evaluación

#### 1. **Objetivo de la Evaluación**

**Propósito:**
- Medir efectividad de promociones
- Validar cumplimiento de objetivos
- Tomar decisiones sobre continuidad
- Justificar inversión en NC

**Usuarios:**
- Rosita (Ventas): Evaluación continua
- Marixa (Auditoría): Evaluación al cierre
- Gerencia: Decisiones estratégicas

**Diferencia Clave:**
- **Rosita:** Evaluación mensual/trimestral (proactiva)
- **Marixa:** Evaluación al finalizar promoción (reactiva)

---

#### 2. **Macro Proceso**

**Etapa 1: Registro de Condiciones**
- Definición de mecánica
- Objetivos (ej: crecer 20% en unidades)
- Productos involucrados
- Clientes participantes

**Etapa 2: Implementación**
- Activación en clientes
- Recepción de reportes
- Liquidación de NC

**Etapa 3: Evaluación**
- Análisis de ventas
- Comparativa vs objetivos
- Cálculo de ROI
- Decisión de continuidad

---

### Estructura de Reportes

#### 3. **Reporte de Evaluación - Estructura**

**Nivel 1: Resumen Ejecutivo**

**Datos de Cabecera:**
- Nombre promoción
- Mecánica
- Vigencia (Ene-Jun 2025)
- Período de análisis (Ene-Mar 2025)
- Período comparativo (Ene-Mar 2024)
- Productos involucrados
- Clientes participantes

**Métricas Principales:**

**A. Total Clientes (100% cartera):**
```
Unidades:
Anterior: 11,126
Actual: 12,572
Variación: +1,446 (+13%)

Ventas:
Anterior: $436,000
Actual: $492,000
Variación: +$56,000 (+13%)

Margen CM2:
Anterior: $180,000
Actual: $207,000
Variación: +$27,000 (+15%)
```

**B. Solo Clientes Participantes:**
```
Unidades:
Anterior: 9,295
Actual: 11,373
Variación: +2,078 (+22.7%)

Ventas:
Anterior: $295,000
Actual: $373,000
Variación: +$78,000 (+26%)

Margen CM2:
Anterior: $120,000
Actual: $155,000
Variación: +$35,000 (+29%)
```

**C. Impacto de NC:**
```
NC Emitidas (3 meses): $7,000
Ventas Participantes: $373,000
% Participación NC: 2%
```

**Análisis:**
- Objetivo: Crecer 20% en unidades
- Real: 22.7% (✓ Cumplido)
- Conclusión: Promoción efectiva

---

#### 4. **Nivel 2: Detalle por Producto**

**Estructura:**

| Producto | Unidades Ant | Unidades Act | Var % | Ventas Ant | Ventas Act | Var % | Margen Ant | Margen Act | Var % |
|----------|--------------|--------------|-------|------------|------------|-------|------------|------------|-------|
| Letti 25% | 5,000 | 6,200 | +24% | $150K | $186K | +24% | $60K | $75K | +25% |
| Letti 50% | 3,000 | 3,800 | +27% | $120K | $152K | +27% | $48K | $61K | +27% |
| Letti Gel | 1,295 | 1,373 | +6% | $25K | $35K | +40% | $12K | $19K | +58% |

**Análisis por Producto:**
- Identificar productos con mejor desempeño
- Detectar productos con bajo crecimiento
- Decisiones de enfoque

---

#### 5. **Nivel 3: Detalle por Cliente**

**Estructura:**

| Cliente | Producto | Unidades Ant | Unidades Act | Var % | Ventas Ant | Ventas Act | NC Emitidas |
|---------|----------|--------------|--------------|-------|------------|------------|-------------|
| GPF | Letti 25% | 2,500 | 3,100 | +24% | $75K | $93K | $2,000 |
| GPF | Letti 50% | 1,500 | 1,900 | +27% | $60K | $76K | $1,500 |
| Difar | Letti 25% | 1,800 | 2,200 | +22% | $54K | $66K | $1,800 |
| Farmaenlace | Letti Gel | 500 | 800 | +60% | $10K | $16K | $400 |

**Análisis por Cliente:**
- Identificar clientes con mejor desempeño
- Detectar clientes con bajo crecimiento
- Decisiones de inclusión/exclusión

---

### Fuentes de Datos

#### 6. **Fuente 1: Bitácora de Promociones**

**Datos Obtenidos:**
- Nombre promoción
- Mecánica
- Vigencia
- Productos involucrados
- Clientes participantes
- Objetivos

**Uso:**
- Datos de cabecera del reporte
- Filtro de clientes a evaluar
- Referencia de objetivos

---

#### 7. **Fuente 2: Ventas del Distribuidor (Kifatex)**

**Datos Obtenidos:**
- Unidades vendidas (netas, incluye devoluciones)
- Ventas en dólares
- Por producto
- Por cliente
- Por período

**Consulta:**
- Períodos configurables por usuario
- Ejemplo: Ene-Mar 2025 vs Ene-Mar 2024
- Ejemplo: Ene-Mar 2025 vs Oct-Dic 2024

**Problema Actual:**
- Sistema BI tiene períodos fijos
- No permite rangos personalizados
- Ejemplo: Solo "último trimestre", "últimos 12 meses"
- No permite "Ene-Mar vs Oct-Dic"

**Solución Requerida:**
- Rangos de fecha editables
- Usuario define:
  - Fecha inicio período análisis
  - Fecha fin período análisis
  - Fecha inicio período comparativo
  - Fecha fin período comparativo

---

#### 8. **Fuente 3: Costos SAP**

**Transacción:** MM03 (Consulta de Material)

**Datos Obtenidos:**
- Precio estándar
- Cantidad base
- Costo unitario = Precio estándar ÷ Cantidad base

**Ejemplo:**
```
Producto: Letti 25%
Precio estándar: $7.92
Cantidad base: 1,000 unidades
Costo unitario: $7.92 ÷ 1,000 = $0.00792
```

**Problema Identificado:**
- Costos cambian periódicamente
- No todos los meses hay actualización
- Ejemplo: Ene 2025 nueva lista, Feb-Mar sin cambios

**Solución Actual (Manual):**
- Rosita guarda listas en carpeta personal
- Identifica mes de última actualización
- Usa costo del último mes del período

**Solución Propuesta:**
- Consultar SAP automáticamente
- Buscar costo del último mes del período
- Si no existe, usar mes anterior
- Ejemplo: Evaluando Ene-Mar 2025
  - Buscar costo Marzo 2025
  - Si no existe, buscar Febrero 2025
  - Si no existe, buscar Enero 2025

**Alternativa (Para Año Completo):**
- Usar reporte KE30
- Costo promedio del año
- Solo cuando año está cerrado

**Reunión Pendiente:**
- Jenny Palma (desarrolló reporte de costos)
- Validar fuente de datos
- Confirmar transacción MM03

---

#### 9. **Fuente 4: NC Emitidas**

**Origen:** Bitácora de Auditoría

**Datos Obtenidos:**
- Cliente
- Promoción
- Mes de liquidación
- Valor NC

**Importante:**
- Mes de liquidación ≠ Mes de emisión NC
- Ejemplo: Cliente envía reporte Enero, NC se emite Febrero
- Para evaluación: Usar mes de liquidación

**Caso Especial:**
- Cliente atrasado (ej: Difar 3 meses)
- Envía reportes Ago-Dic en Febrero
- NC emitida: Febrero
- Pero corresponde a ventas: Ago-Dic
- Evaluación Ene-Mar: Incluir $2,000 de NC atrasadas

**Razón:**
- Evaluar impacto real en ventas del período
- NC atrasadas afectan margen del período

---

### Métricas y Cálculos

#### 10. **Métrica 1: Crecimiento en Unidades**

**Fórmula:**
```
Crecimiento % = ((Unidades Actual - Unidades Anterior) / Unidades Anterior) × 100
```

**Ejemplo:**
```
Anterior: 9,295 unidades
Actual: 11,373 unidades
Crecimiento = ((11,373 - 9,295) / 9,295) × 100 = 22.7%
```

**Uso:**
- Métrica principal para Rosita
- Menos afectada por cambios de precio
- Menos afectada por cambios de costo
- Más confiable para medir efectividad

---

#### 11. **Métrica 2: Crecimiento en Ventas**

**Fórmula:**
```
Crecimiento % = ((Ventas Actual - Ventas Anterior) / Ventas Anterior) × 100
```

**Ejemplo:**
```
Anterior: $295,000
Actual: $373,000
Crecimiento = (($373,000 - $295,000) / $295,000) × 100 = 26%
```

**Consideración:**
- Afectada por cambios de precio
- Afectada por timing de NC
- Menos confiable que unidades

---

#### 12. **Métrica 3: Crecimiento en Margen CM2**

**Fórmula:**
```
Margen CM2 = Ventas - Costo
Crecimiento % = ((Margen Actual - Margen Anterior) / Margen Anterior) × 100
```

**Ejemplo:**
```
Ventas Actual: $373,000
Costo Actual: $218,000
Margen Actual: $155,000

Ventas Anterior: $295,000
Costo Anterior: $175,000
Margen Anterior: $120,000

Crecimiento = (($155,000 - $120,000) / $120,000) × 100 = 29%
```

**Consideración:**
- Afectada por cambios de costo
- Puede variar significativamente
- Complementaria a unidades

---

#### 13. **Métrica 4: % Participación NC vs Ventas**

**Fórmula:**
```
% Participación = (NC Emitidas / Ventas) × 100
```

**Ejemplo:**
```
NC Emitidas: $7,000
Ventas: $373,000
% Participación = ($7,000 / $373,000) × 100 = 2%
```

**Uso:**
- Medir impacto de inversión
- Decisión de continuidad
- ROI de promoción

**Interpretación:**
- 2%: Bajo impacto, alta efectividad
- 10%: Impacto medio
- 20%+: Alto impacto, evaluar viabilidad

---

### Comparativas Periódicas

#### 14. **Tipo 1: Year-to-Date (YTD)**

**Descripción:**
- Comparar mismo período año anterior
- Ejemplo: Ene-Mar 2025 vs Ene-Mar 2024

**Ventaja:**
- Elimina estacionalidad
- Comparación justa

**Uso:**
- Promociones recurrentes
- Análisis anual

---

#### 15. **Tipo 2: Período Anterior**

**Descripción:**
- Comparar con período inmediato anterior
- Ejemplo: Ene-Mar 2025 vs Oct-Dic 2024

**Ventaja:**
- Detecta tendencias recientes
- Útil para promociones nuevas

**Uso:**
- Promociones de corta duración
- Análisis trimestral

---

#### 16. **Tipo 3: Con Promoción vs Sin Promoción**

**Descripción:**
- Comparar período con promoción vs período sin promoción
- Ejemplo: Ene-Mar 2025 (con promo) vs Ene-Mar 2024 (sin promo)

**Ventaja:**
- Mide impacto directo de promoción
- Aísla efecto de promoción

**Uso:**
- Promociones nuevas
- Validación de efectividad

---

### Evaluaciones Parciales

#### 17. **Frecuencia de Evaluación**

**Promoción de 6 Meses:**
- Mínimo: 2 evaluaciones (trimestral)
- Ideal: 6 evaluaciones (mensual)

**Promoción de 12 Meses:**
- Mínimo: 4 evaluaciones (trimestral)
- Ideal: 12 evaluaciones (mensual)

**Beneficio:**
- Detección temprana de problemas
- Ajustes en tiempo real
- Decisiones proactivas

---

#### 18. **Ejemplo: Evaluación Trimestral**

**Promoción:** Cupón Letti (Ene-Jun 2025)

**Evaluación 1 (Marzo):**
- Período: Ene-Mar 2025
- Resultado: +22.7% unidades
- Decisión: Continuar

**Evaluación 2 (Junio):**
- Período: Abr-Jun 2025
- Resultado: +5% unidades
- Decisión: Investigar causas, posible descontinuación

---

### Reportes Consolidados

#### 19. **Reporte 1: Consolidado por Plan**

**Objetivo:** Vista macro de todos los planes

**Estructura:**

| Plan | Período | Unidades Ant | Unidades Act | Var % | Ventas Ant | Ventas Act | NC Emitidas | % NC/Ventas |
|------|---------|--------------|--------------|-------|------------|------------|-------------|-------------|
| PMC | Ene-Mar | 50,000 | 58,000 | +16% | $1.5M | $1.7M | $30K | 1.8% |
| Cupones | Ene-Mar | 20,000 | 25,000 | +25% | $600K | $750K | $15K | 2% |
| Rebates | Ene-Mar | 30,000 | 36,000 | +20% | $900K | $1.1M | $22K | 2% |

**Uso:**
- Comparar efectividad entre planes
- Decisiones de inversión
- Presentación a Gerencia

---

#### 20. **Reporte 2: Consolidado por Producto**

**Objetivo:** Identificar productos estrella

**Estructura:**

| Producto | Plan | Unidades Ant | Unidades Act | Var % | NC Emitidas |
|----------|------|--------------|--------------|-------|-------------|
| Trifamox | Cupones | 8,000 | 10,500 | +31% | $5,000 |
| Letti | Cupones | 6,000 | 7,200 | +20% | $3,500 |
| Novo Morav | Cupones | 4,000 | 4,800 | +20% | $2,400 |

**Uso:**
- Identificar productos con mejor ROI
- Decisiones de enfoque
- Planificación de inventario

---

#### 21. **Reporte 3: Consolidado por Cliente**

**Objetivo:** Identificar clientes clave

**Estructura:**

| Cliente | Planes Activos | Unidades Ant | Unidades Act | Var % | NC Emitidas |
|---------|----------------|--------------|--------------|-------|-------------|
| GPF | 5 | 25,000 | 32,000 | +28% | $12,000 |
| Difar | 4 | 18,000 | 21,000 | +17% | $8,000 |
| Farmaenlace | 3 | 8,000 | 10,500 | +31% | $4,000 |

**Uso:**
- Identificar clientes con mejor desempeño
- Decisiones de inclusión en nuevas promociones
- Negociaciones comerciales

---

### Reportes con Gráficos

#### 22. **Gráfico 1: Barras Comparativas**

**Tipo:** Barras agrupadas

**Eje X:** Productos

**Eje Y:** Unidades

**Series:**
- Azul: Período anterior
- Naranja: Período actual

**Uso:**
- Visualización rápida de crecimiento
- Identificación de productos destacados

**Consideración:**
- Productos con volúmenes muy diferentes
- Dificulta comparación visual
- Solución: Gráficos separados por categoría

---

#### 23. **Gráfico 2: Tendencia Mensual**

**Tipo:** Líneas

**Eje X:** Meses

**Eje Y:** Unidades

**Series:**
- Línea 1: Año anterior
- Línea 2: Año actual

**Uso:**
- Detectar tendencias
- Identificar estacionalidad
- Validar sostenibilidad de crecimiento

---

### Historias de Usuario - Evaluación

#### 24. **Historia 1: Selección de Promoción a Evaluar**

**Como** usuario de Ventas  
**Quiero** seleccionar promoción a evaluar  
**Para** generar reporte de efectividad

**Funcionalidad:**
- Pantalla de evaluación
- Lista desplegable de promociones activas
- Filtro por estado (activas, finalizadas)
- Mostrar datos de cabecera al seleccionar

**Criterios de Aceptación:**
- Lista carga desde bitácora
- Muestra: Nombre, mecánica, vigencia, productos, clientes
- Datos no editables (solo lectura)

---

#### 25. **Historia 2: Definición de Períodos**

**Como** usuario de Ventas  
**Quiero** definir períodos de análisis y comparación  
**Para** evaluar según mi criterio

**Funcionalidad:**
- Campos editables:
  - Rango fecha análisis (inicio - fin)
  - Rango fecha comparativo (inicio - fin)
- Validaciones:
  - Fecha inicio < Fecha fin
  - Períodos no se solapan

**Criterios de Aceptación:**
- Campos tipo date picker
- Validación automática
- Sugerencia de períodos comunes (YTD, trimestre anterior)

---

#### 26. **Historia 3: Consulta de Ventas**

**Como** sistema  
**Quiero** consultar ventas de Kifatex  
**Para** calcular métricas

**Funcionalidad:**
- Integración con BD de ventas Kifatex
- Consulta por:
  - Producto
  - Cliente
  - Período
- Datos: Unidades netas, ventas en dólares

**Criterios de Aceptación:**
- Consulta en tiempo real
- Incluye devoluciones (ventas netas)
- Filtro por clientes participantes

---

#### 27. **Historia 4: Consulta de Costos**

**Como** sistema  
**Quiero** consultar costos de SAP  
**Para** calcular margen

**Funcionalidad:**
- Integración con SAP (transacción MM03)
- Buscar costo del último mes del período
- Si no existe, buscar mes anterior
- Calcular: Precio estándar ÷ Cantidad base

**Criterios de Aceptación:**
- Consulta automática
- Lógica de búsqueda recursiva
- Registro de mes de costo utilizado

**Pendiente:**
- Reunión con Jenny Palma (27 Mayo)
- Validar fuente de datos

---

#### 28. **Historia 5: Consulta de NC Emitidas**

**Como** sistema  
**Quiero** consultar NC emitidas  
**Para** calcular impacto

**Funcionalidad:**
- Consulta desde bitácora de Auditoría
- Filtro por:
  - Promoción
  - Cliente
  - Mes de liquidación (no emisión)
- Suma total de NC

**Criterios de Aceptación:**
- Incluye NC atrasadas
- Filtro por mes de liquidación
- Agrupación por cliente/producto

---

#### 29. **Historia 6: Generación de Reporte**

**Como** usuario de Ventas  
**Quiero** generar reporte de evaluación  
**Para** analizar efectividad

**Funcionalidad:**
- Botón "Generar Reporte"
- Cálculo automático de métricas
- Generación de 3 niveles:
  - Resumen ejecutivo
  - Detalle por producto
  - Detalle por cliente

**Criterios de Aceptación:**
- Reporte en pantalla
- Exportar a Excel
- Incluir gráficos (opcional, Fase 2)

---

#### 30. **Historia 7: Reportes Consolidados**

**Como** usuario de Ventas  
**Quiero** consultar reportes consolidados  
**Para** vista macro

**Funcionalidad:**
- Reporte 1: Por plan
- Reporte 2: Por producto
- Reporte 3: Por cliente
- Filtros: Período, estado

**Criterios de Aceptación:**
- Datos agregados
- Exportar a Excel
- Gráficos comparativos (Fase 2)

---

### Casos Especiales

**1. Promoción Sin Historial:**
- Primera vez que se ejecuta
- No hay período comparativo
- Mostrar solo datos actuales
- Indicar "Sin datos comparativos"

**2. Cliente Agregado en Marcha:**
- No estaba en bitácora inicial
- Supervisor solicita inclusión
- Sistema permite agregar cliente
- Consulta ventas de cualquier cliente

**3. Promoción con Múltiples Productos:**
- Detalle por cada presentación
- Agregado por marca
- Filtros por categoría

**4. NC Atrasadas:**
- Incluir en período de análisis
- Aunque emisión sea posterior
- Usar mes de liquidación

**5. Cambio de Costo:**
- Usar costo del último mes
- Registrar mes utilizado
- Permitir override manual (Fase 2)

---

### Decisiones Clave

1. **Períodos Configurables:**
   - Rangos de fecha editables
   - No períodos fijos
   - Flexibilidad total

2. **Métrica Principal:**
   - Crecimiento en unidades
   - Menos afectada por variables externas
   - Más confiable

3. **Fuente de Costos:**
   - SAP transacción MM03
   - Lógica de búsqueda recursiva
   - Validar con Jenny Palma

4. **NC por Mes de Liquidación:**
   - No por mes de emisión
   - Incluye NC atrasadas
   - Refleja impacto real

5. **Gráficos:**
   - Fase 2 (opcional)
   - Requiere gestión de cambios
   - Evaluar costo/beneficio

---

### Reuniones Pendientes

**1. Willy Aragón (Contabilidad):**
- Tema: Provisiones y costos
- Fecha: 27 Mayo, 2:30-4:00 PM
- Objetivo: Mejorar proceso de provisiones

**2. Jenny Palma (TI):**
- Tema: Fuente de datos de costos
- Fecha: 27 Mayo (incluida en reunión Willy)
- Objetivo: Validar transacción MM03

**3. Gaby Pachacama (Bots):**
- Tema: Evaluación de bots
- Fecha: 28 Mayo, 9-10 AM
- Objetivo: Validar viabilidad y costos

**4. Revisión Final Historias de Usuario:**
- Tema: Validación completa de requerimientos
- Fecha: 29 Mayo, 3:00 PM
- Participantes: Todo el equipo
- Objetivo: Cierre de levantamiento

---

### Notas Técnicas

- **Fuente Ventas:** BD Kifatex (reportes de ventas)
- **Fuente Costos:** SAP MM03 (Precio estándar ÷ Cantidad base)
- **Fuente NC:** Bitácora de Auditoría (mes de liquidación)
- **Períodos:** Configurables por usuario (date pickers)
- **Métricas:** Unidades, ventas, margen, % NC/ventas
- **Reportes:** 3 niveles (resumen, producto, cliente)
- **Gráficos:** Fase 2 (gestión de cambios)
- **Evaluación PMC:** Integrada con módulo de liquidación

---

### Conclusiones

1. **Evaluación es crítica para decisiones comerciales**
   - Continuidad de promociones
   - Inclusión de nuevos clientes
   - Inversión en NC

2. **Flexibilidad en períodos es esencial**
   - No períodos fijos
   - Usuario define criterio
   - Múltiples tipos de comparación

3. **Crecimiento en unidades es métrica principal**
   - Menos afectada por variables
   - Más confiable
   - Fácil de interpretar

4. **Integración con múltiples fuentes**
   - Ventas Kifatex
   - Costos SAP
   - NC Auditoría

5. **Reportes consolidados complementan evaluación individual**
   - Vista macro de todos los planes
   - Identificación de productos/clientes estrella
   - Presentación a Gerencia

---

## Transcripción 15/17 - Reunión con Willy Aragón (Contabilidad) - Provisiones Contables

**Fecha:** No especificada  
**Participantes:** Willy Aragón (Contabilidad), Marixa, Rosita, Cintia, Orlando, Lili  
**Duración:** ~1 hora

---

### Contexto de la Reunión

**Objetivo:** Definir proceso de provisiones contables

**Participante Clave:**
- **Willy Aragón:** Contabilidad
- **Responsabilidad:** Registro contable de provisiones

**Alcance:**
- Proceso actual de registro
- Plantilla de diario automático
- Campos requeridos
- Integración con SAP
- Automatización propuesta

---

### Proceso Actual de Provisiones

#### 1. **Flujo General**

**Paso 1: Marixa Calcula Provisiones**
- Por cada promoción activa
- Basado en bitácora
- Genera archivo Excel

**Paso 2: Marixa Envía a Willy**
- Archivo con código material y valor
- Mensualmente

**Paso 3: Willy Registra Contablemente**
- Antes: Manual, código por código
- Ahora: Diario automático (desarrollo TI)

---

#### 2. **Problema Actual**

**Situación:**

**Plan SEOI:**
- Provisión: $172,000
- Afecta productos específicos
- Registro detallado por SKU

**Otros Planes (PMC, Cupones, Rebates, etc.):**
- Provisión: $977,000
- Afecta código genérico: 1000000
- NO detallado por producto

**Total Provisiones:** $1,149,000

**Consecuencia:**
- Falta trazabilidad
- No se puede ver provisión por producto
- Dificulta análisis en KE30

---

#### 3. **Solución Propuesta**

**Objetivo:**
- Eliminar código genérico 1000000
- Afectar todos los $1,149,000 a productos específicos
- Trazabilidad completa

**Fuente:**
- Sistema de liquidación (en desarrollo)
- Genera provisiones por producto
- Para todos los planes

**Beneficio:**
- Visibilidad en KE30
- Análisis por producto
- Cierre de ventas más preciso

---

### Plantilla de Diario Automático

#### 4. **Desarrollo Actual**

**Contexto:**
- Desarrollado con TI
- Permite carga masiva
- Evita registro manual

**Proceso Anterior:**
- Willy recibía Excel de Marixa
- Registraba código por código en SAP
- Tiempo: Horas

**Proceso Actual:**
- Willy recibe Excel de Marixa
- Copia datos (Ctrl+C)
- Pega en plantilla (Ctrl+V)
- Modifica mes y fechas
- Genera archivo TXT
- Carga en SAP
- Contabilización automática

**Tiempo:** 10 minutos

---

#### 5. **Estructura de la Plantilla**

**Archivo de Entrada (de Marixa):**

| Código Material | Valor Provisión |
|-----------------|-----------------|
| P99410000062 | $5,000 |
| P99410000123 | $3,500 |
| P99410000456 | $2,800 |

**Plantilla de Willy (Completa):**

| Código Material | Valor | Código Cliente | Base Jerarquía | Org Ventas | Canal Dist | Clave País | Mes | Fecha |
|-----------------|-------|----------------|----------------|------------|------------|------------|-----|-------|
| P99410000062 | $5,000 | KIFATEX | (valor) | S10 | 01 | (valor) | 05 | 31/05/2025 |
| P99410000123 | $3,500 | KIFATEX | (valor) | S10 | 01 | (valor) | 05 | 31/05/2025 |

**Campos Adicionales que Willy Agrega:**
1. Código Cliente (siempre KIFATEX para provisiones)
2. Base Jerarquía (por producto)
3. Organización Ventas (S10)
4. Canal Distribución (01)
5. Clave País
6. Mes
7. Fecha

---

#### 6. **Campo Crítico: Base de Jerarquía**

**Qué es:**
- Campo en maestro de materiales SAP
- Categoriza productos
- Requerido para afectar KE30

**Problema:**
- Willy debe buscar manualmente
- Tiene plantilla Excel con jerarquías
- Proceso manual propenso a errores

**Fuente:**
- Maestro de materiales SAP
- Tabla específica (consultar con Isa Zapata)

**Solución Propuesta:**
- Sistema consulta SAP automáticamente
- Incluye base jerarquía en reporte
- Willy ya no busca manualmente

---

#### 7. **Reunión Pendiente con Isa Zapata**

**Fecha:** Jueves (próxima semana), 11-12 AM

**Participantes:**
- Peter (TI SAP)
- Isa Zapata (Maestra de Materiales)
- Willy Aragón
- Equipo del proyecto

**Objetivo:**
- Identificar tabla de base jerarquía
- Validar consulta automática
- Confirmar campos adicionales

---

### Campos Requeridos

#### 8. **Campos del Reporte de Provisiones**

**Campos Mínimos (de Marixa):**
1. Código Material
2. Valor Provisión

**Campos Adicionales (para Willy):**
3. Código Cliente (KIFATEX)
4. Base Jerarquía (del maestro de materiales)
5. Organización Ventas (S10 - fijo)
6. Canal Distribución (01 - fijo)
7. Clave País (del maestro de materiales)

**Campos Variables:**
- Mes (Willy modifica según período)
- Fecha (Willy modifica según período)

---

#### 9. **Campos Fijos vs Variables**

**Fijos (No cambian):**
- Código Cliente: KIFATEX
- Organización Ventas: S10
- Canal Distribución: 01

**Por Producto (Consultar SAP):**
- Base Jerarquía
- Clave País

**Por Período (Willy modifica):**
- Mes
- Fecha

---

### Transacción de Costos SAP

#### 10. **Consulta de Costos (Lili)**

**Transacción:** Lista de Precios

**Acceso:**
- Menú SAP
- Lista de Precios Estándar

**Datos Mostrados:**

| Campo | Descripción | Ejemplo |
|-------|-------------|---------|
| Tipo Material | Categoría | BTS |
| Material | Código | P99410000062 |
| Nombre | Descripción | Flovocox |
| Estándar | Precio base 1000 | $520 |
| Moneda | Divisa | USD |
| Contador | Indicador | S |
| Base | Unidades | 1000 |

**Cálculo Costo Unitario:**
```
Costo Unitario = Estándar ÷ Base
Ejemplo: $520 ÷ 1000 = $0.52
```

**Períodos:**
- Consulta permite ver meses anteriores
- Seleccionar período específico
- Validar costos históricos

---

#### 11. **Uso para Evaluaciones**

**Rosita necesita:**
- Costo estándar por producto
- Para cálculo de margen CM2
- En evaluaciones de promociones

**Fuente Confirmada:**
- Transacción Lista de Precios
- Consulta automática desde sistema
- Lógica de búsqueda recursiva (mes actual, si no existe → mes anterior)

**Validación:**
- Reunión con Jenny Palma (27 Mayo)
- Confirmar tabla y campos
- Definir integración

---

### Historias de Usuario - Provisiones

#### 12. **Historia 1: Generación de Reporte de Provisiones**

**Como** usuario de Contabilidad  
**Quiero** recibir reporte de provisiones completo  
**Para** no agregar campos manualmente

**Funcionalidad:**
- Sistema genera reporte mensual
- Incluye todos los campos requeridos:
  - Código Material
  - Valor Provisión
  - Código Cliente (KIFATEX)
  - Base Jerarquía (consulta SAP)
  - Organización Ventas (S10)
  - Canal Distribución (01)
  - Clave País (consulta SAP)
- Exportar a Excel

**Criterios de Aceptación:**
1. Reporte incluye todas las promociones activas
2. Valores calculados según criterios de Marixa
3. Base Jerarquía consultada automáticamente de SAP
4. Clave País consultada automáticamente de SAP
5. Formato compatible con plantilla de diario automático
6. Exportar a Excel

**Beneficio:**
- Willy solo copia y pega
- No busca jerarquías manualmente
- Reduce tiempo de 30 min a 5 min

---

#### 13. **Historia 2: Contabilización Automática en SAP**

**Como** usuario de Contabilidad  
**Quiero** que sistema contabilice automáticamente  
**Para** eliminar carga manual de plantilla

**Funcionalidad:**
- Sistema genera reporte de provisiones
- Usuario revisa y aprueba
- Click en "Contabilizar"
- Sistema genera asiento contable en SAP
- Afecta cuentas:
  - Descuentos
  - Provisiones
- Registra en KE30

**Criterios de Aceptación:**
1. Botón "Contabilizar" en pantalla de provisiones
2. Validación de datos antes de contabilizar
3. Generación automática de asiento en SAP
4. Afectación correcta de cuentas contables
5. Registro en KE30 para cierre de ventas
6. Notificación de éxito/error

**Consideración:**
- Requiere desarrollo en SAP
- Estimado: $4,000-$5,000
- Evaluar costo/beneficio
- Alternativa: Mantener plantilla (Historia 1)

---

### Integración con Otros Procesos

#### 14. **Provisiones de Gaby Cajas**

**Contexto:**
- Gaby Cajas también genera provisiones
- Para facturación a Kifatex
- Proceso similar a Willy

**Pregunta:**
- ¿Se puede integrar en mismo reporte?

**Respuesta:**
- NO, son procesos diferentes
- Gaby: Provisión de facturación
- Willy: Provisión de descuentos promocionales

**Pero:**
- Plantilla puede ser la misma
- Gaby modifica valores y códigos
- Envía a Willy
- Willy carga con misma plantilla

**Beneficio:**
- Estandarización de plantilla
- Un solo proceso de carga
- Facilita trabajo de Willy

---

#### 15. **Alcance del Proyecto**

**Dentro del Alcance:**
- Provisiones de promociones
- Generadas desde sistema de liquidación
- Todos los planes: PMC, Cupones, Rebates, SEOI, etc.

**Fuera del Alcance:**
- Provisiones de facturación (Gaby Cajas)
- Otras provisiones contables
- Procesos no relacionados con promociones

**Decisión:**
- Enfocarse en provisiones de promociones
- Plantilla puede servir para otros procesos
- Pero generación automática solo para promociones

---

### Cuentas Contables

#### 16. **Afectación Contable**

**Cuenta Principal:**
- Descuentos Promocionales

**Cuenta Contrapartida:**
- Provisiones por Pagar

**Reporte KE30:**
- Cierre de Ventas
- Análisis por producto
- Análisis por cliente
- Análisis por plan

**Objeto OPA:**
- Campo especial en SAP
- Solo cuentas que afectan ventas
- Descuentos, devoluciones, ventas
- Desarrollo previo de TI

---

### Proceso Propuesto

#### 17. **Flujo Automatizado**

**Paso 1: Sistema Calcula Provisiones**
- Por cada promoción activa
- Según criterios de Marixa
- Genera valores por producto

**Paso 2: Sistema Consulta SAP**
- Base Jerarquía por producto
- Clave País por producto
- Costos estándar (para Rosita)

**Paso 3: Sistema Genera Reporte**
- Incluye todos los campos
- Formato Excel
- Compatible con plantilla

**Paso 4: Willy Revisa**
- Valida valores
- Modifica mes y fecha si necesario

**Paso 5: Opción A - Plantilla (Corto Plazo)**
- Willy copia a plantilla
- Genera TXT
- Carga en SAP
- Contabilización automática

**Paso 6: Opción B - Directo (Largo Plazo)**
- Willy click "Contabilizar"
- Sistema genera asiento en SAP
- Sin plantilla intermedia

---

### Decisiones Clave

1. **Eliminar Código Genérico:**
   - Todos los $1,149,000 a productos específicos
   - Trazabilidad completa
   - Visibilidad en KE30

2. **Campos Adicionales:**
   - Base Jerarquía: Consultar SAP automáticamente
   - Código Cliente: KIFATEX (fijo)
   - Org Ventas/Canal: S10/01 (fijos)

3. **Dos Historias de Usuario:**
   - HU1: Generación de reporte completo (corto plazo)
   - HU2: Contabilización automática (largo plazo, evaluar)

4. **Reunión con Isa Zapata:**
   - Jueves próxima semana
   - Validar tabla de jerarquías
   - Incluir en reunión con Peter

5. **Alcance:**
   - Solo provisiones de promociones
   - Plantilla puede servir para otros procesos
   - Generación automática solo para promociones

---

### Casos Especiales

**1. Producto Nuevo:**
- No tiene base jerarquía aún
- Willy consulta a Isa Zapata
- Isa actualiza maestro de materiales
- Sistema consulta en próxima ejecución

**2. Cambio de Jerarquía:**
- Isa actualiza maestro
- Sistema consulta valor actualizado
- Automático, sin intervención

**3. Múltiples Planes Mismo Producto:**
- Sistema suma provisiones
- Un solo registro por producto
- Valor total agregado

**4. Provisión Cero:**
- Cliente no envió información
- Sistema no genera registro
- Solo productos con provisión > 0

---

### Notas Técnicas

- **Plantilla Diario Automático:** Desarrollo TI existente
- **Formato TXT:** Generado por plantilla Excel
- **Carga SAP:** Automática desde carpeta
- **Transacción Costos:** Lista de Precios (Lili)
- **Base Jerarquía:** Maestro de Materiales (Isa Zapata)
- **Objeto OPA:** Campo especial para cuentas de ventas
- **KE30:** Reporte de cierre de ventas
- **Estimado SAP:** $4,000-$5,000 (contabilización directa)

---

### Reuniones Pendientes

**1. Peter + Isa Zapata (SAP):**
- Fecha: Jueves próxima semana, 11-12 AM
- Tema: Base jerarquía, automatización SAP
- Objetivo: Validar campos y tablas

**2. Jenny Palma (Costos):**
- Fecha: 27 Mayo
- Tema: Fuente de datos de costos
- Objetivo: Confirmar transacción y tabla

**3. Revisión Final Historias:**
- Fecha: 29 Mayo, 3:00 PM
- Tema: Validación completa de requerimientos
- Objetivo: Cierre de levantamiento

---

### Conclusiones

1. **Plantilla de diario automático funciona bien**
   - Reduce tiempo significativamente
   - Proceso establecido

2. **Campos adicionales son críticos**
   - Base Jerarquía es el más importante
   - Debe consultarse automáticamente

3. **Dos opciones de implementación**
   - Corto plazo: Reporte completo para plantilla
   - Largo plazo: Contabilización directa en SAP

4. **Eliminar código genérico es prioritario**
   - Mejora trazabilidad
   - Facilita análisis en KE30

5. **Coordinación con Isa Zapata es esencial**
   - Fuente de base jerarquía
   - Validación de campos

---

## Transcripción 16/17 - Reunión con Peter (TI SAP) - Diseño Interfaz de Generación de NC

**Fecha:** No especificada  
**Participantes:** Peter (TI SAP), Marixa, Rosita, Gaby Cajas, Paulina, Cintia  
**Duración:** ~1.5 horas

**Nota:** Esta transcripción fue generada con todos los speakers marcados como "Jonnathan Suasnavas" por error del programa de transcripción. Los participantes reales son los mencionados arriba.

---

### Contexto de la Reunión

**Objetivo:** Diseñar interfaz técnica para generación de NC en SAP

**Participante Clave:**
- **Peter:** Líder Técnico SAP
- **Responsabilidad:** Diseño e implementación técnica

**Alcance:**
- Plantilla TXT para SAP
- Campos requeridos
- Lógica de búsqueda de facturas
- Interfaz de usuario
- Proceso de aprobación/rechazo
- Notificaciones por correo
- Integración con Kifatex

---

### Flujo del Proceso

#### 1. **Resumen del Proceso Completo**

**Paso 1: Auditoría Recibe Notificación**
- Cliente envía reporte de ventas
- Marixa/Rosita validan condiciones
- Generan liquidación

**Paso 2: Sistema Genera Solicitud NC**
- Crea plantilla TXT
- Envía a SAP

**Paso 3: Gaby Procesa en SAP**
- Revisa solicitudes pendientes
- Aprueba o rechaza
- Genera NC

**Paso 4: Kifatex Replica NC**
- Recibe NC de Bagó
- Genera NC Kifatex
- Envía a cliente final

**Paso 5: Registro de NC Kifatex**
- Kifatex envía número de documento interno
- Sistema actualiza registro
- Proceso completo

---

### Plantilla TXT para SAP

#### 2. **Campos de la Plantilla**

**Campo 1: Secuencial Interno**
- Generado por Auditoría
- Identificador único de NC
- Ejemplo: NC-2025-0123

**Campo 2: Código Producto SAP**
- Código de material
- 10 dígitos con ceros
- Ejemplo: P99410000062

**Campo 3: Valor por Material**
- Monto a reconocer
- Por cada producto
- Ejemplo: $5,000

**Campo 4: Condición de Descuento**
- Lista desplegable
- Valores desde SAP
- Ejemplos: ZD01 (PMC), ZD08 (Semana Descuentos), ZD12 (Volumen Compras)

**Campo 5: Motivo de Rechazo**
- Asignado automáticamente
- Según condición de descuento
- Relación 1:1 con condición

---

#### 3. **Tabla de Condiciones de Descuento**

**Ubicación en SAP:**
- Transacción: (Consultar con Peter)
- Acceso: F1 en campo → Herramientas técnicas

**Estructura:**

| Código | Descripción | Motivo Rechazo |
|--------|-------------|----------------|
| ZD01 | Plan Medicación Continua | Z32 |
| ZD08 | Semana de Descuentos | Z02 |
| ZD12 | Volumen de Compras | Z32 |
| ZD19 | Modificación | Z05 |

**Funcionalidad:**
- Sistema consulta tabla
- Muestra lista desplegable a usuario
- Al seleccionar condición, asigna motivo automáticamente

---

#### 4. **Campos que SAP Debe Buscar Automáticamente**

**Campo 1: Clase de Documento**
- Valor fijo: 18
- Corresponde a factura en SRI
- No editable

**Campo 2: Número de Factura**
- Lógica de búsqueda (ver sección siguiente)
- 15 dígitos obligatorio
- Formato: 001-002-XXXXXXXXX

**Campo 3: Fecha de Factura**
- Fecha de la factura encontrada
- Automática

---

### Lógica de Búsqueda de Facturas

#### 5. **Criterios de Búsqueda**

**Criterio 1: Cliente**
- Siempre KIFATEX
- Código fijo en SAP

**Criterio 2: Período**
- Últimos 2 meses
- Desde fecha actual hacia atrás

**Criterio 3: Estado**
- Solo facturas abiertas
- No anuladas
- Disponibles en estado de cuenta

**Criterio 4: Valor**
- Buscar factura de mayor valor primero
- Si valor NC > valor factura, buscar siguiente
- Acumular facturas si necesario

---

#### 6. **Proceso de Búsqueda**

**Paso 1: Consultar Facturas**
```
SELECT * FROM facturas
WHERE cliente = 'KIFATEX'
AND fecha >= FECHA_ACTUAL - 2 MESES
AND estado = 'ABIERTO'
ORDER BY valor DESC
```

**Paso 2: Validar Valor**
- Comparar valor NC vs valor factura
- Si NC <= Factura: Usar esa factura
- Si NC > Factura: Buscar siguiente

**Paso 3: Acumulación (Si Necesario)**
- Ejemplo: NC = $2,500
- Factura 1 = $500
- Factura 2 = $500
- Factura 3 = $500
- Factura 4 = $500
- Factura 5 = $500
- Total = $2,500 ✓

**Paso 4: Registro**
- Guardar log de facturas usadas
- Evitar reutilización
- Trazabilidad

---

#### 7. **Validaciones**

**Validación 1: Formato de Factura**
- Debe tener 15 dígitos
- Formato: XXX-XXX-XXXXXXXXX
- Si no cumple: Error

**Validación 2: Factura Ya Usada**
- Consultar log de facturas
- Si ya fue usada: Buscar siguiente
- Evitar duplicados

**Validación 3: Sin Facturas Disponibles**
- Si no hay facturas que cumplan criterios
- Mostrar error a usuario
- Solicitar intervención manual

---

### Interfaz de Usuario

#### 8. **Pantalla de Liquidaciones Pendientes**

**Diseño:**

```
┌─────────────────────────────────────────────────────────┐
│ Liquidaciones Pendientes de Procesar                    │
├─────────────────────────────────────────────────────────┤
│ [ ] Secuencial | Cliente | Plan | Valor | Factura Ref  │
│ [ ] NC-2025-01 | GPF     | PMC  | $5K   | 001-002-123  │
│ [ ] NC-2025-02 | Difar   | Cup  | $3K   | 001-002-456  │
│ [ ] NC-2025-03 | FarmaE  | Reb  | $2K   | 001-002-789  │
├─────────────────────────────────────────────────────────┤
│ [Seleccionar Todas] [Procesar] [Rechazar]              │
└─────────────────────────────────────────────────────────┘
```

**Funcionalidad:**
- Checkbox para selección individual
- Botón "Seleccionar Todas"
- Botón "Procesar" (genera NC)
- Botón "Rechazar" (devuelve a Auditoría)

---

#### 9. **Proceso de Aprobación**

**Opción 1: Procesar**
- Usuario selecciona liquidaciones
- Click en "Procesar"
- Sistema genera archivo TXT
- Carga en SAP automáticamente
- Genera solicitud de pedido
- Genera NC
- Muestra reporte de resultados

**Opción 2: Rechazar**
- Usuario selecciona liquidaciones
- Click en "Rechazar"
- Sistema marca como rechazada
- Notifica a Auditoría
- Auditoría puede modificar y reenviar

---

#### 10. **Reporte de NC Generadas**

**Contenido:**

```
Reporte de Notas de Crédito Generadas
Fecha: 23/05/2025

Secuencial    | Orden SAP | NC SAP    | Cliente | Valor
NC-2025-01    | 600123    | 900456    | GPF     | $5,000
NC-2025-02    | 600124    | 900457    | Difar   | $3,000
NC-2025-03    | 600125    | 900458    | FarmaE  | $2,000

Total: 3 NC generadas por $10,000
```

**Uso:**
- Gaby descarga reporte
- Valida números de NC
- Prepara notificaciones

---

### Base de Datos de Interlocutores

#### 11. **Tabla de Interlocutores**

**Campos:**

1. **Código Bagó**
   - Código interno SAP
   - Ejemplo: 0011 (Difar)

2. **Código Kifatex**
   - Código en sistema Kifatex
   - Ejemplo: 3559 (Difar)

3. **Razón Social**
   - Nombre legal del cliente
   - Ejemplo: Distribuidora Farmacéutica S.A.

4. **Nombre Comercial**
   - Nombre popular
   - Ejemplo: Difar

5. **Email Contacto**
   - Email del cliente
   - Para notificaciones

6. **Supervisor**
   - Supervisor asignado
   - Email del supervisor

7. **Visitador**
   - Visitador asignado (opcional)
   - Para clientes pequeños

---

#### 12. **Mantenimiento de Interlocutores**

**Transacción SAP:** ZSDS003

**Funcionalidad:**
- Crear nuevo interlocutor
- Modificar datos existentes
- Consultar información

**Sincronización:**
- Sistema nuevo consulta tabla SAP
- Muestra lista actualizada
- Marixa selecciona de lista

**Proceso para Nuevo Cliente:**
1. Marixa identifica cliente nuevo
2. Solicita creación a SAP
3. SAP crea en transacción ZSDS003
4. Sistema sincroniza automáticamente
5. Marixa puede seleccionar

---

### Notificaciones por Correo

#### 13. **Email de NC Generada**

**Destinatarios:**

**Para:**
- Kifatex (contacto fijo, ej: Ivonne Pérez / Eric Busca)

**CC:**
- Cliente final (desde tabla interlocutores)
- Marixa (Auditoría)
- Rosita (Ventas)
- Gaby Cajas (Facturación)
- Supervisor del cliente
- Visitador (si aplica)

**Asunto:**
```
NC [Secuencial] - [Cliente] - [Plan]
Ejemplo: NC NC-2025-0123 - GPF - PMC
```

**Cuerpo:**
```
Estimados,

Se ha emitido la siguiente Nota de Crédito:

- Secuencial Interno: NC-2025-0123
- Número NC Bagó: 900456
- Cliente: GPF
- Plan: PMC
- Valor: $5,000

Adjunto:
- PDF Nota de Crédito
- Excel detalle de productos

Saludos cordiales.
```

**Adjuntos:**
1. PDF de NC (descargado de SAP)
2. Excel con detalle de productos

---

#### 14. **Consideraciones Técnicas del Email**

**Problema Identificado:**
- No se puede "responder" al email original de liquidación
- Acceso a base de datos de correos es complejo

**Solución:**
- Generar email nuevo
- Incluir secuencial interno en asunto
- Facilita trazabilidad

**Remitente:**
- Email genérico (ej: edox@bago.com)
- No email personal de Marixa

**Timing:**
- Enviar 30 minutos después de generar NC
- Permite que SAP procese y PDF esté disponible

---

#### 15. **Descarga de PDF desde EcoNexus**

**Proceso:**
1. NC generada en SAP
2. SAP envía a EcoNexus
3. EcoNexus genera PDF
4. Sistema descarga PDF vía API
5. Adjunta a email

**Alternativas:**

**Opción A: API EcoNexus**
- Conectar vía API
- Descargar PDF automáticamente
- Costo: Moderado

**Opción B: Bot**
- Bot descarga de EcoNexus
- Guarda en carpeta
- Sistema adjunta
- Costo: Alto, no recomendado

**Opción C: Manticore**
- Usar plataforma Manticore
- 80% más barato que SAP
- Recomendado por Peter

**Decisión:** Evaluar Opción A vs C

---

### Integración con Kifatex

#### 16. **Archivo de Replica de Kifatex**

**Situación Actual:**
- Kifatex envía archivo con NC replica
- Formato: CSV o Excel
- Contiene: Cliente, producto, valor, NC Kifatex

**Problema:**
- No incluye NC Bagó
- Difícil relacionar NC Kifatex ↔ NC Bagó

**Solución Propuesta:**
- Solicitar a Kifatex agregar campo "NC Bagó"
- Facilita actualización automática

---

#### 17. **Reunión con Kifatex**

**Contacto:** Eric (nuevo responsable)

**Objetivo:**
- Explicar necesidad de campo NC Bagó
- Preguntar: ¿Qué soluciones tienen para otros clientes?
- Evaluar opciones:
  - Archivo CSV/Excel con NC Bagó
  - FTP (ya existe integración)
  - API/Servicio web

**Estrategia:**
- No decir "esto es lo que queremos"
- Preguntar "¿qué tienen disponible?"
- Evaluar soluciones existentes

**Consideración:**
- Kifatex cobra por todo
- Buscar solución más económica
- Aprovechar integraciones existentes

---

#### 18. **Integración FTP Existente**

**Contexto:**
- Ya existe FTP con Kifatex
- Para órdenes de compra
- Para reportes de devoluciones

**Propuesta:**
- Usar mismo FTP
- Kifatex deposita archivo de replicas
- Sistema lee automáticamente
- Actualiza NC

**Beneficio:**
- Infraestructura existente
- Sin costo adicional
- Automatización completa

---

### Casos Especiales

#### 19. **Planes Confidenciales (SEOI/AC)**

**Problema:**
- Información de costos confidencial
- No se puede enviar Excel a Kifatex

**Solución:**
- Sistema detecta plan confidencial
- Solo envía PDF de NC
- NO envía Excel con detalle

**Validación:**
- Campo en tabla de planes
- Marca "Confidencial: Sí/No"
- Sistema valida antes de enviar

---

#### 20. **Múltiples Productos en NC**

**Situación:**
- NC con 10 productos diferentes
- Archivo TXT con múltiples líneas

**Proceso:**
- Sistema genera una línea por producto
- Todas con mismo secuencial interno
- SAP agrupa en una sola NC

**Excel Adjunto:**
- Detalle de todos los productos
- Facilita validación de Kifatex

---

#### 21. **NC que Excede Valor de Facturas**

**Ejemplo:**
- NC = $10,000
- Facturas disponibles:
  - Factura 1: $3,000
  - Factura 2: $2,500
  - Factura 3: $2,000
  - Factura 4: $1,500
  - Total: $9,000

**Problema:**
- No alcanza para cubrir NC

**Solución:**
- Mostrar error a usuario
- Solicitar intervención manual
- Gaby busca facturas adicionales o ajusta valor

---

### Costos de Desarrollo

#### 22. **Comparación SAP vs Manticore**

**Desarrollo en SAP:**
- Costo: Alto
- Ejemplo: $10,000 para funcionalidad X

**Desarrollo en Manticore:**
- Costo: 80% más barato
- Ejemplo: $2,000 para funcionalidad X

**Recomendación de Peter:**
- Usar Manticore para:
  - Envío de emails
  - Descarga de PDFs
  - Integraciones externas
- Usar SAP solo para:
  - Generación de NC
  - Consultas de datos SAP
  - Lógica de negocio crítica

---

#### 23. **Migración a S/4HANA**

**Contexto:**
- Migración futura a S/4HANA
- Impacto en desarrollos actuales

**Proceso:**
1. Evaluar sistema actual (SAP R/3)
2. Mapear satélites, APIs, integraciones
3. Identificar desarrollos custom (Zs)
4. Consultor evalúa compatibilidad
5. Determinar adaptaciones necesarias

**Costo:**
- Adaptaciones: Inevitable
- Algunas APIs se mantienen
- Otras requieren modificación
- Presupuesto adicional requerido

**Decisión:**
- Desarrollar ahora con mejor práctica
- Facilitar migración futura
- Documentar integraciones

---

### Decisiones Clave

1. **Plantilla TXT:**
   - 5 campos principales
   - Condición de descuento desde tabla SAP
   - Motivo de rechazo automático

2. **Búsqueda de Facturas:**
   - Últimos 2 meses
   - Estado abierto
   - Mayor valor primero
   - 15 dígitos obligatorio

3. **Interfaz de Usuario:**
   - Tabla de liquidaciones pendientes
   - Selección múltiple
   - Procesar/Rechazar
   - Reporte de resultados

4. **Base de Interlocutores:**
   - Código Bagó + Código Kifatex
   - Email contacto + Supervisor + Visitador
   - Sincronización con SAP (ZSDS003)

5. **Notificaciones:**
   - Email nuevo (no respuesta)
   - Destinatarios desde tabla interlocutores
   - Adjuntos: PDF + Excel
   - Timing: 30 min después de generar

6. **Integración Kifatex:**
   - Solicitar campo NC Bagó en archivo
   - Evaluar FTP existente
   - Reunión con Eric

7. **Costos:**
   - Preferir Manticore para emails
   - SAP solo para lógica crítica
   - Evaluar S/4HANA en futuro

---

### Notas Técnicas

- **Transacción Interlocutores:** ZSDS003
- **Transacción Planes Comerciales:** ZSDS004
- **Clase Documento Factura:** 18
- **Formato Factura:** XXX-XXX-XXXXXXXXX (15 dígitos)
- **Período Búsqueda:** Últimos 2 meses
- **Timing Email:** 30 minutos post-generación
- **Costo SAP vs Manticore:** 80% diferencia
- **API EcoNexus:** Descarga de PDFs
- **FTP Kifatex:** Integración existente

---

### Próximos Pasos

1. **Reunión con Kifatex (Eric):**
   - Solicitar campo NC Bagó
   - Evaluar opciones de integración
   - Definir formato de archivo

2. **Desarrollo de Interfaz:**
   - Diseñar pantalla de liquidaciones
   - Implementar lógica de búsqueda
   - Crear reporte de resultados

3. **Integración Manticore:**
   - Evaluar para envío de emails
   - Definir API de EcoNexus
   - Estimar costos

4. **Documentación:**
   - Mapear todas las integraciones
   - Preparar para S/4HANA
   - Crear manual de usuario

---

### Conclusiones

1. **Interfaz de usuario es crítica**
   - Facilita trabajo de Gaby
   - Reduce errores
   - Mejora trazabilidad

2. **Lógica de búsqueda de facturas es compleja**
   - Requiere validaciones robustas
   - Manejo de casos especiales
   - Log de facturas usadas

3. **Base de interlocutores debe ser completa**
   - Dos códigos (Bagó + Kifatex)
   - Emails de todos los involucrados
   - Sincronización con SAP

4. **Integración con Kifatex es clave**
   - Automatizar actualización de NC
   - Aprovechar infraestructura existente
   - Negociar solución económica

5. **Costos deben optimizarse**
   - Usar Manticore cuando sea posible
   - SAP solo para lógica crítica
   - Planificar migración S/4HANA

---

## Transcripción 17/17 - Reunión de Cierre y Consolidación (FINAL)

**Fecha:** No especificada  
**Participantes:** Marixa, Rosita, Cintia, Orlando, Luis, Gaby Cajas  
**Duración:** ~1 hora

---

### Contexto de la Reunión

**Objetivo:** Consolidar requerimientos finales y cerrar levantamiento

**Temas Finales:**
- Bitácora de NC
- Proceso de provisiones
- Evaluaciones de promociones
- Reportes vs ClickSense
- Conciliaciones
- Protección de datos
- Validaciones de cédulas

---

### Bitácora de Notas de Crédito

#### 1. **Registro Histórico de NC**

**Objetivo:**
- Mantener historial completo de NC emitidas
- Por año, plan, cliente, productos

**Campos de la Bitácora:**
- Año
- Plan promocional
- Cliente
- Productos involucrados
- Unidades
- Valores
- Estado

**Fuente:**
- Sistema de liquidación
- Actualización automática al emitir NC

---

#### 2. **Actualización de NC Kifatex**

**Proceso Actual (Manual):**
1. Kifatex envía correo con NC replica
2. Gaby abre PDF
3. Gaby copia número documento interno
4. Gaby va a SAP transacción BF02
5. Gaby pega número en campo "Texto Cabecera"
6. Gaby guarda

**Problema:**
- 100% manual
- Tiempo: ~5 min por NC
- Propenso a errores

---

#### 3. **Propuesta de Automatización**

**Opción A: Bot (Descartada)**
- Lee correo de Kifatex
- Extrae número de PDF
- Actualiza SAP
- Costo: Alto
- Mantenimiento: Complejo

**Opción B: Archivo de Kifatex (Seleccionada)**
- Kifatex envía archivo (CSV/Excel)
- Incluye campo "NC Bagó"
- Sistema lee archivo automáticamente
- Actualiza bitácora vía API
- Actualiza SAP

**Decisión:**
- Reunión con Kifatex (Eric)
- Solicitar campo NC Bagó en archivo
- Evaluar FTP existente
- Implementar lectura automática

---

### Proceso de Provisiones

#### 4. **Cálculo de Provisiones**

**Contexto:**
- Cierre mensual de ventas
- Clientes que no enviaron información
- Necesidad de provisionar valores

**Método de Cálculo:**
- Promedio de últimos 3 meses
- Por cliente y por plan
- Ejemplo: Cliente no envió info Mayo
  - Promedio Feb-Mar-Abr = $10,000
  - Provisión Mayo = $10,000

---

#### 5. **Generación de Reporte de Provisiones**

**Funcionalidad:**
- Sistema calcula automáticamente
- Botón "Generar Reporte de Provisiones"
- Genera archivo Excel con template
- Campos:
  - Código material
  - Valor provisión
  - Cliente (KIFATEX)
  - Base jerarquía
  - Org ventas (S10)
  - Canal distribución (01)

**Destinatario:**
- William Aragón (Contabilidad)

---

#### 6. **Carga en SAP**

**Proceso:**
1. Sistema genera reporte
2. Envía email a William con archivo adjunto
3. William descarga archivo
4. William carga en plantilla SAP existente
5. Plantilla genera TXT
6. Carga automática en SAP
7. Contabilización

**Notificación:**
- William cambia estado a "Procesado"
- Sistema notifica a interlocutores
- Ventas/Marketing conocen provisión cargada
- Estimado de ventas disponible

---

### Evaluaciones de Promociones

#### 7. **Debate: Sistema vs ClickSense**

**Necesidad de Rosita:**
- Evaluar efectividad de promociones
- Análisis de ventas (unidades, valores, margen)
- Comparativas periódicas
- Reportes con múltiples filtros

**Propuesta Inicial:**
- Reportes en sistema nuevo
- Filtros por plan, cliente, producto, fecha
- Exportar a Excel

**Contraargumento (Luis/Cintia):**
- ClickSense es herramienta de analytics
- Sistema nuevo es transaccional
- Análisis complejos deben ir a ClickSense
- Sistema solo reportes básicos

---

#### 8. **Decisión Final**

**Sistema Nuevo:**
- Almacena toda la información
- Reportes básicos con filtros
- Exportar a Excel
- Consultas rápidas

**ClickSense:**
- Consume datos del sistema nuevo
- Dashboards complejos
- Análisis estratégico
- Cruces con otras fuentes (Kifatex, SAP)

**Razón:**
- ClickSense diseñado para analytics
- Sistema nuevo diseñado para transacciones
- Separación de responsabilidades
- Facilita mantenimiento

---

#### 9. **Datos para Evaluaciones**

**Fuentes:**

**1. Ventas:**
- Base de datos Kifatex
- Actualización diaria
- Tabla "Sales" en Oracle

**2. Costos:**
- SAP transacción MM03
- Precio estándar ÷ Cantidad base
- Consulta automática

**3. NC Emitidas:**
- Bitácora del sistema
- Por plan, cliente, producto

**4. Planes:**
- Bitácora de planes promocionales
- Condiciones, objetivos, vigencia

---

### Conciliaciones

#### 10. **Proceso de Conciliación**

**Objetivo:**
- Validar información entre sistemas
- Asegurar consistencia de datos

**Tipos de Conciliación:**

**1. Ventas vs NC:**
- Ventas reportadas por cliente
- NC emitidas al cliente
- Validar coherencia

**2. Provisiones vs NC:**
- Provisiones calculadas
- NC reales emitidas
- Ajustes mensuales

**3. NC Bagó vs NC Kifatex:**
- NC emitida por Bagó
- NC replica de Kifatex
- Validar valores

---

#### 11. **Funcionalidad en Sistema**

**Pregunta:**
- ¿Conciliaciones se hacen en sistema?
- ¿O solo se consulta información?

**Respuesta:**
- Depende de complejidad
- Si requiere funcionalidad específica: Incluir
- Si solo consulta de datos: Reportes básicos

**Decisión:**
- Evaluar en fase de prototipos
- Marixa define necesidad exacta
- Cintia propone solución

---

### Protección de Datos

#### 12. **Reunión Pendiente**

**Participantes:**
- Marixa/Rosita (usuarios)
- Cintia (TI)
- Consultor de Protección de Datos
- Jean-Pierre (Seguridad)

**Objetivo:**
- Definir datos necesarios
- Validar cumplimiento de ley
- Implementar seguridades

**Timing:**
- Después de aprobar prototipos
- Antes de desarrollo final

---

#### 13. **Validaciones de Cédulas**

**Problema Identificado:**
- Clientes envían códigos homologados
- No cédulas reales
- Ejemplo: Cliente X0321 (código), no 1726XXXXXX (cédula)

**Pregunta:**
- ¿Sistema debe validar cédulas?
- ¿O acepta códigos homologados?

**Respuesta:**
- Depende del propósito
- Para este proceso: Código suficiente
- Para marketing: Cédula necesaria

---

#### 14. **Propósito del Dato**

**Para Liquidación de Promociones:**
- Propósito: Validar compras del paciente
- Necesidad: Identificador único (código o cédula)
- NO necesita: Contactar al paciente

**Para Marketing:**
- Propósito: Campañas de fidelización
- Necesidad: Cédula real, email, teléfono
- SÍ necesita: Contactar al paciente

**Decisión:**
- Sistema acepta códigos homologados
- NO valida formato de cédula
- Alineación transversal con empresa
- Definir en reunión de Protección de Datos

---

#### 15. **Validaciones Técnicas**

**Recomendaciones de QA:**
- Definir longitud de campos
- Ejemplo: Cédula 10 caracteres, RUC 13 caracteres
- Validar formato si es necesario
- Consistencia en toda la aplicación

**Decisión:**
- Si código homologado: Sin validación de longitud
- Si cédula real: Validar 10 caracteres
- Depende de definición en Protección de Datos

---

### Cierre de Levantamiento

#### 16. **Estado Actual**

**Completado:**
- Levantamiento de todos los procesos
- Reuniones con todos los stakeholders
- Historias de usuario definidas
- Flujos documentados

**Pendiente:**
- Tiempos y costos en historias (Cintia)
- Revisión interna (Orlando)
- Reunión con Kifatex (Eric)
- Reunión de Protección de Datos

---

#### 17. **Próximos Pasos**

**1. Cintia:**
- Finalizar tiempos en historias de usuario
- Finalizar costos estimados
- Entregar a Orlando

**2. Orlando:**
- Generar revisión interna
- Validar con equipo técnico
- Preparar presupuesto

**3. Marixa:**
- Gestionar reunión con Kifatex (Eric)
- Solicitar campo NC Bagó en archivo
- Evaluar opciones de integración

**4. Equipo:**
- Reunión de Protección de Datos
- Definir datos necesarios
- Validar seguridades

**5. Fase de Prototipos:**
- Diseñar interfaces
- Validar con usuarios
- Ajustar según feedback
- Reunión con Jean-Pierre (seguridad)

---

### Interlocutores del Proceso

#### 18. **Listado de Interlocutores**

**Auditoría/Control Interno:**
- Marixa
- Rosita

**Facturación:**
- Gaby Cajas
- Paulina

**Ventas:**
- Rosita (también)
- Supervisores
- Visitadores

**Contabilidad:**
- William Aragón

**TI:**
- Peter (SAP)
- Cintia (Desarrollo)
- Orlando (Gestión)
- Luis (Arquitectura)

**Externos:**
- Kifatex (Eric Busca, Ivonne Pérez)
- Clientes finales (farmacias, cadenas)

---

### Decisiones Finales

1. **Bitácora de NC:**
   - Registro histórico completo
   - Actualización automática desde Kifatex
   - Vía archivo con campo NC Bagó

2. **Provisiones:**
   - Cálculo automático (promedio 3 meses)
   - Reporte con template para William
   - Notificación a interlocutores

3. **Evaluaciones:**
   - Datos en sistema nuevo
   - Reportes básicos en sistema
   - Analytics complejos en ClickSense

4. **Conciliaciones:**
   - Evaluar en fase de prototipos
   - Definir funcionalidad necesaria

5. **Protección de Datos:**
   - Reunión post-prototipos
   - Definir datos necesarios
   - Validaciones según propósito

6. **Validaciones:**
   - Códigos homologados aceptados
   - Sin validación de formato cédula
   - Alineación transversal empresa

---

### Conclusiones Generales

1. **Levantamiento Completo:**
   - 17 transcripciones procesadas
   - Todos los procesos documentados
   - Historias de usuario definidas

2. **Integración Clave:**
   - SAP (generación NC, costos, provisiones)
   - Kifatex (ventas, replicas NC)
   - ClickSense (analytics)

3. **Automatización Significativa:**
   - Reducción 90% tiempo en procesos manuales
   - Eliminación de errores
   - Trazabilidad completa

4. **Segregación de Funciones:**
   - Auditoría: Liquida y aprueba
   - Facturación: Ejecuta emisión
   - Contabilidad: Registra provisiones
   - Ventas: Evalúa efectividad

5. **Próxima Fase:**
   - Prototipos
   - Validación con usuarios
   - Desarrollo
   - Implementación

---

## FIN DE LAS 17 TRANSCRIPCIONES

**Total de líneas procesadas:** 10,267+ líneas  
**Total de transcripciones:** 17/17 ✓  
**Codificación:** UTF-8 perfecta  
**Estado:** COMPLETADO 🎉

---
