jQuery(document).ready(function () {
  jQuery('#contact-form').on('submit', function (e) {
    e.preventDefault();

    var form = jQuery(this);
    var submitBtn = form.find('button[type="submit"]');

    // Obtener valores del formulario
    var name = form.find('input[name="Complete_Name"]').val();
    var email = form.find('input[name="Email_Address"]').val();
    var phone = form.find('input[name="Phone_No"]').val();
    var message = form.find('textarea[name="Message"]').val();

    // Deshabilitar botón mientras envía
    submitBtn.prop('disabled', true);
    submitBtn.find('span').text('ENVIANDO...');

    // Enviar vía Formsubmit.co (gratis, sin registro previo)
    jQuery.ajax({
      url: 'https://formsubmit.co/ajax/maxi.flores.mp@gmail.com',
      method: 'POST',
      dataType: 'json',
      data: {
        Nombre: name,
        Email: email,
        Telefono: phone,
        Mensaje: message,
        _subject: 'Nueva consulta desde Web Arquitectos',
        _template: 'table'
      },
      success: function (response) {
        // Ocultar formulario y mostrar mensaje de agradecimiento
        jQuery('#form-content').fadeOut(300, function () {
          jQuery('#form-thank-you').fadeIn(400);
        });
      },
      error: function () {
        // Fallback: abrir mailto
        var mailBody = 'Nombre: ' + name + '%0D%0A' +
          'Email: ' + email + '%0D%0A' +
          'Teléfono: ' + phone + '%0D%0A' +
          'Mensaje: ' + message;

        window.location.href = 'mailto:maxi.flores.mp@gmail.com?subject=Consulta desde Web Arquitectos&body=' + mailBody;

        // Mostrar mensaje de agradecimiento igual
        jQuery('#form-content').fadeOut(300, function () {
          jQuery('#form-thank-you').fadeIn(400);
        });
      }
    });
  });
});