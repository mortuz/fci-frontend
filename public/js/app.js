(function($){
  var fetchingData = false;
  $('.gain-loss-switch').find('.nav-item').on('click', function (e) {
    e.preventDefault();
    if (fetchingData) return;
    var navLink = $(this).find('.nav-link');
    $(this).parent().find('.active').removeClass('active');
    navLink.addClass('active');
    var action = navLink.attr('data-action');

    if (action == 'topGainers') {
      topGainers();
      $('.gain-loss-status').addClass('text-success').html('Gain');
      $('.gain-loss-status').removeClass('text-danger');

    } else {
      topLosers();
      $('.gain-loss-status').addClass('text-danger').html('Loss');
      $('.gain-loss-status').removeClass('text-success');
    }
    console.log(action)
  });
  
  var topGainers = function () {
    fetchingData = true;
    //fetch top gainers
    $.ajax({
      url: 'https://cors-anywhere.herokuapp.com/https://www.nseindia.com/live_market/dynaContent/live_analysis/gainers/niftyGainers1.json',
      success: function (data) {
        console.log(JSON.parse(data))
        data = JSON.parse(data);
        var html = '';
        for (let i = 0; i < 5; i++) {
          const stock = data.data[i];
          html += `
        <tr>
          <td>${stock.symbol}</td>
          <td>${stock.ltp}</td>
          <td class="text-success">${stock.netPrice}</td>
        </tr>
        `;
        }

        $('.loss-gain').html(html);
        fetchingData = false;
      },
      error: function (err) {
        console.log("TOP GAINERS FETCH ERR!", err);
        fetchingData = false;
      }
    })
  };

  var topLosers = function () {
    fetchingData = true;
    // fetch top losers
    $.ajax({
      url: 'https://cors-anywhere.herokuapp.com/https://www.nseindia.com/live_market/dynaContent/live_analysis/losers/niftyLosers1.json',
      success: function (data) {
        console.log(JSON.parse(data))
        data = JSON.parse(data);
        var html = '';
        for (let i = 0; i < 5; i++) {
          const stock = data.data[i];
          html += `
        <tr>
          <td>${stock.symbol}</td>
          <td>${stock.ltp}</td>
          <td class="text-danger">${stock.netPrice}</td>
        </tr>
        `;
        }

        $('.loss-gain').html(html);
        fetchingData = false;
      },
      error: function (err) {
        console.log("TOP LOSERS FETCH ERR!", err);
        fetchingData = false;
      }
    })
  };

  //fetch latest news
  var fetchLatestNews = function() {
    $.ajax({
      url: 'https://cors-anywhere.herokuapp.com/http://www.moneycontrol.com/rss/latestnews.xml',
      method: "GET",
      success: function (data) {

        $xml = $(data);

        var html = '';

        html += '<div class="pl-0">';
        var items = $xml.find('item');

        for (let i = 0; i < 8; ) {
          var item = $(items[i]);
          var title = item.find('title').html()
          html += `
            <p class="mb-3">${++i}. ${title.split('#39;').join("\'")}</p>
          `;
          const it = items[i];          
        }
        html += '</div>';

        $('.news-area').html(html);
        
      },
      error: function (err) {
        console.error("Latest News Err!", err);
      }
    });
  };

  var fetchGlobalMarket = function() {
    $.ajax({
      url: 'https://cors-anywhere.herokuapp.com/http://www.moneycontrol.com/mccode/markets/hotstocks/mkt_world.json',
      success: function(data) {
        data = JSON.parse(data);

        var html = '';
        var filter = ["Nasdaq", "Nikkei 225", "Hang Seng", "FTSE", "DAX", "Straits Times"];
        var i = 0;
        data.forEach(function(item) {
          var name = item.Index_Name.match(/<a [^>]+>([^<]+)<\/a>/)[1];
          var latestPrice = item.LP;
          var change = item.Change;
          var color = item.Color;
          if (filter.indexOf(name) === -1) return;
          i++;
          html += `
            <table class="gm-table ${i%2 == 0 ? "even": "odd"}">
              <tr>
                <td valign="middle">${name} <br> ${latestPrice} <span style="color: ${color == '#cc0000' ? '#ff4136' : color }; margin-left: 15px">${color == "#009f00" ? "<i class='fa fa-caret-up fa-2x'></i>" : "<i class='fa fa-caret-down fa-2x'></i>"}</span><br>
                <span style="color: ${color == '#cc0000' ? '#ff4136' : color }">${change}(${(parseInt(change)/parseInt(latestPrice)*100).toFixed(2)}%)
                </span>
              </td>
              </tr>
            </table>
          `;
        })

        $('.js-marget-nav').html(html);
      },
      error: function(err) {
        console.log("Fetch global market err!", err);
      }
    })
  };

  var fetchNIFTY= function() {
    $.ajax({
      url: "https://cors-anywhere.herokuapp.com/https://priceapi.moneycontrol.com/pricefeed/notapplicable/inidicesindia/in%3BNSX",
      success: function(data) {
        data = data.data;
        console.log(data);

        var html = `
          <li class="nav-item text-center"><span class="text-primary">${data.company}</span> <br>
            <span>${data.pricecurrent}</span> <i class="fa fa-caret-${data.pricechange.indexOf('-') === -1 ? "up text-success" : "down text-danger"}"></i>
            <span class="${data.pricechange.indexOf('-') === -1 ? "text-success" : "text-danger"}">${data.pricechange} (${data.PERCCHANGE}%)</span>
          </li>
        `;
        
        $('.js-bottom-nav').append(html);
      },
      error: function(err) {
        console.error('NIFTY fetch Err!', err);
      }
    })
  }
  
  var fetchSENSEX = function () {
    $.ajax({
      url: "https://cors-anywhere.herokuapp.com/https://priceapi.moneycontrol.com/pricefeed/notapplicable/inidicesindia/in%3BSEN",
      success: function (data) {
        data = data.data;
        console.log(data);

        var html = `
          <li class="nav-item text-center"><span class="text-primary">${data.company}</span> <br>
            <span>${data.pricecurrent}</span> <i class="fa fa-caret-${data.pricechange.indexOf('-') === -1 ? "up text-success" : "down text-danger"}"></i>
            <span class="${data.pricechange.indexOf('-') === -1 ? "text-success" : "text-danger"}">${data.pricechange} (${data.PERCCHANGE}%)</span>
          </li>
        `;

        $('.js-bottom-nav').append(html);
      },
      error: function (err) {
        console.error('NIFTY fetch Err!', err);
      }
    })
  }

  var fetchLiveData = function() {
    $.ajax({
      url: "https://cors-anywhere.herokuapp.com/https://www.moneycontrol.com/stocks/marketstats/bse-mostactive-stocks/all-companies-97/",
      success: function(data) {
        var $table = $(data).find('.bsr_table').find('table').first();
        var tbody = $table.find('tbody');
        var rows = tbody.find('tr');
        // console.log('rows', rows);

        var html = '';

        for (let i = 0; i < 50; i++) {
          const row = rows[i];

          var tableData = $(row).find('td');

          var name = $(tableData[0]).find('.disin a').first().text();
          var high = $(tableData[2]).text();
          var low = $(tableData[3]).text();
          var last = $(tableData[4]).text();
          var change = $(tableData[5]).text();
          var value = $(tableData[6]).text();

          if(!name) continue;
          
          html += `
          <tr>
            <td>${name}</td>
            <td>${high}</td>
            <td>${low}</td>
            <td class="${change.indexOf('-') === -1 ? "text-success" : "text-danger"}">${last}</td>
            <td class="${change.indexOf('-') === -1 ? "text-success" : "text-danger"}">${change}</td>
            <td>${value}</td>
          </tr>
          `;

        }

        $('.ticker-body').html(html);

      },
      error: function(err) {
        console.error(err);
      }
    })
  }

  // run functions every second
  setInterval(function() {
    ticking();
  }, 10000);
  
  var ticking = function () {
    fetchLiveData();
    fetchGlobalMarket();
  }
  ticking();
  
  fetchLatestNews();
  topGainers();
  fetchNIFTY();
  fetchSENSEX();

  $('#contact-form').validate({
    // debug: true,
    rules: {
      name: {
        required: true,
        minlength: 3
      },
      email: {
        required: true,
        email: true
      },
      phone: {
        required: true,
        digits: true,
        minlength: 10
      },
      message: {
        required: true,
        minlength: 5
      }
    },
    messages: {
      name: {
        required: "Please enter your name",
        minlength: "Minimum 3 characters"
      },
      email: {
        required: "Email address is required",
        email: "Invalid email address"
      },
      phone: {
        required: "Phone number is required",
        digits: "Invalid phone number",
        minlength: "Phone number is too short"
      },
      message: {
        required: "Message is required",
        minlength: "Message is very short"
      }
    },
    submitHandler: function (form) {
      $(form).ajaxSubmit({ 
        // url: '/fci/public/send',
        url: '/send',
        type: 'post',
        dataType: 'json',
        success: function(data) {
          // console.log(data);
          $('#feedback').html('Thanks! We will contact you soon.')
          $("#contact-form").find("input[type=text],input[type=email], textarea").val("");
        },
        error: function(err){
          $('#err-feedback').html('Sorry! we are unable to submit your form at this moment.')
          $("#contact-form").find("input[type=text],input[type=email], textarea").val("");
        }
       });
    }
  });

  $('#reg-btn').on('click', function(e){
    var email = $('#registration-email').val();
    console.log(email);

    if (isEmailValid(email)) {
      $.ajax({
        // url: '/fci/public/subscribe',
        url: '/subscribe',
        data: {email: email},
        type: 'post',
        success: function (data) {
          console.log(data);
          $('#feedback').html('<p class="text-success">Thanks you for subscribing.</p>')
          $("#registration-email").val("");
        },
        error: function (err) {
          console.log(err);
          $('#feedback').html('<p class="text-danger">Error! Try again letter.</p>')
          $("#registration-email").val("");
        }
      });
    } else {
      $('#feedback').html('<p class="text-danger">Invalid email address.</p>')
      $("#registeration-form").find("input[type=email]").val("");
    }
    

  })


  function isEmailValid(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

})(jQuery)