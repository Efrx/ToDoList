console.log('hola ❤');

const formmulario = document.getElementById('formulario')
const input = document.getElementById('input')
const listaTareas = document.getElementById('lista-tareas')
const template = document.getElementById('template').content
const fragment = document.createDocumentFragment()
let tareas = {
} /* coleccion de tareas */

// detecta cuando carga toda la pagina su html
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('tareas')) {
        tareas = JSON.parse(localStorage.getItem('tareas'))
    }
    pintarTareas() // pinta tareas que ya tenia
})

listaTareas.addEventListener('click', e => {
    btnAction(e)
})

formmulario.addEventListener('submit', e => {
    e.preventDefault()
    // console.log(e.target[0].value)
    // console.log(e.target.querySelector('input').value)
    console.log(input.value)

    setTarea(e)
})

const setTarea = e => {
    let textoIngresado = input.value.trim()
    // funcion trim elimina espacios vacios al inicio y final
    if(textoIngresado === '') {
        console.log('esta vacio')
        return // si esta vacio se detiene aqui
    }
    // si no esta vacio contunia hasta aca

    const tarea = {
        id: Date.now(), //fecha y hora no se repetira como ID
        texto: textoIngresado,
        estado: false
    }

    tareas[tarea.id] = tarea

    // limpiar campo de form 
    formmulario.reset()
    // focus nuevamente
    input.focus()

    pintarTareas()
}

const pintarTareas = () => {
    localStorage.setItem('tareas', JSON.stringify(tareas))
    // si no hay objetos en la coleccion
    if (Object.values(tareas).length === 0) { 
        listaTareas.innerHTML = `
            <div class="alert alert-dark">
                No hay tareas endientes 😍
            </div>
        `
        return
    }
    listaTareas.innerHTML = ''
    Object.values(tareas).forEach(tarea => {
        // console.log(tarea)
        const clone = template.cloneNode(true)
        clone.querySelector('p').textContent = tarea.texto

        if (tarea.estado) {
            clone.querySelector('.alert').classList.replace('alert-warning', 'alert-primary')
            clone.querySelectorAll('.fa-solid')[0].classList.replace('fa-circle-check', 'fa-rotate-left')
            clone.querySelector('p').style.textDecoration = 'line-through'
        } else {
            
        }

        clone.querySelectorAll('.fa-solid')[0].dataset.id = tarea.id
        clone.querySelectorAll('.fa-solid')[1].dataset.id = tarea.id
        fragment.appendChild(clone) 
    })
    listaTareas.appendChild(fragment)
}

const btnAction = (e) => {
    // console.log(e.target.classList.contains('fa-circle-check'))
    if(e.target.classList.contains('fa-circle-check')) {
        tareas[e.target.dataset.id].estado = true
        pintarTareas()
    }
    if(e.target.classList.contains('fa-circle-minus')) {
        delete tareas[e.target.dataset.id]
        pintarTareas()
    }
    if(e.target.classList.contains('fa-rotate-left')) {
        tareas[e.target.dataset.id].estado = false
        pintarTareas()
    }

    e.stopPropagation()
}

// <i class="fa-solid fa-rotate-left"></i>
// Object.values(todos).forEach((item) => console.log(item))