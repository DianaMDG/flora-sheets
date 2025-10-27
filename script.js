fetch('plants.json')
  .then(response => response.json())
  .then(plants => {
    const sheetsContainer = document.getElementById('sheets');
    plants.forEach(plant => {
      const sheet = document.createElement('div');
      sheet.className = 'plant-sheet';

      const img = document.createElement('img');
      img.src = plant.image;
      img.alt = plant.name-common;

      const details = document.createElement('div');
      details.className = 'plant-details';
      details.innerHTML = `
        <h2>${plant.name-common}</h2>
        <p><strong>Family:</strong> ${plant.family}</p>
        <p><strong>Description:</strong> ${plant.description}</p>
        <p><strong>Habitat:</strong> ${plant.habitat}</p>
        <p><strong>Uses:</strong> ${plant.uses}</p>
      `;

      sheet.appendChild(img);
      sheet.appendChild(details);
      sheetsContainer.appendChild(sheet);
    });
  });