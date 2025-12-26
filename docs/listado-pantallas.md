# Listado de Pantallas - Sistema de Liquidación de Promociones
**Proyecto:** Sistema de Liquidación de Promociones Bagó Ecuador  
**Documento:** Apuntes de Reuniones - Pantallas Requeridas  
**Fecha:** Mayo 2024  
**Analista:** Basado en 17 reuniones con usuarios y stakeholders

---

## 📋 MÓDULO 1: CONTROL INTERNO (Maria Augusta / Maritza)

### 1.1 Pantalla: Recepción de Información del Cliente
**Propósito:** Registrar la información que envían las farmacias/cadenas

**Campos:**
- Cliente (dropdown - desde tabla de interlocutores)
- Tipo de Promoción (PMC, Cupones, Rebates, ACOAI, etc.)
- Fecha de Recepción
- Método de Envío (Email, Físico, Portal)
- Archivos Adjuntos (Excel, PDF, imágenes de cupones)
- Estado (Pendiente Validación, En Proceso, Validado, Rechazado)
- Observaciones

**Funcionalidades:**
- Carga masiva de archivos
- Vista previa de Excel/PDF
- Asignación a analista
- Notificación automática al equipo

**Notas de Reunión:**
> "A veces recibimos 50 correos en un día. Necesitamos poder cargar todo rápido y asignar a quien corresponda." - Maria Augusta

---

### 1.2 Pantalla: Validación de Condiciones
**Propósito:** Validar que la información del cliente cumple con las condiciones de la promoción

**Campos:**
- Información del Cliente (solo lectura)
- Condiciones de la Promoción (cargadas desde Ventas/Marketing)
- Checklist de Validación:
  - ☐ Cliente está en la promoción
  - ☐ Productos corresponden
  - ☐ Período de compra es válido
  - ☐ Volumen/unidades cumplen mínimos
  - ☐ Documentación completa (facturas, cupones, etc.)
- Diferencias Detectadas (tabla)
- Decisión (Aprobar, Rechazar, Solicitar Aclaración)
- Comentarios

**Funcionalidades:**
- Comparación automática: Reclamado vs Condiciones
- Alertas de diferencias
- Histórico de validaciones del cliente
- Exportar reporte de diferencias

**Notas de Reunión:**
> "Necesitamos ver lado a lado lo que el cliente reclama vs lo que realmente le corresponde según las condiciones." - Maritza

---

### 1.3 Pantalla: Generación de Liquidación
**Propósito:** Crear la liquidación final que se enviará a Facturación

**Secciones:**

**A. Datos Generales**
- Número de Liquidación (autogenerado)
- Cliente
- Tipo de Promoción
- Período
- Fecha de Generación
- Analista Responsable

**B. Detalle de Productos** (tabla editable)
- Código SAP
- Nombre del Producto
- Unidades Reclamadas
- Unidades Aprobadas
- Valor Unitario
- Valor Total
- Observaciones por producto

**C. Resumen**
- Total Unidades
- Total Valor
- Descuento Aplicado (%)
- Valor Final a Liquidar

**D. Documentación**
- Facturas de referencia (adjuntas)
- Cupones (si aplica)
- Estados de cuenta
- Otros soportes

**Acciones:**
- Guardar Borrador
- Enviar a Revisión (Maritza)
- Aprobar y Enviar a Facturación (Gaby Cajas)
- Rechazar (vuelve a analista)

**Notas de Reunión:**
> "La liquidación debe ser clara. Gaby debe poder ver exactamente qué productos, cuántas unidades y el valor total." - Maria Augusta

---

### 1.4 Pantalla: Bitácora de Liquidaciones
**Propósito:** Repositorio histórico de todas las liquidaciones

**Filtros:**
- Año
- Mes
- Cliente
- Tipo de Promoción
- Estado (Borrador, En Revisión, Aprobada, Enviada a Facturación, NC Generada)
- Analista

**Columnas de la Tabla:**
- Nº Liquidación
- Fecha
- Cliente
- Tipo Promoción
- Valor Total
- Estado
- Analista
- Acciones (Ver, Editar, Exportar, Historial)

**Funcionalidades:**
- Exportar a Excel (con filtros aplicados)
- Ver histórico de cambios
- Búsqueda rápida por número o cliente
- Estadísticas (total liquidado por mes, por cliente, etc.)

