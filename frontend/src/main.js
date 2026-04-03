const BACKEND_URL = 'https://localhost:8444';

const fetchBtn = document.getElementById('fetchBtn');
const responseBox = document.getElementById('response');

fetchBtn.addEventListener('click', async () => {
  responseBox.textContent = 'Loading...';
  try {
    const res = await fetch(`${BACKEND_URL}/api/hello`);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    responseBox.textContent = JSON.stringify(data, null, 2);
  } catch (err) {
    responseBox.textContent = `Error: ${err.message}`;
  }
});
