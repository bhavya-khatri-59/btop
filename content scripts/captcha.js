var script = document.createElement('script');
script.src = "https://cdn.jsdelivr.net/npm/tesseract.js@2/dist/tesseract.min.js";
document.head.appendChild(script);

// Function to load Tesseract.js dynamically
function loadTesseract() {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/tesseract.js@latest/dist/tesseract.min.js';
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Failed to load Tesseract.js'));
        document.head.appendChild(script);
    });
}

// Call the function to load Tesseract.js
loadTesseract().then(() => {
    console.log('Tesseract.js loaded');

    // Now you can use Tesseract.js functions here
    // Example OCR function
    function performOCR(base64Image) {
        if (typeof Tesseract === 'undefined') {
            console.error('Tesseract.js is not loaded on the page.');
            return;
        }
    
        Tesseract.recognize(
            base64Image,
            'eng',
            {
                logger: info => console.log(info) // Log progress
            }
        ).then(({ data: { text } }) => {
            console.log('Recognized text:', text);
            alert(text); // Display recognized text in an alert (or handle it as needed)
        }).catch(err => {
            console.error('OCR error:', err);
        });
    }
    block = document.getElementById('captchaBlock');
    if(block){
        img = block.querySelector('img');
        base64string = img.getAttribute('src');
        //console.log(base64string);
        performOCR(base64string);
    }

    // (You can add your existing logic for image observation here)
}).catch(err => {
    console.error(err);
});
  