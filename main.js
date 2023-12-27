import { Settings } from "./settings.js";
import { MatrizFondo } from "./matrizFondo.js";

import {
    instanciar_matrizFondo,
    instanciar_pieza,
    textos
} from "./function.js";

import { teclado, raton } from './eventos.js';

let settings;

// =================================================================
window.onload = () => {

    settings = new Settings();

    settings.dom.ctx = settings.dom.canvas.getContext('2d');
    settings.dom.canvas.style.border = '1px solid black';

    const ancho = settings.constantes.COLUMNAS * settings.constantes.TILE_X;
    const alto = settings.constantes.FILAS * settings.constantes.TILE_Y;

    settings.dom.canvas.width = ancho;
    settings.dom.canvas.height = alto;

    settings.objeto.matrizfondo = instanciar_matrizFondo();
    settings.objeto.pieza = instanciar_pieza();

    setInterval(() => {
        bucle_principal(ancho, alto);
    }, 1000 / settings.constantes.FPS);

    settings.varias.cae_pieza = setInterval(() => {
        if (settings.estado.enJuego) settings.controles.abajo = true;
    }, settings.varias.velocidad_piezas);
};

// =================================================================
function bucle_principal(ancho, alto) {

    // Renderiza el fondo (vacio o piezas acumulandose)
    const filas = settings.constantes.FILAS;
    const columnas = settings.constantes.COLUMNAS;
    for (let i = 0; i < filas; i ++) {
        for (let ii = 0; ii < columnas; ii ++) {
            const tile_fondo = settings.objeto.matrizfondo[i][ii];
            tile_fondo.dibuja();
        }
    }

    // Renderiza las piezas
    if (settings.objeto.pieza) settings.objeto.pieza.dibuja();

    // Check Si instanciar una nueva pieza
    if (settings.varias.otra_pieza) settings.objeto.pieza = instanciar_pieza();

    // Check Si hemos hecho linea (checkea continuamente, se puede mejorar haciendo que...
    // ...checkee solo cuando la pieza llegue al fondo)
    MatrizFondo.check_lineDone();

    // Renderiza Txt
    textos('Pulse ENTER o toque pantalla para comenzar...', Math.floor(ancho / 2), Math.floor(alto / 2), '18px arial', 'white', 'center');
}

export {
    settings
};
