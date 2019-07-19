---
title: "Como crear diferentes 'Themes' con CSS"
date: 2019-07-17T00:17:30+02:00
draft: true
---

### Problemática
A veces nos gustaría poder disponer de diferentes temas de color para aplicar a nuestra web, ya sea para **aportar un valor añadido** a un producto permitiendo por ejemplo a los usuarios personalizar un espacio concreto, por **accesibilidad**, para preparar por ejemplo una hoja de alto contraste u otras específicas para problemas visuales concretos como el daltonismo. Es importante permitir que el mensaje llegue y hay que tener en cuenta que **todo comunica**, formato y forma, y el color lo hace especialmente.

### Enfoque
Podemos plantear diferentes enfoques, siendo los más habituales haciendo uso de preprocesadores como **sass** o utilizando **custom properties** también conocidas como variables nativas de CSS.

Hoy vamos a hablar de cómo realizarlo con custom properties por ser más versátil, fácil de entender y rápido de implementar, aunque por contra tiene peor [soporte](https://caniuse.com/#search=custom%20properties "Ver Custom Properties en Caniuse.com").

{{% blockquote blockquote-default %}}
Damos por hecho que conocemos los aspectos básicos, caracterísiticas y funcionamiento de las Custom Properties por lo que no vamos a reparsarlo.
{{% /blockquote %}}

### Al código
Lo primero es definir un set de variables a partir de nuestra paleta de colores

![Un dibujo de nosotros mismos](/images/posts/01.png?classes=border,shadow)

{{% blockquote blockquote-default %}}
Utilizar una nomenclatura para estos colores que no sea demasiado descriptiva, ya que como vamos a cambiar los valores no tendría sentido que la variable --orange albergase el valor red
{{% /blockquote %}}

Y a continuación bajo un selector específico reasignariamos cada variable con otro valor

![Un dibujo de nosotros mismos](/images/posts/01.png?classes=border,shadow)

Ahora sólo tendríamos que idear un método para intercambiar los temas elegidos como un select, un dropdown o botones y en cada nueva elección poner o quitar estas clases al contenedor que englobe el área que al que queremos aplicar el nuevo tema, que normalmente será al body del documento.

{{% blockquote blockquote-default %}}
No hay que olvidarse de limpiar primero las clases de los temas anteriores
{{% /blockquote %}}

### Demo
Y esta es la [demo](https://codepen.io/alejandromur/pen/ydmZmY?editors=1100 "Ver demo")

### Conclusión
Lorem tal

### Si te ha parecido interesante
bla, bla, bla...