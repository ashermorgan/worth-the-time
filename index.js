/**
 * The units of time used in the calculator
 */
const timeUnits = {
    "second":   1,
    "minute":   1 * 60,
    "hour":     1 * 60 * 60,
    "day":      1 * 60 * 60 * 24,
    "week":     1 * 60 * 60 * 24 * 7,
    "month":    1 * 60 * 60 * 24 * 30,
    "year":     1 * 60 * 60 * 24 * 365,
};



/**
 * Update the calculator output
 */
function update() {
    // Get data
    const frequencyRaw = document.getElementById("frequencyInput").value;
    const lengthRaw = document.getElementById("lengthInput").value;
    const periodRaw = document.getElementById("periodInput").value;
    const frequencyUnit = document.getElementById("frequencyUnitInput").value;
    const lengthUnit = document.getElementById("lengthUnitInput").value;
    const periodUnit = document.getElementById("periodUnitInput").value;

    // Apply units
    const frequency = timeUnits[frequencyUnit] / frequencyRaw;  // once every n seconds
    const length = lengthRaw * timeUnits[lengthUnit];           // n seconds
    const period = periodRaw * timeUnits[periodUnit];           // n seconds

    // Validate data
    let errorMessage = "";
    if (frequencyRaw === "") {
        errorMessage = "The task frequency must be a number";
    }
    else if (lengthRaw === "") {
        errorMessage = "The task length must be a number";
    }
    else if (periodRaw === "") {
        errorMessage = "The time period must be a number";
    }
    else if (frequencyRaw <= 0) {
        errorMessage = "The task frequency cannot be less than or equal to zero";
    }
    else if (lengthRaw <= 0) {
        errorMessage = "The task length cannot be less than or equal to zero";
    }
    else if (periodRaw <= 0) {
        errorMessage = "The time period cannot be less than or equal to zero";
    }
    else if (frequency < length) {
        errorMessage = "The task frequency cannot be greater than the task length";
    }
    else if (length > period) {
        errorMessage = "The task length cannot be greater than the time period";
    }

    // Show/hide error message
    if (errorMessage !== "") {
        document.getElementById("error").innerText = errorMessage;
        document.getElementById("maxTime").innerText = "";
        document.getElementById("error").hidden = false;
        return;
    }
    else {
        document.getElementById("error").hidden = true;
    }

    // Calculate
    const maxTime = length * period / frequency;
    document.getElementById("maxTime").innerText = formatDuration(maxTime);

}



/**
 * Initialize calculator values
 */
function initValues() {
    document.getElementById("frequencyInput").value = "50";
    document.getElementById("frequencyUnitInput").value = "day";
    document.getElementById("lengthInput").value = "1";
    document.getElementById("lengthUnitInput").value = "second";
    document.getElementById("periodInput").value = "5";
    document.getElementById("periodUnitInput").value = "year";

    update();
}



/**
 * Formats a duration as a human readable string
 * @param {Number} duration The duration in seconds
 * @returns {String} The formatted duration
 */
function formatDuration(duration) {
    for (let timeUnit of ["year", "month", "week", "day", "hour", "minute", "second"]) {
        if (duration >= timeUnits[timeUnit]) {
            let value = Math.round(duration / timeUnits[timeUnit]);
            if (value === 1) return `${value} ${timeUnit}`;
            else return `${value} ${timeUnit}s`;
        }
    }
    return `${duration.toFixed(2)} seconds`;
}
