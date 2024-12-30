const key = "BookList";

class localStorageMethodClass {
  constructor() {}

  static addToLocalStorage(key) {
    localStorage.setItem(key, JSON.stringify(myLibrary));
    console.log("Array stored in loacl storage");
  }

  static getFromLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
  }

  static initializeBookArray(key) {
    const libArray = getFromLocalStorage(key);
    const bookObjArray = [];
    libArray.forEach(item => {
      const bookVals = Object.values(item);
      console.log(bookVals);
      bookObjArray.push(new BookClass(bookVals[0], bookVals[1], bookVals[2]));
    });
    return bookObjArray;
  }
}

class BookClass {
  static counter = 0;
  #readStatus;

  constructor(name, author, pages) {
    this.#readStatus = false;
    BookClass.counter++;
    this.id = BookClass.counter;
    this.author = author;
    this.name = name;
    this.pages = pages;
  }

  changeReadStatus() {
    console.log("st : " + readStatus);
    readStatus = !readStatus;
    console.log("st : " + readStatus);
  }

  static addBookToLibrary(book) {
    myLibrary.push(book);
    localStorageMethodClass.addToLocalStorage(key);
  }

  static displayBooks() {
    console.table(myLibrary);
  }
}

const Book = createBookFactory();
const myLibrary = localStorageMethodClass.initializeBookArray(key);

class UIController {
  static $addBookBtn = $(".add-book");
  static $closeModalBtn = $(".close-btn");
  static $modal = $(".modal");
  static $submitBtn = $("#submit-btn");
  static $form = $("form");
  static $table = $(".book-list-cont");
  static $readBox = $("td > input");

  constructor() {}

  static initializeDOM() {
    myLibrary.forEach(book => tableRowFactory(book));
    console.log("HOLAAAAAAAAAAA");
  }

  static showModal(e) {
    $modal.fadeIn(10).css("display", "flex");
    $(document).on("click", hideModal);
    //console.log("hey");
  }

  static hideModal(e, override = false) {
    if (
      e.target.className == "modal" ||
      e.target.className == "close-btn" ||
      override
    ) {
      $modal.fadeOut(50);
      $(document).off("click", hideModal);
    }
    console.log(e.target);
  }

  static getFormValues(e) {
    const inputNames = ["name", "author", "pageId"];
    const formVals = [];
    e.preventDefault();
    //console.log("Event Default prevented: " + e.isDefaultPrevented());
    for (let i of inputNames) {
      formVals.push($(`input[name=${i}]`).val());
    }
    addFormValToBookList(formVals);
    hideModal(e, true);
    return formVals;
  }

  static addFormValToBookList(values) {
    const newBook = Book(...values);
    addBookToLibrary(newBook);
    tableRowFactory(newBook);
    displayBooks();
  }

  static changeReadRowTextStyle(e) {
    const k = $(e.target).attr("data-rowId");
    const index = myLibrary.findIndex(item => item.id == k);
    myLibrary[index].changeReadStatus();
    console.log(Object.values(myLibrary[index]));
    console.log(e.target + "  -  " + e.target.checked);
    const closestParentRow = $(e.target).closest("tr");
    if (e.target.checked == true) {
      closestParentRow.find("td").css("text-decoration", "line-through");
    } else {
      closestParentRow.find("td").css("text-decoration", "none");
    }
  }

  static removeRow(e) {
    const k = $(e.target).attr("data-rowId");
    const index = myLibrary.findIndex(item => item.id == k);
    myLibrary.splice(index, 1);
    localStorageMethods.addToLocalStorage(key);
    const closestParentRow = $(e.target).closest("tr");
    closestParentRow.remove();
    displayBooks();
  }

  static tableRowFactory(newBook) {
    const row = $("<tr></tr>");
    const bookValues = Object.values(newBook);
    const values = bookValues.slice(0, 3);
    for (let val of values) {
      const rowData = $("<td></td>").text(val);
      row.append(rowData);
    }
    const checkBox = $("<input>").attr("type", "checkbox");
    checkBox.attr("data-rowId", bookValues[3]).attr("id", bookValues[3]);
    const labelToggle = $("<label class='toggle-read'></label>").attr(
      "for",
      bookValues[3]
    );
    checkBox.click(changeReadRowTextStyle);
    row.append($("<td></td>").append(checkBox).append(labelToggle));
    const removeButton = $("<button class='remove-btn'></button>").text(
      "Remove"
    );
    removeButton.attr("data-rowId", bookValues[3]);
    removeButton.click(removeRow);
    row.append($("<td></td>").append(removeButton));
    $table.append(row);
  }
}

//cacheDOM
/*
const $addBookBtn = $(".add-book");
const $closeModalBtn = $(".close-btn");
const $modal = $(".modal");
const $submitBtn = $("#submit-btn");
const $form = $("form");
const $table = $(".book-list-cont");
const $readBox = $("td > input"); */

//Adding Event handlers
$addBookBtn.click(UIController.showModal);
$closeModalBtn.click(UIController.hideModal);
$form.on("submit", UIController.getFormValues);
$readBox.click(UIController.changeReadRowTextStyle);

// Initializing DOM from localStorage
UIController.initializeDOM();