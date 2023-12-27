import { settings } from "./main.js";
import { actualizar_matrizFondo } from './function.js';

// ==========================================================================
export class MatrizFondo {

    constructor(col, fila) {

        this.columna = col;
        this.fila = fila;
        this.valor = false;
    }

    dibuja() {

        const x = this.columna * settings.constantes.TILE_X;
        const y = this.fila * settings.constantes.TILE_Y;
        const posMatriz = settings.objeto.matrizfondo[this.fila][this.columna];

        if (!posMatriz.valor) {
            settings.dom.ctx.fillStyle = settings.colores.fondo.vacio;
            
        } else {
            settings.dom.ctx.fillStyle = settings.colores.fondo.rastroPieza;
        }

        settings.dom.ctx.fillRect(x, y, settings.constantes.TILE_X, settings.constantes.TILE_Y);
    }

    static check_lineDone() {

        const filas = settings.constantes.FILAS;

        for (let i = filas - 1; i > 0; i --) {

            const matrizLinea = settings.objeto.matrizfondo[i];
            //console.log(matrizLinea);

            let contador_cols = 0;

            for (let cols of matrizLinea) {
                if (cols.valor) contador_cols ++; 
            }
            
            if (contador_cols === matrizLinea.length) {
                settings.sonido.lineaHecha.play();
                settings.marcadores.lineas ++;
                actualizar_matrizFondo(i);
            }
        }
    }
}
