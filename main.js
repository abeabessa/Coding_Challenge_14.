main.js
const ticketsContainer = document.getElementById('tickets-container');
const errorMessageDiv = document.getElementById('error-message');

async function fetchTickets() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        if (!response.ok) throw new Error('Failed to fetch tickets');
        
        const tickets = await response.json();

        // If no tickets are found, throw a custom error
        if (tickets.length === 0) {
            throw new Error('No unresolved tickets available');
        }

        displayTickets(tickets);
    } catch (error) {
        displayError(error.message);
    } finally {
        // You can remove or hide loading indicators here if you have any
        console.log('Fetch operation completed');
    }
}
function displayTickets(tickets) {
    ticketsContainer.innerHTML = ''; // Clear any previous content

    tickets.forEach(ticket => {
        const ticketDiv = document.createElement('div');
        ticketDiv.classList.add('ticket');

        ticketDiv.innerHTML = `
            <h3>Ticket ID: ${ticket.id}</h3>
            <p><strong>Customer Name:</strong> User ${ticket.userId}</p>
            <p><strong>Issue Description:</strong> ${ticket.title}</p>
            <p><strong>Details:</strong> ${ticket.body}</p>
        `;
        
        ticketsContainer.appendChild(ticketDiv);
    });
}
function displayError(message) {
    errorMessageDiv.innerText = message;
    errorMessageDiv.style.color = 'red';
}
document.addEventListener('DOMContentLoaded', fetchTickets);
