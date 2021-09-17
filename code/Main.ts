import { DateTime } from '@jkassis/luxon'

// Frequency specifies the smallest interval that can repeat
export enum TimeUnit {
    Millisecond = 100,
    Second = 90,
    Minute = 80,
    Hour = 70,
    Day = 60,
    Week = 50,
    Month = 40,
    Year = 30,
    Decade = 20,
    Century = 10,
    Millenium = 0
}

export enum DateTimePartK {
    Milli = 1,
    Sec = 2,
    Min = 3,
    Hour = 4,
    DayOfWeek = 5,
    DayOfMonth = 6,
    DayOfYear = 7,
    WeekOfMonth = 8,
    WeekOfYear = 9,
    Month = 10,
    Year = 11,
    Decade = 12,
    Century = 13,
    Millenium = 14
}

export type DateTimePartVSec = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40 | 41 | 42 | 43 | 44 | 45 | 46 | 47 | 48 | 49 | 50 | 51 | 52 | 53 | 54 | 55 | 56 | 57 | 58 | 59
export type DateTimePartVMin = DateTimePartVSec
export type DateTimePartVHour = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23
export enum DateTimePartVDayOfWeek { Mo = 1, Tu = 2, We = 3, Th = 4, Fr = 5, Sa = 6, Su = 7 }
export type DateTimePartVDayOfMonth = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30
export type DateTimePartVDayOfYear = number
export type DateTimePartVWeekOfMonth = 0 | 1 | 2 | 3 | 4
export type DateTimePartVWeekOfYear = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40 | 41 | 42 | 43 | 44 | 45 | 46 | 47 | 48 | 49 | 50 | 51 | 52
export type DateTimePartVMonth = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
export type DateTimePartVYear = number
export type DateTimePartVDecade = number
export type DateTimePartVCentury = number


export interface RuleConfSec { timePart: DateTimePartK.Sec, whiteList?: Array<DateTimePartVSec>, blackList?: Array<DateTimePartVSec> }
export interface RuleConfMin { timePart: DateTimePartK.Min, whiteList?: Array<DateTimePartVMin>, blackList?: Array<DateTimePartVMin> }
export interface RuleConfHour { timePart: DateTimePartK.Hour, whiteList?: Array<DateTimePartVHour>, blackList?: Array<DateTimePartVHour> }
export interface RuleConfDayOfWeek { timePart: DateTimePartK.DayOfWeek, whiteList?: Array<DateTimePartVDayOfWeek>, blackList?: Array<DateTimePartVDayOfWeek> }
export interface RuleConfDayOfMonth { timePart: DateTimePartK.DayOfMonth, whiteList?: Array<DateTimePartVDayOfMonth>, blackList?: Array<DateTimePartVDayOfMonth> }
export interface RuleConfDayOfYear { timePart: DateTimePartK.DayOfYear, whiteList?: Array<DateTimePartVDayOfYear>, blackList?: Array<DateTimePartVDayOfYear> }
export interface RuleConfWeekOfMonth { timePart: DateTimePartK.WeekOfMonth, whiteList?: Array<DateTimePartVWeekOfMonth>, blackList?: Array<DateTimePartVWeekOfMonth> }
export interface RuleConfWeekOfYear { timePart: DateTimePartK.WeekOfYear, whiteList?: Array<DateTimePartVWeekOfYear>, blackList?: Array<DateTimePartVWeekOfYear> }
export interface RuleConfMonth { timePart: DateTimePartK.Month, whiteList?: Array<DateTimePartVMonth>, blackList?: Array<DateTimePartVMonth> }
export interface RuleConfYear { timePart: DateTimePartK.Year, whiteList?: Array<DateTimePartVYear>, blackList?: Array<DateTimePartVYear> }
export interface RuleConfDecade { timePart: DateTimePartK.Decade, whiteList?: Array<DateTimePartVDecade>, blackList?: Array<DateTimePartVDecade> }
export interface RuleConfCentury { timePart: DateTimePartK.Century, whiteList?: Array<DateTimePartVCentury>, blackList?: Array<DateTimePartVCentury> }
export type RuleConf = RuleConfSec | RuleConfMin | RuleConfHour | RuleConfDayOfWeek | RuleConfDayOfMonth | RuleConfDayOfYear | RuleConfWeekOfMonth | RuleConfWeekOfYear | RuleConfMonth | RuleConfYear | RuleConfDecade | RuleConfCentury

export class Rule {
    conf: RuleConf

    constructor(conf: RuleConf) {
        this.conf = conf
    }

