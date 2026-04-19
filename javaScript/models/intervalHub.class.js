class IntervalHub {

    // array für alle Interval-IDs
    static allIntervals = [];

    // startet neues Interval und fügt id in arr allIntervals hinzu
    static startInterval(funct, timer){
        const newInterval = setInterval(funct, timer);
        IntervalHub.allIntervals.push(newInterval);
    }

    // stopt alle intervalle in allIntervals arr und leert es
    static stopAllIntervals(){
        IntervalHub.allIntervals.forEach(clearInterval);
        IntervalHub.allIntervals = [];
    }
}