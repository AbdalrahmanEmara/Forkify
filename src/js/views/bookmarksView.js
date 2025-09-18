import icons from 'url:../../img/icons.svg'; // parcel 2
import View from './View.js';
import PreviewView from './PreviewView.js';
class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = '';
  _message = 'No bookmarks yet. Find a nice recipe and bookmark it.';

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  _generateMarkup() {
    return this._data
      .map(bookMark => PreviewView.render(bookMark, false))
      .join('');
  }
}

export default new BookmarksView();
