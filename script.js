let submitBtn = document.getElementById("just");

//Creating image url
document.querySelector("#myFile").addEventListener("change", function (e) {
  imageurl = URL.createObjectURL(e.target.files[0]);
});
let items = null;
if (localStorage.getItem("items")) {
  items = JSON.parse(localStorage.getItem("items"));
}
else {
  items = []
}
// seting two field to local storage by clicking on submit button
submitBtn.addEventListener("click", () => {
  if (submitBtn.innerText === "post") {
    let userData =
    {
      text: document.getElementById("myInput").value,
      image: imageurl
    }

    items.push(userData);

    // store array of object  as  string in local storage 
    localStorage.setItem('items', JSON.stringify(items));
    displayBlogs();
  }
});
const blogsContainer = document.getElementById("blogPost");
let blogItem = null;
let blogText = null;
let blogImage = null;
let editBtn = null;
let deleteBtn = null;

const displayBlogs = () => {
  if (blogsContainer.childElementCount > 0) {
    while (blogsContainer.firstChild) {
      blogsContainer.removeChild(blogsContainer.lastChild);
    }
  }

  const blogs = JSON.parse(localStorage.getItem("items"));
  //console.log(blogs);
  if (blogs && blogs.length > 0) {
    //console.log(blogs);
    blogs.map((blog, id) => {
      blogItem = document.createElement("div");
      blogItem.classList.add("blogItem");
      blogText = document.createElement("p");
      blogText.innerHTML = blog.text;
      blogImage = document.createElement("img");
      blogImage.classList.add("blogImage");
      blogImage.setAttribute("src", blog.image);
      editBtn = document.createElement("button");
      editBtn.classList.add("editBtn");
      editBtn.innerText = "Edit";
      deleteBtn = document.createElement("button");
      deleteBtn.classList.add("deleteBtn");
      deleteBtn.innerText = "Delete";
      blogItem.appendChild(blogText);
      blogItem.appendChild(blogImage);
      blogItem.appendChild(editBtn);
      blogItem.appendChild(deleteBtn);
      blogsContainer.appendChild(blogItem);
      editBtn.addEventListener("click", (e) => {
        e.preventDefault();
        document.getElementById("just").innerText = "edit";
        document.getElementById("myInput").value = blog.text;
        console.log(blog.image);
        document.querySelector("#myFile").files[0] = blog.image;
        // console.log(newData);
        document.getElementById("just").addEventListener("click", (e) => {
          const newData = {
            text: document.getElementById("myInput").value,
            image: blog.image
          }
          console.log(id);
          console.log(document.getElementById("myInput").value);
          e.preventDefault();
          const allBlogs = blogs.map((b, index) => index === id ? newData : b);
          console.log(allBlogs);
          localStorage.setItem("items", JSON.stringify(allBlogs));
          displayBlogs();
        })
      })

      deleteBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const newBlogs = blogs.filter((b, index) => index !== id);
        localStorage.setItem("items", JSON.stringify(newBlogs));
        displayBlogs();
      })
    })
    console.log(blogsContainer);
  }
}
displayBlogs();
