const UserEntry = (props) => {

    return (
    <div className="bottom-section">
        <div className="sub-title" style={{alignItems:"left", alignText:"left", width:"100%"}}>
            <h3>What's in your fridge?</h3>
        </div>
        <div className="input-container">
            <input id="entry" type="text" placeholder="(input as comma separated words)" value={props.value} onChange={(e) => props.setValue(e.target.value)} autoComplete="off" />
            
            {props.showSubmit && <button className="submit" onClick={props.getMessage}>submit</button>}
        </div>
    </div>)
}

export default UserEntry