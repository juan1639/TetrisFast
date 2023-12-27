import { settings } from "./main.js";
import {
    check_colisiones,
    dejar_rastro_pieza,
    draw_canvas
} from "./function.js";

// ===================================================================================
export class Pieza {

    constructor(x, y, idPieza, color) {

        this.x = x;
        this.y = y;
        this.idPieza = idPieza;
        this.color = color;
        this.rotacion = 0; // Por defecto (la pieza viene SIN rotar)
    }

    static plantilla = {
        z: [[0, 0], [0, -1], [-1, -1], [1, 0],
            [0, 0], [0, -1], [-1, 0], [-1, 1],
            [0, 0], [0, -1], [-1, -1], [1, 0],
            [0, 0], [0, -1], [-1, 0], [-1, 1]
        ],
        s: [[0, 0], [0, -1], [1, -1], [-1, 0],
            [0, 0], [0, 1], [-1, -1], [-1, 0],
            [0, 0], [0, -1], [1, -1], [-1, 0],
            [0, 0], [0, 1], [-1, -1], [-1, 0]
        ],
        l: [[0, 0], [0, -1], [0, -2], [1, 0],
            [0, 0], [-1, 0], [1, 0], [1, -1],
            [0, 0], [0, -1], [0, -2], [-1, -2],
            [0, 0], [0, -1], [1, -1], [2, -1]
        ],
        j: [[0, 0], [1, 0], [1, -1], [1, -2],
            [0, 0], [0, -1], [-1, -1], [-2, -1],
            [0, 0], [0, -1], [0, -2], [1, -2],
            [0, 0], [0, -1], [1, 0], [2, 0]
        ],
        o: [[0, 0], [0, -1], [1, -1], [1, 0],
            [0, 0], [0, -1], [1, -1], [1, 0],
            [0, 0], [0, -1], [1, -1], [1, 0],
            [0, 0], [0, -1], [1, -1], [1, 0]
        ],
        i: [[0, 0], [-1, 0], [1, 0], [2, 0],
            [0, 0], [0, -1], [0, -2], [0, -3],
            [0, 0], [-1, 0], [1, 0], [2, 0],
            [0, 0], [0, -1], [0, -2], [0, -3]
        ],
        t: [[0, 0], [0, -1], [-1, 0], [1, 0],
            [0, 0], [0, -1], [0, -2], [-1, -1],
            [0, 0], [-1, 0], [1, 0], [0, 1],
            [0, 0], [0, -1], [0, -2], [1, -1]
        ],
    };

    dibuja() {

        this.actualiza();

        const ancho = settings.constantes.TILE_X;
        const alto = settings.constantes.TILE_Y;

        const parteArray = this.rotacion * 4;
        const rotacion_idPieza = this.idPieza.slice(parteArray, parteArray + 4);

        rotacion_idPieza.forEach(relPos => {

            const x = (this.x + relPos[0]) * ancho;
            const y = (this.y + relPos[1]) * alto;

            draw_canvas(x, y, ancho, alto, this.color);
        });
    }

    actualiza() {

        if (!settings.estado.enJuego) return;

        if (settings.controles.izquierda) {

            this.x --;
            const colision = check_colisiones(this.x, this.y, this.idPieza, this.rotacion);
            if (colision) this.x ++;
            settings.controles.izquierda = false;

        } else if (settings.controles.derecha) {

            this.x ++;
            const colision = check_colisiones(this.x, this.y, this.idPieza, this.rotacion);
            if (colision) this.x --;
            settings.controles.derecha = false;

        } else if (settings.controles.abajo) {

            this.y ++;
            const colision = check_colisiones(this.x, this.y, this.idPieza, this.rotacion);

            if (colision) {
                this.y--;

                if (this.y <= settings.constantes.yInicial) {
                    ir_al_gameOver();
                }

                settings.varias.otra_pieza = true; // colision abajo = momento de instanciar otra pieza...
                dejar_rastro_pieza(this.x, this.y, this.idPieza, this.rotacion);
            }

            settings.controles.abajo = false;

        } else if (settings.controles.rotar) {

            const bck_rotacion = this.rotacion;
            this.rotacion ++;
            if (this.rotacion >= 4) this.rotacion = 0;

            const colision = check_colisiones(this.x, this.y, this.idPieza, this.rotacion);
            if (colision) {
                console.log('No es posible rotar...');
                this.rotacion = bck_rotacion;
            }

            settings.controles.rotar = false;
        }
    }
}

