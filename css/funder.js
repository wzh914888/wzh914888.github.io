(function() {
  function embed () {
    var evt = new Event('codefund');
    var uplift = {};

    function trackUplift() {
      try {
        var url = 'https://codefund.app/impressions/e2312d0b-353f-4c69-a5d5-a12e3696d1be/uplift?advertiser_id=160';
        console.log('CodeFund is recording uplift. ' + url);
        var xhr = new XMLHttpRequest();
        xhr.open('POST', url);
        xhr.send();
      } catch (e) {
        console.log('CodeFund was unable to record uplift! ' + e.message);
      }
    };

    function verifyUplift() {
      if (uplift.pixel1 === undefined || uplift.pixel2 === undefined) { return; }
      if (uplift.pixel1 && !uplift.pixel2) { trackUplift(); }
    }

    function detectUplift(count) {
      var url = 'https://cdn2.codefund.app/assets/px.js';
      if (url.length === 0) { return; }
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          if (xhr.status >= 200 && xhr.status < 300) {
            if (count === 1) { detectUplift(2); }
            uplift['pixel' + count] = true;
          } else {
            uplift['pixel' + count] = false;
          }
          verifyUplift();
        }
      };
      xhr.open('GET', url + '?ch=' + count + '&rnd=' + Math.random() * 11);
      xhr.send();
    }

    try {
      var targetElement = document.getElementById('codefund');
      if (targetElement == null) { targetElement = document.getElementById('codefund_ad'); }
      targetElement.innerHTML = '<div id="cf" style="max-width: 330px; margin: 0 auto;"> <div class="cf-wrapper" style="display: block; overflow: hidden; font-size: 14px; line-height: 1.4; font-family: Helvetica; padding: 15px;" align="left"> <div class="clearfix" style="overflow: auto;"> <a data-href="campaign_url" class="cf-img-wrapper" target="_blank" rel="nofollow noopener" style="box-shadow: none !important; float: left; margin-right: 15px;"> <img class="cf-img" src="https://cdn2.codefund.app/ZxH6kzWzpZvCTjU6GpFbUi2Q" style="vertical-align: middle; max-width: 130px; border: none;"> </a> <a data-href="campaign_url" class="cf-text" target="_blank" rel="nofollow noopener" style="box-shadow: none !important; color: #333; text-decoration: none;"> <strong>New: DigitalOcean Marketplace</strong> <span>Deploy your favorite dev tools with 1-Click Apps</span> </a> </div> <a href="https://codefund.app" data-target="powered_by_url" class="cf-powered-by" target="_blank" rel="nofollow noopener" style="box-shadow: none !important; margin-top: 8px; background-color: hsla(0, 0%, 0%, 0.05); text-align: center; display: block; font-size: 9px; font-weight: 400; letter-spacing: 0.5px; line-height: 2.2; text-transform: uppercase; color: hsla(0, 0%, 0%, 0.8); text-decoration: none; padding: 10px auto;"> <em>ethical</em> ad by CodeFund <img data-src="impression_url"> </a> </div> </div> <style>#cf .clearfix::after { content: ""; clear: both; display: table; } </style>';
      targetElement.querySelector('img[data-src="impression_url"]').src = 'https://codefund.app/display/e2312d0b-353f-4c69-a5d5-a12e3696d1be.gif?template=docsify&theme=light';
      targetElement.querySelectorAll('a[data-href="campaign_url"]').forEach(function (a) { a.href = 'https://codefund.app/impressions/e2312d0b-353f-4c69-a5d5-a12e3696d1be/click?campaign_id=236'; });
      targetElement.querySelector('a[data-target="powered_by_url"]').href = 'https://codefund.app/invite/aaq8ITeum7E';
      evt.detail = { status: 'ok', house: false };
      detectUplift(1);
    } catch (e) {
      console.log('CodeFund detected an error! Please verify an element exists with id="codefund". ' + e.message);
      evt.detail = { status: 'error', message: e.message };
    }
    document.removeEventListener('DOMContentLoaded', embed);
    window.dispatchEvent(evt);
  };
  (document.readyState === 'loading') ? document.addEventListener('DOMContentLoaded', embed) : embed();
})();
