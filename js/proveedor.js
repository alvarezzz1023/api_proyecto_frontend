//al desplegar en el servidor colocar la base de datos del servidor 
const url = 'https://api-proyecto-backend.onrender.com/api/proveedor'

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
        let listaProveedores = data.proveedores
        return listaProveedores.map(function(proveedor){
            respuesta+=`<tr><td>${proveedor.tipoProveedor}</td>`+
            `<td>${proveedor.tipoIdentificacion}</td>`+
            `<td>${proveedor.numeroIdentificacion}</td>`+
            `<td>${proveedor.razonSocial}</td>`+
            `<td>${proveedor.nombreComercial}</td>`+
            `<td>${proveedor.ciudad}</td>`+
            `<td>${proveedor.direccion}</td>`+
            `<td>${proveedor.contacto}</td>`+
            `<td>${proveedor.telefono}</td>`+
            `<td>${proveedor.correo}</td>`+
            `<td>${proveedor.estado}</td>`+
            `<td><button type="button" class="btn btn-primary"  data-bs-toggle="modal"  data-bs-target="#exampleModal" onclick='editar(${JSON.stringify(proveedor)})'>Editar</button></td>
            <td><a href='#'  class="btn btn-danger" onclick='eliminar(${JSON.stringify(proveedor)})' type="button">Eliminar</a></td></tr>`
            body.innerHTML = respuesta
        })
    })
    body.innerHTML= respuesta
}


