// API Base URL
const API_URL = 'http://localhost:5000/api';

// Check if user is logged in
function isLoggedIn() {
    return !!localStorage.getItem('token');
}

// Get current user
function getCurrentUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
}

// Update navigation based on auth status
function updateNavigation() {
    const authLink = document.getElementById('authLink');
    const navLinks = document.getElementById('navLinks');

    if (!authLink || !navLinks) return;

    if (isLoggedIn()) {
        const user = getCurrentUser();
        authLink.textContent = user?.name || 'Profile';
        authLink.href = '#';

        // Add logout functionality
        authLink.onclick = (e) => {
            e.preventDefault();
            logout();
        };

        // Add My Bookings link if user is not admin
        if (user?.role !== 'admin') {
            const bookingsLi = document.createElement('li');
            bookingsLi.innerHTML = '<a href="#" onclick="viewMyBookings()">My Bookings</a>';
            navLinks.insertBefore(bookingsLi, authLink.parentElement);
        }

        // Add Admin link if user is admin
        if (user?.role === 'admin') {
            const adminLi = document.createElement('li');
            adminLi.innerHTML = '<a href="admin.html">Admin</a>';
            navLinks.insertBefore(adminLi, authLink.parentElement);
        }
    } else {
        authLink.textContent = 'Login';
        authLink.href = 'login.html';
    }
}

// Logout function
function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = 'index.html';
}

// View user bookings
async function viewMyBookings() {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'login.html';
        return;
    }

    try {
        const response = await fetch(`${API_URL}/bookings/mybookings`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();

        if (data.success) {
            displayBookingsModal(data.data);
        }
    } catch (error) {
        alert('Error loading bookings');
    }
}

// Display bookings in modal
function displayBookingsModal(bookings) {
    const modal = document.createElement('div');
    modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10000;
    padding: 2rem;
  `;

    const content = document.createElement('div');
    content.style.cssText = `
    background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
    padding: 2rem;
    border-radius: 16px;
    max-width: 800px;
    width: 100%;
    max-height: 80vh;
    overflow-y: auto;
    border: 1px solid rgba(255, 255, 255, 0.2);
  `;

    content.innerHTML = `
    <h2 style="color: white; margin-bottom: 1.5rem;">My Bookings</h2>
    ${bookings.length === 0 ? '<p style="color: rgba(255,255,255,0.8);">No bookings yet</p>' : `
      <table style="width: 100%; color: white;">
        <thead>
          <tr style="border-bottom: 2px solid rgba(78, 205, 196, 0.5);">
            <th style="padding: 1rem; text-align: left;">Tour</th>
            <th style="padding: 1rem; text-align: left;">Date</th>
            <th style="padding: 1rem; text-align: left;">People</th>
            <th style="padding: 1rem; text-align: left;">Price</th>
          </tr>
        </thead>
        <tbody>
          ${bookings.map(b => `
            <tr style="border-bottom: 1px solid rgba(255,255,255,0.1);">
              <td style="padding: 1rem;">${b.tourTitle}</td>
              <td style="padding: 1rem;">${new Date(b.date).toLocaleDateString()}</td>
              <td style="padding: 1rem;">${b.numberOfPeople}</td>
              <td style="padding: 1rem;">$${b.totalPrice}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `}
    <button onclick="this.closest('div').parentElement.remove()" 
            style="margin-top: 1.5rem; padding: 0.75rem 2rem; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                   color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 600;">
      Close
    </button>
  `;

    modal.appendChild(content);
    document.body.appendChild(modal);

    modal.onclick = (e) => {
        if (e.target === modal) modal.remove();
    };
}

// Format date
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

// Show loading spinner
function showLoading(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.innerHTML = '<div class="spinner"></div>';
    }
}

// Hide loading spinner
function hideLoading(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.innerHTML = '';
    }
}
