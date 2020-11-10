import { DateTime } from '@jkassis/luxon';
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
export declare enum TimePart {
    Millisecond = 100,
    Second = 90,
    Minute = 80,
    Hour = 70,
    DayOfWeek = 5060,
    DayOfMonth = 4060,
    DayOfYear = 3060,
    WeekOfMonth = 4050,
    WeekOfYear = 3050,
    Month = 40,
    Year = 30,
    Decade = 20,
    Century = 10,
    Millenium = 0
}
export declare type Frequency = TimeUnit.Second | TimeUnit.Minute | TimeUnit.Hour | TimeUnit.Day;
export interface RuleConf {
    timePart: TimePart;
    whiteList?: Array<number>;
    blackList?: Array<number>;
}
export declare class Rule {
    conf: RuleConf;
    constructor(conf: RuleConf);
    matches(candidate: DateTime): boolean;
}
export interface RecurrenceConf {
    frequency: Frequency;
    rules: Array<RuleConf>;
    utcOffset: number;
    startMs?: number;
    endMs?: number;
}
export declare class Recurrence {
    conf: RecurrenceConf;
    rules: Array<Rule>;
    constructor(conf: RecurrenceConf);
    occurrences(startMs: number, endMs: number): Iterator;
}
export declare class Iterator {
    startMs: number;
    endMs: number;
    schedule: Recurrence;
    candidate: DateTime;
    constructor(schedule: Recurrence, startMs: number, endMs: number);
    reset(): void;
    advance(): void;
    match(): boolean;
    next(): DateTime;
}
