// The JavaScript programming below adds functionality to the HTML 'Full Stack Conf" form

// ensures page is loaded before manipulating the DOM
$(document).ready( function() {

  // variable declarations
  let total = 0;
  const form = document.getElementsByTagName('form')[0];
  const name = document.getElementById('name');
  const email = document.getElementById('mail');
  const ccNum = document.getElementById('cc-num')
  const zipCode = document.getElementById('zip');
  const cvv = document.getElementById('cvv');
  const paymentFieldset = document.getElementsByTagName('fieldset')[3];
  const titles = document.getElementById('title');
  const designs = document.getElementById('design');
  const colorDiv = document.getElementById('colors-js-puns');
  const colors = document.getElementById('color');
  const activities = document.querySelector('.activities');
  const otherTitle = document.getElementById('other-title');
  const creditDiv = document.getElementById('credit-card');
  const paypalDiv = creditDiv.nextElementSibling;
  const bitcoinDiv = creditDiv.nextElementSibling.nextElementSibling;

  // create total payment element
  const totalDiv = document.createElement('div');
  activities.appendChild(totalDiv);

  // this function shows/hides elements
  function showHide(element, value) {
    element.style.display = value;
  }

  // marks through activity options that are at the same time as a checked option
  function disableOption (element) {
    element.style.textDecoration = "line-through";
    element.style.color = "lightslategrey";
  }

  // refreshes activity options back to orignal state
  function refreshOption (element) {
    element.style.textDecoration = "none";
    element.style.color = "#000";
  }

  // this function adds a red border to fields that aren't filled out correctly
  function showError (element) {
    element.style.border = "red solid 2px";
  }

  // this function tests whether an email follows the correct email pattern
  // copied this reg expression from stack overflow
  function validateEmail(email) {
    var reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return reg.test(String(email).toLowerCase());
  }

  // checks to make sure at least one activity checkbox is checked and shows error if not
  function validateActivities() {
    const $checkboxes = $('input[type=checkbox]:checked').length;
    if ($checkboxes === 0) {
      showError(activities);
      event.preventDefault();
    }
    if ($checkboxes > 0) {
      activities.style.border = "none";
    }
  }

  // hide other-input box at load
  showHide(otherTitle, "none");

  // hides color choices for t-shirts
  showHide(colorDiv, "none");

  // hide payment options at load
  showHide(creditDiv, "none");
  showHide(paypalDiv, "none");
  showHide(bitcoinDiv, "none");

  // sets focus on first form element when page loads
  name.focus();

  // listens for changes to the job title select elements
  // if job title is other, adds input element to add a job title
  titles.addEventListener('change', () => {
    if (titles.selectedIndex === 5) {
      showHide(otherTitle, "block");
    } else if (titles.selectedIndex < 5) {
      showHide(otherTitle, "none");
    }
  });

  // listens for changes to t-shirt designs
  // changes the available color options depending on design chosen
  designs.addEventListener('change', () => {
    showHide(colorDiv, "inline-block");
    if (designs.selectedIndex === 1) {
      colors.innerHTML = `<select id="color">
          <option value="cornflowerblue">Cornflower Blue (JS Puns shirt only)</option>
          <option value="darkslategrey">Dark Slate Grey (JS Puns shirt only)</option>
          <option value="gold">Gold (JS Puns shirt only)</option>
        </select>`;
    } else if (designs.selectedIndex === 2) {
      colors.innerHTML = `<select id="color">
        <option value="tomato">Tomato (I &#9829; JS shirt only)</option>
        <option value="steelblue">Steel Blue (I &#9829; JS shirt only)</option>
        <option value="dimgrey">Dim Grey (I &#9829; JS shirt only)</option>
      </select>`;
    } else {
      colors.innerHTML = `<select id="color">
        <option value="default">Please select a T-shirt Theme</option>
      </select>`;
    }
  });

  // listens for changes to the checkboxes and disables options that have competing times
  // and also calculates the total cost of the chosen activities
  activities.addEventListener('click', () => {
    total = 0;
    const activityInputs = document.querySelectorAll('.activities input');
    const activityLabels = document.querySelectorAll('.activities label');
    const frameworks = activityLabels[1];
    const libraries = activityLabels[2];
    const express = activityLabels[3];
    const nodeJS = activityLabels[4];

    for (let i = 0; i < activityInputs.length; i++) {
      if (activityInputs[i].checked) {
        if (activityInputs[i].name === "all") {
          total += 200;
        }
        if (activityInputs[i].name === "js-frameworks") {
          total += 100;
        }
        if (activityInputs[i].name === "js-libs") {
          total += 100;
        }
        if (activityInputs[i].name === "express") {
          total += 100;
        }
        if (activityInputs[i].name === "node") {
          total += 100;
        }
        if (activityInputs[i].name === "build-tools") {
          total += 100;
        }
        if (activityInputs[i].name === "npm") {
          total += 100;
        }
      }
        // this section of the event listener manages the workshop time slot options
        const frameworksSelected = document.querySelector('input[name="js-frameworks"]').checked;
        const expressSelected = document.querySelector('input[name="express"]').checked;
        const librariesSelected = document.querySelector('input[name="js-libs"]').checked;
        const nodeJSSelected = document.querySelector('input[name="node"]').checked;
        if (frameworksSelected) {
          disableOption(express);
          activityInputs[3].disabled = true;
        } else if (expressSelected) {
          disableOption(frameworks);
          activityInputs[1].disabled = true;
        }
        if (librariesSelected) {
          disableOption(nodeJS);
          activityInputs[4].disabled = true;
        } else if (nodeJSSelected) {
          disableOption(libraries);
          activityInputs[2].disabled = true;
        }
        if (frameworksSelected === false && expressSelected === false) {
          refreshOption(frameworks);
          refreshOption(express);
          activityInputs[3].disabled = false;
          activityInputs[1].disabled = false;
        }
        if (librariesSelected === false && nodeJSSelected === false) {
          refreshOption(libraries);
          refreshOption(nodeJS);
          activityInputs[2].disabled = false;
          activityInputs[4].disabled = false;
        }
      }
      totalDiv.innerHTML = `<p><strong>Total: $${total}</strong> </p>`
  });

  // listens for selections in the payment info section
  paymentFieldset.addEventListener('change', () => {
    const paymentOptions = document.getElementById('payment');
    paymentOptions[0].disabled = true;
    if (paymentOptions.selectedIndex === 1) {
      showHide(creditDiv, "block");
      showHide(paypalDiv, "none");
      showHide(bitcoinDiv, "none");
    } else if (paymentOptions.selectedIndex === 2) {
      showHide(creditDiv, "none");
      showHide(paypalDiv, "block");
      showHide(bitcoinDiv, "none");
    } else if (paymentOptions.selectedIndex === 3) {
      showHide(creditDiv, "none");
      showHide(paypalDiv, "none");
      showHide(bitcoinDiv, "block");
    }
  });

  // form validation
  form.addEventListener("submit", function (event) {
    // variable declarations
    let test = validateEmail(email.value);
    const activityInputs = document.querySelectorAll('.activities input');
    const paymentOptions = document.getElementById('payment');

    if (name.value.length === 0 || name.value.length < 2) {
      showError(name);
      event.preventDefault();
    } else if (name.value.length >= 2) {
      name.style.border = "none";
    }
    if (test === false || email.value.length === 0) {
      showError(email);
      event.preventDefault();
    } else if (test) {
      email.style.border = "none";
    }
    // calls a function to see whether at least one activity checkbox is checked
    validateActivities();

    if (paymentOptions.selectedIndex === 0) {
      showError(paymentOptions);
      event.preventDefault();
    } else {
      paymentOptions.style.border = "none";
    }

    // only checks credit card fields if payment option is credit card
    if (paymentOptions.selectedIndex === 1) {
      if (ccNum.value.length < 13 || ccNum.value.length > 16) {
        showError(ccNum);
        event.preventDefault();
        }
        if (ccNum.value.length >= 13 && ccNum.value.length <= 16) {
          ccNum.style.border = "none";
        }
        if (zipCode.value.length !== 5) {
          showError(zipCode);
          event.preventDefault();
        }
        if (zipCode.value.length === 5) {
          zipCode.style.border = "none";
        }
        if (cvv.value.length !== 3) {
          showError(cvv);
          event.preventDefault();
        }
        if (cvv.value.length === 3) {
          cvv.style.border = "none";
        }
    }
  });
});
