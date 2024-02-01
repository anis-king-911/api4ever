/*
const firebaseConfig = {
  databaseURL: "https://manga4ever-test-default-rtdb.europe-west1.firebasedatabase.app",
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();

const MainList = 'MainList';

async function loadData() {
  const databaseRef = database.ref(MainList);
  const databaseGet = await databaseRef.get();
  const databaseVal = await databaseGet.val();

  const snapshot = Object.values(databaseVal);
  const snapJSON = JSON.stringify(snapshot);
  //const snaplimit = snapshot.splice(0, 10);

  console.log(snapJSON);
}

//window.addEventListener('DOMContentLoaded', () => loadData());
*/

const localStorageRef = 'StateReference';
const valState = localStorage.getItem(localStorageRef);
//const getState = valState !== null ? valState : 'asc';
const setState = (arg) => localStorage.setItem(localStorageRef, arg);

//let state = 'asc'; // 'desc';
const btn = document.querySelector('.btn');

function useState(state) {

  /*
  if(state === 'asc') {
    state = 'desc';
  } else if(state === 'desc') {
    state = 'asc';
  }
*/

  switch (state) {
    case null:
      state = 'asc';
      break;
    case 'asc':
      state = 'desc';
      break;
    case 'desc':
      state = 'asc';
      break;
  }

  return state;
}

btn.addEventListener('click', () => {

  console.group();
  console.log(valState);
  console.log(useState(valState));
  console.groupEnd();
  
  setState(useState(valState));
})