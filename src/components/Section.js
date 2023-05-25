class Section {
  constructor ({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._containerSelector = containerSelector;
  }

  renderItems(data = this._items) {
    data.forEach((item) => this._renderer(item));
  }

  addItem(itemHtml) {
    this._containerSelector.prepend(itemHtml);
  }
}

export default Section;