**Notas de Reunión:**
> "Necesitamos poder buscar liquidaciones de hace 6 meses, filtrar por cliente, por tipo de promoción. Todo debe quedar registrado." - Maritza

---

## 📋 MÓDULO 2: FACTURACIÓN (Gaby Cajas)

### 2.1 Pantalla: Solicitudes de NC Pendientes
**Propósito:** Revisar y aprobar solicitudes de notas de crédito antes de generarlas en SAP

**Vista Principal:**
- Tabla con liquidaciones pendientes de aprobación
- Filtros: Fecha, Cliente, Tipo Promoción, Valor
- Selección múltiple (checkbox)

**Columnas:**
- Nº Liquidación
- Nº Interno Control (generado por Maria Augusta)
- Cliente (Interlocutor)
- Tipo Promoción
- Valor Total
- Fecha Solicitud
- Analista
- Factura de Referencia (encontrada automáticamente)
- Acciones (Ver Detalle, Aprobar, Rechazar)

**Panel de Detalle** (al hacer clic en una fila):
- Datos completos de la liquidación
- Productos (tabla)
- Documentación adjunta
- Factura de referencia sugerida por el sistema
- Campos para NC (prellenados):
  - Código Producto SAP
  - Valor por Material
  - Condición de Descuento (dropdown)
  - Motivo de Rechazo (automático según condición)
  - Clase de Documento (18 - Factura)
  - Número de Factura (15 dígitos)
  - Autorización SRI

**Acciones Masivas:**
- Aprobar Seleccionadas → Genera TXT y crea pedido en SAP
- Rechazar Seleccionadas → Vuelve a Control Interno con comentarios
- Exportar Reporte

**Notas de Reunión:**
> "Necesito ver todas las pendientes en una sola pantalla. Selecciono las que están OK y proceso todo de una vez." - Gaby Cajas

---

### 2.2 Pantalla: Generación de NC (Interfaz de Aprobación)
**Propósito:** Procesar las NCs aprobadas y generar en SAP

**Vista Previa del TXT:**
- Mostrar el contenido del TXT que se enviará a SAP
- Resaltar campos críticos (factura de referencia, valor, cliente)

**Información de la NC:**
- Nº Pedido SAP (generado)
- Cliente: Kifatex (quemado)
- Interlocutor: [Cliente final]
- Productos (tabla con código SAP, cantidad, valor)
- Factura de Referencia (encontrada automáticamente)
- Condición de Descuento
- Motivo de Rechazo
- Valor Total

**Acciones:**
- Procesar NC → Ejecuta VA01 + VF01 en SAP
- Cancelar → Vuelve a pendientes
- Ver Log de Errores (si falla)

**Resultado:**
- Nº NC SAP (generado)
- PDF de la NC (descargable)
- Estado: Generada

**Notas de Reunión:**
> "Cuando proceso, el sistema debe decirme inmediatamente el número de NC que se generó en SAP." - Gaby Cajas

---

### 2.3 Pantalla: Bitácora de Notas de Crédito
**Propósito:** Historial completo de todas las NCs generadas

**Filtros:**
- Año
- Mes
- Cliente
- Tipo de Promoción
- Estado (Generada, Enviada a Kifatex, NC Kifatex Recibida)
- Rango de Valores

**Columnas:**
- Nº NC Interna (Control Interno)
- Nº NC SAP
- Nº NC Kifatex (cuando se reciba)
- Fecha Generación
- Cliente
- Tipo Promoción
- Valor
- Estado
- Acciones (Ver PDF, Reenviar Email, Ver Histórico)

**Funcionalidades:**
- Exportar a Excel
- Descargar PDF de NC
- Ver email enviado a Kifatex
- Actualizar Nº NC Kifatex (manual o automático vía integración)

**Notas de Reunión:**
> "Necesito poder buscar una NC de hace 3 meses y ver todo: el PDF, el email que se envió, el número de Kifatex." - Gaby Cajas

---

## 📋 MÓDULO 3: PROVISIONES (Will Aragón - Contabilidad)

### 3.1 Pantalla: Generación de Provisiones Mensuales
**Propósito:** Calcular y generar el reporte de provisiones para cierre de mes

**Parámetros:**
- Mes a Provisionar (dropdown)
- Fecha de Corte (ej. 22 de mayo)
- Tipo de Cálculo:
  - ☐ Promedio 3 meses (para clientes sin información)
  - ☐ Valor estimado (para promociones nuevas)
  - ☐ Valor real (si el cliente envió estado de cuenta)

