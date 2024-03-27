// admin.js
// Configura Firebase con tu configuración
  const firebaseConfig = {
    apiKey: "AIzaSyA6KYtMPHQ0gXnORz3TG0SfofdwQYJNa9w",
    authDomain: "compucerma-6cf0c.firebaseapp.com",
    projectId: "compucerma-6cf0c",
    storageBucket: "compucerma-6cf0c.appspot.com",
    messagingSenderId: "357636684473",
    appId: "1:357636684473:web:215782f4c72721713bb968",
    measurementId: "G-5TLQ3027L7"
  };


// Inicializa Firebase
firebase.initializeApp(firebaseConfig);

// Función para cargar la imagen en Firebase Storage
function uploadImage() {
    const file = document.getElementById('imageFile').files[0];
    const storageRef = firebase.storage().ref('trabajos/' + file.name);
    const uploadTask = storageRef.put(file);

    uploadTask.on('state_changed', 
        (snapshot) => {
            // Se puede mostrar un indicador de progreso aquí
        },
        (error) => {
            // Manejo de errores si la carga falla
            console.error('Error al cargar la imagen:', error);
        },
        () => {
            // Manejo del éxito de la carga
            console.log('Imagen cargada con éxito');
        }
    );
}
