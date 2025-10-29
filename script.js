fetch('plants.json')
  .then(response => response.json())
  .then(plants => {
    const sheetsContainer = document.getElementById('sheets');
    plants.forEach(plant => {
      const sheet = document.createElement('div');
      sheet.className = 'plant-sheet';

      const firstLine = document.createElement('div');
      firstLine.className = 'speciesID';    /*Classe speciesID*/ 
      firstLine.innerHTML = `
        <div class=holeSquare> </div>
        <h2>${plant.nameCommon}</h2>
        <h3>${plant.nameScientific}</h3>
      `;

      const img = document.createElement('img');
      img.src = plant.imageWhole;
      img.alt = plant.nameCommon;

      const details = document.createElement('div');
      details.className = 'plant-details';        /*Classe details*/ 
      details.innerHTML = `
        <h2>${plant.nameCommon}</h2>
        <p><strong>Family:</strong> ${plant.nameScientific}</p>
        <p><strong>Family:</strong> ${plant.family}</p>
        <p><strong>Description:</strong> ${plant.description}</p>
        <p><strong>Habitat:</strong> ${plant.habitat}</p>
        <p><strong>Uses:</strong> ${plant.uses}</p>
      `;

      sheet.appendChild(firstLine);
      sheet.appendChild(img);
      sheet.appendChild(details);
      sheetsContainer.appendChild(sheet);
    });
  });