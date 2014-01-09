
/*
 * GET home page.
 */

exports.home = function(req, res){
  res.render('index', { title: 'Buteyko Scheduler' });
};

exports.dag = function(req, res){
    res.render('dag', { title: 'Dag Overzicht' });
};

exports.week = function(req, res){
    res.render('week', { title: 'Week Overzicht' });
};

exports.grafiek = function(req, res){
    res.render('grafiek', { title: 'Grafiek' });
};

exports.reinigingsinfo = function(req, res){
    res.render('info', { title: 'Reinigings Info' });
};

exports.stopwatch = function(req, res){
    res.render('stopwatch', { title: 'Stopwatch' });
};

