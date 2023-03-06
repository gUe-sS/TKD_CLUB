fetch('https://example.com')
    .then(response => response.text())
    .then(html => {
        // create a new DOM element from the HTML content
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        // find all the image tags in the DOM element
        const imageTags = doc.querySelectorAll('img');

        // loop through each image tag and upload the image to the database
        imageTags.forEach(imageTag => {
            const imageUrl = imageTag.src;
            fetch(imageUrl)
                .then(response => response.blob())
                .then(imageData => {
                    // upload the image to the database
                    fetch('/upload-image', {
                        method: 'POST',
                        body: imageData
                    });
                });

            // remove the image from the frontend
            imageTag.remove();
        });
    });