import { DateTime } from 'luxon';
// Frequency specifies the smallest interval that can repeat
export var TimeUnit;
(function (TimeUnit) {
    TimeUnit[TimeUnit["Millisecond"] = 100] = "Millisecond";
    TimeUnit[TimeUnit["Second"] = 90] = "Second";
    TimeUnit[TimeUnit["Minute"] = 80] = "Minute";
    TimeUnit[TimeUnit["Hour"] = 70] = "Hour";
    TimeUnit[TimeUnit["Day"] = 60] = "Day";
    TimeUnit[TimeUnit["Week"] = 50] = "Week";
    TimeUnit[TimeUnit["Month"] = 40] = "Month";
    TimeUnit[TimeUnit["Year"] = 30] = "Year";
    TimeUnit[TimeUnit["Decade"] = 20] = "Decade";
    TimeUnit[TimeUnit["Century"] = 10] = "Century";
    TimeUnit[TimeUnit["Millenium"] = 0] = "Millenium";
})(TimeUnit || (TimeUnit = {}));
export var DateTimePartK;
(function (DateTimePartK) {
    DateTimePartK[DateTimePartK["Milli"] = 1] = "Milli";
    DateTimePartK[DateTimePartK["Sec"] = 2] = "Sec";
    DateTimePartK[DateTimePartK["Min"] = 3] = "Min";
    DateTimePartK[DateTimePartK["Hour"] = 4] = "Hour";
    DateTimePartK[DateTimePartK["DayOfWeek"] = 5] = "DayOfWeek";
    DateTimePartK[DateTimePartK["DayOfMonth"] = 6] = "DayOfMonth";
    DateTimePartK[DateTimePartK["DayOfYear"] = 7] = "DayOfYear";
    DateTimePartK[DateTimePartK["WeekOfMonth"] = 8] = "WeekOfMonth";
    DateTimePartK[DateTimePartK["WeekOfYear"] = 9] = "WeekOfYear";
    DateTimePartK[DateTimePartK["Month"] = 10] = "Month";
    DateTimePartK[DateTimePartK["Year"] = 11] = "Year";
    DateTimePartK[DateTimePartK["Decade"] = 12] = "Decade";
    DateTimePartK[DateTimePartK["Century"] = 13] = "Century";
    DateTimePartK[DateTimePartK["Millenium"] = 14] = "Millenium";
})(DateTimePartK || (DateTimePartK = {}));
export var DateTimePartVDayOfWeek;
(function (DateTimePartVDayOfWeek) {
    DateTimePartVDayOfWeek[DateTimePartVDayOfWeek["Mo"] = 1] = "Mo";
    DateTimePartVDayOfWeek[DateTimePartVDayOfWeek["Tu"] = 2] = "Tu";
    DateTimePartVDayOfWeek[DateTimePartVDayOfWeek["We"] = 3] = "We";
    DateTimePartVDayOfWeek[DateTimePartVDayOfWeek["Th"] = 4] = "Th";
    DateTimePartVDayOfWeek[DateTimePartVDayOfWeek["Fr"] = 5] = "Fr";
    DateTimePartVDayOfWeek[DateTimePartVDayOfWeek["Sa"] = 6] = "Sa";
    DateTimePartVDayOfWeek[DateTimePartVDayOfWeek["Su"] = 7] = "Su";
})(DateTimePartVDayOfWeek || (DateTimePartVDayOfWeek = {}));
export class Rule {
    constructor(conf) {
        this.conf = conf;
    }
    match(candidate) {
        var iso = candidate.toISO();
        var candidatePart;
        switch (this.conf.timePart) {
            case DateTimePartK.Sec:
                candidatePart = candidate.second;
                break;
            case DateTimePartK.Min:
                candidatePart = candidate.minute;
                break;
            case DateTimePartK.Hour:
                candidatePart = candidate.hour;
                break;
            case DateTimePartK.DayOfWeek:
                candidatePart = candidate.weekday;
                break;
            case DateTimePartK.DayOfMonth:
                candidatePart = candidate.day;
                break;
            case DateTimePartK.DayOfYear:
                candidatePart = candidate.ordinal;
                break;
            case DateTimePartK.WeekOfMonth:
                var startOfMonth = candidate.set({ day: 0, hour: 0, minute: 0, second: 0 });
                candidatePart = candidate.weekNumber - startOfMonth.weekNumber;
                if (candidatePart < 0)
                    candidatePart += startOfMonth.weeksInWeekYear;
                break;
            case DateTimePartK.WeekOfYear:
                candidatePart = candidate.weekNumber;
                break;
            case DateTimePartK.Year:
                candidatePart = candidate.year;
                break;
            case DateTimePartK.Decade:
                candidatePart = candidate.year % 100;
                candidatePart %= 10;
                break;
            case DateTimePartK.Century:
                candidatePart = candidate.year % 1000;
                candidatePart %= 100;
                break;
        }
        var whiteListOK = this.conf.whiteList ? this.conf.whiteList.includes(candidatePart) : true;
        var blackListOK = this.conf.blackList ? !this.conf.blackList.includes(candidatePart) : true;
        return whiteListOK && blackListOK;
    }
}
export class Recurrence {
    constructor(conf) {
        this.conf = conf;
        this.rules = [];
        for (var ruleConf of this.conf.rules)
            this.rules.push(new Rule(ruleConf));
    }
    occurrences(startMs, endMs) {
        return new Iterator(this, startMs, endMs);
    }
}
export class Iterator {
    constructor(schedule, startMs, endMs) {
        this.schedule = schedule;
        this.startMs = startMs;
        this.endMs = endMs;
        this.runawayThreshold = 10000;
        if (this.startMs == null)
            this.startMs = new Date().valueOf();
        this.reset();
    }
    reset() {
        this.runawayCount = 0;
        this.candidate = DateTime.fromMillis(this.startMs).setZone(`UTC-${this.schedule.conf.utcOffset}`);
        var freq = this.schedule.conf.frequency;
        if (freq == TimeUnit.Second)
            this.candidate = this.candidate.startOf("second");
        else if (freq == TimeUnit.Minute)
            this.candidate = this.candidate.startOf("minute");
        else if (freq == TimeUnit.Hour)
            this.candidate = this.candidate.startOf("hour");
        else if (freq == TimeUnit.Day)
            this.candidate = this.candidate.startOf("day");
        else
            throw "frequency cannot be less than day";
    }
    advance() {
        this.runawayCount++;
        if (this.runawayCount >= this.runawayThreshold)
            throw "runaway iteration";
        var millis = this.candidate.toMillis();
        var freq = this.schedule.conf.frequency;
        if (freq == TimeUnit.Second)
            this.candidate = DateTime.fromMillis(millis + 1000).setZone(`UTC-${this.schedule.conf.utcOffset}`);
        else if (freq == TimeUnit.Minute)
            this.candidate = DateTime.fromMillis(millis + 1000 * 60).setZone(`UTC-${this.schedule.conf.utcOffset}`);
        else if (freq == TimeUnit.Hour)
            this.candidate = DateTime.fromMillis(millis + 1000 * 60 * 60).setZone(`UTC-${this.schedule.conf.utcOffset}`);
        else if (freq == TimeUnit.Day)
            this.candidate = DateTime.fromMillis(millis + 1000 * 60 * 60 * 24).setZone(`UTC-${this.schedule.conf.utcOffset}`);
        else
            throw "invalid.frequency";
    }
    match() {
        for (var rule of this.schedule.rules)
            if (!rule.match(this.candidate))
                return false;
        return true;
    }
    next() {
        while (true) {
            if (this.match()) {
                var winner = this.candidate;
                this.advance();
                return winner;
            }
            this.advance();
        }
    }
}
//# sourceMappingURL=Main.js.map