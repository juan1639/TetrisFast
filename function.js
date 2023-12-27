import { settings } from "./main.js";
import { MatrizFondo } from "./matrizFondo.js";
import { Pieza } from './pieza.js';

// ===============================================================================
function instanciar_matrizFondo() {
    
    const filas = settings.constantes.FILAS;
    const columnas = settings.constantes.COLUMNAS;
    
    const matriz = new Array(filas);
    
    for (let i = 0; i < matriz.length; i ++) {
        matriz[i] = new Array(columnas).fill(0);
    }
    
    console.log(matriz);

    // ---------------------------------------------------------
    settings.objeto.matrizfondo = matriz;
    
    for (let i = 0; i < filas; i ++) {
        for (let ii = 0; ii < columnas; ii ++) {
            
            settings.objeto.matrizfondo[i][ii] = new MatrizFondo(ii, i);
        }
    }
    
    return settings.objeto.matrizfondo;
}

// ===============================================================================
function instanciar_pieza() {

    settings.varias.otra_pieza = false;

    const x = settings.constantes.xInicial;
    const y = settings.constantes.yInicial;

    const nro_rnd = Math.floor(Math.random() * 7); // 7 posibles piezas tiene el Tetris
    const elegida = settings.constantes.PIEZAS.charAt(nro_rnd);
    const idPieza = Pieza.plantilla[elegida];
    const color = settings.colores.colorPiezas[nro_rnd];

    const pieza = new Pieza(x, y, idPieza, color);
    console.log(x, y, idPieza, color);

    return pieza;
}

// =============================================================================
function check_colisiones(x, y, idPieza, rotacion) {

    let colX = x;
    let colY = y;
    const parte_array = rotacion * 4;
    let rotacion_idPieza = idPieza.slice(parte_array, parte_array + 4);

    for (let relPos of rotacion_idPieza) {

        colX = x + relPos[0];
        colY = y + relPos[1];
        if (colX >= settings.constantes.COLUMNAS || colX < 0) return true;
        if (colY >= settings.constantes.FILAS || colY < 0) return true;

        const posMatriz = settings.objeto.matrizfondo[colY][colX];
        if (posMatriz.valor != 0) return true;
    }

    return false;
}

// =============================================================================
function dejar_rastro_pieza(x, y, idPieza, rotacion) {
    
    let colX = x;
    let colY = y;
    const parte_array = rotacion * 4;
    let rotacion_idPieza = idPieza.slice(parte_array, parte_array + 4);
    
    for (let relPos of rotacion_idPieza) {
        
        colX = x + relPos[0];
        colY = y + relPos[1];
        const posMatriz = settings.objeto.matrizfondo[colY][colX];
        
        posMatriz.valor = true; // true = ratro pieza / false = vacio
    }
}

// =============================================================================
function actualizar_matrizFondo(filaActual) {

    // Desplazar los 'ratrosPiezas' hacia abajo al hacer linea -------
    const filas = settings.constantes.FILAS;
    const columnas = settings.constantes.COLUMNAS;
    const matriz = settings.objeto.matrizfondo;

    for (let i = filaActual; i > 0; i --) {
        for (let ii = 0; ii < columnas; ii ++) {

            matriz[i][ii].valor = matriz[i - 1][ii].valor;
            //console.log(matriz[i][ii].valor);
        }
    }
}

// ===============================================================================
function draw_canvas(x, y, ancho, alto, color) {

    settings.dom.ctx.beginPath();
    settings.dom.ctx.fillStyle = color[2];
    settings.dom.ctx.moveTo(x, y);
    settings.dom.ctx.lineTo(x + ancho, y + alto);
    settings.dom.ctx.lineTo(x, y + alto);
    settings.dom.ctx.lineTo(x, y);
    settings.dom.ctx.fill();
    settings.dom.ctx.closePath();

    settings.dom.ctx.beginPath();
    settings.dom.ctx.fillStyle = color[0];
    settings.dom.ctx.moveTo(x, y);
    settings.dom.ctx.lineTo(x + ancho, y);
    settings.dom.ctx.lineTo(x + ancho, y + alto);
    settings.dom.ctx.lineTo(x, y);
    settings.dom.ctx.fill();
    settings.dom.ctx.closePath();
}

// ===============================================================================
function textos(txt, x, y, tipoLetra, color, align) {

    if (settings.estado.preJuego) {

        settings.dom.ctx.fillStyle = color;
        settings.dom.ctx.font = tipoLetra;
        settings.dom.ctx.textAlign = align;
        settings.dom.ctx.fillText(txt, x, y);
    }
}

// ===============================================================================
export {
    instanciar_matrizFondo,
    instanciar_pieza,
    check_colisiones,
    dejar_rastro_pieza,
    actualizar_matrizFondo,
    draw_canvas,
    textos
};
