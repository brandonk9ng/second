const form = document.getElementById("form");
const fullname = document.getElementById("fname");
const email = document.getElementById("mail");
form.addEventListener("click", submit);
function submit(e) {
  if (e.target.id == "submitbtn") {
    e.preventDefault();
    if (fullname.value == "" || email.value == "") {
      const msg = document.getElementById("msg");
      msg.innerHTML = "<b>Enter All Fields</b>";
      msg.style.color = "red";
      setTimeout(() => msg.remove(), 3000);
    } else {
      const key = `${email.value}`;
      const obj = {
        name: fullname.value,
        email: email.value,
      };
      fullname.value = "";
      email.value = "";
      const user_serialized = JSON.stringify(obj);
      localStorage.setItem(key, user_serialized);
      const user_desearialized = JSON.parse(localStorage.getItem(key));
      //DISPLAY USERDETAIL IN FRONTEND USING ul ELEMENT
      //before adding to frontend check once
      check(obj.email);
      const userDetail = document.getElementById("users");
      const newelement = document.createElement("li");
      newelement.innerHTML = `${user_desearialized.name} : ${user_desearialized.email}`;
      const editbtn = document.createElement("button");
      editbtn.textContent = "Edit";
      editbtn.id = "editbtn";
      const dltbtn = document.createElement("button");
      dltbtn.textContent = "delete";
      dltbtn.id = "dltbtn";
      newelement.appendChild(editbtn);
      newelement.appendChild(dltbtn);
      userDetail.appendChild(newelement);
    }
  }
}

Object.keys(localStorage).forEach((key) => {
  stringifiedDetailsOfPeople = localStorage.getItem(key);
  detailsOfPeople = JSON.parse(stringifiedDetailsOfPeople);
  const userDetail = document.getElementById("users");
  const newelement = document.createElement("li");
  newelement.innerHTML = `${detailsOfPeople.name} : ${detailsOfPeople.email}`;
  const editbtn = document.createElement("button");
  editbtn.textContent = "Edit";
  editbtn.id = "editbtn";
  const dltbtn = document.createElement("button");
  dltbtn.textContent = "delete";
  dltbtn.id = "dltbtn";
  newelement.appendChild(editbtn);
  newelement.appendChild(dltbtn);
  userDetail.appendChild(newelement);
});

//Deletion of user details from frontend when email is overridden
function check(email) {
  const ul = document.getElementById("users");
  for (let i = 0; i < ul.children.length; i++) {
    if (ul.children[i].textContent.indexOf(email) != -1)
      ul.removeChild(ul.children[i]);
  }
}
const ul = document.getElementById("users");
//delete and edit button functionality
ul.addEventListener("click", dlt_edit);
function dlt_edit(e) {
  if (e.target.id == "dltbtn") {
    ul.removeChild(e.target.parentElement);
    // for removing from local storage
    removeFromLS(e.target.parentElement.textContent);
  }
  if ((e.target.id = "editbtn")) {
    keepElementback(e.target.parentElement.textContent);
    ul.removeChild(e.target.parentElement);
    removeFromLS(e.target.parentElement.textContent);
  }
}

// delete from localStorage
function removeFromLS(str) {
  Object.keys(localStorage).forEach((key) => {
    if (str.indexOf(key) != -1) {
      localStorage.removeItem(key);
    }
  });
}

//edit button functionality
function keepElementback(str) {
  Object.keys(localStorage).forEach((key) => {
    if (str.indexOf(key) != -1) {
      const obj = JSON.parse(localStorage.getItem(key));
      fullname.value = obj.name;
      email.value = obj.email;
    }
  });
}
