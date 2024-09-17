// ((24*7)+(365/2))/((12+7)-(3*90))
document.getElementById("submit").addEventListener("click", () => {
    const expresionIngresada = document.getElementById("expression").value;
    try {
        const arbolExpresion = analizarExpresion(expresionIngresada);
        renderizarArbol(arbolExpresion, document.getElementById("arbol"));
    } catch (error) {
        alert("Expresión inválida, por favor intenta de nuevo.");
    }
});

const analizarExpresion = (expresion) => {
    const operadores = ['+', '-', '*', '/'];

 
    const construirArbol = (expr) => {
        expr = expr.trim();
        let conteoParentesis = 0;
        let indiceOperador = -1;

        for (let i = 0; i < expr.length; i++) {
            if (expr[i] === '(') conteoParentesis++;
            if (expr[i] === ')') conteoParentesis--;
            if (conteoParentesis === 0 && operadores.includes(expr[i])) {
                indiceOperador = i;
                break;
            }
        }

        if (indiceOperador !== -1) {
            return {
                operador: expr[indiceOperador],
                izquierda: construirArbol(expr.slice(0, indiceOperador)),
                derecha: construirArbol(expr.slice(indiceOperador + 1))
            };
        }

        if (expr[0] === '(' && expr[expr.length - 1] === ')') {
            return construirArbol(expr.slice(1, -1));
        }

        return { valor: expr };
    };

    return construirArbol(expresion);
};

const renderizarArbol = (nodo, contenedor) => {
    contenedor.innerHTML = '';

    const crearElementoNodo = (contenido) => {
        const div = document.createElement('div');
        const sim = document.createElement('div');
        div.className = 'nodo';
        if (contenido == '+' || contenido == '-' || contenido == '*' || contenido == '/') {
            sim.textContent = contenido;
            sim.dataset.simbolo = 'sim';
            div.appendChild(sim);
        } else {
            div.dataset.numero = 'num';
            div.textContent = contenido;
        }
        return div;
    };

    const renderizarNodo = (nodo, elementoPadre) => {
        const elementoNodo = crearElementoNodo(nodo.valor || nodo.operador);

        if (nodo.izquierda || nodo.derecha) {
            const contenedorHijos = document.createElement('div');
            contenedorHijos.className = 'nodo-hijos';

            if (nodo.izquierda) {
                renderizarNodo(nodo.izquierda, contenedorHijos);
            }
            if (nodo.derecha) {
                renderizarNodo(nodo.derecha, contenedorHijos);
            }

            elementoNodo.appendChild(contenedorHijos);
        }

        elementoPadre.appendChild(elementoNodo);
    };

    renderizarNodo(nodo, contenedor);
};
