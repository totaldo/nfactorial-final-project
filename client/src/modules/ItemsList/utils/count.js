export const handleAllColumnShipmentCount = (dates, items) => {
    return dates.map((date) => ({
        date: date.id,
        shipment_count: date.items.reduce(
            (a, c, index) =>
                typeof c.shipment_count === "undefined"
                    ? a
                    : a + +c.shipment_count * +items[index].price,
            0
        ),
    }));
};

export const handleAllRowShipmentCount = (dates) => {
    if (!dates[0]?.items) return;

    const allRowCount = new Array(dates[0].items.length).fill(0);
    for (let date of dates) {
        for (let j = 0; j < date.items.length; j++) {
            allRowCount[j] +=
                typeof date.items[j].shipment_count !== "undefined" &&
                +date.items[j].shipment_count;
        }
    }

    return allRowCount;
};

export const handleAllShipmentCount = (dates, items) => {
    if (!dates[0]?.items) return;

    const allRowCount = new Array(dates[0].items.length).fill(0);
    for (let date of dates) {
        for (let j = 0; j < date.items.length; j++) {
            allRowCount[j] +=
                typeof date.items[j].shipment_count !== "undefined" &&
                +date.items[j].shipment_count;
        }
    }

    return (
        items.reduce((i, item) => i + +item.amount_init * +item.price, 0) -
        allRowCount.reduce((i, c, index) => i + c * +items[index].price, 0)
    );
};

export const handleAllCount = (items) => {
    return items.reduce((i, item) => i + +item.amount_init * +item.price, 0);
};

export const countMonthCount = (months, dates, items) => {
    const allMonthCount = new Array(12).fill(null);
    if (!dates[0]?.items) return allMonthCount;

    const allDateByMonths = new Array(12).fill(null);

    for (let date of dates) {
        const index = +date.date.split(".")[1] - 1;

        if (allDateByMonths[index]) {
            allDateByMonths[index].push(date);
        } else {
            allDateByMonths[index] = [date];
        }
    }

    for (let k = 0; k < allDateByMonths.length; k++) {
        if (!allDateByMonths[k]) continue;
        let monthCount = 0;

        const allColumnShipmentCount = handleAllColumnShipmentCount(
            allDateByMonths[k],
            items
        );

        for (let i = 0; i < allDateByMonths[k].length; i++) {
            const dateWriteOfSum = allDateByMonths[k][i].items.reduce(
                (p, item, index) => {
                    if (typeof item.write_off_count === "undefined") return p;
                    return p + +item.write_off_count * +items[index].price;
                },
                0
            );

            monthCount +=
                dateWriteOfSum + allColumnShipmentCount[i]?.shipment_count;
        }
        allMonthCount[k] = monthCount;
    }

    return allMonthCount;
};

export const countMonthWriteOffCount = (months, dates, items, percentage) => {
    const allMonthCount = new Array(12).fill(null);
    if (!dates[0]?.items) return allMonthCount;

    const allDateByMonths = new Array(12).fill(null);

    for (let date of dates) {
        const index = +date.date.split(".")[1] - 1;

        if (allDateByMonths[index]) {
            allDateByMonths[index].push(date);
        } else {
            allDateByMonths[index] = [date];
        }
    }

    for (let k = 0; k < allDateByMonths.length; k++) {
        if (!allDateByMonths[k]) continue;
        let monthCount = 0;

        for (let i = 0; i < allDateByMonths[k].length; i++) {
            monthCount += allDateByMonths[k][i].items.reduce(
                (p, item, index) => {
                    if (typeof item.write_off_count === "undefined") return p;
                    return p + +item.write_off_count * +items[index].price;
                },
                0
            );
        }
        allMonthCount[k] = (monthCount * +percentage) / 100;
    }

    return allMonthCount;
};

export const countMonthHorizontalShipmentCount = (dates, items, percentage) => {
    const allMonthCount = new Array(12).fill(null);
    if (!dates[0]?.items) return allMonthCount;

    const allDateByMonths = new Array(12).fill(null);

    for (let date of dates) {
        const index = +date.date.split(".")[1] - 1;

        if (allDateByMonths[index]) {
            allDateByMonths[index].push(date);
        } else {
            allDateByMonths[index] = [date];
        }
    }

    for (let i = 0; i < allMonthCount.length; i++) {
        if (!allDateByMonths[i]) continue;

        allMonthCount[i] = new Array(items.length).fill(0);

        for (let date of allDateByMonths[i]) {
            const monthItemsCount = new Array(12)
                .fill(date.items.length)
                .fill(0);

            date.items.map((item, index) => {
                monthItemsCount[index] +=
                    typeof item.shipment_count !== "undefined" &&
                    +item.shipment_count;
            });

            for (let j = 0; j < allMonthCount[i].length; j++) {
                allMonthCount[i][j] += monthItemsCount[j];
            }
        }
    }

    return allMonthCount;
};
