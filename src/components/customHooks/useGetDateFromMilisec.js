const getDateFromMilisec = (mili) => {
    const d = new Date(mili);
    let sec = d.getSeconds();
    let min = d.getMonth();
    let hour = d.getHours();
    let date = d.getDate();
    let month = d.getMonth() + 1;
    let year = d.getFullYear();

    sec = sec < 10 ? "0" + sec : sec
    min = min < 10 ? "0" + min : min
    hour = hour < 10 ? "0" + hour : hour
    date = date < 10 ? "0" + date : date
    month = month < 10 ? "0" + month : month

    return `${year}/${month}/${date} ${hour}:${min}:${sec}`
}

export { getDateFromMilisec };
