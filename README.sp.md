[ 🌐 عربي ](README.ar.md) | [ 🇪🇸 Español ](README.sp.md) | [ 🇬🇧 English ](README.md)

# Plantilla de Excel para estimación de construcción residencial: Herramienta de seguimiento de costos de BOQ y gestión del presupuesto del proyecto

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)
[![Platform](https://img.shields.io/badge/Platform-Browser%20%2B%20Excel-informational.svg)](#)
[![Tool Type](https://img.shields.io/badge/Tool%20Type-Decision%20Support-success.svg)](#)

<p>La <strong>estimación de construcción residencial</strong> hecha simple. Convierta los levantamientos de cantidades (takeoff) de planos arquitectónicos, los precios unitarios, las cotizaciones de subcontratistas y los costos iniciales del proyecto en una <strong>estimación de construcción</strong> rigurosamente controlada. Ya sea que necesite una <strong>calculadora de costos</strong> rápida en el navegador o una <strong>plantilla de presupuesto de Excel descargable para contratistas generales</strong>, esta herramienta evita los sobrecostos y estandariza su flujo de trabajo de <strong>listado de cantidades (BOQ)</strong>.</p>

<p><strong>Sin registro. Sin instalación. Gratis en su navegador.</strong></p>

Pruebe la versión en navegador gratis. Si necesita la versión de Excel completamente desbloqueada para el costeo de obras permanente, puede comprarla con una garantía de devolución del dinero de 30 días, sin preguntas.

> [🌐 Lanzar el estimador de construcción gratuito en línea](https://hyvoid.github.io/residential-boq-template/)
>
> [📥 Descargar la plantilla de Excel para estimación residencial](https://www.theseusworkshop.com/l/rxxzven?utm_source=github&utm_medium=GitHub%20README&utm_campaign=readme%20new%20launch&utm_content=residential-boq-estimating)

## ¿Quieres probarlo?

Este proyecto está incluido en el Construction Toolkit.

Prueba esta y otras herramientas ligeras de construcción gratis durante 30 días — incluyendo herramientas para estimación, licitaciones, costos de obra y operaciones diarias.

→ [Prueba el Construction Toolkit](https://theseusworkshop.com/l/fqtoi/BIDSEASON?utm_source=github&utm_medium=GitHub%20portfolio)

## Cómo resuelve sus puntos críticos de estimación

En lugar de limitarse a enumerar funciones, así es como esta hoja de cálculo resuelve los desafíos comunes de gestión de ofertas y costeo de obras:

| Punto crítico común | Cómo lo resuelve este libro de Excel |
| :--- | :--- |
| **Pedidos de materiales inexactos** | Aplica automáticamente supuestos de desperdicio predeterminados o personalizados para dar seguimiento a las **cantidades de adquisición ajustadas**. |
| **Perder dinero por falta de visibilidad de costos** | Calcula con precisión los **costos de materiales, mano de obra y equipos/subcontratistas** de cada línea del BOQ. |
| **Puntos ciegos de costos por gremio** | Visualiza la **concentración de costos por División**, mostrando la participación de cada gremio y el costo por pie cuadrado. |
| **Pagar de más a los subcontratistas** | Compara las **estimaciones internas frente a las ofertas externas**, destacando al instante la cotización más baja y la variación. |
| **Sobrecostos que pasan desapercibidos** | Cruza los **presupuestos aprobados con los costos reales de obra**, con alertas automáticas para las Divisiones con sobrecosto. |
| **Reportes desordenados para el cliente** | Genera un panel limpio que detalla las **estimaciones totales, la contingencia, los costos unitarios y los 3 principales generadores de costos**. |

## Escenarios de costos de construcción: Cuándo usar esta hoja de cálculo de estimación

Este flujo de trabajo recoge los escenarios de búsqueda más frecuentes en gestión de la construcción:

* **Licitación de viviendas personalizadas:** Elabore rápidamente un listado de cantidades (BOQ) completo para presentar a los clientes ofertas competitivas y sólidas desde el punto de vista matemático.
* **Gestión de ofertas de subcontratistas y variaciones:** Evalúe las cotizaciones en competencia de plomeros, electricistas o carpinteros de estructura contra su línea base interna para asegurarse de no pagar una prima de mercado.
* **Seguimiento de sobrecostos en remodelaciones de viviendas:** Supervise los gastos reales durante una renovación de cocina o de toda la casa, y detecte las fugas de presupuesto antes de que termine el proyecto.
* **Estandarización de los procedimientos de estimación de la empresa:** Pase a su equipo pequeño de construcción de hojas de cálculo fragmentadas y propensas a errores a un marco unificado de control de costos.

## Para quién es: Roles y casos de uso

Este conjunto de herramientas tiende un puente entre las hojas de cálculo básicas y el software empresarial de construcción costoso. Está fuertemente optimizado para:

* **Contratistas generales:** Necesitan una *plantilla de estimación de construcción residencial* para compilar rápidamente ofertas detalladas de múltiples gremios.
* **Gerentes de proyecto:** Buscan una *hoja de cálculo de seguimiento del presupuesto del proyecto* para monitorear los gastos reales frente a los presupuestos aprobados en obra.
* **Estimadores residenciales:** Requieren una *herramienta de cálculo de BOQ* que estandarice los factores de desperdicio, las tarifas de mano de obra y el impuesto a las ventas en toda la organización.
* **Constructores y remodeladores de viviendas:** Buscan un *software de costeo de renovaciones de viviendas* para manejar proyectos de 1,500–2,200 sq ft sin una suscripción de software onerosa.
* **Subcontratistas y gremios especializados:** Necesitan una *hoja de Excel de costeo de obras* para construir sus precios internos antes de presentar cotizaciones competitivas.

*(Nota: **No** está diseñado como un ERP empresarial, una plataforma completa de gestión de la construcción ni un reemplazo de sistemas de contabilidad de proyectos dedicados como QuickBooks.)*

## Tutorial de inicio rápido: Su flujo de trabajo de estimación

Siga estos pasos para elaborar su primera estimación. **Acción requerida:** Pruebe primero la lógica de cálculo en el navegador.

1. **Configure los parámetros del proyecto (supuestos globales).**
   Abra `00_Parameters`. Defina su tasa de desperdicio predeterminada, la asignación de contingencia, la tasa de impuesto a las ventas, la moneda y la lista estándar de Divisiones CSI. *Consejo profesional: configurar estos valores globalmente evita errores de captura manual de datos más adelante.*

2. **Inicialice su proyecto de construcción.**
   Vaya a `01_Project_Setup`. Ingrese la identidad del proyecto, la dirección, la versión de la estimación y el área bruta construida. Esto establece la línea base para sus métricas de costo por pie cuadrado.

3. **Realice el levantamiento de cantidades (takeoff) del BOQ (construcción central de costos).**
   Use `02_BOQ_Takeoff` como su espacio de trabajo principal. Agregue descripciones de partidas, referencias de planos, cantidades base y métricas de unidad. Ingrese sus tarifas de materiales, mano de obra y equipos. *El sistema aplica automáticamente los supuestos de desperdicio y calcula los costos totales de cada partida.*

4. **Audite las ofertas de subcontratistas y dé seguimiento a la variación del presupuesto.**
   Revise `03_Division_Summary` para ver el desglose de sus costos. Ingrese los precios de proveedores externos en `04_Subcontractor_Comparison` para comparar con el mercado. Finalmente, registre los gastos reales en `05_Budget_Cost_Control` para activar alertas automáticas de sobrecosto.

5. **Revise el panel ejecutivo y exporte.**
   Abra `06_Dashboard` para revisar sus KPI, los 3 principales generadores de costos y los márgenes finales del proyecto.
   
   ➔ **Siguiente paso:** Después de evaluar este flujo de trabajo en el navegador, **[descargue la plantilla de Excel de estimación reutilizable](https://www.theseusworkshop.com/l/rxxzven?utm_source=github&utm_medium=GitHub%20README&utm_campaign=readme%20new%20launch&utm_content=residential-boq-estimating)**. Guárdela como su archivo maestro para estandarizar cada oferta futura de proyecto y cada ciclo de control de costos.

## Por qué construí esta herramienta de control de costos

La estimación residencial suele fallar antes de que fallen las operaciones aritméticas.

Una cantidad puede provenir de un plano arquitectónico, un precio unitario de un proveedor, y una oferta de subcontratista puede llegar días después en un formato completamente distinto. Cuando esos números se revisan en hojas de cálculo separadas, responder una pregunta crítica se vuelve casi imposible:

**¿Cuál es la base de costos actual de este proyecto y dónde está el próximo riesgo de costo de materiales?**

La falla suele ser estructural. Un levantamiento de cantidades (takeoff) puede ser matemáticamente correcto y, aun así, la estimación final sigue siendo engañosa porque los factores de desperdicio, el impuesto a las ventas de materiales, las cargas de mano de obra o la contingencia del proyecto no se han aplicado de manera consistente.

Este libro de Excel trata el **listado de cantidades (BOQ)** como la fuente central de costos. Por ejemplo, su estimación interna puede mostrar una División en `$42,000`, mientras que la cotización más baja del subcontratista es de `$48,500`. La capa de comparación hace visible la variación de `$6,500` contra exactamente la misma línea base interna, aclarando si el mercado es caro o si su levantamiento original estaba incompleto.

## Cómo superar los problemas comunes de estimación

| Punto crítico común de estimación | Flujo de trabajo tradicional en hoja de cálculo | Solución de la plantilla de estimación optimizada |
| :--- | :--- | :--- |
| **Supuestos de desperdicio inconsistentes** | Las distintas líneas del BOQ usan cálculos ocultos e implícitos, lo que hace poco confiables los pedidos de materiales. | Las tasas de desperdicio específicas por partida anulan el valor predeterminado, mientras que los valores en blanco heredan al instante un parámetro centralizado de desperdicio predeterminado. |
| **Impuesto a las ventas de materiales omitido** | Las tarifas de materiales se tratan por error como costos finales, ignorando las obligaciones fiscales locales. | Las fórmulas de costo de materiales multiplican e incorporan automáticamente el parámetro centralizado de impuesto a las ventas. |
| **Costos por gremio fragmentados** | La gerencia revisa las ofertas individuales de cada gremio, pero carece de una jerarquía de costos unificada a nivel de División. | Dieciséis Divisiones estándar de construcción residencial proporcionan una capa de agregación común y automatizada. |
| **Benchmarking difícil de subcontratistas** | Las ofertas se aceptan o rechazan a ciegas, sin una comparación uno a uno contra la estimación interna. | La cotización más baja, el proveedor ganador, la variación en dólares y la variación porcentual se calculan automáticamente y en paralelo. |
| **Descubrimiento tardío de sobrecostos del presupuesto** | Los costos reales de obra viven en el software de contabilidad, totalmente desconectados del presupuesto del estimador original. | Las líneas base estimadas, los presupuestos aprobados y los costos reales se alinean por División, con una bandera de estado automática `OVER BUDGET`. |
| **Falta de contexto de costos para la gerencia** | Un único número de "Costo total" no revela qué fases específicas de la construcción están impulsando el precio al alza. | Los KPI del panel exponen al instante la estimación total, el margen de contingencia, el costo por pie cuadrado, los componentes principales y las 3 Divisiones principales. |

## Acerca de

Construyo seguimientos ligeros y herramientas de apoyo a la decisión para situaciones donde hay demasiadas piezas en movimiento para sostenerlas en la cabeza, pero no la suficiente complejidad como para justificar una implementación de software de gran escala.

La pregunta central es simple:

> **¿Qué información necesita estar en un solo lugar para tomar la siguiente decisión con confianza?**

Este conjunto de herramientas de BOQ residencial aplica ese enfoque a la estimación y el control de costos: establezca los supuestos una sola vez, capture los insumos operativos, mantenga conectada la cadena de cálculo y exponga las decisiones de costos que importan.

## Detalles técnicos

<details>
<summary>Para revisores técnicos, practicantes de Excel y colaboradores</summary>

### Arquitectura del libro de Excel

El libro de Excel contiene siete hojas centrales dispuestas como un flujo controlado de entrada → cálculo → análisis → decisión.

| Capa            | Hoja                          | Función                                                      | Entrada / Cálculo               |
| -------------- | ----------------------------- | ------------------------------------------------------------ | ------------------------------- |
| Parámetros     | `00_Parameters`               | Supuestos globales y lista maestra de Divisiones             | Configuración manual            |
| Configuración del proyecto | `01_Project_Setup` | Identidad del proyecto y área bruta                          | Captura manual                  |
| Datos maestros | `02_BOQ_Takeoff`              | BOQ central, cantidades, tarifas y construcción de costos por partida | Captura manual + fórmulas dinámicas |
| Análisis       | `03_Division_Summary`         | Agregación de costos a nivel de División                     | Generado por fórmulas           |
| Comparación    | `04_Subcontractor_Comparison` | Estimación interna frente a cotizaciones de Sub A/B/C        | Cotizaciones manuales + fórmulas |
| Control        | `05_Budget_Cost_Control`      | Estimado frente a presupuesto aprobado frente a real         | Presupuesto/real manual + fórmulas |
| Capa de decisión | `06_Dashboard`              | KPI del proyecto, estructura de costos e indicadores de riesgo | Generado por fórmulas + gráficos |

La cadena de dependencias prevista es:

```text
00_Parameters
      │
      ├── default waste rate
      ├── contingency rate
      ├── sales tax rate
      └── master Division list
              │
              ▼
01_Project_Setup ───────────────┐
      │                         │
      ▼                         │
02_BOQ_Takeoff                  │
      │                         │
      ├── Material Cost         │
      ├── Labour Cost           │
      ├── Equip/Sub Cost        │
      └── Total Item Cost       │
              │                 │
              ▼                 ▼
03_Division_Summary       05_Budget_Cost_Control
              │
              ├───────────────► 04_Subcontractor_Comparison
              │
              ▼
        06_Dashboard
```

`02_BOQ_Takeoff` es la **única fuente de verdad** para los datos detallados de la estimación. Las hojas posteriores no deben recrear de forma independiente la lógica de costos por partida.

### Límites entre entrada y cálculo

La hoja de BOQ separa deliberadamente los campos capturados por el usuario de los campos generados por fórmulas.

| Área          | Columnas | Control                                                  |
| ------------ | ------- | -------------------------------------------------------- |
| Captura manual | A:H   | División, información de la partida, cantidades, unidades y desperdicio |
| Fórmula      | I       | Cantidad ajustada                                        |
| Captura manual | J     | Tarifa de material                                       |
| Fórmula      | K       | Costo de material                                        |
| Captura manual | L     | Tarifa de mano de obra                                   |
| Fórmula      | M       | Costo de mano de obra                                    |
| Captura manual | N     | Tarifa de equipo/subcontrato                             |
| Fórmula      | O:P     | Costo de equipo/subcontrato y costo total de la partida  |

Esta separación reduce el riesgo de reemplazar accidentalmente fórmulas con valores fijos.

### Tres trampas que atrapan incluso a estimadores con experiencia

#### Trampa 1 — Tratar la cantidad base como la cantidad de compra

**1. Decisión:** Un pedido de materiales se basa directamente en la cantidad del levantamiento del plano.

**2. Supuesto erróneo:** La cantidad del plano se trata como la cantidad final de adquisición.

**3. Cambio en la recomendación:** Un levantamiento de `1,000 sq ft` con un margen de desperdicio del `5%` debería resultar en `1,050 sq ft`, no en `1,000 sq ft`.

**4. Por qué es incorrecto:** Los requisitos de adquisición y construcción pueden exceder la cantidad neta medida.

**5. Enfoque corregido:** Aplique la tasa de desperdicio específica de la partida cuando esté disponible; de lo contrario, herede el valor predeterminado centralizado.

**6. Resultado corregido:** La estimación lleva `1,050 sq ft` como cantidad ajustada.

<details>
<summary>Fórmula</summary>

```excel
=IF(F5:F1000="","",
   F5:F1000*(1+IF(ISNUMBER(H5:H1000),
                   H5:H1000,
                   '00_Parameters'!$C$4)))
```

`F` = Cantidad base
`H` = % de desperdicio de la partida
`00_Parameters!C4` = Tasa de desperdicio predeterminada

</details>

---

#### Trampa 2 — Comparar una cotización de subcontratista con una estimación interna incompleta

**1. Decisión:** Una cotización de subcontratista se evalúa como cara porque excede la estimación interna.

**2. Cifra errónea:** La estimación interna puede omitir un tratamiento fiscal consistente u otros componentes de costo.

**3. Cambio en la recomendación:** Una cotización de `$48,500` contra una línea base de `$42,000` parece `$6,500` demasiado alta.

**4. Por qué es incorrecto:** La comparación solo es útil cuando la estimación interna representa una base de costos consistente.

**5. Enfoque corregido:** Use la estimación calculada de la División como línea base y luego identifique la más baja entre Sub A, Sub B y Sub C.

**6. Resultado corregido:** El equipo puede distinguir una prima de mercado genuina de una línea base interna subestimada antes de negociar o seleccionar un proveedor.

<details>
<summary>Fórmula</summary>

```excel
=BYROW(C4:E19,LAMBDA(row,
    LET(
        minVal,MIN(row),
        vendor,XLOOKUP(minVal,row,$C$3:$E$3,"N/A"),
        HSTACK(minVal,vendor)
    )
))
```

La cotización mínima resultante alimenta el cálculo de la variación frente a la estimación interna.

</details>

---

#### Trampa 3 — Observar el costo real sin una línea base presupuestaria

**1. Decisión:** El gasto real del proyecto se revisa de forma aislada.

**2. Métrica errónea:** `$37,800` de costo real no tiene significado para la decisión sin el presupuesto aprobado.

**3. Cambio en la recomendación:** Si el presupuesto aprobado es de `$35,000`, el mismo `$37,800` representa un sobrecosto de `$2,800`.

**4. Por qué es incorrecto:** El costo real absoluto no permite identificar si el desempeño de costos es aceptable.

**5. Enfoque corregido:** Compare el Costo real directamente contra el Presupuesto aprobado por División.

**6. Resultado corregido:** El sistema marca la División como **OVER BUDGET**, creando una señal de control clara.

<details>
<summary>Fórmula</summary>

```excel
=HSTACK(
    D4:D19-C4:C19,
    IF(D4:D19>C4:C19,
       "⚠️ OVER BUDGET",
       "✅ OK")
)
```

`C` = Presupuesto aprobado
`D` = Costo real

</details>

### Escenario de ejemplo

Considere un proyecto residencial con **2,000 sq ft** de área bruta.

El proyecto se inicializa con una **tasa de desperdicio predeterminada del 5%**, una **contingencia del 10%** y un **impuesto a las ventas del 8%**. El estimador captura el BOQ en `02_BOQ_Takeoff`.

Suponga que una línea del BOQ contiene:

| Entrada          |       Valor |
| -------------- | ----------: |
| Cantidad base  | 1,000 sq ft |
| Desperdicio de la partida |  En blanco |
| Tarifa de material |       $4.00 |
| Tarifa de mano de obra |  $2.50 |
| Tarifa de equipo/subcontrato | $0.50 |

Como el campo de desperdicio específico de la partida está en blanco, el modelo hereda el 5% predeterminado. La cantidad ajustada se convierte en:

```text
1,000 × (1 + 5%) = 1,050 sq ft
```

El costo de materiales incluye el impuesto a las ventas del 8%:

```text
1,050 × $4.00 × 1.08 = $4,536
```

El costo de mano de obra es:

```text
1,050 × $2.50 = $2,625
```

El costo de equipo/subcontrato es:

```text
1,050 × $0.50 = $525
```

El costo total de la partida resultante es:

```text
$4,536 + $2,625 + $525 = $7,686
```

Luego la línea fluye hacia `03_Division_Summary`, donde contribuye a los costos de material, mano de obra, equipo/subcontrato y total de la División correspondiente.

Suponga que la estimación de construcción resultante a nivel de proyecto es de `$300,000`. La reserva de contingencia es:

```text
$300,000 × 10% = $30,000
```

Por lo tanto, el panel presenta una estimación del proyecto con contingencia incluida de:

```text
$300,000 + $30,000 = $330,000
```

Con 2,000 sq ft, el indicador de costo resultante a nivel de proyecto es:

```text
$330,000 ÷ 2,000 = $165 / sq ft
```

La interpretación operativa no es simplemente que el proyecto cuesta `$330,000`. El modelo también muestra **qué Divisiones crean esa cifra, cuánto de la estimación corresponde a materiales frente a mano de obra frente a equipo/subcontrato, si los precios de los subcontratistas están por encima de la línea base interna y si el gasto real ha excedido el presupuesto aprobado**.

Eso hace que el libro de Excel sea útil para la estimación, la revisión de ofertas, el control del presupuesto y los reportes para la gerencia, sin tener que reconstruir la cadena de cálculo en cada revisión.

### Referencia de fórmulas

<details>
<summary>00_Parameters y configuración del proyecto</summary>

Los parámetros globales se mantienen de forma centralizada:

```text
C4 = Default Waste Rate
C5 = Contingency Rate
C6 = Sales Tax Rate
C7 = Currency Symbol
E4:E19 = Master Division List
```

`01_Project_Setup!C6` almacena el Área Bruta y proporciona el denominador para los cálculos de costo por pie cuadrado.

</details>

<details>
<summary>02_BOQ_Takeoff — cálculos por partida</summary>

**Cantidad ajustada — `I5`**

```excel
=IF(F5:F1000="","",
   F5:F1000*(1+IF(ISNUMBER(H5:H1000),
                   H5:H1000,
                   '00_Parameters'!$C$4)))
```

**Costo de material — `K5`**

```excel
=IF(F5:F1000="","",
   I5:I1000*J5:J1000*(1+'00_Parameters'!$C$6))
```

**Costo de mano de obra — `M5`**

```excel
=IF(F5:F1000="","",
   I5:I1000*L5:L1000)
```

**Costo de equipo/subcontrato — `O5`**

```excel
=IF(F5:F1000="","",
   I5:I1000*N5:N1000)
```

**Costo total de la partida — `P5`**

```excel
=IF(F5:F1000="","",
   K5:K1000+M5:M1000+O5:O1000)
```

Las fórmulas están diseñadas como cálculos de matriz dinámica, de modo que la lógica de cálculo se establece al inicio del rango designado en lugar de copiarse manualmente fila por fila.

</details>

<details>
<summary>03_Division_Summary — agregación</summary>

**Lista de Divisiones — `A4`**

```excel
='00_Parameters'!E4:E19
```

**Material, Mano de obra, Equipo/Subcontrato y Costo total — `B4`**

```excel
=BYROW(A4#,LAMBDA(d,
    HSTACK(
        SUMIFS('02_BOQ_Takeoff'!K5:K1000,
               '02_BOQ_Takeoff'!A5:A1000,d),
        SUMIFS('02_BOQ_Takeoff'!M5:M1000,
               '02_BOQ_Takeoff'!A5:A1000,d),
        SUMIFS('02_BOQ_Takeoff'!O5:O1000,
               '02_BOQ_Takeoff'!A5:A1000,d),
        SUMIFS('02_BOQ_Takeoff'!P5:P1000,
               '02_BOQ_Takeoff'!A5:A1000,d)
    )
))
```

**Participación de costos y Costo / pie cuadrado — `F4`**

```excel
=HSTACK(
    INDEX(B4#,,4)/SUM(INDEX(B4#,,4)),
    INDEX(B4#,,4)/'01_Project_Setup'!$C$6
)
```

</details>

<details>
<summary>04_Subcontractor_Comparison — comparación de mercado</summary>

**Estimación interna — `B4`**

```excel
='03_Division_Summary'!E4#
```

**Cotización más baja y proveedor — `F4`**

```excel
=BYROW(C4:E19,LAMBDA(row,
    LET(
        minVal,MIN(row),
        vendor,XLOOKUP(minVal,row,$C$3:$E$3,"N/A"),
        HSTACK(minVal,vendor)
    )
))
```

**Variación frente a la base y Variación % — `H4`**

```excel
=HSTACK(
    F4#-B4#,
    (F4#-B4#)/B4#
)
```

</details>

<details>
<summary>05_Budget_Cost_Control — variación del presupuesto</summary>

**Variación del presupuesto y bandera de estado — `E4`**

```excel
=HSTACK(
    D4:D19-C4:C19,
    IF(D4:D19>C4:C19,
       "⚠️ OVER BUDGET",
       "✅ OK")
)
```

</details>

<details>
<summary>06_Dashboard — KPI de gerencia</summary>

**Estimación total**

```excel
=SUM('03_Division_Summary'!E4#)
```

**Contingencia**

```excel
=B4*'00_Parameters'!$C$5
```

**Total general**

```excel
=B4+B5
```

**Costo / pie cuadrado**

```excel
=B6/'01_Project_Setup'!$C$6
```

**3 Divisiones principales por costo**

```excel
=CHOOSEROWS(
    SORT('03_Division_Summary'!A4:E19,5,-1),
    1,2,3
)
```

</details>

### Reglas de validación

| Campo                             | Regla                                            | Comportamiento ante errores                                         |
| --------------------------------- | ------------------------------------------------ | ------------------------------------------------------------------- |
| `00_Parameters!C4`                | La tasa de desperdicio predeterminada debe ser un porcentaje | Un porcentaje inválido produce cantidades ajustadas poco confiables |
| `00_Parameters!C5`                | La tasa de contingencia debe ser un porcentaje   | Un valor inválido afecta el total general                           |
| `00_Parameters!C6`                | La tasa de impuesto a las ventas debe ser un porcentaje | El cálculo del costo de materiales se vuelve incorrecto        |
| `00_Parameters!E4:E19`            | La lista de Divisiones es la lista maestra controlada | Nombres de División inconsistentes rompen la agregación        |
| `01_Project_Setup!C6`             | El Área Bruta debe ser numérica y positiva       | De lo contrario, los cálculos de costo por pie cuadrado no pueden ser válidos |
| `02_BOQ_Takeoff!A:A`              | La División debe seleccionarse de la lista maestra | Los valores sin coincidencia pueden no aparecer en los resúmenes por División |
| `02_BOQ_Takeoff!F:F`              | La Cantidad base debe ser numérica               | Las salidas de las fórmulas permanecen en blanco cuando no hay una cantidad válida |
| `02_BOQ_Takeoff!G:G`              | La unidad debe almacenarse por separado de la cantidad | Evita que cantidades como `1500 sq ft` se traten como texto   |
| `02_BOQ_Takeoff!H:H`              | El % de desperdicio de la partida puede estar en blanco o ser un porcentaje numérico | Los valores en blanco heredan el valor predeterminado global |
| `02_BOQ_Takeoff!J:J`              | La tarifa de material debe ser numérica          | El costo de materiales no puede calcularse correctamente a partir de texto |
| `02_BOQ_Takeoff!L:L`              | La tarifa de mano de obra debe ser numérica      | El costo de mano de obra no puede calcularse correctamente a partir de texto |
| `02_BOQ_Takeoff!N:N`              | La tarifa de equipo/subcontrato debe ser numérica | El costo de equipo/subcontrato no puede calcularse correctamente a partir de texto |
| `04_Subcontractor_Comparison!C:E` | Los valores de cotización deben ser numéricos    | La lógica de la cotización más baja puede fallar o devolver comparaciones inválidas |
| `05_Budget_Cost_Control!C:C`      | El Presupuesto aprobado debe ser numérico        | La variación del presupuesto no puede evaluarse correctamente       |
| `05_Budget_Cost_Control!D:D`      | El Costo real debe ser numérico                  | El estado del presupuesto no puede evaluarse correctamente          |
| Rangos de derrame de fórmulas     | Las celdas de destino deben permanecer libres    | Excel devuelve `#SPILL!` cuando están bloqueados                    |
| Cálculo del libro de Excel        | Excel debe usar el cálculo automático            | Los parámetros actualizados pueden no propagarse de inmediato       |
| Versión de Excel                  | Microsoft 365 o Excel 2021+                      | Las versiones anteriores pueden devolver `#NAME?` para funciones no compatibles |

### Validación entre hojas

Las referencias de parámetros principales del modelo son deliberadamente rastreables:

```text
00_Parameters!C4  → 02_BOQ_Takeoff!I5
Default Waste Rate → Adjusted Qty

00_Parameters!C5  → 06_Dashboard!B5
Contingency Rate   → Contingency

00_Parameters!C6  → 02_BOQ_Takeoff!K5
Sales Tax Rate     → Material Cost

00_Parameters!E4:E19 → 03_Division_Summary!A4
Master Divisions     → Division aggregation

01_Project_Setup!C6 → 03_Division_Summary!G4
Gross Area           → Division cost / sq ft

01_Project_Setup!C6 → 06_Dashboard!B7
Gross Area           → Project cost / sq ft
```

La especificación de implementación proporcionada indica que estas referencias de parámetros forman una cadena de cálculo cerrada, sin referencias rotas identificadas ni parámetros de control fijos en el código.

### Notas de operación y mantenimiento

**Entorno de Excel recomendado**

* Microsoft 365 o Excel 2021+.
* Debe haber soporte para funciones de matriz dinámica.
* El cálculo automático debe permanecer habilitado.

**Volumen de BOQ recomendado**

La especificación de implementación recomienda mantener el BOQ dentro de aproximadamente **10,000 filas** por razones de rendimiento de cálculo, mientras que se espera que los proyectos residenciales típicos usen alrededor de **200–1,000 filas**.

**Mantenimiento de datos**

* Capture los datos sin procesar solo en las áreas designadas de captura manual.
* No sobrescriba las celdas generadas por fórmulas.
* Agregue los nuevos registros del BOQ directamente al rango de entrada designado.
* Cambie los supuestos globales solo en `00_Parameters`.
* Use el menú desplegable estándar de Divisiones en lugar de crear manualmente nuevos nombres de División.

**Solución de problemas**

Para `#SPILL!`, inspeccione el rango de derrame previsto en busca de texto, números, espacios u otro contenido existente.

Si una nueva línea del BOQ no aparece en el resumen por División, verifique que la División coincida exactamente con la lista maestra controlada.

Si los cambios de parámetros no se propagan, verifique que el modo de cálculo de Excel esté establecido en **Automático**.

Si los campos de costo aparecen en blanco, verifique que `Base Qty` contenga un valor numérico y que las unidades se capturen por separado en el campo `Unit`.

</details>

## Otras herramientas de esta serie

Una pequeña colección de herramientas ligeras de apoyo a la decisión, en Excel y en el navegador, que cubren la estimación, el presupuesto, el análisis operativo y la planificación financiera.

* **Project Operations & Job Costing Toolkit** — conecta las estimaciones del proyecto, los costos de ejecución y la revisión de rentabilidad.
* **Pricing & Break-even Decision Calculator** — evalúa precios, margen, contribución y escenarios de punto de equilibrio.
* **Manufacturing Labor Cost & Capacity Planning Toolkit** — conecta los requisitos de mano de obra con la capacidad de producción disponible.

## Licencia

Este proyecto se publica bajo la **Apache License 2.0**.

Consulte el archivo [`LICENSE`](LICENSE) para ver el texto completo de la licencia.
