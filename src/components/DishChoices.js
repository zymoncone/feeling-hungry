// return regex mapped value with bolded and linked item titles

const DishChoices = (props) => {

    // grab all item titles starting with 1. , 2. , 3. , ... 
    let regexp = /[0-9].\s.*?:/g
    // match all items to regex
    let matchAll = Array.from(props.message.matchAll(regexp))
    // split all items by regex. Get opposite array of matchAll from string
    let splitAll = props.message.split(regexp)
    // init splitByTitleArray
    const splitByTitleArray = []
    const searchLinkArray = []

    // combine split and match array by regex pattern for mapping
    for (let i=0, len=matchAll.length; i<len; i++) {
        splitByTitleArray.push(matchAll[i][0])
        splitByTitleArray.push(splitAll[i+1])
        const titleSplit = matchAll[i][0].split(" ")
        
        // clean-up for url
        for (let j=0; j < titleSplit.length; j++) {
        // get rid of any text with ':'
        titleSplit[j] = titleSplit[j].replace(/(\w+):/g,"$1")
        // make all lowercase
        titleSplit[j] = titleSplit[j].toLowerCase()
        }
        // remove first index which contains numbers. This is certain from earlier regex
        titleSplit.splice(0, 1) 
        searchLinkArray.push("https://www.google.com/search?q=" + titleSplit.join("+"))
    }

    // map array to output, bold titles and give them google links for more info
    return (
        <div id="output">
        {splitByTitleArray.map((item, index) => (
            <div key={index}>
            {index % 2 === 1 && item}
            {index % 2 === 0 && (
                <a href={searchLinkArray[index/2]} target="_blank" rel="noreferrer">
                <b>{item}</b>
                </a>
            )}
            </div>
        ))}
        </div>)
}

export default DishChoices