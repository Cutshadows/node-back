# Diferencias entre Node.js y JavaScript
En JavaScript del lado del cliente tenemos el DOM y el CSSDOM así como el objeto window para manipular los elementos de nuestra página además una serie de APIs, aquí unos ejemplos:

fetch
SessionStorage y LocalStorage
canvas
bluetooth
audio
web authentication
Mientras que en Node.js no tenemos un DOM ni un objeto windows, lo que sí tenemos son una serie de módulos que nos permiten interactuar con los recursos de la máquina como el sistema operativo y el sistema de archivos, por ejemplo:

os
fs
http
util
debugger
stream
events

# Resumen: Diferencias Nodejs y Javascript

Ahora que ya sabes qué es Node.js y su diferencia con Javascript, te compartimos este resumen gráfico para que no olvides las actividades que los hacen distintos.
# imagen 


# Arquitectura orientada a eventos

# Introducción a streams
Los Streams son una colección de datos como los arrays o strings sólo que se van procesando pedazo por pedazo, esta capacidad los hace muy poderosos porque podemos manejar una gran cantidad de datos de manera óptima.

Manejo de gran cantidad de datos


# Readable y Writable

Readable y Writable streams
Los Readable y Writeable streams tienen los siguientes eventos y funciones respectivamente:

## Readable
Eventos
data. Se dispara cuando recibe datos.
end. Se dispara cuando termina de recibir datos.
error. Se dispara cuando hay un error.
Funciones
pipe
unpipe
read
push

## Writeable
Eventos
drain. Se dispara cuando emite datos.
finish. Se dispara cuando termina de emitir.
error. Se dispara cuando hay un error.
Funciones
write
end
Recuerda que tienen estos eventos porque los heredan de la clase EventEmitter.

# Duplex y Transforms streams
Ambos sirven para simplificar nuestro código:

Duplex: implementa los métodos write y read a la vez.
Transform: es similar a Duplex pero con una sintaxis más corta.


# En esta clase vemos dos módulos básicos:

os. Sirve para consultar y manejar los recursos del sistema operativo.
fs. Sirve para administrar (copiar, crear, borrar etc.) archivos y directorios.
Los métodos contenidos en estos módulos (y en todo Node.js) funcionan de forma asíncrona por default, pero también se pueden ejecutar de forma síncrona, por ejemplo el método readFile() tiene su versión síncrona readFileSync().


# Clusters y procesos hijos
# Curso de Backend con Node.js

Una sola instancia de Node.js corre un solo hilo de ejecución. Para tomar ventaja de los sistemas con multiples core, necesitamos lanzar un cluster de procesos de Node.js para manejar la carga.

El módulo cluster nos permite la creación fácil de procesos hijos que comparten el mismo puerto del servidor. Veamos un ejemplo en código:

```
const cluster = require("cluster");
const http = require("http");

// Requerimos la cantidad de CPUs que tiene la maquina actual
const numCPUs = require("os").cpus().length;


if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);


  // Si el cluster es maestro, creamos tantos procesos como numero de CPUS
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }


  // Si por alguna razón el cluster se finaliza hacemos un log
  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  // Los diferentes workers pueden compartir la conexión TCP
  // En este caso es una servidor HTTP
  http
    .createServer((req, res) => {
      res.writeHead(200);
      res.end("hello world\n");
    })
    .listen(8000);


  console.log(`Worker ${process.pid} started`);
}
```
Si corremos nuestro archivo de Node.js ahora compartirá el puerto 8000 con los diferentes workers:

```
$ node server.js
Master 3596 is running
Worker 4324 started
Worker 4520 started
Worker 6056 started
Worker 5644 started
```


# ¿Qué es Express.js y para qué sirve?
Express.js es un framework para crear Web Apps, Web APIs o cualquier tipo de Web Services, es libre bajo la licencia MIT.

Express es muy liviano y minimalista además de ser extensible a través de Middlewares.

Los Middlewares interceptan el request y el response para ejecutar una acción en medio.

dependencias de nuestro proyecto 

```
npm i express dotenv --save

npm i -D nodemon eslint eslint-config-prettier eslint-plugin-prettier prettier

npx nrm lint-staged
```



## Artículo
# Request y Response Objects
Curso de Backend con Node.js
glrodasz
26 de Julio de 2019

El objeto req (Request) en Express representa el llamado HTTP y tiene diferentes propiedades del llamado, como la cadena de texto query (Query params), los parámetros de la URL (URL params), el cuerpo (Body), los encabezados (HTTP headers), etc.

Para acceder al req basta con acceder al primer parámetro de nuestros router handlers (router middleware) ó middleware.

