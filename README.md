# 0926-WEP — Especificar impresora para caja y tarima por usuario

Prototipo HTML de la pantalla **Etiqueta de impresión** con la sección **Impresoras por usuario**.

Los estilos, layout y componentes reutilizan el shell WEP y los tokens del prototipo
`0826-WEP-Modificaciones pantalla impresión etiquetas productos` (top bar, sidebar, campos de
40 px, tipografías Inter/Roboto, colores `#596c7b`, `#2196f3`, `#d6d6d6`, `#00263a`).

## Cómo ejecutarlo

```bash
cd "0926-wep-especificar impresora para caja y tarima por usuario"
python3 -m http.server 8140
```

Abrir <http://localhost:8140/> (redirige a `configuracion-etiqueta-impresion.html`).

## Archivos

Todos los recursos están en un solo nivel, sin carpetas hijas.

| Archivo | Rol |
| --- | --- |
| `index.html` | Redirección al prototipo |
| `configuracion-etiqueta-impresion.html` | Pantalla del prototipo |
| `wep-label-config.css` | Componentes de esta pantalla |
| `wep-label-config.js` | Precarga, listados de impresoras y exclusión entre rubros |
| `wep-asn-print.css` | Tokens y componentes base del formulario WEP |
| `wep-topbar.css`, `wep-sidebar.css` | Shell WEP |
| `icon-*.svg`, `logo-wep-icon.svg`, `badge-*.svg`, `hamburger-color.svg` | Iconografía |

## Cobertura de la historia de usuario

- Nombre de la configuración de etiqueta de impresión como título de la pantalla.
- Subheader **Impresoras por usuario**.
- **Usuario** y **Almacén** (strings) precargados y de solo lectura.
- Después de **Almacén**:
  - **Impresora de etiqueta de tarima (LPN)** con las impresoras del microservicio de impresión.
  - **Impresora de etiqueta de caja** con el mismo catálogo.
- Una sola impresora por rubro.
- La impresora elegida en un rubro deja de mostrarse en el otro, por lo que no pueden coincidir.
- **Guardar** se habilita cuando ambos rubros tienen impresora.

## Datos de prueba

Impresoras del microservicio: `ZEBRA-CEDIS-01` a `ZEBRA-CEDIS-04`, `HONEYWELL-PM45-01` y
`HONEYWELL-PM45-02`. Selecciona una en tarima y verifica que desaparece del listado de caja.
