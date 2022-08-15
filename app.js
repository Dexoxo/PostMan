//Intially making the Parameters display none because JSON is checked default.
let paramBox = document.getElementById("paramBox");
paramBox.style.display = "none";

//Parameters displayed here.      
let paramRadio = document.getElementById("paramRadio");
paramRadio.addEventListener("click", () => {
  document.getElementById("requestJsonText").style.display = "none";
  paramBox.style.display = "block";
});

//JSON displayed here.
let jsonRadio = document.getElementById("jsonRadio");
jsonRadio.addEventListener("click", () => {
  document.getElementById("requestJsonText").style.display = "block";
  paramBox.style.display = "none";
});


function createNewDivFromString(string) {
  let div = document.createElement('div');
  div.innerHTML = string;
  return div.firstElementChild;
}

let index = 0;
let addParam = document.getElementById("addParam");
addParam.addEventListener("click", () => {
  let params = document.getElementById("params");
  let string = `<div class="row mb-2">
  <legend class="col-form-label col-sm-2 pt-0"></legend>
  <div class="col-sm-4">
      <input id="parameterKey${index+2}" type="text" class="form-control" placeholder="Parameter ${index+2} Key" aria-label="key">
  </div>
  <div class="col-sm-4">
      <input id="parameterValue${index+2}" type="text" class="form-control" placeholder="Parameter ${index+2} Value" aria-label="value">
  </div>
  <div class="col-sm-1">
      <button class="btn btn-primary deleteParam">-</button>
  </div>
    </div>`;
    let html = createNewDivFromString(string);
    params.appendChild(html);

    let deleteParam = document.getElementsByClassName('deleteParam');
    for(item of deleteParam) {
      item.addEventListener('click', (e)=>{
        e.target.parentElement.parentElement.remove();
      });
    }
    index++;
  });

let url = document.getElementById("url");
let submit = document.getElementById('submit');
submit.addEventListener('click', ()=> {
  document.getElementById('responseJsonText').innerHTML = "Please wait...";
  let requestType = document.querySelector(`input[name="requestType"]:checked`).value;
  let contentType = document.querySelector(`input[name="contentType"]:checked`).value;

  if(contentType == 'param') {
    data = {};
    for(let i=0;i<index+1;i++) {
      if(document.getElementById('parameterKey'+(i+1)) != undefined) {
        let key = document.getElementById('parameterKey'+(i+1)).value;
        let value = document.getElementById('parameterValue'+(i+1)).value;
        data[key] = value;
      }
    }
    data = JSON.stringify(data);
  }
  else {
    data = document.getElementById('requestJsonText').value;
  }

  if(requestType == "GET") {
    fetch(url, {
      method: 'GET'
    }).then(response => response.text()).then((text)=> {
      document.getElementById('responseJsonText').innerHTML = text;
    });
  }
  else {
    fetch(url, {
      method: 'POST',
      body: data,
      headers: {
        "content-type": "application/json; charset=UTF-8"
      }
    }).then(response => response.text()).then((text)=> {
      document.getElementById('responseJsonText').innerHTML = text;
    })
  }
});