**Vista Previa del Cálculo:**
- Tabla con clientes y valores calculados
- Columnas:
  - Cliente
  - Tipo Promoción
  - Mes 1 (valor)
  - Mes 2 (valor)
  - Mes 3 (valor)
  - Promedio
  - Valor a Provisionar
  - Método (Promedio / Estimado / Real)
  - Observaciones

**Acciones:**
- Ajustar Manualmente (si es necesario)
- Generar Reporte Excel
- Enviar por Email a Will Aragón
- Guardar en Sistema

**Notas de Reunión:**
> "El sistema debe calcular automáticamente el promedio de 3 meses. Yo solo reviso y envío a Will." - Maria Augusta

---

### 3.2 Pantalla: Revisión de Provisiones (Will Aragón)
**Propósito:** Que Will pueda ver las provisiones pendientes y cambiar el estado tras procesarlas en SAP

**Vista:**
- Tabla con provisiones pendientes de procesar
- Filtros: Mes, Estado

**Columnas:**
- Mes
- Fecha Generación
- Total Clientes
- Valor Total a Provisionar
- Estado (Pendiente, Procesada en SAP, Reversada)
- Archivo Excel (descargable)
- Acciones (Descargar, Marcar como Procesada)

**Detalle:**
- Al hacer clic, ver el desglose por cliente y producto
- Ver el archivo Excel generado
- Botón: "Marcar como Procesada en SAP"
  - Cambia estado
  - Notifica a Control Interno
  - Registra fecha y usuario

**Notas de Reunión:**
> "Will debe poder entrar al sistema, ver la provisión, descargarla, y cuando la procese en SAP, marcarla como procesada para que nosotros sepamos." - Cynthia

---

### 3.3 Pantalla: Histórico de Provisiones
**Propósito:** Ver todas las provisiones generadas y su estado

**Filtros:**
- Año
- Mes
- Estado (Pendiente, Procesada, Reversada)

**Columnas:**
- Mes
- Fecha Generación
- Fecha Procesamiento (en SAP)
- Valor Total
- Estado
- Procesado por (usuario)
- Acciones (Ver Detalle, Descargar Excel, Ver Reversión)

**Funcionalidades:**
- Ver ciclo completo: Provisión → Procesamiento → Reversión
- Exportar histórico
- Comparar provisión vs valor real (al mes siguiente)

**Notas de Reunión:**
> "Necesitamos ver el ciclo completo. En mayo provisionamos $10,000, en junio reversamos y registramos el valor real de $9,500." - Maria Augusta

---

## 📋 MÓDULO 4: CONFIGURACIÓN Y MAESTROS

### 4.1 Pantalla: Tabla de Interlocutores (Sincronización Bagó-Kifatex)
**Propósito:** Mantener la relación entre códigos Bagó y códigos Kifatex

**Campos:**
- Código Bagó (SAP)
- Código Kifatex
- Razón Social
- Nombre Comercial
- Email (para notificaciones)
- Supervisor (nombre y email)
- Visitador (nombre y email)
- Estado (Activo, Inactivo)
- Fecha de Creación
- Última Actualización

**Funcionalidades:**
- Agregar Nuevo Interlocutor
- Editar (solo ciertos campos)
- Desactivar (no eliminar, mantener histórico)
- Importar desde Excel (carga masiva)
- Exportar a Excel
- Búsqueda por código o nombre

**Transacciones SAP Relacionadas:**
- ZSDS003: Mantenimiento Interlocutores
- ZSDS004: Mantenimiento Planes Comerciales

**Notas de Reunión:**
> "Esta tabla es crítica. Cuando Maria Augusta crea un cliente nuevo en el sistema, debe poder agregarlo aquí con ambos códigos." - Peter (SAP)

---

### 4.2 Pantalla: Condiciones de Descuento
**Propósito:** Mantener el catálogo de condiciones de descuento y motivos de rechazo

**Tabla:**
- Código Condición (ej. Z001)
- Nombre (ej. "Plan de Medicación Continua")
- Descripción
- Motivo de Rechazo Asociado (automático)
- Estado (Activo, Inactivo)

**Funcionalidades:**
- Agregar Nueva Condición
- Editar
- Desactivar
- Sincronizar con SAP (leer desde SAP)

