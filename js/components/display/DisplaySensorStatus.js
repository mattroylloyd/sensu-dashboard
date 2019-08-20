import React from 'react'

const DisplaySensorStatus = ({data}) => {

    //needs changing to be async
    if (!data) {
        return <div/>
    }

    function getService(name) {
        return (name.split(".", 2)).join(".");
    }

    function getName(datum) {
        if (!datum.check.hasOwnProperty('name')) {
            return "NO_NAME"
        } else {
            return datum.check.name.replace("Mayden.Sensors.", "");
        }
    }

    function getStatusColour(datum) {
        if(!datum.check.hasOwnProperty('status')){
            return "statusItemRed"
        }
        else{
            return datum.check.status === 0 ? "statusItemGreen" : "statusItemRed";
        }
    }

    function getDateTime(datum) {
        if(!datum.check.hasOwnProperty('executed')){
            return "NO_TIME"
        }else{
            let date = new Date(datum.check.executed * 1000);
            let dateString = date.toLocaleDateString();
            let time = date.getHours() + ':' + ("0" + date.getMinutes()).substr(-2) + ':' + ("0" + date.getSeconds()).substr(-2);

            return time + " " + dateString;
        }
    }

    function getMessage(datum) {
        return getStatusColour(datum) === "statusItemRed" ? datum.check.output : "";
    }

    function processName(datum) {
        if (!datum.check.hasOwnProperty('name')) {
            return "NO_NAME"
        } else {
            return getName(datum).replace(getService(getName(datum)) + ".", "")
        }
    }

    return (
        <div>
            <div className="grid-container">
                <div className="serviceHeading">Service</div>
                <div className="nameHeading">Name</div>
                <div className="statusHeading">Status</div>
                <div className="statusCodeHeading">(Code)</div>
                <div className="timeHeading">Time</div>
                <div className="messageHeading">Message</div>
            </div>

            {
                data.map((datum, index) => {

                    return (
                        <div className="grid-container" key={index}>
                            <div className="serviceItem">{getService(getName(datum))}</div>
                            <div className="nameItem">{processName(datum)}</div>
                            <div className={getStatusColour(datum) + "Dot"}/>
                            <div className="statusCodeItem">({datum.check.status})</div>
                            <div className="timeItem">{getDateTime(datum)}</div>
                            <div className="messageItem">{getMessage(datum)}</div>
                        </div>
                    )
                })
            }
        </div>
    )
}
export default DisplaySensorStatus;
