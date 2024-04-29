export function thousandSeparator(x) {
    if(x !== null) return x.toString().replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function removeStripNumber(input){
    if(input) return Number(input.toString().replace(/,/g, ''));

    return 0;
}