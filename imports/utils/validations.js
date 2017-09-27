export default {
  mandatory: function(field) {
    return field ? true : false;
  },

  isTextOnly: function(value) {
    let filter = /^[a-zA-Z]+$/;
    if (filter.test(value)) {
      return true;
    }
    return false;
  },

  isString: function(value) {
    let filter = /[a-zA-Z]+/;
    if (filter.test(value)) {
      return true;
    }
    return false;
  },

  isNumber: function(number) {
    if (Number(number)) {
      return true;
    } else {
      return 'Please enter a valid Number';
    }
  },

  isValidLength: function(value, len) {
    let dLength = value.length;
    if (dLength > len) {
      return false;
    } else {
      return true;
    }
  },

  isAdult: function(dateString) {
    let today = new Date();
    let birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age > 17 ? true : false;
  },

  email: function(email) {
    let filter = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (filter.test(email)) {
      return true;
    } else {
      return 'Please fill a valid email id';
    }
  },

  isUrl: function(url) {
    let expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&`/``/`=]*)?/gi;
    let regex = new RegExp(expression);
    if (url.match(regex)) {
      return true;
    } else {
      return false;
    }
  },

  isPhoneNo: function(mobile) {
    // return (mobile.match(/^\d{10,15}$/));
    if (mobile.match(/^\d{7,25}$/)) {
      return 'Please fill a valid phone number';
    } else {
      return false;
    }
  },

  password: function(password) {
    let expression = /^(?=.*[A-Za-z])(?=.*[0-9])[A-Za-z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,14}$/;
    let regex = new RegExp(expression);
    if (password.length > 14) {
      return 'Max length is 14';
    } else if (!expression.test(password) || password.length < 8) {
      return 'Password must contain atleast 8 characters, including letters and numbers.';
    } else {
      return true;
    }
  },

  fullName: function(fullName) {
    // checks if fullName contains special character
    let format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    if (format.test(fullName)) {
      return 'Special characters are not allowed in fullname';
    } else {
      return true;
    }
  },
};

export function checkFields(objRecieved, fieldsTocheck) {
  for (let i = 0; i <= fieldsTocheck.length - 1; i++) {
    if (!objRecieved.hasOwnProperty(fieldsTocheck[i]) || !objRecieved[fieldsTocheck[i]].length) {
      return `Please enter your ${fieldsTocheck[i]}`;
    }
  }

  return false;
}

export function validate(valObj) {
  for (let each in valObj) {
    if (validations.hasOwnProperty(each)) {
      if (validations[each](valObj[each]) !== true) {
        return validations[each](valObj[each]);
      }
    }
  }
}

String.prototype.capitalizeFirstLetter = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};
