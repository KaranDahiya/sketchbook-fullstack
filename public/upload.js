function previewFile() {
    const preview = document.getElementById('previewImg');
    const file = document.querySelector('input[type=file]').files[0];
    console.log('previewFile: file = ' + file);
    const reader = new FileReader();

    reader.addEventListener("load", () => {
        // convert image file to base64 string
        preview.src = reader.result;
        preview.style.visibility = 'visible';
    }, false);

    if (file) {
        reader.readAsDataURL(file);
    }
}

async function submitArtwork() {

    // read from DOM form
    const title = document.getElementById('titleInput').value;
    const category = document.getElementById('formControlSelect').value;
    const date = document.getElementById('dateInput').value;
    const imageURL = document.getElementById('previewImg').src;
    const resultText = document.getElementById('uploadResult');
    let failure = true;

    if (title.length == 0 || category.length == 0 || date.length == 0 || imageURL.length < 100) {
        failure = true;
        console.log('Invalid fields');
    } else {
        // send upload attempt to backend
        const data = { title, category, date, imageURL };
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };
        const response = await fetch('/upload', options);
        const responseText = await response.text();
        failure = responseText.toLowerCase().includes('fail');
        console.log(responseText);
    }

    // display failure or success
    if (failure) {
        resultText.textContent = "failure";
        resultText.style.color = "red";
    } else {
        resultText.textContent = "success";
        resultText.style.color = "green";
    }
    resultText.style.visibility = "visible";
}

// // upload all exsiting artwork to server
// let uploadAllArt = (function () {
//     let xhr = [];
//     for (let i = 6; i < artwork.length; i++) {
//         const title = artwork[i].title;
//         const category = artwork[i].subject;
//         const date = artwork[i].date;
//         const filepath = artwork[i].filepath;

//         // encode filepath to imageURL (currently resulting in undefined)
//         (function (i) {
//             xhr[i] = new XMLHttpRequest();
//             xhr[i].onload = function (e) {
//                 let reader = new FileReader();
//                 reader.onload = function () {
//                     const imageURL = reader.result;
//                     const data = { title, category, date, imageURL };
//                     const options = {
//                         method: 'POST',
//                         headers: {
//                             'Content-Type': 'application/json'
//                         },
//                         body: JSON.stringify(data)
//                     };
//                     const response = await fetch('/upload', options);
//                     const responseText = await response.text();
//                     const failure = responseText.toLowerCase().includes('fail');
                
//                     // display failure or success
//                     if (failure) {
//                         console.log('failure')
//                     } else {
//                         console.log('success')
//                     }
//                 }
//                 let file = this.response;
//                 reader.readAsDataURL(file)
//             };
//             xhr[i].open("GET", "/" + filepath);
//             xhr[i].responseType = "blob";
//             xhr[i].send()
//         })(i);
//     }
// })();