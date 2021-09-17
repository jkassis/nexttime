import { DateTime } from 'luxon';
export declare enum TimeUnit {
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
export declare enum DateTimePartK {
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
export declare type DateTimePartVSec = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40 | 41 | 42 | 43 | 44 | 45 | 46 | 47 | 48 | 49 | 50 | 51 | 52 | 53 | 54 | 55 | 56 | 57 | 58 | 59;
export declare type DateTimePartVMin = DateTimePartVSec;
export declare type DateTimePartVHour = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23;
export declare enum DateTimePartVDayOfWeek {
    Mo = 1,
    Tu = 2,
    We = 3,
    Th = 4,
    Fr = 5,
    Sa = 6,
    Su = 7
}
export declare type DateTimePartVDayOfMonth = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30;
export declare type DateTimePartVDayOfYear = number;
export declare type DateTimePartVWeekOfMonth = 0 | 1 | 2 | 3 | 4;
export declare type DateTimePartVWeekOfYear = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40 | 41 | 42 | 43 | 44 | 45 | 46 | 47 | 48 | 49 | 50 | 51 | 52;
export declare type DateTimePartVMonth = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export declare type DateTimePartVYear = number;
export declare type DateTimePartVDecade = number;
export declare type DateTimePartVCentury = number;
export interface RuleConfSec {
    timePart: DateTimePartK.Sec;
    whiteList?: Array<DateTimePartVSec>;
    blackList?: Array<DateTimePartVSec>;
}
export interface RuleConfMin {
    timePart: DateTimePartK.Min;
    whiteList?: Array<DateTimePartVMin>;
    blackList?: Array<DateTimePartVMin>;
}
export interface RuleConfHour {
    timePart: DateTimePartK.Hour;
    whiteList?: Array<DateTimePartVHour>;
    blackList?: Array<DateTimePartVHour>;
}
export interface RuleConfDayOfWeek {
    timePart: DateTimePartK.DayOfWeek;
    whiteList?: Array<DateTimePartVDayOfWeek>;
    blackList?: Array<DateTimePartVDayOfWeek>;
}
export interface RuleConfDayOfMonth {
    timePart: DateTimePartK.DayOfMonth;
    whiteList?: Array<DateTimePartVDayOfMonth>;
    blackList?: Array<DateTimePartVDayOfMonth>;
}
export interface RuleConfDayOfYear {
    timePart: DateTimePartK.DayOfYear;
    whiteList?: Array<DateTimePartVDayOfYear>;
    blackList?: Array<DateTimePartVDayOfYear>;
}
export interface RuleConfWeekOfMonth {
    timePart: DateTimePartK.WeekOfMonth;
    whiteList?: Array<DateTimePartVWeekOfMonth>;
    blackList?: Array<DateTimePartVWeekOfMonth>;
}
export interface RuleConfWeekOfYear {
    timePart: DateTimePartK.WeekOfYear;
    whiteList?: Array<DateTimePartVWeekOfYear>;
    blackList?: Array<DateTimePartVWeekOfYear>;
}
export interface RuleConfMonth {
    timePart: DateTimePartK.Month;
    whiteList?: Array<DateTimePartVMonth>;
    blackList?: Array<DateTimePartVMonth>;
}
export interface RuleConfYear {
    timePart: DateTimePartK.Year;
    whiteList?: Array<DateTimePartVYear>;
    blackList?: Array<DateTimePartVYear>;
}
export interface RuleConfDecade {
    timePart: DateTimePartK.Decade;
    whiteList?: Array<DateTimePartVDecade>;
    blackList?: Array<DateTimePartVDecade>;
}
export interface RuleConfCentury {
    timePart: DateTimePartK.Century;
    whiteList?: Array<DateTimePartVCentury>;
    blackList?: Array<DateTimePartVCentury>;
}
export declare type RuleConf = RuleConfSec | RuleConfMin | RuleConfHour | RuleConfDayOfWeek | RuleConfDayOfMonth | RuleConfDayOfYear | RuleConfWeekOfMonth | RuleConfWeekOfYear | RuleConfMonth | RuleConfYear | RuleConfDecade | RuleConfCentury;
export declare class Rule {
    conf: RuleConf;
    constructor(conf: RuleConf);
    match(candidate: DateTime): boolean;
}
export declare type RecurrenceFrequency = TimeUnit.Second | TimeUnit.Minute | TimeUnit.Hour | TimeUnit.Day;
export interface RecurrenceConf {
    frequency: RecurrenceFrequency;
    rules: Array<RuleConf>;
    utcOffset: number;
    startMs?: number;
    endMs?: number;
}
export declare class Recurrence {
    conf: RecurrenceConf;
    rules: Array<Rule>;
    constructor(conf: RecurrenceConf);
    occurrences(startMs: number, endMs?: number): Iterator;
}
export declare class Iterator {
    startMs: number;
    endMs: number;
    schedule: Recurrence;
    candidate: DateTime;
    runawayThreshold: number;
    runawayCount: number;
    constructor(schedule: Recurrence, startMs: number, endMs?: number);
    reset(): void;
    advance(): void;
    match(): boolean;
    next(): DateTime;
}
