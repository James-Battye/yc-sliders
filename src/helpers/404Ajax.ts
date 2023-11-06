// Retrieve a specific element from another page and append it to the current page
async function fetchAndAppendElement(): {
    try {
        // Fetch the other page's HTML
        const response = await fetch('/');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const html = await response.text();

        // Create a temporary container element to hold the fetched content
        const container = document.createElement('div');
        container.innerHTML = html;

        // Specify the selector for the element you want to fetch
        const fetchedElement = container.querySelector("[element-404='content']");

        if (fetchedElement) {
            const appendItem = document.querySelector("[element-404='wrapper']") as HTMLElement;
            // Clone the fetched element
            const clonedElement = fetchedElement.cloneNode(true) as HTMLElement;

            // Append the cloned element to the current page
            appendItem?.appendChild(clonedElement);
        } else {
            console.error('Failed to fetch the featured products.');
        }
    } catch (error) {
        console.error('An error occurred while fetching and appending the featured products:', error);
    }
}

// Call the fetchAndAppendElement function when the page has finished loading
window.addEventListener('DOMContentLoaded', fetchAndAppendElement);
