// Course Search Functionality
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector('.search-input');
    const courseCards = document.querySelectorAll('.course-card');

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            
            courseCards.forEach(card => {
                const title = card.querySelector('h3').textContent.toLowerCase();
                const description = card.querySelector('p').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || description.includes(searchTerm)) {
                    card.style.display = 'block';
                    card.style.opacity = '1';
                } else {
                    card.style.opacity = '0';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    }

    // Enrollment Form Handling
    const enrollButtons = document.querySelectorAll('.enroll-button');
    const enrollmentForm = document.querySelector('.enrollment-form');
    const closeForm = document.querySelector('.close-form');
    const enrollForm = document.getElementById('enrollForm');

    if (enrollButtons.length > 0 && enrollmentForm && closeForm && enrollForm) {
        // Show enrollment form
        enrollButtons.forEach(button => {
            button.addEventListener('click', () => {
                const courseTitle = button.closest('.course-card').querySelector('h3').textContent;
                const courseSelect = document.getElementById('course');
                courseSelect.value = courseTitle;
                
                enrollmentForm.style.display = 'flex';
                setTimeout(() => {
                    enrollmentForm.style.opacity = '1';
                }, 10);
            });
        });

        // Close enrollment form
        closeForm.addEventListener('click', () => {
            enrollmentForm.style.opacity = '0';
            setTimeout(() => {
                enrollmentForm.style.display = 'none';
            }, 300);
        });

        // Handle form submission
        enrollForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                course: document.getElementById('course').value,
                date: new Date().toISOString()
            };
            
            // Save to local storage
            let enrollments = JSON.parse(localStorage.getItem('enrollments') || '[]');
            enrollments.push(formData);
            localStorage.setItem('enrollments', JSON.stringify(enrollments));
            
            // Show success message
            alert('Enrollment successful! We will contact you soon.');
            
            // Reset and close form
            enrollForm.reset();
            enrollmentForm.style.opacity = '0';
            setTimeout(() => {
                enrollmentForm.style.display = 'none';
            }, 300);
        });
    }
}); 