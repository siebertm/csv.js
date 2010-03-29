
var CSV = function(headers) {
  var rows = [];
  var options = {
    quoteChar: '"',
    colSep: ',',
    rowSep: '\r\n'
  };

  // some helper functions
  var isArray = function(obj) {
    return !!(obj && obj.concat && obj.unshift && !obj.callee);
  };

  var specialChars = new RegExp('[' + [options.quoteChar, options.colSep, options.rowSep].join('') + ']', 'i');

  var renderRow = function(row) {
    var out = [], q = options.quoteChar, qq = q + q;

    for (var i=0; i<row.length; ++i) {
      var val = row[i];

      if(specialChars.test(val)) {
        val = q + val.replace(q, qq) + q;
      }

      out.push(val);
    }
    return out.join(options.colSep);
  };


  return {
    /**
     * adds a new row
     *
     * when the first argument is an array, it is used as the row
     * data, otherwise all arguments are used
     */
    push: function() {
      var data;

      if(arguments.length == 1 && isArray(arguments[0])) {
        data = arguments[0];
      } else {
        data = Array.prototype.slice.call(arguments);
      }

      rows.push(data);
    },

    /*
     * generates the csv string from the data
     *
     * @return String the csv formatted data
     */
    render: function() {
      var s = [];

      if(headers) {
        s.push(renderRow(headers));
      }

      for (var i=0; i<rows.length; ++i) {
        s.push(renderRow(rows[i]));
      }

      return s.join(options.rowSep);
    }
  };
};

