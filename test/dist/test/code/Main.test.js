import { install as installSourceMapSupport } from 'source-map-support';
installSourceMapSupport();
import mocha from 'mocha';
const { before, describe, it, after, beforeEach } = mocha;
import chai from 'chai';
const { expect } = chai;
import { DateTime } from 'luxon';
import { Recurrence, TimeUnit, DateTimePartK, DateTimePartVDayOfWeek } from '../../module/code/Main.js';
it('test recurrence for sundays', () => {
    var bidenDay = DateTime.fromISO("2020-11-07T23:27:00.213Z");
    // Every sunday
    var sundaysAfterBidenDay = [
        "2020-11-08T00:00:00.000-07:00",
        "2020-11-15T00:00:00.000-07:00",
        "2020-11-22T00:00:00.000-07:00",
        "2020-11-29T00:00:00.000-07:00",
        "2020-12-06T00:00:00.000-07:00",
        "2020-12-13T00:00:00.000-07:00",
        "2020-12-20T00:00:00.000-07:00",
        "2020-12-27T00:00:00.000-07:00",
        "2021-01-03T00:00:00.000-07:00",
        "2021-01-10T00:00:00.000-07:00",
    ];
    var sundays = new Recurrence({
        frequency: TimeUnit.Day,
        rules: [{ timePart: DateTimePartK.DayOfWeek, whiteList: [DateTimePartVDayOfWeek.Su] }],
        utcOffset: 7
    });
    var occurrences = sundays.occurrences(bidenDay.toMillis(), null);
    for (var i = 0; i < 10; i++) {
        var occurrence = occurrences.next().toISO();
        expect(occurrence).to.equal(sundaysAfterBidenDay[i]);
    }
    // Every other sunday
    var everyOtherSundayAfterBidenDay = [
        "2020-11-15T00:00:00.000-07:00",
        "2020-12-06T00:00:00.000-07:00",
        "2020-12-20T00:00:00.000-07:00",
        "2021-01-03T00:00:00.000-07:00",
        "2021-01-17T00:00:00.000-07:00",
    ];
    var sundays = new Recurrence({
        frequency: TimeUnit.Day,
        rules: [
            { timePart: DateTimePartK.DayOfWeek, whiteList: [DateTimePartVDayOfWeek.Su] },
            { timePart: DateTimePartK.WeekOfMonth, whiteList: [0, 2] }
        ],
        utcOffset: 7
    });
    var occurrences = sundays.occurrences(bidenDay.toMillis(), null);
    for (var i = 0; i < 5; i++) {
        var occurrence = occurrences.next().toISO();
        expect(occurrence).to.equal(everyOtherSundayAfterBidenDay[i]);
    }
});
//# sourceMappingURL=Main.test.js.map