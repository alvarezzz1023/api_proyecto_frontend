//al desplegar en el servidor colocar la base de datos del servidor 
const url = 'https://api-proyecto-backend.onrender.com/api/compra'

const listarDatos= async()=>{
    let respuesta=''
    let body = document.getElementById('contenido')
    //url de donde se tiene la api
    //consultar/ trabajar apis desde javascript
    fetch (url,{
        method: 'GET',
        mode: 'cors',
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then((resp)=> resp.json())
    .then(function(data){
        let listaCompras = data.compras
        return listaCompras.map(function(compra){
            respuesta+=`<tr><td>${compra.proveedor}</td>`+
            `<td>${compra.contacto}</td>`+
            `<td>${compra.factura}</td>`+
            `<td>${compra.fechaCompra}</td>`+
            `<td>${compra.fechaRegistro}</td>`+
            `<td>${compra.valorTotal}</td>`+
            `<td>${compra.formaPago}</td>`+
            
            `<td>${compra.observaciones}</td>`+            
            `<td>${compra.estado}</td>`+
            `<td>
            <button type="button" class="btn btn-primary"  data-bs-toggle="modal"  data-bs-target="#exampleModal" onclick='editar(${JSON.stringify(compra)})'>Editar</button></td>
            <td><a href='#'  class="btn btn-danger" onclick='eliminar(${JSON.stringify(compra)})' type="button">Eliminar</a></td>
            </tr>`
            body.innerHTML = respuesta
        })
    })
    body.innerHTML= respuesta
}



const registrar = async() =>{    
    const validarFacturaRespuesta =  validarFactura();
    const validarValorTotalRespuesta = validarValorTotal ();
    const validarFechaCompraRespuesta =  validarFechaCompra ();
    const validarProveedorRespuesta =  validarProveedor();
    const validarContactoRespuesta =  validarContacto();


    if (validarFacturaRespuesta && validarFechaCompraRespuesta && validarValorTotalRespuesta && validarProveedorRespuesta && validarContactoRespuesta ){
        let _proveedor = document.getElementById('_proveedor').value
        let _contacto = document.getElementById('_contacto').value
        let _factura = document.getElementById('_factura').value
        let _fechaCompra = document.getElementById('_fechaCompra').value
        let _formaPago = document.getElementById('_formaPago').value
        let _valorTotal = document.getElementById('_valorTotal').value
        let _observaciones = document.getElementById('_observaciones').value
        let _estado = document.getElementById('_estado').value

        let compra = {
            proveedor : _proveedor,
            contacto : _contacto,
            factura : _factura,
            fechaCompra : _fechaCompra,
            formaPago : _formaPago,
            valorTotal : _valorTotal,
            observaciones : _observaciones,
            estado : _estado
        }

        fetch(url,{
            method: 'POST',
            mode : 'cors',
            body: JSON.stringify(compra),
            headers:{"Content-type": "application/json; charset=UTF-8"}
        })
        .then((resp)=> resp.json())
        .then(json => {
            Swal.fire({
                icon: 'success',
                title: 'La compra ha sido creada exitosamente',
                showConfirmButton: false,
                timer: 1500
              });
            setTimeout(() =>{
                window.location.href = 'listarCompra.html';
            },1000);  
        })
    }
}


validarFechaCompra = () => {

  let fechaCompra = document.getElementById('_fechaCompra').value
  let texto;
  let fechaActual = new Date().toISOString().split('T')[0];
  
  if (fechaCompra === null || fechaCompra === '' || fechaCompra.length === 0) {
      texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Ingrese la fecha de la orden de trabajo</span>';
      document.getElementById('_errorFechaCompra').innerHTML = texto;
      return false;
    }else if (fechaCompra > fechaActual){
      texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">La fecha no puede ser mayor a la fecha de registro</span>';
      document.getElementById('_errorFechaCompra').innerHTML = texto;
      return false;
    }else{
      document.getElementById('_errorFechaCompra').innerHTML = '';
    return true;
    }
}

validarProveedor = () => {
    let validarProveedor = document.getElementById('_proveedor').value
    let texto;
    let expresion = /[a-zA-Z]/;
  
    if (validarProveedor === null || validarProveedor === '' || validarProveedor.length === 0) {
      texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Ingrese el nombre del proveedor</span>';
      document.getElementById('_errorProveedor').innerHTML = texto;
      return false;
    } else if (validarProveedor.length < 3) {
      texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">El nombre del proveedor debe de ser mayor o igual a 3 letras</span>';
      document.getElementById('_errorProveedor').innerHTML = texto;
      return false;
    } else if (!expresion.test(validarProveedor)) {
      texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Solo se permiten letras</span>';
      document.getElementById('_errorProveedor').innerHTML = texto;
      return false;
    } else {
      document.getElementById('_errorProveedor').innerHTML = '';
      return true;
    }
};

validarContacto = () => {
    let validarContacto = document.getElementById('_contacto').value
    let texto;
    let expresion = /[a-zA-Z]/;
  
    if (validarContacto === null || validarContacto === '' || validarContacto.length === 0) {
      texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Ingrese el contacto de la empresa</span>';
      document.getElementById('_errorContacto').innerHTML = texto;
      return false;
    } else if (validarContacto.length < 3) {
      texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">El nombre del contacto debe de ser mayor o igual a 3 letras</span>';
      document.getElementById('_errorContacto').innerHTML = texto;
      return false;
    } else if (!expresion.test(validarContacto)) {
      texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Solo se permiten letras</span>';
      document.getElementById('_errorContacto').innerHTML = texto;
      return false;
    } else {
      document.getElementById('_errorContacto').innerHTML = '';
      return true;
    }
};

validarFactura = () => {
    let factura = document.getElementById('_factura').value;
    let texto;
    let expresion = /[0-9]/;
  
    if (factura === null || factura === '' || factura.length === 0) {
      texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Ingrese un numero de factura</span   >';
      document.getElementById('_errorFactura').innerHTML = texto;
      return false;
    } else if (!expresion.test(factura)) {
      texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Solo se permite numeros</span>';
      document.getElementById('_errorFactura').innerHTML = texto;
      return false;
    } else if (factura.length < 3) {
      texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">El numero tiene que ser mayor o igual a 3 caracteres numericos</span>';
      document.getElementById('_errorFactura').innerHTML = texto;
      return false;
    } else if (factura.length > 7) {
      texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">El numero tiene que ser menor o igual carcateres numericos</span>';
      document.getElementById('_errorFactura').innerHTML = texto;
      return false;    
    }else{
      document.getElementById('_errorFactura').innerHTML = '';
      return true;
    } 
}

validarValorTotal = () => {
    let valorTotal = document.getElementById('_valorTotal').value;
    let texto;
    let expresion = /[0-9]/;
  
    if (valorTotal === null || valorTotal === '' || valorTotal.length === 0) {
      texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Ingrese el valor total</span   >';
      document.getElementById('_errorValorTotal').innerHTML = texto;
      return false;
    } else if (!expresion.test(valorTotal)) {
      texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Solo se permite numeros</span>';
      document.getElementById('_errorValorTotal').innerHTML = texto;
      return false;
    } else if (valorTotal <= 0) {
      texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">El valor total no puede ser menor o igual a 0</span>';
      document.getElementById('_errorValorTotal').innerHTML = texto;
      return false;
    } else{
      document.getElementById('_errorValorTotal').innerHTML = '';
      return true;
    } 
}



if(document.querySelector('#btnRegistrar')){
    document.querySelector('#btnRegistrar')
    .addEventListener('click',registrar)
}




const ActualizarRegistro = async() =>{

    const validarValorTotalRespuesta1 = validarValorTotal1();
    const validarFechaCompraRespuesta1 = validarFechaCompra1();
    const validarProveedorRespuesta1 = validarProveedor1();
    const validarContactoRespuesta1 = validarContacto1();

    if (validarFechaCompraRespuesta1 && validarValorTotalRespuesta1 && validarProveedorRespuesta1 && validarContactoRespuesta1){
        let _factura = document.getElementById('factura').value
        let _proveedor = document.getElementById('proveedor').value
        let _contacto = document.getElementById('contacto').value
        let _fechaCompra = document.getElementById('fechaCompra').value
        let _formaPago = document.getElementById('formaPago').value
        let _valorTotal = document.getElementById('valorTotal').value
        let _observaciones = document.getElementById('observaciones').value
        let _estado = document.getElementById('estado').value

        let compra = {
            proveedor : _proveedor,
            contacto : _contacto,
            factura : _factura,
            fechaCompra : _fechaCompra,
            formaPago : _formaPago,
            valorTotal : _valorTotal,
            observaciones : _observaciones,
            estado : _estado
        }
        console.log(compra)
        fetch(url,{
            method: 'PUT',
            mode : 'cors',
            body: JSON.stringify(compra),
            headers:{"Content-type": "application/json; charset=UTF-8"}
        })
        .then((resp)=> resp.json())
        .then(json => {
            Swal.fire({
                icon: 'info',
                title: 'La compra ha sido modificado exitosamente',
                showConfirmButton: false,
                timer: 1500
              });
            setTimeout(() =>{
                window.location.href = 'listarCompra.html';
            },1000);  
        })

    }
}

validarProveedor1 = () => {
    let validarProveedor = document.getElementById('proveedor').value
    let texto;
    let expresion = /[a-zA-Z]/;
  
    if (validarProveedor === null || validarProveedor === '' || validarProveedor.length === 0) {
      texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Ingrese el nombre del proveedor</span>';
      document.getElementById('errorProveedor').innerHTML = texto;
      return false;
    } else if (validarProveedor.length < 3) {
      texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">El nombre del proveedor debe de ser mayor o igual a 3 letras</span>';
      document.getElementById('errorProveedor').innerHTML = texto;
      return false;
    } else if (!expresion.test(validarProveedor)) {
      texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Solo se permiten letras</span>';
      document.getElementById('errorProveedor').innerHTML = texto;
      return false;
    } else {
      document.getElementById('errorProveedor').innerHTML = '';
      return true;
    }
};

validarContacto1 = () => {
    let validarContacto = document.getElementById('contacto').value
    let texto;
    let expresion = /[a-zA-Z]/;
  
    if (validarContacto === null || validarContacto === '' || validarContacto.length === 0) {
      texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Ingrese el contacto de la empresa</span>';
      document.getElementById('errorContacto').innerHTML = texto;
      return false;
    } else if (validarContacto.length < 3) {
      texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">El nombre del contacto debe de ser mayor o igual a 3 letras</span>';
      document.getElementById('errorContacto').innerHTML = texto;
      return false;
    } else if (!expresion.test(validarContacto)) {
      texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Solo se permiten letras</span>';
      document.getElementById('errorContacto').innerHTML = texto;
      return false;
    } else {
      document.getElementById('errorContacto').innerHTML = '';
      return true;
    }
};

// validarFactura1 = () => {
//     let factura = document.getElementById('_factura').value;
//     let texto;
//     let expresion = /[0-9]/;
  
//     if (factura === null || factura === '' || factura.length === 0) {
//       texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Ingrese un numero de factura</span   >';
//       document.getElementById('errorFactura').innerHTML = texto;
//       return false;
//     } else if (!expresion.test(factura)) {
//       texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Solo se permite numeros</span>';
//       document.getElementById('errorFactura').innerHTML = texto;
//       return false;
//     } else if (factura.length < 3) {
//       texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">El numero tiene que ser mayor o igual a 3 caracteres numericos</span>';
//       document.getElementById('errorFactura').innerHTML = texto;
//       return false;
//     } else if (factura.length > 7) {
//       texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">El numero tiene que ser menor o igual carcateres numericos</span>';
//       document.getElementById('errorFactura').innerHTML = texto;
//       return false;    
//     }else{
//       document.getElementById('errorFactura').innerHTML = '';
//       return true;
//     } 
// }

validarValorTotal1 = () => {
    let valorTotal = document.getElementById('valorTotal').value;
    let texto;
    let expresion = /[0-9]/;
  
    if (valorTotal === null || valorTotal === '' || valorTotal.length === 0) {
      texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Ingrese el valor total</span   >';
      document.getElementById('errorValorTotal').innerHTML = texto;
      return false;
    } else if (!expresion.test(valorTotal)) {
      texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Solo se permite numeros</span>';
      document.getElementById('errorValorTotal').innerHTML = texto;
      return false;
    } else if (valorTotal <= 0) {
      texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">El valor total no puede ser menor o igual a 0</span>';
      document.getElementById('errorValorTotal').innerHTML = texto;
      return false;
    } else{
      document.getElementById('errorValorTotal').innerHTML = '';
      return true;
    } 
}

validarFechaCompra1 = () => {

    let fechaCompra = document.getElementById('fechaCompra').value
    let texto;

    let fechaActual = new Date().toISOString().split('T')[0];
    
    if (fechaCompra === null || fechaCompra === '' || fechaCompra.length === 0) {
        texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Ingrese la fecha de la orden de trabajo</span>';
        document.getElementById('errorFechaCompra').innerHTML = texto;
        return false;
      }else if (fechaCompra > fechaActual){
        texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">La fecha no puede ser mayor a la fecha de registro</span>';
        document.getElementById('errorFechaCompra').innerHTML = texto;
        return false;
      }else{
        document.getElementById('errorFechaCompra').innerHTML = '';
      return true;
      }
}


const editar = (compra) => {
    document.getElementById('proveedor').value = compra.proveedor;
    document.getElementById('contacto').value = compra.contacto;
    document.getElementById('factura').value = compra.factura;
    document.getElementById('fechaCompra').value = compra.fechaCompra;
    document.getElementById('formaPago').value = compra.formaPago;
    document.getElementById('valorTotal').value = compra.valorTotal;
    document.getElementById('observaciones').value = compra.observaciones;    
    document.getElementById('estado').value = compra.estado;     
  }

const eliminar = (id) =>{

    Swal.fire({
        title: 'Estas seguro?',
        text: "¡No podrás revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Eliminarlo!'
      }).then((result) => {
        if (result.isConfirmed) {
            let compra = {
                _id: id
            }
            fetch (url,{
                method: 'DELETE',
                mode: 'cors',
                body: JSON.stringify(compra),//Convertir el objeto _usuario a un JSON
                headers: {"Content-type": "application/json; charset=UTF-8"}
            }).then(() =>{
                Swal.fire(
                    'Eliminado!',
                    'La compra ha sido eliminada.',
                    'success',
                    );
                setTimeout(() =>{
                    window.location.href = 'listarCompra.html';
                },1000);  
            })
        }
      })
}



if(document.querySelector('#btnActualizar')){
    document.querySelector('#btnActualizar')
    .addEventListener('click',ActualizarRegistro)
}