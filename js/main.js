document.querySelector("#clickMe").addEventListener('click', callAPI);

async function callAPI() {    
    await fetch("/api")
            .then(response => response.json())
            .then(data => {
                //console.log(data);
                document.querySelector("#status").textContent = data.status;
            })
            .catch(err => {
                console.log(err);
            })
}