import React from "react";
import MyInput from "./UI/inputs/MyInput";
import MySelect from "./UI/selects/MySelect";

const PostFilter = ({ filter, setFilter }) => {

    return (
        <div>
            <MyInput
                value={filter.query}
                onChange={e => setFilter({ ...filter, query: e.target.value })}
                placeholder="Поиск..."
            />
            <MySelect
                defaultValue='Сортировка'
                value={filter.sort}
                onChange={selectedSort => setFilter({ ...filter, sort: selectedSort })}
                options={
                    [{
                        value: 'title',
                        name: 'По значению'
                    },
                    {
                        value: 'description',
                        name: 'По описанию'
                    }]
                }
            />
        </div>
    )
};

export default PostFilter