**Notas de Reunión:**
> "Las condiciones de descuento están en SAP. El sistema debe poder leerlas y mostrarlas en un dropdown." - Peter (SAP)

---

### 4.3 Pantalla: Configuración de Notificaciones
**Propósito:** Definir quién recibe qué notificaciones

**Secciones:**

**A. Notificaciones de NC**
- Email de Kifatex (quemado: ejecutivo de cuenta)
- Emails en copia:
  - Control Interno (Maria Augusta, Maritza)
  - Facturación (Gaby Cajas)
  - Interlocutores (desde tabla de sincronización)
  - Supervisores (desde tabla de sincronización)
  - Visitadores (desde tabla de sincronización)

**B. Notificaciones de Provisiones**
- Destinatario: Will Aragón
- En copia: Control Interno, Ventas

**C. Plantillas de Email**
- Asunto (editable)
- Cuerpo (editable con variables: {cliente}, {valor}, {fecha}, etc.)
- Archivos adjuntos (PDF NC, Excel)

**Notas de Reunión:**
> "El email debe incluir el PDF de la NC y un Excel con el detalle. Y debe ir a Kifatex, a los interlocutores, y a nosotros." - Gaby Cajas

---

### 4.4 Pantalla: Gestión de Usuarios y Permisos
**Propósito:** Administrar quién puede hacer qué en el sistema

**Roles Definidos:**
1. **Analista Control Interno:** Recepción, validación, generación de liquidaciones
2. **Supervisor Control Interno:** Revisión y aprobación de liquidaciones
3. **Facturación:** Aprobación de NCs, generación en SAP
4. **Contabilidad:** Revisión de provisiones, cambio de estados
5. **Administrador:** Configuración, maestros, usuarios

**Campos por Usuario:**
- Nombre
- Email
- Rol (dropdown)
- Permisos Específicos (checkboxes)
- Estado (Activo, Inactivo)
- Último Acceso

**Funcionalidades:**
- Agregar Usuario
- Editar Permisos
- Desactivar Usuario
- Ver Log de Actividad

**Notas de Reunión:**
> "Gaby solo debe poder aprobar NCs, no crear liquidaciones. Maria Augusta puede crear pero Maritza debe aprobar." - Orlando

---

## 📋 MÓDULO 5: REPORTES Y CONSULTAS

### 5.1 Pantalla: Dashboard Principal
**Propósito:** Vista general del estado del sistema

**Widgets:**
1. **Liquidaciones del Mes**
   - Total Liquidaciones
   - Valor Total
   - Por Estado (gráfico de torta)

2. **NCs Generadas**
   - Total NCs del mes
   - Valor Total
   - Pendientes de envío a Kifatex

3. **Provisiones**
   - Provisión del mes actual
   - Estado (Pendiente/Procesada)

4. **Alertas**
   - Liquidaciones pendientes de aprobación (>3 días)
   - NCs sin número de Kifatex (>7 días)
   - Provisiones no procesadas

**Notas de Reunión:**
> "Necesito entrar y ver rápidamente cuántas liquidaciones tengo pendientes, cuántas NCs generé este mes, y si hay algo urgente." - Maria Augusta

---

### 5.2 Pantalla: Reportes Transaccionales
**Propósito:** Generar reportes operativos del sistema

**Reportes Disponibles:**
1. **Reporte de Liquidaciones por Período**
   - Filtros: Fecha inicio, fecha fin, cliente, tipo promoción
   - Exportar a Excel

2. **Reporte de NCs Emitidas**
   - Filtros: Fecha, cliente, rango de valores
   - Incluye: Nº NC SAP, Nº NC Kifatex, valor, estado
   - Exportar a Excel/PDF

3. **Reporte de Provisiones**
   - Filtros: Mes, año
   - Desglose por cliente y producto
   - Exportar a Excel

4. **Reporte de Conciliaciones**
   - Comparar: Reclamado vs Aprobado
   - Diferencias por cliente
   - Exportar a Excel

**Notas de Reunión:**
> "Los reportes del sistema deben ser simples: filtros, tabla, exportar. Los análisis complejos van a ClickSense." - Arquitecto

---

### 5.3 Pantalla: Consulta de Histórico
**Propósito:** Buscar cualquier transacción histórica

**Búsqueda Avanzada:**
- Por Nº Liquidación
- Por Nº NC (Interna, SAP, Kifatex)
- Por Cliente
- Por Producto
- Por Rango de Fechas
- Por Analista

