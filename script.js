fetch('plants.json')
  .then(response => response.json())
  .then(plants => {
    // ensure #sheets exists
    let sheetsContainer = document.getElementById('sheets');
    if (!sheetsContainer) {
      sheetsContainer = document.createElement('div');
      sheetsContainer.id = 'sheets';
      document.body.insertBefore(sheetsContainer, document.body.firstChild);
    }

    plants.forEach(plant => {
      const sheet = document.createElement('div');
      sheet.className = 'plant-sheet';

      const firstLine = document.createElement('div');
      firstLine.className = 'speciesID';
      firstLine.innerHTML = `
        <div class="holeSquare"></div>
        <div class="logos"></div>
        <div class="speciesNames">
          <div class="commonName">${plant.nameCommon || ''}</div>
          <div class="scientificName">${plant.nameScientific || ''}</div>
        </div>
      `;

      const photos = document.createElement('div');
      photos.className = 'plant-photos';

      // safe arrays
      const photosArr = Array.isArray(plant.photos) ? plant.photos.slice() : [];
      const labelsArr = Array.isArray(plant.photoLabels) ? plant.photoLabels.slice() : [];

      // decide main image and four thumbs (no off-by-one)
      let wholeSpecimen = (typeof plant.imageWhole === 'string' && plant.imageWhole.trim()) ? plant.imageWhole : '';
      let thumbList = [];
      let thumbLabels = [];

      if (wholeSpecimen) {
        // imageWhole used as main -> thumbnails come from photos[0..3]
        thumbList = photosArr.slice(0, 4);
        thumbLabels = labelsArr.slice(0, 4);
      } else {
        // no imageWhole -> use photos[0] as main and photos[1..4] as thumbs
        wholeSpecimen = photosArr[0] || '';
        thumbList = photosArr.slice(1, 5);
        thumbLabels = labelsArr.slice(1, 5);
      }

      while (thumbList.length < 4) thumbList.push('');
      while (thumbLabels.length < 4) thumbLabels.push('');

      photos.innerHTML = `
        <table class="photos-table">
          <tr>
            <td class="main-photo-cell" rowspan="2">
              <img class="main-photo" src="${wholeSpecimen}" alt="${plant.nameCommon || ''}" />
            </td>
            <td class="thumb-photo-cell">
              <img class="thumb-photo" src="${thumbList[0]}" alt="${thumbLabels[0] || plant.nameCommon || ''}" />
            </td>
            <td class="thumb-photo-cell">
              <img class="thumb-photo" src="${thumbList[1]}" alt="${thumbLabels[1] || plant.nameCommon || ''}" />
            </td>
          </tr>
          <tr>
            <td class="thumb-photo-cell">
              <img class="thumb-photo" src="${thumbList[2]}" alt="${thumbLabels[2] || plant.nameCommon || ''}" />
            </td>
            <td class="thumb-photo-cell">
              <img class="thumb-photo" src="${thumbList[3]}" alt="${thumbLabels[3] || plant.nameCommon || ''}" />
            </td>
          </tr>
        </table>
      `;

      sheet.appendChild(firstLine);
      sheet.appendChild(photos);
      sheetsContainer.appendChild(sheet);
    });
  })
  .catch(err => {
    console.error('Failed to load plants.json', err);
  });