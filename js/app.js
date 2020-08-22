//variables
const presupuestoUsuario = prompt('Cual es tu presupuesto semanal');
const formulario = document.querySelector('#agregar-gasto');
let cantidadPresupuesto;


//clases
class Presupuesto{
    constructor(presupuesto){
        this.presupuesto = Number(presupuesto);
        this.restante = Number(presupuesto);
    }

    restar(cantidad = 0){
        return this.restante - Number(cantidad);
    }
}

//clase que manejara el HTML
class Interfaz{

    insertarPresupuesto(cantidad){
        const total = document.querySelector('#total');
        const restante = document.querySelector('#restante');
    
        total.innerText = cantidad;
        restante.innerText = cantidad;
    }

    mostrarMensaje(mensaje, tipo){
        const  divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center' , 'alert');
        if(tipo === 'error'){
            divMensaje.classList.add('alert-danger');
        }
        else{
            divMensaje.classList.add('alert-success');
        }
        divMensaje.appendChild(document.createTextNode(mensaje));
        //insertar en el DOM
        document.querySelector('.primario').insertBefore(divMensaje,formulario);
        setTimeout(()=>{
            document.querySelector('.alert').remove();
            formulario.reset();
        },2000);    
    }

    insertarGastos(gasto, cantidad){
        const listaGastos = document.querySelector('#gastos ul');
        const itemGastos = document.createElement('li');
        itemGastos.className = 'list-group-item d-flex justify-content-between align-items-center';
        itemGastos.innerHTML = `
            ${gasto}
            <span class='badge badge-primary badge-pill'>$${cantidad}</span>
        `;
        listaGastos.appendChild(itemGastos);
    }

    restarGastos(cantidad){
        const restante = document.querySelector('#restante');
        cantidadPresupuesto.restante -= Number(cantidad);
        restante.innerHTML = `${cantidadPresupuesto.restante}`;
        this.comprobarPresupuesto();
    }
    
    comprobarPresupuesto(){
        const restante = document.querySelector('.restante');
        const presupuesto = cantidadPresupuesto.presupuesto;
        const presupuestoRestante = cantidadPresupuesto.restante;

        if((presupuesto / 4 )>presupuestoRestante){
            restante.classList.remove('alert-succes', 'alert-warning');
            restante.classList.add('alert-danger');
        }
        else if((presupuesto / 2) > presupuestoRestante){
            restante.classList.remove('alert-succes');
            restante.classList.add('alert-warning');
        }
    }
}


//eventListeners
document.addEventListener('DOMContentLoaded', function(){
    if(presupuestoUsuario === null || presupuestoUsuario === ''){
        window.location.reload();
    }else{
        cantidadPresupuesto = new Presupuesto(presupuestoUsuario);
        const ui = new Interfaz(); 
        ui.insertarPresupuesto(cantidadPresupuesto.presupuesto);
        
    }
});

formulario.addEventListener('submit',function(e){
    e.preventDefault();
    
    //Leer del formulario de gastos.
    const gasto = document.querySelector('#gasto').value;
    const cantidad = Number(document.querySelector('#cantidad').value);

    //instanciar la interfaz
    const ui = new Interfaz();
    if(gasto === '' || cantidad === ''){
        ui.mostrarMensaje('Favor de Llenar todos los campos','error');
    }
    else{
        //Insertar en el HTML
        ui.mostrarMensaje('Correcto','correcto');
        ui.insertarGastos(gasto,cantidad);
        ui.restarGastos(cantidad);
    }
});

