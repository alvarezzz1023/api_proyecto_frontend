//al desplegar en el servidor colocar la base de datos del servidor 
const url = 'https://api-proyecto-backend.onrender.com/api/usuario'

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
        let listaUsuarios = data.usuarios
        return listaUsuarios.map(function(usuario){
            respuesta+=`<tr><td>${usuario._id}</td>`+
            `<td>${usuario.nombre}</td>`+
            `<td>${usuario.numeroIdentificacion}</td>`+
            `<td>${usuario.correo}</td>`+
            `<td>${usuario.estado}</td>`+
            `<td><button type="button" class="btn btn-primary"  data-bs-toggle="modal"  data-bs-target="#exampleModal" onclick='editar(${JSON.stringify(usuario)})'>Editar</button></td>
            <td><a href='#'  class="btn btn-danger" onclick='eliminar(${JSON.stringify(usuario)})' type="button">Eliminar</a></td></tr>`
            body.innerHTML = respuesta
        })
    })
    body.innerHTML= respuesta
}


    const registrar = async() =>{
        const validarNombresRespuesta1 = validarNombres1 ();
        const validarCedulaRespuesta1 = validarCedula1();
        const validarCorreoRespuesta1 = validarCorreo1 ();


        if(validarNombresRespuesta1 && validarCedulaRespuesta1 && validarCorreoRespuesta1){

        let _cedula = document.getElementById('_cedula').value 
        let _nombre = document.getElementById('_nombre').value 
        let _correo = document.getElementById('_correo').value 
        let _estado = document.getElementById('_estado').value 


            let usuario = {
                numeroIdentificacion : _cedula,
                nombre : _nombre,
                correo: _correo,
                estado : _estado
            }
            fetch(url,{
                method: 'POST',
                mode : 'cors',
                body: JSON.stringify(usuario),
                headers:{"Content-type": "application/json; charset=UTF-8"}
            })
            .then((resp)=> resp.json())
            .then(json => {
                Swal.fire({
                    icon: 'success',
                    title: 'El usuario ha sido creado exitosamente',
                    showConfirmButton: false,
                    timer: 1500
                  });
                setTimeout(() =>{
                    window.location.href = 'listarUsuario.html';
                },1000);  
            })
        }      
    }

    validarNombres1 = () => {
        let nombre = document.getElementById('_nombre').value;
        let texto;
        let expresion = /[a-zA-Z]/;
      
        if (nombre === null || nombre === '' || nombre.length === 0) {
          texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Ingrese un nombre</span>';
          document.getElementById('_errorNombre').innerHTML = texto;
          return false;
        } else if (nombre.length < 3) {
          texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">El nombre debe de ser mayor o igual a 3 letras</span>';
          document.getElementById('_errorNombre').innerHTML = texto;
          return false;
        } else if (!expresion.test(nombre)) {
          texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Solo se permiten letras</span>';
          document.getElementById('_errorNombre').innerHTML = texto;
          return false;
        } else {
          document.getElementById('_errorNombre').innerHTML = '';
          return true;
        }
    };

      validarCedula1 = () => {
        let cedula = document.getElementById('_cedula').value;
        let texto;
        let expresion = /[0-9]/;
      
        if (cedula === null || cedula === '' || cedula.length === 0) {
          texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Ingrese su numero de identificación</span   >';
          document.getElementById('_errorCedula').innerHTML = texto;
          return false;
        } else if (!expresion.test(cedula)) {
          texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Solo se permite números</span>';
          document.getElementById('_errorCedula').innerHTML = texto;
          return false;
        } else if (cedula.length < 3) {
          texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Su cédula tiene que ser mayor a 3 dígitos</span>';
          document.getElementById('_errorCedula').innerHTML = texto;
          return false;
        } else if (cedula.length > 13) {
          texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Su cédula tiene que ser menor a 13 dígitos</span>';
          document.getElementById('_errorCedula').innerHTML = texto;
          return false;    
        }else{
          document.getElementById('_errorCedula').innerHTML = '';
          return true;
        } 
    };
    
    validarCorreo1 = () => {
        let correo = document.getElementById('_correo').value.trim();
        let texto;
        let expresion = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;3
      
        if (!correo) {      
            texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Por favor, ingrese el correo electrónico.</span>';
            document.getElementById('_errorCorreo').innerHTML = texto;
            return false;
        } else if (!expresion.test(correo)) {
            texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Ingrese una dirección de correo electrónico válida.</span>';
            document.getElementById('_errorCorreo').innerHTML = texto;
            return false;
        }else {
          document.getElementById('_errorCorreo').innerHTML = '';
          return true;
        }
    }
    



    const editar = (usuario) => {

        document.getElementById('cedula').value = usuario.numeroIdentificacion;
        document.getElementById('nombre').value = usuario.nombre;
        document.getElementById('correo').value = usuario.correo;
        document.getElementById('estado').value = usuario.estado;  

    }

    const ActualizarRegistro = async() =>{

      const validarNombresRespuesta = validarNombres ();
      const validarCedulaRespuesta = validarCedula();
      const validarCorreoRespuesta = validarCorreo();


      if(validarNombresRespuesta && validarCedulaRespuesta && validarCorreoRespuesta){

      let _cedula = document.getElementById('cedula').value 
      let _nombre = document.getElementById('nombre').value 
      let _correo = document.getElementById('correo').value 
      let _estado = document.getElementById('estado').value 

      let usuario = {
        numeroIdentificacion : _cedula,
        nombre : _nombre,
        correo: _correo,
        estado : _estado
    
        }
        console.log(usuario)
        fetch(url,{
            method: 'PUT',
            mode : 'cors',
            body: JSON.stringify(usuario),
            headers:{"Content-type": "application/json; charset=UTF-8"}
        })
        .then((resp)=> resp.json())
        .then(json => {
            // Swal.fire({
            //     icon: 'info',
            //     title: 'El Empleado ha sido modificado exitosamente',
            //     showConfirmButton: false,
            //     timer: 1500
            //   });
            // setTimeout(() =>{
            //     window.location.href = 'listarUsuario.html';
            // },1000);
        })
        }}
    


     validarNombres = () => {
        let nombre = document.getElementById('nombre').value;
        let texto;
        let expresion = /[a-zA-Z]/;
      
        if (nombre === null || nombre === '' || nombre.length === 0) {
          texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Ingrese un nombre</span>';
          document.getElementById('errorNombre').innerHTML = texto;
          return false;
        } else if (nombre.length < 3) {
          texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">El nombre debe de ser mayor o igual a 3 letras</span>';
          document.getElementById('errorNombre').innerHTML = texto;
          return false;
        } else if (!expresion.test(nombre)) {
          texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Solo se permiten letras</span>';
          document.getElementById('errorNombre').innerHTML = texto;
          return false;
        } else {
          document.getElementById('errorNombre').innerHTML = '';
          return true;
        }
    };

      validarCedula = () => {
        let cedula = document.getElementById('cedula').value;
        let texto;
        let expresion = /[0-9]/;
      
        if (cedula === null || cedula === '' || cedula.length === 0) {
          texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Ingrese su numero de identificación</span   >';
          document.getElementById('errorCedula').innerHTML = texto;
          return false;
        } else if (!expresion.test(cedula)) {
          texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Solo se permite números</span>';
          document.getElementById('errorCedula').innerHTML = texto;
          return false;
        } else if (cedula.length < 3) {
          texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Su cédula tiene que ser mayor a 3 dígitos</span>';
          document.getElementById('errorCedula').innerHTML = texto;
          return false;
        } else if (cedula.length > 13) {
          texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Su cédula tiene que ser menor a 13 dígitos</span>';
          document.getElementById('errorCedula').innerHTML = texto;
          return false;    
        }else{
          document.getElementById('errorCedula').innerHTML = '';
          return true;
        } 
    };
    
    validarCorreo = () => {
        let correo = document.getElementById('correo').value.trim();
        let texto;
        let expresion = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;3
      
        if (!correo) {      
            texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Por favor, ingrese el correo electrónico.</span>';
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
                let usuario = {
                    _id: id
                }
                fetch (url,{
                    method: 'DELETE',
                    mode: 'cors',
                    body: JSON.stringify(usuario),//Convertir el objeto _usuario a un JSON
                    headers: {"Content-type": "application/json; charset=UTF-8"}
                }).then(() =>{
                    Swal.fire(
                        'Eliminado!',
                        'El usuario ha sido eliminado.',
                        'success',
                        );
                    setTimeout(() =>{
                        window.location.href = 'listarUsuario.html';
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

   