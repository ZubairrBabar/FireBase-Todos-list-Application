import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";
import { getFirestore, collection, addDoc, getDocs, doc, deleteDoc  } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDstu6KQ7ORwGQaoPH2z85Y0DRjj97h5hM",
  authDomain: "my-first-project-a894d.firebaseapp.com",
  projectId: "my-first-project-a894d",
  storageBucket: "my-first-project-a894d.appspot.com",
  messagingSenderId: "129049233309",
  appId: "1:129049233309:web:c3ee36913289be3abc9174",
  measurementId: "G-XF5KPJGGKL"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
let numbersCollection = collection(db,"numbers");
let todosCollection = collection(db, "todos");
const add_toDo = document.getElementById("add_toDo")
const toDo_input = document.getElementById("toDo_input")
const todos_list = document.getElementById("todos_list")

add_toDo.addEventListener("click", addTodoToDb)
getTodosFromDb()

async function addTodoToDb() {
  try {
    const obj ={
      todo : toDo_input.value,
     
    }
    const docRef = await addDoc(todosCollection, obj )
    getTodosFromDb()
    console.log(docRef);
  } catch (e) {
    console.log(e);
  }
}

async function getTodosFromDb() {
  try{
        
    const querySnapshot = await getDocs(todosCollection);
    todos_list.innerHTML=""
    querySnapshot.forEach((doc) => {
      console.log(doc.id);
     var{ todo} = doc.data();
     const ele =`<li  id="${doc.id}"> ${todo}  <button class="delete">delete</button> </li>`
     todos_list.innerHTML += ele
     console.log(todo);

     todos_list.childNodes.forEach((li)=> li.addEventListener("click", deleteTodo))
    });
  }
  catch(e){
console.log(e);
  }
}

async function deleteTodo() {
  try{
  const docId = this.id ;
  const docCollection = doc(db,"todos", docId);
  const docRef = await deleteDoc(docCollection);
  console.log(docRef);
  getTodosFromDb()
  }
  catch(e){
  console.log(e);
  }
}