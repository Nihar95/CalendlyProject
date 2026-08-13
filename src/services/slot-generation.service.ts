import { DateTime, Interval } from "luxon";

export interface TimeWindow {
    start: DateTime;
    end: DateTime;
}


/**
 * Given a time and a date we return the absolute date time in the given timezone
 * 
 Input:
 time :"10:00"
 timezone :"UTC"
 date :"2026-01-01"

 Output:
 DateTime: 2026-01-01T10:00:00.000Z
 */
export function parseTimeOnDate(date: DateTime, time: string, timezone: string){
  const [hours, minutes] = time.split(':').map(Number)

  return date.setZone(timezone).set({
    hour: hours,
    minute: minutes,
    second: 0,
    millisecond: 0
  })
}

/**
 * Combine overlapping time windows into a single time window
 * Input:
 * [
 *  { start: "10:00", end: "11:00" },
 *  { start: "11:00", end: "12:00" },
 *  { start: "12:00", end: "13:00" },
 * ]
 * Output:
 * { start: "10:00", end: "13:00" }
 */
// check leetcode merge intervals problem
export function mergeTimeWindows(timeWindows: TimeWindow[]): TimeWindow[]{
    if(timeWindows.length === 0) return []
    const sortedTimeWindows = timeWindows.sort((a, b) => a.start.diff(b.start).toMillis())

    const mergedTimeWindows: TimeWindow[] = [sortedTimeWindows[0]]

    for (let i = 1; i < sortedTimeWindows.length; i++) {
        const currentTimeWindow = sortedTimeWindows[i]
        const lastMergedTimeWindow = mergedTimeWindows[mergedTimeWindows.length - 1]

        if(currentTimeWindow.start <= lastMergedTimeWindow.end) {
            lastMergedTimeWindow.end = currentTimeWindow.end > lastMergedTimeWindow.end ? currentTimeWindow.end : lastMergedTimeWindow.end
        } else {
            mergedTimeWindows.push(currentTimeWindow)
        }
    }
    return mergedTimeWindows
}

export function splitIntoSlots(timeWindow: TimeWindow[], durationInMins: number, bufferAfterMinutes: number, bufferBeforeMinutes: number  ): TimeWindow[]{
    const slots: TimeWindow[] = []

    const totalMinutes= durationInMins + bufferAfterMinutes + bufferBeforeMinutes;

    for ( const window of timeWindow){
        let cursor= window.start;

        while(cursor.plus({ minutes: totalMinutes }) <= window.end){
            const slotStart = cursor.plus({ minutes: bufferBeforeMinutes })
            const slotEnd = slotStart.plus({ minutes: durationInMins })
            slots.push({ start: slotStart, end: slotEnd })
            cursor = slotEnd.plus({ minutes: durationInMins })
        }
    }
    return slots
}

export function subtractWindows(windows: TimeWindow[], block: TimeWindow): TimeWindow[]{
    const result: TimeWindow[] = []
    
    

    for (const window of windows){
        const interval = Interval.fromDateTimes(window.start, window.end)
        const blockInterval = Interval.fromDateTimes(block.start, block.end)

        if(!interval.overlaps(blockInterval)){
            result.push(window)
        } 
        if(window.start < block.start){
            result.push({ start: window.start, end: block.start })
        }
        if(window.end > block.end){
            result.push({ start: block.end, end: window.end })
        }
    }
    return result.filter(window => window.start < window.end) // drop zero length Intervals
}

export function overlapsBooked(slot: TimeWindow, booked: TimeWindow[], bufferBeforeMinutes: number, bufferAfterMinutes: number): boolean{
    const paddedStart= slot.start.minus({ minutes: bufferBeforeMinutes })
    const paddedEnd = slot.end.plus({ minutes: bufferAfterMinutes })

    return booked.some((b) => {
        const interval = Interval.fromDateTimes(paddedStart, paddedEnd)
        const bookedInterval= Interval.fromDateTimes(b.start, b.end)
        return interval.overlaps(bookedInterval)
    })

}

export function applyExceptionsForDate(
    date: DateTime,
    baseWindow: TimeWindow[],
    exceptions: Array<{
        type: "BLOCK_FULL_DAY"| "BLOCK_PARTIAL"| "ADD_AVAILABLE_WINDOW"
        startTime: string | null,
        endTime: string | null,
        timeZone: string,
    }>
): TimeWindow[]{
    let windows= [...baseWindow]

    for(const ex of exceptions){
        if(ex.type === "BLOCK_FULL_DAY"){
            return []
        }
        if(ex.type === "BLOCK_PARTIAL" && ex.startTime && ex.endTime){
           const block ={ 
            start: parseTimeOnDate(date, ex.startTime, ex.timeZone), 
            end: parseTimeOnDate(date, ex.endTime, ex.timeZone) 
        };
        windows = subtractWindows(windows, block)
        }
        if(ex.type === "ADD_AVAILABLE_WINDOW" && ex.startTime && ex.endTime){
            windows.push({
                start: parseTimeOnDate(date, ex.startTime, ex.timeZone),
                end: parseTimeOnDate(date, ex.endTime, ex.timeZone)
            })
        }
    }

    return mergeTimeWindows(windows)
}