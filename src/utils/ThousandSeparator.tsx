function thousandSeparator(x : any) {
    if(x) return  x.replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export {
    thousandSeparator
}