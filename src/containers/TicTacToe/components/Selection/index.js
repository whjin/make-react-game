import React from 'react';

const Selection = ({options, handleOnSelect}) => (
    <select onChange={handleOnSelect}>
        {
            options.map((option) => (
                <option
                    key={option}
                    value={option}
                >
                    {option}
                </option>
            ))
        }
    </select>
);

export default Selection;
