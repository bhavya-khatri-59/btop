

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
            const downloadLinks = document.querySelectorAll('a[href^="javascript:vtopDownload"]');
            
            downloadLinks.forEach((link, index) => {
                const href = link.getAttribute('href');
                const fileName = `note_${index + 1}.pdf`; // Example: note_1.pdf, note_2.pdf, etc.

                if (href && href.startsWith('javascript:vtopDownload')) {
                    const args = href.match(/vtopDownload\(([^)]+)\)/)[1];
                    console.log(args);
                    durl = "https://vtop.vit.ac.in/vtop/"+args;
                    browser.runtime.sendMessage({
                        action: 'download',
                        url: durl,
                        name: fileName
                    });

                    injectDownloadScript(args, fileName);
                }
            });
        });

        injected = true; // Set injected flag to true once button is injected
    } else if (!target && injected) {
        injected = false; // Reset injected flag if target disappears
    }
}

// Function to inject the download script
function injectDownloadScript(args, fileName) {
    const scriptContent = `
    // contentScript.js
        (function() {
            const originalVtopDownload = window.vtopDownload;
            window.vtopDownload = function(...args) {
                console.log("vtopDownload called with arguments:", args);
                
                // Attempt to extract information or inject functionality here
                
                // Call the original function
                return originalVtopDownload.apply(this, args);
            };
        })();

        (function() {
            //console.log("injected script is running dw lmao");
            const result = vtopDownload(${args});
            //console.log(result);
            if (result) {
                window.postMessage({ action: 'download', url: result, name: '${fileName}' }, '*');
            }
        })();
    `;
    const script = document.createElement('script');
    script.textContent = scriptContent;
    (document.head || document.documentElement).appendChild(script);
    //script.remove();
}

// Listen for messages from the page context
window.addEventListener('message', function(event) {
    if (event.source !== window) return;
    if (event.data.action === 'download') {
        console.log("window message received by notes.js")
        browser.runtime.sendMessage({
            action: 'download',
            url: event.data.url,
            name: event.data.name
        });
    }
}, false);

// Initial call to injectButton
injectButton();

// Set interval to periodically check for the target
intervalId = setInterval(injectButton, 1000); // Adjust the interval as needed (e.g., every 1000 ms)


