const myLibrary = [];

function Book(name, author, id) {
  return { name, author, id };
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function displayBooks() {
  console.table(myLibrary);
}

book1 = Book("book1", "author1", 1);
book2 = Book("book2", "author2", 2);
book3 = Book("book3", "author3", 3);
book4 = Book("book4", "author4", 4);

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
$submitBtn.click(getFormValues);
$readBox.click(changeReadRowTextStyle);

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
  const inputNames = ["name", "author", "bookId"];
  const formVals = [];
  e.preventDefault();
  console.log("Event Default prevented: " + e.isDefaultPrevented());
  for (let i of inputNames) {
    console.log($(`input[name=${i}]`).val());
    formVals.push($(`input[name=${i}`).val());
  }
  addFormValToBookList(formVals);
  hideModal(e, true);
  return formVals;
}

function addFormValToBookList(values) {
  addBookToLibrary(Book(...values));
  tableRowFactory(values);
  displayBooks();
}

function tableRowFactory(values){
  const row = $("<tr></tr>");
  for(let val of values){
    const rowData = $("<td></td>").text(val);
    row.append(rowData);
  }
  const checkBox = $("<input>");
  checkBox.attr("type", "checkbox");
  checkBox.attr("data-rowId", values[2]);
  checkBox.click(changeReadRowTextStyle);
  row.append($("<td></td>").append(checkBox));
  $table.append(row);
}

function changeReadRowTextStyle(e){
  console.log(e.target +"  -  "+ e.target.checked);
  if(e.target.checked == true){
    $(e.target).closest("tr").find("td").css("text-decoration", "line-through");}
  else{
    $(e.target).closest("tr").find("td").css("text-decoration", "none");
  }
}