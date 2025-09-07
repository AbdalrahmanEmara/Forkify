import icons from 'url:../../img/icons.svg'; // parcel 2
import View from "./View.js";
class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');
  
  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function(e) {
      e.preventDefault();
      const btn = e.target.closest('.btn--inline');
      if(!btn) return;

      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    })
  }

  _getMarkupBtn(curPage, prOrNx) {
    const goToPage = prOrNx === 'pr' ? curPage - 1 : curPage + 1;
    return `
      <button data-goto="${goToPage}" class="btn--inline pagination__btn--${prOrNx === 'pr' ? 'prev' : 'next'}">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-${prOrNx === 'pr' ? 'left' : 'right'}"></use>
        </svg>
        <span>Page ${goToPage}</span>
      </button>    
    `
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(this._data.result.length / this._data.resultsPerPage);

    // Page 1, and there are other pages
    if (curPage === 1 && numPages > 1) {
      return this._getMarkupBtn(curPage, 'nx');
    }
    
    // Last page
    if (curPage === numPages && numPages > 1) {
      return this._getMarkupBtn(curPage, 'pr');
    }

    // other page
    if (curPage < numPages) {
      return this._getMarkupBtn(curPage, 'pr') + this._getMarkupBtn(curPage, '');
    }

    // Page 1, and there are NO other pages
    return '';
  }
}

export default new PaginationView();