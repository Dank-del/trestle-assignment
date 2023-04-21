export default async function handleImageFile(file: Blob, maxSize: number) {
    // Check if the file is an image
    if (!file.type.startsWith('image/')) {
        console.log('File is not an image.');
        return;
    }

    // Create a Promise to handle the file content
    return new Promise((resolve, reject) => {
        // Create a FileReader to read the file content
        const reader = new FileReader();

        // Set up the onload callback function to handle the file content
        reader.onload = (event) => {
            // Create a new image element
            const image = new Image();

            // Set up the onload callback function to handle the image loading
            image.onload = () => {
                // Get the original image width and height
                const width = image.width;
                const height = image.height;

                // Calculate the new width and height based on the maximum size
                let newWidth = width;
                let newHeight = height;
                if (maxSize && (width > maxSize || height > maxSize)) {
                    if (width > height) {
                        newWidth = maxSize;
                        newHeight = Math.round(height * (maxSize / width));
                    } else {
                        newHeight = maxSize;
                        newWidth = Math.round(width * (maxSize / height));
                    }
                }

                // Create a new canvas element to hold the compressed image
                const canvas = document.createElement('canvas');
                canvas.width = newWidth;
                canvas.height = newHeight;

                // Draw the compressed image on the canvas
                const context = canvas.getContext('2d');
                context?.drawImage(image, 0, 0, newWidth, newHeight);

                // Convert the canvas to a base64 string
                const base64 = canvas.toDataURL('image/jpeg');

                // Resolve the Promise with the base64 URL
                resolve(base64);
            };

            // Set the image source to the file content
            image.src = String(event.target?.result);
        };

        // Set up the onerror callback function to handle any file read errors
        reader.onerror = (event) => {
            reject(event.target?.error);
        };

        // Read the file content as a data URL
        reader.readAsDataURL(file);
    });
}