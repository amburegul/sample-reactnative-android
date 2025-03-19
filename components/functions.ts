export function convertReadableDate(d : Date){
    const yyyy = d.getFullYear();
    let mm = d.getMonth() + 1; // Months start at 0!
    let dd = d.getDate();

    let ddd;
    let mmm; 

    if (dd < 10) ddd = '0' + dd;
    if (mm < 10) mmm = '0' + mm;

    const formattedToday = dd + '/' + mm + '/' + yyyy;
    return formattedToday;
}

export function convertReadableTime24h(t:Date):string{
    return t.getHours().toString().padStart(2, '0') + ":" + t.getMinutes().toString().padStart(2, '0');
    console.log('time:'+t);
}