Como por ejemplo así lo hemos visto siempre:
```
  app.get("/user/:id", function(req, res) {
    res.send("user " + req.params.id);
  });
```
Pero también funcionaria sin problemas:
```
  app.get("/user/:id", function(request, response) {
    response.send("user " + request.params.id);
  });
```
Exploremos las propiedades más importantes
req.body
Contiene los pares de llave-valor de los datos enviados en el cuerpo (body) del llamado (request). Por defecto es undefined pero es establecido cuando se usa algún “body-parser” middleware como body-parser y multer.

En Postman cuando hacemos un request y enviamos datos en la pestaña Body, estos middlewares son los que nos ayudan a entender el tipo de datos que vamos a recibir en el req.body.

Aquí podemos ver como se pueden usar estos middlwares para establecer el valor del req.body:

const app = require("express")();
const bodyParser = require("body-parser");
const multer = require("multer");
const upload = multer(); // Para datos tipo multipart/form-data

app.use(bodyParser.json()); // Para datos tipo application/json
app.use(bodyParser.urlencoded({ extended: true })); // Para datos tipo application/x-www-form-urlencoded

app.post("/profile", upload.array(), function(req, res, next) {
  console.log(req.body);
  res.json(req.body);
});
Más información sobre los diferentes formatos que puede tener el body: https://developer.mozilla.org/es/docs/Web/HTTP/Methods/POST

req.params
Esta propiedad contiene un objeto con las propiedades equivalentes a los parámetros nombrados en la ruta. Por ejemplo, si tenemos una ruta de la forma /user/:name entonces la propiedad name está disponible como req.params.name y allí podremos ver su valor. Supongamos que llamaramos a la ruta con /user/glrodasz, entonces el valor de req.params.name sería glrodasz. Este objeto por defecto tiene el valor de un objeto vacío {}.

// GET /user/glrodasz
req.params.name;
// => "glrodasz"
req.query
Esta propiedad contiene un objeto con las propiedades equivalentes a las cadenas de texto query de la ruta. Si no hay ninguna cadena de texto query tendrá como valor por defecto un objeto vacío {}.

req.query.q;
// => "tobi ferret"

// GET /shoes?order=desc&shoe[color]=blue&shoe[type]=converse
req.query.order;
// => "desc"

req.query.shoe.color;
// => "blue"

req.query.shoe.type;
// => "converse"
Más información sobre los query strings en: https://es.wikipedia.org/wiki/Query_string y https://tools.ietf.org/html/rfc3986#section-3.4

Response Object
El objeto res representa la respuesta HTTP que envía una aplicación en Express.

Para acceder al res basta con acceder al segundo parámetro de nuestros router handlers (router middleware) o middleware.

Como por ejemplo así lo hemos visto siempre:

app.get("/user/:id", function(req, res) {
  res.send("user " + req.params.id);
});
Pero también funcionaría sin problemas:

app.get("/user/:id", function(request, response) {
  response.send("user " + request.params.id);
});
Exploremos los métodos más comunes
res.end()
Finaliza el proceso de respuesta. Este método viene realmente del core de Node.js, específicamente del método response.end() de http.ServerResponse.

Se usa para finalizar el request rápidamente sin ningún dato. Si necesitas enviar datos se debe usar res.send() y res.json().

res.end();
res.status(404).end();
res.json()
Envía una respuesta JSON. Este método envía una respuesta (con el content-type correcto) y convierte el parámetro enviado a una cadena de texto JSON haciendo uso de JSON.stringify().

El parámetro puede ser cualquier tipo de JSON, incluido un objeto, un arreglo, una cadena de texto, un boolean, número, null y también puede ser usado para convertir otros valores a JSON.

res.json(null);
res.json({ user: "tobi" });
res.status(500).json({ error: "message" });
res.send()
Envía una respuesta HTTP. El parámetro body puede ser un objeto tipo Buffer, una cadena de texto, un objeto, o un arreglo. Por ejemplo:

res.send(Buffer.from("whoop"));
res.send({ some: "json" });
res.send("<p>some html</p>");
res.status(404).send("Sorry, we cannot find that!");
res.status(500).send({ error: "something blew up" });



## Anatomía de una API Restful
REST (Representational State Transfer) es un estilo de arquitectura para construir web services, no es un estándar pero si una especificación muy usada.

Las peticiones HTTP van acompañadas de un “verbo” que define el tipo de petición:

GET. Lectura de datos.
PUT. Reemplazar datos.
PATCH. Actualizar datos en un recurso específico.
POST. Creación de datos.
DELETE. Eliminación de datos.
No es recomendable habilitar un endpoint de tipo PUT y DELETE para toda nuestra colección de datos, sólo hacerlos para recursos específicos, ya que no queremos que por error se puedan borrar todos nuestros datos.

