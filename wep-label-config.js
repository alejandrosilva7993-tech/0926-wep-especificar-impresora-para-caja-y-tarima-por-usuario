/* Etiqueta de impresión — Impresoras por usuario
   Prototipo de la HU: especificar impresora para caja y tarima por usuario. */

(function () {
  'use strict';

  /* Impresoras configuradas en el microservicio de impresión (mock). */
  var PRINTERS = [
    { id: 'ZEBRA-CEDIS-01', nombre: 'ZEBRA-CEDIS-01' },
    { id: 'ZEBRA-CEDIS-02', nombre: 'ZEBRA-CEDIS-02' },
    { id: 'ZEBRA-CEDIS-03', nombre: 'ZEBRA-CEDIS-03' },
    { id: 'ZEBRA-CEDIS-04', nombre: 'ZEBRA-CEDIS-04' },
    { id: 'HONEYWELL-PM45-01', nombre: 'HONEYWELL-PM45-01' },
    { id: 'HONEYWELL-PM45-02', nombre: 'HONEYWELL-PM45-02' }
  ];

  /* Usuario y almacén llegan precargados de la sesión WEP. */
  var SESSION = {
    usuario: 'jperez — Juan Pérez',
    almacen: 'CEDIS Puebla'
  };

  function $(id) { return document.getElementById(id); }

  function escapeHtml(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  /* ---------------------------------------------------------------------------
     Listados de impresoras
     Una impresora por rubro: la seleccionada deja de listarse en el otro campo.
  --------------------------------------------------------------------------- */

  function buildOptions(selectedId, excludedId) {
    var html = '<option value="">Selecciona una impresora</option>';

    PRINTERS.forEach(function (printer) {
      if (printer.id === excludedId) return;

      html +=
        '<option value="' + escapeHtml(printer.id) + '"' +
        (printer.id === selectedId ? ' selected' : '') +
        '>' + escapeHtml(printer.nombre) + '</option>';
    });

    return html;
  }

  function refreshPrinterSelects() {
    var tarima = $('impresoraTarima');
    var caja = $('impresoraCaja');

    tarima.innerHTML = buildOptions(tarima.value, caja.value);
    caja.innerHTML = buildOptions(caja.value, tarima.value);

    setFieldError('impresoraTarima', '');
    setFieldError('impresoraCaja', '');
    updateSaveButton();
  }

  /* ---------------------------------------------------------------------------
     Validación
  --------------------------------------------------------------------------- */

  function setFieldError(id, message) {
    var field = $('field-' + id);
    var error = $(id + '-error');

    if (field) field.classList.toggle('is-invalid', Boolean(message));
    if (error) {
      error.hidden = !message;
      error.textContent = message || '';
    }
  }

  function updateSaveButton() {
    var completo = Boolean($('impresoraTarima').value) && Boolean($('impresoraCaja').value);

    $('btnSave').disabled = !completo;
  }

  function validate() {
    var ok = true;

    if (!$('impresoraTarima').value) {
      setFieldError('impresoraTarima', 'Selecciona la impresora de etiqueta de tarima (LPN).');
      ok = false;
    }

    if (!$('impresoraCaja').value) {
      setFieldError('impresoraCaja', 'Selecciona la impresora de etiqueta de caja.');
      ok = false;
    }

    return ok;
  }

  function save(event) {
    event.preventDefault();
    validate();
  }

  function init() {
    $('usuario').value = SESSION.usuario;
    $('almacen').value = SESSION.almacen;

    refreshPrinterSelects();

    $('impresoraTarima').addEventListener('change', refreshPrinterSelects);
    $('impresoraCaja').addEventListener('change', refreshPrinterSelects);
    $('labelConfigForm').addEventListener('submit', save);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
