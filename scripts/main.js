const biblioteca = [];

function buscarLibro() {
    const titulo = document.getElementById("busqueda").value;
    fetch(`https://openlibrary.org/search.json?title=${encodeURIComponent(titulo)}`)
        .then(response => response.json())
        .then(data => {
            if (data.docs && data.docs.length > 0) {
                const libro = data.docs[0];
                const tituloLibro = libro.title;
                const autorLibro = libro.author_name ? libro.author_name.join(", ") : "Autor desconocido";
                document.getElementById("resultado").innerHTML = `<p>Libro encontrado: ${tituloLibro} de ${autorLibro}</p>
                    <button onclick="agregarLibro('${tituloLibro}', '${autorLibro}')">Añadir a Biblioteca</button>`;
            } else {
                document.getElementById("resultado").innerHTML = "<p>No se encontraron resultados.</p>";
            }
        })
        .catch(error => console.error("Error al obtener los datos:", error));
}

function agregarLibro(titulo, autor) {
    biblioteca.push({ titulo, autor });
    mostrarBiblioteca();
}

function mostrarBiblioteca() {
    const divBiblioteca = document.getElementById("biblioteca");
    divBiblioteca.innerHTML = "<h2>Biblioteca</h2>";
    biblioteca.forEach((libro, index) => {
        divBiblioteca.innerHTML += `<p>${index + 1}. ${libro.titulo} de ${libro.autor}</p>`;
    });
}

function guardarBiblioteca() {
    localStorage.setItem("biblioteca", JSON.stringify(biblioteca));
    alert("Biblioteca guardada.");
}