import dayjs from 'dayjs';

export function calculateDiffTime(timeInMs) {
    const timestampDayjs = dayjs(timeInMs);
    const nowDayjs = dayjs();
    if(timestampDayjs.isBefore(nowDayjs)) {
        return {
            seconds: "00",
            minutes: "00",
            hours: "00",
            days: "00",
        };
    }
    return {
        seconds: getRemainingSeconds(nowDayjs, timestampDayjs),
        minutes: getRemainingMinus(nowDayjs, timestampDayjs),
        hours: getRemainingHours(nowDayjs, timestampDayjs),
        days: getRemainingDays(nowDayjs, timestampDayjs),
    };
};

function getRemainingSeconds(nowDayjs, timestampDayjs) {
    const seconds = timestampDayjs.diff(nowDayjs, "seconds") % 60;
    return padWidthZero(seconds, 2);
}
function getRemainingMinus(nowDayjs, timestampDayjs) {
    const minutes = timestampDayjs.diff(nowDayjs, "minutes") % 60;
    return padWidthZero(minutes, 2);
}
function getRemainingHours(nowDayjs, timestampDayjs) {
    const hours = timestampDayjs.diff(nowDayjs, "hours") % 60;
    return padWidthZero(hours, 2);
}
function getRemainingDays(nowDayjs, timestampDayjs) {
    const days = timestampDayjs.diff(nowDayjs, "days");
    return days.toString();
}

function padWidthZero(number, length) {
    const numberString = number.toString();
    if(numberString.length >= length) {
        return numberString;
    }
    return "0".repeat(length - numberString.length) + numberString; 
}