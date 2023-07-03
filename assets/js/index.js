const propiedadesJSON = [
  {
    name: "Casa de campo",
    description: "Un lugar ideal para descansar de la ciudad",
    src: "https://www.construyehogar.com/wp-content/uploads/2020/02/Dise%C3%B1o-casa-en-ladera.jpg",
    rooms: 2,
    m: 170,
  },
  {
    name: "Casa de playa",
    description: "Despierta tus días oyendo el oceano",
    src: "https://media.chvnoticias.cl/2018/12/casas-en-la-playa-en-yucatan-2712.jpg",
    rooms: 2,
    m: 130,
  },
  {
    name: "Casa en el centro",
    description: "Ten cerca de ti todo lo que necesitas",
    src: "https://fotos.perfil.com/2018/09/21/trim/950/534/nueva-york-09212018-366965.jpg",
    rooms: 1,
    m: 80,
  },
  {
    name: "Casa rodante",
    description: "Conviertete en un nómada del mundo sin salir de tu casa",
    src: "https://cdn.bioguia.com/embed/3d0fb0142790e6b90664042cbafcb1581427139/furgoneta.jpg",
    rooms: 1,
    m: 6,
  },
  {
    name: "Departamento",
    description: "Desde las alturas todo se ve mejor",
    src: "https://www.adondevivir.com/noticias/wp-content/uploads/2016/08/depto-1024x546.jpg",
    rooms: 3,
    m: 200,
  },
  {
    name: "Mansión",
    description: "Vive una vida lujosa en la mansión de tus sueños ",
    src: "https://resizer.glanacion.com/resizer/fhK-tSVag_8UGJjPMgWrspslPoU=/768x0/filters:quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/CUXVMXQE4JD5XIXX4X3PDZAVMY.jpg",
    rooms: 5,
    m: 500,
  },
];

// Recepcion del elemento <div class="propiedades">
const propiedadesContainer = document.querySelector(".propiedades");
const propiedadesJSONOriginal = propiedadesJSON.slice();

// Función para generar el HTML de una propiedad
function generarHTMLPropiedad(propiedad) {
  return `
    <div class="propiedad">
      <div class="img" style="background-image: url('${propiedad.src}')"></div>
      <section>
        <h5>${propiedad.name}</h5>
        <div class="d-flex justify-content-between">
          <p>Cuartos: ${propiedad.rooms}</p>
          <p>Metros: ${propiedad.m}</p>
        </div>
        <p class="my-3">${propiedad.description}</p>
        <button class="btn btn-info">Ver más</button>
      </section>
    </div>
  `;
}

// Generacion de HTML para cada propiedad e introduccion al contenedor
for (let i = 0; i < propiedadesJSON.length; i++) {
  const propiedad = propiedadesJSON[i];
  const htmlPropiedad = generarHTMLPropiedad(propiedad);
  propiedadesContainer.innerHTML += htmlPropiedad;
}

// Declaracion y generacion del botón de búsqueda
const buscarButton = document.querySelector(".btn.btn-warning");

// Agregando evento click al botón de búsqueda
buscarButton.addEventListener("click", function () {
  // Recepcion de valores de los inputs
  const cuartosInput = document.getElementById("cuartosInput").value;
  const metrosDesdeInput = document.getElementById("metrosDesdeInput").value;
  const metrosHastaInput = document.getElementById("metrosHastaInput").value;

  // Verificacion de informacion en inputs
  if (
    cuartosInput === "" ||
    metrosDesdeInput === "" ||
    metrosHastaInput === ""
  ) {
    // Mensaje de alerta
    alert("Aún te faltan datos por llenar");
  } else {
    // Filtracion las propiedades según los criterios de búsqueda
    const propiedadesFiltradas = propiedadesJSONOriginal.filter(
      (propiedad) =>
        propiedad.rooms >= parseInt(cuartosInput) &&
        propiedad.m >= parseInt(metrosDesdeInput) &&
        propiedad.m <= parseInt(metrosHastaInput)
    );

    // Actualizacion de el total de propiedades encontradas
    document.getElementById("totalPropiedades").textContent =
      propiedadesFiltradas.length;

    // Generacion de HTML para las propiedades filtradas y agregarlo al contenedor
    let htmlPropiedadesFiltradas = "";
    for (let i = 0; i < propiedadesFiltradas.length; i++) {
      const propiedad = propiedadesFiltradas[i];
      htmlPropiedadesFiltradas += generarHTMLPropiedad(propiedad);
    }
    propiedadesContainer.innerHTML = htmlPropiedadesFiltradas;
  }
});

// Declaracion y generacion del botón limpiar busqueda
const limpiarButton = document.getElementById("limpiarBusqueda");

// Agregando evento al botón limpiar búsqueda
limpiarButton.addEventListener("click", function () {
  document.getElementById("cuartosInput").value = "";
  document.getElementById("metrosDesdeInput").value = "";
  document.getElementById("metrosHastaInput").value = "";

  // Restaurarcion de las propiedades originales de la pagina
  propiedadesContainer.innerHTML = ""; // Vaciar el contenido del contenedor

  for (let i = 0; i < propiedadesJSONOriginal.length; i++) {
    const propiedad = propiedadesJSONOriginal[i];
    const htmlPropiedad = generarHTMLPropiedad(propiedad);
    propiedadesContainer.innerHTML += htmlPropiedad;
  }
  document.getElementById("totalPropiedades").textContent =
    propiedadesJSONOriginal.length;
});