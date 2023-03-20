window.onload = function () {
  document.addEventListener("submit", function (event) {
    event.preventDefault();

    var serializeForm = function (form) {
      var obj = {};
      var formData = new FormData(form);
      for (var key of formData.keys()) {
        obj[key] = formData.get(key);
      }
      return obj;
    };
    localStorage.setItem("data", JSON.stringify(serializeForm(event.target)));
    console.log(serializeForm(event.target));
    /* fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: new FormData(event.target),
    })
      .then(function (response) {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(response);
      })
      .then(function (data) {
        console.log(data);
      })
      .catch(function (error) {
        console.warn(error);
      }); */
  });

  const data = [
    "departamento de ciencia de la información",
    "departamento de letras",
    "departamento de historia",
    "departamento de filosofía",
    "departamento de geografía",
  ];
  const departamento = document.getElementById("departamento");
  const resultsHTML = document.getElementById("results");
  const checkSustanciado = document.getElementById("checkSustanciado");
  const boxFechaSustanciado = document.getElementById("boxFechaSustanciado");

  checkSustanciado.onchange = function (event) {
    if (event.target.checked) {
      boxFechaSustanciado.style.display = "grid";
    } else {
      boxFechaSustanciado.style.display = "none";
    }
  };
  departamento.oninput = function () {
    let results = [];
    const userInput = this.value;

    resultsHTML.innerHTML = "";

    if (userInput && userInput.length > 0) {
      results = getResults(userInput);
      resultsHTML.style.display = "grid";

      for (i = 0; i < results.length; i++) {
        resultsHTML.innerHTML +=
          "<li class='autocomplete-item'>" + results[i] + "</li>";
      }
    }
  };

  function getResults(input) {
    const results = [];
    for (i = 0; i < data.length; i++) {
      if (input === data[i].slice(0, input.length)) {
        results.push(data[i]);
      }
    }
    return results;
  }

  resultsHTML.onclick = function (event) {
    const setValue = event.target.innerText;
    departamento.value = setValue;
    this.innerHTML = "";
    resultsHTML.style.display = "none";
  };

  resultsHTML.onkeydown = function (event) {
    console.log(event);
    const setValue = event.target.innerText;
    departamento.value = setValue;
    this.innerHTML = "";
    resultsHTML.style.display = "none";
  };
};
