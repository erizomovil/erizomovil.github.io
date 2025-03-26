(function() {
    // Crear el contenedor del chat
    let chatbox = document.createElement("div");
    chatbox.innerHTML = `
        <div id="chat-container" style="position:fixed;bottom:20px;right:20px;width:300px;height:400px;background:white;border-radius:10px;box-shadow:0px 0px 10px gray;display:flex;flex-direction:column;display:none;">
            <div id="chat-messages" style="flex:1;overflow:auto;padding:10px;"></div>
            <input id="chat-input" type="text" placeholder="Escribe un mensaje..." style="border:none;padding:10px;width:calc(100% - 20px);">
        </div>
    `;
    document.body.appendChild(chatbox);

    // Crear el botón flotante
    let button = document.createElement("button");
    button.innerHTML = "💬 Chat";
    button.style.position = "fixed";
    button.style.bottom = "20px";
    button.style.right = "20px";
    button.style.padding = "10px 20px";
    button.style.borderRadius = "50px";
    button.style.background = "#007bff";
    button.style.color = "white";
    button.style.border = "none";
    button.style.cursor = "pointer";
    button.style.zIndex = "9999"; // Asegura que el botón esté siempre visible

    // Mostrar/ocultar el chat al hacer clic en el botón
    button.onclick = function() {
        chatbox.style.display = chatbox.style.display === "none" ? "block" : "none";
    };

    // Agregar el botón flotante al DOM
    document.body.appendChild(button);

    // Obtener el campo de entrada y los mensajes
    let input = document.getElementById("chat-input");
    let messages = document.getElementById("chat-messages");

    // Función para manejar el envío del mensaje
    input.addEventListener("keypress", async function(event) {
        if (event.key === "Enter") {
            let msg = input.value;
            messages.innerHTML += `<div><b>Tú:</b> ${msg}</div>`;
            input.value = "";

            // Enviar el mensaje al chatbot (ajustar la URL a tu API)
            let response = await fetch("https://chatbot-fvurss54c-erizomovils-projects.vercel.app", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: msg })
            });

            let data = await response.json();
            messages.innerHTML += `<div><b>Bot:</b> ${data.response}</div>`;
        }
    });
})();
