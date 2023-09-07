export default function truncate(str : String) {
    return str.length > 100 ? str.substring(0, 60) + "..." : str;
}