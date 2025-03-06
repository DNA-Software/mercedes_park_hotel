 <?php
/* if ($_SERVER["REQUEST_METHOD"] == "POST") {
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
}*/
 if(empty($_POST['mail']) || empty($_POST['message'])){
   echo "El formulario esta vacio, por favor rellene todos los campos.";
   return false;
 }

 $mail = $_POST['mail'];
 $message = $_POST['message'];

 $to = 'diegomdiaz53@gmail.com';
 $email_subject = "Nuevo contacto por reservas"
 $email_body = "Ha recibido un nuevo mensaje.\n\n$mensaje".
 $headers = "De: $mail";
 mail($to,$email_subject,$email_body,$headers);
 return true;
?> 
