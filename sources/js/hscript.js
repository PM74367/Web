function loadDoc(url,cb) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) 
      {  
        cb(this);
      }
    };
    xhttp.open("GET",url, true);
    xhttp.send();
  }

  function signup(xhttp)//to load signup page
  {
    var x=document.getElementById("right");
       x.remove;
       x.innerHTML=xhttp.responseText;
       x.style.backgroundColor="2e9cca";
  }

  function back(xhttp)//to load page after clicking on back
  {
    var x=document.getElementById("right");
    x.remove;
    x.innerHTML=xhttp.responseText;
    x.style.backgroundColor="#14A76C";
  }

  