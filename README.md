# Bienvenido a la propuesta oficial de la App COMFECO
![xantolo](./images/comfeco.png)

URL Producción: 

https://comfecoapp.firebaseapp.com

# Instrucciones para testear el sitio

La solución esta habilitada para realizar operaciones de inserción de imagenes para las comunidades y agregar nuevas comunidades, también permite editar los datos de un evento si se inicia sesión con una cuenta de ADMINISTRADOR.

# Iniciar sesión simulando ser un administrador
Debes registrarte con un correo que no sea terminación @gmail mediante el formulario o bien iniciar sesión con algún proveedor como facebook o gmail pero con una cuenta de correo con terminación diferente de @gmail.

# Iniciar sesión simulando ser un usuario convencional, sin permisos de edición e inserción
Para testear la aplicación simulando un usuario común, sin permisos de edición se requiere iniciar sesión con una cuenta de gmail, ya sea dada de alta por el formulario o iniciando sesión con el proveedoir de gmail.

# Confirmar cuenta de correo
Para acceder a la sección de editar profile con una cuenta de correo electrónica dada de alta debes confirmar tu correo electrónico mediante un enlace que debe llegar a tu bandeja de entrada, favor de revisar en bandeja de otros o de correo no deseado por favor, es posible que debas loguearte nuevamente para que el cambio se refleje.

# Subir imagenes
La función de subir imagenes permite cambiar tu foto de perfil dando click sobre la misma en "detalles de perfil" o bien subir imagenes de algún grupo dando click en agregar, en caso de subir más de una imágen se habilita un corousel en las card para que puedas desplazarte y verlas todas.

# Insignias
Ganas una insignia con el simple hecho de editar y llenar tu información de perfil, ganas otra al unirte a un grupo, puedes ver la lista de insignias en la sección insignias de tu pèrfil, se marcarán las que ya tengas asignadas.

# Unirse a talleres
Si te unes a un taller o evento y despues te sales ya no tienes opción de volverte a unir.

Esta solución se basa en un proyecto de Angular +11 como Front-End y Firebase services como backend. Cuenta con los servicios de Firebase hosting en un ambiente de producción https://comfecoapp.firebaseapp.com/, la información se encuentra almacenada en firestore de firebase y se utilizan 3 servicios de autenticación:

Login con Firebase:
<img src="./images/authfire.png" data-canonical-src="authfire.png" width="300" /><br/>
Login con Facebook:
<img src="./images/faceauth.jpeg" data-canonical-src="./images/faceauth.jpeg" width="300" /><br/>
Login con Google/Gmail:
<img src="./images/google.png" data-canonical-src="./images/google.png" width="300" /><br/>


# Versión QuickApp (App ID: 104025909)
Existe una versión de Huawei quickapp para la misma sin embargo aquí solo funcionara una cuenta que registres con correo electrónico, ni google auth ni facebook funcionan en la version 1.0 de esta app debido a problemas de compatibilidad de firebase con quickapps:

<img src="./images/quick.png" data-canonical-src="quick.png" /><br/>

# Algunas pantallas de la aplicación
<img src="./images/iniciosesion.png" data-canonical-src="iniciosesion.png" /><br/>
<img src="./images/registro.png" data-canonical-src="registro.png" /><br/>
<img src="./images/insignias.png" data-canonical-src="insignias.png" /><br/>
<img src="./images/insertarcomunidad.png" data-canonical-src="insertarcomunidad.png" /><br/>


# ComfecoApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.1.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
