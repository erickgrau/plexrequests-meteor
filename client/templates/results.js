Template.home.events({
    "submit .results": function (event) {
        Session.set('searchingresults', true);
        Session.set('resultsloaded', false);

        var movie = document.querySelector('input[name="movie"]:checked').nextSibling.innerHTML;
        var id = document.querySelector('input[name="movie"]:checked').id;
        var puser = Session.get("plexuser");

        if (Movies.findOne({imdb: id}) === undefined) {
            Meteor.call('searchCP', id, movie, puser, function (err, data) {
                if (err) {
                    console.log(err)
                } else if ((data === "active") || (data ==="added")) {
                    Session.set('searchingresults', false);
                    Session.set('movieadded', true);
                    Meteor.call('pushBullet', movie, puser);
                } else if (data === "downloaded") {
                    Session.set('searchingresults', false);
                    Session.set('moviedownloaded', true);
                }
            });
            return false;
        } else {
            if (Movies.findOne({imdb: id}).downloaded === true) {
                Session.set('searchingresults', false);
                Session.set('moviedownloaded', true);
                return false;
            } else {
                Session.set('searchingresults', false);
                Session.set('movieexists', true);
                return false;
            }
        return false;
        }
    }
});
