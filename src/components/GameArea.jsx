export default function GameArea(props) {
    const squares = props.data.map(dataItem => {
        return <div 
            key = {dataItem.id}
            className={ `gameArea__item ${dataItem.selected ? "item-selected" : ""}` } 
            onClick={ () => props.onItemClick(dataItem.id) }
        >
            { dataItem.num }
        </div>
    })
    return (
        <div className="gameArea">
            { squares }
        </div>
    )
}
