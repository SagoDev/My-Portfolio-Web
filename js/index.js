(function initialize() {
    emailjs.init("W1mLK6cGYp70QEbh_");

    const form = document.querySelector('form');
    const email = document.getElementById('email');
    const subject = document.getElementById('subject');
    const mess = document.getElementById('message');
    const errorTxtEmail = document.getElementById('email-label');


    function sendEmail() {
        const templateParams = {
            email: email.value,
            subject: subject.value,
            message: mess.value
        };

        emailjs.send("Portofolio_e8yfabj", "Portfolio_x0zjxvx", templateParams)
            .then(response => {
                Swal.fire({
                    title: "¡Listo!",
                    text: "Mensaje enviado con éxito",
                    icon: "success"
                });
                form.reset();
            })
            .catch(error => {
                Swal.fire({
                    title: "Error",
                    text: "No se pudo enviar el mensaje. Intenta nuevamente.",
                    icon: "error"
                });
                console.error("Error:", error);
            });
    }

    function checkInputs() {
        const inputs = document.querySelectorAll('.item');

        inputs.forEach(input => {
            if (input.value.trim() === "") {
                input.classList.add("error");
                input.parentElement.classList.add("error");
            }

            input.addEventListener('keyup', (event) => {
                if (event.target.value.trim() !== "") {
                    event.target.classList.remove("error");
                    event.target.parentElement.classList.remove("error");
                } else {
                    event.target.classList.add("error");
                    event.target.parentElement.classList.add("error");
                }
            });
        });
    }

    function checkEmail() {
        const emailRegEx = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;

        if (!email.value.match(emailRegEx)) {
            email.classList.add("error");
            email.parentElement.classList.add("error");
            errorTxtEmail.innerText = email.value !== "" ? "Ingresa un email válido." : "Email en blanco.";
        } else {
            email.classList.remove("error");
            email.parentElement.classList.remove("error");
            errorTxtEmail.innerText = "";
        }
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        checkInputs();
        checkEmail();

        if (!document.querySelector('.error')) {
            sendEmail();
        }
    });
})();
