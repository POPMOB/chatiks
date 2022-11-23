	//  measurementId: "G-R6WBDCDMKM"
    // Your web app's Firebase configuration
    var firebaseConfig = {
        apiKey: "AIzaSyC2C9EIaZZvPPx458bRne_7H_I5gtEi2o0",
        authDomain: "jsbase-1f817.firebaseapp.com",
        databaseURL: "https://jsbase-1f817-default-rtdb.firebaseio.com",
        projectId: "jsbase-1f817",
        storageBucket: "jsbase-1f817.appspot.com",
        messagingSenderId: "387825923234",
        appId: "1:387825923234:web:661f49ca1df5c9978dd3fb"	
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
 
    var myName = prompt("Введите имя");

    function sendMessage() {
        // get message
        var message = document.getElementById("message").value;
        const date = new Date();
        var dateAndTime = "date: " + date.toLocaleDateString() + " time: " + date.toLocaleTimeString();
 
        // save in database
        firebase.database().ref("messages").push().set({
            "sender": myName,
            "message": message,
            "dateTime": dateAndTime
        });
 
        // prevent form from submitting
        return false;
    }
        // listen for incoming messages
    firebase.database().ref("messages").on("child_added", function (snapshot) {
        var html = "";
        // give each message a unique ID
        html += "<li id='message-" + snapshot.key + "'>";
        // show delete button if message is sent by me
        if (snapshot.val().sender == myName) {
            html += "<button data-id='" + snapshot.key + "' onclick='deleteMessage(this);'>";
                html += "Удалить";
            html += "</button>";
        }
        html += snapshot.val().sender + ": " + snapshot.val().message;
        html += "</li>";
 
        document.getElementById("messages").innerHTML += html;
    });

    function deleteMessage(self) {
        // get message ID
        var messageId = self.getAttribute("data-id");
 
        // delete message
        firebase.database().ref("messages").child(messageId).remove();
    }
 
    // attach listener for delete message
    firebase.database().ref("messages").on("child_removed", function (snapshot) {
        // remove message node
        document.getElementById("message-" + snapshot.key).innerHTML = "Это сообщение было удалено";
    });
