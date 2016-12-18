"use strict";
var Location = (function () {
    function Location(lat, lng, town, zipcode, canton, country) {
        this.lat = lat;
        this.lng = lng;
        this.town = town;
        this.zipcode = zipcode;
        this.canton = canton;
        this.country = country;
    }
    return Location;
}());
exports.Location = Location;
//# sourceMappingURL=location.js.map