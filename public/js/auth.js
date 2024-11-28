document.addEventListener('DOMContentLoaded', function () { 
    const form = document.getElementById('form')
    const errormessage = document.getElementById('error-message')
    
    const urlParams = new URLSearchParams(window.location.search); 
    const error = urlParams.get('error'); 
    
    if (error) { 
        errormessage.textContent = error; 
    }
    
    form.addEventListener('submit', (event) => { 
        event.preventDefault();
        console.log("submit")
        const code = document.getElementById('code').value; 
        if(code.length==8){
            window.location.href = `/auth/${code}`;
        }
        else{
            errormessage.textContent = "Invalid Code"; 
        }
    });
})