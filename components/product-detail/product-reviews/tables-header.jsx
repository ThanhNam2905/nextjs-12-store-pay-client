import React, { useState } from 'react'
import TableSelect from './table-select';
import styles from './styles.module.scss';

const ratings = [
    {text: "Tất cả", value: "all"},
    {text: "5 sao", value: 5},
    {text: "4 sao", value: 4},
    {text: "3 sao", value: 3},
    {text: "2 sao", value: 2},
    {text: "1 sao", value: 1},
];

const arrangementOptions = [
    {text: "Theo đề xuất", value: "recommend"},
    {text: "Mới nhất", value: "most_recent"},
    {text: "Cũ nhất", value: "oldest"},
];

const TablesHeader = ({ reviews, allSizes , colors}) => {

    const [rating, setRating] = useState();
    const [size, setSize] = useState("");
    const [style, setStyle] = useState("");
    const [arrangement, setArrangement] = useState("");

    return (
        <div className={styles.tables__header}>
            <TableSelect
                subText="Đánh giá"
                property={!rating ? "Chọn Đánh giá" : rating === "all" ? "Tất cả" : `${rating} Sao `}
                text="Rating"
                data={ratings.filter((x) => x.value !== rating)}
                handleChange={setRating}
            />
            <TableSelect
                subText="Kích thước"
                property={size === "" ? "Chọn Size" : size === "Tất cả" ? size : `Size: ${size}`}
                text="Size"
                data={allSizes.filter((x) => x.size !== size)}
                handleChange={setSize}
            />
            <TableSelect
                subText="Kiểu dáng"
                property={style === "" ? "Chọn Size" : style.color !== "Tất cả" ? style : "Tất cả"}
                text="Style"
                data={colors.filter((x) => x !== style)}
                handleChange={setStyle}
            />
            <TableSelect
                subText="Sắp xếp theo"
                property={arrangement}
                text="Arrangement"
                data={arrangementOptions.filter((x) => x !== arrangement)}
                handleChange={setArrangement}
            />
        </div>
    )
}

export default TablesHeader;