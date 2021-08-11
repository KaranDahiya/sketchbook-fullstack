async function submitLogin() {
    console.log("submittedLogin");

    // read from DOM form
    const emailInput = document.getElementById('emailInput').value;
    const passwordInput = document.getElementById('passwordInput').value;

    // send login attempt to backend
    const data = { emailInput, passwordInput };
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    const response = await fetch('/login', options);
    const responseText = await response.text();
    const failure = responseText.toLowerCase().includes('fail');
    console.log(responseText);

    // display failure or redirect to upload
    const resultText = document.getElementById('loginResult');
    if (failure) {
        resultText.textContent = "failure";
        resultText.style.color = "red";
        resultText.style.visibility = "visible";
    } else {
        window.location.href = "upload.html";   
    }
}