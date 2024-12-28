const myLibrary = [];

function createBookFactory() {
  let counter = 2;
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
}

function displayBooks() {
  console.table(myLibrary);
}

const Book = createBookFactory();
book1 = Book("book1", "author1", 1);
book2 = Book("book2", "author2", 2);
book3 = Book("book3", "author3", 3);
book4 = Book("book4", "author4", 4);
const booklist = [book1, book2, book3, book4];

addBookToLibrary(book1);
addBookToLibrary(book2);
addBookToLibrary(book3);
addBookToLibrary(book4);

displayBooks();

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
//$submitBtn.click(getFormValues);
$form.on("submit", getFormValues);
$readBox.click(changeReadRowTextStyle);

for (let book of booklist) {
  tableRowFactory(book);
}

function showModal(e) {
  $modal.fadeIn(10).css("display", "flex");
  $(document).on("click", hideModal);
  console.log("hey");
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
  console.log("Event Default prevented: " + e.isDefaultPrevented());
  for (let i of inputNames) {
    console.log($(`input[name=${i}]`).val());
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
  checkBox.attr("data-rowId", bookValues[3]);
  checkBox.click(changeReadRowTextStyle);
  row.append($("<td></td>").append(checkBox));
  const removeButton = $("<button class='remove-btn'></button>").text("Remove");
  row.append($("<td></td>").append(removeButton));
  $table.append(row);
}

function changeReadRowTextStyle(e) {
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

function removeRow(){
  
}