# Middlewares populares en Express.js

## A continuación te compartiré una lista de los middlewares más populares en Express.

## Body parser
Analiza los cuerpos de las solicitudes entrantes en un middleware antes que los manejadores de ruta disponibles bajo la propiedad req.body. http://expressjs.com/en/resources/middleware/body-parser.html

## CORS
Middleware para habilitar CORS (Cross-origin resource sharing) en nuestras rutas o aplicación. [CORS PLUGINS]('http://expressjs.com/en/resources/middleware/cors.html')

## Morgan
Un logger de solicitudes HTTP para Node.js. [MORGAN PLUGINS]('http://expressjs.com/en/resources/middleware/morgan.html')

## Helmet
Helmet nos ayuda a proteger nuestras aplicaciones Express configurando varios encabezados HTTP. ¡No es a prueba de balas de plata, pero puede ayudar! [HELMET PLUGINS]('https://github.com/helmetjs/helmet')

## Express Debug
Nos permite hacer debugging de nuestras aplicaciones en Express mediante el uso de un toolbar en la pagina cuando las estamos desarrollando.  [Express Debug PLUGINS]('https://github.com/devoidfury/express-debug')

## Express Slash
Este middleware nos permite evitar preocuparnos por escribir las rutas con o sin slash al final de ellas. [Express Slash PLUGINS]('https://github.com/ericf/express-slash')

## Passport
Passport es un middleware que nos permite establecer diferentes estrategias de autenticación a nuestras aplicaciones. [PASSPORT PLUGINS]('https://github.com/jaredhanson/passport')

## Puedes encontrar más middlewares populares en el siguiente enlace: [POPULARS PLUGINS PARA TEST]('http://expressjs.com/en/resources/middleware.html')

# Debugging e inspect
## Curso de Backend con Node.js

### Haciendo debugging
Para aprovechar por completo la funcionalidad de debugging que implementa Express, lo que recomiendo es cambiar todos los console.log por debug haciendo uso de un namespace de la siguiente forma:

const debug = require("debug")("app:server");
debug("Hello debug");
De esta manera si ejecutamos nuestra aplicación con el comando DEBUG=app:* node index.js nos mostrará los diferentes logs.

Los namespaces que recomiendo son los siguientes:

* **app:server** para todo lo relacionado con el inicio del servidor como el mensaje Listening on http://localshost
* **app:db** para todo lo relacionado con logs de las bases de datos, inicialización y ejecución de scripts.
app:error para todo lo relacionado con errores en nuestra aplicación.

Nótese que esta convención es opcional, es decir, tu puedes seleccionar cualquier namespace. Lo más importante es que sea el mismo que se pasará en la opción **DEBUG**.

Express.js por defecto ya trae unos logs de debugging por defecto los podemos activar mediante la variable de entorno DEBUG=express:*.

Por lo que recomiendo los scripts en nuestro archivo package.json de la siguiente manera:
```
  "scripts": {
    "dev": "DEBUG=express:*,app:* nodemon index",
    "debug": "DEBUG=express:*,app:* npm run start",
  },
```
Ejecutando el modo inspect en desarrollo
El modulo inspect de Node.js nos permite ejecutar un ambiente para hacer debugging de código haciendo uso de la consola de desarrolladores de Google. Para ejecutarlo en modo desarrollo con nodemon basta con agregar el flag --inspect por lo que recomiendo el siguiente script en nuestro archivo package.json
```
  "scripts": {
    "inspect": "DEBUG=express:*,app:* nodemon --inspect index"
  },
```


Variables de entorno, CORS y HTTPS
Curso de Backend con Node.js
glrodasz
31 de Julio de 2019

Como usar las variables de entorno para diferente ambientes
Ya vimos cómo en nuestro ambiente local podemos hacer uso de las variables de entorno usando el archivo .env y la librería dotenv. Generalmente lo que se recomienda es usar el mismo para los diferentes ambientes como Staging (Pruebas) y Producción.

Para ello se debe acceder al servidor remoto:

Duplicar el archivo .env.example y renombrarlo por .env.
Cargar las respectivos valores de las variables de entorno.
Usar valores y servicios diferentes para cada ambiente, esto quiere decir que las credenciales de desarrollo, staging y producción deben ser completamente diferente.
Si se quiere tener un backup de estos valores se recomienda usar las notas seguras de aplicaciones como 1Password o LastPass.
Como lo hemos dicho antes no se debe hacer commit del archivo .env y este debe estar en el .gitignore, ademas se recomienda manejar solo un archivo .env. Más información: **https://github.com/motdotla/dotenv#faq**

