// Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAm4aDJ-g-UehALCEPvuzqNeLmQfUW4M8Q",
  authDomain: "revisiontracker-dc145.firebaseapp.com",
  projectId: "revisiontracker-dc145",
  storageBucket: "revisiontracker-dc145.appspot.com",
  messagingSenderId: "140685845306",
  appId: "1:140685845306:web:3861b3a78048d253c46603",
  measurementId: "G-3CXTB499EB"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firestore after Firebase
var db = firebase.firestore();
var topics = {};

// Initialize Firebase Authentication
var auth = firebase.auth();

// Function to add a topic
function addTopic() {
  var topicInput = document.getElementById("topic");
  var topic = topicInput.value.trim(); // Trim removes leading/trailing spaces

  // Check if the topic is not empty
  if (topic) {
    var revisionDate = new Date().toISOString();

    // Get the currently authenticated user
    var user = auth.currentUser;
    if (user) {
      // Add the topic to Firestore with the user's UID
      db.collection('topics').add({
        topic: topic,
        revisionDate: revisionDate,
        userId: user.uid, // Store the user's UID
      })
      .then(function(docRef) {
        console.log('Document written with ID: ', docRef.id);
        topicInput.value = ''; // Clear the input field
        updateModifyTopicDropdown();
      })
      .catch(function(error) {
        console.error('Error adding document: ', error);
      });
    } else {
      // Handle the case where there's no authenticated user
      console.error('User not authenticated.');
    }
  } else {
    // Display an error message or handle it as needed
    alert("Topic cannot be empty.");
  }
}

// Function to revise topics
function reviseTopics() {
  var today = new Date();
  var topicsList = document.getElementById('topicsList');
  topicsList.innerHTML = '';

  db.collection('topics').get()
  .then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
      var topicData = doc.data();
      var lastRevisionDate = new Date(topicData.revisionDate);
      var daysSinceLastRevision = Math.floor((today - lastRevisionDate) / (1000 * 60 * 60 * 24));
      var revisionIntervals = [1, 3, 10];

      if (revisionIntervals.includes(daysSinceLastRevision)) {
        var listItem = document.createElement('li');
        listItem.textContent = 'Revise ' + topicData.topic + ' (Last revised: ' + lastRevisionDate.toDateString() + ')';
        topicsList.appendChild(listItem);
      }
    });
  });
}

// Function to show all topics
function showAllTopics() {
  var allTopicsList = document.getElementById('allTopicsList');
  allTopicsList.innerHTML = '';

  db.collection('topics').get()
  .then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
      var topicData = doc.data();
      var listItem = document.createElement('li');
      listItem.textContent = "'" + topicData.topic + "' (Last revised: " + new Date(topicData.revisionDate).toDateString() + ')';
      allTopicsList.appendChild(listItem);
    });
  });
}

// Function to modify a topic's revision date
function modifyDate() {
  var modifyTopicDropdown = document.getElementById('modifyTopic');
  var selectedTopic = modifyTopicDropdown.value;
  var newDateInput = document.getElementById('newDate');
  var newDate = newDateInput.value;

  if (selectedTopic in topics) {
    db.collection('topics').doc(topics[selectedTopic]).update({
      revisionDate: newDate,
    })
    .then(function() {
      console.log('Updated revision date for ' + selectedTopic);
      newDateInput.value = '';
    })
    .catch(function(error) {
      console.error('Error updating document: ', error);
    });
  }
}

// Function to update the modification dropdown with topic names
function updateModifyTopicDropdown() {
  var modifyTopicDropdown = document.getElementById('modifyTopic');
  modifyTopicDropdown.innerHTML = '';

  db.collection('topics').get()
  .then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
      var topicData = doc.data();
      var option = document.createElement('option');
      option.value = topicData.topic;
      option.textContent = topicData.topic;
      modifyTopicDropdown.appendChild(option);
      topics[topicData.topic] = doc.id;
    });
  });
}

// Add real-time authentication state change listener
auth.onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in
    updateModifyTopicDropdown();
  } else {
    // User is signed out
  }
});

// Load topics on page load
window.onload = function() {
  updateModifyTopicDropdown();
};
