var y=document.getElementById('bck')
y.style.visibility='hidden';
var z=document.getElementById('an');

function addn()//creating a dom to add note
{

    document.getElementById('bdy').style.backgroundImage="url('/images/notec/white.jpg')"
    y.style.visibility="visible";
    z.style.visibility="hidden";

    var form=document.createElement('form');
    form.setAttribute('action',"http://localhost:3000/notes");
    form.setAttribute('method','POST');
        
        var div1=document.getElementById('div1');
        
        var labeln=document.createElement('label');
        labeln.setAttribute('for','name');
        labeln.innerHTML="Name";
        div1.appendChild(labeln);

        var inputn=document.createElement('input');
        inputn.setAttribute('name','name');
        inputn.setAttribute('id','name');
        inputn.setAttribute('type','text');   
        inputn.setAttribute('class','form-control col-sm-6');
        inputn.required=true;
        div1.appendChild(inputn);

        var hr=document.createElement('hr');
        div1.appendChild(hr);

        var labeln2=document.createElement('label');
        labeln2.setAttribute('for','ta');
        labeln2.innerHTML="TextArea";
        div1.appendChild(labeln2);

        var textar=document.createElement('textarea');
        textar.setAttribute('id','ta');
        textar.setAttribute('name','ta');
        textar.setAttribute('rows','10');
        textar.setAttribute('cols',40);
        textar.setAttribute('class','form-control');
        textar.required=true;
        div1.appendChild(textar);

        var br=document.createElement('br');
        div1.appendChild(br);

        var bt=document.createElement('button');
        bt.setAttribute('type','submit');
        bt.setAttribute('id','fsub');
        bt.setAttribute('class','btn btn-success form-control col-sm-3');
        bt.innerHTML="Submit";
        document.getElementById('f1').appendChild(bt);
       
}
function deln()//delete the dom created in adding notes
{
  document.getElementById('bdy').style.backgroundImage="url('/images/notec/black.jpg')"
    console.log("in delete function");
    for(var i=div1.childElementCount-1;i>=0;i--)
    {
        div1.removeChild(div1.childNodes[i]);
    }
    var item=document.getElementById('fsub');
    item.remove();
  
    y.style.visibility="hidden";
    z.style.visibility="visible";

}

function delnc(x)//deleting note from array in mongodb
{
    var y=x.parentNode.childNodes[1].innerHTML;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) 
      {  
        console.log('deleted succesfully');
        if(this.responseText==1)
        {  
          var dtbd=x.parentNode.parentNode;
          dtbd.remove();
          console.log(dtbd);
          delnote(); 
        }
      }
    };
    xhttp.open("GET","http://localhost:3000/notedel"+"/"+y, true);
    xhttp.send();
    
}

