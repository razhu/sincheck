//////////////////////////////////////////////// OBTENER PAQUETES
var express = require('express');
var app = express();
var model = require('./models');// modelos
var port = process.env.PORT || 5000;
//paquetes para api rest
var bodyParser      = require('body-parser');
var cors            = require('cors');

app.use(cors(
    {
        "origin": "*",
        "methods": "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
        "preflightContinue": true,
        "headers": "Content-Type, Authorization, Content-Length, X-Requested-With",
        "Access-Control-Allow-Headers": "Authorization, Content-Type"
    }
    
));
// usamos body parser para obtener info de los parametros via POST
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//////////////////////////////////////////////// RUTAS
// ruta basica (http://localhost:8081)
app.get('/', function(req, res) {
	res.header('Content-Type', 'application/json');
	res.status(403).json({mensaje:'Token no provisto'});
});

//////////////////////////////////////////////// INSTANCIA DE 'ROUTES' PARA LAS RUTAS DE LA API
var apiRoutes = express.Router();
//////////////////////////////////////////////// INICIO AUTENTICACION (no se requiere middleware pues no es una ruta protegida)
apiRoutes.post('/validarNit', function(req, res) {
        model.usuario.findOne({
		where: {usuario: req.body.usuario}
	}).then(function(usuario){       
       if(!validate({checkpresence:req.body.usuario}))
		{
			res.status(400).json({ mensaje: 'Falta el parámetro \'usuario\'' });
		}else if(!validate({checkpresence:req.body.contrasena}))
			{
				res.status(400).json({ mensaje: 'Falta el parámetro \'contrasena\'' });
			}else if (!usuario) {
			res.status(401).json({ mensaje: "Nombre de usuario o contraseña inválidos." });
		} else if (usuario) {
			// verifica si las contraseñas son iguales
			if (!bcrypt.compareSync(req.body.contrasena, usuario.contrasena)) {
				res.status(401).json({ mensaje: "Nombre de usuario o contraseña inválidos." });
			} else {

				// si el usuario y al contraseña son correctas, se crea un token
				var token = jwt.sign({"usuario":usuario.usuario}, app.get('superSecreto'), {
					expiresIn: "24h" // token expira en 24 horas
				});
				res.header('Content-Type', 'application/json');
				res.status(201).json({
					token: token
				});
			}
		}else{
			res.status(500).json({mensaje:'error interno'});
		}
	}).catch(function(error){
		console.log(error.stack);
		res.status(500).json({mensaje:error.message});
	});
});
//////////////////////////////////////////////// FIN AUTENTICACION 

//////////////////////////////////////////////// INICIO DECLARACION api/v1
app.use('/api/v1', apiRoutes);
app.use(function(req, res, next) {
  res.status(404).send('Lo sentimos, no se pudo encontrar el recurso!');
  
});
//////////////////////////////////////////////// FIN DECLARCION api/v1

//////////////////////////////////////////////// INICIO VERIFICA SI HAY ERRORES EN FORMATO JSON
app.use(function(err, req, res, next) {
    if (err instanceof SyntaxError) {
      res.status(400).json({mensaje: "Problemas en el formato JSON"});
  } else {
    res.status(500).send('Error interno!');
   console.error(err.stack);
    //next();
  }
});
//////////////////////////////////////////////// FIN VERIFICA SI HAY ERRORES EN FORMATO JSON
  
//////////////////////////////////////////////// INICIO INICIA EL SERVIDOR
app.listen(port);
console.log('La magia esta en... http://localhost:' + port);
//////////////////////////////////////////////// FIN INICIA EL SERVIDOR