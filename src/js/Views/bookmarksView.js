import View from './View';
import icons from 'url:../../img/icons.svg';

class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmarks yet.Find a nice recipe and bookmark it:)';

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  generateMarkup() {
    return this._data.map(this.generateMarkupPreview).join('');
  }

  generateMarkupPreview(result) {
    const id = window.location.hash.slice(1);
    return ` <li class="preview">
    <a class="preview__link ${
      id === result.id ? 'preview__link--active' : ''
    } " href="#${result.id}">
      <figure class="preview__fig">
        <img src="${result.image}" alt=${result.title} crossorigin />
      </figure>
      <div class="preview__data">
        <h4 class="preview__title">${result.title}</h4>
        <p class="preview__publisher">${result.publisher}</p>
        <div class="preview__user-generated ${result.key ? '' : 'hidden'}">
        <svg>
          <use href="${icons}#icon-user"></use>
        </svg>
        </div>
      </div>
    </a>
  </li>`;
  }
}

export default new BookmarksView();
