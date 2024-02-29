//capturamos los elementos del html
let contenedorImgDesencriptador = document.getElementById('imagen-contenedor-desencriptador');
let textoEncriptar = document.getElementById('texto-encriptar');
let textoDesencriptar = document.getElementById('texto-desencriptar');
let botonEncriptar = document.getElementById('btnEncriptar');
let botonDesencriptar = document.getElementById('btnDesencriptar');
let botonCopiar = document.getElementById('btnCopiar');
let botonSetear = document.getElementById('btnBorrar');
let contenidoModal = document.getElementById('modalContenido');
let modal = document.getElementById("miModal");

//declaramos variables
let texto, textoEncriptado, textoDesencriptado, textoCopiado,elementosModal, botonPegar;

elementosModal = crearElementos();
botonPegar = crearBoton()

//funcion para crear un boton
function crearBoton(){
    //crear elemento
    let boton = document.createElement('button');

    //Agregamos atributos al boton
    boton.textContent = 'Pegar'
    boton.id = 'btnPegar'
    boton.classList.add('btn','btn-pegar')    

    return boton;

}

//funcion para crear elementos html
function crearElementos(){
 
  let parrafo = document.createElement('p');
  parrafo.id = 'valorModalEncriptado';
  let spanX = document.createElement('span');
  let tituloModal = document.createElement('h2');

  return {parrafo, spanX, tituloModal};
}

//funcion para agregar los elementos al modal
function elementoModal(){
  //agregamos la X de cerrar el modal
  elementosModal.spanX.textContent = 'X';
  elementosModal.spanX.classList.add('cerrar-modal');

  //agregamos la X de cerrar la ventana al modal y el evento de cerrar modal
  contenidoModal.appendChild(elementosModal.spanX);
  elementosModal.spanX.addEventListener('click', function (){
      modal.style.display = "none";
  })
}

//funcion para encriptar
function encriptar(textoEncriptar){
  let matrizSustitucion = [["e" , "enter"],["i" , "imes"], ["a" , "ai" ],["o", "ober"],["u", "ufat"]];                           
                             
  textoEncriptar = textoEncriptar.toLowerCase();

  for (let i = 0; i < matrizSustitucion.length; i++) {
    if(textoEncriptar.includes(matrizSustitucion[i][0])){
      textoEncriptar = textoEncriptar.replaceAll(matrizSustitucion[i][0],matrizSustitucion[i][1]);
    };   
  };
  return textoEncriptar;

};

//funcion para desencriptar el texto
function desencriptar(textoDesencriptar){
  let matrizSustitucion = [["e" , "enter"],["i" , "imes"], ["a" , "ai" ],["o", "ober"],["u", "ufat"]];                           
                             
  textoDesencriptar = textoDesencriptar.toLowerCase();

  for (let i = 0; i < matrizSustitucion.length; i++) {
    if(textoDesencriptar.includes(matrizSustitucion[i][0])){
      textoDesencriptar = textoDesencriptar.replaceAll(matrizSustitucion[i][1],matrizSustitucion[i][0]);
    };
    
  };
  return textoDesencriptar;
};

//se le añade un evento al botonEncriptar
botonEncriptar.addEventListener('click', function(){
  texto = textoEncriptar.value;
  textoEncriptado = encriptar(texto);

  textoDesencriptar.value = textoEncriptado;
  
  texto ? contenedorImgDesencriptador.classList.add('oculto') :contenedorImgDesencriptador.classList.remove('oculto') ;
  //deshabilitamos el boton nuevamente
  botonDesencriptar.disabled = true;


});

//se le añade un evento al botonDesencriptar
botonDesencriptar.addEventListener('click', function(){
  texto = textoEncriptar.value;
  textoDesencriptado = desencriptar(texto);  
  textoDesencriptar.value = textoDesencriptado;
});

//se le añade evento al boton copiar
botonCopiar.addEventListener('click', function(){

  textoCopiado = textoDesencriptar.value;
  elementosModal.parrafo.textContent = `${textoCopiado} `;
  console.log(elementosModal.parrafo.textContent)

  if(textoCopiado){

    //agregamos la clase modal al contenedor Modal
    contenidoModal.classList.add('modal-contenido');

    //funcion para agregar elementos al modal
    elementoModal();

    //creamos el mensaje a mostrar en el modal
    elementosModal.tituloModal.textContent = `Deseas pegar el siguiente texto?: `;    

    contenidoModal.appendChild(elementosModal.tituloModal);
    contenidoModal.appendChild(elementosModal.parrafo);
    contenidoModal.appendChild(botonPegar);


    //mostramos el contenido
    modal.style.display = "flex";

    //deshabilitamos el boton nuevamente
    botonDesencriptar.disabled = true;
  };
})

//se le añade evento al boton pegar
botonPegar.addEventListener('click', function(){
  let contenidoParrafo = document.getElementById('valorModalEncriptado');
  textoDesencriptar.value = '';

  //Evaluamos si llega contenido
  if(contenidoParrafo){
    textoEncriptar.value = contenidoParrafo.textContent;
    modal.style.display = "none";
    botonDesencriptar.disabled = false;

  };
  
});

//Agregamos evento al boton setear
botonSetear.addEventListener('click', function(){
  location.reload();

});

  