/* eslint-disable quotes */
// Handlebars helpers
/* global stringToDate, formatCurrency, formatComma, dataSource, Handlebars:false */

/* ************************************************************* */

$(document).ready(function() {
  // launch your function here

  Array.prototype.clean = function(deleteValue) {
    for (var i = 0; i < this.length; i++) {
      if (this[i] === deleteValue) {
        this.splice(i, 1);
        i--;
      }
    }
    return this;
  };

  Handlebars.registerHelper("link", function(text, url) {
    text = Handlebars.Utils.escapeExpression(text);
    url = Handlebars.Utils.escapeExpression(url);
    // eslint-disable-next-line quotes
    // eslint-disable-next-line prettier/prettier
    var result = '<a href="' + url + '">' + text + '</a>';


    return new Handlebars.SafeString(result);
  });

  Handlebars.registerHelper("list", function(items, options) {
    var out = "<ul>";
    for (var i = 0, l = items.length; i < l; i++) {
      out = out + "<li>" + options.fn(items[i]) + "</li>";
    }

    return out + "</ul>";
  });

  Handlebars.registerHelper("init2value", function(id, str) {
    str = str.split("|");
    var html = [];
    var uid = id.toUpperCase();
    // var dataSource is defined in init-to-value.js
    for (var i = 0; i < dataSource.length; i++) {
      var obj = dataSource[i];

      if (obj.cid === id || obj.cid === uid) {
        for (var letter in str) {
          var attrName = str[letter];
          var attrValue = obj[attrName];
          // bring em all together
          html.push(attrValue);
        }
      }
    }
    // convert it to a string
    html = html.join(", ");
    html = html.replace(/(,\s){2,}/g, "").trim();
    if (html.charAt(html.length - 1) === ",") {
      html = html.substr(0, html.length - 1);
    }
    return html;
  });

  Handlebars.registerHelper("debug", function(optionalValue) {
    console.log("Current Context");
    console.log("====================");
    console.log(this);
  });

  // Insert a $ sign and comma separators
  Handlebars.registerHelper("monetize", function(str) {
    str = parseInt(str, 10);
    str = formatCurrency(str, "$");
    return str;
  });

  // Insert a $ sign and comma separators
  Handlebars.registerHelper("notempty", function(str) {
    if (str) {
      return str;
    } else {
      return "0";
    }
  });

  // Insert a comma in the appropriate spots
  Handlebars.registerHelper("commatize", function(str) {
    str = parseInt(str, 10);
    str = formatComma(str);
    return str;
  });

  // Get rid of trailing decimals
  Handlebars.registerHelper("fixed", function(str) {
    if (str) {
      str = parseInt(str, 10).toFixed(0);
      return str;
    } else {
      return "0";
    }
  });

  // Price per sq ft
  Handlebars.registerHelper("ppsf", function(str, asf) {
    str = parseInt(str, 10);
    asf = parseInt(asf, 10);
    var psf = (str / asf).toFixed(0);
    return psf;
  });

  // Convert a db date string to something like 'Mon March 5 2016'
  Handlebars.registerHelper("prettydate", function(str) {
    str = stringToDate(str);
    str = str.toLocaleDateString();
    return str;
  });

  // Convert initials to their word equivalent
  Handlebars.registerHelper("propstatus", function(str) {
    if (str === "A") {
      return "active";
    } else if (str === "S") {
      return "sold";
    } else {
      return "pending";
    }
  });

  // Compare the listing date to today to get the days on market
  Handlebars.registerHelper("cdom", function(str) {
    var now = new Date().getTime();
    str = Date.parse(str);
    str = Math.abs((now - str) / 86400000);
    return str.toFixed(0);
  });

  Handlebars.registerHelper("daysOnStroupe", function(str1, str2) {
    str1 = Date.parse(stringToDate(str1));
    str2 = Date.parse(stringToDate(str2));
    return Math.abs(
      (parseInt(str1, 10) - parseInt(str2, 10)) / 86400000
    ).toFixed(0);
  });

  // A clever way to use a comparative expression in handlebars
  Handlebars.registerHelper("compare", function(
    lvalue,
    operator,
    rvalue,
    options
  ) {
    var operators, result;
    if (arguments.length < 3) {
      throw new Error("Handlebars Helper 'compare' needs 2 parameters");
    }

    if (options === undefined) {
      options = rvalue;
      rvalue = operator;
      operator = "===";
    }

    operators = {
      "==": function(l, r) {
        return l === r;
      },
      "===": function(l, r) {
        return l === r;
      },
      "!=": function(l, r) {
        return l !== r;
      },
      "!==": function(l, r) {
        return l !== r;
      },
      "<": function(l, r) {
        return l < r;
      },
      ">": function(l, r) {
        return l > r;
      },
      "<=": function(l, r) {
        return l <= r;
      },
      ">=": function(l, r) {
        return l >= r;
      },
      typeof: function(l, r) {
        return typeof l === r;
      }
    };

    if (!operators[operator]) {
      throw new Error(
        "Handlebars Helper 'compare' doesn't know the operator " + operator
      );
    }

    result = operators[operator](lvalue, rvalue);

    if (result) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  });

  // Show an image for the listing, or a no-photo
  Handlebars.registerHelper("mainPhoto", function(mlsPhoto) {
    mlsPhoto = typeof mlsPhoto !== "undefined" ? mlsPhoto : "no-photo.png";
    var bucket = "https://s3-us-west-2.amazonaws.com/stroupenwmls/";
    return bucket + mlsPhoto;
  });
});
