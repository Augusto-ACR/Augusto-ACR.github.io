// Lógica simple de carrusel
document.addEventListener('DOMContentLoaded', () => {
     const carousel = document.querySelector('.carousel');
     if (!carousel) return;

     const track = carousel.querySelector('.carousel-track-inner');
     const items = Array.from(track.querySelectorAll('.card'));
     const prev = carousel.querySelector('.prev');
     const next = carousel.querySelector('.next');
     const dotsContainer = document.querySelector('.carousel-dots');

     // Crear puntos
     dotsContainer.innerHTML = '';
     items.forEach((_, i) => {
          const dot = document.createElement('button');
          dot.className = 'carousel-dot';
          dot.setAttribute('aria-label', `Ir al elemento ${i + 1}`);
          dotsContainer.appendChild(dot);
     });
     const dots = Array.from(dotsContainer.querySelectorAll('.carousel-dot'));

     let index = 0;

     const update = () => {
          const width = carousel.querySelector('.carousel-track').clientWidth;
          track.style.transform = `translateX(${-index * (width - 16)}px)`;
          dots.forEach((d, i) => d.classList.toggle('active', i === index));
          prev.disabled = index === 0;
          next.disabled = index === items.length - 1;
     };

     const goTo = (i) => {
          index = Math.max(0, Math.min(items.length - 1, i));
          update();
     };

     prev.addEventListener('click', () => goTo(index - 1));
     next.addEventListener('click', () => goTo(index + 1));
     dots.forEach((d, i) => d.addEventListener('click', () => goTo(i)));

     window.addEventListener('resize', update);
     update();
});

document.getElementById("IrProyectos").addEventListener("click", function() {
     document.querySelector(".Proyectos").scrollIntoView({ behavior: "smooth" }); 

});

document.getElementById("ModoOscuro").addEventListener("change", () => {
     if (document.body.className.indexOf('lightMode') === -1) {
          document.body.classList.add('lightMode');
     } else {
          document.body.classList.remove('lightMode');
     }
});

// Funciones para variar la clase 'hidden' de los proyectos
function setProyectoActivo(index){
     const proyectos = Array.from(document.querySelectorAll('.Proyectos .Proyecto'));
     if (proyectos.length === 0) return;
     const i = Math.max(0, Math.min(proyectos.length - 1, index));
     proyectos.forEach((p, idx) => p.classList.toggle('hidden', idx !== i));
}

function proyectoSiguiente(){
     const proyectos = Array.from(document.querySelectorAll('.Proyectos .Proyecto'));
     if (proyectos.length === 0) return;
     const actual = proyectos.findIndex(p => !p.classList.contains('hidden'));
     const next = (actual + 1) % proyectos.length;
     setProyectoActivo(next);
}

function proyectoAnterior(){
     const proyectos = Array.from(document.querySelectorAll('.Proyectos .Proyecto'));
     if (proyectos.length === 0) return;
     const actual = proyectos.findIndex(p => !p.classList.contains('hidden'));
     const prev = (actual - 1 + proyectos.length) % proyectos.length;
     setProyectoActivo(prev);
}

// Exponer para uso desde HTML/Consola si lo necesitas
window.setProyectoActivo = setProyectoActivo;
window.proyectoSiguiente = proyectoSiguiente;
window.proyectoAnterior = proyectoAnterior;

// Enlazar botones prev/next y establecer estado inicial
document.addEventListener('DOMContentLoaded', () => {
     const prevBtn = document.querySelector('.Proyectos .PrevProyecto');
     const nextBtn = document.querySelector('.Proyectos .NextProyecto');
     if (prevBtn) prevBtn.addEventListener('click', proyectoAnterior);
     if (nextBtn) nextBtn.addEventListener('click', proyectoSiguiente);

     // Si ambos están hidden, mostrar el primero
     const proyectos = Array.from(document.querySelectorAll('.Proyectos .Proyecto'));
     const visibleIndex = proyectos.findIndex(p => !p.classList.contains('hidden'));
     if (visibleIndex === -1 && proyectos.length > 0) {
          setProyectoActivo(0);
     }
});


