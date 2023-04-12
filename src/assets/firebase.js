import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDwitxNWu4FEF_TD2wfkWxeE0CdEt-30xA",
  authDomain: "instagram-clone-32a79.firebaseapp.com",
  projectId: "instagram-clone-32a79",
  storageBucket: "instagram-clone-32a79.appspot.com",
  messagingSenderId: "24480774345",
  appId: "1:24480774345:web:d4b828af27c7c9cdb2b518"
};


const app = initializeApp(firebaseConfig);
export {app};