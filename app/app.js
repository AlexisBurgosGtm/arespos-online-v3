if ('serviceWorker' in navigator) {
  window.addEventListener('load', () =>
    navigator.serviceWorker.register('sw.js')
      .then(registration => console.log('Service Worker registered'))
      .catch(err => 'SW registration failed'));
}

//variables globales
let GlobalCodCliente = 0;
let GlobalCodProd = '';
let GlobalDesProd = '';
let GlobalCodVen = 0;


// precios en pedidos
async function cargarListaProductos(){
  
    const response = await fetch(`data/productos.json`);
    const json = await response.json();
                
    let newsArticles = document.getElementById('contenedorProductos');
    newsArticles.innerHTML = '';
                            
    newsArticles.innerHTML =
                    `<table class="table" id="tblPrecios">
                        <thead><tr>
                          <td>Descripción</td>
                          <td>Medida</td> 
                          <td>Precio</td></tr> 
                          <td></td>
                        </thead>` + 
    json.Articles.map(createArticlePedido).join('\n');
    //await caches.match('data/productos.json');
  }


  function createArticlePedido(article) {
    return `<tr">
              <td>${article.DESPROD}</td>
              <td>${article.CODMEDIDA}</td> 
              <td><b>${String(article.PRECIO)}</b></td> 
              <td><button class="btn btn-round btn-default" onClick="fcn_hablar(String(${article.CODPROD}));">+</button></td> 
            </tr>`;
};
  
// precios
async function UpdatePrecios(){

  const response = await fetch(`data/productos.json`);
  const json = await response.json();
              
  let newsArticles = document.getElementById('contenedorPrecios');
  newsArticles.innerHTML = '';
                          
  newsArticles.innerHTML =
                  `<table class="table" id="tblPrecios">
                      <thead><tr class="card-body">
                        <td class="col-12-lg">Descripción</td>
                        <td class="col-6-lg">Medida</td> 
                        <td class="col-6-lg">Precio</td></tr>
                      </thead>` + 
  json.Articles.map(createArticle).join('\n');
  //await caches.match('data/productos.json');
}
  
function createArticle(article) {
    return `<tr class="card-body">
              <td class="col-12-lg">${article.DESPROD}</td>
              <td class="col-6-lg">${article.CODMEDIDA}</td> 
              <td class="col-6-lg"><b>${String(article.PRECIO)}</b></td> 
            </tr>`;
};


function crearBusquedaTabla(){
  var tableReg = document.getElementById('tblPrecios');
  var searchText = document.getElementById('search').value.toLowerCase();
	var cellsOfRow="";
	var found=false;
	var compareWith="";
 
	// Recorremos todas las filas con contenido de la tabla
	  for (var i = 1; i < tableReg.rows.length; i++)
			  {
    			cellsOfRow = tableReg.rows[i].getElementsByTagName('td');
	  			found = false;
		  		// Recorremos todas las celdas
			  	for (var j = 0; j < cellsOfRow.length && !found; j++)
				  {
					compareWith = cellsOfRow[j].innerHTML.toLowerCase();
					// Buscamos el texto en el contenido de la celda
					if (searchText.length == 0 || (compareWith.indexOf(searchText) > -1))
					{
						found = true;
					}
				}
				if(found)
				{
					tableReg.rows[i].style.display = '';
				} else {
					// si no ha encontrado ninguna coincidencia, esconde la
					// fila de la tabla
					tableReg.rows[i].style.display = 'none';
				}
			}
}

function CargarEventosConfig(){
              //verificar teléfono
              document.getElementById('btnverificar').addEventListener('click',()=>{
                  var telefono = document.getElementById('txttelefono').value;   
                  fcn_CompaniaTelefono(telefono,'SI')
             });
             //borrar caché
             document.getElementById('btneliminarcache').addEventListener('click',()=>{
                  try {
                      caches.delete('aresonline-v4');
                      fcn_hablar('Caché eliminado exitosamente');
                  } catch (error) {
                  fcn_hablar('Algo pasó, y no eliminé el caché');
                  }
            });

            crearBusquedaTabla();
 };
   


function SeleccionarClientePedido(codcliente){
      //headers.location ='pedido.html';
    GlobalCodCliente = codcliente;
    console.log('Código de cliente: ' + GlobalCodCliente);
    fcn_hablar(GlobalCodcliente);
}


// clientes en pedidos
async function cargarListaClientes(){
  
    const response = await fetch(`data/clientes.json`);
    const json = await response.json();
                
    let newsArticles = document.getElementById('contenedorClientes');
    newsArticles.innerHTML = '';
                            
    newsArticles.innerHTML =
                    `<table class="table table-responsive card" id="tblPrecios">
                        <thead><tr class="card-body">
                          <td class="col-4-lg">Cliente</td> 
                          <td class="col-4-lg">Dirección</td> 
                          <td class="col-4-lg">Telefono</td></tr> 
                          <td></td>
                        </thead>` + 
    json.Clientes.map(createClientePedido).join('\n');
    //await caches.match('data/productos.json');
  }


  function createClientePedido(cliente) {
    return `<tr class="card-body">
              <td class="col-12-lg">${cliente.NOMBRECLIENTE}</td>
              <td class="col-6-lg">${cliente.DIRCLIENTE}</td>
              <td class="col-6-lg">${cliente.TELEFONOCLIENTE}</td>
              <td><a href="pedido.html"><button class="btn btn-round btn-success" onClick="SeleccionarClientePedido(${cliente.CODCLIENTE});">+</button></a></td> 
            </tr>`;
};


