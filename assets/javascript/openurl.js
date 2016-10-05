/*

TODO

On submit take form fields and turn into open URL

*/

var openurl = function(settings) {
  var settings = {
    base_url: 'https://dev.www.lib.umich.edu/testapp/mgetit/resolve',
    referrer_id: 'https://dev.www.lib.umich.edu'
  }

  var create = function(query_string_hash) {
    if (query_string_hash == undefined) {
      throw "openurl create missing query string hash"
    }

    return settings.base_url
                + '?'
                + create_query_strings().generate(query_string_hash)
  }

  var get_format_query = function(type) {
    switch (type) {
      case 'journal':
        return 'rft_val_fmt=info:ofi/fmt:kev:mtx:journal'
      case 'book':
        return 'rft_val_fmt=info:ofi/fmt:kev:mtx:book'
    }
  }

  return {
    create: create
  }
}

var create_query_strings = function() {
  var create_query_string = function(value) {
    if (value.key == undefined) {
      throw "query string missing key"
    }

    if (value.value == undefined) {
      throw "query string missing value"
    }

    return '&' + escape(value.key) + '=' + escape(value.value)
  }

  /*
    Example

    query_string_hash = [
      {
        key: "title",
        value: "Hello World"
      }
    ]
  */
  var generate = function(query_string_hash) {
    return _.reduce(query_string_hash, function(base, value) {
      return base = base + create_query_string(value)
    }, '')
  }

  var escape = function(string) {
    var temp_element = document.createElement('div');
    temp_element.appendChild(document.createTextNode(string));

    return temp_element.innerHTML;
  };

  return {
    generate: generate
  }
}
