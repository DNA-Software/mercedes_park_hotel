<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = htmlspecialchars($_POST['mail']);
    $mensaje = htmlspecialchars($_POST['message']);

    $para = "diegomdiaz53@gmail.com"; // Cambia por tu correo
    $asunto = "Consulta de reserva";
    $cuerpo = "Correo: $email\n\nMensaje:\n$mensaje";
    $cabeceras = "From: $email\r\nReply-To: $email\r\n";

    if (mail($para, $asunto, $cuerpo, $cabeceras)) {
        echo "Mensaje enviado correctamente.";
    } else {
        echo "Hubo un error al enviar el mensaje. Inténtalo más tarde.";
    }
}
?>
