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
        <div class=logos> </div>
        <div class=speciesNames>
            <div class=commonName>${plant.nameCommon}</div>
            <div class=scientificName>${plant.nameScientific}</div>
        </div>
      `;
      
      /*const img = document.createElement('img');
      img.src = plant.imageWhole;
      img.alt = plant.nameCommon;
      */

      const photos = document.createElement('div');
      photos.className = 'plant-photos';        /*Class details*/ 

      // choose main image and up to 4 more images
      const wholeSpecimen = plant.imageWhole || (plant.photos && plant.photos[0]) || '';
      const photoList = (plant.photos).slice(1, 5);
      while (photoList.length < 4) others.push(''); // ensure 4 items

      const photoLabelsList = (plant.photoLabels).slice(1, 5);
      while (photoLabelsList.length < 4) others.push(''); // ensure 4 items


      photos.innerHTML = `
        <table style="width:100%">
          <tr>
            <td rowspan="2" style=" height:108mm; width:auto; background-color: green">
              <img src="${wholeSpecimen}" alt="${plant.nameCommon}" style="width:100%; height:100%; object-fit:cover; display:block" />
            </td>
            <td style="width: 48mm; height:48mm; background-color: green">
              <img src="${photoList[0]}" alt="${photoLabelsList[0]} photo2" style="width:100%; height:100%; object-fit:cover; display:block" />
            </td>
            <td style="width: 48mm; height: 48mm; background-color: green">
              <img src="${photoList[1]}" alt="${photoLabelsList[1]} photo3" style="width:100%; height:100%; object-fit:cover; display:block" />
            </td>
          </tr>
          <tr>
            <td style="width: 48mm; height:48mm; background-color: green">
              <img src="${photoList[2]}" alt="${photoLabelsList[2]} photo4" style="width:100%; height:100%; object-fit:cover; display:block" />
            </td>
            <td style="width: 48mm; height:48mm; background-color: green">
              <img src="${photoList[3]}" alt="${photoLabelsList[3]} photo5" style="width:100%; height:100%; object-fit:cover; display:block" />
            </td>
          </tr>
        </table>
      `;

      sheet.appendChild(firstLine);
      /*sheet.appendChild(img);*/
      sheet.appendChild(photos);
      sheetsContainer.appendChild(sheet);
    });
  });