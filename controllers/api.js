// Display the apis
exports.timestamp = function(req, res, next) {
    let y = Date.parse(req.params['date_string']);
    if (isNaN(y)){
      // unix timecode passed in
      let utcD = new Date(parseInt(req.params['date_string']));
      console.log(utcD);
      if (utcD == "Invalid Date"){
        res.send({ error: "Invalid Date"});    
      } else {
        res.send({ unix: parseInt(req.params['date_string']), utc: utcD.toUTCString()});
      }
    } else {
      // utc timecode passed in
      let utcD = new Date(req.params['date_string']);
      if (y == "Invalid Date"){
        res.send({ error: y});    
      } else {
        res.send({ unix: utcD.getTime(), utc: utcD.toUTCString()});
      }
    }
};  
