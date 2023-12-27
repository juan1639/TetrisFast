// ===================================================================
export class Settings {

    constructor() {

        this.constantes = {
            TILE_X: 30,
            TILE_Y: 30,
            FILAS: 20,
            COLUMNAS: 14,
            xInicial: 6,
            yInicial: 3,
            PIEZAS: 'zsljoit',
            FPS: 50
        };

        this.dom = {
            canvas: document.getElementById('canvas'),
            ctx: null
        };

        this.objeto = {
            matrizfondo: [],
            pieza: null
        };

        this.controles = {
            izquierda: false,
            derecha: false,
            abajo: false,
            rotar: false
        };

        this.marcadores = {
            lineas: 0,
            nivel: 1,
            record: 30
        };

        this.estado = {
            preJuego: true,
            enJuego: false,
            gameOver: false
        };

        this.varias = {
            cae_pieza: null,
            otra_pieza: false,
            velocidad_piezas: 900
        };

        this.colores = {
            colorPiezas: [
                ['rgb(255, 204, 0)', 'rgb(202, 162, 2)', 'rgb(227, 182, 2)', 'rgb(254, 219, 78)'],
                ['rgb(242, 55, 55)', 'rgb(190, 14, 14)', 'rgb(222, 16, 16)', 'rgb(244, 113, 113)'],
                ['rgb(131, 89, 149)', 'rgb(98, 67, 112)', 'rgb(121, 83, 138)', 'rgb(155, 117, 172)'],
                ['rgb(204, 204, 204)', 'rgb(166, 166, 166)', 'rgb(187, 187, 187)', 'rgb(221, 221, 221)'],
                ['rgb(159, 206, 49)', 'rgb(133, 172, 40)', 'rgb(149, 192, 46)', 'rgb(179, 216, 90)'],
                ['rgb(255, 174, 201)', 'rgb(255, 91, 145)', 'rgb(255, 119, 164)', 'rgb(255, 132, 172)'],
                ['rgb(74, 191, 240)', 'rgb(20, 165, 226)', 'rgb(52, 182, 237)', 'rgb(122, 207, 243)']
            ],
            fondo: {
                vacio: 'rgb(70, 62, 4)',
                rastroPieza: 'rgb(150, 150, 150)'
            }
        };

        this.sonido = {
            gameOverVoz: new Audio('./Audio/gameover.mp3'),
            musicaFondo: new Audio('./Audio/russia-tetris-game-puzzle.mp3'),
            lineaHecha: new Audio('./Audio/disparo.mp3')
        };
    }
}
