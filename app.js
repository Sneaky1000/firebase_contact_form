// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAE8vNE51eBQniLkUpUtruF0myNk4HittM",
  authDomain: "contact-form-test-project.firebaseapp.com",
  databaseURL: "https://contact-form-test-project-default-rtdb.firebaseio.com",
  projectId: "contact-form-test-project",
  storageBucket: "contact-form-test-project.appspot.com",
  messagingSenderId: "477801383448",
  appId: "1:477801383448:web:b2da7fd6e90c04b3a5256d"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Reference contactInfo collections
let contactInfo = firebase.database().ref("customers");

// Listen for a submit
document.querySelector(".contact-form").addEventListener("submit", submitForm);

function submitForm(e) {
  e.preventDefault();

  // Get input Values
  let name = document.querySelector(".name").value;
  let email = document.querySelector(".email").value + document.querySelector('select').value;
  let message = document.querySelector(".message").value;

  saveContactInfo(name, email, message);

  document.querySelector(".contact-form").reset();

  sendEmail(name, email, message);
}

// Save info to Firebase
function saveContactInfo(name, email, message) {
  let newContactInfo = contactInfo.push();

  newContactInfo.set({
    name: name,
    email: email,
    message: message,
  });

  retrieveInfo();
}

// Retrieve info
function retrieveInfo() {
  let ref = firebase.database().ref("customers");
  ref.on("value", gotData);
}

function gotData(data) {
  let customer = data.val();
  let keys = Object.keys(customer);

  for (let i = 0; i < keys.length; i++) {
    let infoData = keys[i]
    let name = customer[infoData].name
    let email = customer[infoData].email
    let message = customer[infoData].message

    let infoResults = document.querySelector(".infoResults");

    infoResults.innerHTML += `<div>
    <p><strong>Name: <strong/>${name} <br/>
    <a><strong>Email: <strong/>${email}</a> <br/>
    <a><strong>Message: <strong/>${message}</a>
    </p>
    </div>`;
  }
}

retrieveInfo();

// Send email
function sendEmail(name, email, message) {
  Email.send({
    SecureToken: "f1bb0320-541e-4ff7-9dcd-5fdfc67bdb7f",
    To: `${email}`,
    From: "mustachedbananaman@gmail.com",
    Subject: `${name} sent you a message`,
    Body: `${message}`,
  }).then(message => alert("Message sent successfully"));
}
