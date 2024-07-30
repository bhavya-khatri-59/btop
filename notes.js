
console.log("notes.js is running");

let intervalId; // Variable to hold the interval ID
let injected = false; // Flag to track if the button has been injected

// Function to inject the button and set up event listener
function injectButton() {
    let target = document.getElementById('getSyllabusDownload');
    
    if (target && !injected) {
        let downloadButton = document.createElement('button');
        downloadButton.id = 'downloadButton';
        downloadButton.className = 'dbutton';
        downloadButton.textContent = 'Download All Notes Labelled';
        downloadButton.type = 'button';
        target.appendChild(downloadButton);

        downloadButton.addEventListener('click', function() {
            // Select all download links. Adjust the selector if necessary.
            const downloadLinks = document.querySelectorAll('a[href^="javascript:vtopDownload"]');
            
            downloadLinks.forEach((link, index) => {
                const href = link.getAttribute('href');
                const fileName = `note_${index + 1}.pdf`; // Example: note_1.pdf, note_2.pdf, etc.
        
                // Create a temporary anchor element
                const tempLink = document.createElement('a');
                tempLink.href = href;
                tempLink.setAttribute('download', fileName);
                tempLink.style.display = 'none'; // Hide the link
                document.body.appendChild(tempLink); // Append the link to the body
                tempLink.click(); // Simulate click on the link
        
                document.body.removeChild(tempLink); // Clean up after download
            });
        });

        injected = true; // Set injected flag to true once button is injected
    } else if (!target && injected) {
        injected = false; // Reset injected flag if target disappears
    }
}

// Initial call to injectButton
injectButton();

// Set interval to periodically check for the target
intervalId = setInterval(injectButton, 1000); // Adjust the interval as needed (e.g., every 1000 ms)
