document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      message: form.message.value.trim(),
    };

    if (!data.name || !data.email || !data.message) {
      alert('Please fill in all fields.');
      return;
    }

    if (!validateEmail(data.email)) {
      alert('Please enter a valid email.');
      return;
    }

    try {
      const response = await fetch(
        'https://script.google.com/macros/s/AKfycbw_Uc4ygYU5TKapCkyOIvNkdacSrui9LE6Cu8eI-r8/exec',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();

      if (result.status === 'success') {
        alert('Thanks for contacting Electric Pyramid! We will get back to you soon.');
        form.reset();
      } else {
        alert('Error submitting form: ' + (result.message || 'Unknown error'));
      }
    } catch (err) {
      alert('Failed to send message. Please try again later.');
    }
  });

  // Simple email validation function
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email.toLowerCase());
  }
});
