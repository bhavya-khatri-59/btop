/*browser.downloads.download({
    url: href,
    filename: fileName,
    conflictAction: "overwrite"
}).catch(err => console.error('Download failed:', err));*/

browser.runtime.onMessage.addListener((message) => {
    if (message.action === 'download') {
        /*fetch(message.url)
            .then(response => response.blob())
            .then(blob => {
                const objectUrl = URL.createObjectURL(blob);
                browser.downloads.download({
                    url: objectUrl,
                    filename: message.name,
                    conflictAction: 'overwrite'
                }).catch(err => console.error('Download failed:', err));
            })
            .catch(err => console.error('Fetching download URL failed:', err));*/
        browser.downloads.download({
        url: message.url,
        filename: message.name,
        conflictAction: "overwrite"
    }).catch(err => console.error('Download failed:', err));
    }
});