**Cuando no es posible acceder al servidor remoto**
Algunos servicios como Heroku o Now no nos permiten acceder a un servidor remoto pues la administración del servidor es controlada por los mismos servicios, sin embargo cada servicio tiene sus mecanismos para establecer las variables de entorno:

**Configuración de variables de entorno en Heroku**
**Configuración de variables de entorno en Now**
Variables de entorno de forma nativa
El uso del archivo .env junto con la biblioteca dotenv es un mecanismo que nos facilita la configuración de variables de entorno pero si por alguna razón las quisiéramos cargar de manera nativa, es decir desde el sistema operativo recomiendo este tutorial de Digital Ocean

Habilitando CORS en producción
El Intercambio de Recursos de Origen Cruzado (Cross-Origin Resource Sharing) es un mecanismo que agrega unos encabezados (Headers) adicionales HTTP para permitir que un user agent (generalmente un navegador) obtenga permisos para acceder a los recursos de un servidor en un origin distinto (dominio) del que pertenece.

Por ejemplo una solicitud de origen cruzado seria hacer una petición AJAX desde una aplicación que se encuentra en **https://dominio-a.com** para cargar el recurso **https://api.dominio-b.com/data.json.**

Por razones de seguridad, los navegadores restringen las solicitudes HTTP de origen cruzado iniciadas dentro de un script.

Si necesitamos permitir request desde un dominio diferente al del servidor podemos usar el middleware cors para permitirlo, pero es importante no dejarlo expuesto a todos los dominios.

### Habilitar CORS para todos los request (No recomendado en producción)
```
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

app.get("/products/:id", function(req, res, next) {
  res.json({ msg: "This is CORS-enabled for all origins!" });
});

app.listen(8000, function() {
  console.log("CORS-enabled web server listening on port 8000");
});
```
### Habilitar CORS para los request específicos de un cliente (Recomendado para producción)
```
const express = require("express");
const cors = require("cors");
const app = express();

const corsOptions = { origin: "http://example.com" };

app.use(cors(corsOptions));

app.get("/products/:id", function(req, res, next) {
  res.json({ msg: "This is CORS-enabled for only example.com." });
});

app.listen(8000, function() {
  console.log("CORS-enabled web server listening on port 8000");
});
```
Debemos tener en cuenta que para aplicaciones server-side es poco probable que necesiten el uso de CORS debido a que las aplicaciones conviven en el mismo dominio. Sin embargo, es buena practica habilitarlo para los llamados externos de nuestra API.

Más información sobre el middleware CORS en **https://expressjs.com/en/resources/middleware/cors.html**

Cómo funciona y por qué es importante el uso de HTTPS
El Protocolo Seguro de Transferencia de Hipertexto (HTTPS) es un protocolo HTTP que funciona en el puerto 443 y utiliza un cifrado basado en SSL (Secure Sockets Layer) / TLS (Transmission Layer security) con el fin de crear un canal de comunicación seguro entre el cliente y el servidor.

**Por qué usar HTTPS**
Una de las razones por la cual siempre debemos usar sitios con HTTPS es que sin este cualquier individuo podría efectuar ataques conocidos como man-in-the-middle o eavesdropping y obtener nuestro usuario y contraseña en el momento en que intentamos acceder a este servicio que no tiene HTTPS establecido.

**Cómo funciona**
El cliente envía un mensaje al servidor y este responde con su certificado publico.
El cliente comprueba que este certificado sea valido y toma la llave publica.
El cliente genera una cadena llamada pre-master secret y la cifra usando la llave publica del servidor y se lo envía.
El servidor usa su llave privada para comprobar el pre-master secret.
En ese momento tanto el cliente como el servidor usan el pre-master secret para generar un master secret que es usado como una llave simétrica.
Teniendo este par de llaves ya se pueden enviar mensajes seguros entre ellos.

**Cómo habilitar HTTPS en nuestro servidor**
Dependiendo el servicio de hosting que estemos usando puede ofrecernos o no una instalación de certificados de seguridad SSL/TLS que pueden tener algún costo. Sin embargo existen servicios como Let’s Encrypt que permiten la instalación de este certificado completamente gratis. Servicios como Now y Heroku ofrecen HTTPS por defecto.

### Más información:
* https://letsencrypt.org/how-it-works/
* https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-16-04

* https://devcenter.heroku.com/articles/ssl

* https://devcenter.heroku.com/articles/automated-certificate-management

* https://zeit.co/docs/v1/features/certs

