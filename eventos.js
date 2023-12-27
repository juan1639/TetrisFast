import { settings } from './main.js';

// ====================================================================================
const teclado = document.addEventListener('keydown', (ev) => {

    console.log(ev.key);

    if (settings.estado.enJuego) {

        if (ev.key === 'ArrowLeft' || ev.keyCode === 37) {
            settings.controles.izquierda = true;

        } else if (ev.key === 'ArrowRight' || ev.keyCode === 39) {
            settings.controles.derecha = true;

        } else if (ev.key === 'ArrowDown' || ev.keyCode === 40) {
            settings.controles.abajo = true;

        } else if (ev.key === 'Control' || ev.keyCode === 17 || ev.keyCode === 32) {
            settings.controles.rotar = true;
        }
    }

    if (settings.estado.preJuego) {

        if (ev.key === 'Enter' || ev.keyCode === 13) {

            settings.estado.preJuego = false;
            settings.estado.enJuego = true;
            settings.sonido.musicaFondo.play();
            settings.sonido.musicaFondo.volume = 0.6;
        }
    }
});

// ====================================================================================
const raton = document.addEventListener('click', (ev) => {

    console.log(ev.target.id);

    if (settings.estado.preJuego) {

        if (ev.target.id === 'canvas') {

            settings.estado.preJuego = false;
            settings.estado.enJuego = true;
            settings.sonido.musicaFondo.play();
            settings.sonido.musicaFondo.volume = 0.6;
        }
    }
});

export {
    teclado,
    raton
};
