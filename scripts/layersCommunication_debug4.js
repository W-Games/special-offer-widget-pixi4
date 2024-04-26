window.addEventListener("message", (event) => {
    // if (event.origin !== "http://example.org:8080")
    //   return;
  
    console.log(event.data);
    // UpdateUnity(event.data);
  }, false);
  //p1.innerHTML = "LOADING";

  function LoadURL(url)
  {
    let frame = document.getElementById("frame");
    frame.src = url;
  }

  function UpdateUnity(data)
  {
        if (window.vuplex) {
            // The window.vuplex object already exists, so go ahead and send the message.
            SendMessageToCSharp(data);
        } else {
            // The window.vuplex object hasn't been initialized yet because the page is still
            // loading, so add an event listener to send the message once it's initialized.
            window.addEventListener('vuplexready', SendMessageToCSharp(data));
        }
   }

  function SendMessageToCSharp(data) {
    // This object passed to postMessage() automatically gets serialized as JSON
    // and is emitted via the C# MessageEmitted event. This API mimics the window.postMessage API.
    window.postMessage({ message: data });
  }

  function SendMessageToClient(message)
  {
    var p1 = document.getElementById("p1");
    p1.innerHTML = message;
    let frame = document.getElementById("frame");
    frame.contentWindow.postMessage(message, "*");
  }

  function ExitToLobby()
  {
    const jsonData = { 
      "_type": "HRD.CloseWrapper"
    }; 
    SendMessageToCSharp(JSON.stringify(jsonData));
  }









  function HideDeal()
  {
    const jsonData = { 
      "_type": "HRD.HideDeal"
    }; 
    SendMessageToCSharp(JSON.stringify(jsonData));
  }
  
  function ShowDeal()
  {
    const jsonData = { 
      "_type": "HRD.ShowDeal"
    }; 
    SendMessageToCSharp(JSON.stringify(jsonData));
  }

  function MoveDeal()
  {
    const jsonData = {
      "_type": "HRD.MoveDeal",
      "_x": 200,
      "_y": 100,
    }; 
    SendMessageToCSharp(JSON.stringify(jsonData));
  }

  var counter = 5;
  function UpdateDealTimer()
  {
    const jsonData = { 
      "_type": "HRD.UpdateTimer",
      "_time": "00:0" + counter
    }; 

    counter--;
    SendMessageToCSharp(JSON.stringify(jsonData));
  }









  // temp dev functions
  function ButtonTapped(message)
  {
    const jsonData = { 
      "_type": message
    }; 
    SendMessageToCSharp(JSON.stringify(jsonData));
  }

  function ToggleDealButton(showDeal)
  {

    let button = document.getElementById("dealButton");
    if (showDeal)
    {
      button.removeAttribute("hidden");
    }
    else
    {
      button.setAttribute("hidden", "hidden");
    }

  }

  // function UpdateDealTimer(timerString)
  // {
  //   let label = document.getElementById("timerLabel");
  //   label.textContent = timerString;
  // }