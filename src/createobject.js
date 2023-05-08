export const createObject = objects => {
  return objects.data.hits
    .map(
      object => `
     <div class="gallery-wrapper">
      <div class="photo-card">
      <a href="${object.largeImageURL}">
      <img class="picture" src="${object.webformatURL}" alt="${object.tags}" loading="lazy" />
      </a>
      </div>
      <div class="info">
        <p class="info-item">
          <b>Likes</b>
          ${object.likes}
        </p>
        <p class="info-item">
          <b>Views</b>
          ${object.views}
        </p>
        <p class="info-item">
          <b>Comments</b>
          ${object.comments}
        </p>
        <p class="info-item">
          <b>Downloads</b>
          ${object.downloads}
        </p>
      </div>
    </div>
    `
    )
    .join('');
};
