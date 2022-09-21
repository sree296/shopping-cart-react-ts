import React from 'react'

type IGreetProps = {
    name?: string;
}

export const Greet = (props: IGreetProps) => {
    return (
        <div>
            Hello {props.name}
        </div>
    )
}
