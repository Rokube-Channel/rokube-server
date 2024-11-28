document.addEventListener('DOMContentLoaded', function () { 
    const images = document.querySelectorAll('#images img'); 
    const prev = document.getElementById('prev'); 
    const next = document.getElementById('next'); 
    const indicators = document.querySelectorAll('[data-index]'); 
    let currentImage = 0;
    let intervalId;
    
    function showImage(index) { 
        images.forEach((img, i) => { 
            indicators[i].classList.toggle('bg-white', i === index); 
            indicators[i].classList.toggle('bg-color-primary', i !== index);
            img.classList.toggle('block', i === index); 
            img.classList.toggle('hidden', i !== index); }
        ); 
        currentImage = index;
        resetInterval();
    } 
    
    function resetInterval() { 
        clearInterval(intervalId); 
        intervalId = setInterval(() => { 
            next.click(); 
        }, 5000); 
    }

    prev.addEventListener('click', () => { 
        showImage((currentImage > 0) ? currentImage - 1 : images.length - 1); 
    }); 
    
    next.addEventListener('click', () => { 
        showImage((currentImage < images.length - 1) ? currentImage + 1 : 0); 
    }); 
    
    indicators.forEach(indicator => { 
        indicator.addEventListener('click', () => { 
            showImage(parseInt(indicator.getAttribute('data-index')) - 1); 
        }); 
    });
    
    resetInterval();
});