document.addEventListener("DOMContentLoaded", function() {
  setTimeout(function() {
    document.getElementById('loader-wrapper').style.display = 'none';
  }, 4000);
});

document.addEventListener("DOMContentLoaded", function() {
  // Obtener el contenido del cuerpo
  const bodyContent = document.body.innerHTML;
  // Reemplazar la palabra "COMPUCERMA" con la misma palabra envuelta en una etiqueta <span>
  const highlightedContent = bodyContent.replace(/COMPUCERMA/g, '<span class="highlight">COMPUCERMA</span>');
  // Actualizar el contenido del cuerpo con la palabra resaltada
  document.body.innerHTML = highlightedContent;
});

document.addEventListener("DOMContentLoaded", function() {
    const likeYesBtn = document.getElementById('like-yes');
    const likeNoBtn = document.getElementById('like-no');
    const likeWidget = document.getElementById('like-widget');

    // Recuperar el recuento de likes de la cookie si existe
    let count = parseInt(getCookie('likeCount')) || 0;

    // Ocultar el widget si ya se ha votado
    if (getCookie('voted') === 'true') {
        likeWidget.style.display = 'none';
    }

    // Botón "¡Sí!"
    likeYesBtn.addEventListener('click', function() {
        count++;
        likeWidget.style.display = 'none';
        setCookie('likeCount', count, 365 * 24); // Guardar el recuento de likes en una cookie que expira en 1 año
        setCookie('voted', 'true', 365 * 24); // Marcar que se ha votado
    });

    // Botón "No, debe mejorar"
    likeNoBtn.addEventListener('click', function() {
        likeWidget.style.display = 'none';
        setCookie('voted', 'true', 365 * 24); // Marcar que se ha votado
    });
});

// Función para establecer una cookie
function setCookie(name, value, hours) {
    let expires = "";
    if (hours) {
        let date = new Date();
        date.setTime(date.getTime() + (hours * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

// Función para recuperar el valor de una cookie
function getCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}


document.addEventListener('DOMContentLoaded', function () {
    const imgWrappers = document.querySelectorAll('.img-wrapper');
    const overlay = document.querySelector('.overlay');

    imgWrappers.forEach(wrapper => {
        const img = wrapper.querySelector('img');
        const uploadDate = wrapper.getAttribute('data-date');
        const daysAgo = getDaysAgo(uploadDate);
        const loadingOverlay = wrapper.querySelector('.loading-overlay');

        img.addEventListener('load', function () {
            loadingOverlay.style.display = 'none';
        });

        img.addEventListener('error', function () {
            loadingOverlay.textContent = 'Error al cargar la imagen';
        });

        wrapper.addEventListener('mouseover', function () {
            const dateOverlay = document.createElement('div');
            dateOverlay.classList.add('date-overlay');
            dateOverlay.textContent = `${daysAgo} días atrás`;
            this.appendChild(dateOverlay);
        });

        wrapper.addEventListener('mouseout', function () {
            const dateOverlay = this.querySelector('.date-overlay');
            if (dateOverlay) {
                this.removeChild(dateOverlay);
            }
        });

        wrapper.addEventListener('click', function () {
            const imgSrc = img.src;
            const imgTag = overlay.querySelector('img');
            imgTag.src = imgSrc;
            overlay.style.display = 'block';
        });
    });

    overlay.addEventListener('click', function (event) {
        if (event.target === this || event.target.classList.contains('close')) {
            this.style.display = 'none';
        }
    });

    function getDaysAgo(dateString) {
        const uploadDate = new Date(dateString);
        const currentDate = new Date();
        const difference = Math.floor((currentDate - uploadDate) / (1000 * 60 * 60 * 24)); // Diferencia en días
        return difference;
    }
});

