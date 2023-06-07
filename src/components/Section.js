class Section {
  constructor ({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._containerSelector = containerSelector;
  }

  renderItems(data) {
    data.forEach((item) => this._renderer(item));
  }

  addItemAppend(itemHtml) {
    this._containerSelector.append(itemHtml);
  }

  addItemPrepend(itemHtml) {
    this._containerSelector.prepend(itemHtml);
  }
}

export default Section;
