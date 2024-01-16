import React from "react";

export default function Die(props){

    const styles = {
        backgroundColor: props.isHeld ? 'tomato' : 'white'
    }

    return (
        <h3 style={styles} className="die" onClick={()=>props.holdDie(props.id)}>
            {props.value}
        </h3>
    )
}