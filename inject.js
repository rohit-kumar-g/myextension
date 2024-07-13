(async function() {
    const scriptUrl = 'https://raw.githubusercontent.com/username/repository/branch/script.js'; // Update with your GitHub URL
  
    try {
      const response = await fetch(scriptUrl);
      const scriptText = await response.text();
  
      const scriptElement = document.createElement('script');
      scriptElement.textContent = scriptText;
      document.documentElement.appendChild(scriptElement);
  
      console.log("External script injected successfully");
    } catch (error) {
      console.error("Error injecting script:", error);
    }
  })();
  