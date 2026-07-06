// Objeto de configuración global y centralizado
const CONFIG = {
    imagenes: {
        portada: 'invitulti.jpg', // Tu primera imagen
        interior: 'Gemini_Generated_Image_mt593bmt593bmt59.png' // Tu segunda imagen con los datos
    },
    musica: 'audio_fondo.mp3',
    sonidoDeslizar: 'page-turn.mp3',
    tiempoCarga: 3000 // 3 segundos
};

let audio = null;

// Función que controla la pantalla de carga
function iniciarPantallaCarga() {
    const barra = document.getElementById('barra-progreso');
    const loader = document.getElementById('pantalla-carga');
    
    let tiempoTranscurrido = 0;
    const intervaloVal = 50;

    const temporizador = setInterval(() => {
        tiempoTranscurrido += intervaloVal;
        
        const porcentaje = (tiempoTranscurrido / CONFIG.tiempoCarga) * 100;
        barra.style.width = porcentaje + '%';

        if (tiempoTranscurrido >= CONFIG.tiempoCarga) {
            clearInterval(temporizador);
            
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
                // Mostramos la portada al terminar la carga
                document.getElementById('pantalla-portada').classList.add('activa');
            }, 500);
        }
    }, intervaloVal);
}

function inicializarInvitacion() {
    const portada = document.getElementById('pantalla-portada');
    const interior = document.getElementById('pantalla-interior');
    const btnMusica = document.getElementById('btn-musica');

    // Asignamos los fondos directamente a los contenedores principales
    portada.style.backgroundImage = `url('${CONFIG.imagenes.portada}')`;
    interior.style.backgroundImage = `url('${CONFIG.imagenes.interior}')`;

    audio = new Audio(CONFIG.musica);
    audio.loop = true;
    audio.volume = 0.3; 

    const audioDeslizar = new Audio(CONFIG.sonidoDeslizar);
    audioDeslizar.preload = 'auto';
    audioDeslizar.volume = 1.0;     

    // Avanzar: click en portada
    portada.addEventListener('click', () => {
        audioDeslizar.play().catch(e => console.log("Error audio:", e));
        portada.classList.add('pasar-pagina');
        reproducirAudio(); 
    });

    // Volver: click en el interior
    interior.addEventListener('click', () => {
        audioDeslizar.play().catch(e => console.log("Error audio:", e));
        portada.classList.remove('pasar-pagina'); 
    });


}
function reproducirAudio() {
    const btnMusica = document.getElementById('btn-musica');
    audio.play().then(() => {
        btnMusica.classList.remove('muted');
        btnMusica.textContent = '🎵';
    }).catch(error => {
        console.log("La reproducción automática fue bloqueada o falló:", error);
    });
}

// Ejecutar cuando la página esté lista
window.addEventListener('DOMContentLoaded', () => {
    inicializarInvitacion();
    iniciarPantallaCarga();
});