const registrar = async() =>{
    const validarNombreComercialRespuesta = validarNombreComercial1 ();
    const validarRazonSocialRespuesta = validarRazonSocial1 ();
    const validarContactoRespuesta = validarContacto1 ();
    const validarNumeroIdentificacionRespuesta = validarNumeroIdentificacion1 ();
    const validarCiudadRespuesta = validarCiudad1 ();
    const validarDireccionRespuesta = validarDireccion1 ();
    const validarTelefonoRespuesta = validarTelefono1 ();
    const validarCorreoRespuesta = validarCorreo1 ();

    if (validarNumeroIdentificacionRespuesta && validarRazonSocialRespuesta && validarNombreComercialRespuesta && validarCiudadRespuesta && validarDireccionRespuesta && validarTelefonoRespuesta && validarCorreoRespuesta && validarContactoRespuesta){
        let _tipoProveedor = document.getElementById('tipoProveedor1').value
        let _tipoIdentificacion = document.getElementById('tipoIdentificacion1').value  
        let _numeroIdentificacion = document.getElementById('numeroIdentificacion1').value  
        let _razonSocial = document.getElementById('razonSocial1').value   
        let _nombreComercial = document.getElementById('nombreComercial1').value
        let _ciudad = document.getElementById('ciudad1').value
        let _direccion = document.getElementById('direccion1').value
        let _contacto = document.getElementById('contacto1').value
        let _telefono = document.getElementById('telefono1').value
        let _correo = document.getElementById('correo1').value
        let _estado = document.getElementById('estado1').value

        let proveedor = {
            tipoProveedor : _tipoProveedor,
            tipoIdentificacion : _tipoIdentificacion,
            numeroIdentificacion : _numeroIdentificacion,
            razonSocial : _razonSocial,
            nombreComercial : _nombreComercial,
            ciudad : _ciudad,
            direccion : _direccion,
            contacto : _contacto,
            telefono : _telefono,
            correo : _correo,
            estado : _estado
        }
          console.log(proveedor)
        fetch(url,{
            method: 'POST',
            mode : 'cors',
            body: JSON.stringify(proveedor),
            headers:{"Content-type": "application/json; charset=UTF-8"}
        })
        .then((resp)=> resp.json())
        .then(json => {
            // Swal.fire({
            //     icon: 'success',
            //     title: 'El proveedor ha sido creado exitosamente',
            //     showConfirmButton: false,
            //     timer: 1500
            //   });
            // setTimeout(() =>{
            //     window.location.href = 'listarProveedor.html';
            // },1000);  
        })
    }
}


  validarNombreComercial1 = () => {
    let nombreComercial = document.getElementById('nombreComercial1').value
    let texto;
    let expresion = /[a-zA-Z]/;
  
    if (nombreComercial === null || nombreComercial === '' || nombreComercial.length === 0) {
      texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Ingrese el nombre comercial de la empresa</span>';
      document.getElementById('errorNombreComercial1').innerHTML = texto;
      return false;
    } else if (nombreComercial.length < 3) {
      texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">El nombre comercial debe de ser mayor o igual a 3 letras</span>';
      document.getElementById('errorNombreComercial1').innerHTML = texto;
      return false;
    } else if (!expresion.test(nombreComercial)) {
      texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Solo se permiten letras</span>';
      document.getElementById('errorNombreComercial1').innerHTML = texto;
      return false;
    } else {
      document.getElementById('errorNombreComercial1').innerHTML = '';
      return true;
    }
  };
  
  validarRazonSocial1 = () => {
    let razonSocial = document.getElementById('razonSocial1').value
    let texto;
    let expresion = /[a-zA-Z]/;
  
    if (razonSocial === null || razonSocial === '' || razonSocial.length === 0) {
      texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Ingrese la razon social de la empresa</span>';
      document.getElementById('errorRazonSocial1').innerHTML = texto;
      return false;
    } else if (razonSocial.length < 3) {
      texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">la razon social debe de ser mayor o igual a 3 letras</span>';
      document.getElementById('errorRazonSocial1').innerHTML = texto;
      return false;
    } else if (!expresion.test(razonSocial)) {
      texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Solo se permiten letras</span>';
      document.getElementById('errorRazonSocial1').innerHTML = texto;
      return false;
    } else {
      document.getElementById('errorRazonSocial1').innerHTML = '';
      return true;
    }
  };
  
  validarContacto1 = () => {
    let validarContacto = document.getElementById('contacto1').value
    let texto;
    let expresion = /[a-zA-Z]/;
  
    if (validarContacto === null || validarContacto === '' || validarContacto.length === 0) {
      texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Ingrese el contacto de la empresa</span>';
      document.getElementById('errorContacto1').innerHTML = texto;
      return false;
    } else if (validarContacto.length < 3) {
      texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">El nombre del contacto debe de ser mayor o igual a 3 letras</span>';
      document.getElementById('errorContacto1').innerHTML = texto;
      return false;
    } else if (!expresion.test(validarContacto)) {
      texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Solo se permiten letras</span>';
      document.getElementById('errorContacto1').innerHTML = texto;
      return false;
    } else {
      document.getElementById('errorContacto1').innerHTML = '';
      return true;
    }
  };
  
  validarNumeroIdentificacion1 = () => {
    let numeroIdentificacion = document.getElementById('numeroIdentificacion1').value;
    let texto;
    let expresion = /[0-9]/;
  
    if (numeroIdentificacion === null || numeroIdentificacion === '' || numeroIdentificacion.length === 0) {
      texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Ingrese un numero de identificación</span   >';
      document.getElementById('errorNumeroIdentificacion1').innerHTML = texto;
      return false;
    } else if (!expresion.test(numeroIdentificacion)) {
      texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Solo se permite numeros</span>';
      document.getElementById('errorNumeroIdentificacion1').innerHTML = texto;
      return false;
    } else if (numeroIdentificacion.length < 3) {
      texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">El numero de identidad tiene que ser mayor a 6 caracteres numericos</span>';
      document.getElementById('errorNumeroIdentificacion1').innerHTML = texto;
      return false;
    } else if (numeroIdentificacion.length > 11) {
      texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">El numero de identidad tiene que ser menor a 11 carcateres numericos</span>';
      document.getElementById('errorNumeroIdentificacion1').innerHTML = texto;
      return false;    
    }else{
      document.getElementById('errorNumeroIdentificacion1').innerHTML = '';
      return true;
    } 
  }
  
  validarCiudad1 = () => {
    let ciudad = document.getElementById('ciudad1').value;
    let texto;
    let expresion = /[a-zA-Z]/;
  
    if (ciudad === null || ciudad === '' || ciudad.length === 0) {
     
      texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Ingrese una ciudad</span>';
      document.getElementById('errorCiudad1').innerHTML = texto;
      return false;
    } else if (ciudad.length < 3) {
      texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">El nombre de la ciudad debe de ser mayor a 3 letras</span>';
      document.getElementById('errorCiudad1').innerHTML = texto;
      return false;
    } else if (!expresion.test(ciudad)) {
      texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Solo se permiten letras</span>';
      document.getElementById('errorCiudad1').innerHTML = texto;
      return false;
    } else {
      document.getElementById('errorCiudad1').innerHTML = '';
      return true;
    }
  };
  
  
  validarTelefono1 = () => {
    let telefono = document.getElementById('telefono1').value.trim();
    let texto;
    let expresion = /^[0-9]+$/;
  
    if (!telefono) {
        texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Ingrese un número de teléfono.</span>';
        document.getElementById('errorTelefono1').innerHTML = texto;
        return false;
    } else if (telefono.length < 10) {
        texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Su número de teléfono debe tener al menos 10 dígitos.</span>';
        document.getElementById('errorTelefono1').innerHTML = texto;
        return false;
    } else if (!expresion.test(telefono)) {
        texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Ingrese solo números en su número de teléfono.</span>';
        document.getElementById('errorTelefono1').innerHTML = texto;
        return false;
    }else{
      document.getElementById('errorTelefono1').innerHTML = '';
      return true;
    }
  };
  
  validarCorreo1 = () => {
    let correo = document.getElementById('correo1').value.trim();
    let texto;
    let expresion = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;3
  
    if (!correo) {      
        texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Ingrese una dirección de correo electrónico.</span>';
        document.getElementById('errorCorreo1').innerHTML = texto;
        return false;
    } else if (!expresion.test(correo)) {
        texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Ingrese una dirección de correo electrónico válida.</span>';
        document.getElementById('errorCorreo1').innerHTML = texto;
        return false;
    }else {
      document.getElementById('errorCorreo1').innerHTML = '';
      return true;
    }
  }
  
  validarDireccion1 = () => {
    let direccion = document.getElementById('direccion1').value.trim();
    let texto;
    let expresion = /^[a-zA-Z0-9\s'#,-]*$/;
  
    if (!direccion) {
        texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Ingrese una dirección de residencia.</span>';
        document.getElementById('errorDireccion1').innerHTML = texto;
        return false;
    } else if (direccion.length < 5) {
        texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">La dirección de residencia debe tener al menos 5 caracteres.</span>';
        document.getElementById('errorDireccion1').innerHTML = texto;
        return false;
    } else if (!expresion.test(direccion)) {
        texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Ingrese una dirección de residencia válida.</span>';
        document.getElementById('errorDireccion1').innerHTML = texto;
        return false;
    }else{
      document.getElementById('errorDireccion1').innerHTML = '';
      return true;
    } 
  };


const ActualizarRegistro = async() =>{
  const validarNombreComercialRespuesta = validarNombreComercial ();
    const validarRazonSocialRespuesta = validarRazonSocial ();
    const validarContactoRespuesta = validarContacto ();
    const validarNumeroIdentificacionRespuesta = validarNumeroIdentificacion ();
    const validarCiudadRespuesta = validarCiudad ();
    const validarDireccionRespuesta = validarDireccion ();
    const validarTelefonoRespuesta = validarTelefono ();
    const validarCorreoRespuesta = validarCorreo ();

    if (validarNumeroIdentificacionRespuesta && validarRazonSocialRespuesta && validarNombreComercialRespuesta && validarCiudadRespuesta && validarDireccionRespuesta && validarTelefonoRespuesta && validarCorreoRespuesta && validarContactoRespuesta){
        let _tipoProveedor = document.getElementById('tipoProveedor').value
        let _tipoIdentificacion = document.getElementById('tipoIdentificacion').value  
        let _numeroIdentificacion = document.getElementById('numeroIdentificacion').value  
        let _razonSocial = document.getElementById('razonSocial').value   
        let _nombreComercial = document.getElementById('nombreComercial').value
        let _ciudad = document.getElementById('ciudad').value
        let _direccion = document.getElementById('direccion').value
        let _contacto = document.getElementById('contacto').value
        let _telefono = document.getElementById('telefono').value
        let _correo = document.getElementById('correo').value
        let _estado = document.getElementById('estado').value

        let proveedor = {
            tipoProveedor : _tipoProveedor,
            tipoIdentificacion : _tipoIdentificacion,
            numeroIdentificacion : _numeroIdentificacion,
            razonSocial : _razonSocial,
            nombreComercial : _nombreComercial,
            ciudad : _ciudad,
            direccion : _direccion,
            contacto : _contacto,
            telefono : _telefono,
            correo : _correo,
            estado : _estado
        }

        fetch(url,{
            method: 'PUT',
            mode : 'cors',
            body: JSON.stringify(proveedor),
            headers:{"Content-type": "application/json; charset=UTF-8"}
        })
        .then((resp)=> resp.json())
        .then(json => {
            Swal.fire({
                icon: 'success',
                title: 'El proveedor ha sido modificado exitosamente',
                showConfirmButton: false,
                timer: 1500
              });
            setTimeout(() =>{
                window.location.href = 'listarProveedor.html';
            },1000);  
        })
    }
}

validarNombreComercial = () => {
  let nombreComercial = document.getElementById('nombreComercial').value
  let texto;
  let expresion = /[a-zA-Z]/;

  if (nombreComercial === null || nombreComercial === '' || nombreComercial.length === 0) {
    texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Ingrese el nombre comercial de la empresa</span>';
    document.getElementById('errorNombreComercial').innerHTML = texto;
    return false;
  } else if (nombreComercial.length < 3) {
    texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">El nombre comercial debe de ser mayor o igual a 3 letras</span>';
    document.getElementById('errorNombreComercial').innerHTML = texto;
    return false;
  } else if (!expresion.test(nombreComercial)) {
    texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Solo se permiten letras</span>';
    document.getElementById('errorNombreComercial').innerHTML = texto;
    return false;
  } else {
    document.getElementById('errorNombreComercial').innerHTML = '';
    return true;
  }
};

validarRazonSocial = () => {
  let razonSocial = document.getElementById('razonSocial').value
  let texto;
  let expresion = /[a-zA-Z]/;

  if (razonSocial === null || razonSocial === '' || razonSocial.length === 0) {
    texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Ingrese la razon social de la empresa</span>';
    document.getElementById('errorRazonSocial').innerHTML = texto;
    return false;
  } else if (razonSocial.length < 3) {
    texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">la razon social debe de ser mayor o igual a 3 letras</span>';
    document.getElementById('errorRazonSocial').innerHTML = texto;
    return false;
  } else if (!expresion.test(razonSocial)) {
    texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Solo se permiten letras</span>';
    document.getElementById('errorRazonSocial').innerHTML = texto;
    return false;
  } else {
    document.getElementById('errorRazonSocial').innerHTML = '';
    return true;
  }
};

validarContacto = () => {
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

validarNumeroIdentificacion = () => {
  let numeroIdentificacion = document.getElementById('numeroIdentificacion').value;
  let texto;
  let expresion = /[0-9]/;

  if (numeroIdentificacion === null || numeroIdentificacion === '' || numeroIdentificacion.length === 0) {
    texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Ingrese un numero de identificación</span   >';
    document.getElementById('errorNumeroIdentificacion').innerHTML = texto;
    return false;
  } else if (!expresion.test(numeroIdentificacion)) {
    texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Solo se permite numeros</span>';
    document.getElementById('errorNumeroIdentificacion').innerHTML = texto;
    return false;
  } else if (numeroIdentificacion.length < 3) {
    texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">El numero de identidad tiene que ser mayor a 6 caracteres numericos</span>';
    document.getElementById('errorNumeroIdentificacion').innerHTML = texto;
    return false;
  } else if (numeroIdentificacion.length > 11) {
    texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">El numero de identidad tiene que ser menor a 11 carcateres numericos</span>';
    document.getElementById('errorNumeroIdentificacion').innerHTML = texto;
    return false;    
  }else{
    document.getElementById('errorNumeroIdentificacion').innerHTML = '';
    return true;
  } 
}

validarCiudad = () => {
  let ciudad = document.getElementById('ciudad').value;
  let texto;
  let expresion = /[a-zA-Z]/;

  if (ciudad === null || ciudad === '' || ciudad.length === 0) {
   
    texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Ingrese una ciudad</span>';
    document.getElementById('errorCiudad').innerHTML = texto;
    return false;
  } else if (ciudad.length < 3) {
    texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">El nombre de la ciudad debe de ser mayor a 3 letras</span>';
    document.getElementById('errorCiudad').innerHTML = texto;
    return false;
  } else if (!expresion.test(ciudad)) {
    texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Solo se permiten letras</span>';
    document.getElementById('errorCiudad').innerHTML = texto;
    return false;
  } else {
    document.getElementById('errorCiudad').innerHTML = '';
    return true;
  }
};


validarTelefono = () => {
  let telefono = document.getElementById('telefono').value.trim();
  let texto;
  let expresion = /^[0-9]+$/;

  if (!telefono) {
      texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Ingrese un número de teléfono.</span>';
      document.getElementById('errorTelefono').innerHTML = texto;
      return false;
  } else if (telefono.length < 10) {
      texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Su número de teléfono debe tener al menos 10 dígitos.</span>';
      document.getElementById('errorTelefono').innerHTML = texto;
      return false;
  } else if (!expresion.test(telefono)) {
      texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Ingrese solo números en su número de teléfono.</span>';
      document.getElementById('errorTelefono').innerHTML = texto;
      return false;
  }else{
    document.getElementById('errorTelefono').innerHTML = '';
    return true;
  }
};

validarCorreo = () => {
  let correo = document.getElementById('correo').value.trim();
  let texto;
  let expresion = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;3

  if (!correo) {      
      texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Ingrese una dirección de correo electrónico.</span>';
      document.getElementById('errorCorreo').innerHTML = texto;
      return false;
  } else if (!expresion.test(correo)) {
      texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Ingrese una dirección de correo electrónico válida.</span>';
      document.getElementById('errorCorreo').innerHTML = texto;
      return false;
  }else {
    document.getElementById('errorCorreo').innerHTML = '';
    return true;
  }
}

validarDireccion = () => {
  let direccion = document.getElementById('direccion').value.trim();
  let texto;
  let expresion = /^[a-zA-Z0-9\s'#,-]*$/;

  if (!direccion) {
      texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Ingrese una dirección de residencia.</span>';
      document.getElementById('errorDireccion').innerHTML = texto;
      return false;
  } else if (direccion.length < 5) {
      texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">La dirección de residencia debe tener al menos 5 caracteres.</span>';
      document.getElementById('errorDireccion').innerHTML = texto;
      return false;
  } else if (!expresion.test(direccion)) {
      texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Ingrese una dirección de residencia válida.</span>';
      document.getElementById('errorDireccion').innerHTML = texto;
      return false;
  }else{
    document.getElementById('errorDireccion').innerHTML = '';
    return true;
  } 
};

const editar = (proveedor) => {
    document.getElementById('tipoProveedor').value = proveedor.tipoProveedor;
    document.getElementById('tipoIdentificacion').value = proveedor.tipoIdentificacion;
    document.getElementById('numeroIdentificacion').value = proveedor.numeroIdentificacion;
    document.getElementById('razonSocial').value = proveedor.razonSocial;
    document.getElementById('nombreComercial').value = proveedor.nombreComercial;
    document.getElementById('ciudad').value = proveedor.ciudad;
    document.getElementById('direccion').value = proveedor.direccion;
    document.getElementById('contacto').value = proveedor.contacto;
    document.getElementById('telefono').value = proveedor.telefono;
    document.getElementById('correo').value = proveedor.correo;
    document.getElementById('estado').value = proveedor.estado;     
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
            let proveedor = {
                _id: id
            }
            fetch (url,{
                method: 'DELETE',
                mode: 'cors',
                body: JSON.stringify(proveedor),//Convertir el objeto _usuario a un JSON
                headers: {"Content-type": "application/json; charset=UTF-8"}
            }).then(() =>{
                Swal.fire(
                    'Eliminado!',
                    'El empleado ha sido eliminado.',
                    'success',
                    );
                setTimeout(() =>{
                    window.location.href = 'listarProveedor.html';
                },1000);  
            })
        }
      })
    }

if(document.querySelector('#btnRegistrar')){
      document.querySelector('#btnRegistrar')
      .addEventListener('click',registrar)
}

if(document.querySelector('#btnActualizar')){
      document.querySelector('#btnActualizar')
      .addEventListener('click',ActualizarRegistro)
}