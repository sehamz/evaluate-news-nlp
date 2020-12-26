import { checkURL } from './URLChecker'

////// handleSubmit function (invoked when the user click on submit button)//////
function handleSubmit(event) {
    event.preventDefault()
        /// store the value of the input that is entered by the user in forText variable
    const formText = document.getElementById('name').value;

    /// check if the input matches the URL pattern or not
    // if the input matches the URL, the postData function will be invoked
    if (Client.checkURL(formText)) {
        console.log("::: Form Submitted :::")
        postData('http://localhost:8080/data', { url: formText })
            .then(function(res) {
                console.log(res);
                /// send the response obtained from the server to the updateUserInterface function
                updateUserInterface(res);
            })
    } else { // if the input does not match the URL pattern, the user will be asked to enter again        
        alert("You entered an invalid URL. \n Try Again!");
    }
}

//// postData function //////
// const postData = async(url = '', data = {}) => {
//     const request = await fetch(url, {
//         method: 'POST',
//         mode: 'cors',
//         credentials: 'same-origin',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data)
//     });
//     console.log("Data: ");
//     try {
//         const newData = await request.json();
//         return newData;
//     } catch (error) {
//         console.log("Error in postData: ", error)
//     }
// }

async function postData(url = '', data = {}) {
    const request = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    console.log("Data: ");
    try {
        const newData = await request.json();
        return newData;
    } catch (error) {
        console.log("Error in postData: ", error)
    }
}

////// updateUserInterface function //////
function updateUserInterface(res) {
    document.getElementById('agreement').innerHTML = "Agreement: " + res.agreement;
    document.getElementById('subjectivity').innerHTML = "Subjectivity: " + res.subjectivity;
    document.getElementById('confidence').innerHTML = "Confidence:" + res.confidence;
}

export { handleSubmit, updateUserInterface, postData }