**Resultado:**
- Tabla con todas las coincidencias
- Opción de ver detalle completo
- Exportar resultados

**Notas de Reunión:**
> "A veces un cliente me pregunta por una NC de hace 6 meses. Necesito poder buscarla rápido por número o por cliente." - Gaby Cajas

---

## 📋 MÓDULO 6: INTEGRACIONES

### 6.1 Pantalla: Monitor de Integración SAP
**Propósito:** Ver el estado de las integraciones con SAP

**Información:**
- Última sincronización exitosa
- Errores recientes (tabla)
- NCs pendientes de envío a SAP
- Facturas consultadas (log)

**Acciones:**
- Reintentar envío (si falló)
- Ver log de errores
- Sincronizar manualmente

**Notas de Reunión:**
> "Si algo falla con SAP, necesitamos saberlo inmediatamente y poder reintentar." - Peter (SAP)

---

### 6.2 Pantalla: Monitor de Integración Kifatex
**Propósito:** Ver el estado de la integración con Kifatex (FTP/API)

**Información:**
- Última recepción de archivo
- NCs enviadas a Kifatex (pendientes de respuesta)
- NCs con número de Kifatex recibido
- Errores de integración

**Acciones:**
- Actualizar manualmente Nº NC Kifatex
- Reenviar notificación
- Ver archivo recibido de Kifatex

**Notas de Reunión:**
> "Kifatex debe enviarnos un archivo con el número de NC que ellos generaron. El sistema debe leerlo y actualizar automáticamente." - Jonnathan (Manticore)

---

## 📋 PANTALLAS ADICIONALES (Casos Especiales)

### 7.1 Pantalla: Actualización de Códigos Homologados
**Propósito:** Actualizar códigos de pacientes sin perder histórico (Protección de Datos)

**Campos:**
- Código Anterior
- Código Nuevo
- Cliente (Farmacia)
- Fecha de Cambio
- Motivo
- Usuario

**Funcionalidades:**
- Búsqueda de código anterior
- Actualización masiva (importar Excel)
- Ver histórico de cambios
- Validar que no se pierda información

**Notas de Reunión:**
> "Si una farmacia cambia el código de un paciente, necesitamos actualizar sin perder el histórico de compras." - Maria Augusta

---

### 7.2 Pantalla: Gestión de Excepciones
**Propósito:** Manejar casos especiales que no siguen el flujo normal

**Casos:**
1. **NC Manual:** Gaby necesita crear una NC fuera del flujo normal
2. **Ajuste de Liquidación:** Modificar una liquidación ya aprobada
3. **Reversión de Provisión:** Reversar una provisión antes de tiempo

**Campos:**
- Tipo de Excepción
- Justificación (obligatorio)
- Aprobador (supervisor)
- Documentación de soporte

**Notas de Reunión:**
> "Siempre hay casos especiales. Necesitamos poder manejarlos pero con controles y aprobaciones." - Maritza

---

## 📝 RESUMEN DE PANTALLAS POR MÓDULO

| Módulo | # Pantallas | Prioridad |
|--------|-------------|-----------|
| Control Interno | 4 | Alta |
| Facturación | 3 | Alta |
| Provisiones | 3 | Alta |
| Configuración | 4 | Media |
| Reportes | 3 | Media |
| Integraciones | 2 | Alta |
| Casos Especiales | 2 | Baja |
| **TOTAL** | **21** | - |

---

## 🎯 PRIORIZACIÓN SUGERIDA

### Fase 1 (MVP - 3 meses):
1. Recepción de Información
2. Validación de Condiciones
3. Generación de Liquidación
4. Solicitudes de NC Pendientes
5. Generación de NC
6. Tabla de Interlocutores
7. Bitácora de Liquidaciones
8. Bitácora de NCs

### Fase 2 (4-6 meses):
9. Generación de Provisiones
10. Revisión de Provisiones (Will)
11. Dashboard Principal
12. Reportes Transaccionales
13. Configuración de Notificaciones
14. Gestión de Usuarios

### Fase 3 (7-9 meses):
15. Monitor de Integración SAP
16. Monitor de Integración Kifatex
17. Histórico de Provisiones
18. Consulta de Histórico
19. Condiciones de Descuento
20. Actualización de Códigos Homologados
21. Gestión de Excepciones

---
