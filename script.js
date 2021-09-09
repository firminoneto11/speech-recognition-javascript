
document.addEventListener("DOMContentLoaded", async () => {
    // Selecionando alguns elementos da interface
    const gravar = document.getElementById("gravar")
    const parar = document.getElementById("parar")

    // Marcando o botão parar desabilitado
    parar.setAttribute("disabled", "disabled")

    // Instanciando o objeto da classe SpeechRecognition
    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const reconhecimento = await new window.SpeechRecognition()

    // Adicionando o eventListener no botão "Gravar"
    gravar.addEventListener("click", async () => {
        // Reiniciando o status do botão e informando ao usuário que o microfone está gravando
        if (parar.disabled) {
            parar.removeAttribute("disabled")
        }
        gravar.innerHTML = "Gravando..."

        // Capturando o audio
        reconhecimento.start()

    })

    // Adicionando o eventListener no botão "Parar"
    parar.addEventListener("click", async () => {
        // Voltando ao status inicial
        gravar.innerHTML = "Gravar"
        if (!parar.disabled) {
            parar.setAttribute("disabled", "disabled")
        }

        await reconhecimento.stop()

    })

    reconhecimento.addEventListener('result', event => {
        const output = document.getElementById("textarea")

        // Cria um array com os valores do objeto 'event.results'
        let text = Array.from(event.results)

        // Mapeando cada elemento do array anterior para um novo array contendo apenas os elementos no indice 0
        text = text.map(result => result[0])

        // Mapeando cada elemento do array anterior para um novo array contento apenas os valores do atributo 'transcript'
        text = text.map(result => result.transcript)

        // Transformando o array resultante em uma string
        text = text.join("")

        // Inserindo a string final no elemento no html
        output.innerHTML = text
    })
})
