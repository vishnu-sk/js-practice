const key = "BookList";

const localStorageMethods = (() => {
  const addToLocalStorage = key => {
    localStorage.setItem(key, JSON.stringify(myLibrary));
    console.log("Array stored in loacl storage");
  };

  const getFromLocalStorage = key => {
    return JSON.parse(localStorage.getItem(key)) || [];
  };

  const initializeBookArray = (key, bookGen) => {
    const libArray = getFromLocalStorage(key);
    const bookObjArray = [];
    libArray.forEach(item => {
      const bookVals = Object.values(item);
      console.log(bookVals);
      bookObjArray.push(bookGen(bookVals[0], bookVals[1], bookVals[2]));
    });
    return bookObjArray;
  };

  return { initializeBookArray, getFromLocalStorage, addToLocalStorage };
})();

function createBookFactory(existingCount = 0) {
  let counter = existingCount + 1;
  return function Book(name, author, pages) {
    let readStatus = false;
    const idGen = () => {
      console.log("count:" + counter);
      return counter++;
    };
    const id = idGen();
    const changeReadStatus = () => {
      console.log("st : " + readStatus);
      readStatus = !readStatus;
      console.log("st : " + readStatus);
    };
    console.log(id);
    return {
      name,
      author,
      pages,
      id,
      get readStatus() {
        return readStatus;
      },
      changeReadStatus,
    };
  };
}

function addBookToLibrary(book) {
  myLibrary.push(book);
  localStorageMethods.addToLocalStorage(key);
}

function displayBooks() {
  console.table(myLibrary);
}

const Book = createBookFactory();
const myLibrary = localStorageMethods.initializeBookArray(key, Book);

//cacheDOM
const $addBookBtn = $(".add-book");
const $closeModalBtn = $(".close-btn");
const $modal = $(".modal");
const $submitBtn = $("#submit-btn");
const $form = $("form");
const $table = $(".book-list-cont");
const $readBox = $("td > input");

//Adding Event handlers
$addBookBtn.click(showModal);
$closeModalBtn.click(hideModal);
$form.on("submit", getFormValues);
$readBox.click(changeReadRowTextStyle);

// Initializing DOM from localStorage
initializeDOM();

function initializeDOM() {
  myLibrary.forEach(book => tableRowFactory(book));
  console.log("HOLAAAAAAAAAAA");
}

function showModal(e) {
  $modal.fadeIn(10).css("display", "flex");
  $(document).on("click", hideModal);
  //console.log("hey");
}

function hideModal(e, override = false) {
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

function getFormValues(e) {
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

function addFormValToBookList(values) {
  const newBook = Book(...values);
  addBookToLibrary(newBook);
  tableRowFactory(newBook);
  displayBooks();
}

function tableRowFactory(newBook) {
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
  const removeButton = $("<button class='remove-btn'></button>").text("Remove");
  removeButton.attr("data-rowId", bookValues[3]);
  removeButton.click(removeRow);
  row.append($("<td></td>").append(removeButton));
  $table.append(row);
}

let m;
function changeReadRowTextStyle(e) {
  m = $(e.target).attr("data-rowId");
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

function removeRow(e) {
  const k = $(e.target).attr("data-rowId");
  const index = myLibrary.findIndex(item => item.id == k);
  myLibrary.splice(index, 1);
  localStorageMethods.addToLocalStorage(key);
  const closestParentRow = $(e.target).closest("tr");
  closestParentRow.remove();
  displayBooks();
}
