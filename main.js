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