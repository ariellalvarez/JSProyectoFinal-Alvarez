
const inputCuotas = document.querySelector("#cuotas")
const inputMonto = document.querySelector("#monto")
const inputInteres = document.querySelector("#interes")
const botonCalcular = document.querySelector("#calcular")
const divResultado = document.querySelector("#resultado")
const botonCalcularMenorCuota = document.querySelector("#calcularMenorCuota")
const divJSONCuota = document.querySelector("#JSONCuota")

let cuotas = null
let monto = null
let interes = null
let cuota = null

const url_base = 'https://pokeapi.co/api/v2/'
const endpoint = 'pokemon?limit=20'
const divPoke = document.querySelector("#poke")

const botonVerHistorial = document.querySelector("#verHistorial")
const divHistorial = document.querySelector("#historial")
const botonBorrarHistorial = document.querySelector("#borrarHistorial")
const divBorrar = document.querySelector("#borrar")



/*
const button = document.querySelector("#toasty")

button.addEventListener('click', ()=>{
    Swal.fire("SweetAlert2 is working!")
})


*/



inputMonto.addEventListener("input", (event) => {
    monto = parseInt(event.target.value)
    console.log(monto)

    if (isNaN(monto)) {
        console.log("No se escribio un numero. Este campo solo acepta numeros. Por favor, vuelva a escribirlo.")
        Toastify({
            text: "No se escribió un número. Por favor, borrélo y vuelva a escribirlo.",
            duration: 3000,
            destination: "https://github.com/apvarun/toastify-js",
            newWindow: true,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)",
            },
            onClick: function () { } // Callback after click
        }).showToast()
    }



})



inputCuotas.addEventListener("input", (event) => {
    cuotas = parseInt(event.target.value)
    console.log(cuotas)
    if (isNaN(cuotas)) {
        console.log("No se escribio un numero. Este campo solo acepta numeros. Por favor, vuelva a escribirlo.")
        Toastify({
            text: "No se escribió un número. Por favor, borrélo y vuelva a escribirlo.",
            duration: 3000,
            destination: "https://github.com/apvarun/toastify-js",
            newWindow: true,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)",
            },
            onClick: function () { } // Callback after click
        }).showToast()
    }

})


inputInteres.addEventListener("input", (event) => {
    interes = parseInt(event.target.value)
    console.log(interes)
    if (isNaN(interes)) {
        console.log("No se escribio un numero. Este campo solo acepta numeros. Por favor, vuelva a escribirlo.")
        Toastify({
            text: "No se escribió un número. Por favor, borrélo y vuelva a escribirlo.",
            duration: 3000,
            destination: "https://github.com/apvarun/toastify-js",
            newWindow: true,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)",
            },
            onClick: function () { } // Callback after click
        }).showToast()
    }
})

let id = 0

botonCalcular.addEventListener("click", () => {
    cuota = monto * (1 + interes / 100) / cuotas
    console.log(cuota)
    divResultado.innerHTML = `<h2>
    <br>
    Son ${cuotas} cuotas de ${cuota} pesos
    <br>
    El monto total con interes a pagar es ${cuota * cuotas} pesos

    <br>
    </h2>`


    id = id + 1
    let jsonCuota = {
        "monto": monto,
        "cuotas": cuotas,
        "interes": interes,
        "cuota": cuota
    }

    let jsonString = JSON.stringify(jsonCuota)
    localStorage.setItem(id, jsonString)
    let parse = JSON.parse(localStorage.getItem(id))
    console.log(parse)
    console.log(id)

    fetch(url_base + endpoint, {
        method: 'GET',
    }).then((respuesta) => {
        console.log(respuesta)
        return respuesta.json()
    }).then((data) => {
        console.log(data.results)

        // divPoke.innerText = 'Tu cuota fue calculada por el pokemon: "' + data.results[id].name + '".'

        divPoke.innerHTML = `<h2>
            
            Tu cuota fue calculada por el pokemon: "${data.results[id].name}".
            <br>
            </h2>`

        /*const contenedor = document.querySelector("#contenedor")
    
       
    
            const div = document.createElement("div")
    
            const p = document.createElement("p")
    
            p.innerText = data.results[id].name
    
            div.appendChild(p)
    
            contenedor.appendChild(div)*/


    })

})

// for con id como contador, menor cuota


botonCalcularMenorCuota.addEventListener("click", () => {


    let calcMinObjeto = JSON.parse(localStorage.getItem(id))
    let calcMin1 = calcMinObjeto.cuota
    console.log(calcMinObjeto)
    console.log(calcMin1)


    for (var i = 0; i < id; i++) {

        let calcMin2 = JSON.parse(localStorage.getItem(i + 1))
        console.log(calcMin2)


        if (calcMin2.cuota < calcMin1) {
            calcMin1 = calcMin2.cuota
            calcMinObjeto = JSON.parse(localStorage.getItem(i + 1))
        }

    }

    let montoTotal = calcMinObjeto.cuotas * calcMinObjeto.cuota

    divJSONCuota.innerHTML = `<h2>
    
    La menor cuota es 
    ${calcMinObjeto.cuota} pesos
    <br>
    Monto: ${calcMinObjeto.monto}
    <br>
    Cuotas: ${calcMinObjeto.cuotas}
    <br>
    Interes: ${calcMinObjeto.interes}
    <br>
    El monto total con interes a pagar es ${montoTotal} pesos
 
    
    </h2>`


})


botonVerHistorial.addEventListener("click", () => {

    divHistorial.innerHTML =``

    for (var i = 0; i < id; i++) {

        let hist1 = JSON.parse(localStorage.getItem(i + 1))
        console.log(hist1)
        let montoTotal = hist1.cuotas * hist1.cuota
        const div = document.createElement("div")
        div.innerHTML = `<h2>
    
        Escenario #${i+1}
        <br>
        Monto: ${hist1.monto}
        <br>
        Cuotas: ${hist1.cuotas}
        <br>
        Interes: ${hist1.interes}
        <br>
        El monto total con interes a pagar es ${montoTotal} pesos
    
        </h2>`

        
        divHistorial.appendChild(div)

    }

    if(i==0){
        Swal.fire("Aún no has cargado ningún escenario!!!")
    }

})

botonBorrarHistorial.addEventListener("click", () => {

    localStorage.clear()

    Swal.fire("Has borrado el historial con éxito!!!")

})

/*



const url_base = 'https://pokeapi.co/api/v2/'
const endpoint = 'pokemon?limit=10'

fetch(url_base + endpoint, {
    method: 'GET',
}).then((respuesta)=>{
    console.log(respuesta)
    return respuesta.json()
}).then((data)=> {
    console.log(data.results)

    const contenedor = document.querySelector("#contenedor")

    data.results.forEach((pok)=>{

        const div = document.createElement("div")

        const p = document.createElement("p")

        p.innerText = pok.name

        

        

        fetch(pok.url)
            .then((respuesta)=>{
                return respuesta.json()
            })
            .then( data =>{
                console.log(data.sprites.other.dream_world.front_default)

                const img = document.createElement("img")
                img.src = data.sprites.other.dream_world.front_default
                img.width = 50
                div.appendChild(img)
                div.appendChild(p)

                contenedor.appendChild(div)
            })

    })
})

.catch(error => {
    console.log("Hubo un error en la api" + error)
})

*/