    match(candidate: DateTime): boolean {
        var iso = candidate.toISO()
        var candidatePart: number
        switch (this.conf.timePart) {
            case DateTimePartK.Sec:
                candidatePart = candidate.second
                break
            case DateTimePartK.Min:
                candidatePart = candidate.minute
                break
            case DateTimePartK.Hour:
                candidatePart = candidate.hour
                break

            case DateTimePartK.DayOfWeek:
                candidatePart = candidate.weekday
                break
            case DateTimePartK.DayOfMonth:
                candidatePart = candidate.day
                break
            case DateTimePartK.DayOfYear:
                candidatePart = candidate.ordinal
                break

            case DateTimePartK.WeekOfMonth:
                var startOfMonth = candidate.set({ day: 0, hour: 0, minute: 0, second: 0 })
                candidatePart = candidate.weekNumber - startOfMonth.weekNumber
                if (candidatePart < 0)
                    candidatePart += startOfMonth.weeksInWeekYear
                break

            case DateTimePartK.WeekOfYear:
                candidatePart = candidate.weekNumber
                break
            case DateTimePartK.Year:
                candidatePart = candidate.year
                break

            case DateTimePartK.Decade:
                candidatePart = candidate.year % 100
                candidatePart %= 10
                break

            case DateTimePartK.Century:
                candidatePart = candidate.year % 1000
                candidatePart %= 100
                break
        }

        var whiteListOK = this.conf.whiteList ? this.conf.whiteList.includes(candidatePart as unknown as never) : true
        var blackListOK = this.conf.blackList ? !this.conf.blackList.includes(candidatePart as unknown as never) : true

        return whiteListOK && blackListOK
    }
}

export type RecurrenceFrequency = TimeUnit.Second | TimeUnit.Minute | TimeUnit.Hour | TimeUnit.Day
export interface RecurrenceConf {
    frequency: RecurrenceFrequency
    rules: Array<RuleConf>
    utcOffset: number
    startMs?: number
    endMs?: number
}

export class Recurrence {
    conf: RecurrenceConf
    rules: Array<Rule>

    constructor(conf: RecurrenceConf) {
        this.conf = conf
        this.rules = []
        for (var ruleConf of this.conf.rules)
            this.rules.push(new Rule(ruleConf))
    }

    occurrences(startMs: number, endMs?: number) {
        return new Iterator(this, startMs, endMs)
    }
}

export class Iterator {
    startMs: number
    endMs: number
    schedule: Recurrence
    candidate: DateTime
    runawayThreshold: number
    runawayCount: number

    constructor(schedule: Recurrence, startMs: number, endMs?: number) {
        this.schedule = schedule
        this.startMs = startMs
        this.endMs = endMs
        this.runawayThreshold = 10000

        if (this.startMs == null)
            this.startMs = new Date().valueOf()
        this.reset()
    }

    reset(): void {
        this.runawayCount = 0
        this.candidate = DateTime.fromMillis(this.startMs).setZone(`UTC-${this.schedule.conf.utcOffset}`)

        var freq = this.schedule.conf.frequency
        if (freq == TimeUnit.Second) this.candidate = this.candidate.startOf("second")
        else if (freq == TimeUnit.Minute) this.candidate = this.candidate.startOf("minute")
        else if (freq == TimeUnit.Hour) this.candidate = this.candidate.startOf("hour")
        else if (freq == TimeUnit.Day) this.candidate = this.candidate.startOf("day")
        else throw "frequency cannot be less than day"
    }

    advance(): void {
        this.runawayCount++
        if (this.runawayCount >= this.runawayThreshold)
            throw "runaway iteration"
        var millis = this.candidate.toMillis()
        var freq = this.schedule.conf.frequency
        if (freq == TimeUnit.Second) this.candidate = DateTime.fromMillis(millis + 1000).setZone(`UTC-${this.schedule.conf.utcOffset}`)
        else if (freq == TimeUnit.Minute) this.candidate = DateTime.fromMillis(millis + 1000 * 60).setZone(`UTC-${this.schedule.conf.utcOffset}`)
        else if (freq == TimeUnit.Hour) this.candidate = DateTime.fromMillis(millis + 1000 * 60 * 60).setZone(`UTC-${this.schedule.conf.utcOffset}`)
        else if (freq == TimeUnit.Day) this.candidate = DateTime.fromMillis(millis + 1000 * 60 * 60 * 24).setZone(`UTC-${this.schedule.conf.utcOffset}`)
        else throw "invalid.frequency"
    }

    match(): boolean {
        for (var rule of this.schedule.rules)
            if (!rule.match(this.candidate))
                return false
        return true
    }

    next(): DateTime {
        while (true) {
            if (this.match()) {
                var winner = this.candidate
                this.advance()
                return winner
            }
            this.advance()
        }
    }
}