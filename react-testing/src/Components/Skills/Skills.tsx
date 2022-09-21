import React from 'react'
import { SkillsProps } from './Skills.types'

function Skills(props: SkillsProps) {
    const {skills} = props;
    return (
        <div>
            <ul>
                {
                    skills.map( (skill) => (
                        <li key={skill}> {skill} </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default Skills
