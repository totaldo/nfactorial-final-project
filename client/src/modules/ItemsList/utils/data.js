const tableMainHeaders = [
    {
        text: "temp",
        columns: 2,
        name: "info",
    },
    {
        text: "0%",
        columns: 1,
        name: "percentage",
    },
    {
        text: "Сумма договора",
        columns: 1,
    },
    {
        name: "allCount",
        text: "0",
        columns: 2,
    },
    {
        text: "Вып обяз",
        columns: 1,
    },
    {
        name: "allShipment",
        text: "0",
        columns: 2,
    },
];

const tablePaperMainHeaders = [
    {
        text: "temp",
        columns: 1,
        name: "info",
    },
    {
        text: "0%",
        columns: 1,
        name: "percentage",
    },
    {
        text: "Сумма договора",
        columns: 1,
    },
    {
        name: "allCount",
        text: "0",
        columns: 2,
    },
    {
        text: "Вып обяз",
        columns: 1,
    },
    {
        name: "allShipment",
        text: "0",
        columns: 1,
    },
];

const tableHeaders = [
    "#",
    "Наименование",
    "Ед.изм",
    "Цена",
    "Кол-во",
    "Сумма",
    "Отгруз",
    "Остаток",
    "Сумма остатка",
];
const tablePaperHeaders = [
    "#",
    "Наименование",
    "Ед.изм",
    "Цена",
    "Отгруз",
    "Сумма остатка",
    "Средняя цена",
];

export {
    tableHeaders,
    tableMainHeaders,
    tablePaperMainHeaders,
    tablePaperHeaders,
};
