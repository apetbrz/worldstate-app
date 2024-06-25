var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/',
    (req, res, next) => {
      res.render('home');
      console.log(req.get('user-agent'));
    });

router.get('/about', (req, res, next) => {
  res.render('about');
  console.log(req.get("user-agent"));
});

router.get('/worldstate', (req, res, next) => {
  const worldstatefileurl = "http://content.warframe.com/dynamic/worldState.php";

  console.log(worldstatefileurl);

  const textData = async () => {
    let response = await fetch(worldstatefileurl).catch(console.error);
    return await response.text();
  }

  textData().then((data) => res.end(data));

});

module.exports = router;