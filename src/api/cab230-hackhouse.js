export function register(string) {
    fetch("https://cab230.hackhouse.sh/register", {
        method: "POST",
        body: string,
        headers: {
          "Content-type": "application/x-www-form-urlencoded"
      }
    })
      .then(function(response) {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok");
      })
      .then(function(result) {
        if (result != null) {
          console.log(result)
        }
        // let appDiv = document.getElementById("test");
        // appDiv.innerHTML = JSON.stringify(result);
        // regButton.disabled = true;
      })
      .catch(function(error) {
        console.log("There has been a problem with your fetch operation: ",error.message);
      });
}
export function login(string) {
    var JWT;
    fetch("https://cab230.hackhouse.sh/login", {
    method: "POST",
    body: string,
    headers: {
        "Content-type": "application/x-www-form-urlencoded"
    }
})
    .then(function(response) {
        if (response.ok) {
            return response.json();
        }
        throw new Error("Network response was not ok.");
    })
    .then(function(result) {
        // let appDiv = document.getElementById("returnLog");
        // appDiv.innerHTML = JSON.stringify(result);
        JWT = result.token;
        sessionStorage.setItem('token', JWT)
    })
    .catch(function(error) {
        console.log("There has been a problem with your fetch operation: ",error.message);
    });
}

export function removeSessionVar() {
    sessionStorage.clear();
    console.log("Session Var Removed")
}
