const buttom = document.getElementById('send');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');

function post(data) {
    var xhr = new XMLHttpRequest();
    var url = "https://formspree.io/f/mleowyeg";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var json = JSON.parse(xhr.responseText);
            //console.log(json);
        }
    };
    data = JSON.stringify(data);
    xhr.send(data);
}

function send() {
    const data = {
        name: nameInput.value,
        email: emailInput.value,
        message: messageInput.value
    }

    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    if (data.name.length < 2) {
        alert('Name must be bigger than 2 letters!');
        return;
    }

    if (!validateEmail(data.email)) {
        alert('Invalid email!');
        return;
    }

    if (data.message.length < 1) {
        alert('Message can\'t be empty!');
        return;
    }

    post(data);
    alert('Message sent!');
}