const UserEntry = (props) => {

    return (
    <div className="bottom-section">
        <h3>What's in your fridge?</h3>
            <div className="input-container">

            <input id="entry" type="text" placeholder="(input as comma separated words)" value={props.value} onChange={(e) => props.setValue(e.target.value)} />
            
            <div id="submit" onClick={props.getMessage}>
                ➱
            </div>
        </div>
    </div>)
}

export default UserEntry