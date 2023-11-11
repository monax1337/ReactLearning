import React from "react";

const MySelect = ({ options, defaultValue, value, onChange }) => { //первое что тут есть - это options - это как раз массив, который будет передаваться, в нем будет содержаться занчение option и какое то value(в нашем случае это для сортировки(по какому параметру будет идти сортировка))
  return (
    <select value={value} onChange={event => onChange(event.target.value)}> // то есть при выборе чего то она будет передавать как раз то value по которому у нас будет идти сортировка(очень замудренно написанно, но смысл я уловил)
      <option disabled value="">{defaultValue}</option>   //это то самое дефолтное значение, в нашем случае это Сортировка, оно будет первым option в select и оно будет disabled
      {options.map(option => //при помощи map мы итерируемся по options
        <option key={option.value} value={option.value}>
          {option.name}
        </option>
      )}
    </select>
  );
};

export default MySelect