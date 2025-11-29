// Función para manejar toda la lógica de la página
function initializeLoveCard() {
    // =========================================================================
    // 1. CONFIGURACIÓN:
    // Formato: 'YYYY-MM-DDT00:00:00'.
    // =========================================================================
    const startDateString = '2023-12-09T19:52:00';
    const startDate = new Date(startDateString);
    
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    const loveMessage = document.getElementById('loveMessage');
    const startDateText = document.getElementById('startDateText');

    // Muestra la fecha de inicio configurada
    const formattedDate = new Intl.DateTimeFormat('es-ES', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit' 
    }).format(startDate);
    startDateText.textContent = `: ${formattedDate}`;


    // =========================================================================
    // 2. FUNCIÓN DEL CONTADOR
    // =========================================================================
    function updateCountdown() {
        const now = new Date();
        const totalMilliseconds = now - startDate;

        // Si la fecha inicial es en el futuro, mostramos un mensaje diferente
        if (totalMilliseconds < 0) {
            daysEl.textContent = '0';
            hoursEl.textContent = '0';
            minutesEl.textContent = '0';
            secondsEl.textContent = '0';
            // Mensaje adaptado para el nuevo HTML
            const messageElement = loveMessage.querySelector('p');
            if(messageElement) {
                 messageElement.textContent = "¡Aún no llegamos a la fecha! Espera un poco más.";
            }
            return; 
        }

        // Cálculo de tiempo transcurrido
        const totalSeconds = Math.floor(totalMilliseconds / 1000);
        const totalMinutes = Math.floor(totalSeconds / 60);
        const totalHours = Math.floor(totalMinutes / 60);
        
        const days = Math.floor(totalHours / 24);
        
        // Tiempo restante del día, hora y minuto
        const hours = totalHours % 24;
        const minutes = totalMinutes % 60;
        const seconds = totalSeconds % 60;

        // Actualizar el DOM
        daysEl.textContent = days;
        hoursEl.textContent = hours.toString().padStart(2, '0');
        minutesEl.textContent = minutes.toString().padStart(2, '0');
        secondsEl.textContent = seconds.toString().padStart(2, '0');
    }

    // Inicia el contador y lo actualiza cada segundo
    updateCountdown();
    setInterval(updateCountdown, 1000);


    // =========================================================================
    // 3. FUNCIÓN DE ANIMACIÓN (MENSAJE)
    // =========================================================================
    setTimeout(() => {
        loveMessage.classList.remove('opacity-0');
        loveMessage.classList.add('opacity-100');
    }, 4500); // 4.5 segundos de retraso para el mensaje
}

// Se asegura de que todo el DOM esté cargado antes de inicializar
window.onload = initializeLoveCard;