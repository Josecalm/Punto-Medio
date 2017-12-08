<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="{{ URL::asset('css/styles.css') }}">
    <link rel="stylesheet" href="{{ URL::asset('css/fontello.css') }}">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <title>Punto · Medio</title>
    <script src="http://code.jquery.com/jquery-1.11.3.min.js"></script>
    
</head>
<body>
        
    <h1><a href="index.html" id="login">Punto · Medio</a></h1> 

    
    <div class="login-page">
  <div class="form">
    <form class="register-form">
      <input type="text" placeholder="nombre de usuario"/>
      <input type="text" placeholder="nombre y apellido"/>
      <input type="password" placeholder="contraseña"/>
      <input type="text" placeholder="correo electrónico"/>
      <button>registrar</button>
      <p class="message">¿Ya estás registrado? <a href="#">Inicia sesión</a></p>
    </form>
    <form class="login-form">
      <input type="text" placeholder="nombre de usuario"/>
      <input type="password" placeholder="contraseña"/>
      <button>Entrar</button>
      <p class="message">¿Aún no te registras? <a href="#">Crear cuenta</a></p>
    </form>
  </div>
</div>
 <script src="js/login.js"></script>
    
</body>

</html>