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
export var TimePart;
(function (TimePart) {
    TimePart[TimePart["Millisecond"] = 100] = "Millisecond";
    TimePart[TimePart["Second"] = 90] = "Second";
    TimePart[TimePart["Minute"] = 80] = "Minute";
    TimePart[TimePart["Hour"] = 70] = "Hour";
    TimePart[TimePart["DayOfWeek"] = 5060] = "DayOfWeek";
    TimePart[TimePart["DayOfMonth"] = 4060] = "DayOfMonth";
    TimePart[TimePart["DayOfYear"] = 3060] = "DayOfYear";
    TimePart[TimePart["WeekOfMonth"] = 4050] = "WeekOfMonth";
    TimePart[TimePart["WeekOfYear"] = 3050] = "WeekOfYear";
    TimePart[TimePart["Month"] = 40] = "Month";
    TimePart[TimePart["Year"] = 30] = "Year";
    TimePart[TimePart["Decade"] = 20] = "Decade";
    TimePart[TimePart["Century"] = 10] = "Century";
    TimePart[TimePart["Millenium"] = 0] = "Millenium";
})(TimePart || (TimePart = {}));
export class Rule {
    constructor(conf) {
        this.conf = conf;
    }
    matches(candidate) {
        var candidatePart;
        switch (this.conf.timePart) {
            case TimePart.Millisecond:
                candidatePart = candidate.millisecond;
                break;
            case TimePart.Second:
                candidatePart = candidate.second;
                break;
            case TimePart.Minute:
                candidatePart = candidate.minute;
                break;
            case TimePart.Hour:
                candidatePart = candidate.hour;
                break;
            case TimePart.DayOfWeek:
                candidatePart = candidate.weekday;
                break;
            case TimePart.DayOfMonth:
                candidatePart = candidate.day;
                break;
            case TimePart.DayOfYear:
                candidatePart = candidate.ordinal;
                break;
            case TimePart.WeekOfMonth:
                var startOfMonth = candidate.set({ day: 0, hour: 0, minute: 0, second: 0 });
                candidatePart = candidate.weekNumber - startOfMonth.weekNumber;
                break;
            case TimePart.WeekOfYear:
                candidatePart = candidate.weekNumber;
                break;
            case TimePart.Year:
                candidatePart = candidate.year;
                break;
            case TimePart.Decade:
                candidatePart = candidate.year % 100;
                candidatePart %= 10;
                break;
            case TimePart.Century:
                candidatePart = candidate.year % 1000;
                candidatePart %= 100;
                break;
            case TimePart.Millenium:
                candidatePart = candidate.year - candidate.year % 1000;
                break;
        }
        return this.conf.whiteList.includes(candidatePart) && !this.conf.blackList.includes(candidatePart);
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
        if (this.startMs == null)
            this.startMs = new Date().valueOf();
    }
    reset() {
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
        var millis = this.candidate.toMillis();
        var freq = this.schedule.conf.frequency;
        if (freq == TimeUnit.Second)
            this.candidate = DateTime.fromMillis(millis + 1000).setZone(`UTC-${this.schedule.conf.utcOffset}`);
        if (freq == TimeUnit.Minute)
            this.candidate = DateTime.fromMillis(millis + 1000 * 60).setZone(`UTC-${this.schedule.conf.utcOffset}`);
        if (freq == TimeUnit.Hour)
            this.candidate = DateTime.fromMillis(millis + 1000 * 60 * 60).setZone(`UTC-${this.schedule.conf.utcOffset}`);
        if (freq == TimeUnit.Day)
            this.candidate = DateTime.fromMillis(millis + 1000 * 60 * 60 * 24).setZone(`UTC-${this.schedule.conf.utcOffset}`);
    }
    match() {
        for (var rule of this.schedule.rules)
            if (!rule.matches(this.candidate))
                return false;
        return true;
    }
    next() {
        while (true) {
            if (this.match())
                return this.candidate;
            this.advance();
        }
    }
}
//# sourceMappingURL=Module.js.map