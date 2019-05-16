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
        JWT = result.token;
        sessionStorage.setItem('token', JWT)
    })
    .catch(function(error) {
        console.log("There has been a problem with your fetch operation: ",error.message);
    });
}

export async function Offences() {
    var temp = await (fetch("https://cab230.hackhouse.sh/offences")
        .then(function(response) {
            if (response.ok) {
                temp = response.json()
                return(temp)
            }
            throw new Error(response.error);
        })
        .catch(function(error) {
            console.log("There has been a problem with your fetch operation: ",error.message);
        })
    )
    return(temp)
};

export async function Search(input) {
    //The parameters of the call
    var JWT = sessionStorage.token
    let getParam = { method: "GET" };
    let head = { Authorization: `Bearer ${JWT}` };
    getParam.headers = head;

    //The URL
    const baseUrl = "https://cab230.hackhouse.sh/search?";
    // const query = 'offence=Weapons Act Offences - Other';
    const query = input;
    const url = baseUrl + query;

    var temp = await fetch(encodeURI(url),getParam)
        .then(function(response) {
            if (response.ok) {
                var temp = response.json()
                return temp;
            }
            throw new Error("Network response was not ok.");
        })
        .catch(function(error) {
                console.log("There has been a problem with your fetch operation: ",error.message);
        });
        return temp
}

export function removeSessionVar() {
    sessionStorage.clear();
    console.log("Session Var Removed")
}